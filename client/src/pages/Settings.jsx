import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/layouts/DashboardLayout';

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <DashboardLayout>
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#1e293b', margin: 0, fontFamily: 'Manrope, sans-serif' }}>
          Platform <span style={{ color: '#003fb1' }}>Settings</span>
        </h2>
        <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>Configure your HR workflows, SLA alerts, and system preferences</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '32px' }}>
        {/* Sidebar Nav */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { id: 'profile', label: 'My Profile', icon: 'person' },
            { id: 'notifications', label: 'Notifications', icon: 'notifications' },
            { id: 'templates', label: 'Email Templates', icon: 'mail' },
            { id: 'security', label: 'Security', icon: 'lock' }
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px',
              borderRadius: '8px', border: 'none', background: activeTab === tab.id ? '#003fb1' : 'transparent',
              color: activeTab === tab.id ? '#fff' : '#64748b', fontSize: '13px', fontWeight: 600,
              cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e8eaed', padding: '32px' }}>
          
          {activeTab === 'profile' && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', margin: '0 0 24px', fontFamily: 'Manrope' }}>Profile Information</h3>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#003fb1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '28px', fontWeight: 700 }}>
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <button style={{ padding: '8px 16px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '12px', fontWeight: 600, color: '#475569', cursor: 'pointer', marginBottom: '8px' }}>Change Photo</button>
                  <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Full Name</label>
                  <input type="text" defaultValue={user?.name} className="form-input" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Email Address</label>
                  <input type="email" defaultValue={user?.email} className="form-input" disabled style={{ background: '#f8fafc', color: '#94a3b8' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Role</label>
                  <input type="text" defaultValue={user?.role?.toUpperCase()} className="form-input" disabled style={{ background: '#f8fafc', color: '#94a3b8' }} />
                </div>
              </div>
              
              <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn btn-primary">Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', margin: '0 0 24px', fontFamily: 'Manrope' }}>Email Notifications</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { title: 'New Applications', desc: 'Get notified when a candidate applies for an open role.' },
                  { title: 'SLA Breaches', desc: 'Alert me immediately when a candidate stays in a stage for too long.' },
                  { title: 'Interview Updates', desc: 'Updates on interview schedules and cancellations.' }
                ].map((n, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b', margin: '0 0 4px' }}>{n.title}</p>
                      <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>{n.desc}</p>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-block', width: '40px', height: '20px' }}>
                      <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                      <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#003fb1', borderRadius: '34px' }}></span>
                      <span style={{ position: 'absolute', content: '""', height: '16px', width: '16px', left: '22px', bottom: '2px', backgroundColor: 'white', borderRadius: '50%' }}></span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', margin: '0 0 24px', fontFamily: 'Manrope' }}>Email Templates</h3>
              <p style={{ fontSize: '13px', color: '#64748b' }}>Configure the default text used in automated email workflows.</p>
              
              <div style={{ marginTop: '24px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Interview Invitation</label>
                <textarea className="form-input" rows="4" defaultValue="Dear {candidate_name},\n\nWe would like to invite you for an interview for the {role} role..." style={{ width: '100%', resize: 'vertical' }}></textarea>
              </div>
              <div style={{ marginTop: '24px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Rejection Email</label>
                <textarea className="form-input" rows="4" defaultValue="Dear {candidate_name},\n\nThank you for applying. Unfortunately, we will not be moving forward..." style={{ width: '100%', resize: 'vertical' }}></textarea>
              </div>
              
              <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn btn-primary">Save Templates</button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', margin: '0 0 24px', fontFamily: 'Manrope' }}>Security Settings</h3>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Current Password</label>
                <input type="password" placeholder="••••••••" className="form-input" style={{ maxWidth: '300px' }} />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>New Password</label>
                <input type="password" placeholder="••••••••" className="form-input" style={{ maxWidth: '300px' }} />
              </div>
              
              <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-start' }}>
                <button className="btn" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#1e293b' }}>Update Password</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
