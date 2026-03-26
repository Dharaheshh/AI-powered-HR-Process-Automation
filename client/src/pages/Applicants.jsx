import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getApplicantsAPI, getJobOpeningAPI, updateApplicationStatusAPI } from '../services/api';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';

const Applicants = () => {
  const { jobId } = useParams();
  const [opening, setOpening] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // Filters & Sorting state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('score-desc'); // Default: AI Match Score (High to Low)

  useEffect(() => {
    fetchData();
  }, [jobId]);

  const fetchData = async () => {
    try {
      const [openingRes, applicantsRes] = await Promise.all([
        getJobOpeningAPI(jobId),
        getApplicantsAPI(jobId)
      ]);
      setOpening(openingRes.data.jobOpening || openingRes.data.data);
      setApplicants(applicantsRes.data.applications);
    } catch (error) {
      toast.error('Failed to load applicants data');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      setUpdatingId(applicationId);
      await updateApplicationStatusAPI(applicationId, newStatus);
      
      // Update local state
      setApplicants(prev => prev.map(app => 
        app._id === applicationId ? { ...app, status: newStatus } : app
      ));
      
      toast.success(`Candidate status updated to ${newStatus}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const statusColors = {
    applied: { bg: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.2)' },
    shortlisted: { bg: 'rgba(34, 197, 94, 0.1)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.2)' },
    interview: { bg: 'rgba(6, 182, 212, 0.1)', color: '#22d3ee', border: '1px solid rgba(6, 182, 212, 0.2)' },
    rejected: { bg: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.2)' },
    offered: { bg: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)', color: 'white', border: 'none' }
  };

  const filteredAndSortedApplicants = useMemo(() => {
    let result = [...applicants];

    // Status Filter
    if (statusFilter !== 'all') {
      result = result.filter(app => app.status === statusFilter);
    }

    // Search Filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(app => 
        app.candidate?.name?.toLowerCase().includes(lowerSearch) ||
        app.candidate?.email?.toLowerCase().includes(lowerSearch)
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'score-desc') {
        return (b.matchScore || 0) - (a.matchScore || 0);
      } else if (sortBy === 'score-asc') {
        return (a.matchScore || 0) - (b.matchScore || 0);
      } else if (sortBy === 'newest') {
        return new Date(b.appliedAt) - new Date(a.appliedAt);
      } else if (sortBy === 'oldest') {
        return new Date(a.appliedAt) - new Date(b.appliedAt);
      }
      return 0;
    });

    return result;
  }, [applicants, searchTerm, statusFilter, sortBy]);

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-content animate-fade-in">
        <div style={{ marginBottom: '32px' }}>
          <Link to="/my-openings" style={{ color: 'var(--color-primary)', textDecoration: 'none', marginBottom: '16px', display: 'inline-block' }}>
            ← Back to Openings
          </Link>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <h1 style={{ marginBottom: '8px' }}>Applicants for {opening?.title || 'Loading...'}</h1>
              <p style={{ color: 'var(--color-text-muted)' }}>{applicants.length} total candidates have applied.</p>
            </div>
          </div>
        </div>

        {/* Phase 5: Filtering and Sorting Controls */}
        <div className="glass" style={{ padding: '20px', borderRadius: '12px', marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Search Candidates</label>
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
            />
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Filter by Status</label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-select"
            >
              <option value="all">All Statuses</option>
              <option value="applied">Applied</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="interview">Interview</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Sort By</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select"
            >
              <option value="score-desc">AI Match (High to Low)</option>
              <option value="score-asc">AI Match (Low to High)</option>
              <option value="newest">Applied (Newest First)</option>
              <option value="oldest">Applied (Oldest First)</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="placeholder-section">Loading applicants...</div>
        ) : applicants.length === 0 ? (
          <div className="placeholder-section glass" style={{ borderRadius: '12px' }}>
            <div className="placeholder-icon">📬</div>
            <h2>No Applicants Yet</h2>
            <p>Wait for candidates to discover and apply for this opening.</p>
          </div>
        ) : filteredAndSortedApplicants.length === 0 ? (
          <div className="placeholder-section glass" style={{ borderRadius: '12px' }}>
            <div className="placeholder-icon">🔍</div>
            <h2>No Matches Found</h2>
            <p>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="glass applicants-table-wrapper" style={{ borderRadius: '12px' }}>
            <table className="applicants-table">
              <thead>
                <tr>
                  <th>Candidate Name</th>
                  <th>Email</th>
                  <th>Applied On</th>
                  <th>Resume</th>
                  <th>Status</th>
                  <th>AI Score</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedApplicants.map(app => (
                  <tr key={app._id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{app.candidate?.name || 'Unknown User'}</div>
                    </td>
                    <td style={{ color: 'var(--color-text-muted)' }}>{app.candidate?.email}</td>
                    <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
                    <td>
                      {app.resumeFile ? (
                        <a 
                          href={`http://localhost:5000${app.resumeFile}`} 
                          target="_blank" 
                          rel="noreferrer"
                          style={{
                            display: 'inline-block', padding: '4px 12px', background: 'rgba(99, 102, 241, 0.1)', 
                            color: '#818cf8', borderRadius: '4px', textDecoration: 'none', fontSize: '0.8rem'
                          }}
                        >
                          📄 View
                        </a>
                      ) : (
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>No Resume</span>
                      )}
                    </td>
                    <td>
                      <span className="status-pill" style={statusColors[app.status] || statusColors.applied}>
                        {app.status}
                      </span>
                    </td>
                    <td>
                      {app.matchScore !== undefined && app.matchScore !== null ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{
                            width: '40px', height: '40px', borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 600, fontSize: '0.9rem',
                            background: app.matchScore >= 80 ? 'rgba(34, 197, 94, 0.15)' : app.matchScore >= 50 ? 'rgba(234, 179, 8, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                            color: app.matchScore >= 80 ? '#4ade80' : app.matchScore >= 50 ? '#facc15' : '#f87171',
                            border: `2px solid ${app.matchScore >= 80 ? 'rgba(34, 197, 94, 0.3)' : app.matchScore >= 50 ? 'rgba(234, 179, 8, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
                          }}>
                            {app.matchScore}%
                          </div>
                        </div>
                      ) : (
                        <span style={{ color: 'var(--color-text-muted)', fontStyle: 'italic', fontSize: '0.85rem' }}>
                          Pending AI
                        </span>
                      )}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        {app.status === 'applied' && (
                          <button 
                            onClick={() => handleStatusUpdate(app._id, 'shortlisted')}
                            disabled={updatingId === app._id}
                            style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid rgba(34, 197, 94, 0.3)', background: 'rgba(34, 197, 94, 0.1)', color: '#4ade80', fontSize: '0.75rem', cursor: 'pointer' }}
                          >
                            ✅ Shortlist
                          </button>
                        )}
                        {(app.status === 'applied' || app.status === 'shortlisted') && (
                          <button 
                            onClick={() => handleStatusUpdate(app._id, 'interview')}
                            disabled={updatingId === app._id}
                            style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid rgba(6, 182, 212, 0.3)', background: 'rgba(6, 182, 212, 0.1)', color: '#22d3ee', fontSize: '0.75rem', cursor: 'pointer' }}
                          >
                            📅 Interview
                          </button>
                        )}
                        {app.status !== 'rejected' && (
                          <button 
                            onClick={() => handleStatusUpdate(app._id, 'rejected')}
                            disabled={updatingId === app._id}
                            style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 0.1)', color: '#f87171', fontSize: '0.75rem', cursor: 'pointer' }}
                          >
                            ❌ Reject
                          </button>
                        )}
                        {app.status === 'rejected' && (
                          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', fontStyle: 'italic' }}>Closed</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applicants;
