const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();

// CORS Configuration
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000', 
    'https://maneeshwar.com', 
    'https://www.maneeshwar.com'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Main chat endpoint
app.post('/api/chat', async (req, res) => {
  console.log('📨 Received chat request at:', new Date().toISOString());
  
  try {
    const { systemPrompt, userMessage } = req.body;

    if (!systemPrompt || !userMessage) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ 
        error: 'Missing systemPrompt or userMessage' 
      });
    }

    console.log('👤 User message:', userMessage);

    // Check if API Key exists
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('❌ Missing ANTHROPIC_API_KEY in .env file');
      return res.status(500).json({ 
        error: 'Server configuration error: Missing API key' 
      });
    }

    console.log('🚀 Calling Anthropic API...');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5', // ✅ CORRECT MODEL NAME (Latest Sonnet)
        max_tokens: 500,
        messages: [
          { role: 'user', content: systemPrompt }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Anthropic API Error:', JSON.stringify(data, null, 2));
      return res.status(response.status).json({
        error: 'API request failed',
        details: data
      });
    }

    console.log('✅ Successfully got AI response');
    res.json(data);

  } catch (error) {
    console.error('❌ Server Error:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// 404 handler
app.use((req, res) => {
  console.log('❌ 404 Not Found:', req.method, req.url);
  res.status(404).json({ 
    error: 'Not found',
    path: req.url,
    method: req.method
  });
});

const PORT = process.env.PORT || 3001;
const HOST = '127.0.0.1';

app.listen(PORT, HOST, () => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🚀 Portfolio AI Server Started!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📍 Server: http://${HOST}:${PORT}`);
  console.log(`🏥 Health: http://${HOST}:${PORT}/api/health`);
  console.log(`💬 Chat:   http://${HOST}:${PORT}/api/chat`);
  console.log(`🔑 API Key: ${process.env.ANTHROPIC_API_KEY ? '✅ Loaded' : '❌ Missing'}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
});

// Handle process termination gracefully
process.on('SIGINT', () => {
  console.log('\n👋 Server shutting down...');
  process.exit(0);
});
