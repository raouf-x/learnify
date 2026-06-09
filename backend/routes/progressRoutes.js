const express  = require('express');
const router   = express.Router();
const {
  markComplete,
  markWatched,
  getProgress,
  unmarkComplete
} = require('../controllers/progressController');
const protect = require('../middleware/authMiddleware');

// All routes are protected
router.get('/',           protect, getProgress);
router.post('/complete',  protect, markComplete);
router.post('/watch',     protect, markWatched);
router.post('/uncomplete',protect, unmarkComplete);

module.exports = router;