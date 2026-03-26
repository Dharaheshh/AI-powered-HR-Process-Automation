import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { getHRSummaryAPI, getMyJobOpeningsAPI } from '../services/api';
import DashboardLayout from '../components/layouts/DashboardLayout';

const StatCard = ({ label, value, color, sub }) => (
  <div style={{
    background: '#fff', padding: '20px 24px', borderRadius: '12px',
    border: '1px solid #e8eaed', borderLeft: `4px solid ${color}`,
  }}>
    <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px' }}>{label}</p>
    <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#1e293b', margin: 0, fontFamily: 'Manrope, sans-serif' }}>{value}</h3>
    {sub && <p style={{ fontSize: '12px', color: color, fontWeight: 600, marginTop: '8px' }}>{sub}</p>}
  </div>
);

const HRDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalApplications: 0, totalActiveJobs: 0, totalHires: 0, funnelData: [] });
  const [openings, setOpenings] = useState([]);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [analyticsRes, openingsRes] = await Promise.all([
        getHRSummaryAPI().catch(() => ({ data: { data: { totalApplications: 0, totalActiveJobs: 0, totalHires: 0, funnelData: [] } } })),
        getMyJobOpeningsAPI().catch(() => ({ data: { jobOpenings: [] } }))
      ]);
      setStats(analyticsRes.data.data);
      setOpenings(openingsRes.data.jobOpenings || []);
    } catch (e) { console.error('Dashboard fetch failed', e); }
  };

  const funnelGet = (name) => stats.funnelData?.find(d => d.name === name)?.count || 0;
  const appliedCount = funnelGet('Applied');
  const shortlistedCount = funnelGet('Shortlisted');
  const interviewCount = funnelGet('Interview');
  const rejectedCount = funnelGet('Rejected');

  const pipelineStages = [
    { label: 'Applied', count: appliedCount, color: '#003fb1' },
    { label: 'Shortlisted', count: shortlistedCount, color: '#10b981' },
    { label: 'Interview', count: interviewCount, color: '#06b6d4' },
    { label: 'Offered', count: stats.totalHires, color: '#22c55e' },
    { label: 'Rejected', count: rejectedCount, color: '#ef4444' },
  ];
  const maxCount = Math.max(...pipelineStages.map(s => s.count), 1);

  return (
    <DashboardLayout>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
        <div>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#1e293b', margin: 0, fontFamily: 'Manrope, sans-serif' }}>
            Welcome back, <span style={{ color: '#003fb1' }}>{user?.name}</span> 👋
          </h2>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>Here's what's happening with your hiring pipeline today.</p>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
        <StatCard label="Total Applicants" value={stats.totalApplications} color="#003fb1" sub="Across all roles" />
        <StatCard label="Shortlisted" value={shortlistedCount} color="#10b981" sub="Ready for review" />
        <StatCard label="Interviews" value={interviewCount} color="#06b6d4" sub="Scheduled" />
        <StatCard label="Pending Actions" value={appliedCount} color="#ef4444" sub="Need attention" />
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Job Openings */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="material-symbols-outlined" style={{ color: '#003fb1', fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>work</span>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', margin: 0, fontFamily: 'Manrope' }}>Your Job Openings</h4>
              </div>
              <Link to="/my-openings" style={{ fontSize: '13px', fontWeight: 600, color: '#003fb1', textDecoration: 'none' }}>View all →</Link>
            </div>
            {openings.length === 0 ? (
              <p style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>No active job openings. Post a new job to get started!</p>
            ) : (
              <div>
                {openings.slice(0, 5).map((opening, i) => (
                  <Link to={`/applicants/${opening._id}`} key={opening._id} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 24px', textDecoration: 'none',
                    borderBottom: i < Math.min(openings.length, 5) - 1 ? '1px solid #f8fafc' : 'none',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#fafbfc'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#eff4ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span className="material-symbols-outlined" style={{ color: '#003fb1', fontSize: '18px' }}>work_outline</span>
                      </div>
                      <div>
                        <h5 style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b', margin: 0 }}>{opening.title}</h5>
                        <p style={{ fontSize: '12px', color: '#94a3b8', margin: '2px 0 0' }}>{opening.role?.name} • {opening.location || 'Remote'}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', margin: 0 }}>{opening.applicantCount || 0}</p>
                        <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0 }}>Applicants</p>
                      </div>
                      <span style={{
                        padding: '4px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: 700,
                        textTransform: 'uppercase', letterSpacing: '0.5px',
                        background: opening.status === 'open' ? '#ecfdf5' : '#f1f5f9',
                        color: opening.status === 'open' ? '#059669' : '#64748b',
                      }}>{opening.status}</span>
                      <span className="material-symbols-outlined" style={{ color: '#cbd5e1', fontSize: '18px' }}>chevron_right</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Pipeline */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed', padding: '24px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', margin: '0 0 20px', fontFamily: 'Manrope' }}>Hiring Pipeline</h4>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '160px' }}>
              {pipelineStages.map(stage => (
                <div key={stage.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>{stage.count}</span>
                  <div style={{ width: '100%', background: '#f1f5f9', borderRadius: '6px 6px 0 0', flex: 1, position: 'relative' }}>
                    <div style={{
                      position: 'absolute', bottom: 0, width: '100%', borderRadius: '6px 6px 0 0',
                      background: stage.color, height: `${Math.max((stage.count / maxCount) * 100, 4)}%`,
                      transition: 'height 0.5s ease',
                    }}></div>
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>{stage.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Quick Actions */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed', padding: '20px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 12px' }}>Quick Actions</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { to: '/open-role', icon: 'add_circle', label: 'Post New Job', bg: '#eff4ff', color: '#003fb1' },
                { to: '/my-openings', icon: 'list_alt', label: 'View All Openings', bg: '#f8fafc', color: '#475569' },
                { to: '/hr-analytics', icon: 'analytics', label: 'View Analytics', bg: '#f8fafc', color: '#475569' },
              ].map(a => (
                <Link key={a.to} to={a.to} style={{
                  display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
                  borderRadius: '8px', background: a.bg, textDecoration: 'none', transition: 'opacity 0.15s',
                }}>
                  <span className="material-symbols-outlined" style={{ color: a.color, fontSize: '20px' }}>{a.icon}</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: a.color }}>{a.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* AI Insight */}
          <div style={{
            background: 'linear-gradient(135deg, #003fb1, #1a56db)', borderRadius: '12px', padding: '20px', color: '#fff',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>HireFlow AI Insight</p>
            </div>
            <p style={{ fontSize: '13px', opacity: 0.9, lineHeight: 1.6, margin: 0 }}>
              Your hiring pipeline is healthy. Focus on clearing {appliedCount} pending applications to maintain your SLA targets.
            </p>
          </div>

          {/* Summary */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed', padding: '20px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 16px' }}>Summary</p>
            {[
              { label: 'Active Roles', value: stats.totalActiveJobs, color: '#1e293b' },
              { label: 'Total Hires', value: stats.totalHires, color: '#059669' },
              { label: 'Rejection Rate', value: `${stats.totalApplications > 0 ? Math.round((rejectedCount / stats.totalApplications) * 100) : 0}%`, color: '#ef4444' },
            ].map((s, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '8px 0', borderTop: i > 0 ? '1px solid #f8fafc' : 'none',
              }}>
                <span style={{ fontSize: '13px', color: '#64748b' }}>{s.label}</span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HRDashboard;