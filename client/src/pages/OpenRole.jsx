import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getRolesAPI, createJobOpeningAPI } from '../services/api';
import Navbar from '../components/Navbar';

const OpenRole = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    role: '',
    title: '',
    customSkills: '',
    experienceRequired: '',
    educationRequired: '',
    location: '',
    jobType: 'full-time',
  });
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await getRolesAPI();
        setRoles(res.data.roles);
      } catch (error) {
        toast.error('Failed to load roles');
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);

  const handleRoleSelect = (e) => {
    const roleId = e.target.value;
    const role = roles.find((r) => r._id === roleId);
    setSelectedRole(role);
    setFormData({
      ...formData,
      role: roleId,
      title: role ? `${role.name} Hiring` : '',
      customSkills: role ? role.defaultSkills.join(', ') : '',
      experienceRequired: role ? role.defaultExperience : '',
      educationRequired: role ? role.defaultEducation : '',
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.role) {
      toast.error('Please select a role');
      return;
    }
    setIsSubmitting(true);
    try {
      const submitData = {
        ...formData,
        customSkills: formData.customSkills.split(',').map((s) => s.trim()).filter(Boolean),
      };
      await createJobOpeningAPI(submitData);
      toast.success('Job opening created successfully!');
      navigate('/my-openings');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create opening');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-content animate-fade-in">
        <div className="dashboard-welcome">
          <h1>Open <span className="gradient-text">New Hiring</span></h1>
          <p>Select a role and configure the hiring requirements</p>
        </div>

        <div className="form-card glass-strong" style={{ maxWidth: '700px', padding: '32px' }}>
          {loading ? (
            <p style={{ color: 'var(--color-text-muted)' }}>Loading roles...</p>
          ) : (
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="input-label">Select Role *</label>
                <select
                  name="role"
                  className="input-field"
                  value={formData.role}
                  onChange={handleRoleSelect}
                  required
                >
                  <option value="">Choose a predefined role...</option>
                  {roles.map((role) => (
                    <option key={role._id} value={role._id}>
                      {role.name} — {role.department}
                    </option>
                  ))}
                </select>
              </div>

              {selectedRole && (
                <div className="role-preview glass" style={{ padding: '16px', marginBottom: '4px' }}>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>
                    <strong style={{ color: 'var(--color-text)' }}>{selectedRole.name}</strong> — {selectedRole.department}
                  </p>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                    {selectedRole.description}
                  </p>
                </div>
              )}

              <div className="form-group">
                <label className="input-label">Opening Title *</label>
                <input
                  type="text"
                  name="title"
                  className="input-field"
                  placeholder="e.g. Frontend Developer Hiring"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="input-label">Required Skills (comma separated)</label>
                <input
                  type="text"
                  name="customSkills"
                  className="input-field"
                  placeholder="React, Node.js, MongoDB"
                  value={formData.customSkills}
                  onChange={handleChange}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="input-label">Experience Required</label>
                  <input
                    type="text"
                    name="experienceRequired"
                    className="input-field"
                    placeholder="e.g. 1-3 years"
                    value={formData.experienceRequired}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="input-label">Education Required</label>
                  <input
                    type="text"
                    name="educationRequired"
                    className="input-field"
                    placeholder="e.g. B.Tech"
                    value={formData.educationRequired}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="input-label">Location</label>
                  <input
                    type="text"
                    name="location"
                    className="input-field"
                    placeholder="e.g. Bangalore / Remote"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="input-label">Job Type</label>
                  <select
                    name="jobType"
                    className="input-field"
                    value={formData.jobType}
                    onChange={handleChange}
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="internship">Internship</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Opening...' : '🚀 Open Hiring'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpenRole;
