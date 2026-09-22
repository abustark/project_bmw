# AGENTS.md

Instructions for AI agents working in this repository.

## Project

N-GELO — digital marketplace (Vue 3 + Vite 5 + Tailwind at repo root; a
Next.js 16 port lives in `react/`). Original BCA major-project spec: `n-gelo.docx`,
summarized in `docs/PROJECT_SPEC.md`.

## Deployment — read this before touching URLs

The production site is **https://ecom-seven-sand.vercel.app/** (Vercel project
`ecom`, production branch `main`). Never hardcode or guess deployment URLs from
anything else — full deployment facts and rediscovery commands live in
[`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

Quick check: `vercel projects ls` (Vercel CLI, authenticated) prints the current
"Latest Production URL" per project.

## Build

```bash
npm ci && npm run build   # outputs dist/
```

`vercel.json` contains SPA rewrites — do not delete it or client-side routes
(`/shop`, `/checkout`, ...) will 404 on Vercel.

## Docs map

- `docs/DEPLOYMENT.md` — hosting, URLs, branch → environment mapping
- `docs/PROJECT_SPEC.md` — original + rebuilt product spec
- `docs/commits.md` — versioned commit changelog
- `docs/AUDIT_REPORT.md`, `docs/GATE_PASSES.md` — QA artifacts
