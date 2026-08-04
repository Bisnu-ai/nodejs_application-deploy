import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 8080;
const START_TIME = Date.now();

// ---- Fun data ----
const JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "There are 10 types of people: those who understand binary and those who don't.",
  "A SQL query walks into a bar, sees two tables and asks: 'Can I join you?'",
  "Why did the developer go broke? Because he used up all his cache.",
  "I would tell you a UDP joke, but you might not get it.",
];

const GREETINGS = [
  "Hey there! 👋",
  "Welcome aboard! 🚀",
  "Yo! Server's alive and kicking. ⚡",
  "Greetings, human. 🤖",
  "Ahoy! You've reached the server. ⛵",
];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ---- Middleware: simple request logger with timestamp ----
app.use((req, res, next) => {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.originalUrl}`);
  next();
});

// ---- Routes ----
app.get('/', (req, res) => {
  res.json({
    msg: pick(GREETINGS),
    tip: 'Try /joke, /coinflip, /stats or /time',
  });
});

app.get('/joke', (req, res) => {
  res.json({ joke: pick(JOKES) });
});

app.get('/coinflip', (req, res) => {
  res.json({ result: Math.random() < 0.5 ? 'Heads' : 'Tails' });
});

app.get('/time', (req, res) => {
  res.json({ now: new Date().toLocaleString() });
});

app.get('/stats', (req, res) => {
  const uptimeSec = Math.floor((Date.now() - START_TIME) / 1000);
  const mem = process.memoryUsage();
  res.json({
    uptime: `${uptimeSec}s`,
    memoryUsedMB: (mem.heapUsed / 1024 / 1024).toFixed(2),
    node: process.version,
    pid: process.pid,
  });
});

// ---- 404 handler ----
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

// ---- Global error handler ----
app.use((err, req, res, next) => {
  console.error('💥 Error:', err.message);
  res.status(500).json({ error: 'Something went wrong on our end' });
});

app.listen(PORT, () => {
  console.log('\x1b[36m%s\x1b[0m', `🚀 Server running at http://localhost:${PORT}`);
  console.log('\x1b[33m%s\x1b[0m', `   Try: /joke | /coinflip | /time | /stats`);
});