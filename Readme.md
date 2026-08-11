# AI-Powered HR Process Automation

A full-stack recruitment automation platform that streamlines resume processing, candidate matching, interview workflows, and HR operations with AI-assisted tooling.

## Highlights

- 📄 Resume and applicant management
- 🤖 AI-assisted candidate evaluation and matching
- 📅 Interview scheduling workflow
- 📊 Recruitment analytics and status tracking
- ⚙️ Separate ML service for AI capabilities
- 🧩 MERN-style client/server architecture with Python ML integration

## Architecture

```text
React Client
     │
     ▼
Node.js / Express API
     │
 ┌───┴─────────────┐
 ▼                 ▼
Recruitment      ML Service
Workflows        Python
                     │
                     ▼
                AI / NLP Models
```

## Tech Stack

**Frontend:** React, JavaScript / JSX  
**Backend:** Node.js, Express.js  
**AI/ML:** Python, NLP, ML service  
**Data:** MongoDB / application data layer  
**Development:** REST APIs, environment-based configuration

## Core Workflow

```text
Candidate / Resume
        ↓
Resume Processing
        ↓
Candidate Matching
        ↓
Recruiter Review
        ↓
Interview Scheduling
        ↓
Status + Analytics
```

## Project Structure

```text
AI-powered-HR-Process-Automation/
├── client/       # Frontend application
├── ml_service/   # Python AI/ML service
├── server/       # Backend APIs and services
├── .env.example
└── Readme.md
```

## Running Locally

1. Clone the repository.
2. Install dependencies for the client and server.
3. Configure environment variables using `.env.example`.
4. Start the backend, frontend, and ML service as required by the project configuration.

> Built as a practical full-stack project focused on applying AI to real recruitment workflows.
