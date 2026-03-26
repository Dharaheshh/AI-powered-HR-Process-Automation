import React from 'react';

const HireflowAiRecruitmentPlatform = () => {
  return (
    <div className="bg-background flex flex-col md:flex-row h-screen w-full overflow-hidden text-on-background">
      

<aside className="h-screen w-64 fixed left-0 top-0 bg-[#f3f3fe] flex flex-col p-4 z-40">
<div className="mb-10 px-2 flex items-center gap-3">
<div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
<span className="material-symbols-outlined text-white" style={{"fontVariationSettings":"\\'FILL\\' 1"}}>fluid</span>
</div>
<div>
<h1 className="text-lg font-black text-[#003fb1] font-headline">HireFlow AI</h1>
<p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Command Center</p>
</div>
</div>
<button className="mb-8 w-full bg-gradient-to-br from-primary to-primary-container text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 ambient-shadow hover:scale-[0.98] transition-transform">
<span className="material-symbols-outlined text-sm">add</span>
<span>Post New Job</span>
</button>
<nav className="flex-1 space-y-1">

<a className="flex items-center gap-3 bg-white text-[#003fb1] shadow-sm rounded-lg px-4 py-3 active-nav-glow transition-all duration-200" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"\\'FILL\\' 1"}}>dashboard</span>
<span className="text-sm font-medium uppercase tracking-wider">Dashboard</span>
</a>
<a className="flex items-center gap-3 text-slate-600 hover:bg-slate-200/50 rounded-lg px-4 py-3 transition-all duration-200" href="#">
<span className="material-symbols-outlined">work</span>
<span className="text-sm font-medium uppercase tracking-wider font-label">Job Requirements</span>
</a>
<a className="flex items-center gap-3 text-slate-600 hover:bg-slate-200/50 rounded-lg px-4 py-3 transition-all duration-200" href="#">
<span className="material-symbols-outlined">group</span>
<span className="text-sm font-medium uppercase tracking-wider font-label">Candidates</span>
</a>
<a className="flex items-center gap-3 text-slate-600 hover:bg-slate-200/50 rounded-lg px-4 py-3 transition-all duration-200" href="#">
<span className="material-symbols-outlined">event_repeat</span>
<span className="text-sm font-medium uppercase tracking-wider font-label">Interviews</span>
</a>
<a className="flex items-center gap-3 text-slate-600 hover:bg-slate-200/50 rounded-lg px-4 py-3 transition-all duration-200" href="#">
<span className="material-symbols-outlined">calendar_today</span>
<span className="text-sm font-medium uppercase tracking-wider font-label">Calendar</span>
</a>
<a className="flex items-center gap-3 text-slate-600 hover:bg-slate-200/50 rounded-lg px-4 py-3 transition-all duration-200" href="#">
<span className="material-symbols-outlined">notification_important</span>
<span className="text-sm font-medium uppercase tracking-wider font-label">SLA Alerts</span>
</a>
<a className="flex items-center gap-3 text-slate-600 hover:bg-slate-200/50 rounded-lg px-4 py-3 transition-all duration-200" href="#">
<span className="material-symbols-outlined">analytics</span>
<span className="text-sm font-medium uppercase tracking-wider font-label">Reports</span>
</a>
<a className="flex items-center gap-3 text-slate-600 hover:bg-slate-200/50 rounded-lg px-4 py-3 transition-all duration-200" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="text-sm font-medium uppercase tracking-wider font-label">Settings</span>
</a>
</nav>
<div className="pt-6 border-t border-slate-200 space-y-1">
<a className="flex items-center gap-3 text-slate-600 hover:bg-slate-200/50 rounded-lg px-4 py-2 transition-all duration-200" href="#">
<span className="material-symbols-outlined">help</span>
<span className="text-xs font-medium uppercase tracking-wider">Help Center</span>
</a>
<a className="flex items-center gap-3 text-slate-600 hover:bg-slate-200/50 rounded-lg px-4 py-2 transition-all duration-200" href="#">
<span className="material-symbols-outlined">logout</span>
<span className="text-xs font-medium uppercase tracking-wider">Log Out</span>
</a>
</div>
</aside>

<header className="ml-64 bg-white/80 backdrop-blur-md sticky top-0 z-30 px-8 py-4 flex justify-between items-center shadow-[0_8px_24px_rgba(25,27,35,0.06)]">
<div className="flex items-center gap-4 bg-surface-container-low px-4 py-2 rounded-xl w-96">
<span className="material-symbols-outlined text-slate-400">search</span>
<input className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-slate-400" placeholder="Search candidates, jobs, or actions..." type="text"/>
</div>
<div className="flex items-center gap-6">
<div className="flex items-center gap-4">
<button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors relative">
<span className="material-symbols-outlined">notifications</span>
<span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
</button>
<button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">
<span className="material-symbols-outlined">history_edu</span>
</button>
<button className="text-slate-500 text-sm font-medium hover:text-primary transition-colors px-2">Support</button>
</div>
<div className="h-8 w-[1px] bg-slate-200"></div>
<div className="flex items-center gap-3">
<div className="text-right">
<p className="text-sm font-bold text-on-surface leading-none">Alex Rivera</p>
<p className="text-[10px] text-slate-500 uppercase tracking-tighter">Senior Recruiter</p>
</div>
<img alt="Recruiter Profile Avatar" className="w-10 h-10 rounded-full object-cover ring-2 ring-primary-fixed" data-alt="Close-up professional portrait of a male recruiter with a friendly expression in a brightly lit office setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXK35tLJu4tGuvu0r2eyWc8v8xkJ43SxwYVXMANQwFze5b93d1glSUqrVxJeBL3d9vZdAeD0iWX3Li1v4LzYLeCOxcYkGDVhzoOg-_nzH3BWnk1DkRraxjEYBgWmPYe8BL3_t0ThPne_jLvQbFfdyuDRpVfApPggRzoqF-rtkbezefzgKwHaKZ26YaImkMZkEer2F5wPRe6VqsCbFyG4xJL4ysS1tAbnvUoSGwfO_At6vBTtsEVYT6RbDnGekxUOWy7W-MTGBEV4A"/>
</div>
</div>
</header>

<main className="ml-64 p-8 min-h-screen">

<div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<h2 className="text-4xl font-extrabold font-headline text-on-surface tracking-tight">Hiring Command</h2>
<p className="text-slate-500 font-medium mt-1">Ready to scale. You have <span className="text-primary font-bold">12 urgent actions</span> today.</p>
</div>
<div className="flex gap-3">
<div className="bg-white p-3 rounded-xl ambient-shadow flex items-center gap-3">
<div className="w-10 h-10 bg-tertiary-fixed flex items-center justify-center rounded-lg">
<span className="material-symbols-outlined text-on-tertiary-fixed-variant">trending_up</span>
</div>
<div>
<p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Global Status</p>
<p className="text-sm font-bold text-tertiary">Healthy Performance</p>
</div>
</div>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
<div className="bg-surface-container-lowest p-6 rounded-2xl ambient-shadow border-l-4 border-primary">
<p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Applicants</p>
<h3 className="text-3xl font-extrabold font-headline">1,402</h3>
<div className="mt-4 flex items-center gap-2 text-xs font-semibold text-tertiary">
<span className="material-symbols-outlined text-sm">arrow_upward</span>
<span>12% from last week</span>
</div>
</div>
<div className="bg-surface-container-lowest p-6 rounded-2xl ambient-shadow border-l-4 border-primary-container">
<p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Shortlisted</p>
<h3 className="text-3xl font-extrabold font-headline">84</h3>
<div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-500">
<span className="material-symbols-outlined text-sm">remove</span>
<span>Steady pace</span>
</div>
</div>
<div className="bg-surface-container-lowest p-6 rounded-2xl ambient-shadow border-l-4 border-secondary">
<p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Interviews</p>
<h3 className="text-3xl font-extrabold font-headline">18</h3>
<div className="mt-4 flex items-center gap-2 text-xs font-semibold text-primary">
<span className="material-symbols-outlined text-sm">event</span>
<span>6 scheduled for today</span>
</div>
</div>
<div className="bg-surface-container-lowest p-6 rounded-2xl ambient-shadow border-l-4 border-error">
<p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Pending Actions</p>
<h3 className="text-3xl font-extrabold font-headline text-error">12</h3>
<div className="mt-4 flex items-center gap-2 text-xs font-semibold text-error">
<span className="material-symbols-outlined text-sm">warning</span>
<span>4 Critical SLA breaches</span>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

<div className="lg:col-span-8 space-y-8">

<section className="bg-surface-container-lowest rounded-3xl p-8 ambient-shadow relative overflow-hidden">
<div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
<div className="flex justify-between items-center mb-6">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary" style={{"fontVariationSettings":"\\'FILL\\' 1"}}>stars</span>
<h4 className="text-xl font-bold font-headline">High-Match Candidates Pending</h4>
</div>
<a className="text-sm font-semibold text-primary hover:underline" href="#">View all</a>
</div>
<div className="space-y-4">

<div className="group flex items-center justify-between p-4 rounded-2xl hover:bg-surface-container-low transition-colors duration-200">
<div className="flex items-center gap-4">
<img alt="Candidate" className="w-12 h-12 rounded-xl object-cover" data-alt="Headshot of a confident young professional woman smiling in a neutral studio background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDydutBsWtCo6xzj5RYZFm5vnGvSsoGokbKT0GtIday7OymS_ARYPX7hn7J7iHh9eXw1wH86ATUT7KpOJgR2KltbxmUqw-No-KSmtqi4SfHfgv5827wVtuTxttOFjA3H97TNVo4Cvjdh-qH5xWszRwx635j1DPo1L1-S3991Ifv1VtvKiHTuTmR9NCOfPeFjWCtiYuUUYwURmzqpTNpFVU9U86QGXn662KCgwZ0PfTGn1j0fAqxUWsdnSqd32DrAFrpjWm7WzkSt_8"/>
<div>
<h5 className="font-bold text-on-surface">Elena Soros</h5>
<p className="text-sm text-slate-500">Senior Product Designer • 98% AI Match</p>
</div>
</div>
<div className="flex items-center gap-6">
<div className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full text-[10px] font-black uppercase tracking-widest">Top 1%</div>
<button className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-primary-container transition-colors">Screen Now</button>
</div>
</div>

<div className="group flex items-center justify-between p-4 rounded-2xl hover:bg-surface-container-low transition-colors duration-200">
<div className="flex items-center gap-4">
<img alt="Candidate" className="w-12 h-12 rounded-xl object-cover" data-alt="Portrait of a male software engineer with glasses looking thoughtful in a modern tech office" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfK4_wLpwsSIMqp5RFL-thpbN1VhYTjwE8Ev4ensdBjFNVhSFFPudDzq94DNhdMLvEpax6Dg8wC0VNvogEzLNzxRVbayaBo0JownrGT-eZkWrGuKE9HnbZZx_ehXe-bqR1IOQJtiKLQvVXm7_FDJRHDndQJtGLfWHM7a5J2LYsjEHgwWGnYA7jqAxonoUXtG7qi0ZptDI4DlnmtoWyeFYc2IYswgTVwhhS_X4tKgb51UwkpwnW31wW28sih5VhaXY3YRQgYfXzdeU"/>
<div>
<h5 className="font-bold text-on-surface">Marcus Chen</h5>
<p className="text-sm text-slate-500">Full Stack Engineer • 94% AI Match</p>
</div>
</div>
<div className="flex items-center gap-6">
<div className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-black uppercase tracking-widest">Fast Track</div>
<button className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-primary-container transition-colors">Screen Now</button>
</div>
</div>

<div className="group flex items-center justify-between p-4 rounded-2xl hover:bg-surface-container-low transition-colors duration-200">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-400">JS</div>
<div>
<h5 className="font-bold text-on-surface">Jordan Smith</h5>
<p className="text-sm text-slate-500">Marketing Lead • 91% AI Match</p>
</div>
</div>
<div className="flex items-center gap-6">
<div className="px-3 py-1 bg-surface-container-highest text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest">Available</div>
<button className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-primary-container transition-colors">Screen Now</button>
</div>
</div>
</div>
</section>

<section className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="bg-white p-6 rounded-3xl ambient-shadow flex flex-col justify-between">
<div>
<div className="flex items-center gap-2 mb-4">
<span className="material-symbols-outlined text-primary">format_list_bulleted</span>
<h4 className="font-bold font-headline uppercase text-xs tracking-widest text-slate-400">Recruiter Action Debt</h4>
</div>
<p className="text-2xl font-bold mb-1">Feedback Loop</p>
<p className="text-sm text-slate-500">8 interview assessments are past their 24h review deadline.</p>
</div>
<button className="mt-6 w-full py-3 bg-surface-container-low text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all">Clear Queue</button>
</div>
<div className="bg-white p-6 rounded-3xl ambient-shadow flex flex-col justify-between border-2 border-primary-fixed">
<div>
<div className="flex items-center gap-2 mb-4">
<span className="material-symbols-outlined text-primary" style={{"fontVariationSettings":"\\'FILL\\' 1"}}>bolt</span>
<h4 className="font-bold font-headline uppercase text-xs tracking-widest text-slate-400">Next Best Action</h4>
</div>
<p className="text-2xl font-bold mb-1">Extend Offer</p>
<p className="text-sm text-slate-500">Sarah Jenkins (Frontend Dev) has completed all stages. Final sign-off ready.</p>
</div>
<button className="mt-6 w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-container ambient-shadow transition-all">Action Now</button>
</div>
</section>

<section className="bg-white rounded-3xl p-8 ambient-shadow">
<div className="flex items-center justify-between mb-8">
<h4 className="text-xl font-bold font-headline">Hiring Pipeline Overview</h4>
<div className="flex gap-2">
<button className="px-3 py-1 text-xs font-bold bg-primary text-white rounded-lg">Active Jobs</button>
<button className="px-3 py-1 text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-lg">Historical</button>
</div>
</div>
<div className="flex items-end justify-between h-48 gap-4 px-4">
<div className="flex-1 flex flex-col items-center gap-2">
<div className="w-full bg-slate-100 rounded-t-xl relative h-[100%]">
<div className="absolute bottom-0 w-full bg-primary rounded-t-xl h-[85%]"></div>
</div>
<span className="text-[10px] font-bold text-slate-400 uppercase">Sourcing</span>
</div>
<div className="flex-1 flex flex-col items-center gap-2">
<div className="w-full bg-slate-100 rounded-t-xl relative h-[100%]">
<div className="absolute bottom-0 w-full bg-primary/80 rounded-t-xl h-[60%]"></div>
</div>
<span className="text-[10px] font-bold text-slate-400 uppercase">Screen</span>
</div>
<div className="flex-1 flex flex-col items-center gap-2">
<div className="w-full bg-slate-100 rounded-t-xl relative h-[100%]">
<div className="absolute bottom-0 w-full bg-primary/60 rounded-t-xl h-[35%]"></div>
</div>
<span className="text-[10px] font-bold text-slate-400 uppercase">Technical</span>
</div>
<div className="flex-1 flex flex-col items-center gap-2">
<div className="w-full bg-slate-100 rounded-t-xl relative h-[100%]">
<div className="absolute bottom-0 w-full bg-primary/40 rounded-t-xl h-[15%]"></div>
</div>
<span className="text-[10px] font-bold text-slate-400 uppercase">Final</span>
</div>
<div className="flex-1 flex flex-col items-center gap-2">
<div className="w-full bg-slate-100 rounded-t-xl relative h-[100%]">
<div className="absolute bottom-0 w-full bg-tertiary rounded-t-xl h-[8%]"></div>
</div>
<span className="text-[10px] font-bold text-slate-400 uppercase">Offered</span>
</div>
</div>
</section>
</div>

<div className="lg:col-span-4 space-y-8">

<section className="bg-error-container/20 border border-error/10 rounded-3xl p-6">
<div className="flex items-center gap-2 mb-6">
<span className="material-symbols-outlined text-error" style={{"fontVariationSettings":"\\'FILL\\' 1"}}>timer</span>
<h4 className="text-sm font-black uppercase tracking-widest text-error">SLA Countdown</h4>
</div>
<div className="space-y-4">
<div className="bg-white p-4 rounded-2xl flex items-center justify-between border-l-4 border-error">
<div>
<p className="text-xs font-bold text-on-surface">Data Engineer Pitch</p>
<p className="text-[10px] text-slate-400">Response required for David L.</p>
</div>
<div className="text-right">
<p className="text-sm font-black text-error">2h 15m</p>
<p className="text-[8px] uppercase tracking-tighter text-slate-400">Left to act</p>
</div>
</div>
<div className="bg-white p-4 rounded-2xl flex items-center justify-between border-l-4 border-error">
<div>
<p className="text-xs font-bold text-on-surface">QA Lead Assessment</p>
<p className="text-[10px] text-slate-400">Review pending for 3 candidates</p>
</div>
<div className="text-right">
<p className="text-sm font-black text-error">4h 02m</p>
<p className="text-[8px] uppercase tracking-tighter text-slate-400">Left to act</p>
</div>
</div>
<div className="bg-white/50 p-4 rounded-2xl flex items-center justify-between border-l-4 border-warning-container opacity-60">
<div>
<p className="text-xs font-bold text-slate-400">Executive Search</p>
<p className="text-[10px] text-slate-400">On-boarding sync</p>
</div>
<div className="text-right">
<p className="text-sm font-black text-slate-400">EXPIRED</p>
</div>
</div>
</div>
<button className="mt-6 w-full py-2 text-error text-xs font-black uppercase tracking-widest hover:bg-error/5 rounded-xl transition-colors">View All Breaches</button>
</section>

<section className="bg-white rounded-3xl p-6 ambient-shadow">
<h4 className="text-lg font-bold font-headline mb-4">Bottleneck Insights</h4>
<div className="space-y-6">
<div className="flex items-start gap-4">
<div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-on-secondary-fixed-variant text-xl">hourglass_bottom</span>
</div>
<div>
<p className="text-sm font-bold">Tech Interview Latency</p>
<p className="text-xs text-slate-500 mt-1">Hiring managers in <span className="text-on-surface font-semibold">DevOps</span> take 4.2 days longer than average to schedule.</p>
</div>
</div>
<div className="flex items-start gap-4">
<div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-on-primary-fixed-variant text-xl">chat_error</span>
</div>
<div>
<p className="text-sm font-bold">Candidate Drop-off</p>
<p className="text-xs text-slate-500 mt-1">High abandonment rate at the <span className="text-on-surface font-semibold">Coding Challenge</span> stage for Senior roles.</p>
</div>
</div>
</div>
</section>

<section className="bg-white rounded-3xl p-6 ambient-shadow">
<h4 className="text-lg font-bold font-headline mb-4">Recent Activity</h4>
<div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
<div className="relative">
<div className="absolute -left-[23px] top-1 w-[18px] h-[18px] rounded-full bg-tertiary border-4 border-white"></div>
<p className="text-xs font-bold">Offer Accepted</p>
<p className="text-[10px] text-slate-500">Michael Ross just joined as UX Designer.</p>
<p className="text-[9px] text-slate-400 mt-1">12 minutes ago</p>
</div>
<div className="relative">
<div className="absolute -left-[23px] top-1 w-[18px] h-[18px] rounded-full bg-primary border-4 border-white"></div>
<p className="text-xs font-bold">New Top Match</p>
<p className="text-[10px] text-slate-500">Elena Soros applied for Senior Product Lead.</p>
<p className="text-[9px] text-slate-400 mt-1">1 hour ago</p>
</div>
<div className="relative">
<div className="absolute -left-[23px] top-1 w-[18px] h-[18px] rounded-full bg-slate-300 border-4 border-white"></div>
<p className="text-xs font-bold">Interview Completed</p>
<p className="text-[10px] text-slate-500">Technical round for Jordan Smith finished.</p>
<p className="text-[9px] text-slate-400 mt-1">3 hours ago</p>
</div>
</div>
</section>
</div>
</div>
</main>

<button className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-white rounded-full ambient-shadow flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
<span className="material-symbols-outlined text-3xl" style={{"fontVariationSettings":"\\'FILL\\' 1"}}>bolt</span>
</button>

    </div>
  );
};

export default HireflowAiRecruitmentPlatform;
