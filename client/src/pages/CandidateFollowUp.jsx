import { useState } from 'react';
import DashboardLayout from '../components/layouts/DashboardLayout';

const CandidateFollowUp = () => {
  const [selectedAction, setSelectedAction] = useState('schedule');

  const candidate = {
    name: 'Elena Rodriguez',
    role: 'Senior Product Designer',
    source: 'LinkedIn Referral',
    applied: '2 days ago',
    stage: 'Screening',
  };

  const actions = [
    { key: 'schedule', label: 'Schedule Interview', icon: 'event', active: true },
    { key: 'shortlist', label: 'Shortlist Candidate', icon: 'thumb_up', active: false },
    { key: 'clarify', label: 'Request Clarification', icon: 'help_outline', active: false },
    { key: 'reject', label: 'Reject Application', icon: 'block', active: false, danger: true },
  ];

  return (
    <DashboardLayout>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Split Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '0', background: '#fff', borderRadius: '16px', border: '1px solid #e8eaed', overflow: 'hidden' }}>
          {/* Left - Candidate Info */}
          <div style={{ padding: '32px', borderRight: '1px solid #e8eaed' }}>
            <p style={{ fontSize: '10px', fontWeight: 700, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px' }}>Action Required</p>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#1e293b', margin: '0 0 20px', fontFamily: 'Manrope' }}>Candidate Follow-Up</h2>

            {/* Avatar & Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%', background: '#003fb1',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '18px', fontWeight: 700,
              }}>ER</div>
              <div>
                <p style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', margin: 0 }}>{candidate.name}</p>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0' }}>{candidate.role}</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>Source</span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#003fb1' }}>{candidate.source}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>Applied</span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#1e293b' }}>{candidate.applied}</span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {actions.map(a => (
                <button key={a.key} onClick={() => setSelectedAction(a.key)} style={{
                  display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px',
                  borderRadius: '10px', border: 'none', cursor: 'pointer', width: '100%',
                  textAlign: 'left', fontSize: '13px', fontWeight: 600, fontFamily: 'Inter',
                  background: selectedAction === a.key ? '#003fb1' : 'transparent',
                  color: a.danger && selectedAction !== a.key ? '#ef4444' : selectedAction === a.key ? '#fff' : '#1e293b',
                  transition: 'all 0.15s',
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{a.icon}</span>
                  {a.label}
                </button>
              ))}
            </div>

            {/* Workflow Notice */}
            <div style={{
              marginTop: '20px', padding: '12px', background: '#fef2f2', borderRadius: '8px',
              border: '1px solid #fecaca', display: 'flex', gap: '10px',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#ef4444', flexShrink: 0 }}>warning</span>
              <p style={{ fontSize: '11px', color: '#dc2626', lineHeight: 1.5, margin: 0 }}>
                <strong>Workflow Notice:</strong> Elena has not completed the Technical Assessment yet. Scheduling now may skip standard protocol.
              </p>
            </div>
          </div>

          {/* Right - Communication Preview */}
          <div style={{ padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#003fb1' }}></div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Stage: {candidate.stage}</span>
              </div>
              <button style={{ background: 'none', border: 'none', fontSize: '20px', color: '#cbd5e1', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', margin: 0, fontFamily: 'Manrope' }}>Communication Preview</h3>
              <span style={{ fontSize: '12px', color: '#003fb1', fontWeight: 600, cursor: 'pointer' }}>Edit Template</span>
            </div>

            {/* Email Preview */}
            <div style={{ background: '#f8fafc', borderRadius: '12px', border: '1px solid #f1f5f9', padding: '24px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginRight: '8px' }}>Subject:</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>Interview Invitation: {candidate.role} @ HireFlow</span>
              </div>

              <p style={{ fontSize: '13px', color: '#1e293b', lineHeight: 1.7 }}>
                Dear <strong>{candidate.name}</strong>,
              </p>
              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.7, margin: '12px 0' }}>
                Our team was impressed by your portfolio and professional background. We'd love to discuss the {candidate.role} role further with you.
              </p>

              {/* Meeting Link Card */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '14px',
                background: '#fff', borderRadius: '8px', border: '1px solid #e8eaed', margin: '16px 0',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#003fb1' }}>calendar_month</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', margin: 0 }}>Meeting Link Attached</p>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0' }}>calendly.com/hireflow/elena-rodriguez</p>
                </div>
                <span style={{ fontSize: '12px', color: '#003fb1', fontWeight: 600, cursor: 'pointer' }}>Change Link</span>
              </div>

              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.7 }}>
                Please pick a time that works best for you. We look forward to meeting you soon!
              </p>
              <p style={{ fontSize: '13px', color: '#475569', margin: '16px 0 0' }}>Best regards,<br/><strong>HireFlow Talent Team</strong></p>
            </div>

            {/* Options */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <div style={{ padding: '14px', border: '1px solid #e8eaed', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#003fb1' }}>videocam</span>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b', margin: 0 }}>Remote (Zoom)</p>
                  <p style={{ fontSize: '10px', color: '#94a3b8', margin: '2px 0 0' }}>Link will be auto-generated and shared with candidate.</p>
                </div>
              </div>
              <div style={{ padding: '14px', border: '1px solid #e8eaed', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#475569' }}>groups</span>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b', margin: 0 }}>Internal Only</p>
                  <p style={{ fontSize: '10px', color: '#94a3b8', margin: '2px 0 0' }}>Add internal stakeholders for private review.</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ accentColor: '#003fb1' }} />
                Notify Hiring Manager
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button style={{ padding: '10px 20px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff', fontSize: '13px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>Discard</button>
                <button style={{
                  padding: '10px 24px', border: 'none', borderRadius: '8px', background: '#003fb1',
                  fontSize: '13px', fontWeight: 700, color: '#fff', cursor: 'pointer',
                }}>Confirm & Send Invitation</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CandidateFollowUp;
