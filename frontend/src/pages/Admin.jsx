import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const API = import.meta.env.VITE_API_URL || 'https://learnify-57xq.onrender.com/api';

function Admin() {
  const { user, token } = useAuth();
  const navigate        = useNavigate();
  const [tab, setTab]   = useState('dashboard');

  // Stats
  const [stats, setStats]   = useState({ users: 0, courses: 0, codes: 0, used: 0 });

  // Users
  const [users, setUsers]   = useState([]);

  // Codes
  const [codes, setCodes]         = useState([]);
  const [codeCount, setCodeCount] = useState(10);
  const [codePlan, setCodePlan]   = useState('premium');
  const [codeMsg, setCodeMsg]     = useState('');
  const [generating, setGenerating] = useState(false);

  // Courses
  const [courses, setCourses] = useState([]);

  // Redirect if not admin
  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/');
    }
  }, [user]);

  // Load data based on tab
  useEffect(() => {
    if (!token) return;
    if (tab === 'dashboard') loadStats();
    if (tab === 'users')     loadUsers();
    if (tab === 'codes')     loadCodes();
    if (tab === 'courses')   loadCourses();
  }, [tab, token]);

  const authHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  // ===== LOAD FUNCTIONS =====
  const loadStats = async () => {
    try {
      const [u, c, k] = await Promise.all([
        fetch(`${API}/auth/users`,   { headers: authHeaders }).then(r => r.json()),
        fetch(`${API}/courses`,      { headers: authHeaders }).then(r => r.json()),
        fetch(`${API}/codes`,        { headers: authHeaders }).then(r => r.json())
      ]);
      setStats({
        users:   Array.isArray(u) ? u.length : 0,
        courses: Array.isArray(c) ? c.length : 0,
        codes:   k.total  || 0,
        used:    k.used   || 0
      });
    } catch (e) { console.error(e); }
  };

  const loadUsers = async () => {
    try {
      const data = await fetch(`${API}/auth/users`, { headers: authHeaders }).then(r => r.json());
      if (Array.isArray(data)) setUsers(data);
    } catch (e) { console.error(e); }
  };

  const loadCodes = async () => {
    try {
      const data = await fetch(`${API}/codes`, { headers: authHeaders }).then(r => r.json());
      if (data.codes) setCodes(data.codes);
    } catch (e) { console.error(e); }
  };

  const loadCourses = async () => {
    try {
      const data = await fetch(`${API}/courses`, { headers: authHeaders }).then(r => r.json());
      if (Array.isArray(data)) setCourses(data);
    } catch (e) { console.error(e); }
  };

  // ===== GENERATE CODES =====
  const handleGenerateCodes = async () => {
    setGenerating(true);
    setCodeMsg('');
    try {
      const res  = await fetch(`${API}/codes/generate`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({ count: codeCount, plan: codePlan })
      });
      const data = await res.json();
      setCodeMsg(data.message || 'Done!');
      loadCodes();
    } catch {
      setCodeMsg('❌ Error generating codes');
    }
    setGenerating(false);
  };

  // ===== EXPORT CODES TO CSV =====
  const exportCodes = () => {
    const unused = codes.filter(c => !c.isUsed);
    const csv    = 'Code,Plan,Status\n' +
      unused.map(c => `${c.code},${c.plan},Available`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'learnify-codes.csv';
    a.click();
  };

  // ===== DELETE COURSE =====
  const handleDeleteCourse = async (id) => {
    if (!window.confirm('Delete this course?')) return;
    await fetch(`${API}/courses/${id}`, {
      method: 'DELETE',
      headers: authHeaders
    });
    loadCourses();
  };

  // ===== CHANGE USER ROLE =====
  const handleRoleChange = async (userId, newRole) => {
    try {
      await fetch(`${API}/auth/users/${userId}/role`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify({ role: newRole })
      });
      loadUsers();
    } catch (e) { console.error(e); }
  };

  if (!user) return <div className="admin-loading">Loading...</div>;
  if (user.role !== 'admin') return <div className="admin-loading">❌ Admin access only</div>;

  return (
    <div className="admin-page">

      {/* SIDEBAR */}
      <div className="admin-sidebar">
        <h2>🛠️ Admin Panel</h2>
        <nav>
          {[
            { id: 'dashboard', label: '📊 Dashboard' },
            { id: 'users',     label: '👥 Users'     },
            { id: 'codes',     label: '🔑 Codes'     },
            { id: 'courses',   label: '📚 Courses'   },
          ].map(t => (
            <button
              key={t.id}
              className={tab === t.id ? 'admin-tab active' : 'admin-tab'}
              onClick={() => setTab(t.id)}
            >{t.label}</button>
          ))}
        </nav>
      </div>

      {/* MAIN */}
      <div className="admin-main">

        {/* DASHBOARD TAB */}
        {tab === 'dashboard' && (
          <div>
            <h2>📊 Overview</h2>
            <div className="admin-stats">
              <div className="admin-stat-card">
                <span>👥</span>
                <h3>{stats.users}</h3>
                <p>Total Users</p>
              </div>
              <div className="admin-stat-card">
                <span>📚</span>
                <h3>{stats.courses}</h3>
                <p>Total Courses</p>
              </div>
              <div className="admin-stat-card">
                <span>🔑</span>
                <h3>{stats.codes}</h3>
                <p>Total Codes</p>
              </div>
              <div className="admin-stat-card green">
                <span>✅</span>
                <h3>{stats.used}</h3>
                <p>Codes Used</p>
              </div>
              <div className="admin-stat-card blue">
                <span>🎯</span>
                <h3>{stats.codes - stats.used}</h3>
                <p>Codes Available</p>
              </div>
            </div>
          </div>
        )}

        {/* USERS TAB */}
        {tab === 'users' && (
          <div>
            <h2>👥 All Users ({users.length})</h2>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Plan</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u._id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td><span className={`role-tag ${u.role}`}>{u.role}</span></td>
                      <td><span className="plan-tag">{u.plan || 'free'}</span></td>
                      <td>
                        <select
                          value={u.role}
                          onChange={e => handleRoleChange(u._id, e.target.value)}
                          className="role-select"
                        >
                          <option value="student">Student</option>
                          <option value="instructor">Instructor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CODES TAB */}
        {tab === 'codes' && (
          <div>
            <h2>🔑 Activation Codes</h2>

            {/* Generate box */}
            <div className="generate-box">
              <h3>Generate New Codes</h3>
              <div className="generate-controls">
                <div className="gen-field">
                  <label>Number of codes</label>
                  <input
                    type="number"
                    value={codeCount}
                    onChange={e => setCodeCount(parseInt(e.target.value))}
                    min="1" max="500"
                  />
                </div>
                <div className="gen-field">
                  <label>Plan</label>
                  <select value={codePlan} onChange={e => setCodePlan(e.target.value)}>
                    <option value="basic">Basic</option>
                    <option value="premium">Premium</option>
                    <option value="lifetime">Lifetime</option>
                  </select>
                </div>
                <button
                  onClick={handleGenerateCodes}
                  className="btn-generate"
                  disabled={generating}
                >
                  {generating ? '⏳ Generating...' : '⚡ Generate'}
                </button>
              </div>
              {codeMsg && <p className="gen-msg">{codeMsg}</p>}
            </div>

            {/* Export button */}
            <button onClick={exportCodes} className="btn-export">
              📥 Export Unused Codes to CSV
            </button>

            {/* Codes table */}
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Plan</th>
                    <th>Status</th>
                    <th>Used By</th>
                    <th>Used At</th>
                  </tr>
                </thead>
                <tbody>
                  {codes.map(c => (
                    <tr key={c._id}>
                      <td><code className="code-cell">{c.code}</code></td>
                      <td><span className="plan-tag">{c.plan}</span></td>
                      <td>
                        <span className={c.isUsed ? 'status-used' : 'status-free'}>
                          {c.isUsed ? '✅ Used' : '🟢 Available'}
                        </span>
                      </td>
                      <td>{c.usedBy?.name || '—'}</td>
                      <td>{c.usedAt ? new Date(c.usedAt).toLocaleDateString() : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* COURSES TAB */}
        {tab === 'courses' && (
          <div>
            <h2>📚 All Courses ({courses.length})</h2>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Instructor</th>
                    <th>Category</th>
                    <th>Students</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map(c => (
                    <tr key={c._id}>
                      <td>{c.title}</td>
                      <td>{c.instructorName}</td>
                      <td><span className={`badge ${c.category}`}>{c.category}</span></td>
                      <td>{c.students?.length || 0}</td>
                      <td>
                        <button
                          onClick={() => handleDeleteCourse(c._id)}
                          className="btn-delete"
                        >🗑️ Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Admin;