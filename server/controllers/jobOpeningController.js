const JobOpening = require('../models/JobOpening');

// @desc    Create a job opening (HR opens hiring for a role)
// @route   POST /api/job-openings
// @access  HR only
const createJobOpening = async (req, res) => {
  try {
    const { role, title, customSkills, experienceRequired, educationRequired, location, jobType } = req.body;

    const jobOpening = await JobOpening.create({
      role,
      title,
      customSkills,
      experienceRequired,
      educationRequired,
      location,
      jobType,
      createdBy: req.user._id,
    });

    const populated = await jobOpening.populate('role', 'name department');

    res.status(201).json({ success: true, jobOpening: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all open job openings
// @route   GET /api/job-openings
// @access  Public
const getJobOpenings = async (req, res) => {
  try {
    const jobOpenings = await JobOpening.find({ status: 'open' })
      .populate('role', 'name description department defaultSkills')
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: jobOpenings.length, jobOpenings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get HR's own job openings
// @route   GET /api/job-openings/my
// @access  HR only
const getMyJobOpenings = async (req, res) => {
  try {
    const jobOpenings = await JobOpening.find({ createdBy: req.user._id })
      .populate('role', 'name department')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: jobOpenings.length, jobOpenings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single job opening
// @route   GET /api/job-openings/:id
// @access  Public
const getJobOpening = async (req, res) => {
  try {
    const jobOpening = await JobOpening.findById(req.params.id)
      .populate('role')
      .populate('createdBy', 'name email');

    if (!jobOpening) {
      return res.status(404).json({ success: false, message: 'Job opening not found' });
    }

    res.status(200).json({ success: true, jobOpening });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update job opening
// @route   PUT /api/job-openings/:id
// @access  HR (owner only)
const updateJobOpening = async (req, res) => {
  try {
    let jobOpening = await JobOpening.findById(req.params.id);

    if (!jobOpening) {
      return res.status(404).json({ success: false, message: 'Job opening not found' });
    }

    if (jobOpening.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this opening' });
    }

    jobOpening = await JobOpening.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('role', 'name department');

    res.status(200).json({ success: true, jobOpening });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete / close job opening
// @route   DELETE /api/job-openings/:id
// @access  HR (owner only)
const deleteJobOpening = async (req, res) => {
  try {
    const jobOpening = await JobOpening.findById(req.params.id);

    if (!jobOpening) {
      return res.status(404).json({ success: false, message: 'Job opening not found' });
    }

    if (jobOpening.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this opening' });
    }

    await JobOpening.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Job opening deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createJobOpening,
  getJobOpenings,
  getMyJobOpenings,
  getJobOpening,
  updateJobOpening,
  deleteJobOpening,
};
