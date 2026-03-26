import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { signupAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role) {
      toast.error('Please select a role');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsSubmitting(true);

    try {
      const { confirmPassword, ...submitData } = formData;
      const res = await signupAPI(submitData);
      login(res.data.user, res.data.token);
      toast.success('Account created successfully!');
      navigate(res.data.user.role === 'hr' ? '/dashboard' : '/candidate/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <div className="auth-card glass-strong animate-fade-in">
        <div className="auth-logo">
          <h1 className="gradient-text">Create Account</h1>
          <p>Join the HR Automation Platform</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="input-label">I am a</label>
            <div className="role-selector">
              <button
                type="button"
                className={`role-option ${formData.role === 'hr' ? 'active-hr' : ''}`}
                onClick={() => setFormData({ ...formData, role: 'hr' })}
              >
                <span className="role-icon">🏢</span>
                HR Manager
              </button>
              <button
                type="button"
                className={`role-option ${formData.role === 'candidate' ? 'active-candidate' : ''}`}
                onClick={() => setFormData({ ...formData, role: 'candidate' })}
              >
                <span className="role-icon">👤</span>
                Candidate
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="input-label" htmlFor="signup-name">Full Name</label>
            <input
              id="signup-name"
              type="text"
              name="name"
              className="input-field"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="input-label" htmlFor="signup-email">Email Address</label>
            <input
              id="signup-email"
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
            <label className="input-label" htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              type="password"
              name="password"
              className="input-field"
              placeholder="Minimum 6 characters"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="input-label" htmlFor="signup-confirm">Confirm Password</label>
            <input
              id="signup-confirm"
              type="password"
              name="confirmPassword"
              className="input-field"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account →'}
          </button>
        </form>

        <div className="auth-divider">or</div>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login/hr">Login as HR</Link>
            {' · '}
            <Link to="/login/candidate">Login as Candidate</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
