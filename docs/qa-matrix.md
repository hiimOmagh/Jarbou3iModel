# QA Matrix

Current release candidate: v1.4.0-alpha.11 — Manual Execution Safety Cockpit + Session Ledger

Required focused checks:

- `tests/manual-execution-safety-cockpit-session-ledger-check.mjs`
- `tests/limited-manual-live-execution-prototype-check.mjs`
- `tests/controlled-execution-candidate-gate-check.mjs`
- `tests/credential-boundary-runtime-drill-check.mjs`
- `tests/source-acquisition-control-surface-check.mjs`
- `tests/provider-execution-mock-to-live-equivalence-check.mjs`
- `tests/provider-source-dry-run-replay-pack-check.mjs`
- `tests/provider-source-operator-approval-simulation-check.mjs`
- `tests/canonical-lock-evidence-bundle-check.mjs`
- `tests/evidence-matrix-canonical-bundle-check.mjs`

Required CI:

- `npm run test:ci:no-browser`
- `npm run test:ci:browser`

Node 24 CI compatibility is preserved for v1.4.0-alpha.11.

Boundary assertions:

- No default live execution.
- No hidden network calls.
- No real OAuth/API keys/token storage.
- No credential persistence.
- No live scraping/source fetching.
- No automatic source fetching.
- No backend/storage expansion.
- No automatic source verification.
- No automatic signoff/export lock.
- No cryptographic signature claim.
- No publication permission claim.

Locked baseline: `v1.3.0 — Stable Manual Workflow Release` remains unchanged.
Locked manual opt-in shell baseline: `v1.4.0-alpha.10 — Limited Manual Live-Execution Prototype` remains unchanged.
Locked source acquisition baseline: `v1.4.0-alpha.7 — Source Acquisition Control Surface` remains unchanged.
Locked mock-to-live baseline: `v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence` remains unchanged.
No live scraping. No production OAuth. No real API keys. No cryptographic signature claim. No automatic source verification.
Screenshots alone are insufficient. ZIP archive alone is insufficient. ZIP existence alone is insufficient.
Continuity: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, and changed-files-only discipline remain preserved.
Public Demo evidence remains required before release lock.
