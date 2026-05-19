# Current Release

## v1.1.0-alpha.12 — Dev Productivity Command Center + Golden Baseline Automation

Package: `jarbou3i-research-engine`
Version: `1.1.0-alpha.12`
Runtime capability change: no
Required browser gates before publishing
Release archive exclusions
Required cleanup commands

This cleanup-only alpha adds developer productivity automation before product expansion or large source refactors. It preserves the locked public-demo behavior while adding one-command diagnosis, golden baseline generation, impact mapping, handoff summaries, and browser visible-text snapshot contracts.

Current status:

- Runtime capability change: false
- Provider behavior change: false
- OAuth behavior change: false
- Backend/source/storage behavior change: false
- Public-demo honesty boundary: preserved
- Package script compression: preserved at 20 commands
- CI gate registry: remains the source of truth
- Node 24 CI compatibility: preserved with actions/setup-node@v6, deterministic npm ci, and PLAYWRIGHT_SKIP_INSTALL=1 browser gate discipline
- Hosted evidence capture: preserved with visual artifact guard and canonical-project metadata
- Trilingual language quality: preserved and reinforced through visible-text snapshot contracts

Required validation before lock:

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
