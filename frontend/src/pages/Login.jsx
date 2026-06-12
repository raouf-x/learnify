import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';
import './Auth.css';

export default function Login() {
  const navigate          = useNavigate();
  const { login }         = useAuth();
  const { t }             = useLang();
  const [form, setForm]   = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.email || !form.password) { setError(t.emailLabel + ' & ' + t.passwordLabel + ' required'); return; }
    setLoading(true);
    const res = await login(form.email, form.password);
    setLoading(false);
    if (res.success) navigate('/');
    else setError(res.message || 'Login failed');
  };

  return (
    <div className="auth-page">
      {/* Background effects */}
      <div className="auth-bg-orb auth-orb1" />
      <div className="auth-bg-orb auth-orb2" />
      <div className="auth-grid" />

      <div className="auth-card">
        {/* Top glow line */}
        <div className="auth-card-glow" />

        {/* Logo */}
        <div className="auth-logo">
          <span className="auth-logo-icon">📚</span>
          <span className="auth-logo-text">LEARNIFY</span>
        </div>
        <div className="auth-badge">BAC 2027 🇩🇿</div>

        <h2 className="auth-title">{t.welcomeBack}</h2>
        <p className="auth-sub">{t.loginSubtitle}</p>

        {/* Error */}
        {error && (
          <div className="auth-error">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Email */}
          <div className="auth-field">
            <label>{t.emailLabel}</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">📧</span>
              <input
                type="email" name="email"
                placeholder="example@gmail.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
              <div className="auth-input-line" />
            </div>
          </div>

          {/* Password */}
          <div className="auth-field">
            <div className="auth-field-header">
              <label>{t.passwordLabel}</label>
              <a href="#" className="auth-forgot">{t.forgotPassword}</a>
            </div>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">🔒</span>
              <input
                type={showPass ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <button type="button" className="auth-eye" onClick={() => setShowPass(!showPass)}>
                {showPass ? '🙈' : '👁️'}
              </button>
              <div className="auth-input-line" />
            </div>
          </div>

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? (
              <><span className="auth-spinner" /> جاري تسجيل الدخول...</>
            ) : (
              <>{t.loginBtn} <span className="btn-arrow">→</span></>
            )}
          </button>
        </form>

        <div className="auth-divider"><span>أو</span></div>

        <button className="auth-google">
          <img src="https://www.google.com/favicon.ico" alt="Google" width="16" />
          {t.googleLogin}
        </button>

        <p className="auth-switch">
          {t.noAccount} <Link to="/register">{t.signUpFree}</Link>
        </p>
      </div>
    </div>
  );
}