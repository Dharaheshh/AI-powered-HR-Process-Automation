import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const hrLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/open-role', label: 'Open Role', icon: '➕' },
    { path: '/my-openings', label: 'My Openings', icon: '📋' },
  ];

  const candidateLinks = [
    { path: '/candidate/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/roles', label: 'Browse Roles', icon: '🔍' },
    { path: '/my-applications', label: 'My Applications', icon: '📝' },
  ];

  const links = user?.role === 'hr' ? hrLinks : candidateLinks;

  return (
    <nav className="dashboard-navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <div className="nav-brand">
          <span className="brand-icon">🤖</span>
          <span className="gradient-text">HR Automation</span>
        </div>
        <div className="nav-links">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="nav-right">
        <div className="nav-user">
          <div className="nav-user-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="nav-user-info">
            <span className="nav-user-name">{user?.name}</span>
            <span className="nav-user-role">{user?.role === 'hr' ? 'HR Manager' : 'Candidate'}</span>
          </div>
        </div>
        <button className="btn-logout" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
