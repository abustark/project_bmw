# N-GELO (project_bmw) — Bugs & Fixes Registry

> **Purpose:** the living record of every confirmed bug, where it lived (file + approximate line
> range), what fixed it, and in which commit. Used for regression review after every update
> (see §Re-verification Policy).
>
> **Maintenance rules:**
> 1. **Every** confirmed bug gets an entry — with file, approx line range (guess if code moved),
>    fix summary, and the version + commit ref that fixed it.
> 2. **Re-verification policy (MANDATORY):** whenever a new major or intermediate update ships,
>    re-run the checks in §Re-verification Checklist and spot-check the Fix Lines of every entry
>    below. If a bug's symptom reappears, its Fix Line region regressed — diff that region against
>    the fix commit and restore.
> 3. Regressions are **new entries** (marked REGRESSION, linked to the original). History is
>    append-only — never edit or delete a shipped entry.
> 4. Branch note: the old `arena/01a0c0bd-project-bmw` branch was merged into `main` at `34b61cc`;
>    history continues on `main` only. Compare commits by hash, never by version.
>
> Protocol reference: see `bug and fixes summary/BUG-FIX-PROTOCOL.md`.

---

## §Bug & Fix History

| # | Bug | File(s) + approx Fix Lines | Fix | Version / Commit |
|---|---|---|---|---|
| B-01 | **Production Vercel link returned 404** — `main` still carried the v1 app whose `vite.config.js` used *library mode*, so `vite build` emitted only `dist/build.js` and **no `dist/index.html`**; the N-GELO app existed only on the arena branch. Vercel deployed main's empty output → 404. | `vite.config.js` (~L1–33) | arena branch merged into `main`; config is now a standard Vite app build, so `npm run build` emits `dist/index.html`; Vercel GitHub integration rebuilt production automatically. | post-2.0.15 · `34b61cc` |
| B-02 | **Deep routes (`/shop`, `/checkout`, …) 404 on refresh/direct visit** — vue-router `createWebHistory` SPA had no rewrite rule on Vercel (arena branch shipped no `vercel.json`). Prevented before it hit production. | `vercel.json` (~L1–5) | Catch-all rewrite `/(.*) → /index.html` (Vercel `rewrites` run after filesystem, so real assets still win). Verified `/shop` → 200 in production. | post-2.0.15 · `fc550ac` |
| B-03 | **NOT A BUG (owner info — do not re-investigate):** `project-bmw.vercel.app` shows an old unrelated BMW static site. It is **not** this project's deployment (old main's index.html was "Learning Vue", not BMW). | n/a — stale unrelated deployment | The real production URL is `https://ecom-seven-sand.vercel.app/` (Vercel project `ecom`). Recorded in `docs/DEPLOYMENT.md` + `AGENTS.md`; rediscover via `vercel projects ls`. | post-2.0.15 · `a0ea072` |

<!-- New bugs append BELOW. If a fixed bug's symptom returns, add a NEW entry marked
     REGRESSION (link the old one) — never edit history. Guard each fix with an automated
     test that names its B-id in a comment wherever a silent regression is possible. -->

---

## §Re-verification Checklist (run after EVERY major/intermediate update)

**Automated pass (this repo's own commands):**
```bash
npm ci && npm run build
test -f dist/index.html || echo "FAIL B-01: index.html missing — lib-mode build crept back in"
grep -q 'build:"lib"\|lib:{' vite.config.js && echo "FAIL B-01: vite lib mode present" 

vercel projects ls          # B-03: production URL = ecom-seven-sand.vercel.app (project 'ecom'), NEVER project-bmw.vercel.app
curl -sfI https://ecom-seven-sand.vercel.app/         | head -1   # B-01 → HTTP 200
curl -sfI https://ecom-seven-sand.vercel.app/shop     | head -1   # B-02 → HTTP 200 (SPA rewrite live)
curl -sfI https://ecom-seven-sand.vercel.app/checkout | head -1   # B-02 → HTTP 200
test -f vercel.json || echo "FAIL B-02: vercel.json SPA rewrites deleted"
```

**Manual spot-checks (5 min, real browser, dark + light, 375px + 1280px) — each item names the entries it protects:**
1. Open the production URL → title `N-GELO — Digital Marketplace for Creators` renders (not 404, not the BMW site) — **B-01, B-03**
2. Hard-refresh `/checkout` directly (and open `/product/9` in a new tab) → app boots on that route, no 404 — **B-02**
3. In Vercel project settings/`vercel projects ls`, the Latest Production URL still matches `docs/DEPLOYMENT.md` — **B-03**

---

*Started 2026-09-22. Convention: `bug and fixes summary/BUG-FIX-PROTOCOL.md`.*
