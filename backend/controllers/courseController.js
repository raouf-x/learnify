 const Course = require('../models/Course');

// @desc   Get all courses
// @route  GET /api/courses
const getCourses = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = { isPublished: true };

    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }

    // Search by title
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const courses = await Course.find(query).sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get single course by ID
// @route  GET /api/courses/:id
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Create a new course
// @route  POST /api/courses
const createCourse = async (req, res) => {
  try {
    const { title, description, category, videoUrl, image } = req.body;

    const course = await Course.create({
      title,
      description,
      category,
      videoUrl,
      image,
      instructor:     req.user._id,
      instructorName: req.user.name,
      isPublished:    true
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Delete a course
// @route  DELETE /api/courses/:id
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Only the instructor can delete their course
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await course.deleteOne();
    res.json({ message: 'Course removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCourses, getCourseById, createCourse, deleteCourse };