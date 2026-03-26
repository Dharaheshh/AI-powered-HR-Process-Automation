import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getMyJobOpeningsAPI, deleteJobOpeningAPI } from '../services/api';
import Navbar from '../components/Navbar';

const MyOpenings = () => {
  const [openings, setOpenings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOpenings = async () => {
    try {
      const res = await getMyJobOpeningsAPI();
      setOpenings(res.data.jobOpenings);
    } catch (error) {
      toast.error('Failed to load openings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpenings();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this opening?')) return;
    try {
      await deleteJobOpeningAPI(id);
      toast.success('Opening deleted');
      setOpenings(openings.filter((o) => o._id !== id));
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-content animate-fade-in">
        <div className="dashboard-welcome" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1>My <span className="gradient-text">Openings</span></h1>
            <p>Manage your active hiring positions</p>
          </div>
          <Link to="/open-role" className="btn-primary" style={{ width: 'auto', padding: '10px 24px', textDecoration: 'none' }}>
            + Open New Role
          </Link>
        </div>

        {loading ? (
          <p style={{ color: 'var(--color-text-muted)' }}>Loading...</p>
        ) : openings.length === 0 ? (
          <div className="placeholder-section glass">
            <div className="placeholder-icon">📋</div>
            <h2>No Openings Yet</h2>
            <p>Create your first job opening to start receiving applications</p>
          </div>
        ) : (
          <div className="openings-grid">
            {openings.map((opening) => (
              <div key={opening._id} className="opening-card glass">
                <div className="opening-header">
                  <div>
                    <h3>{opening.title}</h3>
                    <span className="dept-badge">{opening.role?.department}</span>
                  </div>
                  <span className={`status-badge ${opening.status}`}>
                    {opening.status}
                  </span>
                </div>
                <div className="opening-meta">
                  <span>🏢 {opening.role?.name}</span>
                  {opening.location && <span>📍 {opening.location}</span>}
                  <span>📝 {opening.jobType}</span>
                </div>
                <div className="opening-stats">
                  <div className="stat-mini">
                    <span className="stat-mini-value">{opening.applicantCount}</span>
                    <span className="stat-mini-label">Applicants</span>
                  </div>
                </div>
                <div className="opening-actions">
                  <Link to={`/applicants/${opening._id}`} className="btn-outline" style={{ fontSize: '0.8rem', padding: '6px 14px', textDecoration: 'none' }}>
                    View Applicants
                  </Link>
                  <button
                    className="btn-logout"
                    style={{ fontSize: '0.8rem', padding: '6px 14px' }}
                    onClick={() => handleDelete(opening._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOpenings;
