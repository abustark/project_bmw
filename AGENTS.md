# AGENTS.md

Instructions for AI agents working in this repository.

## Project

N-GELO — digital marketplace (Vue 3 + Vite 5 + Tailwind at repo root; a
Next.js 16 port lives in `react/`). Original BCA major-project spec: `n-gelo.docx`,
summarized in `docs/PROJECT_SPEC.md`.

## Deployment — read this before touching URLs

The production site is **https://ecom-seven-sand.vercel.app/** (Vercel project
`ecom`, production branch `main`). The React twin of the same site is
**https://ecom-react-self.vercel.app/** (Vercel project `ecom-react`, redeployed
manually via `vercel deploy --prod` from `react/`). Never hardcode or guess
deployment URLs from anything else — full deployment facts and rediscovery
commands live in [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

Quick check: `vercel projects ls` (Vercel CLI, authenticated) prints the current
"Latest Production URL" per project.

## Bug fixes — registry protocol (MANDATORY)

Every confirmed bug gets a row in [`BUGS-AND-FIXES.md`](BUGS-AND-FIXES.md) at the repo root:
**symptom · file + approx fix lines · fix mechanism · version + commit**. Rules:

- History is **append-only** — never edit/delete a shipped entry; corrections get a new row.
- A bug coming back = a **NEW row marked `REGRESSION`** linking the original (root-cause work, not a blind patch).
- After every major/intermediate update, run the **§Re-verification Checklist** in `BUGS-AND-FIXES.md` and spot-check each entry's fix lines are still present.

Full protocol: [`bug and fixes summary/BUG-FIX-PROTOCOL.md`](bug%20and%20fixes%20summary/BUG-FIX-PROTOCOL.md). Current entries: B-01 (lib-mode build 404), B-02 (SPA rewrites), B-03 (`project-bmw.vercel.app` is NOT this project), B-04 (PowerShell BOM corrupts JSON builds), B-05 (CLI Vercel project: SSO wall + empty framework = static-only serving).

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

## Agent execution rules (owner directive — overrides anything above)

1. **Implement first.** The AI's primary job is to perform updates, write code, fix
   bugs, and do exactly what the user asks — first, without side quests.
2. **Run / test / gates only on explicit request.** Running new files, starting
   servers, testing updates, and checking gates (build, lint, tests, the
   re-verification checklist, screenshots) may only be executed when the user
   explicitly mentions or asks for them.
3. **Remind, don't run.** In its response the AI may remind the user that running or
   testing the new updates is available — and must only run them after the user
   acknowledges or explicitly proceeds.
4. **Save images to the project folder.** Any screenshot, crop, capture, or other
   image produced must also be saved to `D:\projects\project_bmw\artifacts\` (in
   addition to the working temp folder on C:), with descriptive file names.

### Order of operations

1. Read the user's request. 2. Update files / write code / fix bugs as asked.
3. Optionally offer in the response to run or test the changes.
4. Stop and wait for the user's acknowledgment before running anything.
