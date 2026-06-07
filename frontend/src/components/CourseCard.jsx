
import { Link } from 'react-router-dom';
import './CourseCard.css';

// This component receives a 'course' object as a prop
function CourseCard({ course }) {
  return (
    <div className="course-card">
      <img src={course.image} alt={course.title} />
      <div className="card-body">
        <span className={`badge ${course.category}`}>{course.category}</span>
        <h3>{course.title}</h3>
        <p className="instructor">👨‍🏫 {course.instructor}</p>
        <p className="description">{course.description}</p>
        <div className="card-footer">
          <span>⭐ {course.rating} ({course.students} students)</span>
          <Link to={`/courses/${course.id}`} className="btn-watch">Watch Now</Link>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;