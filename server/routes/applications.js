const express = require('express');
const router = express.Router();
const { applyToJob, getApplicants, getMyApplications, updateApplicationStatus } = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Candidate routes
router.post('/:jobOpeningId', protect, authorize('candidate'), upload.single('resume'), applyToJob);
router.get('/my', protect, authorize('candidate'), getMyApplications);

// HR routes
router.get('/job/:jobOpeningId', protect, authorize('hr'), getApplicants);
router.patch('/:id/status', protect, authorize('hr'), updateApplicationStatus);

module.exports = router;
