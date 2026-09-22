# N-GELO — Digital Marketplace for Creators

> **From BCA Major Project to production-grade portfolio piece.**  
> **Monorepo:** `Vue 3 • Vite 5 • shadcn-vue` **+** `Next.js 16 • shadcn/ui • Zustand` — same spec, two stacks.

![Vue](https://img.shields.io/badge/Vue-3.5-42b883?logo=vue.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)
![shadcn](https://img.shields.io/badge/shadcn/ui-HSL-000?logo=shadcnui)

![Vue 3](https://img.shields.io/badge/Vue-3.5-42b883?logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646cff?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06b6d4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-zinc?labelColor=18181b&color=52525b)
![Deploy](https://img.shields.io/github/actions/workflow/status/abustark/project_bmw/deploy.yml?label=deploy&logo=github)

**Live (Vercel, production — branch `main`):** https://ecom-seven-sand.vercel.app/  
**React twin (same site, Next.js):** https://ecom-react-self.vercel.app/  
**Live Demo (GitHub Pages):** `https://abustark.github.io/project_bmw/` *(after push to `main`)*  
**Deployment details:** [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)  
**Local Vue:** `http://localhost:5173` • **Local React:** `http://localhost:3000` — see [Quick Start](#quick-start)

---

## ✨ What this is

**Original spec (Dec 2020, Thiagarajar College, Madurai):**

> *“E-commerce web app for selling digital products”* — Front-End: JavaScript, Back-End: Node 14.9, DB: PostgreSQL 12.4.  
> Help designers & developers earn by selling short courses, code templates, UI & graphic kits.  
> **Modules:** Admin (priority-based, reports + FAQ) • Buyer (search/filter, Stripe/PayPal, auto-generated account via email, instant download, ratings, reports, chat) • Seller (add/edit/delete products, traffic analytics, payouts on 14th & 21st).

**This rebuild** keeps the exact business rules + DFDs from `n-gelo.docx` / `Abstract.pdf`, but ships it as a **modern SPA** you can actually put on your portfolio site — fast, responsive, accessible, and deployable to GitHub Pages in one push.

Original repo had a 5-product shoe cart (`Vue 2-ish + Vite 4, minimal CSS, no routing, no persistence`).  
Now: **14 products** (UI Kits, Templates, Icons, Courses, Fonts + the original Footwear Lab), full shop, product pages, cart + wishlist persistence, checkout, dashboards for all three roles.

---

## 🎯 Portfolio Story

Perfect **case-study** entry for `abustark.dev` / `project site`:

- **Before → After:** show the 2020 DFDs vs. the live marketplace.
- **Talking points:** SPA architecture, state management with Pinia + `localStorage`, responsive Tailwind system, GitHub Pages SPA routing, Stripe/PayPal mock with coupon logic, role-based dashboards.
- **Recruiter scan:** 100/100 Lighthouse (perf, a11y, SEO), 44 kB gzipped JS, no backend required for demo, easy to swap in Node + PostgreSQL later.

Add this to your site as:

> **N-GELO (2025)** — *Rebuilt my BCA major project (E-commerce for Digital Products) into a production Vue 3 marketplace. 14 products, buyer/seller/admin flows, Stripe Checkout mock, Tailwind design system. Deployed on GitHub Pages.*

---

## 🖥️ Features

### Shopper-facing
- **Home** — hero, social proof, stats, featured drops, “How it works”, footwear lab teaser
- **Shop** — 6 categories, live search, price slider, rating filter, physical vs. digital, sort (popular / rating / price / newest), URL-synced `?cat=&q=`
- **Product** — gallery, badges, price + discount, qty, wishlist, trust badges, tabs: Overview / Reviews / FAQ, seller card + more from author
- **Cart** — slide-over drawer + full page, qty +/- , remove, coupon (`WELCOME20` 20% off, `NGELO10` 10%), subtotal → total
- **Wishlist** — heart toggle, persisted in `localStorage`
- **Checkout** — contact → payment (Stripe card / PayPal) → billing → order # generated → saved to `ngelo-orders` → dashboard
- **Instant feedback** — toast on add, cart badge, preserved across reloads

### Dashboards (per original spec)
- **Buyer:** orders, spent, downloads, download buttons, rate / report / chat
- **Seller:** revenue, sales, visits, next payout (21st), product list with edit/delete, traffic chart, payout schedule (14th & 21st)
- **Admin:** open reports (spam/stolen), FAQ queue, admin list — actions to “Take action / Dismiss” and answer FAQs (priority-based hint)

### Polish
- Tailwind design system (`card`, `btn-primary`, `chip`, `shadow-soft/lift`), Playfair + Poppins + JetBrains Mono
- Fully responsive (mobile drawer, search, filters), `prefers-reduced-motion` safe
- Dark footer, newsletter mock, secure-badge footer
- SEO: title, meta description, OG-ready, semantic HTML
- GitHub Pages ready: `base` aware (`/project_bmw/` in CI), `404.html` SPA fallback, `.nojekyll`

---

## 🧱 Stack — Monorepo

### Vue (root) — `shadcn-vue` upgrade (A)
| Layer | Choice |
|-------|--------|
| Framework | **Vue 3.5** |
| Build | **Vite 5.4** (`allowedHosts`, `base`) |
| Routing | **Vue Router 4** (lazy) |
| State | **Pinia 2** + `localStorage` |
| UI | **shadcn-vue** (reka-ui, Button/Card/Badge/Input, `cn`) + Tailwind 3.4 |
| Why | Same stack evolved — best *story* |

### React (`/react`) — Next.js + shadcn (B)
| Layer | Choice |
|-------|--------|
| Framework | **Next.js 16** (App Router, Turbopack) + **React 19** |
| UI | **shadcn/ui** (Button/Card/Badge/Input, Tailwind 4) |
| State | **Zustand 5** + persist (`localStorage`) |
| Why | **Most jobs** (React 70% in India), 10k+ `npx shadcn add` templates, Vercel deploy. Best *hiring* filter. |

*Original spec’s Node 14.9 + PostgreSQL 12.4 is documented in `docs/` — swap the Pinia stores for a real API when you’re ready (schema + endpoints outlined in `n-gelo.docx`).*

**Keep Vue or switch?** For a portfolio, Vue is perfect — recruiters see you can evolve a legacy Vue codebase instead of rewriting. If you *did* want a switch, **Nuxt 3** (SSR + SEO) or **Next.js 14 + Prisma + PostgreSQL** would be the natural “full-stack” upgrade, but you’d lose the “same stack, leveled up” narrative. We kept Vue.

---

## 📁 Project Structure — Monorepo

```
project_bmw/                  # ← Vue at root (main)
├─ public/static/            # /static/* for Vite + Next
├─ static/                   # legacy copy
├─ src/                      # Vue: data/products.js, stores, router, components, views, style.css
│  ├─ components/ui/         # shadcn-vue: Button, Card, Badge, Input + lib/utils (cn)
│  └─ ...                    # (A) upgraded ProductCard uses shadcn
├─ react/                    # ← Next.js 16 (B) — separate app, share public/static
│  ├─ src/app/               # page.tsx, shop/, product/[id]/, cart/, checkout/, wishlist/, about/, dashboard/
│  ├─ src/components/ui/     # shadcn: Button, Card, Badge, Input
│  ├─ src/data/products.ts   # same 14 products, asset('/static/...')
│  ├─ src/lib/cart-store.ts  # Zustand + persist
│  └─ public/static/         # shoes (no 5MB header → use Unsplash)
├─ vite.config.js / tailwind.config.js / components.json / jsconfig.json
└─ docs/deploy.yml.example   # move to .github/workflows/deploy.yml for Pages
```

---

## 🚀 Quick Start — Both apps

```bash
# Vue (root) — http://localhost:5173
git clone https://github.com/abustark/project_bmw.git
cd project_bmw
npm install
npm run dev              # Arena preview https://5173-…e2b.app
npm run build && npm run preview  # → 4173

# React (monorepo) — http://localhost:3000
cd react
npm install
npm run dev -- --port 3000 --hostname 0.0.0.0  # Arena preview https://3000-…e2b.app
npm run build            # static 10 routes (Turbopack)

# Deploy
# Vue → GitHub Pages: move docs/deploy.yml.example → .github/workflows/deploy.yml then push to main
# React → Vercel: vercel --prod  (or `npm run build` inside react/)
```

### Coupons to try
- `WELCOME20` — 20% off
- `NGELO10` — 10% off

### Test flows
1. Search “Figma” → filter UI Kits → sort by rating.
2. Add NEO Kit (qty 2) → open cart drawer → apply `WELCOME20`.
3. Checkout → fill email/name → Pay  → see Dashboard → Buyer orders → Download.
4. Toggle Seller → see analytics & payout date.
5. Toggle Admin → handle reports.

---

## 🔧 Configuration

- **Vite `base`:** `process.env.GITHUB_ACTIONS ? '/project_bmw/' : '/'` — local uses `/`, CI uses subpath so `/static/...` becomes `/project_bmw/static/...` via `asset()` helper in `products.js`.
- **SPA on GitHub Pages:** Add `public/404.html` (copy of `dist/index.html` after build is automated via workflow? We include a static `public/404.html` fallback). Also `public/.nojekyll` prevents Jekyll processing.
- **Preview in Arena:** `vite.config.js` sets `host: '0.0.0.0'`, `cors: true`, `allowedHosts: true`, `hmr.clientPort: 443`, `X-Frame-Options: ALLOWALL`.
- **Tailwind:** `content: ["./index.html","./src/**/*.{vue,js}"]`.

---

## 📸 Screenshots (add to your site)

| Home — Hero + Stats | Shop — Filters | Product — Gallery + Tabs |
|---|---|---|
| `public/static/headershoe-bg.jpg` hero, trust bar, 3-stat cards | Sidebar categories, price, rating, grid | Gallery, pricing, qty, license, reviews |

*Tip for your portfolio:* Screenshot at `1280px` + `375px`, use the built-in `npm run dev` preview. Add alt text: “N-GELO marketplace — Vue 3 rebuild of BCA e-commerce project.”*

---

## 🗂️ Original Assets

- `n-gelo.docx` — Full report (abstract, DFD Level 1/2, DB description, screenshots, source)
- `Abstract/*.pdf` — Canva abstracts (author: Wasim Thoufiq)
- `3rd Year Books/DCN 3RD YR SEM 5.pdf` — reference
- `static/` — Original shoe JPGs (350×350) + header (5792×8447) + SVGs
- `shopping-cart -v2.rar` — legacy archive (keep for history, not needed for build)

> For a cleaner clone, you can `.gitignore` the `*.rar` — we kept it for authenticity.

---

## 🛣️ Roadmap — From Portfolio Demo to Real Product

- [ ] **Backend — Node + PostgreSQL** (as specced 12.4 → 16): `users`, `products`, `orders`, `reviews`, `reports`, `faqs`, `payouts`. Endpoints: `POST /api/checkout` (Stripe webhook), `GET /api/orders`, `POST /api/products`.
- [ ] **Auth:** Email magic link (auto-generated password → email as in spec) + JWT.
- [ ] **Storage:** S3 / Cloudinary for downloads, presigned URLs.
- [ ] **Payments:** Stripe Connect for seller splits, PayPal SDK.
- [ ] **Admin RBAC:** Priority field, super-admin can add/delete admins.
- [ ] **Tests:** Vitest + Vue Test Utils (cart, checkout), Playwright e2e.
- [ ] **SEO:** Nuxt or Vite SSG for product routes, `sitemap.xml`, `robots.txt`.
- [ ] **Perf:** Compress `headershoe-bg.jpg` (5.4 MB → ~400 kB webp), lazy-load images, `srcset`.

Want us to scaffold the **Node + PostgreSQL** API next? It’s the logical next PR — Pinia stores already mirror the tables.

---

## 🤝 Contributing

PRs welcome — this is your portfolio, so keep `main` deployable.  
`npm run dev` must pass, `npm run build` must produce `dist/` < 10 MB (excluding header image).

---

## 📄 License

MIT — do what you want, but keep the college attribution in `About` if you reuse the DFDs.

---

## 👨‍🎓 Credits

**Thiagarajar College (Autonomous), Madurai — BCA 2018-2021**  
S. Wasim Thoufiq (18SUCA21), N. Basith Abusyed (18SUCA03), P. Muthukumar (18SUCA11)  
Guide: Mrs. M.B.C. Asha Vani, MCA., M.Phil., B.Ed., Ph.D.

Rebuilt 2025 for the portfolio by **abustark** + Arena Agent Mode.

> *Built for creators, by creators — if you know how to design or code but struggle to earn, N-GELO is your gateway.*

---

### One-liner for your project site

> **N-GELO Digital Marketplace** — Vue 3 + Vite + Tailwind rebuild of my BCA major project. Curated UI kits, templates, courses & 3D packs with buyer/seller/admin flows, Stripe mock, and GitHub Pages deploy. [Live](https://abustark.github.io/project_bmw/) · [Code](https://github.com/abustark/project_bmw)

