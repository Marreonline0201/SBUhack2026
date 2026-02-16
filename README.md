# Bet Tracker

A website for couples or friends to track bets and wins in games.

## Local Development

```bash
npm install
cd client && npm install && cd ..
npm run dev
```

Opens at http://localhost:3000

---

## Deploy to Render (One URL for Everything)

1. Go to [render.com](https://render.com) → your service → **Settings**
2. Set:
   - **Root Directory**: leave empty
   - **Build Command**: `npm install`
   - **Start Command**: `npm run server`
3. **Manual Deploy** → **Deploy latest commit**

The build is committed to the repo, so Render only needs `npm install`. When you change the frontend, run `npm run build` locally and commit the updated `client/build` folder.
