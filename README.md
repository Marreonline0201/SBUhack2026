# Bet Tracker

A website for couples or friends to track bets and wins in games.

## Quick Start (Local)

```bash
npm install
cd client && npm install && cd ..
npm run dev
```

Opens at http://localhost:3000

---

## Deploy (Step by Step)

### 1. Backend on Render

1. Go to [render.com](https://render.com) → **New** → **Web Service**
2. Connect repo `Marreonline0201/SBUhack2026`
3. Settings:
   - **Root Directory**: leave empty (project is at root now)
   - **Build Command**: `npm install`
   - **Start Command**: `npm run server`
4. Deploy → copy your URL (e.g. `https://sbuhack2026.onrender.com`)

### 2. GitHub Secret

1. Repo → **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret**
3. Name: `REACT_APP_API_URL`
4. Value: `https://YOUR-RENDER-URL.onrender.com/api`

### 3. GitHub Pages

1. Repo → **Settings** → **Pages**
2. **Source**: Deploy from a branch
3. **Branch**: main
4. **Folder**: /docs
5. Save

### 4. Push

```bash
git add .
git commit -m "Deploy"
git push origin main
```

Or: **Actions** → **Deploy to GitHub Pages** → **Run workflow**

**Live at:** https://marreonline0201.github.io/SBUhack2026

---

## Project Structure

```
├── server/          # Node.js + Express API
├── client/          # React frontend
├── docs/            # Built by workflow (don't edit)
└── package.json
```
