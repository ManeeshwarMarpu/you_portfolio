const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // This works perfectly with node-fetch@2
require('dotenv').config();

const app = express();

// Standard CORS setup
app.use(cors({
  origin: ['http://localhost:5173', 'https://maneeshwar.com'],
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// server.cjs
app.post('/api/chat', async (req, res) => {
  try {
    const { systemPrompt, userMessage } = req.body; // Extract both

const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.ANTHROPIC_API_KEY,
    'anthropic-version': '2023-06-01'
  },
  body: JSON.stringify({
    model: 'claude-sonnet-4-5', // CHANGED THIS LINE
    max_tokens: 500,
    messages: [{ role: 'user', content: systemPrompt }]
  })
});
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json(data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));