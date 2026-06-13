import { useState } from 'react';
import { Link } from 'react-router-dom';
import courses from '../data/courses';
import { useLang } from '../context/LanguageContext';
import './Courses.css';

const SPECS = [
  { id: 'all',      labelFr: 'Toutes',               labelAr: 'الكل',          icon: '🌐', color: '#6366f1' },
  { id: 'sciences', labelFr: 'Sciences Exp.',         labelAr: 'علوم تجريبية', icon: '🔬', color: '#22c55e' },
  { id: 'math',     labelFr: 'Mathématiques',         labelAr: 'رياضيات',      icon: '📐', color: '#6366f1' },
  { id: 'techmath', labelFr: 'Math. Techniques',      labelAr: 'تقني رياضي',   icon: '⚙️', color: '#f59e0b' },
  { id: 'mechanic', labelFr: 'Mécanique',             labelAr: 'ميكانيك',      icon: '🔧', color: '#e94560' },
  { id: 'electric', labelFr: 'Électrotechnique',      labelAr: 'كهرباء',       icon: '⚡', color: '#22d3ee' },
  { id: 'civil',    labelFr: 'Génie Civil',           labelAr: 'هندسة مدنية',  icon: '🏗️', color: '#a78bfa' },
  { id: 'gestion',  labelFr: 'Gestion & Économie',    labelAr: 'تسيير واقتصاد',icon: '📊', color: '#34d399' },
  { id: 'lettres',  labelFr: 'Lettres & Philosophie', labelAr: 'آداب وفلسفة',  icon: '📖', color: '#fb923c' },
];

const TYPE_COLORS = {
  cours:        { bg: '#1e3a5f', color: '#60a5fa', label: 'Cours',        labelAr: 'درس'         },
  exercice:     { bg: '#14532d', color: '#4ade80', label: 'Exercices',    labelAr: 'تمارين'      },
  methodologie: { bg: '#4c1d95', color: '#c084fc', label: 'Méthodologie', labelAr: 'منهجية'      },
  tanafos:      { bg: '#7f1d1d', color: '#f87171', label: 'Tanafos',      labelAr: 'تنافس'       },
  revision:     { bg: '#78350f', color: '#fbbf24', label: 'Révision',     labelAr: 'مراجعة'      },
};

function CourseCard({ course, lang }) {
  const title = lang === 'ar' ? course.titleAr    : course.title;
  const unit  = lang === 'ar' ? course.unitAr     : course.unitFr;
  const spec  = SPECS.find(s => s.id === course.category);
  const type  = TYPE_COLORS[course.type] || TYPE_COLORS.cours;

  return (
    <div className="bac-card">
      <div className="bac-card-top" style={{background: spec?.color + '22', borderBottom: `2px solid ${spec?.color}33`}}>
        <span className="bac-unit-label">{unit}</span>
        <span className="bac-type-badge" style={{background: type.bg, color: type.color}}>
          {lang === 'ar' ? type.labelAr : type.label}
        </span>
      </div>
      <div className="bac-card-body">
        <div className="bac-instructor-row">
          <span className="bac-instructor-badge">👨‍🏫 {course.instructor}</span>
          <span className="bac-rating">⭐ {course.rating}</span>
        </div>
        <h3>{title}</h3>
        <div className="bac-card-footer">
          <span className="bac-students">👥 {course.students}</span>
          <Link to={`/courses/${course.id}`} className="bac-btn-watch">
            {lang === 'ar' ? '▶ شاهد' : '▶ Voir'}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Courses() {
  const { lang }             = useLang();
  const [filter, setFilter]  = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [search, setSearch]  = useState('');

  const types = [
    { id: 'all',        labelFr: 'Tout',          labelAr: 'الكل'      },
    { id: 'cours',      labelFr: 'Cours',         labelAr: 'دروس'      },
    { id: 'exercice',   labelFr: 'Exercices',     labelAr: 'تمارين'    },
    { id: 'methodologie',labelFr:'Méthodologie',  labelAr: 'منهجية'    },
    { id: 'tanafos',    labelFr: 'Tanafos',       labelAr: 'تنفس'     },
    { id: 'revision',   labelFr: 'Révision',      labelAr: 'مراجعة'    },
  ];

  const filtered = courses.filter(c => {
    const matchCat  = filter === 'all' || c.category === filter;
    const matchType = typeFilter === 'all' || c.type === typeFilter;
    const title     = lang === 'ar' ? c.titleAr : c.title;
    const matchSearch = title.toLowerCase().includes(search.toLowerCase()) ||
                        c.instructor.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchType && matchSearch;
  });

  return (
    <div className="courses-page-bac">

      {/* Header */}
      <div className="bac-header">
        <div className="bac-header-content">
          <span className="bac-tag">BAC 2027 🇩🇿</span>
          <h1>{lang === 'ar' ? 'منصة التعلم للبكالوريا' : 'Plateforme BAC 2027'}</h1>
          <p>{lang === 'ar'
            ? 'جميع الوحدات والمواد — دروس، تمارين، مراجعات'
            : 'Toutes les unités — Cours, Exercices, Révisions'}
          </p>
        </div>
      </div>

      <div className="bac-content">

        {/* Search */}
        <div className="bac-controls">
          <div className="bac-search">
            <span>🔍</span>
            <input
              type="text"
              placeholder={lang === 'ar' ? 'ابحث عن درس أو أستاذ...' : 'Rechercher un cours ou prof...'}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && <button onClick={() => setSearch('')} className="bac-clear">✕</button>}
          </div>
        </div>

        {/* Specialization tabs */}
        <div className="bac-specs">
          {SPECS.map(s => (
            <button
              key={s.id}
              className={filter === s.id ? 'spec-tab active' : 'spec-tab'}
              style={filter === s.id ? { background: s.color, borderColor: s.color } : {}}
              onClick={() => setFilter(s.id)}
            >
              {s.icon} {lang === 'ar' ? s.labelAr : s.labelFr}
            </button>
          ))}
        </div>

        {/* Type filter */}
        <div className="bac-types">
          {types.map(t => (
            <button
              key={t.id}
              className={typeFilter === t.id ? 'type-tab active' : 'type-tab'}
              onClick={() => setTypeFilter(t.id)}
            >
              {lang === 'ar' ? t.labelAr : t.labelFr}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="bac-count">
          {lang === 'ar' ? `${filtered.length} فيديو متاح` : `${filtered.length} vidéos disponibles`}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="bac-grid">
            {filtered.map(c => <CourseCard key={c.id} course={c} lang={lang} />)}
          </div>
        ) : (
          <div className="bac-empty">
            <span>😕</span>
            <p>{lang === 'ar' ? 'لا توجد فيديوهات' : 'Aucune vidéo trouvée'}</p>
            <button onClick={() => { setSearch(''); setFilter('all'); setTypeFilter('all'); }}>
              {lang === 'ar' ? 'مسح البحث' : 'Effacer'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}