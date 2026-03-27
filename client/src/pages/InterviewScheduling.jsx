import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllApplicationsAPI, updateApplicationStatusAPI, parseScheduleAPI } from '../services/api';
import toast from 'react-hot-toast';
import DashboardLayout from '../components/layouts/DashboardLayout';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['MON','TUE','WED','THU','FRI','SAT','SUN'];

const InterviewScheduling = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const schedulingState = location.state || null;
  const initDate = schedulingState?.selectedSlot ? new Date(schedulingState.selectedSlot) : new Date();
  
  const [currentDate] = useState(initDate);
  const [selectedDate, setSelectedDate] = useState(initDate);
  const [platform, setPlatform] = useState('google');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [processing, setProcessing] = useState(false);
  
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // AI Copilot State
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [copilotCommand, setCopilotCommand] = useState('');
  const [copilotParsing, setCopilotParsing] = useState(false);
  const [copilotResult, setCopilotResult] = useState(null);
  const [copilotSlot, setCopilotSlot] = useState(null);
  const [copilotPlatform, setCopilotPlatform] = useState('google');
  const [copilotScheduling, setCopilotScheduling] = useState(false);
  const [isListening, setIsListening] = useState(false);

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
  const targetCandidateFallback = shortlistedCandidates.length > 0 ? shortlistedCandidates[0] : null;

  const targetName = schedulingState?.candidateName || targetCandidateFallback?.candidate?.name;
  const targetJob = schedulingState?.jobTitle || targetCandidateFallback?.jobOpening?.title;
  const canSchedule = !!schedulingState?.applicationId || !!targetCandidateFallback?._id;
  const activeAppId = schedulingState?.applicationId || targetCandidateFallback?._id;

  const handleFinalize = async () => {
    if (!activeAppId) return toast.error("No candidate selected");
    const link = platform === 'google' ? 'https://meet.google.com/abc-def-ghi' : 'https://zoom.us/j/1234567890';
    try {
      setProcessing(true);
      await updateApplicationStatusAPI(activeAppId, 'interview', {
        interviewDate: selectedDate,
        interviewLink: link
      });
      toast.success("Interview scheduled & invite sent!");
      navigate(`/candidates/${activeAppId}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Scheduling failed");
    } finally {
      setProcessing(false);
    }
  };

  // AI Copilot Handlers
  const handleCopilotParse = async () => {
    if (!copilotCommand.trim()) return toast.error('Type or speak a scheduling command');
    try {
      setCopilotParsing(true);
      setCopilotResult(null);
      setCopilotSlot(null);
      const res = await parseScheduleAPI(copilotCommand);
      setCopilotResult(res.data);
      if (res.data.availableSlots?.length > 0) {
        setCopilotSlot(res.data.availableSlots[0]);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to parse command');
    } finally {
      setCopilotParsing(false);
    }
  };

  const handleCopilotConfirm = async () => {
    if (!copilotResult?.application?._id || !copilotSlot) return toast.error('Missing scheduling data');
    const dateStr = copilotResult.date;
    const timeParts = copilotSlot.start.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!timeParts) return toast.error('Invalid time slot');
    let hours = parseInt(timeParts[1]);
    const mins = parseInt(timeParts[2]);
    const ampm = timeParts[3].toUpperCase();
    if (ampm === 'PM' && hours < 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
    const scheduledDate = new Date(dateStr + `T${String(hours).padStart(2,'0')}:${String(mins).padStart(2,'0')}:00`);
    const link = copilotPlatform === 'google' ? 'https://meet.google.com/abc-def-ghi' : 'https://zoom.us/j/1234567890';
    
    try {
      setCopilotScheduling(true);
      await updateApplicationStatusAPI(copilotResult.application._id, 'interview', {
        interviewDate: scheduledDate,
        interviewLink: link
      });
      toast.success(`Interview scheduled for ${copilotResult.candidate?.name}!`);
      setCopilotOpen(false);
      setCopilotResult(null);
      setCopilotCommand('');
      // Refresh applications list
      const res = await getAllApplicationsAPI();
      setApplications(res.data.applications);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Scheduling failed');
    } finally {
      setCopilotScheduling(false);
    }
  };

  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      return toast.error('Voice input is not supported in this browser. Use Chrome for best results.');
    }
    
    if (isListening) return; // Prevent double-start
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN'; // Better for Indian English accents
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;
    
    recognition.onstart = () => {
      setIsListening(true);
      toast('🎤 Listening... Speak your scheduling command', { duration: 3000 });
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event) => {
      setIsListening(false);
      const errorMap = {
        'no-speech': 'No speech detected. Please try again.',
        'audio-capture': 'No microphone found. Check your mic settings.',
        'not-allowed': 'Microphone access denied. Allow mic permission in browser settings.',
        'network': 'Network error. Check your internet connection.',
        'aborted': 'Voice input was cancelled.',
      };
      toast.error(errorMap[event.error] || `Voice error: ${event.error}`);
    };
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setCopilotCommand(transcript);
      toast.success(`Voice captured: "${transcript}"`);
    };
    
    try {
      recognition.start();
    } catch (e) {
      setIsListening(false);
      toast.error('Could not start voice recognition. Try refreshing the page.');
    }
  };

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
            {targetName ? (
              <>Finalizing the Technical Round for <strong>{targetName}</strong> ({targetJob})</>
            ) : (
              "No shortlisted candidates currently awaiting interview scheduling."
            )}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, background: '#ecfdf5', color: '#059669' }}>
            {targetName ? 'Available' : 'No Pending'}
          </span>
          {targetName && <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, background: '#eff4ff', color: '#003fb1' }}>Stage 3 of 4</span>}
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
               Confirming will schedule {targetName}'s interview for <strong>{selectedDate.toLocaleString()}</strong> and send invites automatically.
            </p>
            <button 
              onClick={handleFinalize}
              disabled={!canSchedule || processing}
              style={{
                width: '100%', padding: '12px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: '8px', color: '#fff', fontSize: '13px', fontWeight: 700, 
                cursor: canSchedule && !processing ? 'pointer' : 'not-allowed', opacity: canSchedule ? 1 : 0.6
            }}>
              {processing ? 'Processing...' : 'Send Invitations'}
            </button>
          </div>
        </div>
      </div>

      {/* AI COPILOT FAB */}
      {!copilotOpen && (
        <button onClick={() => setCopilotOpen(true)} style={{
          position: 'fixed', bottom: '32px', right: '32px', width: '56px', height: '56px',
          borderRadius: '50%', background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', border: 'none',
          color: '#fff', cursor: 'pointer', boxShadow: '0 8px 24px rgba(99,102,241,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
          transition: 'transform 0.2s'
        }} onMouseEnter={e => e.target.style.transform = 'scale(1.1)'} onMouseLeave={e => e.target.style.transform = 'scale(1)'}>
          <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>smart_toy</span>
        </button>
      )}

      {/* AI COPILOT PANEL */}
      {copilotOpen && (
        <div style={{
          position: 'fixed', bottom: '32px', right: '32px', width: '440px',
          maxHeight: '85vh', overflowY: 'auto',
          background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0',
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)', zIndex: 200,
          display: 'flex', flexDirection: 'column'
        }}>
          {/* Header */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', borderRadius: '16px 16px 0 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="material-symbols-outlined" style={{ color: '#fff' }}>smart_toy</span>
              <div>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#fff' }}>AI Scheduling Copilot</h3>
                <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>Schedule interviews using natural language</p>
              </div>
            </div>
            <button onClick={() => setCopilotOpen(false)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#fff' }}>close</span>
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Input */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px', display: 'block' }}>Command</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text" value={copilotCommand}
                  onChange={(e) => setCopilotCommand(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCopilotParse()}
                  placeholder='e.g. "Schedule Priya for technical interview tomorrow after 3 PM"'
                  style={{ flex: 1, padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                />
                <button onClick={startVoiceInput} style={{
                  padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: isListening ? '#ef4444' : '#f8fafc',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: isListening ? '#fff' : '#64748b', animation: isListening ? 'pulse 1s infinite' : 'none' }}>mic</span>
                </button>
              </div>
              <button onClick={handleCopilotParse} disabled={copilotParsing || !copilotCommand.trim()} style={{
                width: '100%', marginTop: '10px', padding: '10px', borderRadius: '8px',
                background: copilotParsing ? '#94a3b8' : '#8b5cf6', color: '#fff', border: 'none',
                fontWeight: 700, fontSize: '13px', cursor: copilotParsing ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
              }}>
                {copilotParsing ? <><span className="material-symbols-outlined" style={{ animation: 'spin 1s linear infinite', fontSize: '16px' }}>autorenew</span> Parsing...</>
                  : <><span className="material-symbols-outlined" style={{ fontSize: '16px' }}>psychology</span> Parse Command</>}
              </button>
            </div>

            {/* Parsed Preview */}
            {copilotResult && (
              <div style={{ background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>Parsed Command</h4>
                  <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '20px', background: copilotResult.parsed?.intent === 'reschedule' ? '#fef3c7' : '#dcfce7', color: copilotResult.parsed?.intent === 'reschedule' ? '#92400e' : '#166534' }}>
                    {copilotResult.parsed?.intent?.toUpperCase()}
                  </span>
                </div>
                <div style={{ padding: '12px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
                  <div><span style={{ color: '#94a3b8' }}>Candidate: </span><strong>{copilotResult.parsed?.candidateName || '—'}</strong></div>
                  <div><span style={{ color: '#94a3b8' }}>Type: </span><strong>{copilotResult.parsed?.interviewType}</strong></div>
                  <div><span style={{ color: '#94a3b8' }}>Date: </span><strong>{copilotResult.date}</strong></div>
                  <div><span style={{ color: '#94a3b8' }}>Time: </span><strong>{copilotResult.parsed?.timeRange || 'Any'}</strong></div>
                </div>

                {/* Validation */}
                {copilotResult.validationErrors?.length > 0 && (
                  <div style={{ padding: '10px 16px', background: '#fef2f2', borderTop: '1px solid #fecaca' }}>
                    {copilotResult.validationErrors.map((e, i) => (
                      <p key={i} style={{ margin: '4px 0', fontSize: '12px', color: '#dc2626', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>error</span> {e}
                      </p>
                    ))}
                  </div>
                )}

                {/* Candidate Found */}
                {copilotResult.candidate && copilotResult.application && copilotResult.validationErrors?.length === 0 && (
                  <>
                    <div style={{ padding: '10px 16px', background: '#ecfdf5', borderTop: '1px solid #d1fae5', fontSize: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#059669' }}>check_circle</span>
                        <strong style={{ color: '#065f46' }}>{copilotResult.candidate.name}</strong>
                        <span style={{ color: '#047857' }}>— {copilotResult.application.jobTitle}</span>
                      </div>
                      <span style={{ color: '#64748b' }}>Stage: {copilotResult.application.status} | Score: {copilotResult.application.matchScore ?? 'N/A'}%</span>
                    </div>

                    {/* Slot Selection */}
                    <div style={{ padding: '12px 16px', borderTop: '1px solid #e2e8f0' }}>
                      <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '6px', display: 'block' }}>Available Slots</label>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {copilotResult.availableSlots?.map((s, i) => (
                          <button key={i} onClick={() => setCopilotSlot(s)} style={{
                            padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                            background: copilotSlot?.start === s.start ? '#8b5cf6' : '#f1f5f9',
                            color: copilotSlot?.start === s.start ? '#fff' : '#475569',
                            border: copilotSlot?.start === s.start ? '1px solid #7c3aed' : '1px solid #e2e8f0'
                          }}>{s.start}</button>
                        ))}
                      </div>
                    </div>

                    {/* Platform */}
                    <div style={{ padding: '12px 16px', borderTop: '1px solid #e2e8f0' }}>
                      <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '6px', display: 'block' }}>Platform</label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {['google', 'zoom'].map(p => (
                          <button key={p} onClick={() => setCopilotPlatform(p)} style={{
                            padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                            background: copilotPlatform === p ? '#003fb1' : '#f1f5f9',
                            color: copilotPlatform === p ? '#fff' : '#475569',
                            border: copilotPlatform === p ? '1px solid #003fb1' : '1px solid #e2e8f0'
                          }}>{p === 'google' ? 'Google Meet' : 'Zoom'}</button>
                        ))}
                      </div>
                    </div>

                    {/* Confirm */}
                    <div style={{ padding: '12px 16px', borderTop: '1px solid #e2e8f0' }}>
                      <button onClick={handleCopilotConfirm} disabled={copilotScheduling} style={{
                        width: '100%', padding: '10px', borderRadius: '8px',
                        background: copilotScheduling ? '#94a3b8' : '#059669', color: '#fff',
                        border: 'none', fontWeight: 700, fontSize: '13px', cursor: copilotScheduling ? 'not-allowed' : 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                      }}>
                        {copilotScheduling ? 'Scheduling...' : <><span className="material-symbols-outlined" style={{ fontSize: '16px' }}>event_available</span> Confirm & Schedule</>}
                      </button>
                      <p style={{ margin: '6px 0 0', fontSize: '11px', color: '#94a3b8', textAlign: 'center' }}>This will update timeline, send email invite, and block the calendar slot.</p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default InterviewScheduling;