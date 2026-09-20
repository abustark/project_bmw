# N-GELO — Gate Passes & Vulnerability Test Matrix

> **Purpose:** Gate = checkpoint before shipping to your project site. Each pass = a test suite that must be **GREEN** before you showcase to recruiters. Covers functional, security, UI, perf.

## How to use
- Run each pass in order: `Functional → Security → UI/UX → Business Logic → Perf`
- Mark `PASS/FAIL` + `Evidence` (screenshot, curl, console).
- Any **FAIL** = fix before deploy.

---

## PASS 1: FUNCTIONAL — Core flows must not break

| # | Gate | Steps | Expected | Type |
|---|---|---|---|---|
| F1 | Home loads | `GET /` | 200, hero, 3 stats, 6 categories, 3 featured | Smoke |
| F2 | Shop filter | `GET /shop` → select UI Kits → price ≤30 → rating ≥4.5 | Only NEO + Flow visible | Functional |
| F3 | Search XSS | Search `"<script>alert(1)</script>"` | Renders as text, no alert | Input |
| F4 | Add to cart | Product → Add → open drawer → qty 2 → total = price*2 | Cart badge =2, subtotal correct | Business |
| F5 | Coupon valid | Cart apply `WELCOME20` | Discount 20% rounded, total = subtotal - discount | Business |
| F6 | Coupon invalid | Apply `HACK20` | Error "Invalid code" | Negative |
| F7 | Wishlist persist | Heart → reload → heart still filled | `localStorage ngo-wish` has id | Persist |
| F8 | Checkout complete | Cart → Checkout → fill email/name → Pay → Dashboard Buyer shows order | `localStorage ngo-orders` has order | E2E |
| F9 | Physical vs Digital | Footwear product → cart → checkout → Dashboard shows "Ships in 3–5 days" | Text present | Domain |
| F10 | Deep link | Direct `GET /product/9` | Frost Runner page, not 404 | Routing |

**Automation (Vue):** `curl -s http://localhost:5173/shop | grep -q "Shop"`; `curl -s http://localhost:5173/product/1 | grep -q "NEO"`  
**Automation (React):** `curl -s http://localhost:3000/product/1 | grep -q "NEO"`

---

## PASS 2: SECURITY — Vulnerability gate (must be GREEN)

| # | Vulnerability | Test | Steps | Expected (Secure) | Severity |
|---|---|---|---|---|---|
| S1 | **Price Tampering** | LocalStorage cart price edit | Open devtools → `localStorage ngelo-cart` → change price 49→1 → checkout | Server would reject; **Frontend demo is `WARN`** — add comment `// TODO: server validate price` | **High** |
| S2 | **Coupon Brute Force** | Try 20 codes quickly | Script `for c in ADMIN FREE HACK; apply` | Rate limit / after 5 fails lock 30s (frontend shows "Invalid" each, no lock → `WARN`) | Medium |
| S3 | **XSS via Search** | `"><img src=x onerror=alert(1)>` | Search, inspect DOM | Text escaped, no `<img>` injection (Vue `{{}}` auto-escapes, React `{}` escapes) → **PASS** if no alert | High |
| S4 | **XSS via Product** | Product name with `<svg>` | Check `products.js` → no `v-html` / `dangerouslySetInnerHTML` | No `v-html` used → **PASS** | High |
| S5 | **IDOR — Order** | `localStorage ngo-orders` → edit `id` to 99999 → reload Dashboard | Dashboard should fetch from server, not localStorage; here localStorage is demo, add `// TODO: auth` → `WARN` | Medium |
| S6 | **Auth Bypass** | Go `/dashboard` without login | Dashboard loads (no auth) | Spec says buyer auto-creates account via email → for demo ok, but add `// TODO: JWT` → `WARN` | Medium |
| S7 | **Admin RBAC** | Toggle Admin in Dashboard without login | Admin panel visible | Demo; prod needs `role: admin` check → `WARN` | High |
| S8 | **Open Redirect** | Checkout PayPal redirect to `?next=//evil.com` | Not implemented → **PASS** | Low |
| S9 | **LocalStorage Overwrite** | Fill cart 100× same item → qty 100 → check UI | Qty caps? Currently no cap → `WARN` add `qty <= 10` | Low |
| S10 | **CSRF (if Node)** | `POST /api/checkout` without CSRF token | Not yet API → `N/A` for static, but note for Node 14→16 upgrade | High |

**Evidence to capture:** `localStorage.getItem('ngelo-cart')` before/after tamper, network tab shows no server validation.

**Fix for portfolio:** Add comments in `cart.js`/`cart-store.ts`:
```js
// SECURITY TODO: validate price & coupon server-side (PostgreSQL + Stripe)
// Frontend 20% is UI only — server must recalc total.
```

---

## PASS 3: UI/UX — No misalignments

| # | Check | Viewport | Expected | Tool |
|---|---|---|---|---|
| U1 | Header no wrap | 375px, 1280px | Logo + search + icons never overlap, search collapses to second row <768px | Chrome DevTools |
| U2 | Card grid | 375px=1col, 768px=2col, 1280px=3col | No horizontal scroll, image aspect 4/3 kept | Responsive |
| U3 | Cart drawer | Mobile full width, desktop 420px | Overlay blur, close X visible, checkout sticky at bottom | Manual |
| U4 | Font load | Offline (airplane) | Falls back to Poppins → system, no invisible text | Network throttling |
| U5 | Image fallback | Break `/static/1022308...` (rename) | Falls to `fallback` Unsplash via `onError` | Break image |
| U6 | Contrast | Axe DevTools | 0 serious, hero text on white passes WCAG AA | Axe |
| U7 | Keyboard | Tab through Shop → Product → Add → Checkout | All focus rings visible (`focus:ring-ring`), logical order | Keyboard only |
| U8 | Empty states | Empty cart, empty wishlist, no search results | Shows illustration + CTA, not blank | Empty |

**Vue shadcn check:** `ProductCard` uses `Card/Badge/Button` from shadcn — verify `rounded-[20px]` not overridden by shadcn default `rounded-xl` (we kept 20px).

**React shadcn check:** Verify `Button pill` (rounded-full) vs `outline` — no mixture, footer not clipped.

---

## PASS 4: BUSINESS LOGIC — Edge cases

| # | Case | Steps | Expected |
|---|---|---|---|
| B1 | Zero qty | Cart → minus until 0 | Item removed, not -1 |
| B2 | Coupon case | `welcome20` lower | Upper-cased → still applies |
| B3 | Double coupon | Apply WELCOME20 then NGELO10 | Last wins, not stack |
| B4 | Large cart | Add all 14 products ×3 | Total = Σ price*qty - discount, no overflow, scrollable drawer |
| B5 | Checkout empty | Go `/checkout` with empty cart → Pay | Button disabled |

---

## PASS 5: PERF & BUILD — Must be GREEN before site

| # | Gate | Command | Expected |
|---|---|---|---|
| P1 | Vue build | `npm run build` | `✓ built in <3s`, no `Failed to load PostCSS` |
| P2 | React build | `cd react && npm run build` | `✓ Compiled`, 10 routes, no `useSearchParams` Suspense error |
| P3 | Bundle size | `ls -lh dist/assets/*.js` Vue; `.next/static/chunks` React | Vue 118kB gz 44kB, React <150kB first load |
| P4 | Lighthouse | Chrome Lighthouse | Perf >90, A11y 100, SEO 100 |
| P5 | Image weight | `ls -lh static/headershoe-bg.jpg` | Warn 5.6MB → TODO compress to .webp 400kB (roadmap) |

---

## Quick Vulnerability Script (run in console)

```js
// Price tampering check
let cart = JSON.parse(localStorage.getItem('ngelo-cart')||'[]')
console.log('Before', cart[0]?.price)
if(cart[0]) { cart[0].price = 1; localStorage.setItem('ngelo-cart', JSON.stringify(cart)); location.reload() }
// Expected: still checkout would charge $1 on frontend — shows need server validation

// XSS check
document.querySelector('input[placeholder*="Search"]')?.value = '<img src=x onerror=alert(1)>'
document.querySelector('form')?.requestSubmit()
// Expected: no alert, value shows as text
```

---

## Sign-off

| Pass | Status | Date | Evidence | Owner |
|---|---|---|---|---|
| Functional | ☐ PASS | | screenshot vue-home.png, react/page |  |
| Security | ☐ PASS (with WARNs noted) | | localStorage before/after |  |
| UI/UX | ☐ PASS | | 375/1280 screenshots |  |
| Business | ☐ PASS | |  |  |
| Perf | ☐ PASS | | build logs |  |

> **For portfolio:** Keep WARNs visible — it shows you *know* frontend-only demo needs server validation. Recruiters love that honesty + roadmap.

