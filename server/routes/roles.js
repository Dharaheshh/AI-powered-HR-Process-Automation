const express = require('express');
const router = express.Router();
const { getRoles, getRole } = require('../controllers/roleController');

router.get('/', getRoles);
router.get('/:id', getRole);

module.exports = router;
