import React from 'react';

const CandidateDetailView = () => {
  return (
    <>
      

<nav className="w-full sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-[0_8px_24px_rgba(26,86,219,0.06)] px-6 py-3 flex justify-between items-center">
<div className="flex items-center gap-8">
<span className="text-xl font-bold tracking-tight text-blue-800 dark:text-blue-300 font-headline">HireFlow AI</span>
<div className="hidden md:flex items-center gap-6 font-manrope text-sm font-medium">
<a className="text-slate-500 dark:text-slate-400 hover:bg-slate-50 transition-colors px-3 py-2 rounded-lg" href="#">Dashboard</a>
<a className="text-blue-700 dark:text-blue-400 font-semibold px-3 py-2 rounded-lg" href="#">Candidates</a>
<a className="text-slate-500 dark:text-slate-400 hover:bg-slate-50 transition-colors px-3 py-2 rounded-lg" href="#">Interviews</a>
</div>
</div>
<div className="flex items-center gap-4">
<div className="relative group">
<span className="material-symbols-outlined text-slate-500 cursor-pointer">notifications</span>
<span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full"></span>
</div>
<img alt="Recruiter Profile" className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-fixed" data-alt="Professional headshot of a recruitment manager in a bright modern office setting, smiling confidently at the camera" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDruTNwJQB9OpLv2Qdy2Jyi3ADE_NwwTzZu3Ztml9CKak_DjDGYWYfAnGtl3wLUeb2XeMUEbcEvzvUQdTlSHjyqHy1wyDdBpIy5OTMn9p89wJELOinthAWtdX_8OJeNXL8nV0VqN13Y83VuQg1bVYJK1QQ4TJo249gxLDdFYLRUfjip5lh6Xi_OwxkhG7n40eNjd3ONBY8IIGeTy6s90soxS2bu0TKE20nl1qMB4V6B1yzOhO4oUEh9BnCIrf6TcS-B9PtBnGoYEIY"/>
</div>
</nav>

<aside className="h-screen w-64 fixed left-0 top-0 z-50 bg-slate-50 dark:bg-slate-950 flex flex-col p-4 space-y-2 hidden lg:flex">
<div className="mb-8 px-2">
<h2 className="font-manrope font-extrabold text-blue-900 dark:text-blue-100 text-lg">Recruitment</h2>
<p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Command Center</p>
</div>
<div className="flex-grow space-y-1">
<a className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-blue-50/50 rounded-lg transition-all" href="#"><span className="material-symbols-outlined" data-icon="dashboard">dashboard</span> <span className="text-sm font-inter">Dashboard</span></a>
<a className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-blue-50/50 rounded-lg transition-all" href="#"><span className="material-symbols-outlined" data-icon="work">work</span> <span className="text-sm font-inter">Job Requirements</span></a>
<a className="flex items-center gap-3 px-4 py-3 bg-white text-blue-700 font-bold shadow-sm rounded-lg transition-all" href="#"><span className="material-symbols-outlined" data-icon="group">group</span> <span className="text-sm font-inter">Candidates</span></a>
<a className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-blue-50/50 rounded-lg transition-all" href="#"><span className="material-symbols-outlined" data-icon="event_repeat">event_repeat</span> <span className="text-sm font-inter">Interviews</span></a>
<a className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-blue-50/50 rounded-lg transition-all" href="#"><span className="material-symbols-outlined" data-icon="calendar_month">calendar_month</span> <span className="text-sm font-inter">Calendar</span></a>
<a className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-blue-50/50 rounded-lg transition-all" href="#"><span className="material-symbols-outlined" data-icon="warning">warning</span> <span className="text-sm font-inter">SLA Alerts</span></a>
<a className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-blue-50/50 rounded-lg transition-all" href="#"><span className="material-symbols-outlined" data-icon="analytics">analytics</span> <span className="text-sm font-inter">Reports</span></a>
<a className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-blue-50/50 rounded-lg transition-all" href="#"><span className="material-symbols-outlined" data-icon="settings">settings</span> <span className="text-sm font-inter">Settings</span></a>
</div>
<div className="mt-auto pt-4 border-t border-slate-200">
<a className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-blue-50/50 rounded-lg transition-all" href="#"><span className="material-symbols-outlined" data-icon="contact_support">contact_support</span> <span className="text-sm font-inter">Support</span></a>
<a className="flex items-center gap-3 px-4 py-3 text-error hover:bg-error-container rounded-lg transition-all" href="#"><span className="material-symbols-outlined" data-icon="logout">logout</span> <span className="text-sm font-inter">Log Out</span></a>
</div>
</aside>

<main className="lg:ml-64 min-h-screen p-6 lg:p-8 space-y-8">

<header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
<div className="flex items-start gap-6">
<div className="relative">
<img alt="Candidate Avatar" className="w-24 h-24 rounded-xl object-cover ambient-shadow border-4 border-white" data-alt="Portrait of a young professional man with a friendly expression, soft natural lighting, neutral studio background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIyGMrKWRLee6slG_noP-nnkpCF0x7WzsueSDvHk8ROXgR9s4cE7GjxRTgHUClc73X_R9WeefrBAIzsPv7ZFR4JIy34Y_2LesZB6T5biZZdYXS_q72_X4QybL_xXbiC_KysZ2NEH3-uAcWfN9zbIxoDijsbvBfAgR_K_nkQANLjV7LsifdMZnUDSZUWv9cZp7a9MFNH5DN1ukmpGeKNDovwsp9POPjvJPlU9z8PiCenjDyHXwfKZw9gu8HameYiSpjl45ZblSuHMw"/>
<div className="absolute -bottom-2 -right-2 bg-tertiary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">Verified</div>
</div>
<div className="space-y-1">
<div className="flex items-center gap-3">
<h1 className="text-3xl font-extrabold font-headline text-on-surface tracking-tight">Marcus Thorne</h1>
<span className="bg-error-container text-on-error-container text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-[12px]">schedule</span> SLA: 4H REMAINING
                        </span>
</div>
<p className="text-lg text-secondary font-medium">Senior Solutions Architect</p>
<div className="flex flex-wrap items-center gap-3 pt-2">
<span className="bg-primary-fixed text-on-primary-fixed text-xs font-semibold px-3 py-1 rounded-full">Technical Interview Stage</span>
<span className="bg-surface-container-highest text-on-surface-variant text-xs font-semibold px-3 py-1 rounded-full">Rank: #2 of 142</span>
<div className="flex items-center gap-1 text-primary font-bold text-sm">
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '\'FILL\' 1' }}>star</span>
                            94% AI Match Score
                        </div>
</div>
</div>
</div>
<div className="flex items-center gap-3">
<button className="px-6 py-3 rounded-lg bg-surface-container-high text-on-surface font-semibold text-sm hover:bg-surface-container-highest transition-colors">Archive</button>
<button className="px-8 py-3 rounded-lg primary-gradient text-white font-bold text-sm ambient-shadow active:scale-95 transition-all">Move to Offer</button>
</div>
</header>

<div className="grid grid-cols-12 gap-8">

<div className="col-span-12 lg:col-span-8 space-y-8">

<section className="bg-surface-container-lowest rounded-xl ambient-shadow overflow-hidden">
<div className="flex border-b border-outline-variant/20 px-6">
<button className="px-6 py-4 text-sm font-bold border-b-2 border-primary text-primary transition-all">Resume.pdf</button>
<button className="px-6 py-4 text-sm font-medium text-secondary hover:text-primary transition-all">ID_Proof.jpg</button>
<button className="px-6 py-4 text-sm font-medium text-secondary hover:text-primary transition-all">Portfolio_Link.web</button>
</div>
<div className="p-8 bg-surface-container-low min-h-[500px] flex flex-col items-center justify-center group relative cursor-zoom-in">
<div className="w-full max-w-2xl bg-white shadow-2xl rounded-sm p-12 space-y-6 transform group-hover:scale-[1.01] transition-transform duration-500">

<div className="h-8 w-1/3 bg-slate-100 rounded"></div>
<div className="space-y-2">
<div className="h-4 w-full bg-slate-50 rounded"></div>
<div className="h-4 w-full bg-slate-50 rounded"></div>
<div className="h-4 w-4/5 bg-slate-50 rounded"></div>
</div>
<div className="pt-8 space-y-4">
<div className="h-6 w-1/4 bg-slate-100 rounded"></div>
<div className="grid grid-cols-2 gap-4">
<div className="h-20 bg-slate-50 rounded"></div>
<div className="h-20 bg-slate-50 rounded"></div>
</div>
</div>
</div>

<div className="absolute top-12 right-12 glass-effect p-4 rounded-xl border border-white ambient-shadow max-w-xs">
<div className="flex items-center gap-2 mb-2 text-primary">
<span className="material-symbols-outlined text-sm">auto_awesome</span>
<span className="text-[10px] font-bold uppercase tracking-widest">AI Highlight</span>
</div>
<p className="text-xs text-on-surface leading-relaxed italic">"Candidate shows exceptional depth in Cloud-Native architectures with a proven 5-year track record at AWS."</p>
</div>
</div>
</section>

<section className="grid grid-cols-1 md:grid-cols-2 gap-6">

<div className="bg-surface-container-lowest p-6 rounded-xl ambient-shadow space-y-4">
<h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-primary">analytics</span> Skills Breakdown
                        </h3>
<div className="space-y-3">
<div>
<div className="flex justify-between text-[11px] font-bold mb-1 uppercase text-secondary">Hard Skills (Match: 98%)</div>
<div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-primary w-[98%] rounded-full"></div>
</div>
</div>
<div className="flex flex-wrap gap-2 pt-2">
<span className="bg-tertiary/10 text-tertiary text-[10px] font-bold px-2 py-1 rounded-full border border-tertiary/20">Kubernetes</span>
<span className="bg-tertiary/10 text-tertiary text-[10px] font-bold px-2 py-1 rounded-full border border-tertiary/20">GoLang</span>
<span className="bg-tertiary/10 text-tertiary text-[10px] font-bold px-2 py-1 rounded-full border border-tertiary/20">AWS (EKS/S3)</span>
<span className="bg-error-container text-error text-[10px] font-bold px-2 py-1 rounded-full border border-error/20">Rust (Gap)</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest p-6 rounded-xl ambient-shadow space-y-4">
<h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-primary">check_circle</span> Requirement Fit
                        </h3>
<ul className="space-y-3">
<li className="flex items-center gap-3 text-xs">
<span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: '\'FILL\' 1' }}>check_circle</span>
<span className="text-on-surface-variant">8+ Years Seniority</span>
</li>
<li className="flex items-center gap-3 text-xs">
<span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: '\'FILL\' 1' }}>check_circle</span>
<span className="text-on-surface-variant">Remote Eligibility (EST/PST)</span>
</li>
<li className="flex items-center gap-3 text-xs">
<span className="material-symbols-outlined text-error text-sm">warning</span>
<span className="text-on-surface-variant">Salary Expectation (5% Above Range)</span>
</li>
</ul>
</div>
</section>

<section className="bg-surface-container-lowest rounded-xl ambient-shadow p-6 space-y-6">
<div className="flex items-center justify-between">
<h3 className="font-headline font-bold text-lg">Recruiter Follow-up</h3>
<button className="text-primary text-xs font-bold hover:underline">+ New Note</button>
</div>
<div className="space-y-4">
<div className="flex gap-4 p-4 rounded-lg bg-surface-container-low border-l-4 border-primary">
<img alt="Recruiter" className="w-10 h-10 rounded-full object-cover" data-alt="Professional woman portrait with soft lighting, blurry office background, focused and professional look" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnGyXj2FP29HkbOvzbZzqHhrZsnntFejCgC0caDcX5x2s3vmivLf_aEIk3cHiNl1I5F5jBIDj8LSFOU5Q1FOn26LtTguo3sx2re6LQQR3DaDpi_uJWnh6tRZFM5gcl5dqI_mLS90R26gxaT9xiutpRqLzLpbnpB0jvlYhOIM-ug9Ahi6LKMSgZp4MGTr-ZUpMAWwA4jlVeKDg5ohLi0SlpudabvW_nj5rFCFd8or3VyoZhkEwh8N_xfVUdBx0acsl8AICjvUzQfw8"/>
<div className="space-y-1">
<div className="flex items-center gap-2">
<span className="text-xs font-bold">Sarah Jenkins</span>
<span className="text-[10px] text-secondary">2 hours ago</span>
</div>
<p className="text-sm text-on-surface-variant leading-relaxed">Spoke with Marcus regarding the Rust gap. He is willing to complete a 2-week intensive certification if selected. Very impressed by his culture fit during the initial screen.</p>
</div>
</div>
</div>
<div className="relative">
<textarea className="w-full bg-surface-container-low border-none rounded-xl text-sm p-4 focus:ring-2 focus:ring-primary min-h-[100px]" placeholder="Type a follow-up or internal note..."></textarea>
<div className="absolute bottom-3 right-3 flex items-center gap-2">
<span className="material-symbols-outlined text-secondary cursor-pointer hover:text-primary">attach_file</span>
<span className="material-symbols-outlined text-secondary cursor-pointer hover:text-primary">alternate_email</span>
<button className="bg-primary text-white p-2 rounded-lg"><span className="material-symbols-outlined">send</span></button>
</div>
</div>
</section>
</div>

<div className="col-span-12 lg:col-span-4 space-y-8">

<div className="primary-gradient p-1 rounded-2xl ambient-shadow">
<div className="bg-white rounded-[calc(1rem-2px)] p-6 space-y-6">
<div className="bg-primary/10 inline-flex p-3 rounded-xl mb-2">
<span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: '\'FILL\' 1' }}>bolt</span>
</div>
<div className="space-y-2">
<h2 className="font-headline font-extrabold text-xl text-on-surface">Next Best Action</h2>
<p className="text-sm font-bold text-primary">Schedule Deep-Dive Architecture Interview</p>
</div>
<div className="space-y-4 pt-2">
<div className="flex items-start gap-3">
<span className="material-symbols-outlined text-tertiary text-sm">info</span>
<div className="space-y-1">
<p className="text-[10px] font-bold uppercase tracking-widest text-secondary">The Logic</p>
<p className="text-xs text-on-surface-variant">Thorne matches 94% of core technical competencies. Early conversion increases closing probability by 40%.</p>
</div>
</div>
<div className="flex items-start gap-3">
<span className="material-symbols-outlined text-error text-sm">priority_high</span>
<div className="space-y-1">
<p className="text-[10px] font-bold uppercase tracking-widest text-error">The Risk</p>
<p className="text-xs text-on-surface-variant">Candidate is currently in final rounds with "Competitor X". Delaying 48h risks withdrawal.</p>
</div>
</div>
</div>
<button className="w-full py-4 primary-gradient text-white font-bold rounded-xl text-sm tracking-wide active:scale-95 transition-all">
                            Send Interview Invite
                        </button>
</div>
</div>

<section className="bg-surface-container-highest/30 backdrop-blur-sm p-6 rounded-xl border border-white/50 space-y-4">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary">psychology</span>
<span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Intelligence Suggestion</span>
</div>
<p className="text-sm font-medium text-on-surface leading-relaxed">
                        "Consider offering a sign-on bonus tied to Rust certification completion. This bridges the skill gap while securing a top-tier candidate in a tight market."
                    </p>
</section>

<section className="bg-surface-container-lowest p-6 rounded-xl ambient-shadow space-y-6">
<h3 className="text-sm font-bold text-on-surface">Candidate Journey</h3>
<div className="relative space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-surface-container-high">

<div className="relative pl-8">
<div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-tertiary flex items-center justify-center text-white">
<span className="material-symbols-outlined text-[14px]">check</span>
</div>
<div className="space-y-1">
<p className="text-xs font-bold text-on-surface">Application Received</p>
<p className="text-[10px] text-secondary">Oct 12, 2023 • 09:15 AM</p>
</div>
</div>

<div className="relative pl-8">
<div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-tertiary flex items-center justify-center text-white">
<span className="material-symbols-outlined text-[14px]">check</span>
</div>
<div className="space-y-1">
<p className="text-xs font-bold text-on-surface">AI Screening Passed</p>
<p className="text-[10px] text-secondary">Oct 12, 2023 • 09:42 AM</p>
</div>
</div>

<div className="relative pl-8">
<div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white ring-4 ring-primary-fixed">
<span className="material-symbols-outlined text-[14px]">bolt</span>
</div>
<div className="space-y-1">
<p className="text-xs font-bold text-primary">Technical Assessment</p>
<p className="text-[10px] text-secondary">Oct 14, 2023 • 02:00 PM</p>
<span className="inline-block mt-2 bg-error-container text-error text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 w-fit">
<span className="material-symbols-outlined text-[12px]">warning</span> SLA RISK: Pending Review
                                </span>
</div>
</div>

<div className="relative pl-8">
<div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center text-slate-400">
<span className="material-symbols-outlined text-[14px]">circle</span>
</div>
<div className="space-y-1">
<p className="text-xs font-medium text-slate-400">Final Culture Interview</p>
<p className="text-[10px] text-slate-400">Upcoming</p>
</div>
</div>
</div>
</section>

<div className="bg-surface-container-high/50 p-6 rounded-xl space-y-4">
<h4 className="text-[10px] font-bold uppercase tracking-widest text-secondary">Internal Progress</h4>
<div className="space-y-3">
<div className="flex items-center justify-between text-xs">
<span className="text-on-surface-variant">Profile Completeness</span>
<span className="font-bold">100%</span>
</div>
<div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-tertiary w-full"></div>
</div>
<div className="flex items-center justify-between text-xs pt-2">
<span className="text-on-surface-variant">Hiring Manager Feedback</span>
<span className="font-bold text-error">Missing</span>
</div>
</div>
</div>
</div>
</div>
</main>

<div className="fixed bottom-8 right-8 lg:hidden">
<button className="w-14 h-14 primary-gradient text-white rounded-full flex items-center justify-center ambient-shadow active:scale-95 transition-transform">
<span className="material-symbols-outlined">add</span>
</button>
</div>

    </>
  );
};

export default CandidateDetailView;