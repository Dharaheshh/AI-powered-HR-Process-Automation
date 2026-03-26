import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllApplicationsAPI } from '../services/api';
import DashboardLayout from '../components/layouts/DashboardLayout';

const SLAAlerts = () => {
  const navigate = useNavigate();
  const [breaches, setBreaches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await getAllApplicationsAPI();
        const flagged = res.data.applications.filter(a => a.slaBreached);
        setBreaches(flagged);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  return (
    <DashboardLayout>
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#1e293b', margin: 0, fontFamily: 'Manrope, sans-serif' }}>
          SLA <span style={{ color: '#ef4444' }}>Alerts</span>
        </h2>
        <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>Monitor timeline breaches and urgent pending actions across all candidates.</p>
      </div>
      
      {loading ? (
        <div className="placeholder-section">Scanning for SLA breaches...</div>
      ) : breaches.length === 0 ? (
        <div className="glass" style={{ borderRadius: '12px', padding: '60px', textAlign: 'center' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#10b981', marginBottom: '16px', display: 'block' }}>check_circle</span>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', margin: '0 0 8px' }}>All Clear!</h3>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>There are no SLA breaches in your hiring pipeline.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span className="material-symbols-outlined" style={{ color: '#ef4444', fontSize: '24px' }}>warning</span>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 700, color: '#991b1b', margin: 0 }}>Attention Required</p>
              <p style={{ fontSize: '13px', color: '#b91c1c', margin: '2px 0 0' }}>{breaches.length} candidates have exceeded the maximum allowed time in their current stage.</p>
            </div>
          </div>

          <div className="glass applicants-table-wrapper" style={{ borderRadius: '12px' }}>
            <table className="applicants-table">
              <thead>
                <tr>
                  <th>Candidate Info</th>
                  <th>Role Applied</th>
                  <th>Current Stage</th>
                  <th>SLA Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {breaches.map(app => (
                  <tr key={app._id} style={{ background: 'rgba(239, 68, 68, 0.02)' }}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{app.candidate?.name || 'Unknown'}</div>
                      <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{app.candidate?.email}</div>
                    </td>
                    <td><span style={{ fontWeight: 600, color: '#1e293b' }}>{app.jobOpening?.title}</span></td>
                    <td>
                      <span className="status-pill" style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0' }}>
                        {app.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ 
                          fontSize: '0.75rem', fontWeight: 700, color: '#ef4444', 
                          background: 'rgba(239, 68, 68, 0.1)', padding: '4px 8px', 
                          borderRadius: '4px', border: '1px solid rgba(239, 68, 68, 0.3)',
                          whiteSpace: 'nowrap'
                        }}>
                          Overdue ({app.daysInStatus}d / {app.slaLimit}d max)
                        </span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        onClick={() => navigate(`/candidates/${app._id}`)}
                        className="btn btn-primary"
                        style={{ padding: '6px 12px', fontSize: '0.85rem', background: '#ef4444', borderColor: '#ef4444', color: '#fff' }}
                      >
                        Resolve Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default SLAAlerts;
