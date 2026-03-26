import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getApplicationAPI, updateApplicationStatusAPI } from '../services/api';
import DashboardLayout from '../components/layouts/DashboardLayout';
import toast from 'react-hot-toast';

const CandidateFollowUp = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appData, setAppData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAction, setSelectedAction] = useState('interview');
  const [processing, setProcessing] = useState(false);

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

  if (loading) return <DashboardLayout><div className="placeholder-section">Loading detail...</div></DashboardLayout>;
  if (!appData) return <DashboardLayout><div className="placeholder-section">Application not found</div></DashboardLayout>;

  const candidate = appData.candidate || {};
  const job = appData.jobOpening || {};
  const timeline = appData.timeline || [];

  const actions = [
    { key: 'interview', label: 'Schedule Interview', icon: 'event', active: true },
    { key: 'shortlisted', label: 'Shortlist Candidate', icon: 'thumb_up', active: false },
    { key: 'rejected', label: 'Reject Application', icon: 'block', active: false, danger: true },
  ];

  const handleActionConfirm = async () => {
    if (selectedAction === 'interview') {
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

    if (!window.confirm(`Are you sure you want to update status to ${selectedAction}?`)) return;
    try {
      setProcessing(true);
      await updateApplicationStatusAPI(id, selectedAction);
      toast.success(`Application updated and email sent!`);
      // Re-fetch data
      const res = await getApplicationAPI(id);
      setAppData(res.data.application);
      // Wait a moment before redirecting if we rejected
      if (selectedAction === 'rejected') {
        setTimeout(() => navigate('/candidates'), 1500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update application');
    } finally {
      setProcessing(false);
    }
  };

  const getInitials = (name) => name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '??';

  return (
    <DashboardLayout>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: '20px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'transparent', border: 'none', color: '#003fb1', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span> Back
          </button>
        </div>

        {/* Split Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) minmax(400px, 1.5fr)', gap: '0', background: '#fff', borderRadius: '16px', border: '1px solid #e8eaed', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          {/* Left - Candidate Info */}
          <div style={{ padding: '32px', borderRight: '1px solid #e8eaed', background: '#fafbfc' }}>
            <p style={{ fontSize: '10px', fontWeight: 700, color: appData.slaBreached ? '#ef4444' : '#003fb1', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px' }}>
              {appData.slaBreached ? '⚠️ SLA Breached (Action Required)' : 'Candidate Detail'}
            </p>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#1e293b', margin: '0 0 20px', fontFamily: 'Manrope' }}>Action Console</h2>

            {/* Avatar & Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%', background: '#003fb1',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '18px', fontWeight: 700,
              }}>{getInitials(candidate.name)}</div>
              <div>
                <p style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', margin: 0 }}>{candidate.name}</p>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0' }}>{candidate.email}</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px', background: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid #e8eaed' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>Job Role</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>{job.title}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>Applied Date</span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#1e293b' }}>{new Date(appData.appliedAt).toLocaleDateString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>AI Match Score</span>
                <span style={{ fontSize: '12px', fontWeight: 800, color: appData.matchScore >= 80 ? '#10b981' : appData.matchScore >= 50 ? '#f59e0b' : '#ef4444' }}>
                  {appData.matchScore ? `${appData.matchScore}%` : 'Pending'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>Resume</span>
                {appData.resumeFile ? (
                  <a href={`http://localhost:5000${appData.resumeFile}`} target="_blank" rel="noreferrer" style={{ fontSize: '12px', fontWeight: 600, color: '#003fb1', textDecoration: 'none' }}>View Document ↗</a>
                ) : (
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>Not provided</span>
                )}
              </div>
            </div>

            {/* Actions */}
            <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '12px' }}>Next Best Action</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {actions.map(a => (
                <button key={a.key} onClick={() => setSelectedAction(a.key)} style={{
                  display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px',
                  borderRadius: '10px', border: selectedAction === a.key ? '1px solid transparent' : '1px solid #e8eaed', 
                  cursor: 'pointer', width: '100%',
                  textAlign: 'left', fontSize: '13px', fontWeight: 600, fontFamily: 'Inter',
                  background: selectedAction === a.key ? (a.danger ? '#ef4444' : '#003fb1') : '#fff',
                  color: selectedAction === a.key ? '#fff' : (a.danger ? '#ef4444' : '#1e293b'),
                  transition: 'all 0.15s',
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{a.icon}</span>
                  {a.label}
                </button>
              ))}
            </div>
            
            {appData.status === 'rejected' && (
              <div style={{ marginTop: '20px', padding: '12px', background: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca', display: 'flex', gap: '10px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#ef4444', flexShrink: 0 }}>info</span>
                <p style={{ fontSize: '12px', color: '#dc2626', lineHeight: 1.5, margin: 0, fontWeight: 600 }}>This application is already closed/rejected.</p>
              </div>
            )}
          </div>

          {/* Right - Communication Preview & Timeline */}
          <div style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#003fb1', boxShadow: '0 0 0 3px rgba(0,63,177,0.1)' }}></div>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Current Stage: {appData.status}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', margin: 0, fontFamily: 'Manrope' }}>Workflow Automation Preview</h3>
            </div>

            {/* Email Preview */}
            <div style={{ background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px', marginBottom: '24px', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginRight: '8px' }}>Automated Subject:</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>Update regarding your application for {job.title}</span>
              </div>

              <p style={{ fontSize: '14px', color: '#1e293b', lineHeight: 1.7 }}>
                Dear <strong>{candidate.name}</strong>,
              </p>
              
              {selectedAction === 'interview' && (
                <>
                  <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, margin: '16px 0' }}>
                    Our team was impressed by your profile. We would like to invite you for an interview for the <strong>{job.title}</strong> role.
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: '#fff', borderRadius: '8px', border: '1px solid #cbd5e1', margin: '16px 0' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#003fb1' }}>calendar_month</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', margin: 0 }}>Action Required: HR will reach out to schedule</p>
                      <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0' }}>An official calendar invite will follow.</p>
                    </div>
                  </div>
                </>
              )}
              
              {selectedAction === 'shortlisted' && (
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, margin: '16px 0' }}>
                  Great news! Your application for <strong>{job.title}</strong> has been shortlisted for the next round. We will be in touch soon with further instructions.
                </p>
              )}

              {selectedAction === 'rejected' && (
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, margin: '16px 0' }}>
                  Thank you for applying to the <strong>{job.title}</strong> position. Unfortunately, we will not be moving forward with your application at this time.
                </p>
              )}

              <p style={{ fontSize: '14px', color: '#475569', margin: '24px 0 0' }}>Best regards,<br/><strong style={{ color: '#1e293b' }}>HireFlow Talent Team</strong></p>
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={{ padding: '12px 24px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff', fontSize: '14px', fontWeight: 600, color: '#475569', cursor: 'pointer', transition: 'background 0.15s' }}>Cancel</button>
                <button 
                  onClick={handleActionConfirm}
                  disabled={processing || appData.status === 'rejected' || appData.status === selectedAction}
                  style={{
                    padding: '12px 28px', border: 'none', borderRadius: '8px', 
                    background: (appData.status === 'rejected' || appData.status === selectedAction) ? '#cbd5e1' : (selectedAction === 'rejected' ? '#ef4444' : '#003fb1'),
                    fontSize: '14px', fontWeight: 700, color: '#fff', cursor: (appData.status === 'rejected' || appData.status === selectedAction) ? 'not-allowed' : 'pointer', transition: 'background 0.15s',
                    display: 'flex', alignItems: 'center', gap: '8px'
                  }}
                >
                  {processing ? 'Processing...' : (selectedAction === 'interview' ? 'Proceed to Calendar →' : `Confirm ${selectedAction.charAt(0).toUpperCase() + selectedAction.slice(1)}`)}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Timeline Log Section */}
        <div style={{ marginTop: '32px', background: '#fff', borderRadius: '16px', border: '1px solid #e8eaed', padding: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', margin: '0 0 24px', fontFamily: 'Manrope' }}>Application Timeline Log</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {timeline.slice().reverse().map((event, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: idx === 0 ? '#003fb1' : '#cbd5e1', border: '3px solid #fff', boxShadow: '0 0 0 1px #e2e8f0', marginTop: '4px' }}></div>
                  {idx !== timeline.length - 1 && <div style={{ width: '2px', flex: 1, background: '#e2e8f0', margin: '4px 0' }}></div>}
                </div>
                <div style={{ paddingBottom: idx !== timeline.length - 1 ? '16px' : '0' }}>
                  <p style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 4px', color: '#1e293b', textTransform: 'capitalize' }}>Status updated to: {event.status}</p>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px' }}>{new Date(event.date).toLocaleString()}</p>
                  {event.note && (
                    <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #f1f5f9', fontSize: '13px', color: '#475569' }}>
                      {event.note}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CandidateFollowUp;
