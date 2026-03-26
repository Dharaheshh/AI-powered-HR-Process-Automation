import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getJobOpeningsAPI } from '../services/api';

const BrowseRoles = () => {
  const [openings, setOpenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchOpenings = async () => {
      try { const res = await getJobOpeningsAPI(); setOpenings(res.data.jobOpenings); }
      catch (error) { toast.error('Failed to load job openings'); }
      finally { setLoading(false); }
    };
    fetchOpenings();
  }, []);

  const filtered = openings.filter(o =>
    o.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.role?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.role?.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fb', fontFamily: 'Inter, sans-serif' }}>
      {/* Top Bar */}
      <header style={{ background: '#fff', padding: '12px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e8eaed', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: '#003fb1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>bolt</span>
          </div>
          <span style={{ fontSize: '16px', fontWeight: 800, color: '#1e293b', fontFamily: 'Manrope' }}>HireFlow AI</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/candidate/dashboard" style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', textDecoration: 'none' }}>Dashboard</Link>
          <Link to="/my-applications" style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', textDecoration: 'none' }}>My Applications</Link>
        </div>
      </header>

      <main style={{ padding: '32px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#1e293b', margin: '0 0 6px', fontFamily: 'Manrope' }}>Browse <span style={{ color: '#003fb1' }}>Open Roles</span></h1>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>Find the perfect role for you and apply</p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', padding: '10px 16px', borderRadius: '10px', border: '1px solid #e8eaed', maxWidth: '480px' }}>
            <span className="material-symbols-outlined" style={{ color: '#94a3b8', fontSize: '20px' }}>search</span>
            <input type="text" placeholder="Search by role, department, or title..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '14px', width: '100%', color: '#334155', fontFamily: 'Inter' }}
            />
          </div>
        </div>

        {loading ? (
          <p style={{ color: '#94a3b8' }}>Loading roles...</p>
        ) : filtered.length === 0 ? (
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed', padding: '60px', textAlign: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#cbd5e1', marginBottom: '12px', display: 'block' }}>search_off</span>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#475569', margin: '0 0 8px' }}>No Open Positions</h2>
            <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Check back later for new openings!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {filtered.map((opening) => {
              const skills = opening.customSkills?.length > 0 ? opening.customSkills : opening.role?.defaultSkills || [];
              return (
                <Link to={`/roles/${opening._id}`} key={opening._id} style={{
                  background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed',
                  padding: '24px', textDecoration: 'none', color: 'inherit',
                  transition: 'box-shadow 0.15s',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', margin: 0, fontFamily: 'Manrope' }}>{opening.title}</h3>
                    <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: 700, background: '#eff4ff', color: '#003fb1' }}>{opening.role?.department}</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 12px' }}>{opening.role?.name}</p>
                  <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.5, margin: '0 0 16px' }}>{opening.role?.description?.slice(0, 100)}...</p>
                  
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {skills.slice(0, 4).map((skill, i) => (
                      <span key={i} style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '20px', background: '#f8fafc', border: '1px solid #f1f5f9', color: '#475569', fontWeight: 500 }}>{skill}</span>
                    ))}
                    {skills.length > 4 && <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '20px', background: '#f8fafc', color: '#94a3b8' }}>+{skills.length - 4}</span>}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#94a3b8' }}>
                    {opening.location && <span>📍 {opening.location}</span>}
                    <span>📝 {opening.jobType}</span>
                    {opening.experienceRequired && <span>💼 {opening.experienceRequired}</span>}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default BrowseRoles;
