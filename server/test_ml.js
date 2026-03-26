const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function testMLScore() {
  const filePath = './uploads/resumes/resume-69c53c380f7b392ce67b995c-1774533719386-871511887.pdf';
  const skills = ["workflow", "automation", "candidate", "ai", "hiring", "lifecycle", "system", "react", "node", "resume"];
  
  const formData = new FormData();
  formData.append('resume', fs.createReadStream(filePath));
  formData.append('skills', JSON.stringify(skills));
  
  try {
    console.log("Testing ML Backend on port 8000...");
    const ts = Date.now();
    const res = await axios.post('http://localhost:8000/score', formData, {
      headers: formData.getHeaders()
    });
    console.log(`Success! Time: ${Date.now() - ts}ms`);
    console.log("Response:", res.data);
  } catch(e) {
    console.error("Failed:", e.message);
  }
}

testMLScore();
