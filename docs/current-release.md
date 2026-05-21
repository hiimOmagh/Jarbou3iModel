# Current Release

## v1.1.0-alpha.15 — Source Cluster + Gap Intelligence

Package: `jarbou3i-research-engine`
Version: `1.1.0-alpha.15`
Runtime capability change: no live/runtime expansion

Alpha.15 adds a local-only source cluster and source-gap intelligence layer on top of the locked Evidence Workspace + Source Import V2 pipeline. It groups reviewed evidence by target IDs and unlinked claims, detects duplicate/overlapping claims, scores cluster reliability/attention/traceability, surfaces source-gap warnings, and exports cluster reports through the research packet.

Current status:

- Runtime capability change: false
- Live AI/provider execution: false
- Live fetching/scraping: false
- Provider behavior change: false
- OAuth behavior change: false
- Backend/source/storage behavior change: false
- Public-demo honesty boundary: preserved
- Evidence Workspace + Source Import V2: preserved
- Source clustering: local deterministic only
- Source-gap report: review guidance, not source verification
- Dev productivity commands: preserved (`dev:doctor`, `dev:baseline`, `dev:impact`, `dev:handoff`)
- CI gate registry: remains the source of truth
- Node 24 CI compatibility: preserved with actions/setup-node@v6, deterministic npm ci, and PLAYWRIGHT_SKIP_INSTALL=1 browser gate discipline
- Hosted evidence capture: preserved with visual artifact guard and canonical-project metadata
- Trilingual language quality: preserved through visible-text snapshot contracts


Required browser gates before publishing:

- GitHub no-browser CI must pass for the intended commit.
- GitHub browser CI must pass for the intended commit.
- Hosted-demo evidence must be reviewed after capture.

Release archive exclusions:

- `node_modules/`
- `playwright-report/`
- `test-results/`
- `*.zip`
- `backend/.dev.vars`

Required cleanup commands:

- `node tests/repo-file-hygiene-check.mjs`
- `node tests/release-packaging-cleanup-check.mjs`
- `node tests/ci-gate-runner.mjs release`

Required validation before lock:

- `node tests/source-cluster-gap-intelligence-check.mjs`
- `node tests/ci-gate-runner.mjs current-no-browser`
- `node tests/ci-gate-runner.mjs source`
- `node tests/ci-gate-runner.mjs release`
- `npm run test:ci:no-browser`
- `npm run test:ci:browser`
- Reviewed hosted-demo evidence including visible-text snapshots for AR/FR/EN

No live scraping, no real OAuth, no live provider execution, no backend endpoint expansion, no source connector expansion, no automated source verification, no storage expansion, no broad UI redesign, and no large source refactor are introduced.

Release lock requirements:

- Screenshots alone are insufficient.
- A ZIP archive alone is insufficient.
- Approval requires green no-browser CI, green browser CI, and reviewed hosted-demo evidence.

Continuity note: Root Manifest and Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, changed-files-only discipline, no live scraping, no real OAuth, hosted evidence, and ZIPs are not sufficient for release approval by themselves.


Continuity discipline: Root Manifest and Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, and changed-files-only discipline are preserved.

Public demo boundary: public demo readiness remains preserved.
