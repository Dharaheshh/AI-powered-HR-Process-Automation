Below is the **final integration prompt** you should give your AI agent so that **all UI pages, sidebar navigation, routing, workflow actions, dashboards, SLA, reports, calendar, interviews, timeline, etc. all become functional and connected**.

This is not just UI — this is **UI → Navigation → Workflow → Backend Integration Plan**.

Copy everything below and give it to your agent.

---

# MASTER INTEGRATION PROMPT (HireFlow AI – Full UI Integration)

```text
We have already implemented most UI pages and backend modules for our AI Hiring Workflow & HR Automation System (HireFlow AI).

Now the goal is to integrate all UI pages, navigation, workflows, and actions so the entire system works as one connected platform.

IMPORTANT RULES:
1. Do NOT change database schema unless required.
2. Do NOT change core backend logic unless necessary.
3. Focus on integrating UI pages with routing, navigation, APIs, and workflow actions.
4. Every sidebar item must navigate to its correct page.
5. Every button/action must perform its workflow function.
6. Dashboard, SLA, Reports, Calendar, Interviews must all be connected with real data.
7. No duplicate pages (Dashboard/Settings same, Reports/SLA same must be fixed).
8. Ensure proper routing structure.
9. Maintain modular architecture.
10. After integration, provide testing steps.

---------------------------------------------------
GLOBAL NAVIGATION INTEGRATION
---------------------------------------------------

Sidebar Menu Items must route to:

Dashboard → /dashboard
Job Requirements → /job-requirements
Candidates → /candidates
Interviews → /interviews
Calendar → /calendar
SLA Alerts → /sla-alerts
Reports → /reports
Settings → /settings

Implement React Router routing for all pages.

When clicking sidebar items, it must navigate to respective pages and load data.

---------------------------------------------------
PAGE FUNCTIONALITY REQUIREMENTS
---------------------------------------------------

1. DASHBOARD
Dashboard must show:
- Total Applicants
- Shortlisted
- Interviews Scheduled
- Pending Actions
- SLA Breaches
- High Match Candidates Pending Action
- SLA Countdown
- Recruiter Action Queue
- Next Best Action
- Pipeline Overview
- Bottleneck Insights
- Recent Activity

Dashboard must pull data from:
Applications collection
Interviews collection
SLA alerts
Timeline logs

Dashboard actions:
- Clicking candidate → Candidate Detail Page
- Clicking SLA breach → SLA Page
- Clicking interview → Interview Page
- Clicking report → Reports Page

---------------------------------------------------

2. JOB REQUIREMENTS PAGE
This page manages role benchmarks.

Functions:
- Create role requirements
- Update requirements
- Set skill weights
- Set experience requirements
- Publish benchmark

These requirements will be used in Phase 3 resume scoring.

Connect this page to:
Roles collection
JobRequirements collection

---------------------------------------------------

3. CANDIDATES PAGE
Candidates list must:
- Show candidate cards
- Match score
- Stage
- SLA status
- Next action
- Filters
- Search
- Stage tabs

Click candidate → Candidate Detail Page.

---------------------------------------------------

4. CANDIDATE DETAIL PAGE
Must include:
- Resume viewer
- Match score
- Skill breakdown
- Requirement fit
- Next best action
- Follow-up notes
- Candidate timeline
- Internal process progress
- Action buttons:
    Shortlist
    Reject
    Schedule Interview
    Request Clarification
    Move Stage

Each button must update:
Application status
Timeline logs
Trigger email automation
Update dashboard stats

---------------------------------------------------

5. FOLLOW-UP / ACTION MODAL
When HR clicks action:
Open modal with:
- Email preview
- Meeting link
- Template
- Confirm & Send

On confirm:
- Update application status
- Create timeline event
- Send email
- Update dashboard
- Update SLA tracking

---------------------------------------------------

6. INTERVIEWS PAGE
Must show:
- Scheduled interviews
- Upcoming interviews
- Interview calendar
- Candidate interview stage
- Interview notes

Click schedule interview → Interview Scheduling Page.

---------------------------------------------------

7. INTERVIEW SCHEDULING PAGE
Must:
- Show calendar
- Show available HR slots
- Select time slot
- Generate meeting link
- Send invite email
- Update application stage to interview scheduled
- Add interview record
- Update timeline

---------------------------------------------------

8. CALENDAR PAGE
Calendar must show:
- HR availability
- Interviews
- Blocked time
- Scheduled meetings
- Weekly view
- Monthly view

Calendar must pull data from:
Interviews
HR availability
Blocked slots

---------------------------------------------------

9. SLA ALERTS PAGE
Must show:
- High match candidates pending action
- SLA overdue candidates
- SLA countdown timers
- Breach alerts
- HR pending actions

Click candidate → Candidate Detail Page.

SLA logic:
If match score > threshold and no action within time → SLA breach.

---------------------------------------------------

10. REPORTS PAGE
Reports page must show:
- Total applicants
- Avg time to action
- Shortlist rate
- Bottlenecks
- Applicants by role
- Shortlist vs rejection chart
- Pipeline health score
- Team workload
- Hiring velocity
- Export report

Reports must aggregate data from:
Applications
Timeline
Interviews
Roles

---------------------------------------------------

11. SETTINGS PAGE
Settings must include:
- User profile
- Email templates
- SLA settings
- Role management
- System configuration
- Notification settings

Fix issue:
Dashboard and Settings currently same → separate them properly.

---------------------------------------------------
WORKFLOW INTEGRATION LOGIC
---------------------------------------------------

Application Workflow Stages:
Applied → Screening → Shortlisted → Interview → Final → Offer → Rejected

Every action must:
- Update application stage
- Create timeline log
- Update SLA tracking
- Update dashboard metrics
- Trigger email automation if needed

---------------------------------------------------
DATA FLOW ARCHITECTURE
---------------------------------------------------

Frontend → Node Backend → MongoDB
Frontend → Node Backend → Python FastAPI (Resume scoring)

Collections:
Users
Roles
JobRequirements
JobOpenings
Applications
Interviews
Timeline
EmailLogs
SLAAlerts
Reports

---------------------------------------------------
FINAL INTEGRATION TASK LIST
---------------------------------------------------

Agent must perform:

1. Fix routing for all sidebar pages
2. Separate Dashboard and Settings pages
3. Separate Reports and SLA pages
4. Connect Dashboard with real data
5. Connect Candidates page with Applications data
6. Connect Candidate Detail page with application data
7. Implement workflow actions
8. Implement Follow-up modal logic
9. Connect Interview scheduling
10. Connect Calendar with interviews
11. Implement SLA tracking logic
12. Connect Reports analytics
13. Connect Job Requirements with scoring system
14. Ensure timeline updates on every action
15. Ensure dashboard stats update dynamically
16. Ensure navigation between pages works correctly
17. Ensure modals trigger correct backend APIs
18. Ensure stage transitions are valid
19. Ensure email automation triggers on actions
20. Provide final testing steps after integration

---------------------------------------------------
FINAL GOAL
---------------------------------------------------

The system should work like this:

HR logs in →
Dashboard →
Sees candidates →
Opens candidate →
Sees match score →
Shortlists →
Schedules interview →
Interview added to calendar →
Email sent →
Timeline updated →
SLA tracked →
Reports updated →
Dashboard updated →

Everything connected.
```

---

# FINAL IMPLEMENTATION ORDER (Tell Agent)

Ask agent to integrate in this order:

1. Routing + Sidebar navigation
2. Dashboard data integration
3. Candidates list → Candidate detail
4. Workflow actions + status updates
5. Follow-up modal + email triggers
6. Interview scheduling
7. Calendar integration
8. SLA tracking
9. Reports analytics
10. Settings page
11. Timeline updates
12. Final testing

---

# If You Finish This

Your project will not look like a hackathon project anymore.
It will look like a **real HR SaaS platform**.

And that is exactly what wins hackathons.
