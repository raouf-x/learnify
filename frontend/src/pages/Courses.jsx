
import { useState } from 'react';
import CourseCard from '../components/CourseCard';
import courses from '../data/courses';
import './Courses.css';

function Courses() {
  const [filter, setFilter]   = useState('all');
  const [search, setSearch]   = useState('');
  const [sort, setSort]       = useState('popular');

  const categories = ['all', 'frontend', 'backend', 'fullstack'];

  const filtered = courses
    .filter(c => {
      const matchCat    = filter === 'all' || c.category === filter;
      const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
                          c.instructor.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sort === 'popular')  return b.students - a.students;
      if (sort === 'rating')   return b.rating - a.rating;
      if (sort === 'newest')   return b.id - a.id;
      return 0;
    });

  return (
    <div className="courses-page">

      {/* PAGE HEADER */}
      <div className="courses-header">
        <h1>All Courses</h1>
        <p>Expand your skills with our free video courses</p>
      </div>

      {/* CONTROLS */}
      <div className="courses-controls">

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search by title or instructor..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="courses-search"
        />

        {/* Sort */}
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="courses-sort"
        >
          <option value="popular">Most Popular</option>
          <option value="rating">Highest Rated</option>
          <option value="newest">Newest</option>
        </select>

      </div>

      {/* CATEGORY TABS */}
      <div className="category-tabs">
        {categories.map(cat => (
          <button
            key={cat}
            className={filter === cat ? 'tab active' : 'tab'}
            onClick={() => setFilter(cat)}
          >
            {cat === 'all'       ? '📚 All'       : ''}
            {cat === 'frontend'  ? '🎨 Frontend'  : ''}
            {cat === 'backend'   ? '⚙️ Backend'   : ''}
            {cat === 'fullstack' ? '🚀 Full Stack' : ''}
          </button>
        ))}
      </div>

      {/* RESULTS COUNT */}
      <p className="results-count">
        Showing <strong>{filtered.length}</strong> course{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* COURSE GRID */}
      <div className="courses-grid">
        {filtered.length > 0
          ? filtered.map(c => <CourseCard key={c.id} course={c} />)
          : (
            <div className="no-results">
              <span>😕</span>
              <p>No courses found for "<strong>{search}</strong>"</p>
              <button onClick={() => { setSearch(''); setFilter('all'); }}>
                Clear filters
              </button>
            </div>
          )
        }
      </div>

    </div>
  );
}

export default Courses;