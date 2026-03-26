import React from 'react';

const JobRequirementSetup = () => {
  return (
    <div className="bg-background flex flex-col md:flex-row h-screen w-full overflow-hidden text-on-background">
      

<aside className="h-screen w-64 fixed left-0 top-0 bg-[#f3f3fe] flex flex-col p-4 transition-all duration-200 ease-in-out">
<div className="mb-8 px-2">
<h1 className="text-lg font-black text-[#003fb1] tracking-tight">HireFlow AI</h1>
<p className="text-[10px] font-medium uppercase tracking-widest text-slate-500">Command Center</p>
</div>
<nav className="flex-1 space-y-1">
<a className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors" href="#">
<span className="material-symbols-outlined mr-3" data-icon="dashboard">dashboard</span>
<span className="text-sm font-medium uppercase tracking-wider">Dashboard</span>
</a>

<a className="flex items-center px-4 py-3 bg-white text-[#003fb1] shadow-sm rounded-lg transition-colors" href="#">
<span className="material-symbols-outlined mr-3" data-icon="work">work</span>
<span className="text-sm font-medium uppercase tracking-wider">Job Requirements</span>
</a>
<a className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors" href="#">
<span className="material-symbols-outlined mr-3" data-icon="group">group</span>
<span className="text-sm font-medium uppercase tracking-wider">Candidates</span>
</a>
<a className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors" href="#">
<span className="material-symbols-outlined mr-3" data-icon="event_repeat">event_repeat</span>
<span className="text-sm font-medium uppercase tracking-wider">Interviews</span>
</a>
<a className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors" href="#">
<span className="material-symbols-outlined mr-3" data-icon="calendar_today">calendar_today</span>
<span className="text-sm font-medium uppercase tracking-wider">Calendar</span>
</a>
<a className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors" href="#">
<span className="material-symbols-outlined mr-3" data-icon="notification_important">notification_important</span>
<span className="text-sm font-medium uppercase tracking-wider">SLA Alerts</span>
</a>
<a className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors" href="#">
<span className="material-symbols-outlined mr-3" data-icon="analytics">analytics</span>
<span className="text-sm font-medium uppercase tracking-wider">Reports</span>
</a>
<a className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors" href="#">
<span className="material-symbols-outlined mr-3" data-icon="settings">settings</span>
<span className="text-sm font-medium uppercase tracking-wider">Settings</span>
</a>
</nav>
<div className="pt-4 border-t border-slate-200 space-y-1">
<a className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors" href="#">
<span className="material-symbols-outlined mr-3" data-icon="help">help</span>
<span className="text-sm font-medium uppercase tracking-wider">Help Center</span>
</a>
<a className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors" href="#">
<span className="material-symbols-outlined mr-3" data-icon="logout">logout</span>
<span className="text-sm font-medium uppercase tracking-wider">Log Out</span>
</a>
</div>
</aside>

<main className="flex-1 ml-64 min-h-screen">

<header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 flex justify-between items-center w-full px-8 py-4 shadow-[0_8px_24px_rgba(25,27,35,0.06)]">
<div className="flex items-center gap-6">
<h2 className="text-xl font-bold tracking-tight text-[#003fb1]">Define Benchmarks</h2>
<div className="h-6 w-[1px] bg-slate-200"></div>
<div className="flex items-center gap-2 text-slate-500">
<span className="material-symbols-outlined text-sm" data-icon="history_edu">history_edu</span>
<span className="text-sm font-medium">New Draft Role</span>
</div>
</div>
<div className="flex items-center gap-4">
<button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">
<span className="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<div className="flex items-center gap-3 pl-4 border-l border-slate-100">
<div className="text-right">
<p className="text-xs font-bold text-on-surface">Alex Rivera</p>
<p className="text-[10px] text-slate-500">Lead Recruiter</p>
</div>
<img alt="Recruiter Profile Avatar" className="w-10 h-10 rounded-full object-cover" data-alt="professional headshot of a smiling man with a neat beard in a corporate setting with soft natural lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBD9YAB43Tb9lvfHipLyEqGSvm8rnL2O8fnquPFiNYyyJneVd24uNyBMiSncnqNDZ97XJ1fyJZzzfy1w2qB19J7TIX-J0a24KBUyEHVOkzS9tmz6aNAmLspxfRUDlMh4sA1zhtx-VVv1fO8P96MQB2GYJxsuL0YIkrLbvqWbvyODj8P95u8dN122j7ZuafkVPHixkypMgOPGge1vl40gtAcYHpocU9-38T56j00BaTVLhJhw4iV1Wheydp26q8JxZiF_TzK0KMGp0Y"/>
</div>
</div>
</header>

<div className="p-8 max-w-6xl mx-auto space-y-8">

<div className="flex justify-between items-end">
<div>
<span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2 block">Benchmark Configuration</span>
<h1 className="text-4xl font-extrabold tracking-tight text-on-surface leading-tight">Senior Product Designer</h1>
<p className="text-slate-500 max-w-lg mt-2">Set the gold standard for this role. HireFlow AI will use these parameters to score and rank applicants automatically.</p>
</div>
<div className="flex gap-3">
<button className="px-6 py-2.5 rounded-lg font-semibold text-on-surface bg-surface-container-high hover:bg-surface-container-highest transition-all duration-200">
                        Save as Template
                    </button>
<button className="px-8 py-2.5 rounded-lg font-semibold text-white bg-gradient-to-br from-primary to-primary-container shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                        Update Benchmark
                    </button>
</div>
</div>

<div className="grid grid-cols-12 gap-6">

<div className="col-span-12 lg:col-span-8 space-y-6">
<section className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/15 shadow-[0_8px_24px_rgba(25,27,35,0.04)]">
<h3 className="text-lg font-bold mb-6 flex items-center gap-2">
<span className="material-symbols-outlined text-primary" data-icon="description">description</span>
                            Role Fundamentals
                        </h3>
<div className="grid grid-cols-2 gap-6 mb-6">
<div className="space-y-2">
<label className="text-xs font-bold uppercase tracking-wider text-slate-500">Internal Job Title</label>
<input className="w-full bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-on-surface font-medium px-4 py-3" type="text" value="Senior Product Designer"/>
</div>
<div className="space-y-2">
<label className="text-xs font-bold uppercase tracking-wider text-slate-500">Department</label>
<select className="w-full bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-on-surface font-medium px-4 py-3">
<option>Design &amp; Creative</option>
<option>Engineering</option>
<option>Marketing</option>
</select>
</div>
</div>
<div className="space-y-2">
<label className="text-xs font-bold uppercase tracking-wider text-slate-500">Strategic Role Description</label>
<textarea className="w-full bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-on-surface font-medium px-4 py-3 resize-none" placeholder="Explain the primary business impact of this role..." rows="4"></textarea>
</div>
</section>

<section className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/15 shadow-[0_8px_24px_rgba(25,27,35,0.04)]">
<div className="flex justify-between items-center mb-6">
<h3 className="text-lg font-bold flex items-center gap-2">
<span className="material-symbols-outlined text-primary" data-icon="school">school</span>
                                Skill Benchmarking
                            </h3>
<button className="text-sm font-bold text-primary flex items-center gap-1 hover:underline">
<span className="material-symbols-outlined text-sm" data-icon="add">add</span> Add Skill
                            </button>
</div>
<div className="space-y-6">
<div>
<label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 block">Required Skills (Mandatory)</label>
<div className="flex flex-wrap gap-2">
<span className="px-4 py-2 bg-primary/5 text-primary border border-primary/10 rounded-full text-sm font-semibold flex items-center gap-2">
                                        Figma Expert <span className="material-symbols-outlined text-xs cursor-pointer" data-icon="close">close</span>
</span>
<span className="px-4 py-2 bg-primary/5 text-primary border border-primary/10 rounded-full text-sm font-semibold flex items-center gap-2">
                                        Design Systems <span className="material-symbols-outlined text-xs cursor-pointer" data-icon="close">close</span>
</span>
<span className="px-4 py-2 bg-primary/5 text-primary border border-primary/10 rounded-full text-sm font-semibold flex items-center gap-2">
                                        User Research <span className="material-symbols-outlined text-xs cursor-pointer" data-icon="close">close</span>
</span>
<span className="px-4 py-2 bg-primary/5 text-primary border border-primary/10 rounded-full text-sm font-semibold flex items-center gap-2">
                                        Prototyping <span className="material-symbols-outlined text-xs cursor-pointer" data-icon="close">close</span>
</span>
</div>
</div>
<div className="grid grid-cols-2 gap-6">
<div className="space-y-2">
<label className="text-xs font-bold uppercase tracking-wider text-slate-500">Min. Experience</label>
<div className="relative">
<input className="w-full bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-on-surface font-medium px-4 py-3" type="number" value="6"/>
<span className="absolute right-4 top-3.5 text-xs font-bold text-slate-400">YEARS</span>
</div>
</div>
<div className="space-y-2">
<label className="text-xs font-bold uppercase tracking-wider text-slate-500">Qualification Level</label>
<select className="w-full bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-on-surface font-medium px-4 py-3">
<option>Bachelor's Degree or Equivalent</option>
<option>Master's Degree</option>
<option>Industry Certifications Only</option>
</select>
</div>
</div>
</div>
</section>
</div>

<div className="col-span-12 lg:col-span-4 space-y-6">
<section className="bg-primary p-8 rounded-xl text-white shadow-xl shadow-primary/20 relative overflow-hidden">

<div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
<div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
<h3 className="text-lg font-bold mb-4 flex items-center gap-2 relative z-10">
<span className="material-symbols-outlined" data-icon="psychology">psychology</span>
                            AI Intelligence Engine
                        </h3>
<p className="text-primary-fixed/80 text-sm mb-6 relative z-10">Define how the AI prioritizes candidates. This weightage determines the final HireFlow Score.</p>
<div className="space-y-6 relative z-10">
<div className="space-y-2">
<div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
<span>Portfolio Quality</span>
<span>40%</span>
</div>
<div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
<div className="bg-white h-full w-[40%] rounded-full"></div>
</div>
</div>
<div className="space-y-2">
<div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
<span>Skill Relevance</span>
<span>35%</span>
</div>
<div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
<div className="bg-white h-full w-[35%] rounded-full"></div>
</div>
</div>
<div className="space-y-2">
<div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
<span>Industry Context</span>
<span>15%</span>
</div>
<div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
<div className="bg-white h-full w-[15%] rounded-full"></div>
</div>
</div>
<div className="space-y-2">
<div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
<span>Culture Add</span>
<span>10%</span>
</div>
<div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
<div className="bg-white h-full w-[10%] rounded-full"></div>
</div>
</div>
</div>
<button className="w-full mt-8 py-3 bg-white text-primary font-bold rounded-lg text-sm transition-transform active:scale-95">
                            Calibrate Weights
                        </button>
</section>
<section className="bg-white p-6 rounded-xl border border-outline-variant/15 shadow-sm">
<h3 className="text-sm font-bold text-on-surface mb-4">Benchmark Preview</h3>
<div className="space-y-4">
<div className="flex items-start gap-3 p-3 bg-surface rounded-lg">
<span className="material-symbols-outlined text-tertiary" data-icon="check_circle" data-weight="fill" style={{"fontVariationSettings":"\\'FILL\\' 1"}}>check_circle</span>
<div>
<p className="text-xs font-bold">Automatic Filtering</p>
<p className="text-[10px] text-slate-500">Profiles under 70% match will be moved to "Review Later".</p>
</div>
</div>
<div className="flex items-start gap-3 p-3 bg-surface rounded-lg">
<span className="material-symbols-outlined text-error" data-icon="report" data-weight="fill" style={{"fontVariationSettings":"\\'FILL\\' 1"}}>report</span>
<div>
<p className="text-xs font-bold">SLA Breach Warning</p>
<p className="text-[10px] text-slate-500">Alerts if 48h pass without screening Top Match candidates.</p>
</div>
</div>
</div>
</section>
</div>

<div className="col-span-12">
<section className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/15 shadow-[0_8px_24px_rgba(25,27,35,0.04)]">
<h3 className="text-lg font-bold mb-6 flex items-center gap-2">
<span className="material-symbols-outlined text-primary" data-icon="rule">rule</span>
                            Evaluation Criteria
                        </h3>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="p-4 bg-surface rounded-xl border border-transparent hover:border-primary/20 transition-all cursor-pointer group">
<div className="flex items-center justify-between mb-4">
<div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
<span className="material-symbols-outlined" data-icon="bolt">bolt</span>
</div>
<span className="px-2 py-1 bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-black uppercase rounded">High Priority</span>
</div>
<p className="text-sm font-bold mb-1">Visual Communication</p>
<p className="text-xs text-slate-500">AI assesses portfolio for aesthetic balance, hierarchy, and brand consistency.</p>
</div>
<div className="p-4 bg-surface rounded-xl border border-transparent hover:border-primary/20 transition-all cursor-pointer group">
<div className="flex items-center justify-between mb-4">
<div className="w-10 h-10 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary">
<span className="material-symbols-outlined" data-icon="hub">hub</span>
</div>
<span className="px-2 py-1 bg-surface-container-highest text-slate-600 text-[10px] font-black uppercase rounded">Standard</span>
</div>
<p className="text-sm font-bold mb-1">Technical Stack</p>
<p className="text-xs text-slate-500">Verification of specific software proficiency (Figma, Framer, Adobe CC).</p>
</div>
<div className="p-4 bg-surface rounded-xl border border-transparent hover:border-primary/20 transition-all cursor-pointer group">
<div className="flex items-center justify-between mb-4">
<div className="w-10 h-10 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined" data-icon="chat_bubble">chat_bubble</span>
</div>
<span className="px-2 py-1 bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-black uppercase rounded">High Priority</span>
</div>
<p className="text-sm font-bold mb-1">Product Thinking</p>
<p className="text-xs text-slate-500">Evaluation of problem-solving approach through case study analysis.</p>
</div>
</div>
</section>
</div>
</div>

<div className="sticky bottom-8 left-0 right-0 glass-card p-6 rounded-2xl border border-outline-variant/30 shadow-2xl flex justify-between items-center max-w-4xl mx-auto z-40">
<div className="flex items-center gap-4">
<div className="flex -space-x-2">
<img alt="Collaborator 1" className="w-8 h-8 rounded-full border-2 border-white object-cover" data-alt="headshot of a woman with long dark hair smiling professional studio lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE4_AvD_wVNa0OIanhjpphKB1_Vdax2bQAJPLcsoB9AbNOnb5Txn7T2mO7UMhKpmjZ5DUAXvOTuXn7cXVRwXnSaKb_tIo3bGJGUmSFRPMO5aUsAnJoSExaztblp4NivT6Hg8JzqzEGKEYXByshB5MyXq_pTJZXu2tkUu5ms60gDfQkNGMDYd1CDUxX7WlWr0EU7EUahVLlJtBQTRatDTwVXLKLAH3fExQAGWVAAwIZZu175SPEaESoZjkBloJ2WZ5lIoNgd7jGKDQ"/>
<img alt="Collaborator 2" className="w-8 h-8 rounded-full border-2 border-white object-cover" data-alt="headshot of a man with glasses and short hair professional office background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCw15CDhR_37ohxNrjHQl0ZgS261qdnEIIU99RRlBudKkCjIKaRBceIxTd56u8RoBflzXyeJ1SHD0akJdLMk6dusmS_h9pBXbDPr4wPtoIXzP2m4bz4kJiRb7vGd3vq5JJEMWKBnU3hmerG-9iOPgT92KC-iAqOH5hZ3cPelJ24G4c2MOf96-oVrdJXUabmyJn_ClgM645H9a5hoMknzyu0QqdGlp_OhH_b-MSY7-XtL05e9Adxz33Lvj661rxZbUTyFKUx2M3Pfdk"/>
<div className="w-8 h-8 rounded-full bg-surface-container-highest border-2 border-white flex items-center justify-center text-[10px] font-bold">+3</div>
</div>
<p className="text-xs text-slate-500 font-medium italic">3 other recruiters are reviewing these requirements.</p>
</div>
<div className="flex gap-4">
<button className="px-6 py-2 text-sm font-bold text-on-surface hover:text-primary transition-colors">Discard Draft</button>
<button className="px-10 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all">Publish Benchmark</button>
</div>
</div>
</div>
</main>

    </div>
  );
};

export default JobRequirementSetup;
