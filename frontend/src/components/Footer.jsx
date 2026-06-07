
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">

        <div className="footer-brand">
          <h2>📚 Learnify</h2>
          <p>Learn without limits. Free courses for everyone, everywhere.</p>
        </div>

        <div className="footer-links">
          <h4>Platform</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Sign Up</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Categories</h4>
          <ul>
            <li><Link to="/courses">Frontend</Link></li>
            <li><Link to="/courses">Backend</Link></li>
            <li><Link to="/courses">Full Stack</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:hello@learnify.com">hello@learnify.com</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">YouTube</a></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2024 Learnify. Built with ❤️ for learners everywhere.</p>
      </div>
    </footer>
  );
}

export default Footer;