const express = require('express');
const { getHRSummary, getReportData } = require('../controllers/analyticsController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Route for fetching HR aggregation metrics
router.get('/hr-summary', protect, authorize('hr'), getHRSummary);

// Route for generating report data
router.get('/report-data', protect, authorize('hr'), getReportData);

module.exports = router;
