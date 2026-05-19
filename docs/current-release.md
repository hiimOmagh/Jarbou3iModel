# Current Release

## v1.1.0-alpha.13 — Prompt Compiler + Research Plan Upgrade

Package: `jarbou3i-research-engine`
Version: `1.1.0-alpha.13`
Runtime capability change: no live/runtime expansion
Required browser gates before publishing
Release archive exclusions
Required cleanup commands

This alpha adds a local/template-driven prompt compiler before any live AI/provider/source expansion. It upgrades the research-plan stage by converting messy topic/context input into a structured plan seed while preserving the public-demo capability boundary and alpha.12 developer-productivity automation.

Current status:

- Runtime capability change: false
- Live AI/provider execution: false
- Live fetching/scraping: false
- Provider behavior change: false
- OAuth behavior change: false
- Backend/source/storage behavior change: false
- Public-demo honesty boundary: preserved
- Prompt compiler: local deterministic/template-driven only
- Dev productivity commands: preserved (`dev:doctor`, `dev:baseline`, `dev:impact`, `dev:handoff`)
- CI gate registry: remains the source of truth
- Node 24 CI compatibility: preserved with actions/setup-node@v6, deterministic npm ci, and PLAYWRIGHT_SKIP_INSTALL=1 browser gate discipline
- Hosted evidence capture: preserved with visual artifact guard and canonical-project metadata
- Trilingual language quality: preserved through visible-text snapshot contracts

Required validation before lock:

- `node tests/prompt-compiler-check.mjs`
- `npm run dev:doctor`
- `npm run dev:baseline`
- `npm run dev:impact -- <changed-file>`
- `npm run dev:handoff -- <changed-file>`
- `npm run test:current:no-browser`
- `npm run test:ci:no-browser`
- `npm run test:ci:browser`
- Reviewed hosted-demo evidence including visible-text snapshots for AR/FR/EN

No live scraping, no real OAuth, no live provider execution, no backend endpoint expansion, no source connector expansion, no automated source verification, no storage expansion, no UI redesign, and no large source refactor are introduced.

Release lock requirements:

- Screenshots alone are insufficient.
- A ZIP archive alone is insufficient.
- Approval requires green no-browser CI, green browser CI, and reviewed hosted-demo evidence.

Release approval still requires green no-browser CI, green browser CI, reviewed hosted-demo evidence, aligned public claims, privacy/export safety, artifact SHA256, and a clean archive boundary for the intended release commit.

Continuity note: Root Manifest and Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, changed-files-only discipline, no live scraping, No real OAuth, screenshots alone, hosted evidence, and ZIPs are not sufficient for release approval.
