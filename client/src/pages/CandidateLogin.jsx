import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loginAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const inputStyle = {
  width: '100%', padding: '12px 14px', border: '1px solid #e2e8f0', borderRadius: '8px',
  fontSize: '14px', outline: 'none', background: '#fff', color: '#1e293b',
  fontFamily: 'Inter, sans-serif', boxSizing: 'border-box',
};
const labelStyle = { display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '6px' };

const CandidateLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await loginAPI({ ...formData, role: 'candidate' });
      login(res.data.user, res.data.token);
      toast.success(`Welcome back, ${res.data.user.name}!`);
      navigate('/candidate/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally { setIsSubmitting(false); }
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#f8f9fb', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '40px 20px', fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{
        width: '100%', maxWidth: '420px', background: '#fff', borderRadius: '16px',
        border: '1px solid #e8eaed', padding: '40px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{ width: '32px', height: '32px', background: '#003fb1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>bolt</span>
            </div>
            <span style={{ fontSize: '16px', fontWeight: 800, color: '#1e293b', fontFamily: 'Manrope' }}>HireFlow AI</span>
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#1e293b', margin: '0 0 6px', fontFamily: 'Manrope' }}>Welcome Back</h1>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>Sign in to your account</p>
          <span style={{
            display: 'inline-block', marginTop: '12px', padding: '6px 14px',
            background: '#ecfdf5', color: '#059669', borderRadius: '20px',
            fontSize: '12px', fontWeight: 600,
          }}>👤 Candidate Login</span>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={labelStyle} htmlFor="candidate-email">Email Address</label>
            <input id="candidate-email" type="email" name="email" style={inputStyle} placeholder="you@email.com" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label style={labelStyle} htmlFor="candidate-password">Password</label>
            <input id="candidate-password" type="password" name="password" style={inputStyle} placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" disabled={isSubmitting} style={{
            width: '100%', padding: '12px', background: '#003fb1', color: '#fff', border: 'none',
            borderRadius: '10px', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
            opacity: isSubmitting ? 0.6 : 1, fontFamily: 'Inter',
          }}>{isSubmitting ? 'Signing in...' : 'Sign In as Candidate →'}</button>
        </form>

        <div style={{ textAlign: 'center', margin: '20px 0', fontSize: '12px', color: '#94a3b8' }}>or</div>

        <div style={{ textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
          <p style={{ margin: '0 0 8px' }}>Are you an HR? <Link to="/login/hr" style={{ color: '#003fb1', fontWeight: 600, textDecoration: 'none' }}>Login as HR</Link></p>
          <p style={{ margin: 0 }}>Don't have an account? <Link to="/signup" style={{ color: '#003fb1', fontWeight: 600, textDecoration: 'none' }}>Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default CandidateLogin;
