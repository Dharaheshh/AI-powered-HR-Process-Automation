const express = require('express');
const router = express.Router();
const {
  createJobOpening,
  getJobOpenings,
  getMyJobOpenings,
  getJobOpening,
  updateJobOpening,
  deleteJobOpening,
} = require('../controllers/jobOpeningController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getJobOpenings);

// HR-only routes (must be before /:id to avoid conflict)
router.get('/my', protect, authorize('hr'), getMyJobOpenings);
router.post('/', protect, authorize('hr'), createJobOpening);

// Param routes
router.get('/:id', getJobOpening);
router.put('/:id', protect, authorize('hr'), updateJobOpening);
router.delete('/:id', protect, authorize('hr'), deleteJobOpening);

module.exports = router;
