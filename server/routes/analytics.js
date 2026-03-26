const express = require('express');
const { getHRSummary } = require('../controllers/analyticsController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Route for fetching HR aggregation metrics
router.get('/hr-summary', protect, authorize('hr'), getHRSummary);

module.exports = router;
