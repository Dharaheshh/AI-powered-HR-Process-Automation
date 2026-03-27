const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const JobOpening = require('../models/JobOpening');

// @desc    Analyze resume against a job role using local Ollama model
// @route   POST /api/ai/analyze-resume
// @access  Candidate
exports.analyzeResume = async (req, res) => {
  try {
    const { jobOpeningId, modelName = 'llama3.2' } = req.body;
    
    if (!req.file) return res.status(400).json({ success: false, message: 'Resume PDF is required' });
    if (!jobOpeningId) return res.status(400).json({ success: false, message: 'Job Opening ID is required' });

    // Fetch Job Details
    const job = await JobOpening.findById(jobOpeningId).populate('role');
    if (!job) return res.status(404).json({ success: false, message: 'Job opening not found' });

    // Extract Text from PDF via the Python ML service (pdfplumber - already tested & working)
    let resumeText = '';
    try {
      const formData = new FormData();
      formData.append('resume', fs.createReadStream(req.file.path));
      
      const extractRes = await axios.post('http://localhost:8000/extract-text', formData, {
        headers: { ...formData.getHeaders() },
        timeout: 15000
      });
      resumeText = extractRes.data.text || '';
    } catch (extractErr) {
      console.error('Python text extraction failed:', extractErr.message);
      return res.status(503).json({ 
        success: false, 
        message: 'Could not extract PDF text. Ensure the Python ML service is running on port 8000.' 
      });
    }

    // Clean up uploaded file
    if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);

    if (!resumeText.trim()) {
      return res.status(400).json({ success: false, message: 'Could not extract any text from the PDF. Please upload a valid resume.' });
    }

    // Build the Prompt
    const skills = (job.customSkills && job.customSkills.length > 0) 
      ? job.customSkills.join(', ') 
      : (job.role?.defaultSkills || []).join(', ');

    const prompt = `You are an expert HR AI Coach. Analyze the candidate's Resume against the Job Description.

JOB TITLE: ${job.title}
JOB DESCRIPTION: ${job.role?.description || 'N/A'}
REQUIRED SKILLS: ${skills}

--- CANDIDATE RESUME ---
${resumeText.substring(0, 3000)}

Respond with ONLY a valid JSON object in this exact format (no markdown, no extra text):
{
  "score": <0-100 integer>,
  "pros": ["strength 1", "strength 2", "strength 3"],
  "cons": ["missing skill 1", "missing skill 2"],
  "changes": ["actionable advice 1", "actionable advice 2"],
  "remove": ["irrelevant info to remove 1"]
}`;

    // Send to Local Ollama
    console.log(`Sending resume analysis request to local Ollama (Model: ${modelName})...`);
    
    let ollamaRes;
    try {
      ollamaRes = await axios.post('http://127.0.0.1:11434/api/generate', {
        model: modelName,
        prompt: prompt,
        stream: false,
        format: 'json'
      }, { timeout: 120000 });
    } catch (ollamaErr) {
      console.error("Ollama connection failed:", ollamaErr.message);
      return res.status(503).json({ 
        success: false, 
        message: 'Could not connect to local Ollama. Please ensure Ollama is installed and running (ollama run llama3.2).' 
      });
    }

    const aiText = ollamaRes.data.response;
    let aiJson;
    try {
      aiJson = JSON.parse(aiText);
    } catch (parseErr) {
      console.error("Failed to parse Ollama JSON. Raw:", aiText);
      const match = aiText.match(/\{[\s\S]*\}/);
      if (match) {
        try { aiJson = JSON.parse(match[0]); } catch(e) {}
      }
      if (!aiJson) {
         return res.status(500).json({ success: false, message: 'AI returned an invalid format. Try again.' });
      }
    }

    res.status(200).json({ success: true, analysis: aiJson });
  } catch (error) {
    console.error('AI Analysis Error:', error);
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res.status(500).json({ success: false, message: error.message });
  }
};
