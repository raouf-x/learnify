const User = require('../models/User');

// @desc   Mark course as complete
// @route  POST /api/progress/complete
const markComplete = async (req, res) => {
  try {
    const { courseId } = req.body;
    const user = await User.findById(req.user._id);

    // Check if progress entry exists
    const existing = user.progress.find(p => p.courseId === courseId.toString());

    if (existing) {
      existing.completed   = true;
      existing.completedAt = new Date();
      existing.lastWatched = new Date();
    } else {
      user.progress.push({
        courseId:    courseId.toString(),
        completed:   true,
        completedAt: new Date(),
        lastWatched: new Date()
      });
    }

    await user.save();
    res.json({ message: '✅ Course marked as complete!', progress: user.progress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Mark course as watched (not complete)
// @route  POST /api/progress/watch
const markWatched = async (req, res) => {
  try {
    const { courseId } = req.body;
    const user = await User.findById(req.user._id);

    const existing = user.progress.find(p => p.courseId === courseId.toString());

    if (existing) {
      existing.lastWatched = new Date();
    } else {
      user.progress.push({
        courseId:    courseId.toString(),
        completed:   false,
        lastWatched: new Date()
      });
    }

    await user.save();
    res.json({ message: '👁️ Progress saved!', progress: user.progress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get user progress
// @route  GET /api/progress
const getProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('progress');
    res.json(user.progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Unmark complete
// @route  POST /api/progress/uncomplete
const unmarkComplete = async (req, res) => {
  try {
    const { courseId } = req.body;
    const user = await User.findById(req.user._id);
    const existing = user.progress.find(p => p.courseId === courseId.toString());

    if (existing) {
      existing.completed   = false;
      existing.completedAt = null;
    }

    await user.save();
    res.json({ message: '↩️ Marked as incomplete', progress: user.progress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { markComplete, markWatched, getProgress, unmarkComplete };