# Roadmap

## v1.1.0-alpha.11 — Fixture/Test Debt Ledger + Source-File Refactor Readiness Audit

Current cleanup-only alpha gate. The product remains frozen at the public-demo capability boundary while CI/runtime hygiene improves: the long no-browser syntax tail is moved into a bounded parallel syntax matrix, release-history is indexed as a pruned timeline, and existing package-script/fixture-registry consolidation remains intact.

## Phase 1 — Post-freeze cleanup gates before capability expansion

| Stage | Version | Title | Status |
|---|---:|---|---|
| Current alpha | `v1.1.0-alpha.11` | **Fixture/Test Debt Ledger + Source-File Refactor Readiness Audit** | Current |
| Previous alpha | `v1.1.0-alpha.8` | **Fixture Registry Payload Compression + Test Organization Audit** | Completed |
| Prior cleanup | `v1.1.0-alpha.7` | **Package Script Compression + CI Gate Registry** | Completed |
| Freeze baseline | `v1.0.30` | **Mobile Header Geometry Lock / Final Public Demo Visual Freeze** | Locked |
| Next implementation candidate | `v1.1.0-alpha.11` | **No-browser Gate Evidence Review + Browser CI Confirmation** | Planned |
| Blocked | — | Live scraping, production OAuth, real provider execution, new live connectors, storage expansion | Explicitly blocked |

## Boundary assertions

- Manual/private mode remains default.
- No live scraping is added.
- No real OAuth or PKCE production path is added.
- No provider expansion is added.
- No backend endpoint expansion is added.
- No source connector expansion is added.
- Evidence upload does not equal release approval.
- GitHub Actions status must be reviewed against the intended release commit SHA.
- Current-state documentation must not advertise stale or unavailable capabilities.

## CI baseline

Node 24 remains the GitHub Actions runtime baseline. Package Script Compression, CI Gate Registry, Version Suite Registry, Root Manifest, Release Artifact Consolidation, Fixture Registry payload compression, and test organization audit continuity are preserved.

## Current alpha.9 validation focus

- `tests/syntax-matrix-check.mjs` replaces the serialized no-browser syntax tail with bounded parallel syntax validation.
- `tests/test-matrix-runtime-optimization-check.mjs` locks the optimization as CI-only and behavior-neutral.
- `tests/release-doc-timeline-pruning-check.mjs` keeps release-history anchors readable while enforcing a pruned timeline index.

Evidence manifest continuity: v1.1.0-alpha.11 preserves the single final metadata hosted-demo evidence manifest gate.

Release approval reminder: screenshots alone and ZIP existence alone are insufficient for public-demo approval.

Node 24 CI compatibility is preserved with actions/checkout@v6, actions/setup-node@v6, actions/upload-artifact@v6, npm ci --no-audit --no-fund --ignore-scripts, and PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser.
