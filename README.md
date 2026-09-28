# BiteSpeed — Premium Cloud Kitchen

A high-performance web app for an upscale cloud kitchen featuring real-time food delivery ordering and table reservation management.

## Stack

- **Frontend**: React 18 + Vite + Tailwind CSS v4
- **Backend**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **State**: Zustand + localStorage persistence
- **Animations**: Framer Motion + GSAP ScrollTrigger

## Setup

### Client

```bash
cd client
npm install
npm run dev
```

### Server

```bash
cd server
cp ../.env.example .env
# Edit .env with your MongoDB URI
npm install
npm run dev
```

## Features

### Customer Portal
- Interactive menu with category tabs and dietary filters (Vegan, Spicy, Gluten-Free)
- Throttled search for instant dish filtering
- Slide-out cart with quantity controls, localStorage persistence
- Auto-computed subtotals, tax (8%), and delivery fees
- Table reservation with date/time slot selection and capacity tracking
- Guest limit validation (1-8 guests)

### Kitchen Staff Portal
- Password-protected admin access
- Real-time kitchen queue with order status progression (Pending → Preparing → Completed)
- Chronological order sorting
- Full inventory CRUD — add, edit, delete menu items
- Out-of-stock toggle with immediate menu visibility changes
- Positive price validation

## Environment Variables

**Server** (`server/.env`, copied from `.env.example`):

| Variable | Purpose | Production requirement |
|----------|---------|------------------------|
| `NODE_ENV` | Runtime mode | Set to `production` |
| `PORT` | API port | Provided by host |
| `CLIENT_URL` | Allowed CORS origin | **Required** — your deployed frontend URL |
| `MONGODB_URI` | Mongo connection string | Use MongoDB Atlas |
| `ADMIN_KEY` | Staff-portal secret | **Required** — strong, 24+ char, unique |

**Client** (`client/.env`, optional):

| Variable | Purpose |
|----------|---------|
| `VITE_ADMIN_KEY` | Overrides the demo staff key used by the client-side gate |

## Security

This project has been hardened for production handover:

- **Server-side admin auth** with constant-time key comparison (`x-admin-key` vs `ADMIN_KEY`). The server **refuses to boot in production** with a weak/default key or a missing `CLIENT_URL`.
- **Helmet** security headers, **CORS** locked to `CLIENT_URL`, **express-mongo-sanitize** against NoSQL injection.
- **Rate limiting**: 100 req/15 min globally, with tighter per-minute caps on public order/booking creation.
- **Strict input validation** (Zod) with length caps on every field; menu image URLs must be valid `http(s)`.
- **Body size** capped at 100 kb; stack traces only leak in development.
- **Static security headers + CSP** for the deployed frontend via `client/vercel.json`.

> **Note on the staff gate:** The client-side key check only hides the demo dashboard from casual visitors — anything shipped to the browser is inspectable, so it is *not* a security boundary. Real enforcement happens on the server for every admin API call. For a production client with real accounts, replace the shared key with proper user login (the codebase already includes `bcryptjs` + `jsonwebtoken` to build on).

## Deployment

- **Frontend → Vercel** (static SPA). Project root: `client/`. Build: `npm run build`, output: `dist/`. `client/vercel.json` handles SPA routing + security headers. Set `VITE_ADMIN_KEY` in Vercel env vars if overriding the demo key.
- **Backend → Render / Railway / Fly** (Vercel does not host a long-running Express server well). Set all server env vars, point `CLIENT_URL` at the Vercel URL, and use **MongoDB Atlas** for the database.
- The frontend runs standalone on sample data, so it can be demoed on Vercel without the backend. Wire the Zustand stores to the API (`client/src/lib/api.js`) when you want live persistence.

## Demo Access

Local staff key: `bitespeed-staff-2024` — **for local development only.** Change `ADMIN_KEY` before any real deployment.
