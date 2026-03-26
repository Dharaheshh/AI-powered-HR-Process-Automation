import { useAuth } from '../context/AuthContext';

const TopNavbar = () => {
  const { user } = useAuth();

  return (
    <header style={{
      background: '#fff',
      position: 'sticky',
      top: 0,
      zIndex: 30,
      padding: '12px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #e8eaed',
      fontFamily: 'Inter, sans-serif',
    }}>
      {/* Search */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: '#f8fafc',
        padding: '8px 16px',
        borderRadius: '10px',
        width: '360px',
        border: '1px solid #e8eaed',
      }}>
        <span className="material-symbols-outlined" style={{ color: '#94a3b8', fontSize: '20px' }}>search</span>
        <input
          style={{
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: '13px',
            width: '100%',
            color: '#334155',
            fontFamily: 'Inter, sans-serif',
          }}
          placeholder="Search candidates, skills, or locations..."
          type="text"
        />
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button style={{
          padding: '8px', background: 'transparent', border: 'none', cursor: 'pointer',
          color: '#94a3b8', borderRadius: '8px', display: 'flex', alignItems: 'center',
          position: 'relative',
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>notifications</span>
          <span style={{
            position: 'absolute', top: '6px', right: '6px', width: '8px', height: '8px',
            background: '#ef4444', borderRadius: '50%', border: '2px solid #fff',
          }}></span>
        </button>
        <button style={{
          padding: '8px', background: 'transparent', border: 'none', cursor: 'pointer',
          color: '#94a3b8', borderRadius: '8px', display: 'flex', alignItems: 'center',
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>help_outline</span>
        </button>

        <div style={{ height: '28px', width: '1px', background: '#e8eaed' }}></div>

        {/* User */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', margin: 0, lineHeight: 1.2 }}>
              {user?.name || 'HR Manager'}
            </p>
            <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {user?.role === 'hr' ? 'HR Manager' : 'Candidate'}
            </p>
          </div>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%', background: '#003fb1',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: '14px',
            border: '2px solid #dbe1ff',
          }}>
            {user?.name?.charAt(0).toUpperCase() || 'H'}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
