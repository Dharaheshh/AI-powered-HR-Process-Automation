import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="landing-page">
      <div className="landing-content animate-fade-in">
        <h1>
          <span className="gradient-text">AI-Powered</span>
          <br />
          HR Process Automation
        </h1>
        <p>
          Streamline your hiring workflow with intelligent resume parsing,
          candidate matching, and automated scheduling. Make smarter hiring
          decisions, faster.
        </p>

        {isAuthenticated ? (
          <div className="landing-buttons">
            <Link
              to={user.role === 'hr' ? '/dashboard' : '/candidate/dashboard'}
              className="btn-primary"
              style={{ textDecoration: 'none' }}
            >
              Go to Dashboard →
            </Link>
          </div>
        ) : (
          <>
            <div className="landing-buttons">
              <Link
                to="/login/hr"
                className="btn-primary"
                style={{ textDecoration: 'none' }}
              >
                🏢 HR Login
              </Link>
              <Link
                to="/login/candidate"
                className="btn-outline"
                style={{ textDecoration: 'none' }}
              >
                👤 Candidate Login
              </Link>
            </div>
            <div style={{ marginTop: '16px' }}>
              <Link
                to="/signup"
                style={{
                  color: 'var(--color-text-muted)',
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                }}
              >
                Don't have an account? <span style={{ color: 'var(--color-primary-light)' }}>Sign up →</span>
              </Link>
            </div>
          </>
        )}

        <div className="landing-features">
          <div className="feature-card glass">
            <div className="feature-icon">🤖</div>
            <h3>AI Resume Parsing</h3>
            <p>Extract skills, experience & education automatically</p>
          </div>
          <div className="feature-card glass">
            <div className="feature-icon">📊</div>
            <h3>Smart Matching</h3>
            <p>AI-powered candidate-job match scoring</p>
          </div>
          <div className="feature-card glass">
            <div className="feature-icon">⚡</div>
            <h3>Workflow Automation</h3>
            <p>Automate shortlisting, emails & scheduling</p>
          </div>
          <div className="feature-card glass">
            <div className="feature-icon">📈</div>
            <h3>Analytics Dashboard</h3>
            <p>Real-time hiring insights & reports</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
