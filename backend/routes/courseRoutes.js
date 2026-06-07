const express=require('express');
const router=express.Router();
const {getCourses,getCourseById,createCourse,deleteCourse}=require('../controllers/courseController');
const protect=require('../middleware/authMiddleware');
router.get('/',getCourses);
router.get('/:id',getCourseById);
router.post('/',protect,createCourse);
router.delete('/:id',protect,deleteCourse);
module.exports=router;