import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => { logout(); navigate('/login/hr'); };
  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/job-requirements', label: 'Job Requirements', icon: 'work' },
    { path: '/candidates', label: 'Candidates', icon: 'people' },
    { path: '/interviews', label: 'Interviews', icon: 'event_note' },
    { path: '/calendar', label: 'Calendar', icon: 'calendar_month' },
    { path: '/sla-alerts', label: 'SLA Alerts', icon: 'notifications_active' },
    { path: '/reports', label: 'Reports', icon: 'description' },
    { path: '/settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <aside style={{
      width: '220px', height: '100vh', position: 'fixed', left: 0, top: 0,
      background: '#fff', borderRight: '1px solid #e8eaed',
      display: 'flex', flexDirection: 'column', zIndex: 40, fontFamily: 'Inter, sans-serif',
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 20px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '32px', height: '32px', background: '#003fb1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>bolt</span>
        </div>
        <div>
          <h1 style={{ fontSize: '15px', fontWeight: 800, color: '#1a1a2e', margin: 0, fontFamily: 'Manrope, sans-serif', lineHeight: 1.2 }}>HireFlow AI</h1>
          <p style={{ fontSize: '9px', color: '#94a3b8', margin: 0, textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600 }}>Command Center</p>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: '2px', overflowY: 'auto' }}>
        {menuItems.map((item) => (
          <Link key={item.path} to={item.path} style={{
            display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
            borderRadius: '8px', textDecoration: 'none', fontSize: '13px',
            fontWeight: isActive(item.path) ? 600 : 500,
            color: isActive(item.path) ? '#003fb1' : '#64748b',
            background: isActive(item.path) ? '#eff4ff' : 'transparent',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => { if (!isActive(item.path)) e.currentTarget.style.background = '#f8fafc'; }}
          onMouseLeave={(e) => { if (!isActive(item.path)) e.currentTarget.style.background = 'transparent'; }}
          >
            <span className="material-symbols-outlined" style={{
              fontSize: '20px',
              fontVariationSettings: isActive(item.path) ? "'FILL' 1" : "'FILL' 0",
            }}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Post New Job Button */}
      <div style={{ padding: '12px' }}>
        <Link to="/open-role" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          padding: '12px', background: '#003fb1', color: '#fff', borderRadius: '10px',
          textDecoration: 'none', fontSize: '13px', fontWeight: 600, transition: 'background 0.15s ease',
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = '#1a56db'}
        onMouseLeave={(e) => e.currentTarget.style.background = '#003fb1'}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
          Post New Job
        </Link>
      </div>

      {/* Bottom Section */}
      <div style={{ padding: '8px 12px 16px', borderTop: '1px solid #e8eaed' }}>
        <a href="#" style={{
          display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px',
          color: '#94a3b8', fontSize: '12px', fontWeight: 500, textDecoration: 'none',
          borderRadius: '8px', transition: 'background 0.15s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>help_outline</span>
          Support
        </a>
        <button onClick={handleLogout} style={{
          display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px',
          color: '#ef4444', fontSize: '12px', fontWeight: 500, border: 'none',
          background: 'transparent', cursor: 'pointer', width: '100%', borderRadius: '8px',
          fontFamily: 'Inter, sans-serif', transition: 'background 0.15s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = '#fef2f2'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>logout</span>
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;