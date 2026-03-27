from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber
import json
import logging

app = FastAPI(title="AI HR Resume Matcher")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)

def extract_text_from_pdf(file_path: str) -> str:
    text = ""
    try:
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + " "
    except Exception as e:
        logging.error(f"Error extracting PDF: {e}")
    return text

def calculate_match_score(resume_text: str, skills_required: list) -> int:
    if not resume_text.strip() or not skills_required:
        return 0
        
    resume_lower = resume_text.lower()
    
    matched_score = 0
    total_skills = len(skills_required)
    
    for skill in skills_required:
        skill_lower = skill.lower().strip()
        # Look for the exact phrase
        if skill_lower in resume_lower:
            matched_score += 1
        else:
            # Partial credit if individual words are found
            words = skill_lower.split()
            if words and all(word in resume_lower for word in words):
                matched_score += 0.5
                
    score = (matched_score / total_skills) * 100
    return min(100, int(round(score)))

@app.post("/score")
async def score_resume(
    resume: UploadFile = File(...),
    skills: str = Form(...)  # Expecting a JSON string of skills
):
    try:
        skills_list = json.loads(skills)
        if not isinstance(skills_list, list):
            raise ValueError("Skills must be a JSON array")
            
        # Save temp file
        temp_path = f"temp_{resume.filename}"
        with open(temp_path, "wb") as f:
            content = await resume.read()
            f.write(content)
            
        # Extract text
        resume_text = extract_text_from_pdf(temp_path)
        
        # Clean up temp file
        import os
        if os.path.exists(temp_path):
            os.remove(temp_path)
            
        # Calculate Score
        score = calculate_match_score(resume_text, skills_list)
        
        return {"success": True, "matchScore": score, "extractedLength": len(resume_text)}
        
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid skills JSON format")
    except Exception as e:
        logging.error(f"Scoring error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/extract-text")
async def extract_text(resume: UploadFile = File(...)):
    """Extract raw text from a PDF resume."""
    try:
        import os
        temp_path = f"temp_{resume.filename}"
        with open(temp_path, "wb") as f:
            content = await resume.read()
            f.write(content)
        
        text = extract_text_from_pdf(temp_path)
        
        if os.path.exists(temp_path):
            os.remove(temp_path)
        
        return {"success": True, "text": text}
    except Exception as e:
        logging.error(f"Text extraction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/parse-schedule")
async def parse_schedule_command(command: str = Form(...)):
    """Parse a natural language scheduling command into structured data."""
    import re
    from datetime import datetime, timedelta
    
    text = command.strip()
    text_lower = text.lower()
    result = {
        "candidateName": None,
        "interviewType": "General",
        "date": None,
        "timeRange": None,
        "intent": "schedule"
    }
    
    # Intent
    if any(w in text_lower for w in ["reschedule", "move", "change", "shift"]):
        result["intent"] = "reschedule"
    
    # Interview type
    type_map = {
        "technical": "Technical", "tech": "Technical",
        "hr": "HR", "behavioral": "Behavioral",
        "culture": "Culture Fit", "cultural": "Culture Fit",
        "system design": "System Design", "coding": "Coding",
        "phone screen": "Phone Screen", "initial": "Initial Screen",
        "final": "Final Round", "managerial": "Managerial"
    }
    for key, val in type_map.items():
        if key in text_lower:
            result["interviewType"] = val
            break
    
    # Date parsing
    today = datetime.now()
    if "today" in text_lower:
        result["date"] = today.strftime("%Y-%m-%d")
    elif "tomorrow" in text_lower:
        result["date"] = (today + timedelta(days=1)).strftime("%Y-%m-%d")
    elif "day after tomorrow" in text_lower:
        result["date"] = (today + timedelta(days=2)).strftime("%Y-%m-%d")
    else:
        # Check for weekday names
        days_of_week = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
        for i, day in enumerate(days_of_week):
            if day in text_lower:
                current_day = today.weekday()
                days_ahead = i - current_day
                if days_ahead <= 0:
                    days_ahead += 7
                target = today + timedelta(days=days_ahead)
                result["date"] = target.strftime("%Y-%m-%d")
                break
        
        # Check for explicit date patterns like "March 28", "28th March", "2026-03-28"
        if not result["date"]:
            date_match = re.search(r'(\d{4}-\d{2}-\d{2})', text)
            if date_match:
                result["date"] = date_match.group(1)
            else:
                month_match = re.search(r'(\d{1,2})(?:st|nd|rd|th)?\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*', text_lower)
                if month_match:
                    day_num = int(month_match.group(1))
                    month_names = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"]
                    month_num = month_names.index(month_match.group(2)[:3]) + 1
                    result["date"] = f"{today.year}-{month_num:02d}-{day_num:02d}"
                else:
                    month_match2 = re.search(r'(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*\s+(\d{1,2})', text_lower)
                    if month_match2:
                        month_names = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"]
                        month_num = month_names.index(month_match2.group(1)[:3]) + 1
                        day_num = int(month_match2.group(2))
                        result["date"] = f"{today.year}-{month_num:02d}-{day_num:02d}"
    
    if not result["date"]:
        result["date"] = (today + timedelta(days=1)).strftime("%Y-%m-%d")
    
    # Time range
    # Time range - handle formats: "after 3 PM", "at 2pm", "2pm", "around 3:30pm"
    time_match = re.search(r'(?:after|from|at|around)\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm))', text_lower)
    if time_match:
        result["timeRange"] = f"after {time_match.group(1).upper()}"
    else:
        # Try standalone time like "2pm", "3:30pm"
        standalone_time = re.search(r'\b(\d{1,2}(?::\d{2})?\s*(?:am|pm))\b', text_lower)
        if standalone_time:
            result["timeRange"] = f"at {standalone_time.group(1).upper()}"
        elif "morning" in text_lower:
            result["timeRange"] = "9:00 AM - 12:00 PM"
        elif "afternoon" in text_lower or "after lunch" in text_lower:
            result["timeRange"] = "1:00 PM - 5:00 PM"
        elif "evening" in text_lower:
            result["timeRange"] = "4:00 PM - 7:00 PM"
        elif "earliest" in text_lower:
            result["timeRange"] = "earliest available"
    
    # Candidate name extraction (case-insensitive, multiple strategies)
    stop_words = {
        "schedule", "reschedule", "book", "set", "up", "arrange", "move",
        "interview", "meeting", "for", "with", "on", "at", "after", "before", "around", "from",
        "tomorrow", "today", "monday", "tuesday", "wednesday", "thursday", "friday",
        "saturday", "sunday", "morning", "afternoon", "evening", "lunch", "earliest",
        "technical", "tech", "hr", "behavioral", "culture", "fit", "coding", "system", "design",
        "phone", "screen", "initial", "final", "round", "managerial", "general",
        "am", "pm", "slot", "any", "free", "available", "the", "a", "an",
        "day", "next", "to", "in", "this", "that", "please", "can", "you"
    }
    
    # Strategy 1: "Schedule/Book [Name] for..."
    name_match = re.search(r'(?:schedule|reschedule|book|set\s+up|arrange|move)\s+(?:meeting\s+)?(?:for\s+)?(\w+(?:\s+\w+)?)', text_lower)
    if name_match:
        raw_words = name_match.group(1).strip().split()
        name_words = [w for w in raw_words if w.lower() not in stop_words and not re.match(r'^\d', w)]
        if name_words:
            result["candidateName"] = " ".join(w.capitalize() for w in name_words)
    
    # Strategy 2: "for [Name] tomorrow/on/at..."
    if not result["candidateName"]:
        name_match2 = re.search(r'for\s+(\w+(?:\s+\w+)?)\s+(?:on|at|tomorrow|today|next|this|\d)', text_lower)
        if name_match2:
            raw_words = name_match2.group(1).strip().split()
            name_words = [w for w in raw_words if w.lower() not in stop_words and not re.match(r'^\d', w)]
            if name_words:
                result["candidateName"] = " ".join(w.capitalize() for w in name_words)
    
    # Strategy 3: Strip all known keywords and pick remaining proper-looking words
    if not result["candidateName"]:
        words = re.findall(r'\b[a-zA-Z]+\b', text)
        remaining = [w for w in words if w.lower() not in stop_words and not re.match(r'^\d', w)]
        # Filter out time-like words
        remaining = [w for w in remaining if w.lower() not in {"am", "pm"}]
        if remaining:
            result["candidateName"] = " ".join(w.capitalize() for w in remaining[:2])
    
    return {"success": True, "parsed": result}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
