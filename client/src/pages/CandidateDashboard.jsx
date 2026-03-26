import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getMyApplicationsAPI } from '../services/api';

const CandidateDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total: '—',
    inReview: '—',
    interviews: '—',
    avgScore: '—'
  });

  useEffect(() => {
    fetchStats();
  }, []);

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
    } catch (error) {
      console.error("Failed to fetch dashboard stats", error);
    }
  };

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-content animate-fade-in">
        <div className="dashboard-welcome">
          <h1>
            Welcome, <span className="gradient-text">{user?.name}</span> 👋
          </h1>
          <p>Track your job applications and interviews here.</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card glass">
            <div className="stat-icon purple">📝</div>
            <div className="stat-info">
              <h3>{stats.total}</h3>
              <p>Applications Submitted</p>
            </div>
          </div>
          <div className="stat-card glass">
            <div className="stat-icon cyan">🔍</div>
            <div className="stat-info">
              <h3>{stats.inReview}</h3>
              <p>Under Review</p>
            </div>
          </div>
          <div className="stat-card glass">
            <div className="stat-icon green">📅</div>
            <div className="stat-info">
              <h3>{stats.interviews}</h3>
              <p>Interviews Scheduled</p>
            </div>
          </div>
          <div className="stat-card glass">
            <div className="stat-icon yellow">⭐</div>
            <div className="stat-info">
              <h3>{stats.avgScore}</h3>
              <p>Average Match Score</p>
            </div>
          </div>
        </div>

        <div className="quick-actions-grid">
          <Link to="/roles" className="quick-action glass" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span style={{ fontSize: '2rem' }}>🔍</span>
            <h3>Browse Roles</h3>
            <p>Find open positions and apply</p>
          </Link>
          <Link to="/my-applications" className="quick-action glass" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span style={{ fontSize: '2rem' }}>📝</span>
            <h3>My Applications</h3>
            <p>Track your application status</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
