import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import courses from '../data/courses';
import { useLang } from '../context/LanguageContext';
import './Home.css';

function useCounter(end, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

export default function Home() {
  const { t }                           = useLang();
  const [filter, setFilter]             = useState('all');
  const [search, setSearch]             = useState('');
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  const students  = useCounter(12500, 2000, statsVisible);
  const coursesN  = useCounter(48,    1500, statsVisible);
  const rating    = useCounter(98,    1800, statsVisible);
  const hours     = useCounter(320,   2200, statsVisible);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const filtered = courses.filter(c => {
    const matchCat    = filter === 'all' || c.category === filter;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const categories = [
    { id: 'all',       label: t.allCourses, icon: '🌐' },
    { id: 'frontend',  label: t.frontend,   icon: '🎨' },
    { id: 'backend',   label: t.backend,    icon: '⚙️'  },
    { id: 'fullstack', label: t.fullstack,  icon: '🚀' },
  ];

  return (
    <div className="home">

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="particles">
          {Array.from({length: 20}).map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              width:  `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
            }} />
          ))}
        </div>

        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            {t.heroTag}
          </div>

          <h1 className="hero-title">
            {t.heroTitle1}
            <span className="gradient-text"> {t.heroTitle2}</span>
            <br />
            <span className="hero-sub-title">{t.heroTitle3}</span>
          </h1>

          <p className="hero-desc">{t.heroDesc}</p>

          <div className="hero-btns">
            <Link to="/courses"  className="btn-primary">{t.heroBtnStart}</Link>
            <Link to="/register" className="btn-outline">{t.heroBtnJoin}</Link>
          </div>

          <div className="tech-tags">
            {['React', 'Node.js', 'MongoDB', 'CSS', 'JavaScript', 'Python'].map(tag => (
              <span key={tag} className="tech-tag">{tag}</span>
            ))}
          </div>
        </div>

        <div className="hero-card-3d">
          <div className="card-3d-inner">
            <div className="card-3d-screen">
              <div className="code-line"><span className="c-pink">const</span> <span className="c-blue">learn</span> = () =&gt; {'{'}</div>
              <div className="code-line">&nbsp;&nbsp;<span className="c-green">// Your journey starts</span></div>
              <div className="code-line">&nbsp;&nbsp;<span className="c-pink">return</span> <span className="c-yellow">'success'</span>;</div>
              <div className="code-line">{'}'}</div>
              <div className="code-line c-blue blink">▋</div>
            </div>
            <div className="card-3d-footer">
              <span>📚 Learnify IDE</span>
              <span className="dot-green">● Live</span>
            </div>
          </div>
        </div>

        <div className="hero-scroll">
          <div className="scroll-dot" />
          <span>↓</span>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="stats-section" ref={statsRef}>
        <div className="stats-grid">
          {[
            { icon: '👥', value: students.toLocaleString() + '+', label: t.students    },
            { icon: '📚', value: coursesN + '+',                   label: t.coursesLbl  },
            { icon: '⭐', value: rating   + '%',                   label: t.satisfaction},
            { icon: '⏱️', value: hours    + '+',                   label: t.hours       },
          ].map((s, i) => (
            <div key={i} className="stat-item">
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="features-section">
        <div className="section-header">
          <span className="section-tag">{t.whyTag}</span>
          <h2>{t.whyTitle} <span className="gradient-text">{t.whyTitleHL}</span></h2>
          <p>{t.whySub}</p>
        </div>

        <div className="features-grid">
          {[
            { icon: '🎥', title: t.feat1Title, desc: t.feat1Desc, color: '#e94560' },
            { icon: '📈', title: t.feat2Title, desc: t.feat2Desc, color: '#6366f1' },
            { icon: '🏆', title: t.feat3Title, desc: t.feat3Desc, color: '#f59e0b' },
            { icon: '💬', title: t.feat4Title, desc: t.feat4Desc, color: '#22c55e' },
            { icon: '🔑', title: t.feat5Title, desc: t.feat5Desc, color: '#e94560' },
            { icon: '📱', title: t.feat6Title, desc: t.feat6Desc, color: '#6366f1' },
          ].map((f, i) => (
            <div key={i} className="feature-card" style={{'--card-color': f.color}}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <div className="feature-glow" />
            </div>
          ))}
        </div>
      </section>

      {/* ===== COURSES ===== */}
      <section className="courses-section" id="courses">
        <div className="section-header">
          <span className="section-tag">{t.coursesTag}</span>
          <h2>{t.coursesTitle} <span className="gradient-text">{t.coursesTitleHL}</span></h2>
          <p>{t.coursesSub}</p>
        </div>

        <div className="search-wrap">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch('')} className="clear-btn">✕</button>
            )}
          </div>
        </div>

        <div className="filter-tabs">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={filter === cat.id ? 'filter-tab active' : 'filter-tab'}
              onClick={() => setFilter(cat.id)}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        <p className="results-info">
          {filtered.length} {t.coursesFound}
        </p>

        <div className="courses-grid">
          {filtered.length > 0
            ? filtered.map(c => <CourseCard key={c.id} course={c} />)
            : (
              <div className="no-results">
                <span>😕</span>
                <p>{t.noResults} "<strong>{search}</strong>"</p>
                <button onClick={() => { setSearch(''); setFilter('all'); }}>
                  {t.clearSearch}
                </button>
              </div>
            )
          }
        </div>

        <div className="see-all-wrap">
          <Link to="/courses" className="btn-see-all">{t.viewAll}</Link>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="how-section">
        <div className="section-header">
          <span className="section-tag">{t.howTag}</span>
          <h2>{t.howTitle} <span className="gradient-text">{t.howTitleHL}</span></h2>
        </div>

        <div className="steps-grid">
          {[
            { num: '01', icon: '👤', title: t.step1Title, desc: t.step1Desc },
            { num: '02', icon: '🔑', title: t.step2Title, desc: t.step2Desc },
            { num: '03', icon: '🚀', title: t.step3Title, desc: t.step3Desc },
          ].map((s, i) => (
            <div key={i} className="step-card">
              <div className="step-num">{s.num}</div>
              <div className="step-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              {i < 2 && <div className="step-arrow">→</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section">
        <div className="orb orb-cta-1" />
        <div className="orb orb-cta-2" />
        <div className="cta-content">
          <h2>{t.ctaTitle} <span className="gradient-text">{t.ctaTitleHL}</span></h2>
          <p>{t.ctaSub}</p>
          <div className="cta-btns">
            <Link to="/register" className="btn-primary">{t.ctaBtn1}</Link>
            <Link to="/activate" className="btn-outline">{t.ctaBtn2}</Link>
          </div>
        </div>
      </section>

    </div>
  );
}