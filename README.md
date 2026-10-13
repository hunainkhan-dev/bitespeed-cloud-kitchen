# 🍔 BiteSpeed — Cloud Kitchen Platform

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Node](https://img.shields.io/badge/Node-Express-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38BDF8?logo=tailwindcss&logoColor=white)

A full-stack **cloud-kitchen platform** — real-time food ordering, a live kitchen queue, table reservations, and an admin dashboard. Not a landing page: a working MERN app.

### 🔗 [**View Live Demo →**](https://axiomwebbuilder.com/demos/bitespeed/)

---

## ✨ Features

- **Customer:** browse menu, cart, place orders (saved to MongoDB), table reservations
- **Kitchen:** live order queue with a status pipeline
- **Admin dashboard:** manage orders, menu, and reservations
- Real-time updates, persisted cart state
- Premium animated UI (Framer Motion + GSAP ScrollTrigger)

## 🧱 Tech stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + Vite + Tailwind CSS v4 |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| State | Zustand + localStorage |
| Motion | Framer Motion + GSAP ScrollTrigger |

## 🚀 Run locally

```bash
# Client
cd client && npm install && npm run dev

# Server (new terminal) — needs MONGO_URI in server/.env
cd server && npm install && npm run dev
```

---

Built by **[Axiom Web Builder](https://axiomwebbuilder.com)** · Karachi 💜
