 import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirm: '', role: 'student'
  });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.confirm) {
      setError('Please fill in all fields.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (formData.password !== formData.confirm) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    const result = await register(formData.name, formData.email, formData.password, formData.role);
    setLoading(false);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">📚 Learnify</div>
        <h2>Create Your Account</h2>
        <p className="auth-subtitle">Start learning for free today</p>

        {error && <div className="auth-error">⚠️ {error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirm"
              placeholder="Repeat your password"
              value={formData.confirm}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>I want to join as</label>
            <div className="role-selector">
              <button
                type="button"
                className={formData.role === 'student' ? 'role-btn active' : 'role-btn'}
                onClick={() => setFormData({ ...formData, role: 'student' })}
              >🎓 Student</button>
              <button
                type="button"
                className={formData.role === 'instructor' ? 'role-btn active' : 'role-btn'}
                onClick={() => setFormData({ ...formData, role: 'instructor' })}
              >👨‍🏫 Instructor</button>
            </div>
          </div>

          <button type="submit" className="btn-auth" disabled={loading}>
            {loading ? '⏳ Creating account...' : 'Create Account →'}
          </button>
        </form>

        <div className="auth-divider"><span>or</span></div>

        <button className="btn-social">
          <img src="https://www.google.com/favicon.ico" alt="Google" width="18" />
          Sign up with Google
        </button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;