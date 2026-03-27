import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllApplicationsAPI, getHrSettingsAPI, updateHrSettingsAPI } from '../services/api';
import DashboardLayout from '../components/layouts/DashboardLayout';
import toast from 'react-hot-toast';

const DAYS_OF_WEEK = ['MON','TUE','WED','THU','FRI','SAT','SUN'];
const HOURS = ['09:00AM','10:00AM','11:00AM','12:00PM','01:00PM','02:00PM','03:00PM','04:00PM','05:00PM'];

const RecruiterAvailability = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('week');
  const [loading, setLoading] = useState(true);
  
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay() + 1);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });

  const [applications, setApplications] = useState([]);
  
  // Real HR Settings State
  const [workingHours, setWorkingHours] = useState([]);
  const [interviewSlots, setInterviewSlots] = useState([]);
  const [timezone, setTimezone] = useState('GMT+5.5');

  // Edit State
  const [editingHours, setEditingHours] = useState(false);
  const [tempHours, setTempHours] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appRes, settingsRes] = await Promise.all([
          getAllApplicationsAPI(),
          getHrSettingsAPI()
        ]);
        setApplications(appRes.data.applications);
        
        const setts = settingsRes.data.settings;
        if (setts) {
          setWorkingHours(setts.workingHours || []);
          setInterviewSlots(setts.interviewSlots || []);
          setTimezone(setts.timezone || 'GMT+5.5');
        }
      } catch (err) {
        console.error('Failed to load data', err);
        toast.error('Failed to load recruiter settings');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handlers for Working Hours
  const handleEditHoursBtn = () => {
    setTempHours(JSON.parse(JSON.stringify(workingHours)));
    setEditingHours(true);
  };
  const handleSaveHours = async () => {
    try {
      await updateHrSettingsAPI({ workingHours: tempHours });
      setWorkingHours(tempHours);
      setEditingHours(false);
      toast.success('Working hours saved successfully');
    } catch (err) {
      toast.error('Failed to save working hours');
    }
  };
  const handleHourChange = (index, field, value) => {
    const updated = [...tempHours];
    updated[index][field] = value;
    setTempHours(updated);
  };

  // Handlers for Slots
  const handleAddSlot = async () => {
    const name = prompt('Enter interview type (e.g., Technical Review):');
    if (!name) return;
    const duration = prompt('Enter duration in minutes (e.g., 45):');
    if (!duration) return;
    
    const newSlots = [...interviewSlots, { name, duration: `${duration} Minutes` }];
    try {
      await updateHrSettingsAPI({ interviewSlots: newSlots });
      setInterviewSlots(newSlots);
      toast.success('Interview slot added');
    } catch (err) {
      toast.error('Failed to add slot');
    }
  };
  const handleDeleteSlot = async (index) => {
    if (!window.confirm('Remove this interview slot?')) return;
    const newSlots = interviewSlots.filter((_, i) => i !== index);
    try {
      await updateHrSettingsAPI({ interviewSlots: newSlots });
      setInterviewSlots(newSlots);
      toast.success('Slot removed');
    } catch (err) {
      toast.error('Failed to remove slot');
    }
  };

  const startOfWeek = new Date(weekDays[0]);
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(weekDays[6]);
  endOfWeek.setHours(23, 59, 59, 999);

  const realEvents = applications
    .filter(a => a.status === 'interview' && a.interviewDate)
    .map(a => ({ date: new Date(a.interviewDate), data: a }))
    .filter(e => e.date >= startOfWeek && e.date <= endOfWeek)
    .map(e => {
      const jsDay = e.date.getDay(); 
      const dayIndex = jsDay === 0 ? 6 : jsDay - 1;
      const startH = e.date.getHours() + (e.date.getMinutes() / 60);
      return {
        day: dayIndex,
        startH: startH,
        endH: startH + 1, 
        title: `${e.data.candidate?.name?.split(' ')[0]} - Intv`,
        color: '#ecfdf5', textColor: '#059669', border: '1px solid #a7f3d0'
      };
    });

  const events = [
    { day: 2, startH: 14, endH: 15.5, title: 'Focus (Blocked)', color: '#f1f5f9', textColor: '#475569' },
    ...realEvents
  ];

  if (loading) return <DashboardLayout><div className="placeholder-section">Loading your Schedule...</div></DashboardLayout>;

  return (
    <DashboardLayout>
      {location.state?.candidateId && (
        <div style={{ background: '#eff4ff', border: '1px solid #cce0ff', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="material-symbols-outlined" style={{ color: '#003fb1', fontSize: '24px' }}>event_available</span>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 700, color: '#003fb1', margin: 0 }}>Schedule Interview for {location.state.candidateName}</p>
              <p style={{ fontSize: '12px', color: '#1e293b', margin: '2px 0 0' }}>Click on any available time slot in the calendar below to proceed.</p>
            </div>
          </div>
          <button onClick={() => navigate(-1)} style={{ padding: '8px 16px', background: '#fff', border: '1px solid #cce0ff', borderRadius: '8px', fontSize: '12px', fontWeight: 600, color: '#003fb1', cursor: 'pointer' }}>Cancel Scheduling</button>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
        <span style={{ fontSize: '10px', fontWeight: 700, color: '#003fb1', textTransform: 'uppercase', letterSpacing: '1px' }}>Management</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', margin: 0, fontFamily: 'Manrope' }}>Recruiter Availability</h1>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>Manage your global interview windows, block focus time, and sync with team calendars.</p>
        </div>
        <div style={{ display: 'flex', gap: '4px', background: '#f1f5f9', borderRadius: '8px', padding: '3px' }}>
          {['Week','Month','Day'].map(v => (
            <button key={v} onClick={() => setViewMode(v.toLowerCase())} style={{
              padding: '6px 14px', borderRadius: '6px', border: 'none', fontSize: '12px', fontWeight: 600,
              cursor: 'pointer', background: viewMode === v.toLowerCase() ? '#fff' : 'transparent',
              color: viewMode === v.toLowerCase() ? '#003fb1' : '#64748b',
              boxShadow: viewMode === v.toLowerCase() ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
            }}>{v}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Left - Config */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Working Hours */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', margin: 0, fontFamily: 'Manrope' }}>Working Hours</h3>
              {!editingHours ? (
                <span className="material-symbols-outlined" onClick={handleEditHoursBtn} style={{ fontSize: '16px', color: '#94a3b8', cursor: 'pointer' }}>edit</span>
              ) : (
                <span className="material-symbols-outlined" onClick={handleSaveHours} style={{ fontSize: '16px', color: '#10b981', cursor: 'pointer' }}>check_circle</span>
              )}
            </div>
            
            {(editingHours ? tempHours : workingHours).map((wh, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: '13px', color: '#1e293b', width: '60px' }}>{wh.day.slice(0,3)}</span>
                
                {editingHours ? (
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <input type="checkbox" checked={wh.isOff} onChange={e => handleHourChange(i, 'isOff', e.target.checked)} />
                    {!wh.isOff ? (
                      <>
                        <input type="time" value={wh.start} onChange={e => handleHourChange(i, 'start', e.target.value)} style={{ padding: '2px 4px', fontSize: '11px', border: '1px solid #ccc', borderRadius: '4px' }} />
                        <span style={{ fontSize: '10px' }}>to</span>
                        <input type="time" value={wh.end} onChange={e => handleHourChange(i, 'end', e.target.value)} style={{ padding: '2px 4px', fontSize: '11px', border: '1px solid #ccc', borderRadius: '4px' }} />
                      </>
                    ) : (
                      <span style={{ fontSize: '11px', color: '#ef4444', fontStyle: 'italic', marginLeft: '10px' }}>Off</span>
                    )}
                  </div>
                ) : (
                  <span style={{ fontSize: '13px', fontWeight: 600, color: wh.isOff ? '#ef4444' : '#475569' }}>
                    {wh.isOff ? 'Off' : `${wh.start} - ${wh.end}`}
                  </span>
                )}
              </div>
            ))}
            
            <button 
              onClick={async () => {
                const tz = prompt('Update Timezone', timezone);
                if (tz) {
                  await updateHrSettingsAPI({ timezone: tz });
                  setTimezone(tz);
                  toast.success('Timezone updated');
                }
              }}
              style={{
                width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px',
                background: '#fff', fontSize: '12px', fontWeight: 600, color: '#475569',
                cursor: 'pointer', marginTop: '12px', transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = '#f8fafc'}
              onMouseLeave={(e) => e.target.style.background = '#fff'}
            >
              Update Timezone ({timezone})
            </button>
          </div>

          {/* Interview Slots */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed', padding: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', margin: '0 0 14px', fontFamily: 'Manrope' }}>Interview Slots</h3>
            {interviewSlots.length === 0 && <p style={{ fontSize: '12px', color: '#94a3b8' }}>No slots configured.</p>}
            {interviewSlots.map((slot, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px', borderRadius: '8px', borderLeft: '3px solid #003fb1',
                background: '#f8fafc', marginBottom: '8px',
              }}>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b', margin: 0 }}>{slot.name}</p>
                  <p style={{ fontSize: '11px', color: '#94a3b8', margin: '2px 0 0' }}>{slot.duration}</p>
                </div>
                <button onClick={() => handleDeleteSlot(i)} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '16px', cursor: 'pointer', padding: 0 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
                </button>
              </div>
            ))}
            <button onClick={handleAddSlot} style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 0 0', border: 'none',
              background: 'transparent', cursor: 'pointer', fontSize: '13px', fontWeight: 600,
              color: '#003fb1', fontFamily: 'Inter',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add_circle_outline</span>
              Add setup preset
            </button>
          </div>
        </div>

        {/* Right - Week Calendar */}
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed', overflow: 'hidden' }}>
          {/* Date Toggle */}
          <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#64748b' }}>chevron_left</span>
              </button>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', fontFamily: 'Manrope' }}>
                {DAYS_OF_WEEK[0].slice(0,3)} {weekDays[0].getDate()} – {weekDays[6].getDate()}, {weekDays[0].getFullYear()}
              </span>
              <button style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#64748b' }}>chevron_right</span>
              </button>
            </div>
            <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: '#94a3b8' }}>
              <span>● Interviews</span>
              <span style={{ color: '#cbd5e1' }}>○ Blocked</span>
            </div>
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '60px repeat(7, 1fr)', position: 'relative' }}>
            {/* Header */}
            <div style={{ borderBottom: '1px solid #f1f5f9', padding: '10px 0' }}></div>
            {weekDays.map((d, i) => {
              const isToday = d.toDateString() === today.toDateString();
              return (
                <div key={i} style={{
                  textAlign: 'center', padding: '10px 0', borderBottom: '1px solid #f1f5f9',
                  borderLeft: '1px solid #f1f5f9',
                }}>
                  <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0, textTransform: 'uppercase', fontWeight: 600 }}>{DAYS_OF_WEEK[i]}</p>
                  <p style={{
                    fontSize: '16px', fontWeight: 700, margin: '2px 0 0',
                    color: isToday ? '#fff' : '#1e293b',
                    background: isToday ? '#003fb1' : 'transparent',
                    borderRadius: '50%', width: '28px', height: '28px',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  }}>{d.getDate()}</p>
                </div>
              );
            })}

            {/* Time rows */}
            {HOURS.map((hour, hi) => (
              <div key={hi} style={{ display: 'contents' }}>
                <div style={{ padding: '12px 6px', fontSize: '10px', color: '#94a3b8', textAlign: 'right', borderBottom: '1px solid #f8fafc' }}>{hour}</div>
                {weekDays.map((_, di) => {
                  const isScheduling = !!location.state?.candidateId;
                  return (
                    <div 
                      key={di} 
                      onClick={() => {
                        if (isScheduling) {
                          const selectedDate = new Date(weekDays[di]);
                          selectedDate.setHours(9 + hi, 0, 0, 0);
                          navigate('/interviews', { state: { ...location.state, selectedSlot: selectedDate.toISOString() } });
                        }
                      }}
                      style={{ 
                        height: '52px', borderLeft: '1px solid #f1f5f9', borderBottom: '1px solid #f8fafc', position: 'relative',
                        cursor: isScheduling ? 'pointer' : 'default',
                        background: isScheduling ? 'rgba(0,63,177,0.01)' : 'transparent',
                        transition: 'background 0.15s'
                      }}
                      onMouseEnter={(e) => { if (isScheduling) e.currentTarget.style.background = 'rgba(0,63,177,0.08)' }}
                      onMouseLeave={(e) => { if (isScheduling) e.currentTarget.style.background = 'rgba(0,63,177,0.01)' }}
                    >
                      {events.filter(e => e.day === di && Math.floor(e.startH) >= 9 + hi && Math.floor(e.startH) < 10 + hi).map((e, ei) => (
                      <div key={ei} style={{
                        position: 'absolute', top: '2px', left: '2px', right: '2px',
                        background: e.color, borderRadius: '6px', padding: '6px 8px',
                        height: `${(e.endH - e.startH) * 52 - 4}px`,
                        fontSize: '10px', fontWeight: 600, color: e.textColor,
                        border: e.border || 'none',
                        overflow: 'hidden', pointerEvents: 'none',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                      }}>{e.title}</div>
                    ))}
                  </div>
                );
              })}
              </div>
            ))}
          </div>

          {/* Sync Status */}
          <div style={{ padding: '12px 20px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontSize: '12px', color: '#64748b' }}>
              <span>Sync Status:</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>🟢 Google Workspace ●</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>🔵 Outlook 365 ○</span>
            </div>
            <span style={{ fontSize: '12px', color: '#003fb1', fontWeight: 600, cursor: 'pointer' }}>Manage Connections</span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {[
          { icon: 'schedule', label: 'Focus Time', value: '1.5 hrs', sub: 'Blocked this week', color: '#003fb1' },
          { icon: 'event_available', label: 'Interviews Scheduled', value: `${applications.filter(a => a.status === 'interview').length} Total`, sub: 'Across all roles', color: '#10b981' },
          { icon: 'speed', label: 'Availability Score', value: '92%', sub: 'Calendar utilization', color: '#06b6d4' },
        ].map((s, i) => (
          <div key={i} style={{
            background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e8eaed',
            display: 'flex', alignItems: 'center', gap: '14px',
          }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '10px',
              background: `${s.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span className="material-symbols-outlined" style={{ color: s.color, fontSize: '22px', fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
            </div>
            <div>
              <p style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px' }}>{s.label}</p>
              <p style={{ fontSize: '20px', fontWeight: 800, color: '#1e293b', margin: 0, fontFamily: 'Manrope' }}>{s.value}</p>
              <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0' }}>{s.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default RecruiterAvailability;
