import React from 'react';

const FollowUpActionModal = () => {
  return (
    <>
      

<div className="fixed inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
<div className="flex h-screen">
<aside className="w-64 bg-slate-50 border-r border-transparent"></aside>
<main className="flex-1 p-8">
<div className="h-8 w-48 bg-slate-200 rounded mb-8"></div>
<div className="grid grid-cols-3 gap-6">
<div className="h-64 bg-slate-200 rounded-xl"></div>
<div className="h-64 bg-slate-200 rounded-xl"></div>
<div className="h-64 bg-slate-200 rounded-xl"></div>
</div>
</main>
</div>
</div>

<div className="fixed inset-0 bg-on-background/10 backdrop-blur-sm z-40"></div>

<div className="relative z-50 w-full max-w-4xl bg-surface-container-lowest rounded-xl shadow-[0_20px_50px_rgba(0,63,177,0.12)] border border-outline-variant/20 overflow-hidden flex flex-col md:flex-row max-h-[921px]">

<div className="w-full md:w-72 bg-surface-container-low p-6 flex flex-col gap-8">
<div>
<span className="text-[10px] font-bold font-label text-secondary uppercase tracking-widest mb-2 block">Action Required</span>
<h2 className="font-headline text-2xl font-extrabold text-on-surface leading-tight">Candidate Follow-Up</h2>
</div>

<div className="bg-surface-container-lowest p-4 rounded-lg shadow-sm">
<div className="flex items-center gap-3 mb-4">
<img alt="Candidate Avatar" className="w-12 h-12 rounded-lg object-cover" data-alt="Professional headshot of a woman with a confident smile, wearing a blazer, in a bright modern office environment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTSrdRdM7uG7vIfa2vm-7ETKsOEiW0WNRd5fw_ZgosCvYfcBWlRJjQvqfIr8YUrN386aZE9nYEzxMkxUAAm39Svw4qPcUL7-thCM1DIAiBkfb03msbSIwJrQRkwQWjZQwuf8a1QKX3ERCdy1Fd7NBuJCGdXISv4lNjYNQqtzkyYkq9COmBVZXAed9Rj1wHZmqq4FOiCizOuJ_XDRgvhDnYb-VCgQS0MwvFAaw9aLYeHRv4SgEoIQePEZtdERkb2r96IQjvkqnQvZ8"/>
<div>
<h3 className="font-headline font-bold text-on-surface text-sm">Elena Rodriguez</h3>
<p className="text-xs text-on-surface-variant font-medium">Senior Product Designer</p>
</div>
</div>
<div className="space-y-2">
<div className="flex items-center justify-between text-[11px]">
<span className="text-on-surface-variant">Source</span>
<span className="font-semibold text-primary">LinkedIn Referral</span>
</div>
<div className="flex items-center justify-between text-[11px]">
<span className="text-on-surface-variant">Applied</span>
<span className="font-semibold text-on-surface">2 days ago</span>
</div>
</div>
</div>

<nav className="flex flex-col gap-1">
<button className="flex items-center gap-3 p-3 rounded-lg bg-primary-container text-on-primary-container font-semibold text-sm transition-all shadow-sm">
<span className="material-symbols-outlined text-[20px]" data-icon="event_upcoming">event_upcoming</span>
                    Schedule Interview
                </button>
<button className="flex items-center gap-3 p-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all text-sm">
<span className="material-symbols-outlined text-[20px]" data-icon="playlist_add_check">playlist_add_check</span>
                    Shortlist Candidate
                </button>
<button className="flex items-center gap-3 p-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all text-sm">
<span className="material-symbols-outlined text-[20px]" data-icon="help_outline">help_outline</span>
                    Request Clarification
                </button>
<button className="flex items-center gap-3 p-3 rounded-lg text-error hover:bg-error-container/30 transition-all text-sm">
<span className="material-symbols-outlined text-[20px]" data-icon="cancel">cancel</span>
                    Reject Application
                </button>
</nav>

<div className="mt-auto p-3 rounded-lg bg-error-container/20 border border-error-container/50">
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-error text-[18px]" data-icon="warning">warning</span>
<p className="text-[10px] leading-relaxed text-on-error-container font-medium">
<span className="font-bold">Workflow Notice:</span> Elena has not completed the Technical Assessment yet. Scheduling now may skip standard protocol.
                    </p>
</div>
</div>
</div>

<div className="flex-1 flex flex-col overflow-hidden">

<div className="h-16 flex items-center justify-between px-8 border-b border-outline-variant/10">
<div className="flex items-center gap-2">
<div className="w-2 h-2 rounded-full bg-tertiary"></div>
<span className="text-xs font-bold text-on-surface-variant font-label tracking-wide uppercase">Stage: Screening</span>
</div>
<button className="p-2 hover:bg-surface-container-high rounded-full transition-all text-on-surface-variant">
<span className="material-symbols-outlined" data-icon="close">close</span>
</button>
</div>

<div className="flex-1 overflow-y-auto p-8 custom-scrollbar">

<section className="mb-8">
<div className="flex items-center justify-between mb-4">
<h4 className="font-headline font-bold text-on-surface">Communication Preview</h4>
<button className="text-xs font-bold text-primary hover:underline">Edit Template</button>
</div>
<div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10">
<div className="flex items-center gap-2 mb-4 pb-4 border-b border-outline-variant/10">
<span className="text-xs text-on-surface-variant font-medium">Subject:</span>
<span className="text-xs font-bold text-on-surface">Interview Invitation: Senior Product Designer @ HireFlow</span>
</div>
<div className="space-y-4">
<p className="text-sm text-on-surface leading-relaxed">Dear <span className="text-primary font-bold">Elena Rodriguez</span>,</p>
<p className="text-sm text-on-surface leading-relaxed">Our team was impressed by your portfolio and professional background. We'd love to discuss the Senior Product Designer role further with you.</p>

<div className="bg-surface-container-lowest border border-primary/20 rounded-lg p-4 flex items-center justify-between shadow-sm">
<div className="flex items-center gap-3">
<div className="bg-primary/10 p-2 rounded-lg text-primary">
<span className="material-symbols-outlined text-[20px]" data-icon="calendar_month">calendar_month</span>
</div>
<div>
<p className="text-xs font-bold text-on-surface">Meeting Link Attached</p>
<p className="text-[10px] text-on-surface-variant">calendly.com/hireflow/elena-rodriguez</p>
</div>
</div>
<button className="text-[10px] font-bold text-primary uppercase tracking-tighter hover:underline">Change Link</button>
</div>
<p className="text-sm text-on-surface leading-relaxed">Please pick a time that works best for you. We look forward to meeting you soon!</p>
<p className="text-sm text-on-surface leading-relaxed">Best regards,<br/><span className="font-bold">HireFlow Talent Team</span></p>
</div>
</div>
</section>

<section className="grid grid-cols-2 gap-4">
<div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-4 hover:border-primary transition-all cursor-pointer group">
<div className="flex items-center gap-3 mb-2">
<span className="material-symbols-outlined text-secondary text-[20px] group-hover:text-primary" data-icon="videocam">videocam</span>
<span className="text-xs font-bold text-on-surface">Remote (Zoom)</span>
</div>
<p className="text-[10px] text-on-surface-variant leading-tight">Link will be automatically generated and shared with candidate.</p>
</div>
<div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-4 hover:border-primary transition-all cursor-pointer group">
<div className="flex items-center gap-3 mb-2">
<span className="material-symbols-outlined text-secondary text-[20px] group-hover:text-primary" data-icon="group">group</span>
<span className="text-xs font-bold text-on-surface">Internal Only</span>
</div>
<p className="text-[10px] text-on-surface-variant leading-tight">Add internal stakeholders to this session for private review.</p>
</div>
</section>
</div>

<div className="p-6 px-8 bg-surface-container-low/50 border-t border-outline-variant/5 flex items-center justify-between">
<div className="flex items-center gap-4">
<label className="flex items-center gap-2 cursor-pointer">
<input checked="" className="w-4 h-4 rounded text-primary focus:ring-primary border-outline-variant" type="checkbox"/>
<span className="text-xs font-medium text-on-surface-variant">Notify Hiring Manager</span>
</label>
</div>
<div className="flex items-center gap-3">
<button className="px-5 py-2 text-sm font-bold text-on-surface-variant hover:text-on-surface transition-colors">Discard</button>
<button className="px-6 py-2.5 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
                        Confirm &amp; Send Invitation
                    </button>
</div>
</div>
</div>
</div>

<div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
<div className="fixed top-0 left-0 w-[400px] h-[400px] bg-tertiary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

    </>
  );
};

export default FollowUpActionModal;