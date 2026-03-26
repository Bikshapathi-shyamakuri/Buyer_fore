# UserBase — Admin Dashboard

A production-quality User Directory Dashboard built with React + Vite, TypeScript, Tailwind CSS, Framer Motion, and React Router.

---

## 🚀 Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## ▲ Deploy to Vercel (Step-by-Step)

### Option A — Vercel CLI (fastest)

```bash
npm install -g vercel
vercel login
vercel --prod
```

When prompted:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Option B — Vercel Dashboard (GitHub)

1. Push this project to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repo
4. Vercel auto-detects Vite. Confirm these settings:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Click **Deploy** ✅

> The `vercel.json` file handles SPA routing — all routes (`/user/:id` etc.) correctly resolve without 404s.

---

## 🛠 Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 18 | UI library |
| Vite | 5 | Build tool |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 3 | Styling |
| Framer Motion | 11 | Animations |
| React Router | 6 | Client routing |
| Axios | 1.6 | HTTP client |

---

## ✨ Features

- **Dashboard** — stat cards, user table + grid toggle, search, sort, pagination
- **User Detail** — full profile with hero banner, contact, address, company info
- **Search** — real-time debounced (300ms) filter by name or email
- **Sort** — by Name or Company with visual ↑↓ indicators
- **Dark mode** — toggle persisted in `localStorage`
- **Skeleton loaders** — shimmer animation while fetching
- **Error state** — retry button on API failure
- **Empty state** — animated illustration for no results
- **Responsive** — mobile, tablet, desktop layouts
- **Page transitions** — Framer Motion fade + slide

## 📁 Project Structure

```
src/
├── components/     # Reusable UI pieces
├── pages/          # DashboardPage, UserDetailPage
├── services/       # api.ts (Axios)
├── hooks/          # useUsers, useUser, useDebounce, useDarkMode
├── utils/          # helpers, ThemeContext
└── types/          # TypeScript interfaces
```

## 🔧 Scripts

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run typecheck` | Run TypeScript type check |

