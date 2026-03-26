Good — these are the **right questions** to answer before coding. If you decide these now, the rest of development will be smooth.

I’ll answer each properly so you can **confirm the architecture and start Phase 1**.

---

# 1. Tech Stack Decision (Very Important)

You were given 3 options:

* FastAPI only
* Node.js only
* Hybrid (Node + Python ML microservice)

## Correct Choice for Your Project:

# 👉 Hybrid Architecture

## React + Node.js + Python FastAPI + MongoDB

This is actually **industry architecture** and perfect for your project.

### Why Hybrid is Best

Your system has two different workloads:

1. Web app + APIs + authentication + dashboard → Node.js
2. Resume parsing + NLP + scoring + classification → Python

Python is better for:

* NLP
* ML
* Resume parsing
* scikit-learn
* spaCy
* pandas

Node is better for:

* APIs
* Auth
* Email automation
* Workflow engine
* Scheduling
* Real-time dashboard
* Web app backend

So architecture should be:

## Final Architecture

```text
React Frontend
        ↓
Node.js Backend (Main API + Workflow + Auth)
        ↓
Python FastAPI ML Service (Resume Analysis)
        ↓
MongoDB Database
        ↓
Email Automation Service
```

This is a **very strong architecture to show judges**.

When they ask architecture, say:

> We are using a microservice architecture where the main backend is built in Node.js and the AI resume analysis is handled by a Python FastAPI microservice.

That sounds very professional.

---

# 2. Final Tech Stack (Lock This)

## Frontend

* React.js
* Tailwind CSS
* Chart.js
* Axios

## Main Backend

* Node.js
* Express.js
* JWT Authentication
* Nodemailer / Resend
* Cron jobs (for SLA reminders)

## AI / Resume Analysis Microservice

* Python
* FastAPI
* spaCy
* scikit-learn
* pandas
* PyPDF

## Database

* MongoDB Atlas

## Deployment

* Vercel → Frontend
* Render → Node Backend
* Render → FastAPI ML Service
* MongoDB Atlas → Database

This is a **perfect hackathon stack**.

---

# 3. Final Phase Structure (Use This — Important)

We will use **13 phases**, not 10.

## Final Phase Plan

| Phase | Module                                           |
| ----- | ------------------------------------------------ |
| 1     | Project Setup + Authentication                   |
| 2     | Job Posting + Career Page                        |
| 3     | Resume Upload                                    |
| 4     | Resume Parsing + Match Score (Python ML Service) |
| 5     | Candidate Dashboard + Ranking                    |
| 6     | Workflow Actions (Shortlist / Reject / etc.)     |
| 7     | Email Automation                                 |
| 8     | Interview Scheduling                             |
| 9     | Candidate Timeline                               |
| 10    | SLA Reminder System                              |
| 11    | Analytics Dashboard                              |
| 12    | Reports Generation                               |
| 13    | Deployment + Final UI Polish                     |

Follow this order.

---

# 4. Instructions You Should Give Your Antigravity Agent

Give this exact instruction to your agent:

```text
We are building an AI Hiring Workflow & HR Process Automation System.

Tech Stack:
- Frontend: React + Tailwind
- Main Backend: Node.js + Express
- AI Service: Python FastAPI (Resume Parsing, Match Score, Classification)
- Database: MongoDB
- Email Automation: Nodemailer / Resend
- Deployment: Vercel + Render + MongoDB Atlas

Architecture:
React Frontend → Node.js Backend → Python FastAPI ML Service → MongoDB → Email Automation → Analytics Dashboard

Development Rules:
1. We will build the system phase by phase.
2. Before writing code for any phase, first provide the implementation plan.
3. Then provide database schema changes.
4. Then list backend APIs.
5. Then implement backend.
6. Then implement frontend.
7. After implementation, provide testing steps for that phase.
8. Each phase must be working before moving to the next phase.
9. Maintain modular architecture.
10. Follow the 13-phase development plan.

Phases:
1. Project Setup + Authentication
2. Job Posting + Career Page
3. Resume Upload
4. Resume Parsing + Match Score (Python ML Service)
5. Candidate Dashboard + Ranking
6. Workflow Actions
7. Email Automation
8. Interview Scheduling
9. Candidate Timeline
10. SLA Reminder System
11. Analytics Dashboard
12. Reports Generation
13. Deployment + Final UI Polish

Start with Phase 1 and first provide the implementation plan before writing code.
```

Just paste this to your agent.

---

# 5. Very Important Development Order (Hackathon Strategy)

If you are in a 24-hour hackathon, build in this **priority order**:

| Priority | Module                |
| -------- | --------------------- |
| 1        | Auth                  |
| 2        | Job Post              |
| 3        | Apply + Resume Upload |
| 4        | Resume Score          |
| 5        | Candidate Dashboard   |
| 6        | Shortlist / Reject    |
| 7        | Email Automation      |
| 8        | Interview Scheduling  |
| 9        | Timeline              |
| 10       | SLA                   |
| 11       | Analytics             |
| 12       | Reports               |
| 13       | Deployment            |
