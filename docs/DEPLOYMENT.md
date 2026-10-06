# Deployment

Single source of truth for where this project is hosted. AI agents: read this
file (or run the discovery commands below) instead of guessing URLs.

## Quick facts

| Item | Value |
| --- | --- |
| Production URL (main, Vue) | https://ecom-seven-sand.vercel.app/ |
| React twin URL | https://ecom-react-self.vercel.app/ |
| Vercel project (Vue) | `ecom` (team `abustarks-projects`) |
| Vercel project (React twin) | `ecom-react` (team `abustarks-projects`, local CLI link in `react/.vercel`, **not** GitHub-connected — redeploy with `vercel deploy --prod` from `react/`) |
| GitHub repo | https://github.com/abustark/project_bmw |
| Production branch | `main` |
| Preview branch | `arena/01a0c0bd-project-bmw` (deploys to `*-git-<branch>-abustarks-projects.vercel.app` URLs) |
| GitHub Pages (legacy) | https://abustark.github.io/project_bmw/ |

## How it works

- The **Vercel GitHub integration** is connected to `abustark/project_bmw`.
  Every push to `main` creates a Vercel deployment with GitHub environment
  `Production`; other branches create Preview deployments.
- Build settings (Vercel zero-config, no dashboard override needed):
  - Framework: Vite
  - Build command: `npm run build`
  - Output directory: `dist`
- `vercel.json` at the repo root adds an SPA rewrite (`/(.*) -> /index.html`)
  so vue-router history-mode routes like `/shop` or `/checkout` don't 404.

## How to rediscover the current production URL

Any future agent/human can resolve the live URL with either method:

```powershell
# 1. Vercel CLI (already authenticated on this machine) — shows "Latest Production URL"
vercel projects ls

# 2. GitHub API — shows the Production deployment created by the Vercel integration
gh api repos/abustark/project_bmw/deployments --jq '.[] | [.id, .environment] | @tsv'
gh api repos/abustark/project_bmw/deployments/<id>/statuses --jq '.[] | [.state, .environment_url] | @tsv'
```

Note: the GitHub deployment status exposes a per-deployment URL
(`ecom-<hash>-abustarks-projects.vercel.app`); the stable alias for end users is
the one in the table above (confirm via `vercel projects ls`).

## After changing deployment config

1. Push to `main`.
2. Wait ~1 min for the Vercel build.
3. Verify: `Invoke-WebRequest https://ecom-seven-sand.vercel.app/` returns 200
   and the page title is `N-GELO — Digital Marketplace for Creators`.
