import React from 'react';

const CandidateSubmissionList = () => {
  return (
    <div className="bg-background flex flex-col md:flex-row h-screen w-full overflow-hidden text-on-background">
      

<aside className="h-screen w-64 fixed left-0 top-0 z-50 bg-slate-50 dark:bg-slate-950 flex flex-col p-4 space-y-2">
<div className="px-2 mb-8 mt-2">
<h1 className="font-manrope font-extrabold text-blue-900 dark:text-blue-100 text-xl tracking-tight">HireFlow AI</h1>
<p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold mt-1">Command Center</p>
</div>
<nav className="flex-1 space-y-1">
<a className="flex items-center px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all duration-300 rounded-lg group" href="#">
<span className="material-symbols-outlined mr-3 text-lg" data-icon="dashboard">dashboard</span>
<span className="font-inter text-sm tracking-wide">Dashboard</span>
</a>
<a className="flex items-center px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-300 rounded-lg group" href="#">
<span className="material-symbols-outlined mr-3 text-lg" data-icon="work">work</span>
<span className="font-inter text-sm tracking-wide">Job Requirements</span>
</a>
<a className="flex items-center px-3 py-2 bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 font-bold shadow-sm rounded-lg group" href="#">
<span className="material-symbols-outlined mr-3 text-lg" data-icon="group">group</span>
<span className="font-inter text-sm tracking-wide">Candidates</span>
</a>
<a className="flex items-center px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-300 rounded-lg group" href="#">
<span className="material-symbols-outlined mr-3 text-lg" data-icon="event_repeat">event_repeat</span>
<span className="font-inter text-sm tracking-wide">Interviews</span>
</a>
<a className="flex items-center px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-300 rounded-lg group" href="#">
<span className="material-symbols-outlined mr-3 text-lg" data-icon="calendar_month">calendar_month</span>
<span className="font-inter text-sm tracking-wide">Calendar</span>
</a>
<a className="flex items-center px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-300 rounded-lg group" href="#">
<span className="material-symbols-outlined mr-3 text-lg" data-icon="warning">warning</span>
<span className="font-inter text-sm tracking-wide">SLA Alerts</span>
</a>
<a className="flex items-center px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-300 rounded-lg group" href="#">
<span className="material-symbols-outlined mr-3 text-lg" data-icon="analytics">analytics</span>
<span className="font-inter text-sm tracking-wide">Reports</span>
</a>
<a className="flex items-center px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-300 rounded-lg group" href="#">
<span className="material-symbols-outlined mr-3 text-lg" data-icon="settings">settings</span>
<span className="font-inter text-sm tracking-wide">Settings</span>
</a>
</nav>
<div className="mt-auto pt-4 border-t border-slate-200/60 dark:border-slate-800">
<button className="w-full mb-4 bg-gradient-to-br from-primary to-primary-container text-white py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                Post New Job
            </button>
<a className="flex items-center px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors" href="#">
<span className="material-symbols-outlined mr-3 text-lg" data-icon="contact_support">contact_support</span>
<span className="font-inter text-sm">Support</span>
</a>
<a className="flex items-center px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-error transition-colors" href="#">
<span className="material-symbols-outlined mr-3 text-lg" data-icon="logout">logout</span>
<span className="font-inter text-sm">Log Out</span>
</a>
</div>
</aside>

<header className="w-full sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex justify-between items-center px-6 py-3 ml-64 max-w-[calc(100%-16rem)] shadow-[0_8px_24px_rgba(26,86,219,0.06)]">
<div className="flex items-center flex-1 max-w-md">
<div className="relative w-full">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" data-icon="search">search</span>
<input className="w-full bg-surface-container-low border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 font-inter outline-none" placeholder="Search candidates, skills, or locations..." type="text"/>
</div>
</div>
<div className="flex items-center space-x-4">
<button className="p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors relative">
<span className="material-symbols-outlined" data-icon="notifications">notifications</span>
<span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
</button>
<button className="p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
<span className="material-symbols-outlined" data-icon="help">help</span>
</button>
<div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
<div className="flex items-center space-x-3">
<div className="text-right">
<p className="text-sm font-bold text-on-surface">Alex Rivera</p>
<p className="text-[10px] text-slate-500 font-medium">Senior Recruiter</p>
</div>
<img alt="Recruiter Profile" className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/10" data-alt="Close-up professional headshot of a smiling male recruiter in business casual attire with soft studio lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCguvR6qdYZXuEHdjzB3uMt2h-vKKY9K4E5kZROncFjrioyj1tW1a7rwEceQLEEA7vWCgcEDmE9DsWsN5QcewO9psZrQZJX5EQ_eD1lu1bfpRoE_S0bIyQIyf2jX0I4kwgwvtGtNiaiDAiUj6XQ6vmUA4bkMPv4TlpixzmnTBCYctoXWvMgv85-m0s9qpAEyvPL-_PYByLfkWRy2PfiQRu-XyFzu8Wa02Ds8_JZnGlEkGADZhgBJ_leAC33E4-mhbd5v5MMkWF1fG0"/>
</div>
</div>
</header>

<main className="ml-64 p-6 min-h-[calc(100vh-64px)] flex gap-6">

<section className="flex-1 flex flex-col space-y-6">

<div className="flex flex-col space-y-4">
<div className="flex justify-between items-end">
<div>
<h2 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight">Active Candidates</h2>
<p className="font-body text-sm text-on-surface-variant mt-1">Found 42 qualified matches for <span className="text-primary font-semibold">Senior Product Designer</span></p>
</div>
<div className="flex items-center space-y-0 space-x-3">
<button className="flex items-center px-4 py-2 bg-surface-container-low text-on-surface text-sm font-semibold rounded-xl hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined mr-2 text-lg" data-icon="sort">sort</span>
                            Rank by Match %
                        </button>
</div>
</div>
<div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2">
<button className="px-4 py-1.5 bg-primary text-white rounded-full text-xs font-bold shadow-md shadow-primary/20">All Stages</button>
<button className="px-4 py-1.5 bg-white text-on-surface-variant border border-outline-variant/30 rounded-full text-xs font-semibold hover:border-primary/50 transition-colors">Screening (12)</button>
<button className="px-4 py-1.5 bg-white text-on-surface-variant border border-outline-variant/30 rounded-full text-xs font-semibold hover:border-primary/50 transition-colors">Technical (8)</button>
<button className="px-4 py-1.5 bg-white text-on-surface-variant border border-outline-variant/30 rounded-full text-xs font-semibold hover:border-primary/50 transition-colors">Culture Fit (4)</button>
<div className="h-6 w-[1px] bg-outline-variant mx-2"></div>
<button className="px-4 py-1.5 bg-error-container text-on-error-container rounded-full text-xs font-bold">High Urgency (5)</button>
<button className="px-4 py-1.5 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full text-xs font-bold">Top Match (90%+)</button>
</div>
</div>

<div className="flex flex-col space-y-4">

<div className="group bg-surface-container-lowest ambient-shadow rounded-xl p-5 border-l-4 border-error flex items-center gap-6 cursor-pointer hover:bg-primary-fixed/5 transition-all duration-300">
<div className="flex items-center gap-4 min-w-[280px]">
<img alt="Candidate" className="w-14 h-14 rounded-full object-cover" data-alt="Portrait of a young professional woman with a confident expression in a bright modern office environment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxRmoeTnQNlb8FMJ6dfviI8vkeZtn9aHLs3wAhfn5GDQ-962cLl9uNkVnfBhXsz4-YVCffFw9qd-hDxzY9idAqfPzvvyftpDp4l4LGWdd6z9z0guQiiJ1n1kBUj_TqDeIjYjnI1CdTRqiM_nYPELzAgAtzaUxv2kMq73V6PkyTFe03HD19ouO_cazCNeS52raA9yO6SmFoD1tjt9k9ubY6f5Vmf_pBVmedj9_s2809FnLflpha1JcKEv-HH1qBD2Xl_C39fwcROHI"/>
<div>
<h3 className="text-base font-bold text-on-surface group-hover:text-primary transition-colors">Elena Rodriguez</h3>
<p className="text-xs text-on-surface-variant font-medium">Lead UI Designer @ FintechNow</p>
<div className="flex items-center mt-1.5 text-[10px] uppercase tracking-wider font-bold text-error">
<span className="material-symbols-outlined text-sm mr-1" data-icon="schedule">schedule</span>
                                SLA BREACH: 4h Overdue
                            </div>
</div>
</div>
<div className="flex-1 grid grid-cols-3 gap-8">
<div>
<p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Match Score</p>
<div className="flex items-center gap-2">
<span className="text-lg font-black font-headline text-primary">98%</span>
<div className="w-16 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
<div className="h-full bg-primary w-[98%]"></div>
</div>
</div>
</div>
<div>
<p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Stage</p>
<span className="px-2.5 py-1 bg-surface-container-highest text-on-surface text-[11px] font-bold rounded-full">Culture Interview</span>
</div>
<div>
<p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Action</p>
<span className="text-[11px] font-semibold text-primary">Schedule Final Loop</span>
</div>
</div>
<button className="bg-primary/5 p-2 rounded-lg text-primary hover:bg-primary hover:text-white transition-all">
<span className="material-symbols-outlined" data-icon="chevron_right">chevron_right</span>
</button>
</div>

<div className="group bg-surface-container-lowest ambient-shadow rounded-xl p-5 flex items-center gap-6 cursor-pointer hover:bg-primary-fixed/5 transition-all duration-300">
<div className="flex items-center gap-4 min-w-[280px]">
<img alt="Candidate" className="w-14 h-14 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all" data-alt="Professional headshot of a male software engineer with a neutral expression in high-key studio lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDN-ELXSIb6H5mB5F1a-eZylbpqDHKoPszQxU14eMD_s_QIOVg3V2ZZaaG2o7R7RE8JPkgF3f5k1pQMv8cQh_0KMYSMjFK5n5NA71pGuuPa1vuQviAAYDnpuZWb9NGjrrDQcUYOMrpiKTnjdKjw4j7bh9KT6Jn9GF3Ae23dYiSVeaRDDYCgcg7BzXASimmFklJvmiodSkaH7w6bge0_YzxBu69H3lqA9ILKd7CaSY18ajg5Ds7JagntWoOhosgoAOvQfj2tmAOFbB8"/>
<div>
<h3 className="text-base font-bold text-on-surface group-hover:text-primary transition-colors">Marcus Chen</h3>
<p className="text-xs text-on-surface-variant font-medium">Senior Visual Designer @ CloudScale</p>
<div className="flex items-center mt-1.5 text-[10px] uppercase tracking-wider font-bold text-tertiary">
<span className="material-symbols-outlined text-sm mr-1" data-icon="check_circle">check_circle</span>
                                SLA ON TRACK: 18h left
                            </div>
</div>
</div>
<div className="flex-1 grid grid-cols-3 gap-8">
<div>
<p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Match Score</p>
<div className="flex items-center gap-2">
<span className="text-lg font-black font-headline text-on-surface-variant">92%</span>
<div className="w-16 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
<div className="h-full bg-on-surface-variant w-[92%]"></div>
</div>
</div>
</div>
<div>
<p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Stage</p>
<span className="px-2.5 py-1 bg-surface-container-highest text-on-surface text-[11px] font-bold rounded-full">Portfolio Review</span>
</div>
<div>
<p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Action</p>
<span className="text-[11px] font-semibold text-primary">Request Design Task</span>
</div>
</div>
<button className="bg-primary/5 p-2 rounded-lg text-primary hover:bg-primary hover:text-white transition-all">
<span className="material-symbols-outlined" data-icon="chevron_right">chevron_right</span>
</button>
</div>

<div className="group bg-surface-container-lowest ambient-shadow rounded-xl p-5 flex items-center gap-6 cursor-pointer hover:bg-primary-fixed/5 transition-all duration-300">
<div className="flex items-center gap-4 min-w-[280px]">
<img alt="Candidate" className="w-14 h-14 rounded-full object-cover" data-alt="Middle-aged corporate woman professional smiling warmly with soft afternoon light hitting her face" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6h6wBb6Qab94Of2NhlZcxBe0SfALZH-RykXGMMbSM8rUwIEnwwTJovDyBYadxvZaJUs9j3fU-220u5LiKuWbBkKbOvOaTaSDuBw3SnMYCD7ZiJ-a8crgPfS5w3R34P_lKyl9G4Im7lcUKHHz86v6YPTq83MHgsoH46vyo8QS6lkZ4Th283DpsmXgGjp-_we-4XXFNbY_Mwo9O21tljPOCtgIAK4ej22TjxBXB9b692kFd7C9RjvxwGWlljtD6ZOzMJMiXljyysGc"/>
<div>
<h3 className="text-base font-bold text-on-surface group-hover:text-primary transition-colors">Sarah Jenkins</h3>
<p className="text-xs text-on-surface-variant font-medium">Principal Designer @ RetailFlow</p>
<div className="flex items-center mt-1.5 text-[10px] uppercase tracking-wider font-bold text-on-surface-variant">
<span className="material-symbols-outlined text-sm mr-1" data-icon="timer">timer</span>
                                ON HOLD: Client Request
                            </div>
</div>
</div>
<div className="flex-1 grid grid-cols-3 gap-8">
<div>
<p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Match Score</p>
<div className="flex items-center gap-2">
<span className="text-lg font-black font-headline text-on-surface-variant">87%</span>
<div className="w-16 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
<div className="h-full bg-on-surface-variant w-[87%]"></div>
</div>
</div>
</div>
<div>
<p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Stage</p>
<span className="px-2.5 py-1 bg-surface-container-highest text-on-surface text-[11px] font-bold rounded-full">Screening</span>
</div>
<div>
<p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Action</p>
<span className="text-[11px] font-semibold text-primary">Resume Interview</span>
</div>
</div>
<button className="bg-primary/5 p-2 rounded-lg text-primary hover:bg-primary hover:text-white transition-all">
<span className="material-symbols-outlined" data-icon="chevron_right">chevron_right</span>
</button>
</div>

<div className="group bg-surface-container-lowest ambient-shadow rounded-xl p-5 flex items-center gap-6 cursor-pointer hover:bg-primary-fixed/5 transition-all duration-300">
<div className="flex items-center gap-4 min-w-[280px]">
<div className="w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center text-primary font-bold text-lg">JB</div>
<div>
<h3 className="text-base font-bold text-on-surface group-hover:text-primary transition-colors">James Bennett</h3>
<p className="text-xs text-on-surface-variant font-medium">UX Manager @ Delta Systems</p>
<div className="flex items-center mt-1.5 text-[10px] uppercase tracking-wider font-bold text-tertiary">
<span className="material-symbols-outlined text-sm mr-1" data-icon="check_circle">check_circle</span>
                                NEW: 2h ago
                            </div>
</div>
</div>
<div className="flex-1 grid grid-cols-3 gap-8">
<div>
<p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Match Score</p>
<div className="flex items-center gap-2">
<span className="text-lg font-black font-headline text-on-surface-variant">84%</span>
<div className="w-16 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
<div className="h-full bg-on-surface-variant w-[84%]"></div>
</div>
</div>
</div>
<div>
<p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Stage</p>
<span className="px-2.5 py-1 bg-surface-container-highest text-on-surface text-[11px] font-bold rounded-full">New Application</span>
</div>
<div>
<p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Action</p>
<span className="text-[11px] font-semibold text-primary">AI Pre-screen</span>
</div>
</div>
<button className="bg-primary/5 p-2 rounded-lg text-primary hover:bg-primary hover:text-white transition-all">
<span className="material-symbols-outlined" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>
</section>

<aside className="w-96 flex flex-col space-y-4">
<div className="sticky top-[88px] bg-white rounded-2xl ambient-shadow p-6 h-[calc(100vh-120px)] overflow-y-auto no-scrollbar border-t-4 border-primary">
<div className="flex justify-between items-start mb-6">
<div className="flex flex-col items-center flex-1">
<div className="relative">
<img alt="Preview" className="w-24 h-24 rounded-2xl object-cover ambient-shadow ring-4 ring-white" data-alt="Portrait of a young professional woman with a confident expression in a bright modern office environment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBA-k0bbSUOLFYEb9Z18xMMsp9Nirx5POXIC3OOuQRpElTjRdr9Tl0X8bkTPVfaTDYiu-HnGdvuzBcCTGCEn_g9MwiWSSbjUPW81tlFEcHay4f6pPDoVQiwqm79EpdgvN-RYiPFeC0ICk6tZDVG1Eo1G_PoCC6pMqv6qzSEPDBvzOkDvUnOVyC8z1P_Xc5VG_lxLjgAZskMH1s7PIQVgqfxqbEIt8swGAP_VAe0SBq0B-xZzJQKMPCQGSxbJMLneTnZh-zkuO-Zwgs"/>
<span className="absolute -bottom-2 -right-2 bg-tertiary text-white text-[10px] font-bold px-2 py-1 rounded-lg">98% Match</span>
</div>
<h3 className="text-xl font-headline font-extrabold text-on-surface mt-4">Elena Rodriguez</h3>
<p className="text-sm font-medium text-slate-500">San Francisco, CA</p>
</div>
</div>
<div className="space-y-6">

<div className="bg-primary-fixed/30 p-4 rounded-xl">
<div className="flex items-center gap-2 mb-2">
<span className="material-symbols-outlined text-primary text-xl" data-icon="auto_awesome" style={{"fontVariationSettings":"\\'FILL\\' 1"}}>auto_awesome</span>
<h4 className="text-xs font-bold uppercase tracking-widest text-primary">HireFlow AI Insight</h4>
</div>
<p className="text-sm text-blue-900 leading-relaxed">Elena shows exceptional leadership skills and has successfully led three major design system migrations. Her experience with Fintech precisely matches our roadmap.</p>
</div>

<div>
<h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Key Competencies</h4>
<div className="flex flex-wrap gap-2">
<span className="px-3 py-1 bg-surface-container-low text-on-surface text-[11px] font-semibold rounded-lg">Design Systems</span>
<span className="px-3 py-1 bg-surface-container-low text-on-surface text-[11px] font-semibold rounded-lg">React Framework</span>
<span className="px-3 py-1 bg-surface-container-low text-on-surface text-[11px] font-semibold rounded-lg">Stakeholder Management</span>
<span className="px-3 py-1 bg-surface-container-low text-on-surface text-[11px] font-semibold rounded-lg">Fintech UX</span>
<span className="px-3 py-1 bg-surface-container-low text-on-surface text-[11px] font-semibold rounded-lg">+4 more</span>
</div>
</div>

<div>
<h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Hiring Journey</h4>
<div className="space-y-4 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-200">
<div className="relative pl-8">
<span className="absolute left-0 top-1 w-6 h-6 bg-tertiary text-white rounded-full flex items-center justify-center text-[10px] font-bold">1</span>
<p className="text-xs font-bold text-on-surface">Screening Call Passed</p>
<p className="text-[10px] text-slate-400">Mar 12, 2024 • Interviewed by Sarah K.</p>
</div>
<div className="relative pl-8">
<span className="absolute left-0 top-1 w-6 h-6 bg-tertiary text-white rounded-full flex items-center justify-center text-[10px] font-bold">2</span>
<p className="text-xs font-bold text-on-surface">Portfolio Deep-dive</p>
<p className="text-[10px] text-slate-400">Mar 15, 2024 • Rating: 4.8/5.0</p>
</div>
<div className="relative pl-8">
<span className="absolute left-0 top-1 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-[10px] font-bold ring-4 ring-primary-fixed">3</span>
<p className="text-xs font-bold text-primary">Final Culture Loop</p>
<p className="text-[10px] text-slate-500 font-medium">Pending • SLA OVERDUE</p>
</div>
</div>
</div>
</div>

<div className="mt-8 pt-6 border-t border-slate-100 flex flex-col space-y-3">
<button className="w-full bg-primary text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/30 active:scale-95 transition-all">
                        Move to Offer Stage
                    </button>
<div className="grid grid-cols-2 gap-3">
<button className="bg-surface-container-high text-on-surface py-2.5 rounded-xl font-bold text-xs hover:bg-slate-200 transition-colors">
                            Reject
                        </button>
<button className="bg-surface-container-high text-on-surface py-2.5 rounded-xl font-bold text-xs hover:bg-slate-200 transition-colors">
                            Send Note
                        </button>
</div>
</div>
</div>
</aside>
</main>

    </div>
  );
};

export default CandidateSubmissionList;
