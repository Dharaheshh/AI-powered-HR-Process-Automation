Yes, I understand perfectly.

You want to change from:

> Table with buttons (Shortlist / Interview / Reject)

to:

> Click candidate row → Open **Candidate Profile Page** → Show everything there → Actions + AI insights + timeline + risk + next action etc.

This is actually **much better product design** and judges will like this more.

So now we will implement:

* Candidate Profile Page
* AI Explanation Panel
* Risk Predictor
* Next Best Action
* Timeline
* SLA Info
* Interview Actions
* Notes
* Resume viewer

Below is the **detailed structured prompt** for your AI agent.

---

# PROMPT – Candidate Profile System + AI Insight Features

Give this to your agent.

```text
We are upgrading the Candidates module in HireFlow AI.

Currently candidates are displayed in a table with action buttons (Shortlist, Interview, Reject).
We want to change this workflow into a Candidate Profile system.

NEW WORKFLOW:
Candidates Page → Click Candidate → Open Candidate Profile Page → Perform all actions there.

Remove action buttons from table rows.
Instead, clicking a candidate row should navigate to:
Route: /candidates/:candidateId

--------------------------------------------------
CANDIDATE PROFILE PAGE MUST INCLUDE
--------------------------------------------------

The Candidate Profile page should be a dashboard-like layout with multiple panels.

Page Layout Sections:

1. Candidate Header
2. Resume Viewer
3. AI Candidate Analysis Panel
4. Match Score Breakdown
5. Requirement Fit
6. Next Best Action Panel
7. SLA Risk Indicator
8. Candidate Timeline
9. Interview Panel
10. Recruiter Notes
11. Documents Section
12. Actions Panel (Shortlist / Reject / Schedule Interview)

--------------------------------------------------
1. CANDIDATE HEADER
--------------------------------------------------

Display:
- Candidate Name
- Email
- Phone
- Applied Role
- Match Score %
- Current Stage
- SLA Status
- Applied Date
- Tags (High Match / Urgent / Interview Pending)

--------------------------------------------------
2. RESUME VIEWER
--------------------------------------------------

Display resume PDF viewer or file preview.
Allow HR to open resume.

--------------------------------------------------
3. AI CANDIDATE ANALYSIS PANEL (IMPORTANT FEATURE)
--------------------------------------------------

Add a panel titled:
"AI Candidate Analysis"

This panel should show:
- Skill Match %
- Experience Match %
- Education Match %
- Strengths
- Missing Skills
- AI Recommendation

Example:
Skill Match: 82%
Experience Match: 75%
Education Match: 90%

Strengths:
- React
- Node.js
- System Design

Missing:
- Docker
- AWS

AI Recommendation:
Proceed to Technical Interview

This data can be generated using resume parsing + job requirements comparison.

--------------------------------------------------
4. MATCH SCORE BREAKDOWN
--------------------------------------------------

Show progress bars:
- Skills
- Experience
- Education
- Certifications
- Projects

--------------------------------------------------
5. REQUIREMENT FIT PANEL
--------------------------------------------------

Show checklist:
✔ Required Skills matched
✔ Experience requirement met
✖ Missing certification
✔ Education requirement met

--------------------------------------------------
6. NEXT BEST ACTION PANEL (SMART FEATURE)
--------------------------------------------------

Panel should show:
Next Best Action:
- Schedule Interview
- Request Clarification
- Move to Technical Round
- Reject Candidate

System should decide based on:
Match score
Stage
SLA time
Interview status

--------------------------------------------------
7. SLA RISK INDICATOR (SMART FEATURE)
--------------------------------------------------

Panel should show:
Candidate Risk Level:
Low / Medium / High

Based on:
Time since applied
Match score
HR response delay
Stage delay

Example:
Risk Level: HIGH
Reason: High match candidate waiting 3 days without action.

--------------------------------------------------
8. CANDIDATE TIMELINE
--------------------------------------------------

Timeline showing:
Applied → Screening → Shortlisted → Interview → Final → Offer

Each timeline item should show:
- Date
- Action
- HR name
- Notes

--------------------------------------------------
9. INTERVIEW PANEL
--------------------------------------------------

Show:
- Interview status
- Scheduled date
- Interviewer
- Meeting link
- Interview notes
- Schedule Interview button

When clicking Schedule Interview:
Redirect to Calendar → Select Slot → Interview Page → Confirm

--------------------------------------------------
10. RECRUITER NOTES
--------------------------------------------------

Allow HR to add notes:
- Interview feedback
- Screening notes
- Comments

--------------------------------------------------
11. DOCUMENTS SECTION
--------------------------------------------------

Show:
- Resume
- Portfolio
- ID Proof
- Certificates

--------------------------------------------------
12. ACTION PANEL
--------------------------------------------------

Buttons:
- Shortlist
- Reject
- Schedule Interview
- Move Stage
- Send Email

Each action must:
Update application status
Add timeline event
Update SLA tracking
Update dashboard metrics

--------------------------------------------------
DATABASE COLLECTIONS USED
--------------------------------------------------

Users
Applications
JobRequirements
Roles
Interviews
Timeline
EmailLogs
SLAAlerts
Notes

--------------------------------------------------
BACKEND APIs REQUIRED
--------------------------------------------------

GET /api/candidates/:id
GET /api/applications/:id
GET /api/interviews/candidate/:id
GET /api/timeline/:candidateId
POST /api/applications/update-status
POST /api/interviews/create
POST /api/notes/add
POST /api/timeline/add

--------------------------------------------------
FINAL GOAL
--------------------------------------------------

When HR clicks a candidate:
It should open a full Candidate Profile dashboard where HR can:
- View resume
- See AI analysis
- See match breakdown
- See requirement fit
- See SLA risk
- See next best action
- See timeline
- Schedule interview
- Add notes
- Update status

Everything related to that candidate should be in one page.
```

---

# Candidate Profile Layout (Very Important UI Structure)

Your page should look like this:

```
-------------------------------------------------
Candidate Header
-------------------------------------------------
Resume Viewer | AI Analysis | Next Best Action
-------------------------------------------------
Match Breakdown | Requirement Fit | SLA Risk
-------------------------------------------------
Timeline
-------------------------------------------------
Interview Panel | Notes | Documents
-------------------------------------------------
Action Buttons
-------------------------------------------------
```

This will look **very professional**.

---

# Where Ollama Can Be Used Later

Later you can use Ollama for:

* Resume summary
* Candidate strengths extraction
* AI recommendation
* Email generation
* Interview question generation
* Candidate fit explanation

That will make your project even more impressive.

---

# If You Implement This Candidate Profile Page

Your project will look like:

> Not a hackathon project
> But an actual HR recruitment platform product.

And that is exactly what you want.
