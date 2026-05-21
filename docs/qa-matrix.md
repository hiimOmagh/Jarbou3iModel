# QA Matrix

## v1.1.0-alpha.14 — Evidence Workspace + Source Import V2

Cleanup-only CI/runtime documentation gate. The release optimizes the no-browser test matrix without changing runtime behavior, UI behavior, provider behavior, OAuth behavior, backend/source/storage behavior, fixture semantics, or public-demo claims.

## Current targeted gates

| Gate | Command | Purpose |
|---|---|---|
| Current no-browser | `npm run test:current:no-browser` | Runs the current alpha registry, fixture, syntax-matrix, and release-timeline guards. |
| Full no-browser CI | `npm run test:ci:no-browser` | Runs complete static/schema/privacy/release/source/provider/backend gates through `tests/ci-gate-runner.mjs`. |
| Browser CI | `PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser` | Runs browser suite after workflow-level Playwright installation. |
| Syntax matrix | `node tests/syntax-matrix-check.mjs` | Runs bounded parallel syntax validation over the previous serialized syntax tail. |
| Runtime optimization | `node tests/test-matrix-runtime-optimization-check.mjs` | Confirms no-browser syntax-tail compression and behavior-change boundaries. |
| Release timeline pruning | `node tests/release-doc-timeline-pruning-check.mjs` | Confirms release-history timeline anchors and current alpha.9 documentation. |
| Fixture registry | `npm run test:fixtures` | Confirms compressed migration/privacy fixture registries remain loader-safe. |
| Privacy | `npm run test:privacy` | Confirms privacy/export/audit release boundaries. |
| Provider | `npm run test:provider` | Confirms provider identity/fixtures/OAuth mock behavior remains unchanged. |
| Backend | `npm run test:backend` | Confirms backend proxy/hardening/Worker smoke behavior remains unchanged. |
| Source | `npm run test:source` | Confirms source planning/import/packet/scoring/review behavior remains unchanged. |

## Boundary assertions

- Manual/private mode remains default.
- No live scraping is added.
- No real OAuth or PKCE production path is added.
- No provider expansion is added.
- No backend endpoint expansion is added.
- No source connector expansion is added.
- Evidence upload does not equal release approval.
- Screenshots alone do not equal release approval.
- ZIP existence alone does not equal release approval.
- GitHub Actions status must be reviewed against the intended release commit SHA.
- Current-state documentation must not advertise stale or unavailable capabilities.

## Public Demo boundary

The public demo remains local/manual/private by default. No live scraping, provider expansion, OAuth expansion, backend endpoint expansion, source connector expansion, storage behavior expansion, or automated source verification is introduced.

## Current release

- v1.1.0-alpha.14 — Evidence Workspace + Source Import V2: test-matrix runtime optimization, release doc timeline pruning, no runtime behavior change.
- v1.1.0-alpha.8 — Fixture Registry Payload Compression + Test Organization Audit: compressed fixture registries and test organization audit.
- v1.1.0-alpha.7 — Package Script Compression + CI Gate Registry: package script surface compression and CI gate registry.

Evidence manifest continuity: v1.1.0-alpha.14 preserves the single final metadata hosted-demo evidence manifest gate.

Node 24 CI compatibility is preserved with actions/checkout@v6, actions/setup-node@v6, actions/upload-artifact@v6, npm ci --no-audit --no-fund --ignore-scripts, and PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser.

Continuity note: Root Manifest and Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, changed-files-only discipline, no live scraping, No real OAuth, screenshots alone, hosted evidence, and ZIPs are not sufficient for release approval.
