import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getMyApplicationsAPI } from '../services/api';
import Navbar from '../components/Navbar';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await getMyApplicationsAPI();
        setApplications(res.data.applications);
      } catch (error) {
        toast.error('Failed to load applications');
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  const statusColor = {
    applied: '#6366f1',
    screening: '#f59e0b',
    shortlisted: '#10b981',
    interview: '#06b6d4',
    offered: '#22c55e',
    rejected: '#ef4444',
  };

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-content animate-fade-in">
        <div className="dashboard-welcome">
          <h1>My <span className="gradient-text">Applications</span></h1>
          <p>Track the status of your job applications</p>
        </div>

        {loading ? (
          <p style={{ color: 'var(--color-text-muted)' }}>Loading...</p>
        ) : applications.length === 0 ? (
          <div className="placeholder-section glass">
            <div className="placeholder-icon">📝</div>
            <h2>No Applications Yet</h2>
            <p>Browse open roles and start applying!</p>
          </div>
        ) : (
          <div className="applications-list">
            {applications.map((app) => (
              <div key={app._id} className="application-card glass">
                <div className="app-card-main">
                  <div>
                    <h3>{app.jobOpening?.title || 'Opening'}</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                      {app.role?.name} · {app.jobOpening?.role?.department}
                    </p>
                  </div>
                  <span
                    className="status-pill"
                    style={{ background: `${statusColor[app.status]}20`, color: statusColor[app.status], borderColor: `${statusColor[app.status]}40` }}
                  >
                    {app.status}
                  </span>
                </div>
                <div className="app-card-meta">
                  {app.jobOpening?.location && <span>📍 {app.jobOpening.location}</span>}
                  <span>📝 {app.jobOpening?.jobType}</span>
                  <span>📅 Applied {new Date(app.appliedAt).toLocaleDateString()}</span>
                  {app.matchScore !== null && <span>⭐ Score: {app.matchScore}%</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
