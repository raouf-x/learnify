import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout }        = useAuth();
  const { t, lang, toggleLang } = useLang();
  const navigate                = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <nav>
        <Link to="/" className="logo">📚 Learnify</Link>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>

        <ul className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <li><Link to="/"       onClick={() => setMenuOpen(false)}>{t.home}</Link></li>
          <li><Link to="/courses"onClick={() => setMenuOpen(false)}>{t.courses}</Link></li>

          {user ? (
            <>
              <li>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                  👤 {user.name}
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="btn-logout">
                  {t.logout}
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login"    onClick={() => setMenuOpen(false)}>{t.login}</Link></li>
              <li>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="btn-signup">
                  {t.signup}
                </Link>
              </li>
            </>
          )}

          {/* Language Toggle Button */}
          <li>
            <button onClick={toggleLang} className="btn-lang">
              {lang === 'en' ? '🇩🇿 العربية' : '🇬🇧 English'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;