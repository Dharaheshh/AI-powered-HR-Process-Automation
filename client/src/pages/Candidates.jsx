import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllApplicationsAPI, updateApplicationStatusAPI } from '../services/api';
import DashboardLayout from '../components/layouts/DashboardLayout';
import toast from 'react-hot-toast';

const Candidates = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & Sorting state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('score-desc'); // Default: AI Match Score (High to Low)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getAllApplicationsAPI();
      setCandidates(res.data.applications);
    } catch (error) {
      toast.error('Failed to load candidates data');
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    applied: { bg: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.2)' },
    shortlisted: { bg: 'rgba(34, 197, 94, 0.1)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.2)' },
    interview: { bg: 'rgba(6, 182, 212, 0.1)', color: '#22d3ee', border: '1px solid rgba(6, 182, 212, 0.2)' },
    rejected: { bg: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.2)' },
    offered: { bg: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)', color: 'white', border: 'none' }
  };

  const filteredAndSortedCandidates = useMemo(() => {
    let result = [...candidates];

    // Status Filter
    if (statusFilter !== 'all') {
      result = result.filter(app => app.status === statusFilter);
    }

    // Search Filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(app => 
        app.candidate?.name?.toLowerCase().includes(lowerSearch) ||
        app.candidate?.email?.toLowerCase().includes(lowerSearch) ||
        app.jobOpening?.title?.toLowerCase().includes(lowerSearch)
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
  }, [candidates, searchTerm, statusFilter, sortBy]);

  return (
    <DashboardLayout>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-800" style={{ fontFamily: 'Manrope, sans-serif', marginBottom: '8px' }}>All Candidates</h1>
              <p className="text-slate-500">{candidates.length} total candidates across all roles.</p>
            </div>
          </div>
        </div>

        {/* Phase 5: Filtering and Sorting Controls */}
        <div className="glass" style={{ padding: '20px', borderRadius: '12px', marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Search Candidates</label>
            <input 
              type="text" 
              placeholder="Search by name, email, or role..." 
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
          <div className="placeholder-section">Loading candidates...</div>
        ) : candidates.length === 0 ? (
          <div className="placeholder-section glass" style={{ borderRadius: '12px' }}>
            <div className="placeholder-icon">📬</div>
            <h2>No Candidates Yet</h2>
            <p>Wait for candidates to discover and apply to your roles.</p>
          </div>
        ) : filteredAndSortedCandidates.length === 0 ? (
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
                  <th>Candidate Info</th>
                  <th>Role Applied</th>
                  <th>Applied On</th>
                  <th>Status</th>
                  <th>AI Score</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedCandidates.map(app => (
                  <tr key={app._id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{app.candidate?.name || 'Unknown User'}</div>
                      <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{app.candidate?.email}</div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 500 }}>{app.jobOpening?.title}</span>
                    </td>
                    <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                        <span className="status-pill" style={statusColors[app.status] || statusColors.applied}>
                          {app.status}
                        </span>
                        {app.slaBreached && (
                          <span style={{ 
                            fontSize: '0.75rem', fontWeight: 600, color: '#ef4444', 
                            background: 'rgba(239, 68, 68, 0.1)', padding: '4px 8px', 
                            borderRadius: '4px', border: '1px solid rgba(239, 68, 68, 0.3)',
                            display: 'inline-flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap'
                          }}>
                            ⚠️ SLA Breached ({app.daysInStatus}d / {app.slaLimit}d)
                          </span>
                        )}
                      </div>
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
                      <button 
                        onClick={() => navigate(`/candidates/${app._id}`)}
                        className="btn btn-primary"
                        style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </DashboardLayout>
  );
};

export default Candidates;
