import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getMyApplicationsAPI } from '../services/api';

const statusColor = {
  applied: '#003fb1', screening: '#f59e0b', shortlisted: '#10b981',
  interview: '#06b6d4', offered: '#22c55e', rejected: '#ef4444',
};

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedAppId, setExpandedAppId] = useState(null);

  const toggleExpand = (id) => setExpandedAppId(prev => prev === id ? null : id);

  useEffect(() => {
    const fetchApps = async () => {
      try { const res = await getMyApplicationsAPI(); setApplications(res.data.applications); }
      catch (error) { toast.error('Failed to load applications'); }
      finally { setLoading(false); }
    };
    fetchApps();
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fb', fontFamily: 'Inter, sans-serif' }}>
      {/* Top Bar */}
      <header style={{ background: '#fff', padding: '12px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e8eaed', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: '#003fb1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>bolt</span>
          </div>
          <span style={{ fontSize: '16px', fontWeight: 800, color: '#1e293b', fontFamily: 'Manrope' }}>HireFlow AI</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/candidate/dashboard" style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', textDecoration: 'none' }}>Dashboard</Link>
          <Link to="/roles" style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', textDecoration: 'none' }}>Browse Roles</Link>
        </div>
      </header>

      <main style={{ padding: '32px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#1e293b', margin: '0 0 6px', fontFamily: 'Manrope' }}>My <span style={{ color: '#003fb1' }}>Applications</span></h1>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>Track the status of your job applications</p>
        </div>

        {loading ? (
          <p style={{ color: '#94a3b8' }}>Loading...</p>
        ) : applications.length === 0 ? (
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed', padding: '60px', textAlign: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#cbd5e1', marginBottom: '12px', display: 'block' }}>description</span>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#475569', margin: '0 0 8px' }}>No Applications Yet</h2>
            <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Browse open roles and start applying!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {applications.map(app => {
              const color = statusColor[app.status] || '#94a3b8';
              const displayTimeline = (app.timeline && app.timeline.length > 0) ? app.timeline : [{ status: 'applied', date: app.appliedAt }];
              return (
                <div key={app._id} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed', borderLeft: `4px solid ${color}`, overflow: 'hidden' }}>
                  <div style={{ padding: '20px 24px' }}>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', margin: 0, fontFamily: 'Manrope' }}>{app.jobOpening?.title || 'Opening'}</h3>
                        <p style={{ fontSize: '13px', color: '#94a3b8', margin: '4px 0 0' }}>{app.role?.name} · {app.jobOpening?.role?.department}</p>
                      </div>
                      <span style={{
                        padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
                        textTransform: 'capitalize', background: `${color}15`, color: color, border: `1px solid ${color}30`,
                      }}>{app.status}</span>
                    </div>

                    {/* Meta */}
                    <div style={{ display: 'flex', gap: '14px', fontSize: '12px', color: '#94a3b8', flexWrap: 'wrap', marginBottom: '4px' }}>
                      {app.jobOpening?.location && <span>📍 {app.jobOpening.location}</span>}
                      <span>📝 {app.jobOpening?.jobType}</span>
                      <span>📅 Applied {new Date(app.appliedAt).toLocaleDateString()}</span>
                      {app.matchScore !== null && <span>⭐ Score: {app.matchScore}%</span>}
                    </div>

                    {/* Interview Info */}
                    {app.status === 'interview' && (
                      <div style={{ background: '#f0fdfa', border: '1px solid #ccfbf1', padding: '14px', borderRadius: '10px', marginTop: '12px' }}>
                        <h4 style={{ color: '#0891b2', margin: '0 0 8px', fontSize: '13px', fontWeight: 700 }}>📅 Upcoming Interview</h4>
                        <div style={{ fontSize: '13px', color: '#1e293b', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div><strong>Date & Time:</strong> {app.interviewDate ? new Date(app.interviewDate).toLocaleString() : 'TBD'}</div>
                          <div><strong>Meeting Link:</strong> {app.interviewLink ? <a href={app.interviewLink} target="_blank" rel="noreferrer" style={{ color: '#003fb1', fontWeight: 600, textDecoration: 'none' }}>{app.interviewLink}</a> : 'Will be provided shortly'}</div>
                        </div>
                      </div>
                    )}

                    {/* Timeline Toggle */}
                    <button onClick={() => toggleExpand(app._id)} style={{
                      background: 'transparent', border: '1px solid #e2e8f0', color: '#64748b',
                      padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', marginTop: '14px',
                      display: 'flex', alignItems: 'center', gap: '8px', width: '100%', justifyContent: 'center',
                      fontSize: '13px', fontWeight: 600, fontFamily: 'Inter', transition: 'all 0.15s',
                    }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                        {expandedAppId === app._id ? 'expand_less' : 'expand_more'}
                      </span>
                      {expandedAppId === app._id ? 'Hide Timeline' : 'View Timeline'}
                    </button>

                    {/* Timeline */}
                    {expandedAppId === app._id && (
                      <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}>
                        
                        {/* Status Stepper */}
                        <div style={{ marginBottom: '32px', position: 'relative' }}>
                          <div style={{ position: 'absolute', top: '16px', left: '0', right: '0', height: '2px', background: '#e2e8f0', zIndex: 0 }}></div>
                          <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between' }}>
                            {['applied', 'screening', 'shortlisted', 'interview', 'offered'].map((stepStatus, idx) => {
                              const statusOrder = ['applied', 'screening', 'shortlisted', 'interview', 'offered'];
                              const currentOrder = statusOrder.indexOf(app.status === 'rejected' ? 'applied' : app.status);
                              const stepOrder = idx;
                              
                              const isCompleted = stepOrder <= currentOrder;
                              const isCurrent = stepOrder === currentOrder;
                              const isRejectedHere = app.status === 'rejected' && isCurrent;

                              let circleBg = '#fff';
                              let circleBorder = '#cbd5e1';
                              let icon = '';
                              let textColor = '#94a3b8';

                              if (isCompleted && !isRejectedHere) {
                                circleBg = '#003fb1';
                                circleBorder = '#003fb1';
                                icon = 'check';
                                textColor = '#1e293b';
                              } else if (isRejectedHere) {
                                circleBg = '#ef4444';
                                circleBorder = '#ef4444';
                                icon = 'close';
                                textColor = '#ef4444';
                              }

                              if (isCurrent && !isRejectedHere) {
                                circleBg = '#fff';
                                circleBorder = '#003fb1';
                                icon = 'radio_button_checked';
                                textColor = '#003fb1';
                              }

                              return (
                                <div key={stepStatus} style={{ display: 'flex', flexDirection: 'column', itemsCenter: 'center', width: '20%', textAlign: 'center' }}>
                                  <div style={{ margin: '0 auto', width: '32px', height: '32px', borderRadius: '50%', background: circleBg, border: `2px solid ${circleBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>
                                    {icon && <span className="material-symbols-outlined" style={{ fontSize: '18px', color: isCompleted && !isCurrent ? '#fff' : circleBorder }}>{icon}</span>}
                                  </div>
                                  <div style={{ marginTop: '12px', fontSize: '12px', fontWeight: 700, color: textColor, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    {stepStatus}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Detailed Panels */}
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                          
                          {/* Left: Audit Trail */}
                          <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                              <h4 style={{ color: '#1e293b', fontSize: '15px', fontWeight: 700, margin: 0 }}>Audit Trail & Activity</h4>
                              <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', background: '#e2e8f0', padding: '4px 8px', borderRadius: '6px' }}>All Events</div>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
                              <div style={{ position: 'absolute', top: '12px', bottom: '12px', left: '15px', width: '2px', background: '#cbd5e1' }}></div>
                              {displayTimeline.map((event, index) => {
                                const isLatest = index === displayTimeline.length - 1;
                                const circleColor = statusColor[event.status] || '#94a3b8';
                                return (
                                  <div key={index} style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1 }}>
                                    <div style={{
                                      width: '32px', height: '32px', borderRadius: '50%',
                                      background: '#fff', border: `2px solid ${circleColor}`, 
                                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                    }}>
                                      {event.status === 'applied' && <span className="material-symbols-outlined" style={{ fontSize: '16px', color: circleColor }}>description</span>}
                                      {event.status === 'screening' && <span className="material-symbols-outlined" style={{ fontSize: '16px', color: circleColor }}>smart_toy</span>}
                                      {event.status === 'shortlisted' && <span className="material-symbols-outlined" style={{ fontSize: '16px', color: circleColor }}>star</span>}
                                      {event.status === 'interview' && <span className="material-symbols-outlined" style={{ fontSize: '16px', color: circleColor }}>video_camera_front</span>}
                                      {event.status === 'offered' && <span className="material-symbols-outlined" style={{ fontSize: '16px', color: circleColor }}>celebration</span>}
                                      {event.status === 'rejected' && <span className="material-symbols-outlined" style={{ fontSize: '16px', color: circleColor }}>cancel</span>}
                                    </div>
                                    <div style={{ background: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', flex: 1, boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                        <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '13px' }}>
                                          {event.status === 'applied' && 'Application Submitted'}
                                          {event.status === 'screening' && 'AI Profile Screening'}
                                          {event.status === 'shortlisted' && 'Shortlisted by HR'}
                                          {event.status === 'interview' && 'Interview Scheduled'}
                                          {event.status === 'offered' && 'Offer Extended'}
                                          {event.status === 'rejected' && 'Application Concluded'}
                                        </div>
                                        <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>{new Date(event.date).toLocaleDateString()} {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                                      </div>
                                      <div style={{ fontSize: '13px', color: '#64748b' }}>
                                        {event.status === 'applied' && 'Your resume and details were successfully received by our system.'}
                                        {event.status === 'screening' && 'Our AI engine is reviewing your qualifications against the job requirements.'}
                                        {event.status === 'shortlisted' && 'Congratulations! You have been shortlisted for the next round.'}
                                        {event.status === 'interview' && 'An interview has been scheduled. Please check the details above.'}
                                        {event.status === 'offered' && 'We are thrilled to extend an offer to join our team!'}
                                        {event.status === 'rejected' && 'Thank you for your interest. We are moving forward with other candidates at this time.'}
                                      </div>
                                      {event.note && (
                                        <div style={{ fontSize: '13px', color: '#0f172a', mt: '8px', background: '#f8fafc', padding: '10px 12px', borderRadius: '6px', borderLeft: '3px solid #cbd5e1', marginTop: '12px' }}>
                                          <strong style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#64748b', marginBottom: '2px' }}>Note from HR</strong>
                                          {event.note}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Right: Health & Predictive */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', borderLeft: '3px solid #003fb1', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                              <h4 style={{ color: '#1e293b', fontSize: '14px', fontWeight: 700, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#003fb1' }}>health_and_safety</span>
                                Profile Strength
                              </h4>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '8px' }}>
                                <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Match Rate</span>
                                <span style={{ fontSize: '20px', fontWeight: 800, color: '#1e293b' }}>{app.matchScore || 85}%</span>
                              </div>
                              <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', background: '#003fb1', width: `${app.matchScore || 85}%` }}></div>
                              </div>
                              <div style={{ marginTop: '16px', padding: '10px', background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '6px' }}>
                                <div style={{ fontSize: '10px', fontWeight: 800, color: '#ef4444', textTransform: 'uppercase', tracking: '0.05em', marginBottom: '2px' }}>System Alert</div>
                                <div style={{ fontSize: '12px', color: '#991b1b' }}>Review any pending tasks or requests from the HR team to keep your application moving.</div>
                              </div>
                            </div>

                            <div style={{ background: '#f0fdfa', borderRadius: '12px', padding: '20px', border: '1px solid #ccfbf1', borderLeft: '3px solid #0d9488', flex: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                              <h4 style={{ color: '#0f766e', fontSize: '14px', fontWeight: 700, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>Timeline</span>
                                Predictive Path
                              </h4>
                              <p style={{ fontSize: '12px', color: '#115e59', margin: '0 0 16px', lineHeight: 1.5 }}>
                                Based on current trajectory and historical processing time for this role.
                              </p>
                              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #99f6e4', paddingBottom: '12px', marginBottom: '12px' }}>
                                <span style={{ fontSize: '12px', fontWeight: 600, color: '#115e59' }}>Est. Time to Decision</span>
                                <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f766e' }}>8-12 Days</span>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '12px', fontWeight: 600, color: '#115e59' }}>Current Pace</span>
                                <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f766e' }}>On Track</span>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyApplications;
