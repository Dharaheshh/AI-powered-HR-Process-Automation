const RoleRecommendation = require('../models/RoleRecommendation');
const Application = require('../models/Application');
const JobOpening = require('../models/JobOpening');

// @desc    Get all pending role recommendations
// @route   GET /api/recommendations
// @access  HR only
const getRecommendations = async (req, res) => {
  try {
    const recommendations = await RoleRecommendation.find({ status: 'pending' })
      .populate('candidate', 'name email profileImage')
      .populate('application')
      .populate('appliedRole', 'name')
      .populate({
        path: 'recommendedJobOpening',
        populate: { path: 'role', select: 'name department' }
      })
      .sort({ createdAt: -1 });
      
    res.status(200).json({ success: true, count: recommendations.length, recommendations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Accept a role recommendation (move candidate to new pipeline)
// @route   PUT /api/recommendations/:id/accept
// @access  HR only
const acceptRecommendation = async (req, res) => {
  try {
    const recommendation = await RoleRecommendation.findById(req.params.id);
    if (!recommendation) {
      return res.status(404).json({ success: false, message: 'Recommendation not found' });
    }
    if (recommendation.status !== 'pending') {
      return res.status(400).json({ success: false, message: 'Recommendation already processed' });
    }

    // 1. Get Application & New Job Opening
    const application = await Application.findById(recommendation.application);
    const newJobOpening = await JobOpening.findById(recommendation.recommendedJobOpening);
    
    if (!application || !newJobOpening) {
      return res.status(404).json({ success: false, message: 'Application or target job opening not found' });
    }

    const oldJobOpeningId = application.jobOpening;

    // 2. Update Application
    application.jobOpening = newJobOpening._id;
    application.role = newJobOpening.role;
    application.matchScore = recommendation.recommendedMatchScore;
    
    // Reset to "shortlisted" if score is very high, else "applied"
    const newStatus = recommendation.recommendedMatchScore >= 80 ? 'shortlisted' : 'applied';
    application.status = newStatus;
    
    // Add timeline event
    application.timeline.push({
      status: newStatus,
      date: Date.now(),
      note: `Candidate moved from a different pipeline to ${newJobOpening.role} due to higher AI match score (${recommendation.recommendedMatchScore}%).`
    });

    await application.save();

    // 3. Update Applicant Counts
    // Decrement old
    await JobOpening.findByIdAndUpdate(oldJobOpeningId, { $inc: { applicantCount: -1 } });
    // Increment new
    await JobOpening.findByIdAndUpdate(newJobOpening._id, { $inc: { applicantCount: 1 } });

    // 4. Mark recommendation accepted
    recommendation.status = 'accepted';
    await recommendation.save();

    res.status(200).json({ success: true, message: 'Candidate moved successfully', application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Ignore a role recommendation
// @route   PUT /api/recommendations/:id/ignore
// @access  HR only
const ignoreRecommendation = async (req, res) => {
  try {
    const recommendation = await RoleRecommendation.findById(req.params.id);
    if (!recommendation) {
      return res.status(404).json({ success: false, message: 'Recommendation not found' });
    }

    recommendation.status = 'ignored';
    await recommendation.save();

    res.status(200).json({ success: true, message: 'Recommendation ignored' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getRecommendations,
  acceptRecommendation,
  ignoreRecommendation
};
