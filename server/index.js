const express = require('express');
const cors = require('cors');
const passport = require('passport');
const path = require('path');
const { initDb } = require('./db');
const authRoutes = require('./routes/auth');
const groupRoutes = require('./routes/groups');
const gameRoutes = require('./routes/games');
const betRoutes = require('./routes/bets');
const winRoutes = require('./routes/wins');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize database
initDb();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://marreonline0201.github.io', 'https://sbuhack2026.onrender.com', 'https://betwithfriends0216.com', 'https://www.betwithfriends0216.com'],
  credentials: true
}));
app.use(express.json());
app.use(passport.initialize());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/bets', betRoutes);
app.use('/api/wins', winRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// OAuth config check (for debugging - does not reveal secrets)
app.get('/api/auth/config', (req, res) => {
  const gid = process.env.GOOGLE_CLIENT_ID || '';
  const gsec = process.env.GOOGLE_CLIENT_SECRET || '';
  res.json({
    google: { configured: !!(gid.trim() && gsec.trim()), hasClientId: !!gid.trim(), hasSecret: !!gsec.trim() },
    facebook: { configured: !!(process.env.FACEBOOK_APP_ID?.trim() && process.env.FACEBOOK_APP_SECRET?.trim()) }
  });
});

// Serve React app (production build)
const buildPath = path.join(__dirname, '..', 'client', 'build');
const indexPath = path.join(buildPath, 'index.html');

if (require('fs').existsSync(indexPath)) {
  app.use(express.static(buildPath));
  app.get('*', (req, res) => {
    res.sendFile(indexPath);
  });
} else {
  app.get('*', (req, res) => {
    res.status(500).send(`
      <h1>Build missing</h1>
      <p>Client build not found. Check Render build logs.</p>
      <p>Build command should be: <code>npm install && npm run build</code></p>
    `);
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  const gid = process.env.GOOGLE_CLIENT_ID || '';
  const gsec = process.env.GOOGLE_CLIENT_SECRET || '';
  if (gid.trim() && gsec.trim()) {
    console.log('Google OAuth: configured');
  } else {
    console.log('Google OAuth: NOT configured (GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET missing)');
  }
});
