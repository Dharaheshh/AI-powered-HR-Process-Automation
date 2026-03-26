const Application = require('../models/Application');
const JobOpening = require('../models/JobOpening');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

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

    // Check if already applied
    const existingApp = await Application.findOne({
      candidate: req.user._id,
      jobOpening: jobOpeningId,
    });
    if (existingApp) {
      return res.status(400).json({ success: false, message: 'You have already applied to this position' });
    }

    // Create application base data
    const applicationData = {
      candidate: req.user._id,
      jobOpening: jobOpeningId,
      role: jobOpening.role._id,
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
    const applications = await Application.find({ jobOpening: req.params.jobOpeningId })
      .populate('candidate', 'name email')
      .populate('role', 'name')
      .sort({ appliedAt: -1 });

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

module.exports = { applyToJob, getApplicants, getMyApplications };
