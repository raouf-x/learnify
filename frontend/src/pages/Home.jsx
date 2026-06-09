import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import courses from '../data/courses';
import './Home.css';

// Animated counter hook
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
  const [filter, setFilter]       = useState('all');
  const [search, setSearch]       = useState('');
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  const students  = useCounter(12500, 2000, statsVisible);
  const courses_n = useCounter(48,    1500, statsVisible);
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
    { id: 'all',       label: 'All',        icon: '🌐' },
    { id: 'frontend',  label: 'Frontend',   icon: '🎨' },
    { id: 'backend',   label: 'Backend',    icon: '⚙️'  },
    { id: 'fullstack', label: 'Full Stack', icon: '🚀' },
  ];

  return (
    <div className="home">

      {/* ===== HERO ===== */}
      <section className="hero">
        {/* Animated background particles */}
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

        {/* Glowing orbs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            🚀 The Future of Learning is Here
          </div>

          <h1 className="hero-title">
            Learn Without
            <span className="gradient-text"> Limits</span>
            <br />
            <span className="hero-sub-title">Build Your Future Today</span>
          </h1>

          <p className="hero-desc">
            Master modern tech skills with world-class video courses.
            Join thousands of developers building their dream careers.
          </p>

          <div className="hero-btns">
            <Link to="/courses" className="btn-primary">
              🚀 Start Learning Free
            </Link>
            <Link to="/register" className="btn-outline">
              ✨ Join the Community
            </Link>
          </div>

          {/* Floating tech tags */}
          <div className="tech-tags">
            {['React', 'Node.js', 'MongoDB', 'CSS', 'JavaScript', 'Python'].map(t => (
              <span key={t} className="tech-tag">{t}</span>
            ))}
          </div>
        </div>

        {/* 3D Card floating */}
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
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="stats-section" ref={statsRef}>
        <div className="stats-grid">
          {[
            { icon: '👥', value: students.toLocaleString()  + '+', label: 'Active Students'  },
            { icon: '📚', value: courses_n + '+',                   label: 'Video Courses'    },
            { icon: '⭐', value: rating    + '%',                   label: 'Satisfaction Rate'},
            { icon: '⏱️', value: hours     + '+',                   label: 'Hours of Content' },
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
          <span className="section-tag">WHY LEARNIFY</span>
          <h2>Everything You Need to <span className="gradient-text">Succeed</span></h2>
          <p>Built for the next generation of developers</p>
        </div>

        <div className="features-grid">
          {[
            { icon: '🎥', title: 'HD Video Lessons',      desc: 'Watch crystal-clear courses from YouTube and top instructors worldwide.',     color: '#e94560' },
            { icon: '📈', title: 'Track Your Progress',   desc: 'Smart progress tracking keeps you motivated and on the right path.',          color: '#6366f1' },
            { icon: '🏆', title: 'Earn Certificates',     desc: 'Complete courses and earn certificates to showcase your skills.',             color: '#f59e0b' },
            { icon: '💬', title: 'Community Support',     desc: 'Join a community of passionate learners and get help when you need it.',      color: '#22c55e' },
            { icon: '🔑', title: 'Activation System',     desc: 'Simple one-time activation code gives you lifetime access to all content.',   color: '#e94560' },
            { icon: '📱', title: 'Learn Anywhere',        desc: 'Access your courses on any device, anytime, anywhere in the world.',          color: '#6366f1' },
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
          <span className="section-tag">COURSES</span>
          <h2>Start Learning <span className="gradient-text">Today</span></h2>
          <p>Hand-picked courses to boost your career</p>
        </div>

        {/* Search */}
        <div className="search-wrap">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search courses, topics, skills..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch('')} className="clear-btn">✕</button>
            )}
          </div>
        </div>

        {/* Filter tabs */}
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

        {/* Results */}
        <p className="results-info">
          {filtered.length} course{filtered.length !== 1 ? 's' : ''} found
        </p>

        <div className="courses-grid">
          {filtered.length > 0
            ? filtered.map(c => <CourseCard key={c.id} course={c} />)
            : (
              <div className="no-results">
                <span>😕</span>
                <p>No courses found for "<strong>{search}</strong>"</p>
                <button onClick={() => { setSearch(''); setFilter('all'); }}>
                  Clear Search
                </button>
              </div>
            )
          }
        </div>

        <div className="see-all-wrap">
          <Link to="/courses" className="btn-see-all">
            View All Courses →
          </Link>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="how-section">
        <div className="section-header">
          <span className="section-tag">HOW IT WORKS</span>
          <h2>Start in <span className="gradient-text">3 Simple Steps</span></h2>
        </div>

        <div className="steps-grid">
          {[
            { num: '01', icon: '👤', title: 'Create Account',    desc: 'Sign up for free in seconds. No credit card required.' },
            { num: '02', icon: '🔑', title: 'Activate Access',   desc: 'Enter your activation code to unlock all premium courses.' },
            { num: '03', icon: '🚀', title: 'Start Learning',    desc: 'Watch videos, track progress, and earn certificates.' },
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
          <h2>Ready to Start Your <span className="gradient-text">Journey?</span></h2>
          <p>Join thousands of students already learning on Learnify</p>
          <div className="cta-btns">
            <Link to="/register" className="btn-primary">Get Started Free →</Link>
            <Link to="/activate" className="btn-outline">🔑 Activate Code</Link>
          </div>
        </div>
      </section>

    </div>
  );
}