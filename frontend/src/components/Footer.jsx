import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import './Footer.css';

export default function Footer() {
  const { t, lang } = useLang();

  return (
    <footer className="footer">
      <div className="footer-glow" />

      <div className="footer-inner">
        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span>📚</span>
              <span className="footer-logo-text">LEARNIFY</span>
            </div>
            <p>{t.footerDesc}</p>
            <div className="footer-badge">🇩🇿 BAC 2027</div>
          </div>

          {/* Platform */}
          <div className="footer-col">
            <h4>{t.platform}</h4>
            <ul>
              <li><Link to="/">{t.home}</Link></li>
              <li><Link to="/courses">{t.courses}</Link></li>
              <li><Link to="/login">{t.login}</Link></li>
              <li><Link to="/register">{t.signup}</Link></li>
              <li><Link to="/activate">🔑 {lang === 'ar' ? 'تفعيل' : 'Activation'}</Link></li>
            </ul>
          </div>

          {/* Specializations */}
          <div className="footer-col">
            <h4>{lang === 'ar' ? 'التخصصات' : 'Spécialités'}</h4>
            <ul>
              <li><Link to="/courses">🔬 {lang === 'ar' ? 'علوم تجريبية' : 'Sciences Exp.'}</Link></li>
              <li><Link to="/courses">📐 {lang === 'ar' ? 'رياضيات' : 'Mathématiques'}</Link></li>
              <li><Link to="/courses">⚙️ {lang === 'ar' ? 'تقني رياضي' : 'Math. Tech.'}</Link></li>
              <li><Link to="/courses">🔧 {lang === 'ar' ? 'ميكانيك' : 'Mécanique'}</Link></li>
              <li><Link to="/courses">⚡ {lang === 'ar' ? 'كهرباء' : 'Électrotech.'}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>{t.contact}</h4>
            <ul>
              <li><a href="mailto:hello@learnify.dz">📧 hello@learnify.dz</a></li>
              <li><a href="#">💬 Telegram</a></li>
              <li><a href="#">▶ YouTube</a></li>
              <li><a href="#">📘 Facebook</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <div className="footer-line" />
          <div className="footer-bottom-inner">
            <p>© 2027 Learnify — {t.footerRights}</p>
            <div className="footer-bottom-links">
              <span>🇩🇿 Made for Algeria</span>
              <span>BAC 2027</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}