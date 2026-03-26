import React from 'react';

const HiringInsightsReports = () => {
  return (
    <>
      

<aside className="flex flex-col h-full py-6 px-4 bg-slate-50 dark:bg-slate-900 h-screen w-64 border-r-0 shadow-[8px_0_24px_rgba(0,63,177,0.06)] z-20">
<div className="mb-10 px-2">
<h1 className="text-xl font-bold tracking-tight text-blue-800 dark:text-blue-300">HireFlow AI</h1>
<p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1">Command Center</p>
</div>
<nav className="flex-1 space-y-1">
<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group" href="#">
<span className="material-symbols-outlined text-[20px]">account_tree</span>
<span className="font-medium text-sm">Workflow</span>
</a>
<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group" href="#">
<span className="material-symbols-outlined text-[20px]">calendar_today</span>
<span className="font-medium text-sm">Timetable</span>
</a>
<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group" href="#">
<span className="material-symbols-outlined text-[20px]">event_upcoming</span>
<span className="font-medium text-sm">Interviews</span>
</a>
<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group" href="#">
<span className="material-symbols-outlined text-[20px]">notification_important</span>
<span className="font-medium text-sm">Alerts</span>
</a>
<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group" href="#">
<span className="material-symbols-outlined text-[20px]">history_edu</span>
<span className="font-medium text-sm">Timeline</span>
</a>
<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-blue-700 dark:text-blue-400 font-bold border-r-4 border-blue-700 bg-blue-50/50 dark:bg-blue-900/20" href="#">
<span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: '\'FILL\' 1' }}>analytics</span>
<span className="font-bold text-sm">Insights</span>
</a>
</nav>
<div className="mt-auto space-y-1">
<button className="w-full bg-gradient-to-br from-primary to-primary-container text-white py-3 px-4 rounded-xl font-bold text-sm mb-6 shadow-lg shadow-blue-700/20 active:scale-95 transition-transform">
                New Candidate
            </button>
<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors" href="#">
<span className="material-symbols-outlined text-[20px]">settings</span>
<span className="font-medium text-sm">Settings</span>
</a>
<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors" href="#">
<span className="material-symbols-outlined text-[20px]">help</span>
<span className="font-medium text-sm">Support</span>
</a>
</div>
</aside>

<main className="flex-1 flex flex-col overflow-hidden">

<header className="flex justify-between items-center px-8 w-full sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md h-16">
<div className="flex items-center gap-8">
<div className="relative group">
<span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
<span className="material-symbols-outlined text-[20px]">search</span>
</span>
<input className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full w-80 text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Search reports, roles, or team members..." type="text"/>
</div>
<nav className="hidden md:flex gap-6">
<a className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-opacity" href="#">Dashboard</a>
<a className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-opacity" href="#">Candidates</a>
<a className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-opacity" href="#">Teams</a>
</nav>
</div>
<div className="flex items-center gap-4">
<button className="text-slate-500 hover:opacity-80 transition-opacity">
<span className="material-symbols-outlined">notifications</span>
</button>
<div className="h-8 w-[1px] bg-outline-variant/30"></div>
<button className="bg-surface-container-high text-on-surface text-sm font-bold px-4 py-2 rounded-lg hover:opacity-80 transition-opacity">
                    Schedule Interview
                </button>
<img alt="HR Manager Profile" className="w-8 h-8 rounded-full object-cover" data-alt="Professional portrait of a confident HR manager in a modern office setting with warm natural lighting and soft background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR9jxX8KGD-ixZwbVjWkkAk_f_Qn_3UkW2BoqCnYGD2FILGoUTAZIELsflVO0JHbsDX_ZN3zDoQQUdv-OnQeIyQLfFh4jGzYZAa-D1amWDSt1Ez7_73snn_Ko_elv-kBvYRdP0Fcs1F99uwDWVvxZdLowOnxznzoLyOAZ69qZEAplwMv6DhGl4LhfN35Tacb_v7P2bmT786gvJlEOtfWABO9AmZrS9LVoKb1kR9R7X4nw7aLWWN7S7xKF-1lLJaQArVAtfdP5ntmM"/>
</div>
</header>

<div className="flex-1 overflow-y-auto p-8 space-y-8">

<div className="flex justify-between items-end">
<div>
<span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1 block">Operational Analytics</span>
<h2 className="text-4xl font-extrabold text-on-surface tracking-tight">Hiring Insights</h2>
</div>
<div className="flex gap-2">
<button className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-outline-variant/10 rounded-lg text-sm font-semibold shadow-sm">
<span className="material-symbols-outlined text-[18px]">calendar_month</span>
                        Last 30 Days
                    </button>
<button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20">
<span className="material-symbols-outlined text-[18px]">download</span>
                        Export Report
                    </button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
<div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_8px_24px_rgba(0,63,177,0.04)] group hover:shadow-lg transition-shadow">
<div className="flex justify-between items-start mb-4">
<div className="p-2 bg-blue-50 text-blue-700 rounded-lg">
<span className="material-symbols-outlined">groups</span>
</div>
<span className="text-xs font-bold text-tertiary flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">trending_up</span> 12%
                        </span>
</div>
<p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Total Applicants</p>
<h3 className="text-3xl font-extrabold text-on-surface">1,284</h3>
</div>
<div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_8px_24px_rgba(0,63,177,0.04)] group hover:shadow-lg transition-shadow">
<div className="flex justify-between items-start mb-4">
<div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
<span className="material-symbols-outlined">timer</span>
</div>
<span className="text-xs font-bold text-tertiary flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">trending_down</span> 4d
                        </span>
</div>
<p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Avg. Time to Action</p>
<h3 className="text-3xl font-extrabold text-on-surface">3.2 Days</h3>
</div>
<div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_8px_24px_rgba(0,63,177,0.04)] group hover:shadow-lg transition-shadow">
<div className="flex justify-between items-start mb-4">
<div className="p-2 bg-amber-50 text-amber-700 rounded-lg">
<span className="material-symbols-outlined">check_circle</span>
</div>
<span className="text-xs font-bold text-slate-400">Stable</span>
</div>
<p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Shortlist Rate</p>
<h3 className="text-3xl font-extrabold text-on-surface">18.4%</h3>
</div>
<div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_8px_24px_rgba(0,63,177,0.04)] group hover:shadow-lg transition-shadow">
<div className="flex justify-between items-start mb-4">
<div className="p-2 bg-red-50 text-red-700 rounded-lg">
<span className="material-symbols-outlined">warning</span>
</div>
<span className="text-xs font-bold text-error">Critical</span>
</div>
<p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Bottlenecks</p>
<h3 className="text-3xl font-extrabold text-on-surface">4 Stage</h3>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

<div className="lg:col-span-2 space-y-8">

<section className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_8px_24px_rgba(0,63,177,0.04)]">
<div className="flex justify-between items-center mb-8">
<h4 className="text-xl font-bold text-on-surface">Applicants by Strategic Role</h4>
<button className="text-primary text-sm font-bold flex items-center gap-1">
                                View Detailed List <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</button>
</div>
<div className="space-y-6">
<div className="space-y-2">
<div className="flex justify-between text-sm font-semibold">
<span>Senior Product Designer</span>
<span className="text-slate-400">428 applicants</span>
</div>
<div className="h-3 w-full bg-surface-container-low rounded-full overflow-hidden">
<div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
</div>
</div>
<div className="space-y-2">
<div className="flex justify-between text-sm font-semibold">
<span>Full Stack Engineer (Node/React)</span>
<span className="text-slate-400">312 applicants</span>
</div>
<div className="h-3 w-full bg-surface-container-low rounded-full overflow-hidden">
<div className="h-full bg-primary rounded-full opacity-80" style={{ width: '65%' }}></div>
</div>
</div>
<div className="space-y-2">
<div className="flex justify-between text-sm font-semibold">
<span>Marketing Lead</span>
<span className="text-slate-400">186 applicants</span>
</div>
<div className="h-3 w-full bg-surface-container-low rounded-full overflow-hidden">
<div className="h-full bg-primary rounded-full opacity-60" style={{ width: '40%' }}></div>
</div>
</div>
<div className="space-y-2">
<div className="flex justify-between text-sm font-semibold">
<span>Customer Success Manager</span>
<span className="text-slate-400">124 applicants</span>
</div>
<div className="h-3 w-full bg-surface-container-low rounded-full overflow-hidden">
<div className="h-full bg-primary rounded-full opacity-40" style={{ width: '25%' }}></div>
</div>
</div>
</div>
</section>

<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
<div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_8px_24px_rgba(0,63,177,0.04)]">
<h4 className="text-lg font-bold text-on-surface mb-6">Shortlist vs Rejection</h4>
<div className="flex items-center gap-8">
<div className="relative w-32 h-32 flex items-center justify-center">
<svg className="w-full h-full transform -rotate-90">
<circle className="text-surface-container-low" cx="64" cy="64" fill="transparent" r="56" stroke="currentColor" strokeWidth="12"></circle>
<circle className="text-primary" cx="64" cy="64" fill="transparent" r="56" stroke="currentColor" strokeDasharray="351.8" strokeDashoffset="105.5" strokeWidth="12"></circle>
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<span className="text-2xl font-bold">70%</span>
</div>
</div>
<div className="flex-1 space-y-4">
<div className="flex items-center gap-3">
<div className="w-3 h-3 rounded-full bg-primary"></div>
<div>
<p className="text-xs font-bold text-slate-400 uppercase">Shortlisted</p>
<p className="text-sm font-bold">892 Candidates</p>
</div>
</div>
<div className="flex items-center gap-3">
<div className="w-3 h-3 rounded-full bg-surface-container-low"></div>
<div>
<p className="text-xs font-bold text-slate-400 uppercase">Rejected</p>
<p className="text-sm font-bold">392 Candidates</p>
</div>
</div>
</div>
</div>
</div>
<div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_8px_24px_rgba(0,63,177,0.04)]">
<h4 className="text-lg font-bold text-on-surface mb-6">Velocity Bottleneck</h4>
<div className="flex items-start gap-4 p-4 bg-error-container/30 rounded-xl">
<span className="material-symbols-outlined text-error mt-0.5">error</span>
<div>
<p className="text-sm font-bold text-on-error-container">Technical Review Phase</p>
<p className="text-xs text-on-error-container/80 mt-1">Wait times have increased by <span className="font-bold">2.4 days</span> in the last week for Engineering roles.</p>
</div>
</div>
<div className="mt-6">
<div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase mb-3">
<span>Phase</span>
<span>Avg. Latency</span>
</div>
<div className="flex justify-between items-center py-2 border-b border-outline-variant/5">
<span className="text-sm font-medium">Screening</span>
<span className="text-sm font-bold">1.2 Days</span>
</div>
<div className="flex justify-between items-center py-2 border-b border-outline-variant/5">
<span className="text-sm font-medium">Culture Fit</span>
<span className="text-sm font-bold">0.8 Days</span>
</div>
</div>
</div>
</div>
</div>

<div className="space-y-8">
<section className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_8px_24px_rgba(0,63,177,0.04)]">
<div className="flex justify-between items-center mb-6">
<h4 className="text-lg font-bold text-on-surface">Team Workload</h4>
<span className="material-symbols-outlined text-slate-400">more_vert</span>
</div>
<div className="space-y-6">

<div className="flex items-center gap-4">
<img alt="Recruiter" className="w-10 h-10 rounded-full object-cover" data-alt="Portrait of a friendly male recruiter with glasses smiling in a creative office space with plants" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZk4pIqyLDECBY921nMb6qOhG3jfxn-Z8PykIquXTxtU9qwJ3Nf3MrR1pi5X1pB-RCmg9ErsnH5RG7n6pbKn4nveStQuCwL3TCCNzfpZQgf_tQRlOwPi4Iz-1k2YL2qK8o5LXZQukZYPwOIv6kkUtjQJWJCAMwMSox0tbgeah2B5G4wHGTytmg23SaEATzW0JOAhgH5HXcbJ_FhwnQTOtJ25oPTe_U9TDybNF2VrLwYmPaZ2-npz4NhupvCnA5HzdSgds2GVOI8hw"/>
<div className="flex-1">
<div className="flex justify-between">
<p className="text-sm font-bold">Marcus Chen</p>
<span className="text-xs font-bold text-tertiary">12 Roles</span>
</div>
<div className="mt-2 h-1.5 w-full bg-surface-container-low rounded-full">
<div className="h-full bg-tertiary rounded-full" style={{ width: '90%' }}></div>
</div>
</div>
</div>
<div className="flex items-center gap-4">
<img alt="Recruiter" className="w-10 h-10 rounded-full object-cover" data-alt="Modern professional woman smiling in a bright airy studio environment with soft natural lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF5J59Ojbx2DiALBPkMG2R9MmVjwCUVFzbygXNIc68o2BuTxd7ufOamrbnlWl7LuC6LgdcMdbG55e4Q4lo8GMNqc0OTle2k_Dw37tEI_f8Za65Qavd0_-LvQFNwibjMOToxibOV-fd9YEdb2-qP8ChRNreg3H1QQHjHKnwb_cJtdi5gC6xwQVyYKF8BWWYEBeZKeri5dh9N_e_QiZ4lrOaUrLu3MAK0mw0VVVI-MDvFoVxTjWu8qcUJ9AsFZAtu3Zu__ol5tgm1vs"/>
<div className="flex-1">
<div className="flex justify-between">
<p className="text-sm font-bold">Sarah Jenkins</p>
<span className="text-xs font-bold text-primary">8 Roles</span>
</div>
<div className="mt-2 h-1.5 w-full bg-surface-container-low rounded-full">
<div className="h-full bg-primary rounded-full" style={{ width: '60%' }}></div>
</div>
</div>
</div>
<div className="flex items-center gap-4">
<img alt="Recruiter" className="w-10 h-10 rounded-full object-cover" data-alt="Young male professional in a smart casual outfit looking towards the camera in a modern loft office" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDt76ocPNNM77AvF4mo6yG8VMn8Rdl_NhJRWwCwzof-w_p432Wv3lTF-finwv3HHZZIK-LGDPuDMvJpxbDETez_qxibJfXcEUlwTsYg9npuos193KOTqKJQvnr9Z6AqjBBISdlOZLUaLLfLKdgO4hizbB9pIwRCqWugJgFiYWZXvm54nZ8C99nXwfUoiVL20_GGN2PdSKOfrACguxHRSITfBFu1c7oXQlj8kGMCdOQhLm0T8BH3uMbBa7Th-w1K892u8DRmw_GCaWw"/>
<div className="flex-1">
<div className="flex justify-between">
<p className="text-sm font-bold">Alex Rivera</p>
<span className="text-xs font-bold text-amber-600">4 Roles</span>
</div>
<div className="mt-2 h-1.5 w-full bg-surface-container-low rounded-full">
<div className="h-full bg-amber-500 rounded-full" style={{ width: '30%' }}></div>
</div>
</div>
</div>
</div>
<div className="mt-10 p-4 bg-surface-container-low rounded-lg">
<p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Insight</p>
<p className="text-sm text-on-surface-variant leading-relaxed">
                                Team bandwidth is currently at <span className="font-bold">78%</span>. Hiring 2 more recruiters is recommended for the upcoming Q3 expansion.
                            </p>
</div>
</section>

<div className="bg-gradient-to-br from-blue-900 to-primary p-8 rounded-xl text-white shadow-xl shadow-blue-900/20">
<h4 className="text-lg font-bold mb-4">Pipeline Health Score</h4>
<div className="text-5xl font-extrabold mb-2 tracking-tighter">84<span className="text-2xl font-normal opacity-50 ml-1">/100</span></div>
<p className="text-sm opacity-80 mb-6">Excellent. Your pipeline is 15% healthier than last quarter.</p>
<button className="w-full py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg font-bold text-sm transition-colors border border-white/10">
                            Review Recommendations
                        </button>
</div>
</div>
</div>

<div className="h-12"></div>
</div>
</main>

    </>
  );
};

export default HiringInsightsReports;