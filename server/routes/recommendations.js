const express = require('express');
const router = express.Router();
const { 
  getRecommendations, 
  acceptRecommendation, 
  ignoreRecommendation 
} = require('../controllers/recommendationController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('hr'));

router.route('/')
  .get(getRecommendations);

router.route('/:id/accept')
  .put(acceptRecommendation);

router.route('/:id/ignore')
  .put(ignoreRecommendation);

module.exports = router;
