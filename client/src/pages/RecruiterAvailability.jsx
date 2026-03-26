import { useState } from 'react';
import DashboardLayout from '../components/layouts/DashboardLayout';

const DAYS_OF_WEEK = ['MON','TUE','WED','THU','FRI','SAT','SUN'];
const HOURS = ['09:00AM','10:00AM','11:00AM','12:00PM','01:00PM','02:00PM','03:00PM','04:00PM','05:00PM'];

const RecruiterAvailability = () => {
  const [viewMode, setViewMode] = useState('week');
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay() + 1);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });

  const interviewSlots = [
    { name: 'Standard Screening', duration: '30 Minutes', dots: '•••' },
    { name: 'Technical Review', duration: '45 Minutes', dots: '••' },
    { name: 'Culture Fit', duration: '45 Minutes', dots: '•' },
  ];

  // Mock events for the week view
  const events = [
    { day: 1, startH: 10, endH: 12, title: 'Sarah Frontend', color: '#dbeafe', textColor: '#003fb1' },
    { day: 2, startH: 10, endH: 11.5, title: 'John Review', color: '#d1fae5', textColor: '#059669' },
    { day: 2, startH: 14, endH: 15.5, title: 'Team Standup', color: '#003fb1', textColor: '#fff' },
    { day: 3, startH: 11, endH: 12, title: 'Anna Meeting', color: '#dbeafe', textColor: '#003fb1' },
    { day: 6, startH: 13, endH: 14, title: 'HR Final', color: '#f1f5f9', textColor: '#475569' },
  ];

  return (
    <DashboardLayout>
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
              <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#94a3b8', cursor: 'pointer' }}>edit</span>
            </div>
            {[
              { label: 'Monday – Friday', time: '09:00 - 18:00' },
              { label: 'Saturday', time: '10:00 - 13:00' },
            ].map((wh, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: '13px', color: '#1e293b' }}>{wh.label}</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>{wh.time}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
              <span style={{ fontSize: '13px', color: '#1e293b' }}>Sunday</span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#ef4444' }}>Off</span>
            </div>
            <button style={{
              width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px',
              background: '#fff', fontSize: '12px', fontWeight: 600, color: '#475569',
              cursor: 'pointer', marginTop: '12px',
            }}>Update Timezone (GMT+5.5)</button>
          </div>

          {/* Interview Slots */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed', padding: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', margin: '0 0 14px', fontFamily: 'Manrope' }}>Interview Slots</h3>
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
                <span style={{ color: '#cbd5e1', fontSize: '16px', cursor: 'pointer' }}>⋯</span>
              </div>
            ))}
            <button style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '10px', border: 'none',
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
                {weekDays.map((_, di) => (
                  <div key={di} style={{ height: '52px', borderLeft: '1px solid #f1f5f9', borderBottom: '1px solid #f8fafc', position: 'relative' }}>
                    {events.filter(e => e.day === di && Math.floor(e.startH) >= 9 + hi && Math.floor(e.startH) < 10 + hi).map((e, ei) => (
                      <div key={ei} style={{
                        position: 'absolute', top: '2px', left: '2px', right: '2px',
                        background: e.color, borderRadius: '6px', padding: '6px 8px',
                        height: `${(e.endH - e.startH) * 52 - 4}px`,
                        fontSize: '10px', fontWeight: 600, color: e.textColor,
                        overflow: 'hidden',
                      }}>{e.title}</div>
                    ))}
                  </div>
                ))}
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
          { icon: 'schedule', label: 'Focus Time', value: '14.5 hrs', sub: 'Blocked this week', color: '#003fb1' },
          { icon: 'event_available', label: 'Interviews Scheduled', value: '12 Total', sub: 'Across all roles', color: '#10b981' },
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
