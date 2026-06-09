 import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createCourse, getUserProgress } from '../api';
import './Dashboard.css';

function Dashboard() {
  const { user, token, logout } = useAuth();
  const navigate                = useNavigate();
  const [activeTab, setActiveTab]   = useState('profile');
  const [progress, setProgress]     = useState([]);
  const [courseForm, setCourseForm] = useState({
    title: '', description: '', category: 'frontend', videoUrl: '', image: ''
  });
  const [msg, setMsg]         = useState('');
  const [loading, setLoading] = useState(false);

  // Load progress
  useEffect(() => {
    if (token) {
      getUserProgress(token).then(data => {
        if (Array.isArray(data)) setProgress(data);
      }).catch(() => {});
    }
  }, [token]);

  // Redirect if not logged in
  if (!user) {
    return (
      <div className="dashboard-login">
        <h2>🔒 Please login to view your dashboard</h2>
        <Link to="/login" className="btn-login-now">Login Now</Link>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCourseChange = e => {
    setCourseForm({ ...courseForm, [e.target.name]: e.target.value });
  };

  const handleCreateCourse = async e => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const data = await createCourse(courseForm, token);
      if (data._id) {
        setMsg('✅ Course created successfully!');
        setCourseForm({ title: '', description: '', category: 'frontend', videoUrl: '', image: '' });
      } else {
        setMsg('❌ ' + (data.message || 'Failed to create course'));
      }
    } catch {
      setMsg('❌ Something went wrong');
    }
    setLoading(false);
  };

  const completedCount = progress.filter(p => p.completed).length;
  const watchedCount   = progress.length;

  return (
    <div className="dashboard-page">

      {/* SIDEBAR */}
      <div className="dashboard-sidebar">
        <div className="dash-avatar">
          <div className="avatar-circle">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <h3>{user.name}</h3>
          <span className={`role-badge ${user.role}`}>{user.role}</span>
          {user.isPremium && (
            <span className="premium-badge">💎 {user.plan?.toUpperCase()}</span>
          )}
          <p>{user.email}</p>
        </div>

        <nav className="dash-nav">
          <button
            className={activeTab === 'profile' ? 'dash-btn active' : 'dash-btn'}
            onClick={() => setActiveTab('profile')}
          >👤 My Profile</button>

          <button
            className={activeTab === 'courses' ? 'dash-btn active' : 'dash-btn'}
            onClick={() => setActiveTab('courses')}
          >📚 My Progress</button>

          {user.role === 'instructor' || user.role === 'admin' ? (
            <button
              className={activeTab === 'create' ? 'dash-btn active' : 'dash-btn'}
              onClick={() => setActiveTab('create')}
            >➕ Create Course</button>
          ) : null}

          {user.role === 'admin' && (
            <Link to="/admin" className="dash-btn">
              🛠️ Admin Panel
            </Link>
          )}

          {!user.isPremium && (
            <Link to="/activate" className="dash-btn activate-btn">
              🔑 Activate Account
            </Link>
          )}

          <button className="dash-btn logout" onClick={handleLogout}>
            🚪 Logout
          </button>
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="dashboard-main">

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="dash-section">
            <h2>👤 My Profile</h2>

            <div className="profile-card">
              <div className="profile-row">
                <span>Full Name</span>
                <strong>{user.name}</strong>
              </div>
              <div className="profile-row">
                <span>Email</span>
                <strong>{user.email}</strong>
              </div>
              <div className="profile-row">
                <span>Role</span>
                <strong className={`role-badge ${user.role}`}>{user.role}</strong>
              </div>
              <div className="profile-row">
                <span>Account Type</span>
                <strong>{user.isPremium ? `💎 ${user.plan?.toUpperCase()}` : '🆓 Free'}</strong>
              </div>
              <div className="profile-row">
                <span>Member Since</span>
                <strong>{new Date(user.createdAt || Date.now()).toLocaleDateString()}</strong>
              </div>
            </div>

            {/* Stats */}
            <div className="dash-stats">
              <div className="stat-card">
                <span>👁️</span>
                <h3>{watchedCount}</h3>
                <p>Watched Courses</p>
              </div>
              <div className="stat-card">
                <span>✅</span>
                <h3>{completedCount}</h3>
                <p>Completed</p>
              </div>
              <div className="stat-card">
                <span>🏆</span>
                <h3>{completedCount}</h3>
                <p>Certificates</p>
              </div>
            </div>

            {/* Activate CTA if not premium */}
            {!user.isPremium && (
              <div className="activate-cta">
                <span>🔑</span>
                <div>
                  <h4>Unlock Full Access</h4>
                  <p>Enter your activation code to get premium access to all courses.</p>
                </div>
                <Link to="/activate" className="btn-activate-now">Activate Now</Link>
              </div>
            )}
          </div>
        )}

        {/* MY PROGRESS TAB */}
        {activeTab === 'courses' && (
          <div className="dash-section">
            <h2>📚 My Progress</h2>

            {/* Progress overview */}
            <div className="progress-overview">
              <div className="progress-stat">
                <h3>{watchedCount}</h3>
                <p>Courses Started</p>
              </div>
              <div className="progress-divider" />
              <div className="progress-stat">
                <h3>{completedCount}</h3>
                <p>Completed</p>
              </div>
              <div className="progress-divider" />
              <div className="progress-stat">
                <h3>{watchedCount > 0 ? Math.round((completedCount / watchedCount) * 100) : 0}%</h3>
                <p>Completion Rate</p>
              </div>
            </div>

            {progress.length > 0 ? (
              <div className="progress-list">
                {progress.map((p, i) => (
                  <div key={i} className="progress-item">
                    <div className="progress-info">
                      <span className="progress-course-id">Course #{p.courseId}</span>
                      <span className={p.completed ? 'status-done' : 'status-watching'}>
                        {p.completed ? '✅ Completed' : '👁️ Watching'}
                      </span>
                    </div>
                    <div className="progress-meta">
                      <span>Last watched: {new Date(p.lastWatched).toLocaleDateString()}</span>
                      {p.completedAt && (
                        <span>Completed: {new Date(p.completedAt).toLocaleDateString()}</span>
                      )}
                    </div>
                    <Link to={`/courses/${p.courseId}`} className="btn-continue">
                      {p.completed ? '🔁 Review' : '▶ Continue'}
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span>🎓</span>
                <p>You haven't started any courses yet!</p>
                <Link to="/courses" className="btn-browse">Browse Courses</Link>
              </div>
            )}
          </div>
        )}

        {/* CREATE COURSE TAB */}
        {activeTab === 'create' && (user.role === 'instructor' || user.role === 'admin') && (
          <div className="dash-section">
            <h2>➕ Create New Course</h2>

            {msg && (
              <div className={msg.startsWith('✅') ? 'msg-success' : 'msg-error'}>
                {msg}
              </div>
            )}

            <form onSubmit={handleCreateCourse} className="course-form">
              <div className="form-group">
                <label>Course Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. React for Beginners"
                  value={courseForm.title}
                  onChange={handleCourseChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  placeholder="What will students learn?"
                  value={courseForm.description}
                  onChange={handleCourseChange}
                  rows={4}
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select name="category" value={courseForm.category} onChange={handleCourseChange}>
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="fullstack">Full Stack</option>
                  <option value="design">Design</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>YouTube Video URL (embed format)</label>
                <input
                  type="text"
                  name="videoUrl"
                  placeholder="https://www.youtube.com/embed/VIDEO_ID"
                  value={courseForm.videoUrl}
                  onChange={handleCourseChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Thumbnail Image URL (optional)</label>
                <input
                  type="text"
                  name="image"
                  placeholder="https://example.com/image.jpg"
                  value={courseForm.image}
                  onChange={handleCourseChange}
                />
              </div>

              <button type="submit" className="btn-create" disabled={loading}>
                {loading ? '⏳ Creating...' : '🚀 Create Course'}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;