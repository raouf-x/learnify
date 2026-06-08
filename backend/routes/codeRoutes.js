const express  = require('express');
const router   = express.Router();
const {
  generateCodes,
  activateCode,
  getCodes,
  getUnusedCodes
} = require('../controllers/codeController');
const protect  = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');

// Generate codes — admin only
router.post('/generate', protect, adminOnly, generateCodes);

// Get all codes — admin only
router.get('/', protect, adminOnly, getCodes);

// Get unused codes — admin only
router.get('/unused', protect, adminOnly, getUnusedCodes);

// Activate a code — any logged in user
router.post('/activate', protect, activateCode);

module.exports = router;