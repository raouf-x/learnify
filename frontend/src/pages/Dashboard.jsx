import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createCourse } from '../api';
import './Dashboard.css';

function Dashboard() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [courseForm, setCourseForm] = useState({
    title: '', description: '', category: 'frontend', videoUrl: '', image: ''
  });
  const [msg, setMsg]         = useState('');
  const [loading, setLoading] = useState(false);

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
          >📚 My Courses</button>

          {user.role === 'instructor' && (
            <button
              className={activeTab === 'create' ? 'dash-btn active' : 'dash-btn'}
              onClick={() => setActiveTab('create')}
            >➕ Create Course</button>
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
                <span>Member Since</span>
                <strong>{new Date(user.createdAt || Date.now()).toLocaleDateString()}</strong>
              </div>
            </div>

            {/* Stats */}
            <div className="dash-stats">
              <div className="stat-card">
                <span>📚</span>
                <h3>0</h3>
                <p>Enrolled Courses</p>
              </div>
              <div className="stat-card">
                <span>✅</span>
                <h3>0</h3>
                <p>Completed</p>
              </div>
              <div className="stat-card">
                <span>🏆</span>
                <h3>0</h3>
                <p>Certificates</p>
              </div>
            </div>
          </div>
        )}

        {/* MY COURSES TAB */}
        {activeTab === 'courses' && (
          <div className="dash-section">
            <h2>📚 My Courses</h2>
            <div className="empty-state">
              <span>🎓</span>
              <p>You haven't enrolled in any courses yet!</p>
              <Link to="/courses" className="btn-browse">Browse Courses</Link>
            </div>
          </div>
        )}

        {/* CREATE COURSE TAB (Instructors only) */}
        {activeTab === 'create' && user.role === 'instructor' && (
          <div className="dash-section">
            <h2>➕ Create New Course</h2>

            {msg && <div className={msg.startsWith('✅') ? 'msg-success' : 'msg-error'}>{msg}</div>}

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