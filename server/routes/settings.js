const express = require('express');
const router = express.Router();
const { getHrSettings, updateHrSettings } = require('../controllers/settingsController');
const { protect, authorize } = require('../middleware/auth');

router.get('/availability', protect, authorize('hr'), getHrSettings);
router.put('/availability', protect, authorize('hr'), updateHrSettings);

module.exports = router;
