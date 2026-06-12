import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';
import './Auth.css';

export default function Register() {
  const navigate          = useNavigate();
  const { register }      = useAuth();
  const { t }             = useLang();
  const [form, setForm]   = useState({ name:'', email:'', password:'', confirm:'', role:'student' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [strength, setStrength] = useState(0);

  const checkStrength = pass => {
    let s = 0;
    if (pass.length >= 6)  s++;
    if (pass.length >= 10) s++;
    if (/[A-Z]/.test(pass)) s++;
    if (/[0-9]/.test(pass)) s++;
    setStrength(s);
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === 'password') checkStrength(e.target.value);
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirm) { setError('يرجى ملء جميع الحقول'); return; }
    if (form.password.length < 6) { setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل'); return; }
    if (form.password !== form.confirm) { setError('كلمتا المرور غير متطابقتين'); return; }
    setLoading(true);
    const res = await register(form.name, form.email, form.password, form.role);
    setLoading(false);
    if (res.success) navigate('/');
    else setError(res.message || 'Registration failed');
  };

  const strengthLabels = ['', 'ضعيفة', 'متوسطة', 'جيدة', 'قوية'];
  const strengthColors = ['', '#ef4444', '#f59e0b', '#22c55e', '#00f5ff'];

  return (
    <div className="auth-page">
      <div className="auth-bg-orb auth-orb1" />
      <div className="auth-bg-orb auth-orb2" />
      <div className="auth-grid" />

      <div className="auth-card auth-card-wide">
        <div className="auth-card-glow" />

        <div className="auth-logo">
          <span className="auth-logo-icon">📚</span>
          <span className="auth-logo-text">LEARNIFY</span>
        </div>
        <div className="auth-badge">BAC 2027 🇩🇿</div>

        <h2 className="auth-title">{t.createAccount}</h2>
        <p className="auth-sub">{t.registerSub}</p>

        {error && <div className="auth-error"><span>⚠️</span> {error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">

          {/* Name */}
          <div className="auth-field">
            <label>{t.nameLabel}</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">👤</span>
              <input type="text" name="name" placeholder="الاسم الكامل"
                value={form.name} onChange={handleChange} />
              <div className="auth-input-line" />
            </div>
          </div>

          {/* Email */}
          <div className="auth-field">
            <label>{t.emailLabel}</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">📧</span>
              <input type="email" name="email" placeholder="example@gmail.com"
                value={form.email} onChange={handleChange} />
              <div className="auth-input-line" />
            </div>
          </div>

          {/* Password */}
          <div className="auth-field">
            <label>{t.passwordLabel}</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">🔒</span>
              <input type={showPass ? 'text' : 'password'} name="password"
                placeholder="6 أحرف على الأقل"
                value={form.password} onChange={handleChange} />
              <button type="button" className="auth-eye" onClick={() => setShowPass(!showPass)}>
                {showPass ? '🙈' : '👁️'}
              </button>
              <div className="auth-input-line" />
            </div>
            {/* Password strength */}
            {form.password && (
              <div className="pass-strength">
                <div className="strength-bars">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="strength-bar"
                      style={{background: i <= strength ? strengthColors[strength] : 'rgba(255,255,255,0.1)'}} />
                  ))}
                </div>
                <span style={{color: strengthColors[strength], fontSize:'0.75rem'}}>
                  {strengthLabels[strength]}
                </span>
              </div>
            )}
          </div>

          {/* Confirm */}
          <div className="auth-field">
            <label>{t.confirmLabel}</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">🔐</span>
              <input type="password" name="confirm" placeholder="تأكيد كلمة المرور"
                value={form.confirm} onChange={handleChange} />
              {form.confirm && (
                <span className="auth-match">
                  {form.password === form.confirm ? '✅' : '❌'}
                </span>
              )}
              <div className="auth-input-line" />
            </div>
          </div>

          {/* Role */}
          <div className="auth-field">
            <label>{t.roleLabel}</label>
            <div className="role-btns">
              <button type="button"
                className={`role-btn ${form.role === 'student' ? 'active' : ''}`}
                onClick={() => setForm({...form, role:'student'})}>
                🎓 {t.studentRole}
              </button>
              <button type="button"
                className={`role-btn ${form.role === 'instructor' ? 'active' : ''}`}
                onClick={() => setForm({...form, role:'instructor'})}>
                👨‍🏫 {t.instructorRole}
              </button>
            </div>
          </div>

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? (
              <><span className="auth-spinner" /> جاري إنشاء الحساب...</>
            ) : (
              <>{t.registerBtn} <span className="btn-arrow">→</span></>
            )}
          </button>
        </form>

        <div className="auth-divider"><span>أو</span></div>

        <button className="auth-google">
          <img src="https://www.google.com/favicon.ico" alt="Google" width="16" />
          {t.googleLogin}
        </button>

        <p className="auth-switch">
          {t.haveAccount} <Link to="/login">{t.login}</Link>
        </p>
      </div>
    </div>
  );
}