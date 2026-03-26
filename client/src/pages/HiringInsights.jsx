import { useState, useEffect } from 'react';
import { getHRSummaryAPI } from '../services/api';
import DashboardLayout from '../components/layouts/DashboardLayout';

const HiringInsights = () => {
  const [stats, setStats] = useState({ totalApplications: 0, totalActiveJobs: 0, totalHires: 0, funnelData: [], popularRolesData: [] });

  useEffect(() => {
    (async () => {
      try { const { data } = await getHRSummaryAPI(); setStats(data.data); } catch {}
    })();
  }, []);

  const shortlisted = stats.funnelData?.find(d => d.name === 'Shortlisted')?.count || 0;
  const rejected = stats.funnelData?.find(d => d.name === 'Rejected')?.count || 0;
  const total = stats.totalApplications || 1;
  const shortlistRate = Math.round((shortlisted / total) * 100);

  const kpis = [
    { label: 'Total Applicants', value: stats.totalApplications.toLocaleString(), delta: '▲ 12%', color: '#003fb1', icon: 'groups' },
    { label: 'Avg. Time to Action', value: '3.2 Days', delta: '▼ 4d', color: '#10b981', icon: 'schedule' },
    { label: 'Shortlist Rate', value: `${shortlistRate}%`, status: 'Stable', color: '#06b6d4', icon: 'check_circle' },
    { label: 'Bottlenecks', value: stats.funnelData.length > 0 ? `${stats.funnelData.length} Stage` : '0 Stage', status: 'Critical', color: '#ef4444', icon: 'warning' },
  ];

  const roleData = stats.popularRolesData?.length > 0
    ? stats.popularRolesData.slice(0, 4)
    : [{ name: 'No data', count: 0 }];
  const maxRole = Math.max(...roleData.map(r => r.count), 1);

  const teamMembers = [
    { name: 'Marcus Chen', roles: 12, color: '#003fb1' },
    { name: 'Sarah Jenkins', roles: 8, color: '#10b981' },
    { name: 'Alex Rivera', roles: 4, color: '#f59e0b' },
  ];

  const velocityData = [
    { phase: 'Screening', avgLatency: '1.2 Days' },
    { phase: 'Culture Fit', avgLatency: '0.8 Days' },
  ];

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
        <span style={{ fontSize: '10px', fontWeight: 700, color: '#003fb1', textTransform: 'uppercase', letterSpacing: '1px' }}>Operational Analytics</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', margin: 0, fontFamily: 'Manrope' }}>Hiring Insights</h1>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b', padding: '6px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>calendar_today</span>
            Last 30 Days
          </div>
          <button style={{
            padding: '8px 16px', border: 'none', borderRadius: '8px', background: '#003fb1',
            fontSize: '12px', fontWeight: 600, color: '#fff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>download</span>
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {kpis.map((k, i) => (
          <div key={i} style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e8eaed' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: k.color }}>{k.icon}</span>
              {k.delta && <span style={{ fontSize: '10px', fontWeight: 600, color: k.delta.includes('▲') ? '#10b981' : '#ef4444' }}>{k.delta}</span>}
              {k.status && <span style={{
                fontSize: '10px', fontWeight: 600, padding: '2px 8px', borderRadius: '10px',
                background: k.status === 'Critical' ? '#fef2f2' : '#ecfdf5',
                color: k.status === 'Critical' ? '#ef4444' : '#059669',
              }}>{k.status}</span>}
            </div>
            <p style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px' }}>{k.label}</p>
            <p style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', margin: 0, fontFamily: 'Manrope' }}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', marginBottom: '24px' }}>
        {/* Applicants by Role */}
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', margin: 0, fontFamily: 'Manrope' }}>Applicants by Strategic Role</h3>
            <span style={{ fontSize: '12px', color: '#003fb1', fontWeight: 600, cursor: 'pointer' }}>View Detailed List →</span>
          </div>
          {roleData.map((role, i) => (
            <div key={i} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>{role.name}</span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>{role.count} applicants</span>
              </div>
              <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  width: `${(role.count / maxRole) * 100}%`, height: '100%',
                  background: '#003fb1', borderRadius: '4px', transition: 'width 0.5s ease',
                }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Workload */}
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', margin: 0, fontFamily: 'Manrope' }}>Team Workload</h3>
            <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#94a3b8', cursor: 'pointer' }}>more_vert</span>
          </div>
          {teamMembers.map((m, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < teamMembers.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 700 }}>
                  {m.name.charAt(0)}
                </div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>{m.name}</span>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: m.color }}>{m.roles} Roles</span>
            </div>
          ))}
          <div style={{ marginTop: '16px', padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#475569', margin: '0 0 4px' }}>INSIGHT</p>
            <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
              Team bandwidth is currently at 78%. Hiring 2 more recruiters is recommended for the upcoming Q3 expansion.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 340px', gap: '24px' }}>
        {/* Shortlist vs Rejection */}
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed', padding: '24px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', margin: '0 0 20px', fontFamily: 'Manrope' }}>Shortlist vs Rejection</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {/* Donut */}
            <div style={{ position: 'relative', width: '100px', height: '100px' }}>
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="38" fill="none" stroke="#e8eaed" strokeWidth="12" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#003fb1" strokeWidth="12"
                  strokeDasharray={`${shortlistRate * 2.39} 239`} strokeDashoffset="0"
                  transform="rotate(-90 50 50)" strokeLinecap="round" />
              </svg>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <span style={{ fontSize: '20px', fontWeight: 800, color: '#1e293b', fontFamily: 'Manrope' }}>{shortlistRate}%</span>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#003fb1' }}></div>
                <span style={{ fontSize: '12px', color: '#1e293b' }}>Shortlisted</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#003fb1' }}>{shortlisted} Candidates</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#e8eaed' }}></div>
                <span style={{ fontSize: '12px', color: '#1e293b' }}>Rejected</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8' }}>{rejected} Candidates</span>
              </div>
            </div>
          </div>
        </div>

        {/* Velocity Bottleneck */}
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed', padding: '24px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', margin: '0 0 16px', fontFamily: 'Manrope' }}>Velocity Bottleneck</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: '#fef2f2', borderRadius: '8px', marginBottom: '16px', border: '1px solid #fecaca' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#ef4444' }}>error</span>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#dc2626', margin: 0 }}>Technical Review Phase</p>
              <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0' }}>Wait times have increased by 2.4 days in the last week for Engineering roles.</p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
            <span>Phase</span><span>Avg. Latency</span>
          </div>
          {velocityData.map((v, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f8fafc' }}>
              <span style={{ fontSize: '13px', color: '#1e293b' }}>{v.phase}</span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>{v.avgLatency}</span>
            </div>
          ))}
        </div>

        {/* Pipeline Health Score */}
        <div style={{ background: 'linear-gradient(135deg, #003fb1, #1a56db)', borderRadius: '12px', padding: '24px', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px', opacity: 0.8 }}>Pipeline Health Score</p>
          <p style={{ fontSize: '48px', fontWeight: 800, margin: '0 0 4px', fontFamily: 'Manrope' }}>
            84 <span style={{ fontSize: '18px', opacity: 0.6 }}>/100</span>
          </p>
          <p style={{ fontSize: '13px', opacity: 0.8, lineHeight: 1.6, margin: '0 0 20px' }}>
            Excellent. Your pipeline is 15% healthier than last quarter.
          </p>
          <button style={{
            width: '100%', padding: '12px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: '8px', color: '#fff', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
          }}>Review Recommendations</button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HiringInsights;
