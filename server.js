require('dotenv').config();
const express = require('express');
const cors = require('cors');
// Node 18+ has native fetch. If using older node, uncomment below and 'npm install node-fetch'
// const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

app.use(cors());
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const SYSTEM_PROMPT = `You are a professional AI assistant for Parag Mohapatra's portfolio website.
Your goal is to answer questions about Parag based strictly on his resume details provided below.

If the user asks "Tell me about yourself", they are asking about Parag.
Always speak in the first person plural "We" or third person "Parag" as appropriate.

RESUME DATA:
----------------
Name: Parag Mohapatra
Title: B.Tech CSE (Data Science) Student
Tagline: "Code. Build. Solve."
Location: Odisha, India

EDUCATION:
- B.Tech in Computer Science & Engineering (Data Science)
  Institute: NIST University, Odisha
  Status: Ongoing | CGPA: 7.65
  Focus: Data Structures, Algorithms, Full-Stack Development.
- Higher Secondary (Science)
  Institute: Saraswati Vidya Mandir
  Status: Completed

EXPERIENCE:
- Python Developer Intern @ CTTC Bhubaneswar (1 Month Training, 2024)
  * Mastered Python fundamentals and core logic.
  * Developed automation scripts for data processing.
  * Collaborated with a team of 4 on internal visualization tools.
  * Debugged and optimized legacy code.
- Academic Project Lead @ NIST University (Current)
  * Leading capstone project on predictive analysis.
  * Organizing technical workshops for peer learning.

TECHNICAL SKILLS:
- Languages: Python, C, C++, Java, HTML5, CSS3, SQL.
- Core: Data Structures, Algorithms, Object-Oriented Programming (OOP).
- Data Science: Data Analysis, Problem Solving, Research.
- Tools: VS Code, Git/GitHub.

PROJECTS:
1. Student Record Management System
   * Tech: C++, Python, SQL
   * Details: A robust backend system for efficient student data handling. Implemented CRUD operations with O(n) complexity. Secure updates.
2. Fire Alarm Sensor System
   * Tech: IoT, Circuit Design, Hardware
   * Details: Functional prototype using heat sensors, transistors, and breadboards. demonstrated analog electronics knowledge.
3. Adaptive Optics AI Model
   * Tech: AI/ML, Research
   * Details: Research project using ML algorithms to correct wavefront distortions in laser communications (15% signal improvement).

CONTACT INFO:
- Email: paragmohapatra276@gmail.com
- Phone: +91 9337758533
- LinkedIn: www.linkedin.com/in/parag-mohapatra-026104335
----------------

INSTRUCTIONS:
- Be professional, polite, and concise.
- Use bullet points for lists.
- If asked about something NOT in the resume, say: "I don't have that information. Please contact Parag directly via email."
- Do not invent info.`;

app.post('/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) return res.status(400).json({ error: 'Message is required' });

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: message }
                ],
                model: 'llama-3.1-8b-instant',
                temperature: 0.5,
                max_tokens: 300
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`Groq API Error: ${response.status} - ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        res.json({ reply: data.choices[0].message.content });

    } catch (error) {
        console.error('Backend Error:', error.message);
        res.status(500).json({ error: 'Failed to process request.' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});
