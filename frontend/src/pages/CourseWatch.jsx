import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { markCourseComplete, markCourseWatched, getUserProgress } from '../api';
import courses from '../data/courses';
import './CourseWatch.css';

function CourseWatch() {
  const { id }          = useParams();
  const { user, token } = useAuth();
  const [completed, setCompleted] = useState(false);
  const [saving, setSaving]       = useState(false);
  const [msg, setMsg]             = useState('');

  const course  = courses.find(c => c.id === parseInt(id));
  const related = course ? courses.filter(c => c.category === course.category && c.id !== course.id) : [];

  // Load progress on mount
  useEffect(() => {
    if (user && token && course) {
      getUserProgress(token).then(progress => {
        if (Array.isArray(progress)) {
          const found = progress.find(p => p.courseId === course.id.toString());
          if (found?.completed) setCompleted(true);
        }
      });
      // Auto-mark as watched
      markCourseWatched(course.id.toString(), token).catch(() => {});
    }
  }, [user, token, course]);

  if (!course) {
    return (
      <div className="not-found">
        <h2>Course not found 😕</h2>
        <Link to="/courses">← Back to Courses</Link>
      </div>
    );
  }

  const handleComplete = async () => {
    if (!user) { window.location.href = '/login'; return; }
    setSaving(true);
    try {
      if (completed) {
        // Unmark complete
        const res = await fetch(
          `${import.meta.env.VITE_API_URL || 'https://learnify-57xq.onrender.com/api'}/progress/uncomplete`,
          {
            method: 'POST',
            headers: { 'Content-Type':'application/json', 'Authorization':`Bearer ${token}` },
            body: JSON.stringify({ courseId: course.id.toString() })
          }
        );
        if (res.ok) { setCompleted(false); setMsg('↩️ Marked as incomplete'); }
      } else {
        await markCourseComplete(course.id.toString(), token);
        setCompleted(true);
        setMsg('🎉 Course completed! Great job!');
      }
    } catch { setMsg('❌ Error saving progress'); }
    setSaving(false);
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="watch-page">
      <div className="watch-main">

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link> &rsaquo;
          <Link to="/courses">Courses</Link> &rsaquo;
          <span>{course.title}</span>
        </div>

        {/* Completion banner */}
        {completed && (
          <div className="completed-banner">
            🏆 You have completed this course! Congratulations!
          </div>
        )}

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
          <button
            className={completed ? 'btn-completed' : 'btn-enroll'}
            onClick={handleComplete}
            disabled={saving}
          >
            {saving ? '⏳ Saving...' : completed ? '✅ Completed!' : '✅ Mark as Complete'}
          </button>
          <button className="btn-save">🔖 Save Course</button>
          <button className="btn-share" onClick={() => {
            navigator.clipboard?.writeText(window.location.href);
            setMsg('🔗 Link copied!');
            setTimeout(() => setMsg(''), 2000);
          }}>🔗 Share</button>
        </div>

        {/* Message */}
        {msg && <div className="progress-msg">{msg}</div>}

      </div>

      {/* Sidebar */}
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
        )) : <p className="no-related">No related courses yet.</p>}
        <Link to="/courses" className="btn-back">← Back to All Courses</Link>
      </div>
    </div>
  );
}

export default CourseWatch;