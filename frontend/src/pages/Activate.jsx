import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Activate.css';

function Activate() {
  const { user, token } = useAuth();
  const [code, setCode]       = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg]         = useState('');
  const [success, setSuccess] = useState(false);

  if (!user) {
    return (
      <div className="activate-page">
        <div className="activate-card">
          <h2>🔒 Please login first</h2>
          <Link to="/login" className="btn-activate">Go to Login</Link>
        </div>
      </div>
    );
  }

  if (user.isPremium) {
    return (
      <div className="activate-page">
        <div className="activate-card">
          <div className="activate-icon">✅</div>
          <h2>Already Activated!</h2>
          <p>Your account is already <strong>{user.plan?.toUpperCase()}</strong></p>
          <Link to="/courses" className="btn-activate">Browse Courses</Link>
        </div>
      </div>
    );
  }

  const handleActivate = async (e) => {
    e.preventDefault();
    if (!code.trim()) {
      setMsg('Please enter your activation code');
      return;
    }

    setLoading(true);
    setMsg('');

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || 'https://learnify-57xq.onrender.com/api'}/codes/activate`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ code: code.trim().toUpperCase() })
        }
      );
      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setMsg(data.message);
      } else {
        setMsg(data.message);
      }
    } catch {
      setMsg('❌ Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="activate-page">
      <div className="activate-card">

        {success ? (
          // Success state
          <div className="success-state">
            <div className="activate-icon">🎉</div>
            <h2>Account Activated!</h2>
            <p>{msg}</p>
            <Link to="/courses" className="btn-activate">Start Learning Now →</Link>
          </div>
        ) : (
          // Form state
          <>
            <div className="activate-icon">🔑</div>
            <h2>Activate Your Account</h2>
            <p className="activate-subtitle">
              Enter the activation code you received after payment
            </p>

            {msg && <div className="activate-error">{msg}</div>}

            <form onSubmit={handleActivate} className="activate-form">
              <input
                type="text"
                placeholder="LEARN-XXXX-XXXX"
                value={code}
                onChange={e => setCode(e.target.value.toUpperCase())}
                maxLength={14}
                className="code-input"
              />
              <button type="submit" className="btn-activate" disabled={loading}>
                {loading ? '⏳ Activating...' : '🚀 Activate Now'}
              </button>
            </form>

            <p className="activate-help">
              Don't have a code? <a href="mailto:hello@learnify.com">Contact us</a> to purchase access.
            </p>
          </>
        )}

      </div>
    </div>
  );
}

export default Activate;