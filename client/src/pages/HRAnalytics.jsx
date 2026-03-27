import { useState, useEffect } from 'react';
import { getHRSummaryAPI, getReportDataAPI } from '../services/api';
import DashboardLayout from '../components/layouts/DashboardLayout';
import toast from 'react-hot-toast';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';

const COLORS = ['#003fb1', '#10b981', '#f59e0b', '#06b6d4', '#ef4444', '#8b5cf6'];
const SLA_COLORS = ['#10b981', '#f59e0b', '#ef4444'];

const HRAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalApplications: 0, totalActiveJobs: 0, totalHires: 0,
    funnelData: [], popularRolesData: [], applicationsOverTime: [], slaData: [],
    shortlistRate: 0, interviewRate: 0, rejectionRate: 0, offerRate: 0,
    slaCompliance: 100, avgMatchScore: 0, slaBreachedCount: 0
  });
  const [report, setReport] = useState(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => { fetchAnalytics(); }, []);

  const fetchAnalytics = async () => {
    try {
      const { data } = await getHRSummaryAPI();
      setStats(data.data);
    } catch (error) { toast.error('Failed to load analytics data'); }
    finally { setLoading(false); }
  };

  const handleGenerateReport = async () => {
    try {
      setGenerating(true);
      const { data } = await getReportDataAPI();
      setReport(data.report);
      toast.success('Report generated successfully!');
    } catch (error) { toast.error('Failed to generate report'); }
    finally { setGenerating(false); }
  };

  const handleExportPDF = () => {
    if (!report) { toast.error('Generate a report first!'); return; }
    const printWindow = window.open('', '_blank');
    const maxPipeline = Math.max(...report.pipeline.map(p => p.count), 1);
    const maxRole = Math.max(...report.candidatesByRole.map(r => r.count), 1);
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>HireFlow AI - Hiring Analytics Report</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', system-ui, sans-serif; padding: 48px; color: #1e293b; max-width: 800px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 36px; padding-bottom: 24px; border-bottom: 3px solid #003fb1; }
        .header h1 { font-size: 24px; color: #003fb1; margin-bottom: 6px; }
        .header p { font-size: 11px; color: #94a3b8; }
        .section { margin-bottom: 32px; page-break-inside: avoid; }
        .section h2 { font-size: 14px; color: #003fb1; margin-bottom: 14px; padding-bottom: 8px; border-bottom: 2px solid #f1f5f9; text-transform: uppercase; letter-spacing: 0.5px; }
        .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        .metric-card { padding: 14px 10px; border: 1px solid #e8eaed; border-radius: 8px; text-align: center; }
        .metric-card .label { font-size: 9px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; font-weight: 700; }
        .metric-card .value { font-size: 22px; font-weight: 800; color: #1e293b; margin-top: 4px; }
        .bar-table { width: 100%; border-collapse: collapse; }
        .bar-table td { padding: 6px 0; vertical-align: middle; }
        .bar-table .td-label { width: 140px; font-size: 12px; color: #475569; font-weight: 500; }
        .bar-table .td-bar { padding: 6px 12px; }
        .bar-table .td-count { width: 50px; font-size: 13px; font-weight: 800; color: #1e293b; text-align: right; }
        .bar-fill { height: 18px; border-radius: 4px; min-width: 4px; }
        .list { margin: 0; padding-left: 20px; }
        .list li { font-size: 12px; line-height: 2; color: #475569; }
        .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .two-col h3 { font-size: 12px; font-weight: 700; margin-bottom: 8px; }
        .footer { text-align: center; margin-top: 48px; padding-top: 16px; border-top: 2px solid #f1f5f9; font-size: 10px; color: #94a3b8; }
        @media print { body { padding: 24px; } .section { page-break-inside: avoid; } }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>⚡ HireFlow AI — Hiring Analytics Report</h1>
        <p>Generated on ${new Date(report.generatedAt).toLocaleString()} by ${report.generatedBy}</p>
      </div>

      <div class="section">
        <h2>📊 Key Metrics</h2>
        <div class="metrics-grid">
          <div class="metric-card"><div class="label">Total Applicants</div><div class="value">${report.metrics.totalApplicants}</div></div>
          <div class="metric-card"><div class="label">Shortlisted</div><div class="value">${report.metrics.shortlisted}</div></div>
          <div class="metric-card"><div class="label">Interviews</div><div class="value">${report.metrics.interviews}</div></div>
          <div class="metric-card"><div class="label">Offers</div><div class="value">${report.metrics.offers}</div></div>
          <div class="metric-card"><div class="label">Rejections</div><div class="value">${report.metrics.rejections}</div></div>
          <div class="metric-card"><div class="label">SLA Breaches</div><div class="value">${report.metrics.slaBreaches}</div></div>
          <div class="metric-card"><div class="label">Avg Match Score</div><div class="value">${report.metrics.avgMatchScore}%</div></div>
          <div class="metric-card"><div class="label">SLA Compliance</div><div class="value">${report.metrics.slaCompliance}%</div></div>
        </div>
      </div>

      <div class="section">
        <h2>📈 Conversion Rates</h2>
        <div class="metrics-grid">
          <div class="metric-card"><div class="label">Shortlist Rate</div><div class="value">${report.metrics.shortlistRate}%</div></div>
          <div class="metric-card"><div class="label">Offer Rate</div><div class="value">${report.metrics.offerRate}%</div></div>
          <div class="metric-card"><div class="label">Rejection Rate</div><div class="value">${report.metrics.rejectionRate}%</div></div>
          <div class="metric-card"><div class="label">SLA Compliance</div><div class="value">${report.metrics.slaCompliance}%</div></div>
        </div>
      </div>

      <div class="section">
        <h2>🔄 Hiring Pipeline</h2>
        <table class="bar-table">
          ${report.pipeline.map(p => {
            const pct = Math.max((p.count / maxPipeline) * 100, 2);
            const color = p.stage === 'Rejected' ? '#ef4444' : p.stage === 'Interview' ? '#06b6d4' : p.stage === 'Shortlisted' ? '#10b981' : p.stage === 'Offered' ? '#22c55e' : '#003fb1';
            return `<tr>
              <td class="td-label">${p.stage}</td>
              <td class="td-bar"><div class="bar-fill" style="width:${pct}%; background:${color};"></div></td>
              <td class="td-count">${p.count}</td>
            </tr>`;
          }).join('')}
        </table>
      </div>

      <div class="section">
        <h2>👥 Candidates by Role</h2>
        <table class="bar-table">
          ${report.candidatesByRole.map(r => {
            const pct = Math.max((r.count / maxRole) * 100, 2);
            return `<tr>
              <td class="td-label">${r.name}</td>
              <td class="td-bar"><div class="bar-fill" style="width:${pct}%; background:#06b6d4;"></div></td>
              <td class="td-count">${r.count}</td>
            </tr>`;
          }).join('')}
        </table>
      </div>

      <div class="section">
        <div class="two-col">
          <div>
            <h3 style="color: #ef4444;">⚠️ Bottlenecks</h3>
            <ul class="list">
              ${report.bottlenecks.map(b => `<li>${b}</li>`).join('')}
              ${report.bottlenecks.length === 0 ? '<li style="color:#10b981">No bottlenecks detected. Pipeline is healthy!</li>' : ''}
            </ul>
          </div>
          <div>
            <h3 style="color: #003fb1;">💡 AI Recommendations</h3>
            <ul class="list">
              ${report.recommendations.map(r => `<li>${r}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>

      <div class="footer">
        HireFlow AI • Automated Hiring Analytics Report • Confidential
      </div>
    </body>
    </html>`;
    printWindow.document.write(html);
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); }, 400);
  };

  const cardStyle = {
    background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed', padding: '24px'
  };

  return (
    <DashboardLayout>
      <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#1e293b', margin: 0, fontFamily: 'Manrope' }}>
            Reports & <span style={{ color: '#003fb1' }}>Analytics</span>
          </h2>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>Key metrics, hiring funnel insights, and exportable reports</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleGenerateReport} disabled={generating} style={{
            padding: '10px 20px', borderRadius: '10px', border: '1px solid #e8eaed',
            background: '#fff', color: '#003fb1', fontSize: '13px', fontWeight: 700,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>summarize</span>
            {generating ? 'Generating...' : 'Generate Report'}
          </button>
          <button onClick={handleExportPDF} style={{
            padding: '10px 20px', borderRadius: '10px', border: 'none',
            background: 'var(--gradient-primary)', color: '#fff', fontSize: '13px', fontWeight: 700,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
            boxShadow: '0 2px 8px rgba(0,63,177,0.25)', opacity: report ? 1 : 0.5
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>picture_as_pdf</span>
            Export as PDF
          </button>
        </div>
      </div>

      {loading ? (
        <p style={{ color: '#94a3b8' }}>Loading analytics...</p>
      ) : (
        <>
          {/* Top Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
            {[
              { label: 'Total Applications', value: stats.totalApplications, color: '#003fb1' },
              { label: 'Active Openings', value: stats.totalActiveJobs, color: '#06b6d4' },
              { label: 'Total Hires', value: stats.totalHires, color: '#10b981' },
              { label: 'SLA Compliance', value: `${stats.slaCompliance}%`, color: stats.slaCompliance >= 80 ? '#10b981' : '#ef4444' },
            ].map((s, i) => (
              <div key={i} style={{
                background: '#fff', padding: '20px 24px', borderRadius: '12px',
                border: '1px solid #e8eaed', borderLeft: `4px solid ${s.color}`
              }}>
                <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px' }}>{s.label}</p>
                <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#1e293b', margin: 0, fontFamily: 'Manrope' }}>{s.value}</h3>
              </div>
            ))}
          </div>

          {/* Rate Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '24px' }}>
            {[
              { label: 'Shortlist Rate', value: `${stats.shortlistRate}%`, color: '#10b981' },
              { label: 'Interview Rate', value: `${stats.interviewRate}%`, color: '#06b6d4' },
              { label: 'Offer Rate', value: `${stats.offerRate}%`, color: '#22c55e' },
              { label: 'Rejection Rate', value: `${stats.rejectionRate}%`, color: '#ef4444' },
              { label: 'Avg Match Score', value: `${stats.avgMatchScore}%`, color: '#8b5cf6' },
            ].map((s, i) => (
              <div key={i} style={{
                background: '#fff', padding: '16px 20px', borderRadius: '12px',
                border: '1px solid #e8eaed', textAlign: 'center'
              }}>
                <p style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 6px' }}>{s.label}</p>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: s.color, margin: 0 }}>{s.value}</h3>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
            {/* Applications Over Time */}
            <div style={cardStyle}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', margin: '0 0 20px', fontFamily: 'Manrope' }}>📈 Applications Over Time</h3>
              <div style={{ height: '280px' }}>
                {(stats.applicationsOverTime || []).length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stats.applicationsOverTime}>
                      <defs>
                        <linearGradient id="reportApps" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#003fb1" stopOpacity={0.15} />
                          <stop offset="95%" stopColor="#003fb1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                      <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} allowDecimals={false} />
                      <Tooltip />
                      <Area type="monotone" dataKey="count" stroke="#003fb1" strokeWidth={2} fillOpacity={1} fill="url(#reportApps)" />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>No data</div>}
              </div>
            </div>

            {/* Funnel */}
            <div style={cardStyle}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', margin: '0 0 20px', fontFamily: 'Manrope' }}>📊 Hiring Funnel</h3>
              <div style={{ height: '280px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.funnelData || []} layout="vertical" margin={{ left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                    <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} allowDecimals={false} />
                    <YAxis dataKey="name" type="category" width={85} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                      {(stats.funnelData || []).map((e, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* SLA Pie */}
            <div style={cardStyle}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', margin: '0 0 20px', fontFamily: 'Manrope' }}>🔴 SLA Compliance</h3>
              <div style={{ height: '280px' }}>
                {(stats.slaData || []).some(d => d.value > 0) ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={(stats.slaData || []).filter(d => d.value > 0)} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                        {(stats.slaData || []).filter(d => d.value > 0).map((e, i) => {
                          const colorMap = { 'On Time': '#10b981', 'Warning': '#f59e0b', 'Breached': '#ef4444' };
                          return <Cell key={i} fill={colorMap[e.name] || SLA_COLORS[i]} />;
                        })}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>No SLA data</div>}
              </div>
            </div>

            {/* Popular Roles */}
            <div style={cardStyle}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', margin: '0 0 20px', fontFamily: 'Manrope' }}>👥 Candidates by Role</h3>
              <div style={{ height: '280px' }}>
                {(stats.popularRolesData || []).length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.popularRolesData} margin={{ left: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 10 }} angle={-15} />
                      <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                        {(stats.popularRolesData || []).map((e, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>No role data</div>}
              </div>
            </div>
          </div>

          {/* Generated Report Preview */}
          {report && (
            <div style={{ ...cardStyle, marginTop: '8px', borderLeft: '4px solid #003fb1' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', margin: 0, fontFamily: 'Manrope' }}>
                    📋 Generated Report Preview
                  </h3>
                  <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0' }}>
                    Generated on {new Date(report.generatedAt).toLocaleString()} by {report.generatedBy}
                  </p>
                </div>
                <button onClick={handleExportPDF} style={{
                  padding: '8px 16px', borderRadius: '8px', border: 'none',
                  background: 'var(--gradient-primary)', color: '#fff', fontSize: '12px', fontWeight: 700,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>download</span>
                  Download PDF
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* Bottlenecks */}
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#ef4444', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>warning</span> Bottlenecks
                  </h4>
                  {report.bottlenecks.length > 0 ? (
                    <ul style={{ margin: 0, paddingLeft: '16px' }}>
                      {report.bottlenecks.map((b, i) => (
                        <li key={i} style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>{b}</li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ fontSize: '13px', color: '#10b981', fontWeight: 600 }}>✓ No bottlenecks detected!</p>
                  )}
                </div>

                {/* Recommendations */}
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#003fb1', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>lightbulb</span> AI Recommendations
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '16px' }}>
                    {report.recommendations.map((r, i) => (
                      <li key={i} style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </DashboardLayout>
  );
};

export default HRAnalytics;
