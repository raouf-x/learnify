const AccessCode = require('../models/AccessCode');
const User       = require('../models/User');

// Generate a random unique code like LEARN-A7X2-K9P3
const generateCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const rand  = (n) => Array.from({length: n}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `LEARN-${rand(4)}-${rand(4)}`;
};

// @desc   Generate N codes (admin only)
// @route  POST /api/codes/generate
const generateCodes = async (req, res) => {
  try {
    const count  = req.body.count || 300;
    const plan   = req.body.plan  || 'premium';
    const codes  = [];
    const created = [];

    // Generate unique codes
    for (let i = 0; i < count; i++) {
      let code;
      let exists = true;
      // Keep trying until we get a unique code
      while (exists) {
        code   = generateCode();
        exists = await AccessCode.findOne({ code });
      }
      codes.push({ code, plan });
    }

    // Save all to database
    const saved = await AccessCode.insertMany(codes);
    saved.forEach(c => created.push(c.code));

    res.status(201).json({
      message: `✅ ${created.length} codes generated successfully!`,
      codes: created
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Activate account with a code
// @route  POST /api/codes/activate
const activateCode = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ message: 'Please provide a code' });
    }

    // Find the code
    const accessCode = await AccessCode.findOne({ code: code.toUpperCase().trim() });

    if (!accessCode) {
      return res.status(404).json({ message: '❌ Invalid code. Please check and try again.' });
    }

    if (accessCode.isUsed) {
      return res.status(400).json({ message: '❌ This code has already been used.' });
    }

    // Mark code as used
    accessCode.isUsed = true;
    accessCode.usedBy = req.user._id;
    accessCode.usedAt = new Date();
    await accessCode.save();

    // Upgrade user account
    await User.findByIdAndUpdate(req.user._id, {
      isPremium: true,
      plan: accessCode.plan
    });

    res.json({
      message: `🎉 Code activated! Your account is now ${accessCode.plan.toUpperCase()}!`,
      plan: accessCode.plan
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get all codes (admin only)
// @route  GET /api/codes
const getCodes = async (req, res) => {
  try {
    const codes = await AccessCode.find()
      .populate('usedBy', 'name email')
      .sort({ createdAt: -1 });

    const total    = codes.length;
    const used     = codes.filter(c => c.isUsed).length;
    const available = total - used;

    res.json({ total, used, available, codes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get only unused codes (admin only)
// @route  GET /api/codes/unused
const getUnusedCodes = async (req, res) => {
  try {
    const codes = await AccessCode.find({ isUsed: false }).sort({ createdAt: -1 });
    res.json({ count: codes.length, codes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateCodes, activateCode, getCodes, getUnusedCodes };