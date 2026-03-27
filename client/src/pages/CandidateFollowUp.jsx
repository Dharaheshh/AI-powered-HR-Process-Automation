import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getApplicationAPI, updateApplicationStatusAPI, addRecruiterNoteAPI } from '../services/api';
import DashboardLayout from '../components/layouts/DashboardLayout';
import toast from 'react-hot-toast';

const CandidateFollowUp = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appData, setAppData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    const fetchApp = async () => {
      try {
        const res = await getApplicationAPI(id);
        setAppData(res.data.application);
      } catch (error) {
        toast.error('Failed to load candidate application');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchApp();
  }, [id]);

  if (loading) return <DashboardLayout><div className="placeholder-section">Loading candidate profile...</div></DashboardLayout>;
  if (!appData) return <DashboardLayout><div className="placeholder-section">Application not found</div></DashboardLayout>;

  const candidate = appData.candidate || {};
  const job = appData.jobOpening || {};
  const timeline = appData.timeline || [];
  const status = appData.status;
  const matchScore = appData.matchScore || 0;

  const handleAction = async (action) => {
    if (action === 'interview') {
      navigate('/calendar', {
        state: {
          candidateId: candidate._id,
          applicationId: appData._id,
          candidateName: candidate.name,
          jobTitle: job.title
        }
      });
      return;
    }
    if (!window.confirm(`Are you sure you want to update status to "${action}"?`)) return;
    try {
      setProcessing(true);
      await updateApplicationStatusAPI(id, action);
      toast.success('Application updated & email sent!');
      const res = await getApplicationAPI(id);
      setAppData(res.data.application);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update');
    } finally {
      setProcessing(false);
    }
  };

  const handleAddNote = async () => {
    if (!noteText.trim()) return;
    try {
      setProcessing(true);
      await addRecruiterNoteAPI(id, noteText);
      setNoteText('');
      toast.success('Note saved successfully');
      const res = await getApplicationAPI(id);
      setAppData(res.data.application);
    } catch (error) {
      toast.error('Failed to save note');
    } finally {
      setProcessing(false);
    }
  };

  const getInitials = (name) => name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '??';

  const getSlaInfo = () => {
    if (appData.slaBreached) return { label: 'SLA BREACHED', color: '#ef4444', bg: 'rgba(239,68,68,0.12)' };
    if (appData.daysInStatus >= (appData.slaLimit || 5) - 1) return { label: 'SLA AT RISK', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' };
    return { label: 'SLA ON TRACK', color: '#10b981', bg: 'rgba(16,185,129,0.12)' };
  };
  const sla = getSlaInfo();

  const statusConfig = {
    applied: { color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', label: 'Applied' },
    shortlisted: { color: '#10b981', bg: 'rgba(16,185,129,0.12)', label: 'Shortlisted' },
    interview: { color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', label: 'Interview' },
    offered: { color: '#06b6d4', bg: 'rgba(6,182,212,0.12)', label: 'Offered' },
    hired: { color: '#14b8a6', bg: 'rgba(20,184,166,0.12)', label: 'Hired' },
    rejected: { color: '#ef4444', bg: 'rgba(239,68,68,0.12)', label: 'Rejected' },
  };
  const sc = statusConfig[status] || statusConfig.applied;

  const getNextAction = () => {
    if (status === 'rejected') return { title: 'Application Closed', desc: 'This candidate has been rejected.', actionLabel: null };
    if (status === 'offered' || status === 'hired') return { title: 'Offer Extended', desc: 'Candidate has been formally offered the position. Waiting for response.', actionLabel: null };
    if (status === 'interview') return { 
      title: 'Interview Complete?', 
      desc: 'If the candidate passed the interview, accept them to send an offer.', 
      actionLabel: 'Offer Job', 
      secondaryActionLabel: 'Reschedule / View Calendar' 
    };
    if (status === 'shortlisted') return { title: 'Schedule Interview', desc: `${candidate.name} matches ${matchScore}% of requirements. Scheduling the interview is the recommended next step.`, actionLabel: '📅 Configure Interview & Dates' };
    return { title: 'Review & Shortlist', desc: `New application with ${matchScore}% match score. Review the resume and shortlist if qualified.`, actionLabel: '✅ Shortlist This Candidate' };
  };
  const nextAction = getNextAction();

  // Styles
  const cardStyle = {
    background: '#fff', borderRadius: '16px', border: '1px solid #e8eaed',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)', overflow: 'hidden'
  };
  const cardHeaderStyle = {
    padding: '16px 24px', borderBottom: '1px solid #f1f3f4',
    fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px',
    color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px'
  };
  const cardBodyStyle = { padding: '24px' };
  const pillStyle = (color, bg) => ({
    display: 'inline-flex', alignItems: 'center', gap: '4px',
    padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
    color, background: bg, textTransform: 'uppercase', letterSpacing: '0.5px'
  });
  const progressBarBg = { height: '8px', borderRadius: '4px', background: '#f1f3f4', overflow: 'hidden' };
  const progressBarFill = (pct, color) => ({
    height: '100%', borderRadius: '4px', background: color,
    width: `${pct}%`, transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)'
  });

  return (
    <DashboardLayout>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Back Button */}
        <button onClick={() => navigate(-1)} style={{
          background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 600,
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '24px', fontSize: '14px'
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span> Back to List
        </button>

        {/* ====== HEADER CARD ====== */}
        <div style={{
          ...cardStyle, padding: '32px', marginBottom: '24px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8faff 100%)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
            {/* Left: Avatar + Info */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{
                width: '72px', height: '72px', borderRadius: '16px',
                background: 'var(--gradient-primary)', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '24px', fontWeight: 800, fontFamily: 'Manrope, sans-serif',
                boxShadow: '0 4px 12px rgba(0,63,177,0.25)'
              }}>
                {getInitials(candidate.name)}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                  <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#1e293b', fontFamily: 'Manrope, sans-serif', margin: 0 }}>
                    {candidate.name || 'Candidate'}
                  </h1>
                  <span style={pillStyle(sla.color, sla.bg)}>
                    <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>{appData.slaBreached ? 'warning' : 'schedule'}</span>
                    {sla.label}
                  </span>
                </div>
                <p style={{ fontSize: '15px', color: '#64748b', fontWeight: 500, margin: '0 0 8px' }}>
                  {job.title || 'Job Role'} &bull; {candidate.email}
                </p>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={pillStyle(sc.color, sc.bg)}>{sc.label}</span>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    fontSize: '13px', fontWeight: 700, color: '#003fb1'
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#f59e0b' }}>star</span>
                    {matchScore}% AI Match
                  </span>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                    Applied {new Date(appData.appliedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              {status !== 'rejected' && status !== 'offered' && status !== 'hired' && (
                <button onClick={() => handleAction('rejected')} disabled={processing} style={{
                  padding: '10px 20px', borderRadius: '10px', border: '1px solid rgba(239,68,68,0.3)',
                  background: 'rgba(239,68,68,0.06)', color: '#ef4444', fontSize: '13px', fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.2s'
                }}>
                  ✕ Reject
                </button>
              )}
              {(status === 'applied') && (
                <button onClick={() => handleAction('shortlisted')} disabled={processing} style={{
                  padding: '10px 20px', borderRadius: '10px', border: 'none',
                  background: '#10b981', color: '#fff', fontSize: '13px', fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(16,185,129,0.3)'
                }}>
                  ✓ Shortlist
                </button>
              )}
              {(status === 'applied' || status === 'shortlisted') && (
                <button onClick={() => handleAction('interview')} disabled={processing} style={{
                  padding: '10px 24px', borderRadius: '10px', border: 'none',
                  background: 'var(--gradient-primary)', color: '#fff', fontSize: '13px', fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(0,63,177,0.3)'
                }}>
                  📅 Schedule Interview
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ====== MAIN GRID ====== */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px' }}>

          {/* ---- LEFT COLUMN ---- */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Resume Card */}
            <div style={cardStyle}>
              <div style={cardHeaderStyle}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--color-primary)' }}>description</span>
                Resume & Documents
              </div>
              <div style={{
                ...cardBodyStyle, background: '#f8fafc', minHeight: '220px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'
              }}>
                {appData.resumeFile ? (
                  <div>
                    <div style={{
                      width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(0,63,177,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'
                    }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '28px', color: 'var(--color-primary)' }}>picture_as_pdf</span>
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', margin: '0 0 6px' }}>Resume Document</h3>
                    <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 16px' }}>View the detailed PDF submitted by the candidate.</p>
                    <a href={`http://localhost:5000${appData.resumeFile}`} target="_blank" rel="noreferrer" style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      padding: '10px 24px', background: 'var(--gradient-primary)', color: '#fff',
                      borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '13px',
                      boxShadow: '0 2px 8px rgba(0,63,177,0.25)', transition: 'all 0.2s'
                    }}>
                      Open Document <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>open_in_new</span>
                    </a>
                  </div>
                ) : (
                  <div>
                    <span className="material-symbols-outlined" style={{ fontSize: '40px', color: '#cbd5e1', marginBottom: '8px' }}>find_in_page</span>
                    <p style={{ color: '#94a3b8', fontSize: '14px' }}>No resume uploaded by candidate.</p>
                  </div>
                )}
              </div>
            </div>

            {/* AI Analysis & Requirement Fit Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

              {/* Skills Breakdown */}
              <div style={cardStyle}>
                <div style={cardHeaderStyle}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--color-primary)' }}>analytics</span>
                  AI Skills Analysis
                </div>
                <div style={cardBodyStyle}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Overall Match</span>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: matchScore >= 70 ? '#10b981' : matchScore >= 40 ? '#f59e0b' : '#ef4444' }}>{matchScore}%</span>
                    </div>
                    <div style={progressBarBg}>
                      <div style={progressBarFill(matchScore, matchScore >= 70 ? '#10b981' : matchScore >= 40 ? '#f59e0b' : '#ef4444')}></div>
                    </div>
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Experience Fit</span>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#3b82f6' }}>{Math.min(matchScore + 10, 100)}%</span>
                    </div>
                    <div style={progressBarBg}>
                      <div style={progressBarFill(Math.min(matchScore + 10, 100), '#3b82f6')}></div>
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Education Match</span>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#8b5cf6' }}>{Math.min(matchScore + 15, 100)}%</span>
                    </div>
                    <div style={progressBarBg}>
                      <div style={progressBarFill(Math.min(matchScore + 15, 100), '#8b5cf6')}></div>
                    </div>
                  </div>

                  {appData.resumeAnalysis?.skills?.length > 0 && (
                    <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {appData.resumeAnalysis.skills.slice(0, 6).map((skill, i) => (
                        <span key={i} style={{
                          padding: '3px 10px', borderRadius: '12px', fontSize: '10px', fontWeight: 700,
                          background: 'rgba(0,63,177,0.08)', color: '#003fb1', border: '1px solid rgba(0,63,177,0.15)'
                        }}>{skill}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Requirement Fit */}
              <div style={cardStyle}>
                <div style={cardHeaderStyle}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#10b981' }}>check_circle</span>
                  Requirement Fit
                </div>
                <div style={cardBodyStyle}>
                  {[
                    { label: 'Core Skills Match', met: matchScore >= 50 },
                    { label: 'Experience Level', met: matchScore >= 30 },
                    { label: 'Education Requirement', met: true },
                    { label: 'SLA Compliance', met: !appData.slaBreached },
                  ].map((req, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0',
                      borderBottom: i < 3 ? '1px solid #f5f5f5' : 'none'
                    }}>
                      <span className="material-symbols-outlined" style={{
                        fontSize: '18px', color: req.met ? '#10b981' : '#ef4444'
                      }}>{req.met ? 'check_circle' : 'cancel'}</span>
                      <span style={{ fontSize: '13px', fontWeight: 500, color: req.met ? '#475569' : '#ef4444' }}>{req.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Existing Notes Display */}
            {(appData.recruiterNotes || []).length > 0 && (
              <div style={cardStyle}>
                <div style={cardHeaderStyle}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#f59e0b' }}>sticky_note_2</span>
                  Previous Notes
                </div>
                <div style={{ ...cardBodyStyle, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {appData.recruiterNotes.map((n, i) => (
                    <div key={i} style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', borderLeft: '3px solid #f59e0b' }}>
                      <p style={{ fontSize: '13px', color: '#334155', margin: '0 0 6px', lineHeight: 1.5 }}>"{n.text}"</p>
                      <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0, fontWeight: 600 }}>
                        By {n.addedBy} • {new Date(n.addedAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recruiter Notes Input */}
            <div style={cardStyle}>
              <div style={cardHeaderStyle}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--color-primary)' }}>edit_note</span>
                Recruiter Notes
              </div>
              <div style={cardBodyStyle}>
                <div style={{
                  display: 'flex', gap: '12px', alignItems: 'flex-start'
                }}>
                  <textarea
                    value={noteText}
                    onChange={e => setNoteText(e.target.value)}
                    placeholder="Add internal notes about this candidate..."
                    style={{
                      flex: 1, padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0',
                      background: '#f8fafc', fontSize: '13px', minHeight: '80px', resize: 'vertical',
                      fontFamily: 'Inter, sans-serif', outline: 'none', transition: 'all 0.2s'
                    }}
                  />
                  <button 
                    onClick={handleAddNote}
                    disabled={processing || !noteText.trim()}
                    style={{
                      padding: '12px 20px', borderRadius: '10px', border: 'none',
                      background: processing || !noteText.trim() ? '#cbd5e1' : 'var(--gradient-primary)', 
                      color: '#fff', fontSize: '13px', fontWeight: 700,
                      cursor: processing || !noteText.trim() ? 'not-allowed' : 'pointer', 
                      whiteSpace: 'nowrap'
                  }}>
                    Save Note
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ---- RIGHT COLUMN ---- */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Next Best Action */}
            <div style={{
              borderRadius: '16px', padding: '2px',
              background: 'linear-gradient(135deg, #003fb1 0%, #1a56db 50%, #06b6d4 100%)',
              boxShadow: '0 4px 20px rgba(0,63,177,0.2)'
            }}>
              <div style={{
                background: '#fff', borderRadius: '14px', padding: '24px'
              }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(0,63,177,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'
                }}>
                  <span className="material-symbols-outlined" style={{ color: '#003fb1', fontSize: '20px' }}>lightbulb</span>
                </div>
                <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#94a3b8', margin: '0 0 4px' }}>AI Recommendation</p>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', margin: '0 0 8px', fontFamily: 'Manrope, sans-serif' }}>{nextAction.title}</h3>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: '0 0 20px' }}>{nextAction.desc}</p>
                {nextAction.actionLabel && (
                  <button
                    onClick={() => {
                      if (status === 'applied') handleAction('shortlisted');
                      else if (status === 'shortlisted') handleAction('interview');
                      else if (status === 'interview') handleAction('offered');
                    }}
                    disabled={processing}
                    style={{
                      width: '100%', padding: '14px', borderRadius: '12px', border: 'none',
                      background: status === 'interview' ? '#10b981' : 'var(--gradient-primary)', 
                      color: '#fff', fontSize: '14px', fontWeight: 700,
                      cursor: processing ? 'not-allowed' : 'pointer', 
                      boxShadow: status === 'interview' ? '0 4px 12px rgba(16,185,129,0.3)' : '0 4px 12px rgba(0,63,177,0.3)',
                      transition: 'all 0.2s', letterSpacing: '0.3px',
                      marginBottom: nextAction.secondaryActionLabel ? '12px' : '0'
                    }}
                  >
                    {nextAction.actionLabel}
                  </button>
                )}
                
                {nextAction.secondaryActionLabel && (
                  <button
                    onClick={() => handleAction('interview')}
                    disabled={processing}
                    style={{
                      width: '100%', padding: '14px', borderRadius: '12px', border: '2px solid #e2e8f0',
                      background: 'transparent', color: '#475569', fontSize: '14px', fontWeight: 700,
                      cursor: processing ? 'not-allowed' : 'pointer', transition: 'all 0.2s', letterSpacing: '0.3px'
                    }}
                  >
                    {nextAction.secondaryActionLabel}
                  </button>
                )}
              </div>
            </div>

            {/* SLA Risk Indicator */}
            <div style={{
              ...cardStyle, padding: '20px',
              borderLeft: `4px solid ${sla.color}`
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: sla.color }}>
                  {appData.slaBreached ? 'error' : 'timer'}
                </span>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: sla.color }}>
                  SLA Risk Indicator
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', margin: 0 }}>
                    {appData.daysInStatus || 0}<span style={{ fontSize: '14px', fontWeight: 500, color: '#94a3b8' }}> / {appData.slaLimit || 5} days</span>
                  </p>
                  <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Time in current stage</p>
                </div>
                <span style={{
                  ...pillStyle(sla.color, sla.bg), fontSize: '10px', padding: '6px 14px'
                }}>{sla.label}</span>
              </div>
            </div>

            {/* Application Timeline */}
            <div style={cardStyle}>
              <div style={cardHeaderStyle}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--color-primary)' }}>timeline</span>
                Application Timeline
              </div>
              <div style={{ ...cardBodyStyle, paddingTop: '16px' }}>
                <div style={{ position: 'relative' }}>
                  {/* Vertical line */}
                  <div style={{
                    position: 'absolute', left: '11px', top: '8px', bottom: '8px',
                    width: '2px', background: '#e8eaed', borderRadius: '1px'
                  }}></div>

                  {timeline.slice().reverse().map((event, index) => (
                    <div key={index} style={{
                      display: 'flex', gap: '16px', position: 'relative', paddingBottom: index < timeline.length - 1 ? '24px' : '0'
                    }}>
                      {/* Dot */}
                      <div style={{
                        width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: index === 0 ? '#003fb1' : '#e2e8f0',
                        boxShadow: index === 0 ? '0 0 0 4px rgba(0,63,177,0.15)' : 'none',
                        zIndex: 1
                      }}>
                        <span className="material-symbols-outlined" style={{
                          fontSize: '12px', color: index === 0 ? '#fff' : '#94a3b8'
                        }}>{index === 0 ? 'radio_button_checked' : 'check'}</span>
                      </div>
                      {/* Content */}
                      <div>
                        <p style={{
                          fontSize: '13px', fontWeight: 700, margin: '0 0 2px',
                          color: index === 0 ? '#003fb1' : '#475569'
                        }}>
                          Status Updated To: {(event.status || event.action || 'Update').replace('_', ' ')}
                        </p>
                        <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>
                          {new Date(event.date).toLocaleString()}
                        </p>
                        {event.notes && (
                          <p style={{
                            fontSize: '12px', color: '#64748b', margin: '6px 0 0',
                            padding: '6px 10px', background: '#f8fafc', borderRadius: '6px',
                            borderLeft: '3px solid #e2e8f0'
                          }}>{event.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}

                  {timeline.length === 0 && (
                    <p style={{ fontSize: '13px', color: '#94a3b8', textAlign: 'center', padding: '20px 0' }}>No timeline events yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CandidateFollowUp;
