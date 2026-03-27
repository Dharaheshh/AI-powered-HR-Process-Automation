const Application = require('../models/Application');
const JobOpening = require('../models/JobOpening');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const { sendStatusEmail } = require('../utils/emailService');

// @desc    Apply to a job opening
// @route   POST /api/applications/:jobOpeningId
// @access  Candidate only
const applyToJob = async (req, res) => {
  try {
    const { jobOpeningId } = req.params;

    // Check if job opening exists and is open
    const jobOpening = await JobOpening.findById(jobOpeningId).populate('role');
    if (!jobOpening) {
      return res.status(404).json({ success: false, message: 'Job opening not found' });
    }
    if (jobOpening.status !== 'open') {
      return res.status(400).json({ success: false, message: 'This position is no longer accepting applications' });
    }

    // Check if already applied and not rejected
    const existingApp = await Application.findOne({
      candidate: req.user._id,
      jobOpening: jobOpeningId,
    }).sort({ createdAt: -1 });
    
    if (existingApp && existingApp.status !== 'rejected') {
      return res.status(400).json({ success: false, message: 'You already have an active application for this position' });
    }

    // Create application base data
    const applicationData = {
      candidate: req.user._id,
      jobOpening: jobOpeningId,
      role: jobOpening.role._id,
      status: 'applied',
      timeline: [{ status: 'applied', date: Date.now() }]
    };

    // ML Processing: Send to Python Microservice for Match Score
    if (req.file) {
      applicationData.resumeFile = `/uploads/resumes/${req.file.filename}`;
      
      try {
        // Collect requirements
        const skillsRequired = jobOpening.customSkills?.length > 0 
          ? jobOpening.customSkills 
          : jobOpening.role?.defaultSkills || [];
          
        // Prepare FormData for Python API
        const formData = new FormData();
        const filePath = path.join(__dirname, '..', 'uploads', 'resumes', req.file.filename);
        
        formData.append('resume', fs.createReadStream(filePath));
        formData.append('skills', JSON.stringify(skillsRequired));

        // Call FastAPI Microservice (Assumed running on port 8000)
        console.log(`Sending resume to ML service for scoring... user=${req.user._id}`);
        const mlResponse = await axios.post('http://localhost:8000/score', formData, {
          headers: {
            ...formData.getHeaders()
          }
        });
        
        if (mlResponse.data && mlResponse.data.success) {
          console.log(`Received ML Score: ${mlResponse.data.matchScore}%`);
          applicationData.matchScore = mlResponse.data.matchScore;
        }
      } catch (mlError) {
        console.error('ML Scoring Failed (Continuing without score):', mlError.message);
        // We gracefully degrade; if the ML python service is down, we still accept the application but matchScore remains null
      }
    }

    const application = await Application.create(applicationData);

    // Increment applicant count
    await JobOpening.findByIdAndUpdate(jobOpeningId, { $inc: { applicantCount: 1 } });

    res.status(201).json({ success: true, application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get applicants for a job opening
// @route   GET /api/applications/job/:jobOpeningId
// @access  HR only
const getApplicants = async (req, res) => {
  try {
    const rawApplications = await Application.find({ jobOpening: req.params.jobOpeningId })
      .populate('candidate', 'name email')
      .populate('role', 'name')
      .sort({ appliedAt: -1 })
      .lean();

    const SLA_LIMITS = {
      applied: 3, // days 
      shortlisted: 5,
      interview: 2 // SLA triggered 2 days AFTER interview
    };

    const now = Date.now();
    const MS_PER_DAY = 1000 * 60 * 60 * 24;

    const applications = rawApplications.map(app => {
      let daysElapsed = Math.floor((now - new Date(app.updatedAt).getTime()) / MS_PER_DAY);
      let slaBreached = false;
      let limit = SLA_LIMITS[app.status];

      if (app.status === 'interview' && app.interviewDate) {
        const interviewTime = new Date(app.interviewDate).getTime();
        // If interview is in the future, daysElapsed is negative, so we clamp to 0 for display, 
        // but SLA is not breached.
        daysElapsed = Math.floor((now - interviewTime) / MS_PER_DAY);
        if (daysElapsed > limit) slaBreached = true;
      } else if (limit && daysElapsed > limit) {
        slaBreached = true;
      }

      return {
        ...app,
        daysInStatus: Math.max(0, daysElapsed),
        slaBreached,
        slaLimit: limit || null
      };
    });

    res.status(200).json({ success: true, count: applications.length, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get candidate's own applications
// @route   GET /api/applications/my
// @access  Candidate only
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ candidate: req.user._id })
      .populate({
        path: 'jobOpening',
        populate: { path: 'role', select: 'name department' },
        select: 'title location jobType status',
      })
      .populate('role', 'name')
      .sort({ appliedAt: -1 });

    res.status(200).json({ success: true, count: applications.length, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update application status
// @route   PATCH /api/applications/:id/status
// @access  HR only
const updateApplicationStatus = async (req, res) => {
  try {
    const { status, interviewDate, interviewLink } = req.body;
    const validStatuses = ['applied', 'shortlisted', 'interview', 'rejected', 'offered'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const application = await Application.findById(req.params.id)
      .populate('candidate', 'name email')
      .populate('jobOpening', 'title');

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    application.status = status;
    let note = '';
    if (status === 'interview') {
      if (interviewDate) application.interviewDate = interviewDate;
      if (interviewLink) application.interviewLink = interviewLink;
      note = `Scheduled for ${new Date(interviewDate).toLocaleString()}`;
    }
    if (status === 'offered') {
      note = 'Candidate has been accepted and offered the position.';
    }
    
    application.timeline.push({
      status,
      date: Date.now(),
      note: note || undefined
    });
    
    await application.save();

    // Send email notification asynchronously
    sendStatusEmail(application.candidate, application.jobOpening, status, application);

    res.status(200).json({ success: true, application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add recruiter note to application
// @route   POST /api/applications/:id/notes
// @access  HR only
const addRecruiterNote = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, message: 'Note text is required' });
    }

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    application.recruiterNotes.push({
      text: text.trim(),
      addedBy: req.user.name || 'HR',
      addedAt: new Date()
    });

    await application.save();
    res.status(200).json({ success: true, notes: application.recruiterNotes });
  } catch (error) {
    console.error('Error adding note:', error);
    res.status(500).json({ success: false, message: 'Failed to save note' });
  }
};

// @desc    Get all applications globally
// @route   GET /api/applications/all
// @access  HR only
const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('jobOpening', 'title location jobType')
      .populate('candidate', 'name email profile')
      .sort({ appliedAt: -1 });
    
    res.status(200).json({ success: true, count: applications.length, applications });
  } catch (error) {
    console.error('Error fetching all applications:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get a single application by ID
// @route   GET /api/applications/:id
// @access  HR only
const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('jobOpening', 'title location jobType')
      .populate('candidate', 'name email profile');
    
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    
    res.status(200).json({ success: true, application });
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { applyToJob, getApplicants, getMyApplications, updateApplicationStatus, getAllApplications, getApplicationById, addRecruiterNote };
