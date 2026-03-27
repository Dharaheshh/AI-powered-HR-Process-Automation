We are implementing a new feature in HireFlow AI called:

AI Scheduling Copilot

This feature allows HR to schedule interviews using natural language (text or voice),
while integrating safely with the existing interview scheduling workflow, calendar, SLA, timeline, and communication modules.

IMPORTANT:
This feature must NOT break any existing workflow, automation, scheduling logic, timeline updates, email notifications, SLA tracking, or dashboard analytics.
It must reuse existing scheduling APIs and workflow logic.
This feature is only an input assistant, not a separate scheduling system.

--------------------------------------------------
TECH STACK (IMPORTANT FOR DEMO SAFETY)
--------------------------------------------------

Use the following stack:

Frontend:
- React
- Tailwind
- Web Speech API (for voice input)
- Axios

Backend:
- Node.js + Express (existing backend)
- Use existing scheduling APIs
- Do NOT move scheduling logic to AI service

AI / NLP Processing:
- Use Python FastAPI microservice
- Use simple NLP parsing OR Ollama local model
- The AI service should only parse commands into structured data
- The backend will handle scheduling logic

Architecture:
React → Node Backend → Python FastAPI (AI parser) → Node Backend → Database

AI service only returns:
{
  candidateName,
  interviewType,
  date,
  timeRange,
  intent (schedule/reschedule)
}

Node backend will:
- validate candidate
- check stage
- check calendar availability
- suggest slots
- schedule interview
- update timeline
- send emails

--------------------------------------------------
FEATURE PLACEMENT
--------------------------------------------------

Place AI Scheduling Copilot in:

1. Interview Scheduling Page
2. Candidate Detail Page (Schedule with AI button)
3. Optional Dashboard Quick Launcher

--------------------------------------------------
COPILOT WORKFLOW
--------------------------------------------------

Step 1:
HR opens AI Scheduling Copilot panel.

Step 2:
HR enters text or voice command.
Examples:
- Schedule Priya for technical interview tomorrow after 3 PM
- Book earliest slot for Rahul on Friday
- Reschedule Ananya to any free slot after lunch

Step 3:
Frontend sends command to AI parser API:
POST /api/ai/parse-schedule-command

Step 4:
AI parser extracts:
- candidate name
- interview type
- date
- time range
- intent (schedule/reschedule)

Step 5:
Backend receives parsed data and:
- Finds candidate
- Gets application stage
- Validates scheduling allowed
- Checks HR availability from calendar
- Finds available slots
- Returns slot suggestions

Step 6:
Frontend shows Preview Panel:
- Candidate
- Interview Stage
- Requested Date
- Available Slots
- Platform
- Actions

Step 7:
HR clicks Confirm.

Step 8:
System schedules interview using existing scheduling API:
POST /api/interviews/create

Step 9:
System must automatically:
- Create interview record
- Update candidate status
- Add timeline event
- Send email invite
- Block calendar slot
- Update dashboard metrics
- Update SLA tracking

--------------------------------------------------
UI PANEL DESIGN
--------------------------------------------------

AI Scheduling Copilot Panel must include:

- Text input field
- Voice input button
- Parsed command preview
- Suggested slots list
- Platform selection
- Confirm button
- Edit slot button
- Cancel button

Preview Panel Example:
---------------------------------
Candidate: Priya S
Stage: Technical Interview
Requested: Tomorrow after 3 PM
Available Slots:
    3:30 PM
    4:15 PM
Platform: Google Meet

Action:
Schedule + Send Invite + Update Timeline
---------------------------------

--------------------------------------------------
VOICE INPUT
--------------------------------------------------

Use Web Speech API for voice input.
Convert speech to text.
Send text to AI parser.
Do not implement heavy voice AI model.

--------------------------------------------------
AI PARSER LOGIC
--------------------------------------------------

AI parser should extract:
- candidate name
- interview type
- date
- time
- time range
- intent (schedule/reschedule)

Return structured JSON.

Example:
Input:
"Schedule Priya for technical interview tomorrow after 3 PM"

Output JSON:
{
  "candidateName": "Priya",
  "interviewType": "Technical",
  "date": "tomorrow",
  "timeRange": "after 3 PM",
  "intent": "schedule"
}

--------------------------------------------------
VALIDATION RULES
--------------------------------------------------

Before scheduling interview:
System must check:
- Candidate exists
- Candidate is in correct stage
- HR availability exists
- Slot is free
- No SLA conflict
- Candidate not already scheduled

If invalid:
Return error message and suggestions.

--------------------------------------------------
DATABASE COLLECTIONS USED
--------------------------------------------------

Use existing collections:
Applications
Interviews
Calendar
Timeline
EmailLogs
SLAAlerts
Users

Do NOT create new scheduling system.

--------------------------------------------------
IMPORTANT SAFETY RULE
--------------------------------------------------

AI Scheduling Copilot must NOT directly schedule interviews.
It must:
1. Parse command
2. Suggest slots
3. Show preview
4. Wait for HR confirmation
5. Then call existing scheduling API

This prevents workflow errors.

--------------------------------------------------
FINAL WORKFLOW
--------------------------------------------------

HR opens Copilot →
Types command →
AI parses →
System checks calendar →
Suggests slots →
HR confirms →
Interview scheduled →
Email sent →
Timeline updated →
Dashboard updated →
SLA updated

Everything must use existing workflow logic.