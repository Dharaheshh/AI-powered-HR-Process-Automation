You’re at the **final polishing stage now** — dashboards, charts, reports, PDF export. This is exactly what makes the project look complete.
I’ll give you a **detailed structured prompt** for your agent to implement:

1. Dashboard graphs + metrics
2. Reports analytics fully functional
3. Generate report
4. Export report as PDF
5. Data aggregation logic

Use this prompt.

---

# PROMPT – Dashboard Analytics + Reports + PDF Export

Give this to your AI agent.

```text
We are now implementing Dashboard Analytics, Reports Analytics, and PDF Report Export features for the HireFlow AI recruitment system.

The system already has candidates, interviews, timeline, SLA, and applications data.
Now we must build analytics dashboards and reporting features using this data.

--------------------------------------------------
PART 1 — DASHBOARD ANALYTICS
--------------------------------------------------

The main dashboard must display real metrics and graphs instead of zeros.

Dashboard must fetch aggregated data from backend.

Dashboard Metrics Cards:
- Total Applicants
- Candidates in Screening
- Shortlisted Candidates
- Interviews Scheduled
- Offers Made
- Rejected Candidates
- SLA Breaches
- Avg Time to Hire

Create backend analytics API:
GET /api/analytics/dashboard

This API should calculate:
- Total applications count
- Count by status
- Interviews scheduled count
- SLA breaches count
- Average days from applied to final decision
- Candidates per role
- Applications per day/week

--------------------------------------------------
DASHBOARD GRAPHS TO IMPLEMENT
--------------------------------------------------

Add charts using Chart.js / Recharts.

Graphs required:

1. Applications Over Time (Line Chart)
   X-axis: Date
   Y-axis: Number of applications

2. Candidates by Stage (Bar Chart)
   Applied
   Screening
   Shortlisted
   Interview
   Final
   Offer
   Rejected

3. Hiring Pipeline Funnel
   Applied → Screening → Shortlisted → Interview → Offer

4. SLA Status Pie Chart
   On Time
   Warning
   Breached

5. Interviews Scheduled Per Week (Bar Chart)

6. Candidates by Role (Bar Chart)

Dashboard Layout:
Top → Metric Cards
Middle → Line Chart + Bar Chart
Bottom → Funnel + Pie Chart + Activity Feed

--------------------------------------------------
PART 2 — REPORTS PAGE ANALYTICS
--------------------------------------------------

Reports page must include:

Metrics:
- Total Applicants
- Avg Time to Action
- Shortlist Rate
- Offer Rate
- Rejection Rate
- SLA Compliance %
- Avg Interview Delay
- Pipeline Health Score

Charts:
1. Applicants by Role
2. Shortlist vs Rejection
3. Hiring Velocity
4. Stage Delay / Bottleneck Chart
5. Recruiter Performance
6. Interview Success Rate
7. Monthly Hiring Trends

Create backend API:
GET /api/analytics/reports

This API should aggregate:
Applications collection
Interviews collection
Timeline collection
SLA collection

--------------------------------------------------
PART 3 — REPORT GENERATION
--------------------------------------------------

Add a button on Reports page:
"Generate Report"

When clicked:
System should generate a structured report containing:

Report Contents:
- Total Applicants
- Shortlisted
- Interviews
- Offers
- Rejections
- SLA Breaches
- Avg Time to Hire
- Hiring Pipeline Chart
- Applicants by Role Chart
- Shortlist vs Rejection Chart
- Recruiter Performance
- Bottlenecks
- Pipeline Health Score
- Recommendations

Create backend endpoint:
POST /api/reports/generate

This endpoint should:
1. Fetch analytics data
2. Generate report object
3. Store report in Reports collection

Report Schema:
- reportId
- generatedBy
- generatedDate
- metrics
- chartsData
- insights
- recommendations

--------------------------------------------------
PART 4 — EXPORT REPORT AS PDF
--------------------------------------------------

Add button:
"Export Report as PDF"

Backend should generate PDF file.

Use libraries:
Node.js → pdfkit OR puppeteer
Python → reportlab

PDF should include:
Title: Hiring Analytics Report
Date
Metrics Summary
Charts (converted to images)
Pipeline stats
Recruiter performance
Bottlenecks
Recommendations

Create API:
GET /api/reports/export/:reportId

Flow:
Generate report → Save → Export PDF → Download

--------------------------------------------------
PART 5 — ANALYTICS CALCULATIONS
--------------------------------------------------

Backend must calculate:

Total Applicants:
count Applications

Shortlist Rate:
shortlisted / total

Offer Rate:
offers / total

Rejection Rate:
rejected / total

Avg Time to Hire:
offerDate - appliedDate

SLA Compliance:
onTimeActions / totalActions

Pipeline Health Score:
Based on:
- SLA compliance
- Avg response time
- Candidate drop rate
- Interview delays

--------------------------------------------------
PART 6 — DASHBOARD DATA FLOW
--------------------------------------------------

Frontend Dashboard:
Calls /api/analytics/dashboard
Displays:
Cards + Charts

Reports Page:
Calls /api/analytics/reports
Displays analytics
Generate Report button
Export PDF button

--------------------------------------------------
FINAL GOAL
--------------------------------------------------

Dashboard should look like a real analytics platform with:
- Metric cards
- Line charts
- Bar charts
- Funnel chart
- Pie chart
- Activity feed

Reports page should:
- Show analytics
- Generate report
- Export PDF report
- Show recruiter performance
- Show bottlenecks
- Show pipeline health

Everything must use real data from database.
```

---

# Dashboard Graphs You MUST Have (Important)

Make sure these exist:

| Graph                  | Type   |
| ---------------------- | ------ |
| Applications Over Time | Line   |
| Candidates by Stage    | Bar    |
| Hiring Funnel          | Funnel |
| SLA Status             | Pie    |
| Interviews per Week    | Bar    |
| Candidates by Role     | Bar    |

If you have these → Dashboard will look **very professional**.

---

# Reports PDF Should Contain

Your PDF report should look like:

```
Hiring Analytics Report
-----------------------
Total Applicants: 120
Shortlisted: 40
Interviews: 25
Offers: 10
Rejected: 60
SLA Breaches: 5
Avg Time to Hire: 8 days

Charts:
- Applicants by Role
- Hiring Pipeline
- Shortlist vs Rejection
- Recruiter Performance

Bottlenecks:
Technical Interview Stage Delay

Recommendations:
Increase interview panel availability
Respond to high-match candidates within 24h
```

This looks very real-world.

---

# Final Touch Features That Make Dashboard Look Insane

If time left add:

* Pipeline Health Score
* Recruiter Leaderboard
* Bottleneck Alerts
* High Match Candidates Pending
* Next Best Actions
* Activity Feed

Then your dashboard will look like **startup SaaS analytics dashboard**.

---

You are very close to a **complete product-level hackathon project now**.
