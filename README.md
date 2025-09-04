# Myntra-style Clone – Realtime + AI (Backend + Frontend)

This repository includes a **Node.js/Express/MongoDB** backend with **Socket.io** realtime + **AI stubs**, and a React (Vite) **frontend**.

## Backend

### Tech
- Node 18+, Express, Mongoose (ESM)
- JWT auth (roles: `user`, `admin`)
- Realtime events: `inventory:changed`, `price:drop`, `order:status`
- Multer uploads to `/backend/uploads`
- AI endpoints (stubbed by default):

  - `GET /api/ai/search?q=...`
  - `GET /api/ai/recommend?productId=...`
  - `GET /api/ai/review-summary/:productId`
  - `GET /api/ai/size/:productId` (auth)
  - `POST /api/ai/assistant`
  - `POST /api/ai/visual` (image upload field: `image`)

### Setup
1. Copy `.env.example` to `.env` (repo root) and adjust values.
2. Install:
   ```bash
   cd backend
   npm i
   ```
3. Seed sample data:
   ```bash
   npm run seed
   ```
   - Admin: `admin@myntra.demo` / `admin123`  
   - User: `user@myntra.demo` / `user123`
4. Run dev server:
   ```bash
   npm run dev
   ```
   Backend runs at `http://localhost:5000`

### Key Endpoints
- **Auth**: `/api/auth/register`, `/api/auth/login`, `/api/auth/me`
- **Products**: list/get/create/update/delete, reviews, inventory adjust
- **Orders**: user create + mine, admin list + update status

---

## Frontend (React + Vite)

### Env
Create `/frontend/.env`:
```
VITE_API_BASE=http://localhost:5000
```

### Install & Run
```bash
cd frontend
npm i
npm run dev
```

### Features
- Auth/Profile page for login/register (user/admin)
- Catalog with filters, **Smart Search**, **Visual Search**
- Product Detail with **AI Recommendations**, **Review Summary**, **Size Advisor**
- Cart + Checkout (COD) → Orders list with realtime status updates
- Admin: dashboard stats, products CRUD with images, orders status management, coupons demo
