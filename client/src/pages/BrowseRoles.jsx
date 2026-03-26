import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getJobOpeningsAPI } from '../services/api';
import Navbar from '../components/Navbar';

const BrowseRoles = () => {
  const [openings, setOpenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchOpenings = async () => {
      try {
        const res = await getJobOpeningsAPI();
        setOpenings(res.data.jobOpenings);
      } catch (error) {
        toast.error('Failed to load job openings');
      } finally {
        setLoading(false);
      }
    };
    fetchOpenings();
  }, []);

  const filtered = openings.filter(
    (o) =>
      o.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.role?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.role?.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-content animate-fade-in">
        <div className="dashboard-welcome">
          <h1>Browse <span className="gradient-text">Open Roles</span></h1>
          <p>Find the perfect role for you and apply</p>
        </div>

        <div style={{ marginBottom: '24px', maxWidth: '500px' }}>
          <input
            type="text"
            className="input-field"
            placeholder="🔍 Search by role, department, or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <p style={{ color: 'var(--color-text-muted)' }}>Loading roles...</p>
        ) : filtered.length === 0 ? (
          <div className="placeholder-section glass">
            <div className="placeholder-icon">🔍</div>
            <h2>No Open Positions</h2>
            <p>There are no open roles right now. Check back later!</p>
          </div>
        ) : (
          <div className="roles-grid">
            {filtered.map((opening) => (
              <Link
                to={`/roles/${opening._id}`}
                key={opening._id}
                className="role-card glass"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="role-card-header">
                  <h3>{opening.title}</h3>
                  <span className="dept-badge">{opening.role?.department}</span>
                </div>
                <p className="role-card-name">{opening.role?.name}</p>
                <p className="role-card-desc">{opening.role?.description}</p>
                <div className="role-card-tags">
                  {(opening.customSkills?.length > 0 ? opening.customSkills : opening.role?.defaultSkills || [])
                    .slice(0, 5)
                    .map((skill, i) => (
                      <span key={i} className="skill-tag">{skill}</span>
                    ))}
                  {((opening.customSkills?.length > 0 ? opening.customSkills : opening.role?.defaultSkills || []).length > 5) && (
                    <span className="skill-tag more">+{(opening.customSkills?.length > 0 ? opening.customSkills : opening.role?.defaultSkills || []).length - 5}</span>
                  )}
                </div>
                <div className="role-card-footer">
                  {opening.location && <span>📍 {opening.location}</span>}
                  <span>📝 {opening.jobType}</span>
                  {opening.experienceRequired && <span>💼 {opening.experienceRequired}</span>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseRoles;
