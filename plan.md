Great. Now we move from **idea → execution plan**.
You said you’ll give this to your **antigravity agent**, so this needs to be **clear, structured, and phase-wise**, not random coding.

Below is a **full phase-wise implementation plan** + instructions you can directly give your agent.

---

# Overall System Modules (Before Phases)

Your system has these main modules:

1. Authentication
2. Job Posting
3. Candidate Application Portal
4. Resume Upload & Parsing
5. Candidate–Job Match Scoring
6. Candidate Ranking Dashboard
7. Workflow Actions (Shortlist / Reject / Schedule)
8. Email Automation
9. Interview Scheduling
10. Candidate Timeline Tracking
11. SLA Reminder System
12. HR Analytics Dashboard
13. Reports Generation

Implementation will be **phase by phase**.

---

# Important Instructions For Your Antigravity Agent

Tell your agent this first:

## Give This Instruction

```
We are building an AI Hiring Workflow & HR Process Automation System.

Before writing code for any phase:
1. First give the implementation plan for that phase.
2. Then design database schema changes if needed.
3. Then list APIs to be created.
4. Then implement backend.
5. Then implement frontend.
6. After implementation, provide testing steps for that phase.
7. Do not jump phases.
8. Each phase must be working before moving to next phase.
9. Maintain modular structure.
10. Use React + FastAPI + MongoDB architecture.
```

This will keep development structured.

---

# Phase Wise Implementation Plan

## Phase 1 — Project Setup & Authentication

### Goal

Basic system with login/signup and user roles (HR / Candidate).

### Backend

* Setup FastAPI / Node project
* Setup MongoDB connection
* User schema
* JWT authentication
* Login API
* Signup API
* Role-based access

### Frontend

* Login page
* Signup page
* Role selection
* Dashboard placeholder

### Database Collections

```
Users
Jobs
Candidates
Applications
Interviews
Emails
Reports
```

### Testing After Phase 1

Agent should test:

* User signup
* User login
* JWT token working
* Role-based routing
* Dashboard access
* Logout

---

# Phase 2 — Job Posting & Career Page

### Goal

HR can post jobs, candidates can apply.

### Backend

APIs:

* Create Job
* Get Jobs
* Apply Job
* Get Applications

### Frontend

Pages:

* HR Job Posting Page
* Job Listings Page
* Career Page
* Apply Form
* Resume Upload

### Database Fields

Job:

```
title
description
required_skills
experience_required
education_required
created_by
```

Application:

```
candidate_id
job_id
resume_file
status
match_score
stage
```

### Testing After Phase 2

* HR posts job
* Job visible on career page
* Candidate applies
* Resume uploaded
* Application stored in DB
* HR can see applicants list

---

# Phase 3 — Resume Parsing & Candidate–Job Match Score

### Goal

AI layer.

### Backend

Modules:

* Resume text extraction
* Skill extraction
* Education extraction
* Experience extraction
* Job requirement matching
* Match score calculation
* Missing skills detection
* Candidate classification

### Output

For each candidate:

```
match_score
matched_skills
missing_skills
experience_match
education_match
classification
```

### Frontend

* Candidate details page
* Match score display
* Skill breakdown
* Missing skills
* AI suggestion

### Testing After Phase 3

* Upload resume
* Resume parsed correctly
* Skills extracted
* Match score generated
* Candidate classification shown
* Candidate ranking updated

---

# Phase 4 — Candidate Ranking Dashboard

### Goal

HR dashboard with ranked candidates.

### Dashboard Should Show

* Candidate list
* Match score
* Ranking
* Filters
* Status
* Stage
* Candidate profile
* Resume viewer

### Testing After Phase 4

* Candidates sorted by score
* Filters working
* Candidate details visible
* Resume view working
* Ranking updates automatically

---

# Phase 5 — Workflow Actions & Automation

### HR Actions

* Shortlist
* Reject
* Request Info
* Schedule Interview
* Move to Final Round
* Offer
* Hold Candidate

### System Should:

* Update candidate stage
* Log timeline event
* Trigger email automation
* Update dashboard
* Maintain workflow guardrails

### Testing After Phase 5

* Status change works
* Timeline updated
* Email triggered
* Invalid stage change prevented
* Dashboard updates

---

# Phase 6 — Interview Scheduling System

### Features

* HR sets available slots
* Schedule interview
* Meeting link
* Calendar entry
* Interview reminder email

### Testing After Phase 6

* HR creates slots
* Candidate scheduled
* Email sent
* Reminder sent
* Interview appears in dashboard

---

# Phase 7 — SLA Reminder System

### Logic

If candidate match score > threshold:

* HR must respond within X hours
* If not → reminder email / alert

### Dashboard Widget

* High priority candidates
* Pending actions
* Overdue candidates

### Testing After Phase 7

* High score candidate flagged
* Reminder triggered
* SLA timer working
* Alerts visible

---

# Phase 8 — Candidate Timeline & Lifecycle Tracking

### Timeline Stages

```
Applied
Screened
Shortlisted
Interview Scheduled
Interview Completed
Final Decision
Offer
Rejected
```

### Timeline Should Show

* Date
* Action
* HR name
* Notes

### Testing After Phase 8

* Timeline updates after each action
* History stored
* Candidate portal shows timeline

---

# Phase 9 — Analytics Dashboard

### Dashboard Charts

* Applications per job
* Shortlisted vs rejected
* Hiring funnel
* Average match score
* Time to hire
* Skills demand chart
* Department hiring
* SLA violations

### Testing After Phase 9

* Charts load correctly
* Data accurate
* Filters working

---

# Phase 10 — Reports Generation

### Reports

* Hiring report
* Candidate report
* Interview report
* Monthly report
* Export PDF

### Testing After Phase 10

* Reports generated
* Data correct
* PDF download works

---

# Final System Flow (Full Pipeline)

This is your full system:

```
Career Page → Apply → Resume Upload
        ↓
Resume Parsing → Match Score → Classification
        ↓
Candidate Ranking Dashboard
        ↓
HR Action → Shortlist / Reject / Schedule
        ↓
Email Automation
        ↓
Interview Scheduling
        ↓
Interview Feedback
        ↓
Final Decision
        ↓
Candidate Timeline
        ↓
Analytics Dashboard
        ↓
Reports
```

---

# Very Important Rule For Development

Tell your agent this:

```
We will build the system phase by phase.

For each phase:
1. Provide implementation plan
2. Provide database schema changes
3. Provide backend APIs
4. Implement backend
5. Implement frontend
6. Provide testing steps
7. Confirm phase working
8. Then move to next phase
```

This will prevent chaos during hackathon.

---

# Suggested Phase Order (Important)

Build in this order:

| Phase | Module                 |
| ----- | ---------------------- |
| 1     | Auth                   |
| 2     | Job + Apply            |
| 3     | Resume Parsing + Score |
| 4     | Candidate Dashboard    |
| 5     | Workflow Actions       |
| 6     | Email Automation       |
| 7     | Interview Scheduling   |
| 8     | Timeline               |
| 9     | SLA                    |
| 10    | Analytics              |
| 11    | Reports                |
| 12    | Final UI Polish        |


