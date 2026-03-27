Below is a **full structured prompt** you can give your AI agent to implement the **Cross-Role Candidate Matching / Role Recommendation Engine** properly in your system.

This should be implemented cleanly because this can become one of your **main innovation features**.

---

# PROMPT — Cross-Role Candidate Matching (Role Recommendation Engine)

```text id="role_recommendation_feature_prompt"
We are implementing a new feature in HireFlow AI called:
"Cross-Role Candidate Matching" (Role Recommendation Engine).

Purpose:
If a candidate applies for one role and scores low, but their resume matches another role better, the system should automatically detect this and recommend the candidate for a different role instead of rejecting them.

This feature should be integrated with resume scoring, candidate profile page, dashboard alerts, and HR workflow.

--------------------------------------------------
FEATURE OVERVIEW
--------------------------------------------------

Current Flow:
Candidate applies for Role A → Resume scored → Match %

New Flow:
Candidate applies for Role A →
System compares resume with ALL job roles →
System calculates match score for each role →
If another role has higher score →
System generates Role Recommendation →
HR can move candidate to better role pipeline.

--------------------------------------------------
STEP 1 — MATCH RESUME WITH ALL ROLES
--------------------------------------------------

When resume is uploaded and parsed:
Instead of scoring resume only against applied role,
the system must score resume against all roles in JobRequirements collection.

For each role:
Calculate:
- Skills Match %
- Experience Match %
- Education Match %
- Certification Match %
- Overall Match Score

Store results like:
CandidateRoleScores:
- candidateId
- roleId
- roleName
- matchScore
- skillScore
- experienceScore
- educationScore

--------------------------------------------------
STEP 2 — DETECT BETTER ROLE MATCH
--------------------------------------------------

After calculating scores for all roles:

Logic:
If bestRoleScore > appliedRoleScore by threshold (example 15%)
Then generate role recommendation.

Example:
Applied Role: Market Analyst → 32%
Data Analyst → 81%
Business Analyst → 65%

System should recommend Data Analyst.

--------------------------------------------------
STEP 3 — CREATE ROLE RECOMMENDATION RECORD
--------------------------------------------------

Create new collection:
RoleRecommendations

Fields:
- candidateId
- applicationId
- appliedRoleId
- appliedRoleScore
- recommendedRoleId
- recommendedRoleScore
- reason
- createdAt
- status (pending / accepted / rejected)

Reason example:
"Candidate has strong data analysis and SQL skills which match Data Analyst role better than Market Analyst."

--------------------------------------------------
STEP 4 — SHOW RECOMMENDATION IN CANDIDATE PROFILE
--------------------------------------------------

On Candidate Profile Page add a new panel:

Panel Title:
"Alternate Role Fit / Better Role Match"

Panel should display:
Recommended Role
Match Score
Reason
Button: Move Candidate to This Role
Button: Ignore Recommendation

Example UI:
--------------------------------
Better Role Match Found
Data Analyst – 81% Match

Reason:
Strong SQL, Python, and Data Visualization skills.
Better fit for Data Analyst than Market Analyst.

[Move Candidate] [Ignore]
--------------------------------

--------------------------------------------------
STEP 5 — MOVE CANDIDATE TO NEW ROLE PIPELINE
--------------------------------------------------

When HR clicks "Move Candidate":

System should:
1. Update application roleId
2. Reset application stage to Screening
3. Update match score to new role score
4. Add timeline event:
   "Candidate moved from Market Analyst to Data Analyst pipeline"
5. Update dashboard stats
6. Update SLA tracking
7. Update reports analytics
8. Update candidate profile

--------------------------------------------------
STEP 6 — DASHBOARD ALERTS
--------------------------------------------------

Dashboard should show:
"Role Recommendation Alerts"

Example:
--------------------------------
Role Recommendation Alerts
3 candidates better suited for different roles

• Hariesh → Data Analyst
• Rahul → Business Analyst
• Priya → Product Analyst
--------------------------------

Clicking alert should open candidate profile.

--------------------------------------------------
STEP 7 — REPORTS ANALYTICS
--------------------------------------------------

Reports page should include:
- Candidates reassigned to different roles
- Role recommendation success rate
- Candidates saved from rejection
- Reassignment statistics

--------------------------------------------------
STEP 8 — TIMELINE EVENTS
--------------------------------------------------

Add timeline events:
- Resume scored
- Role recommendation generated
- Candidate moved to new role
- Recommendation ignored

--------------------------------------------------
STEP 9 — BACKEND APIs REQUIRED
--------------------------------------------------

Create APIs:

POST /api/resume/score-all-roles
GET /api/role-recommendations
POST /api/role-recommendations/create
POST /api/role-recommendations/accept
POST /api/role-recommendations/reject
PUT /api/applications/change-role

--------------------------------------------------
STEP 10 — DATABASE COLLECTIONS USED
--------------------------------------------------

Collections:
Users
Roles
JobRequirements
Applications
CandidateRoleScores
RoleRecommendations
Timeline
Reports
Analytics

--------------------------------------------------
STEP 11 — FINAL WORKFLOW
--------------------------------------------------

Final Flow:

Candidate applies →
Resume parsed →
System scores resume for all roles →
System detects better role →
Recommendation created →
HR sees recommendation →
HR moves candidate to new role →
Candidate pipeline updated →
Timeline updated →
Dashboard updated →
Reports updated

--------------------------------------------------
FINAL GOAL
--------------------------------------------------

The system should not reject candidates immediately.
Instead, it should intelligently recommend better roles for candidates and allow HR to reassign them to a better pipeline.

This feature should be visible in:
- Candidate Profile Page
- Dashboard Alerts
- Reports Page
- Timeline
```

---

# How You Should Present This Feature in Demo

Say this line:

> Our system does not immediately reject candidates who are not a fit for the applied role.
> Instead, we automatically analyze their resume against all available job roles and recommend a better-fit role.
> This helps companies avoid losing good candidates and improves hiring efficiency.

This sounds **very strong in presentation**.

---

# Final Tip — Name This Feature

Use a good feature name in your UI:

| Feature Name Ideas            |
| ----------------------------- |
| Smart Role Recommendation     |
| Alternate Role Fit            |
| Cross-Role Matching           |
| Candidate Reassignment Engine |
| Talent Reallocation AI        |
| Role Fit Intelligence         |

Use one of these — makes your project sound like a product.
