# QA Matrix

## v1.4.0-alpha.13 — Adapter Contract Test Bench + No-Network Invocation Replay QA

Adds deterministic provider adapter fixtures, request/response envelope diffing, no-network invocation replay, adapter failure UX rehearsal, safe transcript comparison, cross-provider capability matrix, and a safe metadata-only replay ledger. It remains disabled by default and enables no real provider calls, no hidden network calls, no live source fetching, no real OAuth/token lifecycle, no credential persistence, no backend/storage expansion, no automatic source verification, no automatic signoff/export lock, and no publication permission claim. Requires hosted evidence and canonical lock evidence bundle before lock.


Current release candidate: v1.4.0-alpha.13 — Adapter Contract Test Bench + No-Network Invocation Replay QA

Required gates:

- `tests/manual-provider-adapter-sandbox-ephemeral-invocation-contract-check.mjs`
- alpha.6 through alpha.11 targeted continuity checks
- privacy/export checks
- provider/source checks
- canonical lock-evidence bundle checks
- hosted evidence matrix checks
- EN/AR/FR localization visible-label checks

Alpha.12 must prove no raw secret/token/API-key pattern appears in logs, hosted evidence, browser-visible text, release bundle, fixtures, or adapter sandbox ledger.

Node 24 CI compatibility is preserved for v1.4.0-alpha.13.

Boundary repetition for release-truth checks: no live scraping; no production OAuth; no real API keys; no automatic source verification; no cryptographic signature claim.

Baseline repetition for release-truth checks: v1.3.0 — Stable Manual Workflow Release; v1.4.0-alpha.7 — Source Acquisition Control Surface; v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence.

Screenshots alone are insufficient. A ZIP archive alone is insufficient.
Planning gate continuity: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, apply integrity, and changed-files-only discipline remain preserved.


Public Demo evidence remains required for lock: hosted evidence, visible-label snapshots, browser log, Playwright setup logs, and canonical lock bundle must all remain aligned with v1.4.0-alpha.13.
