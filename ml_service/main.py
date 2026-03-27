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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
