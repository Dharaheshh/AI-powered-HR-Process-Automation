import React from 'react';

const NovatechCareersPortal = () => {
  return (
    <div className="bg-background flex flex-col md:flex-row h-screen w-full overflow-hidden text-on-background">
      

<nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-sm">
<div className="flex justify-between items-center px-8 h-16 max-w-7xl mx-auto w-full">
<div className="text-xl font-bold text-slate-900 tracking-tighter font-headline">NovaTech</div>
<div className="hidden md:flex space-x-8 items-center">
<a className="font-manrope text-sm font-medium tracking-tight text-slate-500 hover:text-blue-500 transition-colors" href="#">About Us</a>
<a className="font-manrope text-sm font-medium tracking-tight text-slate-500 hover:text-blue-500 transition-colors" href="#">Teams</a>
<a className="font-manrope text-sm font-medium tracking-tight text-blue-600 font-bold border-b-2 border-blue-600" href="#">Careers</a>
<a className="font-manrope text-sm font-medium tracking-tight text-slate-500 hover:text-blue-500 transition-colors" href="#">Contact</a>
</div>
<button className="px-6 py-2 bg-primary-gradient text-white rounded-lg text-sm font-semibold shadow-sm hover:opacity-90 active:scale-95 transition-all">
                Login
            </button>
</div>
</nav>
<main className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

<section className="lg:col-span-8 space-y-10">

<div className="bg-surface-container-low rounded-xl p-8 space-y-6">
<div>
<span className="font-label text-xs font-bold uppercase tracking-widest text-primary mb-2 block">Engineering Department</span>
<h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight">Senior Frontend Developer</h1>
</div>
<div className="flex flex-wrap gap-4 items-center text-on-surface-variant font-medium text-sm">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary" style={{"fontVariationSettings":"\\'FILL\\' 1"}}>location_on</span>
                            Remote (US)
                        </div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary" style={{"fontVariationSettings":"\\'FILL\\' 1"}}>work</span>
                            Full-Time
                        </div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary" style={{"fontVariationSettings":"\\'FILL\\' 1"}}>payments</span>
                            $150k - $210k
                        </div>
</div>
<div className="flex flex-wrap gap-2 pt-2">
<span className="px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full text-xs font-semibold">React</span>
<span className="px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full text-xs font-semibold">TypeScript</span>
<span className="px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full text-xs font-semibold">Tailwind CSS</span>
<span className="px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full text-xs font-semibold">System Design</span>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-8 shadow-ambient">
<h2 className="font-headline text-2xl font-bold mb-8">Personal Information</h2>
<form className="space-y-8">
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="space-y-2">
<label className="text-xs font-bold uppercase tracking-wider text-outline px-1">Full Name</label>
<input className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 px-4 py-3 text-on-surface transition-all placeholder:text-surface-dim" placeholder="John Doe" type="text"/>
</div>
<div className="space-y-2">
<label className="text-xs font-bold uppercase tracking-wider text-outline px-1">Email Address</label>
<input className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 px-4 py-3 text-on-surface transition-all placeholder:text-surface-dim" placeholder="john@novatech.io" type="email"/>
</div>
<div className="space-y-2">
<label className="text-xs font-bold uppercase tracking-wider text-outline px-1">Phone Number</label>
<input className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 px-4 py-3 text-on-surface transition-all placeholder:text-surface-dim" placeholder="+1 (555) 000-0000" type="tel"/>
</div>
<div className="space-y-2">
<label className="text-xs font-bold uppercase tracking-wider text-outline px-1">Current Role</label>
<input className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 px-4 py-3 text-on-surface transition-all placeholder:text-surface-dim" placeholder="Frontend Engineer" type="text"/>
</div>
</div>

<div className="space-y-4 pt-4">
<label className="text-xs font-bold uppercase tracking-wider text-outline px-1">Resume / CV</label>
<div className="border-2 border-dashed border-outline-variant rounded-xl p-12 flex flex-col items-center justify-center text-center bg-surface hover:bg-surface-container-low transition-all cursor-pointer group">
<div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-primary text-3xl" style={{"fontVariationSettings":"\\'FILL\\' 1"}}>upload_file</span>
</div>
<h3 className="font-bold text-lg">Click to upload or drag and drop</h3>
<p className="text-sm text-outline mt-1">PDF, DOCX up to 10MB</p>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="p-4 bg-surface rounded-lg flex items-center justify-between group hover:bg-surface-container-low transition-all cursor-pointer">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-secondary" style={{"fontVariationSettings":"\\'FILL\\' 1"}}>badge</span>
<span className="font-semibold text-sm">Identity Document</span>
</div>
<span className="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 transition-opacity">add_circle</span>
</div>
<div className="p-4 bg-surface rounded-lg flex items-center justify-between group hover:bg-surface-container-low transition-all cursor-pointer">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-secondary" style={{"fontVariationSettings":"\\'FILL\\' 1"}}>folder_shared</span>
<span className="font-semibold text-sm">Work Portfolio</span>
</div>
<span className="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 transition-opacity">add_circle</span>
</div>
</div>
<div className="pt-6">
<button className="w-full md:w-auto px-10 py-4 bg-primary-gradient text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all" type="submit">
                                Submit Application
                            </button>
</div>
</form>
</div>
</section>

<aside className="lg:col-span-4 space-y-8 sticky top-24">

<div className="bg-surface-container-lowest rounded-xl p-6 shadow-ambient">
<div className="flex items-center gap-4 mb-8">
<div className="w-12 h-12 rounded-full overflow-hidden bg-primary-fixed">
<img alt="Marcus Chen" className="w-full h-full object-cover" data-alt="Professional headshot of a friendly young man with glasses and a soft smile in a bright office environment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0sKgUFB2pL-EDbz3Nq15IAYGbnCYU2lN711be--gTUOuI_JV3pZBV9mSfJI0nwd1WTssgxcUFFKUl368gEoiDWiFfQzYUZPeDFcK_5YHo_kCcQFjC5o2mqpXkQQqbix7Eta5jpMFDBJ8xxfnPdkBv-RqDVdlrF51Gmu9QZtZqzPJ4r3sXwNnf1NW5i8bMnBLUIFheepXqV5cG3ErHWK3CiBtGkcpOWnGV9F2DJbzWd-_4bAT85LK0lhmFxtP9xBD0MVQ0a2K2AEE"/>
</div>
<div>
<h3 className="font-bold text-lg leading-tight">Marcus Chen</h3>
<p className="text-xs text-outline font-medium">Applied for Senior Frontend</p>
</div>
</div>
<div className="space-y-6">
<div className="flex justify-between items-center">
<span className="font-label text-xs font-bold uppercase tracking-wider text-outline">Application Status</span>
<span className="inline-flex items-center px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-xs font-bold animate-pulse">
                                Under Review
                            </span>
</div>

<div className="space-y-4">
<div className="relative pl-6 space-y-6">
<div className="absolute left-1 top-2 bottom-2 w-0.5 bg-surface-variant"></div>

<div className="relative">
<div className="absolute -left-[1.375rem] top-1 w-3 h-3 rounded-full bg-primary border-4 border-surface-container-lowest ring-2 ring-primary/20"></div>
<div className="space-y-1">
<p className="text-sm font-bold">Applied</p>
<p className="text-[10px] text-outline font-medium">Oct 12, 2024 • 09:45 AM</p>
</div>
</div>

<div className="relative">
<div className="absolute -left-[1.375rem] top-1 w-3 h-3 rounded-full bg-primary border-4 border-surface-container-lowest ring-2 ring-primary/20"></div>
<div className="space-y-1">
<p className="text-sm font-bold">Under Review</p>
<p className="text-[10px] text-outline font-medium text-primary">Started Oct 14, 2024</p>
</div>
</div>

<div className="relative opacity-40">
<div className="absolute -left-[1.375rem] top-1 w-3 h-3 rounded-full bg-surface-variant border-4 border-surface-container-lowest"></div>
<div className="space-y-1">
<p className="text-sm font-bold text-on-surface-variant">Shortlisted</p>
</div>
</div>

<div className="relative opacity-40">
<div className="absolute -left-[1.375rem] top-1 w-3 h-3 rounded-full bg-surface-variant border-4 border-surface-container-lowest"></div>
<div className="space-y-1">
<p className="text-sm font-bold text-on-surface-variant">Interview</p>
</div>
</div>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-low rounded-xl p-6">
<div className="flex items-center gap-2 mb-4">
<span className="material-symbols-outlined text-primary text-lg">chat_bubble</span>
<h4 className="font-bold text-sm">Recruiter Messages</h4>
</div>
<div className="bg-surface-container-lowest p-4 rounded-lg shadow-sm border-l-4 border-primary">
<p className="text-xs text-on-surface-variant leading-relaxed italic">
                            "Hi Marcus, we're currently reviewing your portfolio. The React examples you shared are impressive. We'll be in touch by end of week."
                        </p>
<p className="text-[10px] text-outline mt-2 font-bold">— Sarah, Hiring Lead</p>
</div>
</div>

<div className="bg-surface-container-low rounded-xl p-6">
<h4 className="font-bold text-sm mb-4">Uploaded Documents</h4>
<div className="space-y-3">
<div className="flex items-center gap-3 p-3 bg-white rounded-lg group hover:bg-primary-fixed/30 transition-all cursor-pointer">
<div className="w-10 h-10 bg-error-container/50 rounded flex items-center justify-center">
<span className="material-symbols-outlined text-error" style={{"fontVariationSettings":"\\'FILL\\' 1"}}>description</span>
</div>
<div className="flex-1 overflow-hidden">
<p className="text-xs font-bold truncate">Resume_MarcusChen.pdf</p>
<p className="text-[10px] text-outline">Uploaded Oct 12</p>
</div>
<span className="material-symbols-outlined text-outline text-sm">open_in_new</span>
</div>
<div className="flex items-center gap-3 p-3 bg-white rounded-lg group hover:bg-primary-fixed/30 transition-all cursor-pointer">
<div className="w-10 h-10 bg-secondary-container rounded flex items-center justify-center">
<span className="material-symbols-outlined text-on-secondary-container" style={{"fontVariationSettings":"\\'FILL\\' 1"}}>folder_zip</span>
</div>
<div className="flex-1 overflow-hidden">
<p className="text-xs font-bold truncate">Portfolio_v2_2024.zip</p>
<p className="text-[10px] text-outline">Uploaded Oct 12</p>
</div>
<span className="material-symbols-outlined text-outline text-sm">open_in_new</span>
</div>
</div>
</div>
</aside>
</div>
</main>

<footer className="w-full py-12 border-t border-slate-200 bg-slate-50">
<div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
<div className="col-span-1 md:col-span-1">
<div className="text-lg font-black text-slate-900 mb-4">NovaTech</div>
<p className="font-inter text-xs text-slate-500 leading-relaxed">© 2024 NovaTech Solutions. Engineered for Innovation.</p>
</div>
<div>
<h5 className="font-bold text-sm mb-4">Platform</h5>
<ul className="space-y-2">
<li><a className="font-inter text-xs text-slate-500 hover:text-blue-500 transition-colors" href="#">Privacy Policy</a></li>
<li><a className="font-inter text-xs text-slate-500 hover:text-blue-500 transition-colors" href="#">Terms of Service</a></li>
</ul>
</div>
<div>
<h5 className="font-bold text-sm mb-4">Support</h5>
<ul className="space-y-2">
<li><a className="font-inter text-xs text-slate-500 hover:text-blue-500 transition-colors" href="#">Cookie Settings</a></li>
<li><a className="font-inter text-xs text-slate-500 hover:text-blue-500 transition-colors" href="#">Accessibility</a></li>
</ul>
</div>
<div>
<h5 className="font-bold text-sm mb-4">Careers</h5>
<ul className="space-y-2">
<li><a className="font-inter text-xs text-slate-500 hover:text-blue-500 transition-colors" href="#">Open Roles</a></li>
<li><a className="font-inter text-xs text-slate-500 hover:text-blue-500 transition-colors" href="#">Benefits</a></li>
</ul>
</div>
</div>
</footer>

    </div>
  );
};

export default NovatechCareersPortal;
