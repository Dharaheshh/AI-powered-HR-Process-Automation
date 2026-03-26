import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const HRDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-content animate-fade-in">
        <div className="dashboard-welcome">
          <h1>
            Welcome back, <span className="gradient-text">{user?.name}</span> 👋
          </h1>
          <p>Here's your hiring overview for today.</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card glass">
            <div className="stat-icon purple">📋</div>
            <div className="stat-info">
              <h3>—</h3>
              <p>Active Openings</p>
            </div>
          </div>
          <div className="stat-card glass">
            <div className="stat-icon cyan">👥</div>
            <div className="stat-info">
              <h3>—</h3>
              <p>Total Applicants</p>
            </div>
          </div>
          <div className="stat-card glass">
            <div className="stat-icon green">✅</div>
            <div className="stat-info">
              <h3>—</h3>
              <p>Shortlisted</p>
            </div>
          </div>
          <div className="stat-card glass">
            <div className="stat-icon yellow">📅</div>
            <div className="stat-info">
              <h3>—</h3>
              <p>Interviews Today</p>
            </div>
          </div>
        </div>

        <div className="quick-actions-grid">
          <Link to="/open-role" className="quick-action glass" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span style={{ fontSize: '2rem' }}>➕</span>
            <h3>Open New Role</h3>
            <p>Start hiring for a predefined role</p>
          </Link>
          <Link to="/my-openings" className="quick-action glass" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span style={{ fontSize: '2rem' }}>📋</span>
            <h3>My Openings</h3>
            <p>View and manage your active openings</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;
