import React from 'react';

const CandidateTimelineGuardrails = () => {
  return (
    <div className="bg-background flex flex-col md:flex-row h-screen w-full overflow-hidden text-on-background">
      

<aside className="hidden md:flex flex-col h-screen w-64 py-6 px-4 bg-slate-50 dark:bg-slate-900 shadow-[8px_0_24px_rgba(0,63,177,0.06)] sticky top-0 z-40">
<div className="mb-10 px-2">
<h1 className="text-xl font-bold tracking-tight text-blue-800 dark:text-blue-300 font-headline">HireFlow AI</h1>
<p className="text-[10px] uppercase tracking-widest text-slate-500 font-label mt-1">Command Center</p>
</div>
<nav className="flex-1 space-y-1">
<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors" href="#">
<span className="material-symbols-outlined text-xl">account_tree</span>
<span className="text-sm font-medium font-label">Workflow</span>
</a>
<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors" href="#">
<span className="material-symbols-outlined text-xl">calendar_today</span>
<span className="text-sm font-medium font-label">Timetable</span>
</a>
<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors" href="#">
<span className="material-symbols-outlined text-xl">event_upcoming</span>
<span className="text-sm font-medium font-label">Interviews</span>
</a>
<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors" href="#">
<span className="material-symbols-outlined text-xl">notification_important</span>
<span className="text-sm font-medium font-label">Alerts</span>
</a>
<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-blue-700 dark:text-blue-400 font-bold border-r-4 border-blue-700 bg-slate-100/50" href="#">
<span className="material-symbols-outlined text-xl">history_edu</span>
<span className="text-sm font-medium font-label">Timeline</span>
</a>
<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors" href="#">
<span className="material-symbols-outlined text-xl">analytics</span>
<span className="text-sm font-medium font-label">Insights</span>
</a>
</nav>
<div className="mt-auto pt-6 border-t border-slate-200/50 space-y-1">
<button className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-primary to-primary-container text-white py-2.5 rounded-lg text-sm font-bold shadow-md hover:opacity-90 active:scale-[0.98] transition-all mb-4">
<span className="material-symbols-outlined text-sm">add</span>
                New Candidate
            </button>
<a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors text-sm" href="#">
<span className="material-symbols-outlined text-xl">settings</span>
                Settings
            </a>
<a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors text-sm" href="#">
<span className="material-symbols-outlined text-xl">help</span>
                Support
            </a>
</div>
</aside>
<main className="flex-1 flex flex-col min-w-0">

<header className="flex justify-between items-center px-8 w-full sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md h-16 border-b-0">
<div className="flex items-center gap-8">
<div className="relative group">
<span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
<span className="material-symbols-outlined text-xl">search</span>
</span>
<input className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Search workflow events..." type="text"/>
</div>
<nav className="hidden lg:flex items-center gap-6">
<a className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-opacity" href="#">Dashboard</a>
<a className="text-sm font-medium text-blue-700 border-b-2 border-blue-700 pb-2" href="#">Candidates</a>
<a className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-opacity" href="#">Teams</a>
</nav>
</div>
<div className="flex items-center gap-4">
<button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
<span className="material-symbols-outlined">notifications</span>
<span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
</button>
<button className="bg-primary/5 text-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/10 transition-colors">
                    Schedule Interview
                </button>
<div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
<img className="w-full h-full object-cover" data-alt="professional portrait of a male HR executive in a clean modern office background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqln1V47KmtaoYDCPH-_aMKX9M8JJrFlSLVZiEuJwRd9gGAgt982eAaXx7xzheEgYdy4WxEb4OCEw3GAcapY6N2AeB_FKVDZ2_eH58_mBlrKJ_gPd6P6aA_ouO-maZUHmki9I5l2bfL1oK3-rR8PSdNHOTPVc-LkHyo4KjWNzTFkntO_Wr-B2CUBTmwU7V4ou7OMbizLwu8KcJStNFWFVkH3110hcr3r-X8DG2bhAveWQn79qT2iJPZnGXSvRSVcqu15wxoXPErCM"/>
</div>
</div>
</header>

<div className="p-8 max-w-7xl mx-auto w-full">

<div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
<div>
<div className="flex items-center gap-2 mb-2">
<span className="text-xs font-bold uppercase tracking-widest text-slate-400 font-label">Active Lifecycle Tracking</span>
<span className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-2 py-0.5 rounded-full text-[10px] font-bold uppercase">Safe Transition</span>
</div>
<h2 className="text-4xl font-extrabold text-on-surface font-headline tracking-tight">Elena Rodriguez</h2>
<p className="text-on-surface-variant mt-1">Senior Product Designer • <span className="font-semibold">Pipeline: Executive Hires</span></p>
</div>
<div className="flex gap-3">
<button className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-high rounded-lg text-sm font-semibold hover:bg-surface-variant transition-colors">
<span className="material-symbols-outlined text-lg">download</span>
                        Export Audit Log
                    </button>
<button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-bold shadow-lg hover:shadow-primary/20 transition-all">
<span className="material-symbols-outlined text-lg">edit</span>
                        Modify Workflow
                    </button>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

<div className="lg:col-span-12 bg-surface-container-lowest p-8 rounded-xl shadow-[0_8px_24px_rgba(0,63,177,0.04)]">
<div className="relative flex justify-between items-start">

<div className="absolute top-5 left-0 w-full h-0.5 timeline-path z-0 opacity-30"></div>
<div className="absolute top-5 left-0 h-0.5 bg-primary z-10 transition-all duration-1000" style={{"width":"66%"}}></div>

<div className="relative z-20 flex flex-col items-center gap-4 group">
<div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white ring-8 ring-primary/10">
<span className="material-symbols-outlined text-lg">check</span>
</div>
<div className="text-center">
<p className="text-xs font-bold uppercase tracking-tighter font-headline text-primary">Applied</p>
<p className="text-[10px] text-slate-400 font-label mt-0.5">Oct 12, 09:24</p>
</div>
</div>

<div className="relative z-20 flex flex-col items-center gap-4 group">
<div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white ring-8 ring-primary/10">
<span className="material-symbols-outlined text-lg">check</span>
</div>
<div className="text-center">
<p className="text-xs font-bold uppercase tracking-tighter font-headline text-primary">Screening</p>
<p className="text-[10px] text-slate-400 font-label mt-0.5">Oct 14, 14:15</p>
</div>
</div>

<div className="relative z-20 flex flex-col items-center gap-4 group">
<div className="w-10 h-10 rounded-full border-2 border-primary bg-white flex items-center justify-center text-primary ring-8 ring-primary/5">
<div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
</div>
<div className="text-center">
<p className="text-xs font-bold uppercase tracking-tighter font-headline text-on-surface">Interview</p>
<p className="text-[10px] text-slate-400 font-label mt-0.5">In Progress</p>
</div>
</div>

<div className="relative z-20 flex flex-col items-center gap-4 group">
<div className="w-10 h-10 rounded-full border-2 border-error-container bg-error-container/20 flex items-center justify-center text-error">
<span className="material-symbols-outlined text-lg" style={{"fontVariationSettings":"\\'FILL\\' 1"}}>warning</span>
</div>
<div className="text-center">
<p className="text-xs font-bold uppercase tracking-tighter font-headline text-error">Assessment</p>
<p className="text-[10px] text-error/60 font-label mt-0.5">Skipped Stage</p>
</div>

<div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-error text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
                                Policy Violation: Technical test missing
                            </div>
</div>

<div className="relative z-20 flex flex-col items-center gap-4 group opacity-40">
<div className="w-10 h-10 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center text-slate-300">
<span className="text-xs font-bold">05</span>
</div>
<div className="text-center">
<p className="text-xs font-bold uppercase tracking-tighter font-headline text-slate-400">Final Panel</p>
<p className="text-[10px] text-transparent font-label mt-0.5">.</p>
</div>
</div>

<div className="relative z-20 flex flex-col items-center gap-4 group opacity-40">
<div className="w-10 h-10 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center text-slate-300">
<span className="text-xs font-bold">06</span>
</div>
<div className="text-center">
<p className="text-xs font-bold uppercase tracking-tighter font-headline text-slate-400">Offer</p>
<p className="text-[10px] text-transparent font-label mt-0.5">.</p>
</div>
</div>
</div>
</div>

<div className="lg:col-span-8 flex flex-col gap-6">
<div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
<div className="flex justify-between items-center mb-6">
<h3 className="text-xl font-bold font-headline">Audit Trail &amp; Guardrails</h3>
<div className="flex gap-2">
<button className="text-xs font-bold px-3 py-1 bg-primary/10 text-primary rounded-full">All Events</button>
<button className="text-xs font-bold px-3 py-1 text-slate-400 hover:bg-slate-50 rounded-full transition-all">Human Action</button>
<button className="text-xs font-bold px-3 py-1 text-slate-400 hover:bg-slate-50 rounded-full transition-all">System</button>
</div>
</div>
<div className="space-y-8">

<div className="flex gap-4">
<div className="flex flex-col items-center">
<div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
<span className="material-symbols-outlined text-base">smart_toy</span>
</div>
<div className="w-0.5 h-full bg-slate-100 mt-2"></div>
</div>
<div className="pb-2">
<div className="flex items-center gap-2 mb-1">
<span className="text-sm font-bold">HireFlow AI Bot</span>
<span className="text-[10px] text-slate-400">• 2 hours ago</span>
</div>
<div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/20">
<p className="text-sm text-on-surface-variant leading-relaxed">System automatically verified <span className="font-semibold">Professional Certifications</span> against the resume. Verification: <span className="text-tertiary font-bold italic">SUCCESS</span>.</p>
</div>
</div>
</div>

<div className="flex gap-4">
<div className="flex flex-col items-center">
<div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
<span className="material-symbols-outlined text-base">person</span>
</div>
<div className="w-0.5 h-full bg-slate-100 mt-2"></div>
</div>
<div className="pb-2">
<div className="flex items-center gap-2 mb-1">
<span className="text-sm font-bold">Marcus Chen (Recruiter)</span>
<span className="text-[10px] text-slate-400">• Yesterday, 16:40</span>
</div>
<div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/20">
<p className="text-sm text-on-surface-variant leading-relaxed mb-3">Manually moved candidate from <span className="font-medium">Screening</span> to <span className="font-medium">Technical Interview</span>.</p>
<div className="flex items-start gap-3 p-3 bg-error-container/30 rounded-lg border border-error/10">
<span className="material-symbols-outlined text-error text-xl">info</span>
<div>
<p className="text-xs font-bold text-error uppercase tracking-wider mb-1">Invalid Transition Alert</p>
<p className="text-xs text-on-error-container">Workflow Guardrail: "Assessment Stage" must be completed or marked as 'waived' before proceeding. Action was logged as a <span className="underline">Deviation</span>.</p>
</div>
</div>
</div>
</div>
</div>

<div className="flex gap-4">
<div className="flex flex-col items-center">
<div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
<span className="material-symbols-outlined text-base">groups</span>
</div>
<div className="w-0.5 h-full bg-slate-100 mt-2"></div>
</div>
<div className="pb-2">
<div className="flex items-center gap-2 mb-1">
<span className="text-sm font-bold">Interview Panel (4 members)</span>
<span className="text-[10px] text-slate-400">• Oct 14, 11:00</span>
</div>
<div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/20">
<div className="flex items-center gap-4">
<div className="flex -space-x-2">
<img className="w-8 h-8 rounded-full border-2 border-white object-cover" data-alt="portrait of a female software architect in a professional setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAW62yty3PPGYZtfeYJptVvtWX98LJzDTe2xwwMWJY2lQkzVsne5WPboA_UfDrsSWCuc1WnVpNoJBU0KSt_vUW0HP7QkeuXtlf9LaI6DLG_3KfDpo7YF9ijSGOp1CmmR14FZJ2FWpNuOjUiZj7eFTd2sKDj8qOqwSDiWKJ5Ce3ketUC4OpSGbrTSM0oR9n457FtptmdBZoE2sFgbjCPhmkmX8TEqEcAwU7h7oa9zNct4JeR71rM1yh1Z57YE1-04gkTelAaANhYpo4"/>
<img className="w-8 h-8 rounded-full border-2 border-white object-cover" data-alt="portrait of a male engineering manager in a studio setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3Fp75YnSyIV4B2BezAUuawHTDxCcWizb6Q5UR866_KvExHZSlRMzh0SnEIsQHmZ1PxnuTKzXkNZ9rRy-S0Uk6q1zOG9oseV2odCbo5wxYZor3AcnUUXM7mAGmvBlHol7lnx3hKSHSBqYT8q11jT1lB8pS3InehPjC9OGqU7HECvh6Izp8P0ivQHk4nshlTfGidKlGiy8tqaP9ZO8T_wgG9S3Pje1b5L56XReEFxOs99cjwjzq6tF5xZerrWtUADbt2SNga9odSP8"/>
<div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold">+2</div>
</div>
<p className="text-sm text-on-surface-variant">Round 1: Technical Deep-Dive completed. Score: <span className="font-bold text-tertiary">4.5/5.0</span></p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>

<div className="lg:col-span-4 space-y-6">

<div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border-l-4 border-error">
<div className="flex items-center gap-3 mb-4">
<span className="material-symbols-outlined text-error" style={{"fontVariationSettings":"\\'FILL\\' 1"}}>security</span>
<h4 className="font-bold font-headline text-lg">Workflow Health</h4>
</div>
<div className="space-y-4">
<div className="flex justify-between text-sm">
<span className="text-slate-500">Compliance Rate</span>
<span className="font-bold text-error">82%</span>
</div>
<div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
<div className="bg-error h-full" style={{"width":"82%"}}></div>
</div>
<div className="p-3 bg-error/5 rounded-lg">
<p className="text-[11px] leading-tight text-on-error-container">
<span className="font-bold block mb-1">SYSTEM ALERT</span>
                                    Mandatory "DEI Review" stage is upcoming. This stage cannot be skipped or waived per enterprise policy (Policy ID: HR-409).
                                </p>
</div>
</div>
</div>

<div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
<div className="flex items-center gap-3 mb-4">
<span className="material-symbols-outlined text-primary">psychology</span>
<h4 className="font-bold font-headline text-lg">Predictive Path</h4>
</div>
<p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
                            Based on current trajectory and historical panel feedback, Elena has a <span className="font-bold text-primary">94% probability</span> of reaching the Final Decision stage.
                        </p>
<div className="flex flex-col gap-2">
<div className="flex items-center justify-between p-2 bg-white/50 rounded-lg">
<span className="text-xs font-medium">Est. Time to Hire</span>
<span className="text-xs font-bold">12 Days</span>
</div>
<div className="flex items-center justify-between p-2 bg-white/50 rounded-lg">
<span className="text-xs font-medium">Bot Confidence</span>
<span className="text-xs font-bold text-tertiary">High</span>
</div>
</div>
</div>

<div className="grid grid-cols-2 gap-3">
<button className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all group">
<span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors mb-2">pause_circle</span>
<span className="text-[10px] font-bold uppercase tracking-tight">Pause Flow</span>
</button>
<button className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all group">
<span className="material-symbols-outlined text-slate-400 group-hover:text-error transition-colors mb-2">cancel</span>
<span className="text-[10px] font-bold uppercase tracking-tight">Eject Path</span>
</button>
<button className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all group">
<span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors mb-2">share</span>
<span className="text-[10px] font-bold uppercase tracking-tight">Share Log</span>
</button>
<button className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all group">
<span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors mb-2">verified_user</span>
<span className="text-[10px] font-bold uppercase tracking-tight">Override</span>
</button>
</div>
</div>
</div>
</div>
</main>

    </div>
  );
};

export default CandidateTimelineGuardrails;
