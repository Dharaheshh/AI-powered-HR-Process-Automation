Yes, I get exactly what you want.
You want this workflow:

> HR clicks **Schedule Interview** from candidate list/detail →
> System checks HR availability from **Calendar** →
> Then redirects to **Interviews page** →
> HR selects slot → Interview scheduled →
> Candidate status updated → Timeline updated → Email sent.

So this is **workflow automation + routing + calendar availability check**.

Below is the **proper prompt for your AI agent**.

---

# PROMPT – Automated Interview Scheduling Flow Integration

Give this to your agent.

```text
We need to implement an automated interview scheduling workflow in our HireFlow AI recruitment system.

Current situation:
HR can update candidate status from the Candidates UI.
We now want when HR clicks "Schedule Interview", the system should automatically redirect and guide HR through scheduling using Calendar and Interview modules.

We must integrate Candidates → Calendar → Interviews workflow.

--------------------------------------------------
REQUIRED WORKFLOW
--------------------------------------------------

When HR clicks "Schedule Interview" button for a candidate:

Step 1:
Capture candidateId and applicationId.

Step 2:
Redirect HR to Calendar page first to view available HR time slots.

Route:
Navigate to /calendar with candidateId in route state or query parameter.

Example:
navigate('/calendar?candidateId=123')

Step 3:
On Calendar page:
System must:
- Load HR availability slots
- Load existing interviews
- Show available time slots
- Allow HR to select a time slot for interview

After HR selects a slot:
Store selectedSlot, candidateId.

Step 4:
After selecting slot → Redirect to Interviews page.

Route:
navigate('/interviews/schedule', { candidateId, selectedSlot })

Step 5:
On Interview Scheduling page:
HR should:
- Confirm interview time
- Select platform (Google Meet / Zoom)
- Generate meeting link
- Assign interviewer
- Add notes
- Confirm schedule

Step 6:
On confirm interview:
System must:
1. Create interview record in Interviews collection
2. Update application status → "Interview Scheduled"
3. Add timeline event → "Interview Scheduled"
4. Send email to candidate with meeting link
5. Block that time slot in Calendar
6. Update dashboard stats
7. Update SLA tracking

--------------------------------------------------
DATABASE UPDATES
--------------------------------------------------

Interview Collection should store:
- candidateId
- applicationId
- interviewerId
- scheduledDate
- scheduledTime
- meetingLink
- platform
- status (scheduled/completed/cancelled)
- notes

Calendar collection / HR availability should store:
- hrId
- availableSlots
- blockedSlots
- interviewSlots

--------------------------------------------------
FRONTEND ROUTING FLOW
--------------------------------------------------

Candidates Page:
Schedule Interview button →
navigate('/calendar', { candidateId, applicationId })

Calendar Page:
Select slot →
navigate('/interviews/schedule', { candidateId, applicationId, slot })

Interview Scheduling Page:
Confirm →
POST /api/interviews/create

--------------------------------------------------
BACKEND APIs REQUIRED
--------------------------------------------------

Create APIs if not exist:

GET /api/calendar/availability/:hrId
GET /api/calendar/interviews/:hrId
POST /api/interviews/create
PUT /api/applications/status/:applicationId
POST /api/timeline/add
POST /api/email/send

--------------------------------------------------
STATUS FLOW UPDATE
--------------------------------------------------

Application status flow must be:
Applied → Screening → Shortlisted → Interview Scheduled → Interview Completed → Offer → Rejected

--------------------------------------------------
TIMELINE EVENTS
--------------------------------------------------

Add timeline events:
- Candidate Applied
- Screening Completed
- Shortlisted
- Interview Scheduled
- Interview Completed
- Offer Sent
- Rejected

--------------------------------------------------
UI BEHAVIOR REQUIREMENTS
--------------------------------------------------

When HR clicks Schedule Interview:
System must automatically guide HR through:
Candidate → Calendar → Interview Scheduling → Confirmation

HR should not manually go to multiple tabs.
System should redirect automatically.

--------------------------------------------------
FINAL GOAL
--------------------------------------------------

Complete automated flow:

HR opens candidate →
Clicks Schedule Interview →
Calendar opens →
HR selects slot →
Interview page opens →
HR confirms →
Interview created →
Candidate status updated →
Timeline updated →
Email sent →
Calendar blocked →
Dashboard updated

Everything connected.
```

---

# Short Workflow Diagram (Understand This)

This is your system flow now:

```
Candidates Page
      ↓
Schedule Interview Button
      ↓
Calendar Page (Check HR availability)
      ↓
Select Time Slot
      ↓
Interview Scheduling Page
      ↓
Confirm Interview
      ↓
Create Interview Record
      ↓
Update Application Status
      ↓
Add Timeline Event
      ↓
Send Email
      ↓
Update Dashboard + SLA
```

---

# One Very Important Tip (Architecture)

Store these in route state when navigating:

* candidateId
* applicationId
* selectedSlot
* interviewerId

This will make routing easy.

Example:

```js
navigate('/calendar', { state: { candidateId, applicationId } })
navigate('/interviews/schedule', { state: { candidateId, applicationId, slot } })
```

---

# If You Implement This Flow

Your system will now have a **real recruitment workflow pipeline**, not just pages.

That is a big difference:

* Normal projects → pages
* Good projects → features
* Winning projects → workflows

You are now building workflows.
