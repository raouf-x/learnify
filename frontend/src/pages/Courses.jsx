import { useState } from 'react';
import { Link } from 'react-router-dom';
import courses from '../data/courses';
import { useLang } from '../context/LanguageContext';
import './Courses.css';

// Specialization definitions
const SPECS = [
  { id: 'all',      labelFr: 'Toutes',                    labelAr: 'الكل',              icon: '🌐', color: '#6366f1' },
  { id: 'sciences', labelFr: 'Sciences Exp.',             labelAr: 'علوم تجريبية',      icon: '🔬', color: '#22c55e' },
  { id: 'math',     labelFr: 'Mathématiques',             labelAr: 'رياضيات',           icon: '📐', color: '#6366f1' },
  { id: 'techmath', labelFr: 'Math. Techniques',          labelAr: 'تقني رياضي',        icon: '⚙️', color: '#f59e0b' },
  { id: 'mechanic', labelFr: 'Mécanique',                 labelAr: 'ميكانيك',           icon: '🔧', color: '#e94560' },
  { id: 'electric', labelFr: 'Électrotechnique',          labelAr: 'كهرباء',            icon: '⚡', color: '#22d3ee' },
  { id: 'civil',    labelFr: 'Génie Civil',               labelAr: 'هندسة مدنية',       icon: '🏗️', color: '#a78bfa' },
  { id: 'gestion',  labelFr: 'Gestion & Économie',        labelAr: 'تسيير واقتصاد',     icon: '📊', color: '#34d399' },
  { id: 'lettres',  labelFr: 'Lettres & Philosophie',     labelAr: 'آداب وفلسفة',       icon: '📖', color: '#fb923c' },
];

function CourseCard({ course, lang }) {
  const title = lang === 'ar' ? course.titleAr : course.title;
  const desc  = lang === 'ar' ? course.descriptionAr : course.description;
  const spec  = SPECS.find(s => s.id === course.category);

  return (
    <div className="bac-card">
      <div className="bac-card-header" style={{background: spec?.color || '#6366f1'}}>
        <span className="bac-card-icon">{spec?.icon}</span>
        <span className="bac-card-spec">
          {lang === 'ar' ? spec?.labelAr : spec?.labelFr}
        </span>
      </div>
      <div className="bac-card-body">
        <span className="bac-subject">
          {lang === 'ar' ? course.subjectAr : course.subject}
        </span>
        <h3>{title}</h3>
        <p>{desc}</p>
        <div className="bac-card-meta">
          <span>👨‍🏫 {course.instructor}</span>
          <span>⭐ {course.rating}</span>
        </div>
        <div className="bac-card-footer">
          <span className="bac-students">👥 {course.students}</span>
          <Link to={`/courses/${course.id}`} className="bac-btn-watch">
            {lang === 'ar' ? 'شاهد الآن' : 'Voir le cours'}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Courses() {
  const { lang }                = useLang();
  const [filter, setFilter]     = useState('all');
  const [search, setSearch]     = useState('');
  const [sort, setSort]         = useState('popular');

  const filtered = courses
    .filter(c => {
      const matchCat    = filter === 'all' || c.category === filter;
      const title       = lang === 'ar' ? c.titleAr : c.title;
      const matchSearch = title.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sort === 'popular') return b.students - a.students;
      if (sort === 'rating')  return b.rating   - a.rating;
      return 0;
    });

  return (
    <div className="courses-page-bac">

      {/* Header */}
      <div className="bac-header">
        <div className="bac-header-content">
          <span className="bac-tag">BAC 2027 🇩🇿</span>
          <h1>
            {lang === 'ar'
              ? 'منصة التعلم للبكالوريا'
              : 'Plateforme BAC 2027'
            }
          </h1>
          <p>
            {lang === 'ar'
              ? 'جميع المواد والتخصصات — شرح واضح وسهل'
              : 'Toutes les matières et spécialités — Cours clairs et complets'
            }
          </p>
        </div>
      </div>

      <div className="bac-content">

        {/* Search + Sort */}
        <div className="bac-controls">
          <div className="bac-search">
            <span>🔍</span>
            <input
              type="text"
              placeholder={lang === 'ar' ? 'ابحث عن مادة أو دورة...' : 'Rechercher un cours...'}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="bac-sort"
          >
            <option value="popular">
              {lang === 'ar' ? 'الأكثر مشاهدة' : 'Plus populaires'}
            </option>
            <option value="rating">
              {lang === 'ar' ? 'الأعلى تقييماً' : 'Mieux notés'}
            </option>
          </select>
        </div>

        {/* Specialization tabs */}
        <div className="bac-specs">
          {SPECS.map(spec => (
            <button
              key={spec.id}
              className={filter === spec.id ? 'spec-tab active' : 'spec-tab'}
              style={filter === spec.id ? {
                background: spec.color,
                borderColor: spec.color
              } : {}}
              onClick={() => setFilter(spec.id)}
            >
              {spec.icon} {lang === 'ar' ? spec.labelAr : spec.labelFr}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="bac-count">
          {lang === 'ar'
            ? `${filtered.length} دورة متاحة`
            : `${filtered.length} cours disponibles`
          }
        </p>

        {/* Course Grid */}
        {filtered.length > 0 ? (
          <div className="bac-grid">
            {filtered.map(c => (
              <CourseCard key={c.id} course={c} lang={lang} />
            ))}
          </div>
        ) : (
          <div className="bac-empty">
            <span>😕</span>
            <p>{lang === 'ar' ? 'لا توجد دورات' : 'Aucun cours trouvé'}</p>
            <button onClick={() => { setSearch(''); setFilter('all'); }}>
              {lang === 'ar' ? 'مسح البحث' : 'Effacer la recherche'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}