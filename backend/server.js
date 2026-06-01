const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

const RESUME_PATH = path.join(__dirname, 'data', 'resume.json');
const MESSAGES_PATH = path.join(__dirname, 'data', 'messages.json');

// Ensure data folder and files exist
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}

if (!fs.existsSync(MESSAGES_PATH)) {
  fs.writeFileSync(MESSAGES_PATH, JSON.stringify([], null, 2), 'utf-8');
}

// API Routes
app.get('/api/resume', (req, res) => {
  try {
    if (!fs.existsSync(RESUME_PATH)) {
      return res.status(404).json({ error: 'Resume data not found' });
    }
    const data = fs.readFileSync(RESUME_PATH, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error fetching resume data:', error);
    res.status(500).json({ error: 'Failed to read resume data' });
  }
});

app.post('/api/contact', (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields (name, email, message) are required.' });
    }

    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      message,
      timestamp: new Date().toISOString()
    };

    let messages = [];
    if (fs.existsSync(MESSAGES_PATH)) {
      const fileData = fs.readFileSync(MESSAGES_PATH, 'utf-8');
      messages = JSON.parse(fileData);
    }

    messages.push(newMessage);
    fs.writeFileSync(MESSAGES_PATH, JSON.stringify(messages, null, 2), 'utf-8');

    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Failed to save message. Please try again.' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
