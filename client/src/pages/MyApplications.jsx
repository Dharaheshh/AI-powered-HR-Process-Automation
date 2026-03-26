import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getMyApplicationsAPI } from '../services/api';
import Navbar from '../components/Navbar';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedAppId, setExpandedAppId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedAppId(prev => prev === id ? null : id);
  };

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
                <div className="app-card-meta" style={{ marginBottom: app.status === 'interview' ? '12px' : '0' }}>
                  {app.jobOpening?.location && <span>📍 {app.jobOpening.location}</span>}
                  <span>📝 {app.jobOpening?.jobType}</span>
                  <span>📅 Applied {new Date(app.appliedAt).toLocaleDateString()}</span>
                  {app.matchScore !== null && <span>⭐ Score: {app.matchScore}%</span>}
                </div>
                {app.status === 'interview' && (
                  <div style={{ background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.2)', padding: '12px', borderRadius: '8px', marginTop: '12px' }}>
                    <h4 style={{ color: '#22d3ee', marginTop: 0, marginBottom: '8px', fontSize: '0.95rem' }}>Upcoming Interview</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.9rem', color: 'var(--color-text)' }}>
                      <div><strong>Date & Time:</strong> {app.interviewDate ? new Date(app.interviewDate).toLocaleString() : 'TBD'}</div>
                      <div><strong>Meeting Link:</strong> {app.interviewLink ? <a href={app.interviewLink} target="_blank" rel="noreferrer" style={{ color: '#818cf8', textDecoration: 'none' }}>{app.interviewLink}</a> : 'Will be provided shortly'}</div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => toggleExpand(app._id)}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'var(--color-text-muted)',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    marginTop: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: '100%',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.color = 'var(--color-primary)'; e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                >
                  {expandedAppId === app._id ? '▲ Hide Timeline' : '▼ View Timeline'}
                </button>

                {/* Vertical Timeline UI */}
                {expandedAppId === app._id && (() => {
                  const displayTimeline = (app.timeline && app.timeline.length > 0)
                    ? app.timeline
                    : [{ status: 'applied', date: app.appliedAt }];
                  
                  return (
                    <div className="animate-fade-in" style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <h4 style={{ color: 'var(--color-text)', marginBottom: '16px', fontSize: '0.95rem' }}>Application Timeline</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
                        {/* Vertical Line */}
                        <div style={{ position: 'absolute', top: '8px', bottom: '8px', left: '11px', width: '2px', background: 'rgba(255,255,255,0.1)' }}></div>
                        
                        {displayTimeline.map((event, index) => {
                          const isLatest = index === displayTimeline.length - 1;
                          const circleColor = statusColor[event.status] || 'gray';
                          return (
                          <div key={index} style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1 }}>
                            <div style={{ 
                              width: '24px', height: '24px', borderRadius: '50%', 
                              background: isLatest ? circleColor : 'var(--color-bg-secondary)',
                              border: `2px solid ${circleColor}`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                            }}>
                              {isLatest && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fff' }}></div>}
                            </div>
                            
                            <div style={{ paddingTop: '2px' }}>
                              <div style={{ fontWeight: 600, color: isLatest ? 'var(--color-text)' : 'var(--color-text-muted)', textTransform: 'capitalize' }}>
                                {event.status === 'applied' ? 'Application Submitted' : event.status}
                              </div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                {new Date(event.date).toLocaleString()}
                              </div>
                              {event.note && (
                                <div style={{ fontSize: '0.85rem', color: 'var(--color-text)', marginTop: '6px', background: 'rgba(255,255,255,0.05)', padding: '8px 12px', borderRadius: '6px' }}>
                                  {event.note}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
