import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobOpeningAPI, applyToJobAPI, getMyApplicationsAPI } from '../services/api';
import Navbar from '../components/Navbar';
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

  useEffect(() => {
    fetchOpeningAndStatus();
  }, [id]);

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
      
      if (activeApp) {
        setHasApplied(true);
      }
    } catch (error) {
      toast.error('Failed to load opening details');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!selectedFile) {
      toast.error('Please upload your resume to apply');
      return;
    }

    try {
      setApplying(true);
      
      const formData = new FormData();
      formData.append('resume', selectedFile);

      await applyToJobAPI(id, formData);
      toast.success('Application submitted successfully!');
      setHasApplied(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to apply');
    } finally {
      setApplying(false);
    }
  };

  if (loading) return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-content animate-fade-in"><div className="placeholder-section">Loading...</div></div>
    </div>
  );
  
  if (!opening) return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-content animate-fade-in"><div className="placeholder-section">Job Opening not found</div></div>
    </div>
  );

  const skills = opening.customSkills?.length > 0 ? opening.customSkills : opening.role?.defaultSkills || [];

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-content animate-fade-in" style={{ maxWidth: '800px' }}>
        <button 
          onClick={() => navigate('/roles')}
          className="btn-outline"
          style={{ marginBottom: '24px', fontSize: '0.85rem', padding: '8px 16px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', color: 'white', borderRadius: '8px' }}
        >
          ← Back to Roles
        </button>

        <div className="role-card glass" style={{ padding: '40px', borderRadius: '16px' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>{opening.title}</h1>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
            <span className="dept-badge">{opening.role?.department}</span>
            <span className={`status-badge ${opening.status}`}>{opening.status}</span>
            <span className="skill-tag">📄 {opening.jobType || 'full-time'}</span>
          </div>

          <div className="detail-section">
            <h3>About the Role</h3>
            <p>{opening.role?.description}</p>
          </div>

          <div className="detail-section">
            <h3>Required Skills</h3>
            <div className="role-card-tags" style={{ marginTop: '12px' }}>
              {skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>

          <div className="detail-grid" style={{ marginBottom: '40px' }}>
            <div className="detail-item">
              <span className="detail-label">💼 Experience</span>
              <strong>{opening.experienceRequired || 'Not specified'}</strong>
            </div>
            <div className="detail-item">
              <span className="detail-label">🎓 Education</span>
              <strong>{opening.educationRequired || 'Not specified'}</strong>
            </div>
            {opening.location && (
              <div className="detail-item">
                <span className="detail-label">📍 Location</span>
                <strong>{opening.location}</strong>
              </div>
            )}
            <div className="detail-item">
              <span className="detail-label">👥 Applicants</span>
              <strong>{opening.applicantCount || 0}</strong>
            </div>
          </div>

          <div style={{ marginTop: '32px' }}>
            {!hasApplied && opening.status !== 'closed' && (
              <DragDropUpload onFileSelect={setSelectedFile} selectedFile={selectedFile} />
            )}

            {hasApplied ? (
              <div style={{ padding: '16px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)', borderRadius: '12px', color: '#4ade80', textAlign: 'center', fontWeight: 600 }}>
                ✅ You have already applied to this position
              </div>
            ) : opening.status === 'closed' ? (
              <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px', color: '#f87171', textAlign: 'center', fontWeight: 600 }}>
                This position is closed
              </div>
            ) : (
              <button 
                className="btn-primary" 
                style={{ width: '100%', padding: '16px', fontSize: '1.1rem', marginTop: '16px', borderRadius: '12px', border: 'none', background: 'var(--color-primary)', color: 'white', cursor: 'pointer' }}
                onClick={handleApply}
                disabled={applying || !selectedFile}
              >
                {applying ? 'Submitting Application...' : '🚀 Apply Now'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleDetail;
