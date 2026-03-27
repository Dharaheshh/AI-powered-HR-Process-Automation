const express = require('express');
const router = express.Router();
const { analyzeResume } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload'); // Ensure this is the multer middleware

router.use(protect);

router.post('/analyze-resume', upload.single('resume'), analyzeResume);

module.exports = router;
