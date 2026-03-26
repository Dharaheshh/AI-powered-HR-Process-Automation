import React from 'react';

const HrAvailabilityTimetable = () => {
  return (
    <>
      

<aside className="flex flex-col h-full py-6 px-4 bg-slate-50 dark:bg-slate-900 h-screen w-64 border-r-0 shadow-[8px_0_24px_rgba(0,63,177,0.06)] z-20">
<div className="mb-10 px-2">
<h1 className="text-xl font-bold tracking-tight text-blue-800 dark:text-blue-300">HireFlow AI</h1>
<p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mt-1">Command Center</p>
</div>
<nav className="flex-1 space-y-1">
<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group" href="#">
<span className="material-symbols-outlined" data-icon="account_tree">account_tree</span>
<span className="text-sm font-medium">Workflow</span>
</a>

<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-blue-700 dark:text-blue-400 font-bold border-r-4 border-blue-700 bg-slate-100 dark:bg-slate-800 transition-colors" href="#">
<span className="material-symbols-outlined" data-icon="calendar_today">calendar_today</span>
<span className="text-sm">Timetable</span>
</a>
<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group" href="#">
<span className="material-symbols-outlined" data-icon="event_upcoming">event_upcoming</span>
<span className="text-sm font-medium">Interviews</span>
</a>
<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group" href="#">
<span className="material-symbols-outlined" data-icon="notification_important">notification_important</span>
<span className="text-sm font-medium">Alerts</span>
</a>
<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group" href="#">
<span className="material-symbols-outlined" data-icon="history_edu">history_edu</span>
<span className="text-sm font-medium">Timeline</span>
</a>
<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group" href="#">
<span className="material-symbols-outlined" data-icon="analytics">analytics</span>
<span className="text-sm font-medium">Insights</span>
</a>
</nav>
<div className="mt-auto space-y-1 border-t border-slate-200 dark:border-slate-800 pt-4">
<button className="w-full bg-gradient-to-br from-primary to-primary-container text-white py-2.5 px-4 rounded-lg font-semibold text-sm mb-6 active:scale-95 transition-transform flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-sm" data-icon="add">add</span>
                New Candidate
            </button>
<a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors" href="#">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
<span className="text-sm font-medium">Settings</span>
</a>
<a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors" href="#">
<span className="material-symbols-outlined" data-icon="help">help</span>
<span className="text-sm font-medium">Support</span>
</a>
<div className="flex items-center gap-3 px-3 py-4 mt-2">
<img className="w-10 h-10 rounded-full object-cover" data-alt="professional corporate headshot of a middle-aged male recruiter in a clean modern office background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8yPY-SI_47ymAWxm3AT_oARN1AHu1n_Xeon2JrRR5o8-7mjI_qbkIUpSIwYYscvIskfRTa30nq9laH3z92jBmCPy97t2jgpEzVcg0cTCq3vGezTkxrD8VTLx7V19kMxja3aTqTHxQ5nD9fNfuz8dRjNX-5N7GS4pADJ8F_L0ki07tyusdthKCLMIaxqg-kcHjnDNzlqk-AoExX6qlINPOB2jNCSQaJCM5H6PKxsXOFrfmIjXEQ2FnWoSK_pFgfcc5fW7xJnlHt7k"/>
<div className="flex flex-col">
<span className="text-xs font-bold">Marcus Chen</span>
<span className="text-[10px] text-slate-400 uppercase tracking-wider">Sr. Recruiter</span>
</div>
</div>
</div>
</aside>

<main className="flex-1 flex flex-col min-w-0 overflow-hidden">

<header className="flex justify-between items-center px-8 w-full sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md h-16">
<div className="flex items-center gap-8">
<div className="relative w-64">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" data-icon="search">search</span>
<input className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20" placeholder="Search events..." type="text"/>
</div>
<nav className="hidden md:flex items-center gap-6">
<a className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-opacity" href="#">Dashboard</a>
<a className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-opacity" href="#">Candidates</a>
<a className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-opacity" href="#">Teams</a>
</nav>
</div>
<div className="flex items-center gap-4">
<button className="material-symbols-outlined text-slate-500 hover:opacity-80 transition-opacity" data-icon="notifications">notifications</button>
<button className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-primary/20 active:scale-95 transition-transform">
                    Schedule Interview
                </button>
</div>
</header>

<div className="flex-1 overflow-y-auto p-8 space-y-8">

<section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
<div>
<span className="text-primary text-xs font-bold uppercase tracking-widest mb-2 block">Management</span>
<h2 className="text-4xl font-extrabold font-headline tracking-tight text-on-surface">Recruiter Availability</h2>
<p className="text-on-surface-variant mt-2 max-w-lg">Manage your global interview windows, block focus time, and sync with team calendars.</p>
</div>
<div className="flex gap-3 bg-surface-container-low p-1.5 rounded-xl">
<button className="px-6 py-2 rounded-lg text-sm font-bold bg-white shadow-sm text-primary">Week</button>
<button className="px-6 py-2 rounded-lg text-sm font-medium text-slate-500 hover:bg-white/50 transition-colors">Month</button>
<button className="px-6 py-2 rounded-lg text-sm font-medium text-slate-500 hover:bg-white/50 transition-colors">Day</button>
</div>
</section>

<div className="grid grid-cols-12 gap-8">

<div className="col-span-12 lg:col-span-4 space-y-8">

<div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_8px_24px_rgba(0,63,177,0.06)]">
<div className="flex items-center justify-between mb-6">
<h3 className="font-headline font-bold text-lg">Working Hours</h3>
<span className="material-symbols-outlined text-primary cursor-pointer" data-icon="edit">edit</span>
</div>
<div className="space-y-4">
<div className="flex items-center justify-between py-2">
<span className="text-sm font-medium text-on-surface-variant">Monday – Friday</span>
<span className="text-sm font-bold text-on-surface">09:00 - 18:00</span>
</div>
<div className="flex items-center justify-between py-2 border-t border-slate-50">
<span className="text-sm font-medium text-on-surface-variant">Saturday</span>
<span className="text-sm font-bold text-on-surface">10:00 - 13:00</span>
</div>
<div className="flex items-center justify-between py-2 border-t border-slate-50">
<span className="text-sm font-medium text-slate-400">Sunday</span>
<span className="text-sm font-bold text-slate-400 italic">Off</span>
</div>
</div>
<button className="w-full mt-6 py-3 px-4 border border-outline-variant text-primary font-bold text-sm rounded-lg hover:bg-surface-container-low transition-colors">
                            Update Timezone (GMT+2)
                        </button>
</div>

<div className="bg-surface-container-low p-8 rounded-xl">
<h3 className="font-headline font-bold text-lg mb-6">Interview Slots</h3>
<div className="space-y-3">
<div className="flex items-center gap-4 bg-white p-4 rounded-lg">
<div className="w-2 h-10 bg-tertiary rounded-full"></div>
<div className="flex-1">
<p className="text-sm font-bold">Standard Screening</p>
<p className="text-xs text-slate-500">30 Minutes</p>
</div>
<span className="material-symbols-outlined text-slate-400" data-icon="drag_handle">drag_handle</span>
</div>
<div className="flex items-center gap-4 bg-white p-4 rounded-lg">
<div className="w-2 h-10 bg-primary rounded-full"></div>
<div className="flex-1">
<p className="text-sm font-bold">Technical Review</p>
<p className="text-xs text-slate-500">60 Minutes</p>
</div>
<span className="material-symbols-outlined text-slate-400" data-icon="drag_handle">drag_handle</span>
</div>
<div className="flex items-center gap-4 bg-white p-4 rounded-lg opacity-60">
<div className="w-2 h-10 bg-secondary rounded-full"></div>
<div className="flex-1">
<p className="text-sm font-bold">Culture Fit</p>
<p className="text-xs text-slate-500">45 Minutes</p>
</div>
<span className="material-symbols-outlined text-slate-400" data-icon="drag_handle">drag_handle</span>
</div>
</div>
<button className="text-primary text-sm font-bold mt-6 flex items-center gap-2">
<span className="material-symbols-outlined text-lg" data-icon="add_circle">add_circle</span>
                            Add new preset
                        </button>
</div>
</div>

<div className="col-span-12 lg:col-span-8">
<div className="bg-surface-container-lowest rounded-xl shadow-[0_8px_24px_rgba(0,63,177,0.06)] overflow-hidden">

<div className="p-6 border-b border-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-4">
<button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
<span className="material-symbols-outlined" data-icon="chevron_left">chevron_left</span>
</button>
<h3 className="text-xl font-bold font-headline">October 14 – 20, 2024</h3>
<button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
<span className="material-symbols-outlined" data-icon="chevron_right">chevron_right</span>
</button>
</div>
<div className="flex items-center gap-2">
<span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
<span className="w-2 h-2 rounded-full bg-primary"></span> Interviews
                                </span>
<span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 ml-4">
<span className="w-2 h-2 rounded-full bg-slate-200"></span> Blocked
                                </span>
</div>
</div>

<div className="grid grid-cols-8 divide-x divide-slate-100 h-[600px] overflow-y-auto relative">

<div className="col-span-1 pt-12 pb-4">
<div className="h-20 text-[10px] text-right pr-3 font-bold text-slate-400 uppercase tracking-tighter">09:00 AM</div>
<div className="h-20 text-[10px] text-right pr-3 font-bold text-slate-400 uppercase tracking-tighter">10:00 AM</div>
<div className="h-20 text-[10px] text-right pr-3 font-bold text-slate-400 uppercase tracking-tighter">11:00 AM</div>
<div className="h-20 text-[10px] text-right pr-3 font-bold text-slate-400 uppercase tracking-tighter">12:00 PM</div>
<div className="h-20 text-[10px] text-right pr-3 font-bold text-slate-400 uppercase tracking-tighter">01:00 PM</div>
<div className="h-20 text-[10px] text-right pr-3 font-bold text-slate-400 uppercase tracking-tighter">02:00 PM</div>
<div className="h-20 text-[10px] text-right pr-3 font-bold text-slate-400 uppercase tracking-tighter">03:00 PM</div>
</div>

<div className="col-span-1 pt-2">
<div className="text-center mb-6">
<span className="block text-[10px] font-bold text-slate-400 uppercase">Mon</span>
<span className="text-lg font-extrabold font-headline">14</span>
</div>
<div className="relative h-[400px]">
<div className="absolute top-10 w-[calc(100%-8px)] mx-1 h-32 bg-primary/10 border-l-4 border-primary rounded-lg p-2 text-[10px]">
<p className="font-bold text-primary">Senior Frontend</p>
<p className="text-slate-600">Alex Rivera</p>
</div>
</div>
</div>

<div className="col-span-1 pt-2 bg-slate-50/30">
<div className="text-center mb-6">
<span className="block text-[10px] font-bold text-slate-400 uppercase">Tue</span>
<span className="text-lg font-extrabold font-headline">15</span>
</div>
<div className="relative h-[400px]">
<div className="absolute top-40 w-[calc(100%-8px)] mx-1 h-20 bg-slate-200/50 border-l-4 border-slate-400 rounded-lg p-2 text-[10px]">
<p className="font-bold text-slate-500 italic">Sync Blocked</p>
</div>
<div className="absolute top-[280px] w-[calc(100%-8px)] mx-1 h-16 bg-primary border-l-4 border-primary-container rounded-lg p-2 text-[10px] text-white">
<p className="font-bold">Team Review</p>
<p className="opacity-80">Design Dept</p>
</div>
</div>
</div>

<div className="col-span-1 pt-2">
<div className="text-center mb-6">
<span className="block text-[10px] font-bold text-primary uppercase">Wed</span>
<span className="text-lg font-extrabold font-headline text-primary bg-primary-fixed w-8 h-8 flex items-center justify-center rounded-full mx-auto">16</span>
</div>
<div className="relative h-[400px]">

<div className="absolute top-[160px] w-full border-t-2 border-primary z-10 flex items-center">
<div className="w-2 h-2 rounded-full bg-primary -ml-1"></div>
</div>
<div className="absolute top-10 w-[calc(100%-8px)] mx-1 h-24 bg-tertiary/10 border-l-4 border-tertiary rounded-lg p-2 text-[10px]">
<p className="font-bold text-tertiary">Quick Screen</p>
<p className="text-slate-600">Sarah Jenkins</p>
</div>
</div>
</div>

<div className="col-span-1 pt-2">
<div className="text-center mb-6">
<span className="block text-[10px] font-bold text-slate-400 uppercase">Thu</span>
<span className="text-lg font-extrabold font-headline">17</span>
</div>
</div>

<div className="col-span-1 pt-2">
<div className="text-center mb-6">
<span className="block text-[10px] font-bold text-slate-400 uppercase">Fri</span>
<span className="text-lg font-extrabold font-headline">18</span>
</div>
<div className="relative h-[400px]">
<div className="absolute top-[200px] w-[calc(100%-8px)] mx-1 h-32 bg-primary/10 border-l-4 border-primary rounded-lg p-2 text-[10px]">
<p className="font-bold text-primary">HR Final</p>
<p className="text-slate-600">Mark Thompson</p>
</div>
</div>
</div>

<div className="col-span-1 pt-2 bg-slate-50/50">
<div className="text-center mb-6">
<span className="block text-[10px] font-bold text-slate-400 uppercase">Sat</span>
<span className="text-lg font-extrabold font-headline text-slate-400">19</span>
</div>
</div>

<div className="col-span-1 pt-2 bg-slate-50/50">
<div className="text-center mb-6">
<span className="block text-[10px] font-bold text-slate-400 uppercase">Sun</span>
<span className="text-lg font-extrabold font-headline text-slate-400">20</span>
</div>
</div>
</div>
</div>

<div className="mt-8 flex items-center gap-6 p-6 bg-surface-container-low rounded-xl">
<p className="text-sm font-bold text-on-surface whitespace-nowrap">Sync Status:</p>
<div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm">
<img className="w-4 h-4" data-alt="vibrant abstract colorful brand logo for google workspace with geometric shapes" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMzJzupJVdAP8r4nNDYamhddzWmjcCXgmveM1zqzhwd-6Z54Fi9CPzT4cKRcc8a5EZtCZckBj4O4nd5I52fCLVetj-hyKE-bE8B4UmIri3dlv0diwMDdfJOmx1MgJ1MRiNs5z83ASmueo99Sj4Y8v-kuZbZ5SHXJRSN6_rSX_NaRDCI_bpmhm4jSlGNmWBaC3WlSOY0nv3AzbrPeR58IeAO7n9tTsYkU7vSoQEsDcKFLaD4VLlHU3h00ZsLQXvdbH8tuTc3fDHqGo"/>
<span className="text-xs font-medium">Google Workspace</span>
<span className="w-2 h-2 rounded-full bg-tertiary"></span>
</div>
<div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm">
<img className="w-4 h-4" data-alt="stylized microsoft outlook brand icon with vibrant blue colors and geometric letter O" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvlpnjDBreHzbJSPMYL7ems4zTpKLQHpoetVRPooaqP6xHC3Fs9KUfq1fA5fmnuaE5tMzfUKSuBcH0ONsXbA9ajKVmFYXMEAisMoEoIRisHV0QVJn7oCAE7Eh4L2VOeCNEvxmh5m_zBObaCsuDmzxH1Z7-w73smKxjQLqBGgtD9pWUxo4Y_X2ewALKmDuhDunaTaMOJ7UswfdhsJudtbJTZ_R0QDH9hQtWPISLTS1C80zBMvCz5J9xZ47EgiDLTcJH5ZwIlqsYCe0"/>
<span className="text-xs font-medium">Outlook 365</span>
<span className="w-2 h-2 rounded-full bg-slate-300"></span>
</div>
<button className="ml-auto text-primary text-xs font-bold hover:underline">Manage Connections</button>
</div>
</div>
</div>

<section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
<div className="bg-primary/5 p-6 rounded-xl flex items-center gap-4">
<div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white">
<span className="material-symbols-outlined" data-icon="timer">timer</span>
</div>
<div>
<p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Focus Time</p>
<p className="text-2xl font-extrabold font-headline">14.5 hrs</p>
<p className="text-[10px] text-tertiary font-bold">+20% from last week</p>
</div>
</div>
<div className="bg-tertiary/5 p-6 rounded-xl flex items-center gap-4">
<div className="w-12 h-12 bg-tertiary rounded-lg flex items-center justify-center text-white">
<span className="material-symbols-outlined" data-icon="group">group</span>
</div>
<div>
<p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Interviews Scheduled</p>
<p className="text-2xl font-extrabold font-headline">12 Total</p>
<p className="text-[10px] text-slate-400">Next: Tomorrow 10:00 AM</p>
</div>
</div>
<div className="bg-secondary/10 p-6 rounded-xl flex items-center gap-4">
<div className="w-12 h-12 bg-on-surface rounded-lg flex items-center justify-center text-white">
<span className="material-symbols-outlined" data-icon="bolt">bolt</span>
</div>
<div>
<p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Availability Score</p>
<p className="text-2xl font-extrabold font-headline">92%</p>
<p className="text-[10px] text-primary font-bold">Optimized for hiring</p>
</div>
</div>
</section>
</div>
</main>

    </>
  );
};

export default HrAvailabilityTimetable;