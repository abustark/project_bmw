# N-GELO — Versioned Commit Log

Branch: `arena/01a0c0bd-project-bmw` on `github.com/abustark/project_bmw`
Version format: `2.0.x` (ABot convention). Docs to read first: `docs/PROJECT_SPEC.md`, `docs/commits.md`.

| Version | Commit | What it did |
|---|---|---|
| 2.0.13 | *(this commit)* | Footer credit block — © 2026 ABu · created by Basith Muthu Wasim · site tagline; builds green |
| 2.0.12 | `a78d34f` | Adopt ABot-style versioned commits + this changelog; package.json versions aligned (2.0.12) |
| 2.0.11 | `9c73b60` | uiverse + 21st.dev + ui8 layout overhaul — live interactive previews (14 vendored snippets + runtime-CDN lottie/motion), shop sidebar→sticky chip bar, product page Preview/Code/Info tabs, home mosaic + tabbed grid, ⌘K search |
| 2.0.10 | `666f4b7` | Faithful Linear page structure; price messaging cut to one line (announcement bar, single price row, quiet notices) |
| 2.0.9 | `bd57793` | Linear-inspired redesign (surface ladder, lavender accent, Geist, 8/12/16px radii) + dark mode first with system default + 3-way toggle |
| 2.0.8 | `6b278ec` | Full layout revamp PC + mobile (Taste + Vercel DESIGN.md + web-interface-guidelines audit) |
| 2.0.7 | `db53e5c` | References made non-clickable — source site name only, no outbound links |
| 2.0.6 | `dde8bc8` | Reference catalog — free & open-source showcase, ₹0 (estimated price strikethrough) + design polish |
| 2.0.5 | `32c18e5` | Installed skills: Taste, web-design-guidelines, image-to-code, awesome-design-md, playwright-cli |
| 2.0.4 | `fd70047` | Remapped to dev-only catalog (pixel-identical twins) — templates/components/buttons/loaders/animations/transitions/icons; PROJECT_SPEC v2 |
| 2.0.3 | `2211cbc` | Gate passes matrix, audit report, screenshots, security notes |
| 2.0.2 | `a92778c` | Monorepo README — Vue (shadcn-vue) + React (Next + shadcn) quick start |
| 2.0.1 | `91dc84a` | React twin added — Next.js 16 + shadcn/ui clone in `react/` (pixel-identical to Vue app) |
| 2.0.0 | `e5302a6` | Baseline rebuild — N-GELO production marketplace, Vue 3 + Vite 5 + Pinia + Tailwind |

**Latest HEAD:** see newest row. Base of branch: `020e1eb`.

## Convention (from 2.0.12 onward)

1. **One commit = one version bump.** Patch (`2.0.x`) for fixes and features; minor (`2.1.0`) for a full era reset.
2. **Subject line:** `2.0.N — terse lowercase what-it-did` (no `feat:`/`fix:` prefixes; the version carries the weight).
3. **Body:** the details — root cause, files touched, verification (builds, routes checked).
4. **Same commit updates:** this file (new row on top) + `package.json` and `react/package.json` versions.
5. History is never rewritten — the mapping above is documentation only.
