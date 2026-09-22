# N-GELO — Project Spec v2.0 (Dev-only) — for AI & Human

> **Single source of truth** for both `Vue 3 + shadcn-vue` (root) and `Next.js 16 + shadcn/ui` (react/). Future AI agents must follow this before coding.

- **Date:** 2026-09-21
- **Owner:** abustark (Chennai) + Arena Agent
- **Decisions locked from user:** dev_focused, code-first+minimal, pixel_identical, full_spec

---

## 1. Vision

**Sell only digital products for developers** — copy-paste code, not shoes.

- **Tagline:** *Digital products that ship faster.*
- **Pitch:** Help devs earn by selling **templates, landing pages, components, loaders, buttons, animations, transitions, icons**. Help buyers ship faster with live previews and one-click copy.

**Original BCA spec (2020, Thiagarajar College):** kept — buyer/seller/admin modules, search/filter, Stripe/PayPal, auto-generated account via email, instant download, ratings, reports, 14th/21st payouts — but **catalog is now 100% dev**.

---

## 2. Catalog — 7 dev categories (replace footwear)

| id | Label | Example products (2 each) | Notes |
|---|---|---|---|
| `templates` | Templates | `Orbit — SaaS Landing System` (Next+Tailwind), `Apex — Admin Dashboard` (React+shadcn) | Full pages, 18+ sections |
| `landing-pages` | Landing Pages | `Launch — Startup Landing` (Framer), `Flow — Wireframe Library` (600 components) | Hero, pricing, FAQ sections |
| `components` | Components | `Shard — Card Kit 80` (Vue SFC), `Form — Resume Kit` (Notion+Figma) | Cards, modals, navs |
| `buttons` | Buttons | `Bolt — Button Pack 120` (120 variants), `Neo — Fintech UI Kit` (120+ screens) | Primary/secondary/ghost, loading, icon |
| `loaders` | Loaders | `Pulse — Loader Kit 60` (skeleton, spinner), `Hues — 3D Icon Pack` (clay/glass) | CSS, SVG, Lottie |
| `animations` | Animations | `Mastering Framer Motion` (course) + `Morph — Motion Presets` | Framer Motion, CSS keyframes |
| `transitions` | Transitions | `Shift — Page Transition Pack` (Next), `Glide — Scroll Transitions` | Page, scroll, micro |
| `icons` | Icons & 3D | `Hues — 3D Icon Pack Vol II` (240 icons) | Keep but dev-focused |

**Count:** `all` + 7 = 8 filters. **14 products** total — each `featured` on 3-4. **No footwear.** Delete `category: footwear` and `public/static/*shoe*` from shop (keep in `docs/archive` only).

---

## 3. Product schema — Code-first + Minimal

Each product is **code-first** (live preview) + minimal fields needed to render cards:

```ts
type Product = {
  id: number
  name: string                    // "Bolt — Button Pack 120"
  category: "templates"|"landing-pages"|"components"|"buttons"|"loaders"|"animations"|"transitions"|"icons"
  price: number                   // 18..69, originalPrice? for discount
  originalPrice?: number
  rating: number                  // 4.5..4.9
  reviews: number
  sales: number
  author: string                  // Studio Forma, Mira Chen
  badge?: "BESTSELLER"|"NEW"|"TOP RATED"|"PRO"
  featured?: boolean
  image: string                   // Unsplash or /static/code-preview.jpg
  gallery: string[]               // 1-2 preview images
  // — Code-first —
  stack: string[]                 // ["Vue 3","Tailwind 3","Framer Motion"]
  files: string[]                 // ["Vue SFC","TSX","CSS","Figma"] or ["Figma","Tokens"]
  snippet?: string                // copy-paste code, e.g. `<Button variant="pill">...`
  previewUrl?: string             // live iframe URL (codesandbox / vercel)
  deps: string[]                  // ["vue@3.5","tailwind@3.4"]
  license: "Commercial"|"Personal"|"Team"|"Extended"
  // — Minimal —
  description: string             // 1 sentence
  tags: string[]                  // ["Framer","Buttons"] max 3 shown on card
  delivery: string                // "Instant download — Vue SFC, TSX"
}
```

**Card shows:** image, badge, category, sales, name, price, author+rating, 3 tags, `Add to cart` + `View`. **Product page adds:** snippet with copy button, stack/files badges, live preview iframe (if `previewUrl`), license, delivery.

---

## 4. Flows — Must be identical in Vue & React

### Buyer
1. **Discover:** Home → hero + categories → Shop → search (`q`), filter by `category/price/rating`, sort `popular/rating/price/newest`, no login needed.
2. **Cart:** Add → drawer (Zustand/Pinia `localStorage`), qty +/- , remove, coupon `WELCOME20` 20% / `NGELO10` 10% (case-insensitive, last wins), subtotal/discount/total.
3. **Checkout:** Email + name (auto-creates account, email login), Stripe card / PayPal toggle, address, Pay → order `NG-{6digits}` saved to `localStorage` (`ngelo-orders` Vue, `ngelo-orders-react` React) → Dashboard.
4. **After:** Dashboard Buyer shows orders, download button, rate/report/chat placeholders. Product page `Download` is instant for digital (no shipping).

### Seller
- Toggle `Seller` in Dashboard → stats Revenue 8.4k, Sales 312, Visits 4.2k, Next payout 21st, product list with Edit/Delete, traffic chart, payout schedule 14th/21st.

### Admin
- Toggle `Admin` → Open reports 3 (spam/stolen), FAQ queue 5, Admins 4 — actions Take action/Dismiss, answer FAQ.

**All flows use same product IDs, same coupons, same localStorage keys (namespaced per stack).**

---

## 5. Visual Parity — Pixel-identical

**Rule:** Same `text` sentences, same `font sizes`, same `font family`, same layout, same functionality. Only code differs (Pinia vs Zustand, `<template>` vs JSX).

| Token | Value | Where |
|---|---|---|
| Fonts | Poppins 400/500/600/700, Playfair 600/700/800, JetBrains Mono 500 | Via `<link>` in `index.html` (Vue) and `layout.tsx <head>` (React) — **not** `next/font` (offline fail). |
| Colors | `hsl(var(--background))` etc. shadcn vars + `brand 50/500/900`, `ink #0a0a0f`, `paper #fcfcf9` | `tailwind.config.js` (Vue) + `globals.css` (React Tailwind 4 `@theme inline`) |
| Radius | `--radius 0.75rem` → `rounded-[20px]` for cards, `rounded-full` for pills | Card `rounded-[20px]`, Button `pill` `rounded-full` |
| Shadows | `soft: 0 2px 20px -2px rgba(0,0,0,0.05)`, `lift: 0 8px 30px -8px rgba(79,70,229,0.3)` | Both |
| Layout | `max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8` | Header, hero, shop, product |
| Card | `ProductCard` = `Card` + `Badge pill` + `Button pill` | Check `rounded-[20px]` not overridden |

**Text must match:** hero `Digital products that ship faster.`, stats `€286k / 312 / 4.9`, categories, featured `— shadcn picks` vs `— staff picks` → unify to `— staff picks` or `— shadcn picks`? **Decision:** keep `— staff picks` for both (or `— shadcn picks` for React variant label `REACT + SHADCN` in header is enough). Keep sentences identical.

**Functionality parity:** Home, Shop, Product, Cart, Wishlist, Checkout, About, Dashboard — all 8 routes exist in both, same filters, same coupons, same order shape.

---

## 6. Architecture — For AI

### Vue (root)
- **Router:** `createWebHistory(BASE_URL)`, lazy `() => import('../views/ShopView.vue')`
- **State:** `pinia` `useCartStore` + `useWishlistStore`, `watch` → `localStorage` (`ngelo-cart`, `ngelo-wish`), computed `discount/total`
- **UI:** `shadcn-vue` — `Button, Card, Badge, Input` from `src/components/ui/*` + `lib/utils (cn)` + `reka-ui`
- **Alias:** `@` → `src` via `vite.config.js` + `jsconfig.json`
- **Base:** `process.env.GITHUB_ACTIONS ? '/project_bmw/' : '/'` + `asset('static/...')` helper

### React (`react/`)
- **Router:** Next.js App Router `app/page.tsx`, `app/shop/page.tsx`, `app/product/[id]/page.tsx` etc. — `ƒ` dynamic for product
- **State:** `zustand` + `persist` `useCart`/`useWishlist` (`ngelo-cart`, `ngelo-wish`), `count/subtotal/discount/total` as getters
- **UI:** `shadcn` `Button, Card, Badge, Input` from `src/components/ui/*` + `lib/utils (cn)`
- **Alias:** `@/*` → `src/*` via `tsconfig.json`
- **No `next/font`** — use `<link>` to avoid offline build fail, `turbopack.root` warning ignored

### Folder contract
- `data/products` — single source, 14 items, dev categories only
- `components/navbar` — search → `/shop?q=`, wishlist/cart badges, mobile drawer
- `components/product-card` — image, badge, heart, sales, tags, Add + View
- `lib/cart-store` — same API `add/remove/setQty/clear/applyCoupon/count/subtotal/discount/total` + `SECURITY NOTE`

---

## 7. Testing & Gates — Reference `docs/GATE_PASSES.md`

Future AI must run `docs/GATE_PASSES.md` 5 passes before pushing. Key vulns: `S1 price tamper` (localStorage), `S3 XSS` (no v-html), `S6 auth bypass` (dashboard open) — all `WARN` with `// SECURITY TODO: server validate`.

---

## 8. Deploy

- **Vue:** `docs/deploy.yml.example` → `.github/workflows/deploy.yml`, `GITHUB_ACTIONS` base `/project_bmw/`, `public/404.html` + `.nojekyll`
- **React:** `vercel --prod` or `npm run build` → `.next`, separate Vercel project `ngelo-react`

---

## 9. For future AI — How to work

1. Read this spec first, then `docs/GATE_PASSES.md`, then `src/data/products` as source.
2. Keep both stacks **pixel-identical** — if you change text/radius/font in one, mirror in other.
3. Use `shadcn` for any new UI — `npx shadcn add dialog` (React) or `npx shadcn-vue add dialog` (Vue).
4. Never add footwear — dev-only.
5. Always `npm run build` for both before push.

**Versioning:** Update this doc version when catalog changes; commit as `docs: spec v2.x`.
