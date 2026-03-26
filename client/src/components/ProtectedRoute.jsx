import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="page-container">
        <div className="glass-strong auth-card" style={{ textAlign: 'center' }}>
          <div className="gradient-text" style={{ fontSize: '1.2rem', fontWeight: 600 }}>
            Loading...
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to their appropriate dashboard
    if (user.role === 'hr') {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/candidate/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
