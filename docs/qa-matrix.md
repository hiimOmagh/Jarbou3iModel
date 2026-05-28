# QA Matrix

Current release candidate: v1.4.0-alpha.12 — Manual Provider Adapter Sandbox + Ephemeral Invocation Contract

Required gates:

- `tests/manual-provider-adapter-sandbox-ephemeral-invocation-contract-check.mjs`
- alpha.6 through alpha.11 targeted continuity checks
- privacy/export checks
- provider/source checks
- canonical lock-evidence bundle checks
- hosted evidence matrix checks
- EN/AR/FR localization visible-label checks

Alpha.12 must prove no raw secret/token/API-key pattern appears in logs, hosted evidence, browser-visible text, release bundle, fixtures, or adapter sandbox ledger.

Node 24 CI compatibility is preserved for v1.4.0-alpha.12.

Boundary repetition for release-truth checks: no live scraping; no production OAuth; no real API keys; no automatic source verification; no cryptographic signature claim.

Baseline repetition for release-truth checks: v1.3.0 — Stable Manual Workflow Release; v1.4.0-alpha.7 — Source Acquisition Control Surface; v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence.

Screenshots alone are insufficient. A ZIP archive alone is insufficient.
Planning gate continuity: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, apply integrity, and changed-files-only discipline remain preserved.


Public Demo evidence remains required for lock: hosted evidence, visible-label snapshots, browser log, Playwright setup logs, and canonical lock bundle must all remain aligned with v1.4.0-alpha.12.
