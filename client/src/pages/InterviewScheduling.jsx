import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllApplicationsAPI } from '../services/api';
import DashboardLayout from '../components/layouts/DashboardLayout';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['MON','TUE','WED','THU','FRI','SAT','SUN'];

const InterviewScheduling = () => {
  const { user } = useAuth();
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [platform, setPlatform] = useState('google');
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await getAllApplicationsAPI();
        setApplications(res.data.applications);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = firstDay === 0 ? 6 : firstDay - 1;

  const calendarDays = [];
  for (let i = 0; i < offset; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  const hrSlots = [
    { start: '10:00 AM', end: '11:30 AM', host: 'Michael Chen (Lead)' },
    { start: '02:00 PM', end: '03:00 PM', host: 'Sarah James (HR)' },
    { start: '04:30 PM', end: '05:30 PM', host: 'Alex Rivera (Tech)' },
  ];

  const upcomingInterviews = applications.filter(a => a.status === 'interview').map(a => ({
    title: a.jobOpening?.title || 'Initial Screen',
    subtitle: a.interviewDate ? new Date(a.interviewDate).toLocaleString() : 'Pending Date',
    coordinator: a.candidate?.name || 'Unknown',
    color: '#003fb1',
    link: a.interviewLink
  }));

  const shortlistedCandidates = applications.filter(a => a.status === 'shortlisted');
  const targetCandidate = shortlistedCandidates.length > 0 ? shortlistedCandidates[0] : null;

  return (
    <DashboardLayout>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
        <span style={{ fontSize: '12px', color: '#94a3b8' }}>Candidates</span>
        <span style={{ fontSize: '12px', color: '#cbd5e1' }}>›</span>
        <span style={{ fontSize: '12px', color: '#94a3b8' }}>Software Engineering</span>
        <span style={{ fontSize: '12px', color: '#cbd5e1' }}>›</span>
        <span style={{ fontSize: '12px', color: '#003fb1', fontWeight: 600 }}>Scheduling</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', margin: 0, fontFamily: 'Manrope' }}>Candidate Planning</h1>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
            {targetCandidate ? (
              <>Finalizing the Technical Round for <strong>{targetCandidate.candidate?.name}</strong> ({targetCandidate.jobOpening?.title})</>
            ) : (
              "No shortlisted candidates currently awaiting interview scheduling."
            )}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, background: '#ecfdf5', color: '#059669' }}>
            {targetCandidate ? 'Available' : 'No Pending'}
          </span>
          {targetCandidate && <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, background: '#eff4ff', color: '#003fb1' }}>Stage 3 of 4</span>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
        {/* Left - Calendar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Calendar */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', margin: 0, fontFamily: 'Manrope' }}>
                {MONTHS[month]} {year}
              </h3>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#64748b' }}>chevron_left</span>
                </button>
                <button style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#64748b' }}>chevron_right</span>
                </button>
              </div>
            </div>

            {/* Day headers */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '8px' }}>
              {DAYS.map(d => (
                <div key={d} style={{ textAlign: 'center', fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '6px 0' }}>{d}</div>
              ))}
            </div>

            {/* Calendar grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
              {calendarDays.map((day, i) => {
                const isToday = day === currentDate.getDate();
                const isSelected = day === selectedDate.getDate();
                return (
                  <div key={i} onClick={() => day && setSelectedDate(new Date(year, month, day))} style={{
                    textAlign: 'center', padding: '10px 0', borderRadius: '8px', cursor: day ? 'pointer' : 'default',
                    fontSize: '13px', fontWeight: isToday || isSelected ? 700 : 400,
                    background: isSelected ? '#003fb1' : isToday ? '#eff4ff' : 'transparent',
                    color: !day ? 'transparent' : isSelected ? '#fff' : isToday ? '#003fb1' : '#1e293b',
                    transition: 'all 0.15s',
                  }}>{day || ''}</div>
                );
              })}
            </div>
          </div>

          {/* Available HR Slots */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed', padding: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', margin: '0 0 16px', fontFamily: 'Manrope' }}>Available HR Slots</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {hrSlots.map((slot, i) => (
                <div key={i} onClick={() => setSelectedSlot(i)} style={{
                  padding: '14px', borderRadius: '10px', cursor: 'pointer',
                  border: `2px solid ${selectedSlot === i ? '#003fb1' : '#e8eaed'}`,
                  background: selectedSlot === i ? '#eff4ff' : '#fff',
                  transition: 'all 0.15s',
                }}>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', margin: '0 0 4px' }}>{slot.start} — {slot.end}</p>
                  <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>Host: {slot.host}</p>
                </div>
              ))}
              <div style={{
                padding: '14px', borderRadius: '10px', cursor: 'pointer', border: '2px dashed #e8eaed',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#94a3b8' }}>add_circle_outline</span>
                <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>Custom Slot</span>
              </div>
            </div>
          </div>

          {/* AI Insight */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed', padding: '24px', display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div style={{ width: '120px', height: '80px', background: '#f1f5f9', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ fontSize: '36px', color: '#003fb1' }}>insights</span>
            </div>
            <div>
              <p style={{ fontSize: '10px', fontWeight: 700, color: '#003fb1', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 6px' }}>Interview Intelligence</p>
              <p style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', margin: '0 0 8px', fontFamily: 'Manrope' }}>
                Sarah's availability aligns perfectly with the Core Team's sprint cycle.
              </p>
              <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.6, margin: '0 0 12px' }}>
                Based on historical data, technical rounds held on Thursday mornings have a 5% higher accuracy in long-term performance prediction.
              </p>
              <div style={{ display: 'flex', gap: '24px' }}>
                <div><span style={{ fontSize: '20px', fontWeight: 800, color: '#1e293b', fontFamily: 'Manrope' }}>94%</span><br/><span style={{ fontSize: '10px', color: '#94a3b8' }}>Match Accuracy</span></div>
                <div><span style={{ fontSize: '20px', fontWeight: 800, color: '#1e293b', fontFamily: 'Manrope' }}>24h</span><br/><span style={{ fontSize: '10px', color: '#94a3b8' }}>Avg. Response</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Platform Selection */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed', padding: '20px' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', margin: '0 0 12px' }}>Platform Selection</p>
            {[
              { value: 'google', label: 'Google Meet', icon: '🟢' },
              { value: 'zoom', label: 'Zoom Meeting', icon: '🔵' },
            ].map(p => (
              <label key={p.value} onClick={() => setPlatform(p.value)} style={{
                display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '8px',
                cursor: 'pointer', marginBottom: '6px',
                border: `2px solid ${platform === p.value ? '#003fb1' : '#e8eaed'}`,
                background: platform === p.value ? '#eff4ff' : '#fff',
              }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: `2px solid ${platform === p.value ? '#003fb1' : '#cbd5e1'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {platform === p.value && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#003fb1' }}></div>}
                </div>
                <span style={{ fontSize: '12px' }}>{p.icon}</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>{p.label}</span>
              </label>
            ))}

            <div style={{ marginTop: '12px' }}>
              <p style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 6px' }}>Generated Link</p>
              <div style={{ padding: '8px 12px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {platform === 'google' ? 'meet.google.com/abc-def-ghi' : 'zoom.us/j/1234567890'}
                </span>
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#94a3b8', cursor: 'pointer' }}>content_copy</span>
              </div>
              <p style={{ fontSize: '11px', color: '#003fb1', fontWeight: 600, marginTop: '8px', cursor: 'pointer' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '14px', verticalAlign: 'middle' }}>refresh</span> Refresh Link
              </p>
            </div>
          </div>

          {/* Upcoming */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e8eaed', padding: '20px', maxHeight: '300px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', margin: 0 }}>Upcoming Interviews</p>
              <span style={{ fontSize: '11px', color: '#003fb1', fontWeight: 600 }}>{upcomingInterviews.length} Confirmed</span>
            </div>
            {upcomingInterviews.length === 0 ? (
              <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', margin: '20px 0' }}>No upcoming interviews scheduled.</p>
            ) : upcomingInterviews.map((inter, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', padding: '10px', borderRadius: '8px', borderLeft: `3px solid ${inter.color}`, background: '#f8fafc', marginBottom: '8px' }}>
                <div style={{ width: '100%' }}>
                  <p style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', margin: 0 }}>{inter.title}</p>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0' }}>{inter.subtitle}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                    <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0 }}>Candidate: {inter.coordinator}</p>
                    {inter.link && <a href={inter.link} target="_blank" rel="noreferrer" style={{ fontSize: '10px', color: '#003fb1', fontWeight: 600, textDecoration: 'none' }}>Join ↗</a>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Finalize */}
          <div style={{ background: 'linear-gradient(135deg, #003fb1, #1a56db)', borderRadius: '12px', padding: '20px', color: '#fff' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 6px' }}>Finalize Schedule</h4>
            <p style={{ fontSize: '12px', opacity: 0.8, lineHeight: 1.5, margin: '0 0 14px' }}>
              Confirming will send invites to the candidate and panel automatically.
            </p>
            <button style={{
              width: '100%', padding: '12px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: '8px', color: '#fff', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
            }}>Send Invitations</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewScheduling;