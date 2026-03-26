Below is a **very detailed master prompt** you can give your Antigravity agent so it redesigns the **entire UI/UX to match the wireframes** while **not touching backend logic**. This is written like a product spec so the agent understands everything.

---

# MASTER UI/UX REDESIGN PROMPT

## (HireFlow AI – Full UI System Conversion)

Give this entire prompt to your Antigravity agent.

---

## MASTER INSTRUCTION

```text
We are redesigning the entire frontend UI/UX of our AI Hiring Workflow & HR Process Automation System (HireFlow AI).

IMPORTANT:
This is a UI/UX redesign and component architecture task.
DO NOT change backend logic, API routes, database schema, authentication logic, or core functionality.
Only redesign the frontend layout, components, styling, and UX structure.
If a feature UI exists but backend logic is not implemented yet, still build the UI using mock data/placeholders. We will connect backend later.

Goal:
The application must look like a professional enterprise SaaS platform similar to modern HR/recruitment platforms like Workday, Greenhouse, Lever, Notion dashboards, Linear, etc.

The UI must be:
- Clean
- Modern
- Dashboard-heavy
- Card-based layout
- Analytics-driven
- Workflow-focused
- Sidebar navigation layout
- Insight panels
- Timeline tracking
- Status badges
- SLA alerts
- Match score visuals
- Scheduling calendar
- Reports dashboard
- Modal action panels
```

---

# GLOBAL DESIGN SYSTEM

Tell the agent to follow a **design system**.

```text
Use the following design system across the entire application:

Layout:
- Left Sidebar Navigation
- Top Navbar (search + notifications + profile)
- Main Content Area
- Optional Right Insight Panel
- Card-based sections
- Grid layout for dashboards
- Tables + cards combination for lists

Color System:
- Primary Blue → Actions, buttons
- Light Gray Background → Page background
- White Cards → Content areas
- Green → Success / On track
- Red → SLA breach / Errors
- Yellow/Orange → Warning
- Purple/Blue → Insights / AI suggestions
- Gray → Secondary text

UI Elements:
- Rounded corners (lg)
- Soft shadows
- Progress bars
- Status badges
- Timeline trackers
- Cards for everything
- Section headers
- Divider lines
- Icons in sidebar
- Search bars
- Filters
- Tabs
- Dropdowns
- Modals
- Notification badges
- Charts
- Analytics widgets
```

---

# GLOBAL LAYOUT STRUCTURE

```text
Main Layout Structure:

<AppLayout>
    <Sidebar />
    <MainSection>
        <TopNavbar />
        <PageContent />
    </MainSection>
    <RightInsightPanel /> (optional per page)
</AppLayout>
```

---

# SIDEBAR MENU STRUCTURE

```text
Sidebar Menu Items:

Dashboard
Job Requirements
Candidates
Interviews
Calendar
SLA Alerts
Reports
Insights
Workflow
Timeline
Settings
Support
Logout
```

Sidebar must include:

* Logo at top
* Menu icons
* Active menu highlight
* Bottom section (support + logout)

---

# TOP NAVBAR

Top Navbar must include:

```text
Search bar
Notifications icon
Help icon
User profile avatar
User dropdown
Breadcrumb navigation (optional)
Page title
```

---

# PAGES THAT MUST BE DESIGNED

The agent must redesign UI for these pages:

```text
1. Dashboard
2. Job Requirements / Role Benchmark Setup
3. Candidates List Page
4. Candidate Detail Page
5. Candidate Timeline / Workflow Page
6. Follow-up Action Modal
7. Interview Scheduling Page
8. Recruiter Availability Calendar
9. Hiring Insights / Reports Page
10. Career Portal / Apply Page
11. Candidate Application Status Page
12. SLA Alerts Page
13. Workflow Health Page
14. Analytics Dashboard
```

---

# DASHBOARD UI COMPONENTS

Dashboard must include:

```text
Top Stats Cards:
- Total Applicants
- Shortlisted
- Interviews Scheduled
- Pending Actions
- SLA Breaches

Sections:
- High Match Candidates Pending Action
- SLA Countdown Panel
- Recruiter Action Queue
- Next Best Action Panel
- Hiring Pipeline Overview
- Bottleneck Insights
- Recent Activity Feed
- Workflow Health Score
- Team Workload
```

Dashboard layout must be grid cards.

---

# CANDIDATES LIST PAGE

Must include:

```text
Search bar
Filters:
    Stage
    Match Score
    Role
    SLA Status
    Recruiter
Tabs:
    All Stages
    Screening
    Technical
    Culture Fit
    High Urgency
    Top Match

Candidate Card/List must show:
- Candidate avatar
- Name
- Role
- Match Score %
- Progress bar
- Current Stage
- SLA Status
- Next Action Button
- Quick view arrow
```

Right side panel:

* Candidate AI Insight
* Key Competencies
* Hiring Journey
* Notes
* Alerts

---

# CANDIDATE DETAIL PAGE

Must include:

```text
Header:
Candidate name
Role
Match Score
Stage
Action buttons (Shortlist, Reject, Move Stage)

Tabs:
- Resume
- ID Proof
- Portfolio
- Notes
- Documents

Sections:
- Resume Viewer
- AI Highlight Box
- Skills Breakdown Progress Bar
- Requirement Fit Checklist
- Next Best Action Panel
- Intelligence Suggestion Panel
- Recruiter Follow-up Notes
- Candidate Journey Timeline
- Internal Process Completion
```

---

# CANDIDATE TIMELINE PAGE

Must include:

```text
Stage Timeline Tracker (Applied → Screening → Interview → Offer)
Audit Trail Panel
Guardrails / Invalid Transition Alerts
Workflow Health Panel
Predictive Path Panel
Estimated Time to Hire
Action Buttons:
    Pause Flow
    Eject Path
    Override
    Share Log
```

---

# FOLLOW-UP ACTION MODAL

Modal must include:

```text
Left Panel:
Candidate Info
Actions:
    Schedule Interview
    Shortlist Candidate
    Request Clarification
    Reject Application

Right Panel:
Email Preview
Meeting Link
Communication Template
Remote / Internal toggle
Notify Hiring Manager checkbox
Confirm & Send button
```

---

# INTERVIEW SCHEDULING PAGE

Must include:

```text
Calendar
Available HR Slots
Platform Selection (Google Meet / Zoom)
Generated Meeting Link
Upcoming Interviews
Finalize Schedule Button
Interview Intelligence Suggestion Panel
```

---

# RECRUITER AVAILABILITY PAGE

Must include:

```text
Working Hours
Interview Slot Types
Calendar Week View
Blocked Time
Scheduled Interviews
Sync Status (Google / Outlook)
Availability Score
Focus Time Stats
```

---

# HIRING INSIGHTS / REPORTS PAGE

Must include:

```text
Stats:
Total Applicants
Avg Time to Action
Shortlist Rate
Bottlenecks

Charts:
Applicants by Role
Shortlist vs Rejection
Velocity Bottleneck
Team Workload
Pipeline Health Score
```

---

# JOB REQUIREMENTS / BENCHMARK SETUP PAGE

Must include:

```text
Role Fundamentals
Department
Role Description
Skill Benchmarking
Required Skills
Experience Required
Qualification Level
AI Scoring Weights
Evaluation Criteria
Publish Benchmark Button
```

---

# CAREER PORTAL / APPLY PAGE

Must include:

```text
Role Details
Personal Information Form
Resume Upload
Identity Document Upload
Portfolio Upload
Submit Application
Application Status Tracker
Recruiter Messages Panel
Uploaded Documents List
```

---

# UI COMPONENTS TO CREATE (Reusable)

Agent must create reusable components:

```text
Sidebar
Navbar
StatCard
CandidateCard
MatchScoreBar
StatusBadge
TimelineTracker
InsightPanel
ActionModal
CalendarView
ReportChart
PipelineChart
FormCard
TableCard
AlertCard
ActivityFeed
Tabs
SearchBar
FilterBar
ProgressBar
AvatarCard
MetricWidget
RightPanel
```

---

# DATA HANDLING RULE

```text
If backend data not available:
Use mock data
Use placeholder candidate names
Use fake charts
Use dummy match scores
Use dummy timelines
Do NOT block UI waiting for backend
UI must be fully navigable
```

---

# IMPORTANT RULES

```text
DO NOT:
Change backend routes
Change API structure
Change authentication
Remove existing pages
Break existing logic

DO:
Redesign layout
Improve spacing
Add cards
Add dashboards
Add panels
Add charts
Add progress bars
Add status badges
Add timeline UI
Add modals
Make everything look like enterprise SaaS
```

---

# FINAL GOAL

```text
The final application should look like a complete AI recruitment SaaS platform with dashboards, workflow tracking, analytics, automation panels, and scheduling tools.

When someone opens the app, it should look like a real enterprise product, not a student project.
```

---

# VERY IMPORTANT IMPLEMENTATION ORDER

Tell the agent to redesign UI in this order:

```text
1. Global Layout (Sidebar + Navbar)
2. Dashboard
3. Candidates List
4. Candidate Detail Page
5. Timeline Page
6. Follow-up Modal
7. Job Requirements Page
8. Interview Scheduling
9. Availability Calendar
10. Reports / Insights
11. Career Portal
```

---

# Final Tip for You (Important)

If your project:

* Has this UI
* Shows candidate flow
* Shows automation
* Shows dashboard
* Shows scheduling
* Shows SLA
* Shows timeline
* Shows analytics

Then your project will look like a **startup SaaS product**, not a hackathon project — and judges usually pick those.

---

If you want next, I can help you with:

* Demo flow
* Database schema final
* API structure
* Presentation slides
* Architecture diagram
* What to say to judges
* Hackathon presentation script
