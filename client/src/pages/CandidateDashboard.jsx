import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { getMyApplicationsAPI } from '../services/api';

const CandidateDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: '—', inReview: '—', interviews: '—', avgScore: '—' });

  useEffect(() => { fetchStats(); }, []);

  const fetchStats = async () => {
    try {
      const response = await getMyApplicationsAPI();
      const apps = response.data.applications || [];
      const total = apps.length;
      const inReview = apps.filter(app => app.status === 'applied' || app.status === 'shortlisted').length;
      const interviews = apps.filter(app => app.status === 'interview').length;
      const scoredApps = apps.filter(app => app.matchScore !== undefined && app.matchScore !== null);
      const avgScore = scoredApps.length > 0
        ? Math.round(scoredApps.reduce((sum, app) => sum + app.matchScore, 0) / scoredApps.length) + '%'
        : 'N/A';
      setStats({ total, inReview, interviews, avgScore });
    } catch (error) { console.error("Failed to fetch dashboard stats", error); }
  };

  const handleLogout = () => { logout(); navigate('/login/candidate'); };

  const statCards = [
    { label: 'Applications Submitted', value: stats.total, icon: '📝', color: '#003fb1' },
    { label: 'Under Review', value: stats.inReview, icon: '🔍', color: '#06b6d4' },
    { label: 'Interviews Scheduled', value: stats.interviews, icon: '📅', color: '#10b981' },
    { label: 'Average Match Score', value: stats.avgScore, icon: '⭐', color: '#f59e0b' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fb', fontFamily: 'Inter, sans-serif' }}>
      {/* Top Bar */}
      <header style={{
        background: '#fff', padding: '12px 32px', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', borderBottom: '1px solid #e8eaed', position: 'sticky', top: 0, zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: '#003fb1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>bolt</span>
          </div>
          <span style={{ fontSize: '16px', fontWeight: 800, color: '#1e293b', fontFamily: 'Manrope' }}>HireFlow AI</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/roles" style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', textDecoration: 'none' }}>Browse Roles</Link>
          <Link to="/my-applications" style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', textDecoration: 'none' }}>My Applications</Link>
          <div style={{
            width: '34px', height: '34px', borderRadius: '50%', background: '#003fb1',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: '13px', border: '2px solid #dbe1ff',
          }}>{user?.name?.charAt(0).toUpperCase() || 'C'}</div>
          <button onClick={handleLogout} style={{
            padding: '6px 14px', background: 'transparent', border: '1px solid #e2e8f0',
            borderRadius: '8px', cursor: 'pointer', fontSize: '12px', color: '#ef4444', fontWeight: 600,
          }}>Log Out</button>
        </div>
      </header>

      {/* Content */}
      <main style={{ padding: '32px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#1e293b', margin: '0 0 6px', fontFamily: 'Manrope' }}>
            Welcome, <span style={{ color: '#003fb1' }}>{user?.name}</span> 👋
          </h1>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>Track your job applications and interviews here.</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
          {statCards.map((s, i) => (
            <div key={i} style={{
              background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e8eaed',
              borderLeft: `4px solid ${s.color}`,
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{s.icon}</div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', margin: '0 0 4px', fontFamily: 'Manrope' }}>{s.value}</h3>
              <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600, margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Link to="/roles" style={{
            background: '#fff', padding: '28px', borderRadius: '12px', border: '1px solid #e8eaed',
            textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '16px',
            transition: 'box-shadow 0.15s',
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff4ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ color: '#003fb1', fontSize: '24px' }}>search</span>
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', margin: '0 0 4px', fontFamily: 'Manrope' }}>Browse Roles</h3>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Find open positions and apply</p>
            </div>
          </Link>
          <Link to="/my-applications" style={{
            background: '#fff', padding: '28px', borderRadius: '12px', border: '1px solid #e8eaed',
            textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '16px',
            transition: 'box-shadow 0.15s',
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ color: '#059669', fontSize: '24px' }}>description</span>
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', margin: '0 0 4px', fontFamily: 'Manrope' }}>My Applications</h3>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Track your application status</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default CandidateDashboard;
