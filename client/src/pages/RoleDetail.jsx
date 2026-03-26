import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getJobOpeningAPI, applyToJobAPI, getMyApplicationsAPI } from '../services/api';
import DragDropUpload from '../components/DragDropUpload';
import toast from 'react-hot-toast';

const RoleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [opening, setOpening] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => { fetchOpeningAndStatus(); }, [id]);

  const fetchOpeningAndStatus = async () => {
    try {
      const { data } = await getJobOpeningAPI(id);
      setOpening(data.jobOpening);
      const statusRes = await getMyApplicationsAPI();
      const applications = statusRes.data.applications || [];
      const activeApp = applications.find(app => {
        const appId = app.jobOpening && app.jobOpening._id ? app.jobOpening._id : app.jobOpening;
        return appId === data.jobOpening._id && app.status !== 'rejected';
      });
      if (activeApp) setHasApplied(true);
    } catch (error) { toast.error('Failed to load opening details'); }
    finally { setLoading(false); }
  };

  const handleApply = async () => {
    if (!selectedFile) { toast.error('Please upload your resume to apply'); return; }
    try {
      setApplying(true);
      const formData = new FormData();
      formData.append('resume', selectedFile);
      await applyToJobAPI(id, formData);
      toast.success('Application submitted successfully!');
      setHasApplied(true);
    } catch (error) { toast.error(error.response?.data?.message || 'Failed to apply'); }
    finally { setApplying(false); }
  };

  const loadingView = (msg) => (
    <div style={{ minHeight: '100vh', background: '#f8f9fb', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#94a3b8', fontSize: '16px' }}>{msg}</p>
    </div>
  );

  if (loading) return loadingView('Loading...');
  if (!opening) return loadingView('Job opening not found');

  const skills = opening.customSkills?.length > 0 ? opening.customSkills : opening.role?.defaultSkills || [];
  const infoItems = [
    { icon: '💼', label: 'Experience', value: opening.experienceRequired || 'Not specified' },
    { icon: '🎓', label: 'Education', value: opening.educationRequired || 'Not specified' },
    opening.location ? { icon: '📍', label: 'Location', value: opening.location } : null,
    { icon: '👥', label: 'Applicants', value: opening.applicantCount || 0 },
  ].filter(Boolean);

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fb', fontFamily: 'Inter, sans-serif' }}>
      {/* Top Bar */}
      <header style={{ background: '#fff', padding: '12px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e8eaed', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: '#003fb1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>bolt</span>
          </div>
          <span style={{ fontSize: '16px', fontWeight: 800, color: '#1e293b', fontFamily: 'Manrope' }}>HireFlow AI</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/candidate/dashboard" style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', textDecoration: 'none' }}>Dashboard</Link>
          <Link to="/roles" style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', textDecoration: 'none' }}>Browse Roles</Link>
        </div>
      </header>

      <main style={{ padding: '32px', maxWidth: '760px', margin: '0 auto' }}>
        <button onClick={() => navigate('/roles')} style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px',
          background: 'transparent', border: '1px solid #e2e8f0', borderRadius: '8px',
          cursor: 'pointer', fontSize: '13px', color: '#64748b', fontWeight: 600,
          marginBottom: '24px', fontFamily: 'Inter',
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_back</span> Back to Roles
        </button>

        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed', padding: '36px' }}>
          {/* Title */}
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', margin: '0 0 12px', fontFamily: 'Manrope' }}>{opening.title}</h1>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, background: '#eff4ff', color: '#003fb1' }}>{opening.role?.department}</span>
            <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, background: opening.status === 'open' ? '#ecfdf5' : '#fef2f2', color: opening.status === 'open' ? '#059669' : '#dc2626' }}>{opening.status}</span>
            <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, background: '#f8fafc', color: '#475569', border: '1px solid #f1f5f9' }}>📄 {opening.jobType || 'full-time'}</span>
          </div>

          {/* About */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', margin: '0 0 8px' }}>About the Role</h3>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7, margin: 0 }}>{opening.role?.description}</p>
          </div>

          {/* Skills */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', margin: '0 0 10px' }}>Required Skills</h3>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {skills.map((skill, i) => (
                <span key={i} style={{ fontSize: '12px', padding: '5px 12px', borderRadius: '20px', background: '#eff4ff', color: '#003fb1', fontWeight: 500 }}>{skill}</span>
              ))}
            </div>
          </div>

          {/* Info Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '32px' }}>
            {infoItems.map((item, i) => (
              <div key={i} style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                <p style={{ fontSize: '11px', color: '#94a3b8', margin: '0 0 4px' }}>{item.icon} {item.label}</p>
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', margin: 0 }}>{item.value}</p>
              </div>
            ))}
          </div>

          {/* Apply Section */}
          <div>
            {!hasApplied && opening.status !== 'closed' && (
              <DragDropUpload onFileSelect={setSelectedFile} selectedFile={selectedFile} />
            )}

            {hasApplied ? (
              <div style={{ padding: '16px', background: '#ecfdf5', border: '1px solid #d1fae5', borderRadius: '10px', color: '#059669', textAlign: 'center', fontWeight: 600, fontSize: '14px' }}>
                ✅ You have already applied to this position
              </div>
            ) : opening.status === 'closed' ? (
              <div style={{ padding: '16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', color: '#dc2626', textAlign: 'center', fontWeight: 600, fontSize: '14px' }}>
                This position is closed
              </div>
            ) : (
              <button onClick={handleApply} disabled={applying || !selectedFile} style={{
                width: '100%', padding: '14px', background: '#003fb1', color: '#fff', border: 'none',
                borderRadius: '10px', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
                opacity: (applying || !selectedFile) ? 0.5 : 1, fontFamily: 'Inter', marginTop: '16px',
              }}>
                {applying ? 'Submitting Application...' : '🚀 Apply Now'}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RoleDetail;
