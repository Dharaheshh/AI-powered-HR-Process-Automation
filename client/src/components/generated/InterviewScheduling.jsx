import React from 'react';

const InterviewScheduling = () => {
  return (
    <div className="bg-background flex flex-col md:flex-row h-screen w-full overflow-hidden text-on-background">
      

<aside className="hidden md:flex flex-col h-screen w-64 py-6 px-4 bg-slate-50 dark:bg-slate-900 shadow-[8px_0_24px_rgba(0,63,177,0.06)] fixed left-0 top-0 z-40">
<div className="mb-8 px-4">
<h1 className="text-xl font-bold tracking-tight text-blue-800 dark:text-blue-300 font-headline">HireFlow AI</h1>
<p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">Command Center</p>
</div>
<nav className="flex-1 space-y-1">
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors group" href="#">
<span className="material-symbols-outlined">account_tree</span>
<span className="font-medium">Workflow</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors group" href="#">
<span className="material-symbols-outlined">calendar_today</span>
<span className="font-medium">Timetable</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-700 dark:text-blue-400 font-bold border-r-4 border-blue-700 bg-slate-100 active-nav-indicator" href="#">
<span className="material-symbols-outlined">event_upcoming</span>
<span className="font-medium">Interviews</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors group" href="#">
<span className="material-symbols-outlined">notification_important</span>
<span className="font-medium">Alerts</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors group" href="#">
<span className="material-symbols-outlined">history_edu</span>
<span className="font-medium">Timeline</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors group" href="#">
<span className="material-symbols-outlined">analytics</span>
<span className="font-medium">Insights</span>
</a>
</nav>
<div className="mt-auto pt-6 border-t border-slate-200/50 space-y-1">
<button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-100 transition-colors rounded-lg">
<span className="material-symbols-outlined">settings</span>
<span className="font-medium">Settings</span>
</button>
<button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-100 transition-colors rounded-lg">
<span className="material-symbols-outlined">help</span>
<span className="font-medium">Support</span>
</button>
<div className="mt-6 px-4 py-4 bg-white rounded-xl shadow-sm">
<div className="flex items-center gap-3">
<img alt="User Profile Avatar" className="w-10 h-10 rounded-full object-cover" data-alt="professional portrait of a middle-aged male executive with a confident smile in a modern office setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkvZ17GQj2OIx7RzZjMXQB4RfII4nvLeaJvlE3ou9rIZfuHAr2U6a5bzdHWnYgu5P4s-lhkMraulccO9oJG4N5mtfPp-JKEG9BAjRdasXCKnuvbYlWE_KqiVbisZNQ0pnYUUIAVZiuCgWPE84q9PvFQEKO0Ta6YPDqe_UoQqyPxXfANKpPvPZ20WgQ6cLdVoGQcte50C52YkGllVSs--stiz8MMEtcZ9CjjmecfYAB7IVK6DJ_zoM5AZqI2TzqBUoakmhEBNPZuis"/>
<div className="overflow-hidden">
<p className="text-sm font-bold truncate">Alex Rivera</p>
<p className="text-xs text-slate-500 truncate">Senior Recruiter</p>
</div>
</div>
</div>
</div>
</aside>

<main className="flex-1 md:ml-64 min-h-screen bg-surface">

<header className="flex justify-between items-center px-8 w-full sticky top-0 z-30 bg-white/80 backdrop-blur-md h-16">
<div className="flex items-center gap-8">
<div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/10">
<span className="material-symbols-outlined text-slate-400">search</span>
<input className="bg-transparent border-none focus:ring-0 text-sm w-64 font-body" placeholder="Search candidates..." type="text"/>
</div>
<nav className="hidden lg:flex items-center gap-6">
<a className="text-slate-500 hover:text-blue-600 text-sm font-medium" href="#">Dashboard</a>
<a className="text-blue-700 border-b-2 border-blue-700 pb-1 text-sm font-bold" href="#">Candidates</a>
<a className="text-slate-500 hover:text-blue-600 text-sm font-medium" href="#">Teams</a>
</nav>
</div>
<div className="flex items-center gap-4">
<button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
<span className="material-symbols-outlined">notifications</span>
<span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
</button>
<button className="bg-gradient-to-br from-primary to-primary-container text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg hover:opacity-90 transition-opacity">
                    Schedule Interview
                </button>
</div>
</header>
<div className="p-8 max-w-7xl mx-auto">

<div className="mb-8">
<div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
<span>Candidates</span>
<span className="material-symbols-outlined text-[10px]">chevron_right</span>
<span>Software Engineering</span>
<span className="material-symbols-outlined text-[10px]">chevron_right</span>
<span className="text-primary">Scheduling</span>
</div>
<div className="flex justify-between items-end">
<div>
<h2 className="text-4xl font-extrabold font-headline tracking-tight text-on-surface">Candidate Planning</h2>
<p className="text-on-surface-variant mt-2 max-w-lg font-body">Finalizing the Technical Round for <span className="font-bold text-on-surface underline decoration-primary/30">Sarah Jenkins</span> (Senior Frontend Dev).</p>
</div>
<div className="flex gap-3">
<span className="px-4 py-1.5 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full text-xs font-bold">Available</span>
<span className="px-4 py-1.5 bg-surface-container-highest text-on-surface-variant rounded-full text-xs font-bold">Stage 3 of 4</span>
</div>
</div>
</div>

<div className="grid grid-cols-12 gap-6">

<div className="col-span-12 lg:col-span-8 space-y-6">

<section className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_8px_24px_rgba(0,63,177,0.04)]">
<div className="flex items-center justify-between mb-6">
<h3 className="text-xl font-bold font-headline">October 2023</h3>
<div className="flex gap-2">
<button className="p-2 hover:bg-surface-container-low rounded-lg transition-colors">
<span className="material-symbols-outlined">chevron_left</span>
</button>
<button className="p-2 hover:bg-surface-container-low rounded-lg transition-colors">
<span className="material-symbols-outlined">chevron_right</span>
</button>
</div>
</div>
<div className="grid grid-cols-7 gap-2 mb-2">
<div className="text-center text-[10px] font-bold text-slate-400 uppercase py-2">Mon</div>
<div className="text-center text-[10px] font-bold text-slate-400 uppercase py-2">Tue</div>
<div className="text-center text-[10px] font-bold text-slate-400 uppercase py-2">Wed</div>
<div className="text-center text-[10px] font-bold text-slate-400 uppercase py-2">Thu</div>
<div className="text-center text-[10px] font-bold text-slate-400 uppercase py-2">Fri</div>
<div className="text-center text-[10px] font-bold text-slate-400 uppercase py-2">Sat</div>
<div className="text-center text-[10px] font-bold text-slate-400 uppercase py-2">Sun</div>
</div>
<div className="grid grid-cols-7 gap-2">

<div className="aspect-square bg-surface-container-low rounded-lg opacity-30 flex items-center justify-center text-sm">26</div>
<div className="aspect-square bg-surface-container-low rounded-lg opacity-30 flex items-center justify-center text-sm">27</div>
<div className="aspect-square bg-surface-container-low rounded-lg opacity-30 flex items-center justify-center text-sm">28</div>
<div className="aspect-square bg-surface-container-low rounded-lg opacity-30 flex items-center justify-center text-sm">29</div>
<div className="aspect-square bg-surface-container-low rounded-lg opacity-30 flex items-center justify-center text-sm">30</div>
<button className="aspect-square bg-surface-container-low hover:bg-primary-fixed hover:text-primary transition-all rounded-lg flex items-center justify-center text-sm font-medium">1</button>
<button className="aspect-square bg-surface-container-low hover:bg-primary-fixed hover:text-primary transition-all rounded-lg flex items-center justify-center text-sm font-medium">2</button>
<button className="aspect-square bg-surface-container-low hover:bg-primary-fixed hover:text-primary transition-all rounded-lg flex items-center justify-center text-sm font-medium">3</button>
<button className="aspect-square bg-surface-container-low hover:bg-primary-fixed hover:text-primary transition-all rounded-lg flex items-center justify-center text-sm font-medium">4</button>
<button className="aspect-square bg-primary text-white shadow-lg shadow-primary/30 rounded-lg flex items-center justify-center text-sm font-bold relative">
                                5
                                <span className="absolute bottom-1 w-1 h-1 bg-white rounded-full"></span>
</button>
<button className="aspect-square bg-surface-container-low hover:bg-primary-fixed hover:text-primary transition-all rounded-lg flex items-center justify-center text-sm font-medium">6</button>
<button className="aspect-square bg-surface-container-low hover:bg-primary-fixed hover:text-primary transition-all rounded-lg flex items-center justify-center text-sm font-medium">7</button>
<button className="aspect-square bg-surface-container-low hover:bg-primary-fixed hover:text-primary transition-all rounded-lg flex items-center justify-center text-sm font-medium">8</button>
<button className="aspect-square bg-surface-container-low hover:bg-primary-fixed hover:text-primary transition-all rounded-lg flex items-center justify-center text-sm font-medium">9</button>

<div className="aspect-square bg-surface-container-low rounded-lg flex items-center justify-center text-sm font-medium">10</div>
<div className="aspect-square bg-surface-container-low rounded-lg flex items-center justify-center text-sm font-medium">11</div>
<div className="aspect-square bg-surface-container-low rounded-lg flex items-center justify-center text-sm font-medium">12</div>
<div className="aspect-square bg-surface-container-low rounded-lg flex items-center justify-center text-sm font-medium">13</div>
<div className="aspect-square bg-surface-container-low rounded-lg flex items-center justify-center text-sm font-medium">14</div>
<div className="aspect-square bg-surface-container-low rounded-lg flex items-center justify-center text-sm font-medium">15</div>
<div className="aspect-square bg-surface-container-low rounded-lg flex items-center justify-center text-sm font-medium">16</div>
</div>
</section>

<section className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_8px_24px_rgba(0,63,177,0.04)]">
<div className="flex items-center gap-3 mb-6">
<span className="material-symbols-outlined text-primary">schedule</span>
<h3 className="text-xl font-bold font-headline">Available HR Slots</h3>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<button className="flex items-center justify-between p-4 bg-surface-container-low hover:bg-primary-fixed transition-all rounded-xl border border-transparent hover:border-primary/20 group text-left">
<div>
<p className="font-bold text-on-surface">10:00 AM — 11:30 AM</p>
<p className="text-xs text-on-surface-variant">Host: Michael Chen (Lead Eng)</p>
</div>
<span className="material-symbols-outlined text-slate-300 group-hover:text-primary">add_circle</span>
</button>
<button className="flex items-center justify-between p-4 bg-surface-container-low hover:bg-primary-fixed transition-all rounded-xl border border-transparent hover:border-primary/20 group text-left">
<div>
<p className="font-bold text-on-surface">02:00 PM — 03:00 PM</p>
<p className="text-xs text-on-surface-variant">Host: Sarah Watts (HRBP)</p>
</div>
<span className="material-symbols-outlined text-slate-300 group-hover:text-primary">add_circle</span>
</button>
<button className="flex items-center justify-between p-4 bg-surface-container-low hover:bg-primary-fixed transition-all rounded-xl border border-transparent hover:border-primary/20 group text-left">
<div>
<p className="font-bold text-on-surface">04:30 PM — 05:30 PM</p>
<p className="text-xs text-on-surface-variant">Host: Alex Rivera (Recruiter)</p>
</div>
<span className="material-symbols-outlined text-slate-300 group-hover:text-primary">add_circle</span>
</button>
<button className="flex items-center justify-between p-4 border-2 border-dashed border-outline-variant hover:border-primary hover:bg-primary-fixed/30 transition-all rounded-xl text-left group">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-outline">more_time</span>
<p className="font-bold text-outline group-hover:text-primary">Custom Slot</p>
</div>
</button>
</div>
</section>
</div>

<div className="col-span-12 lg:col-span-4 space-y-6">

<section className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_8px_24px_rgba(0,63,177,0.04)]">
<h3 className="text-lg font-bold font-headline mb-4">Platform Selection</h3>
<div className="space-y-3">
<label className="flex items-center gap-4 p-3 rounded-lg border border-primary bg-primary-fixed/20 cursor-pointer">
<input checked="" className="text-primary focus:ring-primary w-4 h-4" name="platform" type="radio"/>
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-blue-600">videocam</span>
<span className="font-bold text-on-surface">Google Meet</span>
</div>
</label>
<label className="flex items-center gap-4 p-3 rounded-lg border border-outline-variant hover:bg-surface-container-low cursor-pointer transition-colors">
<input className="text-primary focus:ring-primary w-4 h-4" name="platform" type="radio"/>
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-blue-500">video_chat</span>
<span className="font-medium text-on-surface">Zoom Meeting</span>
</div>
</label>
</div>
<div className="mt-6 pt-6 border-t border-surface-container">
<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Generated Link</p>
<div className="flex items-center gap-2 bg-surface-container-low p-3 rounded-lg border border-outline-variant/10">
<span className="text-xs font-mono text-primary truncate">meet.google.com/abc-hireflow-xyz</span>
<button className="ml-auto p-1 hover:bg-surface-container-high rounded transition-colors">
<span className="material-symbols-outlined text-sm">content_copy</span>
</button>
</div>
<button className="w-full mt-4 flex items-center justify-center gap-2 text-primary font-bold text-sm hover:underline py-2">
<span className="material-symbols-outlined text-lg">refresh</span>
                                Refresh Link
                            </button>
</div>
</section>

<section className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_8px_24px_rgba(0,63,177,0.04)]">
<div className="flex items-center justify-between mb-4">
<h3 className="text-lg font-bold font-headline">Upcoming</h3>
<span className="bg-primary-fixed text-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase">2 Scheduled</span>
</div>
<div className="space-y-4">
<div className="p-4 bg-surface-container-low rounded-xl border-l-4 border-primary">
<p className="text-xs font-bold text-primary mb-1 uppercase tracking-tight">Initial Screen</p>
<p className="font-bold text-sm">Completed — Oct 3</p>
<p className="text-xs text-on-surface-variant">Interviewer: Alex Rivera</p>
</div>
<div className="p-4 bg-surface-container-low rounded-xl border-l-4 border-tertiary">
<p className="text-xs font-bold text-tertiary mb-1 uppercase tracking-tight">Technical Interview</p>
<p className="font-bold text-sm">Oct 12 — 11:00 AM</p>
<p className="text-xs text-on-surface-variant">Host: Michael Chen</p>
</div>
</div>
</section>

<div className="bg-gradient-to-br from-primary to-primary-container p-6 rounded-xl shadow-xl">
<h4 className="text-white font-bold mb-2">Finalize Schedule</h4>
<p className="text-primary-fixed text-xs mb-4">Confirming will send invites to the candidate and panel automatically.</p>
<button className="w-full bg-white text-primary font-extrabold py-3 rounded-lg shadow-sm hover:bg-slate-50 transition-colors">
                            Send Invitations
                        </button>
</div>
</div>
</div>

<section className="mt-12 mb-8">
<div className="bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
<div className="md:w-1/3 relative h-48 md:h-auto">
<img alt="Modern office meeting" className="absolute inset-0 w-full h-full object-cover" data-alt="a professional group in a bright sunlit glass-walled conference room discussing strategy over laptops" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7-2iOsbVhAFoxahe0fy1ixUPF1gf1J4TFQzMwiUdM8B_rs4q5oh-75Hwu7ylkPUMHsJo2pLTmUdf0jhsSo6QvhKwmeN7LRaJiGG87lyAo3zxBrUAdN9UUqrfXeHnqvw2SOO6Yc1ZsbFIWIvR0hSqGvM_t36ZtfryKe5SsUV0-PkxZeVBtsbRoYhLRxK4z8hy6JnaLPidqt350H6whThLTpua97-XC6pwp1zBVn3dPoFnU8uLHyYoBoLk0TB5uHWyMjsjW9bpYzm4"/>
<div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
</div>
<div className="md:w-2/3 p-8 md:p-12">
<span className="text-xs font-bold text-primary tracking-[0.2em] uppercase mb-4 block">Interview Intelligence</span>
<h3 className="text-3xl font-extrabold font-headline mb-4 leading-tight">Sarah's availability aligns perfectly with the Core Team's sprint cycle.</h3>
<p className="text-on-surface-variant text-lg leading-relaxed mb-6 font-light">Based on historical data, technical rounds held on Thursday mornings have a 15% higher accuracy in long-term performance prediction. We've optimized these slots for your selection.</p>
<div className="flex items-center gap-6">
<div className="flex flex-col">
<span className="text-2xl font-bold text-on-surface">94%</span>
<span className="text-[10px] uppercase font-bold text-slate-400">Match Score</span>
</div>
<div className="w-px h-8 bg-surface-container"></div>
<div className="flex flex-col">
<span className="text-2xl font-bold text-on-surface">24h</span>
<span className="text-[10px] uppercase font-bold text-slate-400">Avg. Response</span>
</div>
</div>
</div>
</div>
</section>
</div>
</main>

<nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200/50 flex justify-around items-center h-20 px-4 z-50">
<button className="flex flex-col items-center gap-1 text-slate-400">
<span className="material-symbols-outlined">account_tree</span>
<span className="text-[10px] font-bold uppercase">Workflow</span>
</button>
<button className="flex flex-col items-center gap-1 text-slate-400">
<span className="material-symbols-outlined">calendar_today</span>
<span className="text-[10px] font-bold uppercase">Schedule</span>
</button>
<button className="flex flex-col items-center gap-1 text-primary">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"\\'FILL\\' 1"}}>event_upcoming</span>
<span className="text-[10px] font-bold uppercase">Interview</span>
</button>
<button className="flex flex-col items-center gap-1 text-slate-400">
<span className="material-symbols-outlined">person</span>
<span className="text-[10px] font-bold uppercase">Profile</span>
</button>
</nav>

    </div>
  );
};

export default InterviewScheduling;
