const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Works with node-fetch@2
require('dotenv').config();

const app = express();

// 1. UPDATED CORS: Added the WWW version of your domain
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'https://maneeshwar.com', 
    'https://www.maneeshwar.com' // Added this
  ],
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// 2. ROUTE PATH: 
// In your Nginx config, you have "location /api { proxy_pass ...3001; }".
// If you call /api/chat from frontend:
// Nginx sends "/api/chat" to this server.
// Therefore, the route below MUST match "/api/chat".
app.post('/api/chat', async (req, res) => {
  try {
    const { systemPrompt, userMessage } = req.body;

    // Check if API Key exists
    if (!process.env.ANTHROPIC_API_KEY) {
        throw new Error("Missing ANTHROPIC_API_KEY in environment variables");
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20240620', // Note: Check model naming (e.g., claude-3-5-sonnet-latest)
        max_tokens: 500,
        messages: [{ role: 'user', content: systemPrompt }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Anthropic API Error:", data);
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error("Server Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});