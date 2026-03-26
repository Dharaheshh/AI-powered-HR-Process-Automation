import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loginAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const CandidateLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <div className="auth-card glass-strong animate-fade-in">
        <div className="auth-logo">
          <h1 className="gradient-text">HR Automation</h1>
          <p>Hiring Intelligence Platform</p>
          <span className="auth-role-badge candidate">👤 Candidate Login</span>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="input-label" htmlFor="candidate-email">Email Address</label>
            <input
              id="candidate-email"
              type="email"
              name="email"
              className="input-field"
              placeholder="you@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="input-label" htmlFor="candidate-password">Password</label>
            <input
              id="candidate-password"
              type="password"
              name="password"
              className="input-field"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In as Candidate →'}
          </button>
        </form>

        <div className="auth-divider">or</div>

        <div className="auth-footer">
          <p>
            Are you an HR?{' '}
            <Link to="/login/hr">Login as HR</Link>
          </p>
          <p style={{ marginTop: '8px' }}>
            Don't have an account?{' '}
            <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CandidateLogin;
