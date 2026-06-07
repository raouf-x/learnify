
import { useState } from 'react';
import CourseCard from '../components/CourseCard';
import courses from '../data/courses';
import './Home.css';

function Home() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Filter courses based on category and search text
  const filtered = courses.filter(c => {
    const matchCategory = filter === 'all' || c.category === filter;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div>

      {/* HERO */}
      <section className="hero">
        <h1>Learn <span>Without Limits</span></h1>
        <p>Watch free courses, track your progress, and grow your skills every day.</p>
        <a href="#courses" className="btn-hero">Browse Courses</a>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>Why Choose Learnify?</h2>
        <div className="feature-cards">
          {[
            { icon: '🎥', title: 'Video Lessons', desc: 'Watch from YouTube and other sources in one place.' },
            { icon: '📈', title: 'Track Progress', desc: 'Know exactly where you are in every course.' },
            { icon: '🏆', title: 'Earn Certificates', desc: 'Complete courses and earn shareable certificates.' },
            { icon: '💬', title: 'Community', desc: 'Ask questions and learn together.' },
          ].map((f, i) => (
            <div className="feat-card" key={i}>
              <span>{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COURSES */}
      <section className="courses-section" id="courses">
        <h2>Popular Courses</h2>

        {/* Search */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍 Search courses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          {['all', 'frontend', 'backend', 'fullstack'].map(cat => (
            <button
              key={cat}
              className={filter === cat ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="course-grid">
          {filtered.length > 0
            ? filtered.map(course => <CourseCard key={course.id} course={course} />)
            : <p className="no-results">No courses found. Try a different search!</p>
          }
        </div>
      </section>

    </div>
  );
}

export default Home;