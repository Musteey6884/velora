<!--
Repository: Velora (frontend + serverless API)
Purpose: concise, actionable guidance for AI coding agents to be productive in this repo.
-->

# Copilot instructions — Velora

Short: Velora is a Vite + React frontend with small serverless API handlers in `/api`. The app runs in demo mode when `MONGO_URI` is not set. Edit UI in `src/`, API logic in `api/`.

What this repo is
- Frontend: React 18, Vite, Tailwind. Entry is `src/main.jsx` -> `src/App.jsx`.
- Serverless API: simple Node handlers in `api/*.js` (auth, users, listings, bookings). They call `connect()` from `api/db.js` which returns null when `MONGO_URI` is missing (demo mode).

Quick developer commands
- Install and run locally: use your usual package manager (repo uses npm by default):
  - npm install
  - npm run dev   (starts Vite at default port)
- Build for production: `npm run build` and preview with `npm run preview`.
- Deployment: project expects to be deployed to Vercel — env vars in README are required for full DB-backed behavior.

Environment variables (important)
- MONGO_URI — if missing, serverless handlers run in demo mode (in-memory arrays). Many API responses and auth will use demo data.
- JWT_SECRET — used for signing/validating tokens in `api/auth.js` and other handlers.
- FRONTEND_URL — optional for CORS; not required for local dev when using the built-in `/api` proxy.

Key patterns and behaviors for editing code
- Demo mode is deliberate: handlers check `connect()` and return demo fixtures if it returns null. When modifying API logic, preserve demo behavior or add clear feature flags.
  - Example: `api/listings.js` exports DEMO_LISTINGS and uses `if (!conn) return res.json(DEMO_LISTINGS)`.
- Auth: token stored in localStorage under `velora_token`; axios instance at `src/services/api.js` injects `Authorization: Bearer <token>` header on requests.
  - Example: update or inspect tokens via `localStorage.getItem('velora_token')` in the browser.
- Frontend routing: uses `HashRouter` in `src/main.jsx` and routes in `src/App.jsx`. Add new pages by creating `src/pages/*.jsx` and adding <Route> entries.
- Styling: Tailwind CSS is used across components. Follow existing class patterns (utility-first classes inside JSX). Keep consistent spacing classes like `p-4`, `max-w-6xl`.

Data shapes to expect
- User object (returned from `/api/users` or auth): { id, name, email, points }
- Listing object: { _id, title, type, pricePerNight, pricePerMonth, city, description, photos, amenities }
- Booking object: { _id, userId, createdAt, paymentStatus, ...bookingFields }

Where to change behavior safely
- Demo data: stored inside each `api/*.js`. Editing these is safe for local demo changes.
- DB connection: `api/db.js` centralizes Mongo client logic. Use `connect()` to access `conn.db.collection(...)`.
- Auth checks: lightweight JWT wrapper inside API files uses `process.env.JWT_SECRET || 'velora_demo'`. Keep demo secret consistent when testing.

Testing and quick checks
- Manual smoke test: run `npm run dev`, open the app, then:
  - Inspect Network tab for `/api/*` requests (they should return demo data without `MONGO_URI`).
  - Use `localStorage` to set `velora_token` manually to simulate auth (token payload in API handlers expects `{ id, email }`).

Conventions & notes for code changes
- Keep API handlers small and focused — each file maps to a serverless endpoint. Avoid adding unrelated endpoints into an existing handler; create new `api/*.js` files instead.
- When adding new environment variable usages, update README.md to document them.
- Use the existing axios wrapper `src/services/api.js` for network calls to ensure auth header injection and baseURL respect to `import.meta.env.VITE_API_BASE`.

Examples (copyable) — set demo auth token in browser console:
```js
// sign a simple payload with matching secret for demo mode (use online jwt tools or generate in node REPL)
localStorage.setItem('velora_token', 'Bearer <token>');
// then visit /dashboard to see demo authenticated responses
```

Files that explain architecture (read first)
- `README.md` — deployment and env vars
- `package.json` — scripts and dependencies
- `src/main.jsx`, `src/App.jsx` — routing and app shell
- `src/services/api.js` — network and auth header pattern
- `api/db.js` — demo vs. real DB switch
- `api/*.js` — small serverless route handlers with demo fixtures

If you change build behavior
- Vite config is in `vite.config.js` (outDir: `dist`). For Vercel, the default build step should continue to work; update `vercel.json` only if changing serverless API paths.

When to ask a human
- If a change requires a persistent DB schema change, or migrating demo data to Mongo — request access to production/staging DB credentials and migration plan.
- If adding cross-cutting auth behavior (roles/permissions), confirm token shape and intended claims before changing API expectations.

End of file.
