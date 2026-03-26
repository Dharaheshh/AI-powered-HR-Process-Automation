import { useState, useEffect } from 'react';
import { getHRSummaryAPI } from '../services/api';
import DashboardLayout from '../components/layouts/DashboardLayout';
import toast from 'react-hot-toast';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#003fb1', '#10b981', '#f59e0b', '#06b6d4', '#ef4444'];
const FUNNEL_COLORS = { Applied: '#003fb1', Shortlisted: '#10b981', Interview: '#06b6d4', Offered: '#22c55e', Rejected: '#ef4444' };

const HRAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalApplications: 0, totalActiveJobs: 0, totalHires: 0, funnelData: [], popularRolesData: [] });

  useEffect(() => { fetchAnalytics(); }, []);

  const fetchAnalytics = async () => {
    try {
      const { data } = await getHRSummaryAPI();
      setStats(data.data);
    } catch (error) { toast.error('Failed to load analytics data'); }
    finally { setLoading(false); }
  };

  return (
    <DashboardLayout>
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#1e293b', margin: 0, fontFamily: 'Manrope' }}>
          Analytics <span style={{ color: '#003fb1' }}>Overview</span>
        </h2>
        <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>Key metrics and hiring funnel insights</p>
      </div>

      {loading ? (
        <p style={{ color: '#94a3b8' }}>Loading metrics...</p>
      ) : (
        <>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
            {[
              { label: 'Total Applications', value: stats.totalApplications, color: '#003fb1' },
              { label: 'Active Job Openings', value: stats.totalActiveJobs, color: '#06b6d4' },
              { label: 'Total Hires', value: stats.totalHires, color: '#10b981' },
            ].map((s, i) => (
              <div key={i} style={{ background: '#fff', padding: '20px 24px', borderRadius: '12px', border: '1px solid #e8eaed', borderLeft: `4px solid ${s.color}` }}>
                <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px' }}>{s.label}</p>
                <h3 style={{ fontSize: '28px', fontWeight: 800, color: s.color === '#10b981' ? '#059669' : '#1e293b', margin: 0, fontFamily: 'Manrope' }}>{s.value}</h3>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e8eaed' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', margin: '0 0 20px', fontFamily: 'Manrope' }}>Hiring Funnel</h3>
              {stats.funnelData.length === 0 ? (
                <div style={{ height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>No data available</div>
              ) : (
                <div style={{ height: '280px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.funnelData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                      <XAxis type="number" stroke="#cbd5e1" tick={{ fill: '#64748b', fontSize: 12 }} />
                      <YAxis dataKey="name" type="category" stroke="#cbd5e1" width={80} tick={{ fill: '#64748b', fontSize: 12 }} />
                      <RechartsTooltip contentStyle={{ background: '#fff', border: '1px solid #e8eaed', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                      <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                        {stats.funnelData.map((entry, index) => (
                          <Cell key={index} fill={FUNNEL_COLORS[entry.name] || COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e8eaed' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', margin: '0 0 20px', fontFamily: 'Manrope' }}>Most Popular Roles</h3>
              {stats.popularRolesData.length === 0 ? (
                <div style={{ height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>No data available</div>
              ) : (
                <div style={{ height: '280px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={stats.popularRolesData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="count">
                        {stats.popularRolesData.map((entry, index) => (
                          <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip contentStyle={{ background: '#fff', border: '1px solid #e8eaed', borderRadius: '8px' }} />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default HRAnalytics;
