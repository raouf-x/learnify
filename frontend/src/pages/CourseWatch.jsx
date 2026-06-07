
import { useParams, Link } from 'react-router-dom';
import courses from '../data/courses';
import './CourseWatch.css';

function CourseWatch() {
  // Get the course ID from the URL (e.g. /courses/2)
  const { id } = useParams();
  const course = courses.find(c => c.id === parseInt(id));

  // If course not found
  if (!course) {
    return (
      <div className="not-found">
        <h2>Course not found 😕</h2>
        <Link to="/courses">← Back to Courses</Link>
      </div>
    );
  }

  // Related courses (same category, exclude current)
  const related = courses.filter(c => c.category === course.category && c.id !== course.id);

  return (
    <div className="watch-page">

      {/* LEFT — Video + Info */}
      <div className="watch-main">

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link> &rsaquo;
          <Link to="/courses">Courses</Link> &rsaquo;
          <span>{course.title}</span>
        </div>

        {/* Video Player */}
        <div className="video-wrapper">
          <iframe
            src={course.videoUrl}
            title={course.title}
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>

        {/* Course Info */}
        <div className="course-info">
          <span className={`badge ${course.category}`}>{course.category}</span>
          <h1>{course.title}</h1>
          <div className="meta">
            <span>👨‍🏫 {course.instructor}</span>
            <span>⭐ {course.rating}</span>
            <span>👥 {course.students} students</span>
          </div>
          <p className="course-desc">{course.description}</p>
        </div>

        {/* Action Buttons */}
        <div className="watch-actions">
          <button className="btn-enroll">✅ Mark as Complete</button>
          <button className="btn-save">🔖 Save Course</button>
          <button className="btn-share">🔗 Share</button>
        </div>

      </div>

      {/* RIGHT — Related Courses */}
      <div className="watch-sidebar">
        <h3>Related Courses</h3>

        {related.length > 0 ? related.map(c => (
          <Link to={`/courses/${c.id}`} key={c.id} className="related-card">
            <img src={c.image} alt={c.title} />
            <div>
              <p className="related-title">{c.title}</p>
              <p className="related-instructor">👨‍🏫 {c.instructor}</p>
              <p className="related-rating">⭐ {c.rating}</p>
            </div>
          </Link>
        )) : (
          <p className="no-related">No related courses yet.</p>
        )}

        {/* Back button */}
        <Link to="/courses" className="btn-back">← Back to All Courses</Link>
      </div>

    </div>
  );
}

export default CourseWatch;