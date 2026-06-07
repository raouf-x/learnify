import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    const result = await login(formData.email, formData.password);
    setLoading(false);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">📚 Learnify</div>
        <h2>Welcome Back!</h2>
        <p className="auth-subtitle">Login to continue learning</p>

        {error && <div className="auth-error">⚠️ {error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
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
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            <a href="#" className="forgot-link">Forgot password?</a>
          </div>

          <button type="submit" className="btn-auth" disabled={loading}>
            {loading ? '⏳ Logging in...' : 'Login →'}
          </button>
        </form>

        <div className="auth-divider"><span>or</span></div>

        <button className="btn-social">
          <img src="https://www.google.com/favicon.ico" alt="Google" width="18" />
          Continue with Google
        </button>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Sign Up Free</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;