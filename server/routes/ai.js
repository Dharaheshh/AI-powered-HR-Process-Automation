const express = require('express');
const router = express.Router();
const { analyzeResume, parseScheduleCommand } = require('../controllers/aiController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload'); // Ensure this is the multer middleware

router.use(protect);

router.post('/analyze-resume', upload.single('resume'), analyzeResume);
router.post('/parse-schedule', authorize('hr'), parseScheduleCommand);

module.exports = router;
