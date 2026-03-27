import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { getHRSummaryAPI, getMyJobOpeningsAPI, getAllApplicationsAPI, getRecommendationsAPI } from '../services/api';
import DashboardLayout from '../components/layouts/DashboardLayout';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart
} from 'recharts';

const COLORS = ['#003fb1', '#10b981', '#f59e0b', '#06b6d4', '#ef4444', '#8b5cf6'];
const SLA_COLORS = ['#10b981', '#f59e0b', '#ef4444'];

const StatCard = ({ label, value, color, sub, icon }) => (
  <div style={{
    background: '#fff', padding: '20px 24px', borderRadius: '12px',
    border: '1px solid #e8eaed', borderLeft: `4px solid ${color}`,
  }}>
    <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px' }}>{label}</p>
    <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#1e293b', margin: 0, fontFamily: 'Manrope, sans-serif' }}>{value}</h3>
    {sub && <p style={{ fontSize: '12px', color: color, fontWeight: 600, marginTop: '8px' }}>{sub}</p>}
  </div>
);

const ChartCard = ({ title, children, span }) => (
  <div style={{
    background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed', padding: '24px',
    gridColumn: span ? `span ${span}` : undefined
  }}>
    <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', margin: '0 0 20px', fontFamily: 'Manrope, sans-serif' }}>{title}</h4>
    {children}
  </div>
);

const HRDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalApplications: 0, totalActiveJobs: 0, totalHires: 0,
    funnelData: [], popularRolesData: [], applicationsOverTime: [], slaData: [],
    shortlistRate: 0, interviewRate: 0, rejectionRate: 0, offerRate: 0,
    slaCompliance: 100, avgMatchScore: 0, slaBreachedCount: 0
  });
  const [openings, setOpenings] = useState([]);
  const [allApps, setAllApps] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [analyticsRes, openingsRes, appsRes, recsRes] = await Promise.all([
        getHRSummaryAPI().catch(() => ({ data: { data: stats } })),
        getMyJobOpeningsAPI().catch(() => ({ data: { jobOpenings: [] } })),
        getAllApplicationsAPI().catch(() => ({ data: { applications: [] } })),
        getRecommendationsAPI().catch(() => ({ data: { recommendations: [] } }))
      ]);
      setStats(analyticsRes.data.data);
      setOpenings(openingsRes.data.jobOpenings || []);
      setAllApps(appsRes.data.applications || []);
      setRecommendations(recsRes.data.recommendations || []);
    } catch (e) { console.error('Dashboard fetch failed', e); }
  };

  const funnelGet = (name) => stats.funnelData?.find(d => d.name === name)?.count || 0;
  const appliedCount = funnelGet('Applied');
  const shortlistedCount = funnelGet('Shortlisted');
  const interviewCount = funnelGet('Interview');

  const pipelineStages = [
    { label: 'Applied', count: funnelGet('Applied'), color: '#003fb1' },
    { label: 'Shortlisted', count: funnelGet('Shortlisted'), color: '#10b981' },
    { label: 'Interview', count: funnelGet('Interview'), color: '#06b6d4' },
    { label: 'Offered', count: funnelGet('Offered'), color: '#22c55e' },
    { label: 'Rejected', count: funnelGet('Rejected'), color: '#ef4444' },
  ];

  const highMatchPendingCount = allApps.filter(a => a.status === 'applied' && (a.matchScore || 0) >= 80).length;

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

      {/* Recommendations Alert Panel */}
      {recommendations.length > 0 && (
        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '20px 24px', marginBottom: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="material-symbols-outlined" style={{ color: '#2563eb', fontSize: '28px' }}>tips_and_updates</span>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1e3a8a', margin: 0 }}>Smart Role Recommendations</h3>
              <p style={{ fontSize: '13px', color: '#1e40af', margin: '4px 0 0' }}>AI has detected {recommendations.length} candidate{recommendations.length !== 1 ? 's' : ''} better suited for a different role pipeline.</p>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {recommendations.map(rec => (
              <div 
                key={rec._id} 
                onClick={() => navigate('/candidate', { state: { candidateId: rec.application._id } })}
                style={{ background: '#fff', borderRadius: '8px', padding: '16px', border: '1px solid #bfdbfe', cursor: 'pointer', transition: 'box-shadow 0.2s', boxShadow: '0 2px 4px rgba(37,99,235,0.05)' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(37,99,235,0.1)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 4px rgba(37,99,235,0.05)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  {rec.candidate?.profileImage ? (
                    <img src={rec.candidate.profileImage} alt="profile" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#bfdbfe', color: '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                      {rec.candidate?.name?.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', margin: 0 }}>{rec.candidate?.name}</h4>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>Applied: {rec.appliedRole?.name} ({rec.appliedMatchScore}%)</p>
                  </div>
                </div>
                
                <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>🔥 Recommended Fit</p>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: '#10b981', margin: 0 }}>
                    {rec.recommendedJobOpening?.role?.name} – {rec.recommendedMatchScore}% Match
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '28px' }}>
        <StatCard label="Total Applicants" value={stats.totalApplications} color="#003fb1" sub="Across all roles" />
        <StatCard label="Shortlisted" value={shortlistedCount} color="#10b981" sub={`${stats.shortlistRate}% rate`} />
        <StatCard label="Interviews" value={interviewCount} color="#06b6d4" sub="Scheduled" />
        <StatCard label="SLA Compliance" value={`${stats.slaCompliance}%`} color={stats.slaCompliance >= 80 ? '#10b981' : '#ef4444'} sub={`${stats.slaBreachedCount || 0} breaches`} />
        <StatCard label="Avg AI Match" value={`${stats.avgMatchScore}%`} color="#8b5cf6" sub="Across candidates" />
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>

        {/* Applications Over Time */}
        <ChartCard title="📈 Applications Over Time (14 Days)">
          <div style={{ height: '260px' }}>
            {(stats.applicationsOverTime || []).length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.applicationsOverTime} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#003fb1" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#003fb1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 10 }} stroke="#e8eaed" />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} stroke="#e8eaed" allowDecimals={false} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e8eaed', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                  <Area type="monotone" dataKey="count" stroke="#003fb1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorApps)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>No data yet</div>
            )}
          </div>
        </ChartCard>

        {/* Hiring Pipeline Bar */}
        <ChartCard title="📊 Hiring Pipeline">
          <div style={{ height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.funnelData || []} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} stroke="#e8eaed" />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} stroke="#e8eaed" allowDecimals={false} />
                <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e8eaed', borderRadius: '8px' }} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {(stats.funnelData || []).map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* SLA Status Pie Chart */}
        <ChartCard title="🔴 SLA Status Distribution">
          <div style={{ height: '260px' }}>
            {(stats.slaData || []).some(d => d.value > 0) ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={(stats.slaData || []).filter(d => d.value > 0)} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {(stats.slaData || []).filter(d => d.value > 0).map((entry, index) => {
                      const colorMap = { 'On Time': '#10b981', 'Warning': '#f59e0b', 'Breached': '#ef4444' };
                      return <Cell key={index} fill={colorMap[entry.name] || SLA_COLORS[index]} />;
                    })}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>No SLA data yet</div>
            )}
          </div>
        </ChartCard>

        {/* Candidates by Role */}
        <ChartCard title="👥 Candidates by Role">
          <div style={{ height: '260px' }}>
            {(stats.popularRolesData || []).length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.popularRolesData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                  <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} stroke="#e8eaed" allowDecimals={false} />
                  <YAxis dataKey="name" type="category" width={120} tick={{ fill: '#64748b', fontSize: 11 }} stroke="#e8eaed" />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e8eaed', borderRadius: '8px' }} />
                  <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                    {(stats.popularRolesData || []).map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>No role data yet</div>
            )}
          </div>
        </ChartCard>
      </div>

      {/* Bottom Section: Job Openings + Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
        {/* Left: Job Openings */}
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
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right: Quick Actions + AI Insight */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed', padding: '20px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 12px' }}>Quick Actions</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { to: '/open-role', icon: 'add_circle', label: 'Post New Job', bg: '#eff4ff', color: '#003fb1' },
                { to: '/candidates', icon: 'group', label: 'View Candidates', bg: '#f8fafc', color: '#475569' },
                { to: '/hr-analytics', icon: 'analytics', label: 'View Reports', bg: '#f8fafc', color: '#475569' },
              ].map(a => (
                <Link key={a.to} to={a.to} style={{
                  display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
                  borderRadius: '8px', background: a.bg, textDecoration: 'none',
                }}>
                  <span className="material-symbols-outlined" style={{ color: a.color, fontSize: '20px' }}>{a.icon}</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: a.color }}>{a.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #003fb1, #1a56db)', borderRadius: '12px', padding: '20px', color: '#fff',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>HireFlow AI Insight</p>
            </div>
            <p style={{ fontSize: '13px', opacity: 0.9, lineHeight: 1.6, margin: 0 }}>
              {highMatchPendingCount > 0
                ? `You have ${highMatchPendingCount} high-match candidates (>80%) waiting for review. Prioritize these to secure top talent.`
                : stats.slaBreachedCount > 0
                  ? `There are ${stats.slaBreachedCount} SLA breaches in your pipeline. Clear bottlenecks immediately.`
                  : `Your hiring pipeline is healthy. Keep tracking and moving the ${appliedCount} pending candidates forward.`}
            </p>
          </div>

          {/* Rate Summary */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed', padding: '20px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 16px' }}>Conversion Rates</p>
            {[
              { label: 'Shortlist Rate', value: `${stats.shortlistRate}%`, color: '#10b981' },
              { label: 'Interview Rate', value: `${stats.interviewRate}%`, color: '#06b6d4' },
              { label: 'Offer Rate', value: `${stats.offerRate}%`, color: '#22c55e' },
              { label: 'Rejection Rate', value: `${stats.rejectionRate}%`, color: '#ef4444' },
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