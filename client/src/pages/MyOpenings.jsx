import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getMyJobOpeningsAPI, deleteJobOpeningAPI } from '../services/api';
import DashboardLayout from '../components/layouts/DashboardLayout';

const MyOpenings = () => {
  const [openings, setOpenings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOpenings = async () => {
    try {
      const res = await getMyJobOpeningsAPI();
      setOpenings(res.data.jobOpenings);
    } catch (error) {
      toast.error('Failed to load openings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOpenings(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this opening?')) return;
    try {
      await deleteJobOpeningAPI(id);
      toast.success('Opening deleted');
      setOpenings(openings.filter((o) => o._id !== id));
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#1e293b', margin: 0, fontFamily: 'Manrope, sans-serif' }}>
            Job <span style={{ color: '#003fb1' }}>Requirements</span>
          </h2>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>Manage your active hiring positions</p>
        </div>
        <Link to="/open-role" style={{
          display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
          background: '#003fb1', color: '#fff', borderRadius: '10px',
          fontSize: '13px', fontWeight: 600, textDecoration: 'none',
          transition: 'background 0.15s',
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
          Open New Role
        </Link>
      </div>

      {loading ? (
        <p style={{ color: '#94a3b8' }}>Loading...</p>
      ) : openings.length === 0 ? (
        <div style={{
          background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed',
          padding: '60px', textAlign: 'center',
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#cbd5e1', marginBottom: '12px', display: 'block' }}>work_outline</span>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#475569', margin: '0 0 8px' }}>No Openings Yet</h3>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Create your first job opening to start receiving applications</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
          {openings.map((opening) => (
            <div key={opening._id} style={{
              background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed',
              overflow: 'hidden', transition: 'box-shadow 0.15s',
            }}>
              <div style={{ padding: '20px' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', margin: 0, fontFamily: 'Manrope' }}>{opening.title}</h3>
                    <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>{opening.role?.name} • {opening.role?.department}</p>
                  </div>
                  <span style={{
                    padding: '4px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.5px',
                    background: opening.status === 'open' ? '#ecfdf5' : '#f1f5f9',
                    color: opening.status === 'open' ? '#059669' : '#64748b',
                  }}>{opening.status}</span>
                </div>

                {/* Meta */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                  {opening.location && (
                    <span style={{ fontSize: '12px', color: '#64748b', background: '#f8fafc', padding: '4px 10px', borderRadius: '6px', border: '1px solid #f1f5f9' }}>
                      📍 {opening.location}
                    </span>
                  )}
                  <span style={{ fontSize: '12px', color: '#64748b', background: '#f8fafc', padding: '4px 10px', borderRadius: '6px', border: '1px solid #f1f5f9' }}>
                    📝 {opening.jobType}
                  </span>
                </div>

                {/* Applicant Count */}
                <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '14px', textAlign: 'center', marginBottom: '16px', border: '1px solid #f1f5f9' }}>
                  <p style={{ fontSize: '24px', fontWeight: 800, color: '#003fb1', margin: 0, fontFamily: 'Manrope' }}>{opening.applicantCount || 0}</p>
                  <p style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, margin: '4px 0 0' }}>Applicants</p>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Link to={`/applicants/${opening._id}`} style={{
                    flex: 1, textAlign: 'center', padding: '10px', background: '#003fb1', color: '#fff',
                    borderRadius: '8px', fontSize: '13px', fontWeight: 600, textDecoration: 'none',
                    transition: 'background 0.15s',
                  }}>View Applicants</Link>
                  <button onClick={() => handleDelete(opening._id)} style={{
                    padding: '10px', border: '1px solid #fecaca', background: '#fff', borderRadius: '8px',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#fef2f2'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
                  >
                    <span className="material-symbols-outlined" style={{ color: '#ef4444', fontSize: '18px' }}>delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default MyOpenings;
