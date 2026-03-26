import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { signupAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const inputStyle = {
  width: '100%', padding: '12px 14px', border: '1px solid #e2e8f0', borderRadius: '8px',
  fontSize: '14px', outline: 'none', background: '#fff', color: '#1e293b',
  fontFamily: 'Inter, sans-serif', boxSizing: 'border-box',
};
const labelStyle = { display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '6px' };

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', role: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.role) { toast.error('Please select a role'); return; }
    if (formData.password !== formData.confirmPassword) { toast.error('Passwords do not match'); return; }
    if (formData.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setIsSubmitting(true);
    try {
      const { confirmPassword, ...submitData } = formData;
      const res = await signupAPI(submitData);
      login(res.data.user, res.data.token);
      toast.success('Account created successfully!');
      navigate(res.data.user.role === 'hr' ? '/dashboard' : '/candidate/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally { setIsSubmitting(false); }
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#f8f9fb', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '40px 20px', fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{
        width: '100%', maxWidth: '440px', background: '#fff', borderRadius: '16px',
        border: '1px solid #e8eaed', padding: '36px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{ width: '32px', height: '32px', background: '#003fb1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>bolt</span>
            </div>
            <span style={{ fontSize: '16px', fontWeight: 800, color: '#1e293b', fontFamily: 'Manrope' }}>HireFlow AI</span>
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#1e293b', margin: '0 0 6px', fontFamily: 'Manrope' }}>Create Account</h1>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>Join the HireFlow platform</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Role Selector */}
          <div>
            <label style={labelStyle}>I am a</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button type="button" onClick={() => setFormData({ ...formData, role: 'hr' })} style={{
                padding: '12px', border: `2px solid ${formData.role === 'hr' ? '#003fb1' : '#e2e8f0'}`,
                borderRadius: '10px', background: formData.role === 'hr' ? '#eff4ff' : '#fff',
                cursor: 'pointer', fontSize: '14px', fontWeight: 600,
                color: formData.role === 'hr' ? '#003fb1' : '#64748b', fontFamily: 'Inter',
              }}>🏢 HR Manager</button>
              <button type="button" onClick={() => setFormData({ ...formData, role: 'candidate' })} style={{
                padding: '12px', border: `2px solid ${formData.role === 'candidate' ? '#059669' : '#e2e8f0'}`,
                borderRadius: '10px', background: formData.role === 'candidate' ? '#ecfdf5' : '#fff',
                cursor: 'pointer', fontSize: '14px', fontWeight: 600,
                color: formData.role === 'candidate' ? '#059669' : '#64748b', fontFamily: 'Inter',
              }}>👤 Candidate</button>
            </div>
          </div>

          <div>
            <label style={labelStyle} htmlFor="signup-name">Full Name</label>
            <input id="signup-name" type="text" name="name" style={inputStyle} placeholder="Enter your full name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label style={labelStyle} htmlFor="signup-email">Email Address</label>
            <input id="signup-email" type="email" name="email" style={inputStyle} placeholder="you@email.com" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label style={labelStyle} htmlFor="signup-password">Password</label>
            <input id="signup-password" type="password" name="password" style={inputStyle} placeholder="Minimum 6 characters" value={formData.password} onChange={handleChange} required />
          </div>
          <div>
            <label style={labelStyle} htmlFor="signup-confirm">Confirm Password</label>
            <input id="signup-confirm" type="password" name="confirmPassword" style={inputStyle} placeholder="Re-enter your password" value={formData.confirmPassword} onChange={handleChange} required />
          </div>

          <button type="submit" disabled={isSubmitting} style={{
            width: '100%', padding: '12px', background: '#003fb1', color: '#fff', border: 'none',
            borderRadius: '10px', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
            opacity: isSubmitting ? 0.6 : 1, fontFamily: 'Inter',
          }}>{isSubmitting ? 'Creating Account...' : 'Create Account →'}</button>
        </form>

        <div style={{ textAlign: 'center', margin: '20px 0', fontSize: '12px', color: '#94a3b8' }}>or</div>

        <div style={{ textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
          <p style={{ margin: 0 }}>Already have an account? <Link to="/login/hr" style={{ color: '#003fb1', fontWeight: 600, textDecoration: 'none' }}>Login as HR</Link> · <Link to="/login/candidate" style={{ color: '#003fb1', fontWeight: 600, textDecoration: 'none' }}>Login as Candidate</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
