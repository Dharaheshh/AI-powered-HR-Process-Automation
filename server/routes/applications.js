const express = require('express');
const router = express.Router();
const { applyToJob, getApplicants, getMyApplications, updateApplicationStatus, getAllApplications, getApplicationById, addRecruiterNote } = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Candidate routes
router.post('/:jobOpeningId', protect, authorize('candidate'), upload.single('resume'), applyToJob);
router.get('/my', protect, authorize('candidate'), getMyApplications);

// HR routes
router.get('/all', protect, authorize('hr'), getAllApplications);
router.get('/job/:jobOpeningId', protect, authorize('hr'), getApplicants);
router.get('/:id', protect, authorize('hr'), getApplicationById);
router.patch('/:id/status', protect, authorize('hr'), updateApplicationStatus);
router.post('/:id/notes', protect, authorize('hr'), addRecruiterNote);

module.exports = router;
