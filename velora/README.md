# Velora — Where living meets lifestyle

This is the Velora MVP (frontend + serverless api) ready for deployment to Vercel.

Quick deploy:
1. Create a GitHub repo and push this folder.
2. Go to https://vercel.com/new and import the GitHub repo.
3. Add Environment Variables in Vercel (see below).
4. Deploy — Vercel will build frontend and serverless functions automatically.

Environment variables:
- MONGO_URI (optional) — MongoDB Atlas connection string. If empty, API runs in demo mode.
- JWT_SECRET — a secret for auth tokens (e.g. "change_this").
- FRONTEND_URL — your deployed frontend URL (for CORS); optional.

Slogan: "Where living meets lifestyle"
