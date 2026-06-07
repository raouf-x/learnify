import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <nav>
        <Link to="/" className="logo">📚 Learnify</Link>

        {/* Hamburger for mobile */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>

        {/* Nav links */}
        <ul className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/courses" onClick={() => setMenuOpen(false)}>Courses</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
          <li><Link to="/register" onClick={() => setMenuOpen(false)} className="btn-signup">Sign Up</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;