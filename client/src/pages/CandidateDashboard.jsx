import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { getMyApplicationsAPI, getMyRecommendationsAPI, getJobOpeningsAPI, analyzeResumeAPI } from '../services/api';
import DragDropUpload from '../components/DragDropUpload';
import toast from 'react-hot-toast';

const CandidateDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: '—', inReview: '—', interviews: '—', avgScore: '—' });
  const [recommendations, setRecommendations] = useState([]);
  
  // AI Coach States
  const [openings, setOpenings] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => { fetchStats(); }, []);

  const fetchStats = async () => {
    try {
      const [appRes, recRes, jobsRes] = await Promise.all([
        getMyApplicationsAPI(),
        getMyRecommendationsAPI().catch(() => ({ data: { recommendations: [] } })),
        getJobOpeningsAPI().catch(() => ({ data: { jobOpenings: [] } }))
      ]);
      const apps = appRes.data.applications || [];
      const total = apps.length;
      const inReview = apps.filter(app => app.status === 'applied' || app.status === 'shortlisted').length;
      const interviews = apps.filter(app => app.status === 'interview').length;
      const scoredApps = apps.filter(app => app.matchScore !== undefined && app.matchScore !== null);
      const avgScore = scoredApps.length > 0
        ? Math.round(scoredApps.reduce((sum, app) => sum + app.matchScore, 0) / scoredApps.length) + '%'
        : 'N/A';
      setStats({ total, inReview, interviews, avgScore });
      setRecommendations(recRes.data.recommendations || []);
      
      const activeJobs = (jobsRes.data.jobOpenings || []).filter(j => j.status === 'open');
      setOpenings(activeJobs);
      if (activeJobs.length > 0) setSelectedJobId(activeJobs[0]._id);

    } catch (error) { console.error("Failed to fetch dashboard stats", error); }
  };

  const handleAnalyze = async () => {
    if (!resumeFile) return toast.error('Please upload a resume first');
    if (!selectedJobId) return toast.error('Please select a role to evaluate against');
    
    try {
      setAnalyzing(true);
      setAnalysis(null);
      const formData = new FormData();
      formData.append('resume', resumeFile);
      formData.append('jobOpeningId', selectedJobId);
      
      const res = await analyzeResumeAPI(formData);
      setAnalysis(res.data.analysis);
      toast.success('Analysis complete!');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to analyze resume. Make sure local Ollama is running.');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleLogout = () => { logout(); navigate('/login/candidate'); };

  const statCards = [
    { label: 'Applications Submitted', value: stats.total, icon: '📝', color: '#003fb1' },
    { label: 'Under Review', value: stats.inReview, icon: '🔍', color: '#06b6d4' },
    { label: 'Interviews Scheduled', value: stats.interviews, icon: '📅', color: '#10b981' },
    { label: 'Average Match Score', value: stats.avgScore, icon: '⭐', color: '#f59e0b' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fb', fontFamily: 'Inter, sans-serif' }}>
      {/* Top Bar */}
      <header style={{
        background: '#fff', padding: '12px 32px', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', borderBottom: '1px solid #e8eaed', position: 'sticky', top: 0, zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: '#003fb1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>bolt</span>
          </div>
          <span style={{ fontSize: '16px', fontWeight: 800, color: '#1e293b', fontFamily: 'Manrope' }}>HireFlow AI</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/roles" style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', textDecoration: 'none' }}>Browse Roles</Link>
          <Link to="/my-applications" style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', textDecoration: 'none' }}>My Applications</Link>
          <div style={{
            width: '34px', height: '34px', borderRadius: '50%', background: '#003fb1',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: '13px', border: '2px solid #dbe1ff',
          }}>{user?.name?.charAt(0).toUpperCase() || 'C'}</div>
          <button onClick={handleLogout} style={{
            padding: '6px 14px', background: 'transparent', border: '1px solid #e2e8f0',
            borderRadius: '8px', cursor: 'pointer', fontSize: '12px', color: '#ef4444', fontWeight: 600,
          }}>Log Out</button>
        </div>
      </header>

      {/* Content */}
      <main style={{ padding: '32px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#1e293b', margin: '0 0 6px', fontFamily: 'Manrope' }}>
            Welcome, <span style={{ color: '#003fb1' }}>{user?.name}</span> 👋
          </h1>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>Track your job applications and interviews here.</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
          {statCards.map((s, i) => (
            <div key={i} style={{
              background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e8eaed',
              borderLeft: `4px solid ${s.color}`,
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{s.icon}</div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', margin: '0 0 4px', fontFamily: 'Manrope' }}>{s.value}</h3>
              <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600, margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* AI ROLE RECOMMENDATION */}
        {recommendations.length > 0 && recommendations.map(rec => (
          <div key={rec._id} style={{
            background: 'linear-gradient(to right, #eff6ff, #dbeafe)',
            border: '1px solid #bfdbfe', borderRadius: '16px', padding: '24px',
            marginBottom: '28px', display: 'flex', gap: '20px', alignItems: 'flex-start',
            boxShadow: '0 4px 12px rgba(37,99,235,0.08)'
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#2563eb', background: '#fff', padding: '12px', borderRadius: '50%', boxShadow: '0 2px 4px rgba(37,99,235,0.1)' }}>
              auto_awesome
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#1e3a8a', fontFamily: 'Manrope, sans-serif' }}>
                  Smart Role Match: {rec.recommendedJobOpening?.role?.name}
                </h3>
                <span style={{ background: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, border: '1px solid #bbf7d0' }}>
                  {rec.recommendedMatchScore}% Match
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: '#1e40af', lineHeight: '1.5', maxWidth: '800px' }}>
                {rec.reason} Instead of {rec.appliedRole?.name}, you are a stronger fit for {rec.recommendedJobOpening?.role?.name}. Wait for the HR team to formally invite you to transfer to this pipeline.
              </p>
            </div>
          </div>
        ))}

        {/* Quick Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
          <Link to="/roles" style={{
            background: '#fff', padding: '28px', borderRadius: '12px', border: '1px solid #e8eaed',
            textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '16px',
            transition: 'box-shadow 0.15s',
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff4ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ color: '#003fb1', fontSize: '24px' }}>search</span>
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', margin: '0 0 4px', fontFamily: 'Manrope' }}>Browse Roles</h3>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Find open positions and apply</p>
            </div>
          </Link>
          <Link to="/my-applications" style={{
            background: '#fff', padding: '28px', borderRadius: '12px', border: '1px solid #e8eaed',
            textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '16px',
            transition: 'box-shadow 0.15s',
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ color: '#059669', fontSize: '24px' }}>description</span>
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', margin: '0 0 4px', fontFamily: 'Manrope' }}>My Applications</h3>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Track your application status</p>
            </div>
          </Link>
        </div>

        {/* AI RESUME COACH */}
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e8eaed', padding: '32px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ color: '#fff' }}>psychology</span>
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#1e293b', margin: '0 0 4px', fontFamily: 'Manrope' }}>AI Resume Coach</h2>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Get instant, private feedback on your resume before you apply. Works completely offline.</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Input Side */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'end' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Target Role</label>
                <select 
                  value={selectedJobId} 
                  onChange={(e) => setSelectedJobId(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', background: '#f8fafc' }}
                >
                  {openings.map(op => <option key={op._id} value={op._id}>{op.title} - {op.role?.department}</option>)}
                </select>
              </div>
              
              <div style={{ flex: 1 }}>
                <DragDropUpload selectedFile={resumeFile} onFileSelect={setResumeFile} />
              </div>

              <button 
                onClick={handleAnalyze} 
                disabled={analyzing || !resumeFile}
                style={{
                  padding: '14px', borderRadius: '8px', background: analyzing ? '#94a3b8' : '#8b5cf6', 
                  color: '#fff', border: 'none', fontWeight: 700, fontSize: '15px', cursor: analyzing ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s'
                }}
              >
                {analyzing ? (
                  <><span className="material-symbols-outlined" style={{ animation: 'spin 2s linear infinite' }}>autorenew</span> Analyzing Context...</>
                ) : (
                  <><span className="material-symbols-outlined">analytics</span> Generate Feedback</>
                )}
              </button>
            </div>

            {/* Results Side */}
            <div style={{ background: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1', padding: analysis ? '0' : '32px', display: 'flex', alignItems: analysis ? 'stretch' : 'center', justifyContent: 'center', minHeight: analysis ? 'auto' : '120px' }}>
              {!analysis && !analyzing && (
                <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '48px', opacity: 0.5, marginBottom: '16px' }}>document_scanner</span>
                  <p style={{ margin: 0, fontSize: '14px', maxWidth: '280px' }}>Upload your resume and select a role to see what our AI thinks of your match potential.</p>
                </div>
              )}
              
              {analyzing && (
                <div style={{ textAlign: 'center', color: '#8b5cf6' }}>
                  <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ padding: '12px', background: '#eef2ff', borderRadius: '50%', color: '#6366f1' }}>
                      <span className="material-symbols-outlined" style={{ animation: 'pulse 1.5s infinite', fontSize: '32px' }}>psychology</span>
                    </div>
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 8px' }}>Reading Resume & Evaluating Match</h3>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>Running deeply through your local Ollama LLM...</p>
                </div>
              )}

              {analysis && (
                <div style={{ padding: '24px', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#1e293b' }}>Analysis Results</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: analysis.score >= 70 ? '#dcfce7' : '#fef3c7', color: analysis.score >= 70 ? '#166534' : '#92400e', padding: '6px 12px', borderRadius: '20px', fontWeight: 800 }}>
                      ⭐ {analysis.score}% Match Score
                    </div>
                  </div>

                  {/* Pros & Cons */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    {/* Strengths */}
                    <div style={{ background: '#ecfdf5', padding: '16px', borderRadius: '8px', border: '1px solid #d1fae5' }}>
                      <h4 style={{ margin: '0 0 12px', fontSize: '14px', color: '#065f46', display: 'flex', alignItems: 'center', gap: '6px' }}><span className="material-symbols-outlined" style={{ fontSize: '18px' }}>thumb_up</span> Strengths</h4>
                      <ul style={{ margin: 0, paddingLeft: '20px', color: '#047857', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {(analysis.pros || []).map((p, i) => <li key={i}>{p}</li>)}
                        {(!analysis.pros || analysis.pros.length === 0) && <li>No major strengths identified</li>}
                      </ul>
                    </div>
                    {/* Weaknesses */}
                    <div style={{ background: '#fef2f2', padding: '16px', borderRadius: '8px', border: '1px solid #fecaca' }}>
                      <h4 style={{ margin: '0 0 12px', fontSize: '14px', color: '#991b1b', display: 'flex', alignItems: 'center', gap: '6px' }}><span className="material-symbols-outlined" style={{ fontSize: '18px' }}>thumb_down</span> Skill Gaps</h4>
                      <ul style={{ margin: 0, paddingLeft: '20px', color: '#b91c1c', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {(analysis.cons || []).map((c, i) => <li key={i}>{c}</li>)}
                        {(!analysis.cons || analysis.cons.length === 0) && <li>No glaring weaknesses</li>}
                      </ul>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                    
                    <div style={{ padding: '16px', borderBottom: '1px solid #e2e8f0' }}>
                      <h4 style={{ margin: '0 0 12px', fontSize: '14px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#3b82f6' }}>add_circle</span> What to Add/Enhance
                      </h4>
                      <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {(analysis.changes || []).map((ch, i) => <li key={i}>{ch}</li>)}
                      </ul>
                    </div>

                    <div style={{ padding: '16px', background: '#f8fafc' }}>
                      <h4 style={{ margin: '0 0 12px', fontSize: '14px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#f59e0b' }}>remove_circle</span> What to Trim/Remove
                      </h4>
                      <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {(analysis.remove || []).map((r, i) => <li key={i}>{r}</li>)}
                      </ul>
                    </div>

                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CandidateDashboard;
