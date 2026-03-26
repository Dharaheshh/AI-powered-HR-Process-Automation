import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  const features = [
    { icon: '🤖', title: 'AI Resume Parsing', desc: 'Extract skills, experience & education automatically' },
    { icon: '📊', title: 'Smart Matching', desc: 'AI-powered candidate-job match scoring' },
    { icon: '⚡', title: 'Workflow Automation', desc: 'Automate shortlisting, emails & scheduling' },
    { icon: '📈', title: 'Analytics Dashboard', desc: 'Real-time hiring insights & reports' },
  ];

  return (
    <div style={{
      minHeight: '100vh', background: '#f8f9fb',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px', fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{ textAlign: 'center', maxWidth: '600px', marginBottom: '48px' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '32px' }}>
          <div style={{ width: '40px', height: '40px', background: '#003fb1', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: '22px', fontVariationSettings: "'FILL' 1" }}>bolt</span>
          </div>
          <span style={{ fontSize: '20px', fontWeight: 800, color: '#1e293b', fontFamily: 'Manrope' }}>HireFlow AI</span>
        </div>

        <h1 style={{ fontSize: '42px', fontWeight: 800, color: '#1e293b', lineHeight: 1.2, margin: '0 0 16px', fontFamily: 'Manrope' }}>
          <span style={{ color: '#003fb1' }}>AI-Powered</span><br />
          HR Process Automation
        </h1>
        <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.7, margin: '0 0 32px' }}>
          Streamline your hiring workflow with intelligent resume parsing,
          candidate matching, and automated scheduling. Make smarter hiring
          decisions, faster.
        </p>

        {isAuthenticated ? (
          <Link to={user.role === 'hr' ? '/dashboard' : '/candidate/dashboard'} style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px',
            background: '#003fb1', color: '#fff', borderRadius: '10px', fontSize: '15px',
            fontWeight: 600, textDecoration: 'none',
          }}>Go to Dashboard →</Link>
        ) : (
          <>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/login/hr" style={{
                padding: '14px 28px', background: '#003fb1', color: '#fff', borderRadius: '10px',
                fontSize: '15px', fontWeight: 600, textDecoration: 'none',
              }}>🏢 HR Login</Link>
              <Link to="/login/candidate" style={{
                padding: '14px 28px', background: '#fff', color: '#003fb1', borderRadius: '10px',
                fontSize: '15px', fontWeight: 600, textDecoration: 'none', border: '2px solid #003fb1',
              }}>👤 Candidate Login</Link>
            </div>
            <div style={{ marginTop: '16px' }}>
              <Link to="/signup" style={{ color: '#64748b', fontSize: '14px', textDecoration: 'none' }}>
                Don't have an account? <span style={{ color: '#003fb1', fontWeight: 600 }}>Sign up →</span>
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Feature cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', maxWidth: '960px', width: '100%' }}>
        {features.map((f, i) => (
          <div key={i} style={{
            background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e8eaed',
            textAlign: 'center', transition: 'box-shadow 0.15s',
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>{f.icon}</div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', margin: '0 0 6px', fontFamily: 'Manrope' }}>{f.title}</h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
