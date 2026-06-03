const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Fake in-memory session data
let sessions = [
  {
    id: 1,
    carPlate: "ABC123",
    startTime: "2025-09-01T09:30:00",
    endTime: "2025-09-01T11:00:00"
  },
  {
    id: 2,
    carPlate: "XYZ789",
    startTime: "2025-09-01T10:15:00",
    endTime: "2025-09-01T12:00:00"
  },
];

// ✅ GET all sessions
app.get('/api/sessions', (req, res) => {
  res.json(sessions);
});

// ✅ POST a new session
app.post('/api/sessions', (req, res) => {
  const newSession = req.body;
  newSession.id = sessions.length + 1;
  sessions.push(newSession);
  res.status(201).json(newSession);
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
