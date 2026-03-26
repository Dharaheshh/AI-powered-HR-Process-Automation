import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getRolesAPI, createJobOpeningAPI } from '../services/api';
import DashboardLayout from '../components/layouts/DashboardLayout';

const OpenRole = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    role: '', title: '', customSkills: '', experienceRequired: '',
    educationRequired: '', location: '', jobType: 'full-time', strategicDescription: '',
  });
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try { const res = await getRolesAPI(); setRoles(res.data.roles); }
      catch { toast.error('Failed to load roles'); }
      finally { setLoading(false); }
    })();
  }, []);

  const handleRoleSelect = (e) => {
    const roleId = e.target.value;
    const role = roles.find(r => r._id === roleId);
    setSelectedRole(role);
    setFormData({ ...formData, role: roleId, title: role ? `${role.name} Hiring` : '',
      customSkills: role ? role.defaultSkills.join(', ') : '',
      experienceRequired: role ? role.defaultExperience : '',
      educationRequired: role ? role.defaultEducation : '' });
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.role) { toast.error('Please select a role'); return; }
    setIsSubmitting(true);
    try {
      await createJobOpeningAPI({ ...formData, customSkills: formData.customSkills.split(',').map(s => s.trim()).filter(Boolean) });
      toast.success('Benchmark published successfully!');
      navigate('/my-openings');
    } catch (error) { toast.error(error.response?.data?.message || 'Failed to create'); }
    finally { setIsSubmitting(false); }
  };

  const inputStyle = { width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', outline: 'none', background: '#fff', color: '#1e293b', fontFamily: 'Inter', boxSizing: 'border-box' };
  const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' };

  const skills = formData.customSkills ? formData.customSkills.split(',').map(s => s.trim()).filter(Boolean) : [];

  // Mock AI weights for the Intelligence Engine
  const aiWeights = [
    { label: 'Portfolio Quality', value: 40, color: '#003fb1' },
    { label: 'Skill Relevance', value: 30, color: '#06b6d4' },
    { label: 'Industry Context', value: 20, color: '#10b981' },
    { label: 'Culture Add', value: 10, color: '#f59e0b' },
  ];

  const evalCriteria = [
    { icon: 'bolt', title: 'Visual Communication', desc: 'UI composition & visual hierarchy, branding, and creative confidence.', priority: 'high' },
    { icon: 'code', title: 'Technical Stack', desc: 'Work across specific software proficiency (Figma, Framer, Adobe CC).', priority: 'standard' },
    { icon: 'psychology', title: 'Product Thinking', desc: 'Structured problem-solving approach through case study analysis.', priority: 'high' },
  ];

  return (
    <DashboardLayout>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
        <span style={{ fontSize: '12px', color: '#003fb1', fontWeight: 600 }}>Define Benchmarks</span>
        <span style={{ fontSize: '12px', color: '#cbd5e1' }}>›</span>
        <span style={{ fontSize: '12px', color: '#94a3b8' }}>New Draft Role</span>
      </div>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <p style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 4px' }}>Benchmark Configuration</p>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', margin: 0, fontFamily: 'Manrope' }}>
            {selectedRole ? selectedRole.name : 'Select a Role'}
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
            Set the gold standard for this role. HireFlow AI will use these parameters to score and rank applicants automatically.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ padding: '8px 20px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff', fontSize: '13px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>Save as Template</button>
          <button onClick={handleSubmit} disabled={isSubmitting} style={{
            padding: '8px 20px', border: 'none', borderRadius: '8px', background: '#003fb1', fontSize: '13px',
            fontWeight: 600, color: '#fff', cursor: 'pointer', opacity: isSubmitting ? 0.6 : 1
          }}>{isSubmitting ? 'Publishing...' : 'Update Benchmark'}</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
        {/* Left Column - Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Role Fundamentals */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#003fb1' }}>school</span>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', margin: 0, fontFamily: 'Manrope' }}>Role Fundamentals</h3>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Internal Job Title</label>
                  <select name="role" style={inputStyle} value={formData.role} onChange={handleRoleSelect} required>
                    <option value="">Select a role...</option>
                    {roles.map(role => <option key={role._id} value={role._id}>{role.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Department</label>
                  <input type="text" style={inputStyle} value={selectedRole?.department || ''} readOnly placeholder="Auto-filled" />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Strategic Role Description</label>
                <textarea name="strategicDescription" style={{ ...inputStyle, height: '80px', resize: 'vertical' }}
                  placeholder="Explain the primary business impact of this role..."
                  value={formData.strategicDescription} onChange={handleChange} />
              </div>

              <div>
                <label style={labelStyle}>Opening Title</label>
                <input type="text" name="title" style={inputStyle} placeholder="e.g. Senior Product Designer Hiring"
                  value={formData.title} onChange={handleChange} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Location</label>
                  <input type="text" name="location" style={inputStyle} placeholder="e.g. Bangalore / Remote"
                    value={formData.location} onChange={handleChange} />
                </div>
                <div>
                  <label style={labelStyle}>Job Type</label>
                  <select name="jobType" style={inputStyle} value={formData.jobType} onChange={handleChange}>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="internship">Internship</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>
              </div>
            </form>
          </div>

          {/* Skill Benchmarking */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#003fb1' }}>tune</span>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', margin: 0, fontFamily: 'Manrope' }}>Skill Benchmarking</h3>
              </div>
              <span style={{ fontSize: '12px', color: '#003fb1', fontWeight: 600, cursor: 'pointer' }}>+ Add Skill</span>
            </div>

            <label style={labelStyle}>Required Skills (Inventory)</label>
            <input type="text" name="customSkills" style={inputStyle} placeholder="React, Node.js, MongoDB, ..."
              value={formData.customSkills} onChange={handleChange} />
            {skills.length > 0 && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
                {skills.map((skill, i) => (
                  <span key={i} style={{
                    padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 500,
                    background: '#eff4ff', color: '#003fb1', border: '1px solid #dbe1ff',
                    display: 'flex', alignItems: 'center', gap: '6px',
                  }}>{skill} <span style={{ cursor: 'pointer', opacity: 0.5 }}>×</span></span>
                ))}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
              <div>
                <label style={labelStyle}>Min. Experience</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="text" name="experienceRequired" style={{ ...inputStyle, width: '80px' }}
                    value={formData.experienceRequired} onChange={handleChange} placeholder="0" />
                  <span style={{ fontSize: '13px', color: '#94a3b8' }}>Years</span>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Qualification Level</label>
                <select name="educationRequired" style={inputStyle} value={formData.educationRequired} onChange={handleChange}>
                  <option value="">Select...</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor's Degree">Bachelor's Degree or Equivalent</option>
                  <option value="Master's Degree">Master's Degree</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>
            </div>
          </div>

          {/* Evaluation Criteria */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#003fb1' }}>checklist</span>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', margin: 0, fontFamily: 'Manrope' }}>Evaluation Criteria</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {evalCriteria.map((c, i) => (
                <div key={i} style={{ background: '#f8fafc', borderRadius: '10px', padding: '16px', border: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#003fb1' }}>{c.icon}</span>
                    <span style={{
                      padding: '3px 10px', borderRadius: '12px', fontSize: '10px', fontWeight: 700,
                      textTransform: 'uppercase',
                      background: c.priority === 'high' ? '#fef2f2' : '#f8fafc',
                      color: c.priority === 'high' ? '#dc2626' : '#64748b',
                      border: `1px solid ${c.priority === 'high' ? '#fecaca' : '#e2e8f0'}`,
                    }}>{c.priority} priority</span>
                  </div>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', margin: '0 0 4px' }}>{c.title}</h4>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div style={{
            background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed', padding: '16px 24px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#64748b' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>info</span>
              All fields save automatically as training requirements.
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={{ padding: '10px 20px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff', fontSize: '13px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>Discard Draft</button>
              <button onClick={handleSubmit} disabled={isSubmitting} style={{
                padding: '10px 24px', border: 'none', borderRadius: '8px', background: '#003fb1',
                fontSize: '13px', fontWeight: 700, color: '#fff', cursor: 'pointer', opacity: isSubmitting ? 0.6 : 1
              }}>🚀 Publish Benchmark</button>
            </div>
          </div>
        </div>

        {/* Right Column - AI Intelligence Engine */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* AI Intelligence Engine */}
          <div style={{ background: 'linear-gradient(135deg, #003fb1, #1a56db)', borderRadius: '12px', padding: '20px', color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <h4 style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>AI Intelligence Engine</h4>
            </div>
            <p style={{ fontSize: '12px', opacity: 0.8, lineHeight: 1.5, margin: '0 0 20px' }}>
              Define how the AI prioritizes candidates. These weightings determine the final HireFlow Score.
            </p>
            {aiWeights.map((w, i) => (
              <div key={i} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{w.label}</span>
                  <span style={{ fontSize: '12px', fontWeight: 700 }}>{w.value}%</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.15)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${w.value}%`, height: '100%', background: 'rgba(255,255,255,0.8)', borderRadius: '3px' }}></div>
                </div>
              </div>
            ))}
            <button style={{
              width: '100%', margin: '12px 0 0', padding: '10px', background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: '#fff',
              fontSize: '12px', fontWeight: 600, cursor: 'pointer',
            }}>Calibrate Weights</button>
          </div>

          {/* Benchmark Preview */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed', padding: '20px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 14px' }}>Benchmark Preview</p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: '#ecfdf5', borderRadius: '8px', marginBottom: '10px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
              <div>
                <p style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', margin: 0 }}>Automation Filtering</p>
                <p style={{ fontSize: '10px', color: '#64748b', margin: '2px 0 0' }}>Only top 15% entries will be sent for review.</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: '#fef2f2', borderRadius: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></div>
              <div>
                <p style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', margin: 0 }}>SLA Breach Alerting</p>
                <p style={{ fontSize: '10px', color: '#64748b', margin: '2px 0 0' }}>Alert if 48h pass without screening first 50+ applications.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OpenRole;
