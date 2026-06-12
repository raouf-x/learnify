
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const { user, logout }            = useAuth();
  const { t, lang, toggleLang }     = useLang();
  const navigate                    = useNavigate();
  const location                    = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => { logout(); navigate('/'); setMenuOpen(false); };
  const isActive = (path) => location.pathname === path;

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      {/* Scan line effect */}
      <div className="nav-scanline" />

      <nav className="nav-inner">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <span className="logo-icon">📚</span>
          <span className="logo-text">LEARNIFY</span>
          <span className="logo-badge">BAC 2027</span>
        </Link>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
          <span className={menuOpen ? 'ham-line open' : 'ham-line'} />
          <span className={menuOpen ? 'ham-line open' : 'ham-line'} />
          <span className={menuOpen ? 'ham-line open' : 'ham-line'} />
        </button>

        {/* Links */}
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li>
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <span className="nav-link-dot" />
              {t.home}
            </Link>
          </li>
          <li>
            <Link
              to="/courses"
              className={`nav-link ${isActive('/courses') ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <span className="nav-link-dot" />
              {t.courses}
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <Link
                  to="/dashboard"
                  className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="nav-link-dot" />
                  <span className="nav-user-avatar">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                  {user.name}
                  {user.isPremium && <span className="nav-premium">💎</span>}
                </Link>
              </li>
              {user.role === 'admin' && (
                <li>
                  <Link to="/admin" className="nav-link" onClick={() => setMenuOpen(false)}>
                    🛠️ Admin
                  </Link>
                </li>
              )}
              <li>
                <button onClick={handleLogout} className="btn-logout-nav">
                  {t.logout}
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className={`nav-link ${isActive('/login') ? 'active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="nav-link-dot" />
                  {t.login}
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="btn-signup-nav"
                  onClick={() => setMenuOpen(false)}
                >
                  {t.signup}
                </Link>
              </li>
            </>
          )}

          {/* Language toggle */}
          <li>
            <button onClick={toggleLang} className="btn-lang-nav">
              {lang === 'en' ? '🇩🇿 AR' : '🇬🇧 FR'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}