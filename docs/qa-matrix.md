# QA Matrix

## v1.4.0-alpha.15 — Roadmap Lock Completion + Manual Provider Adapter UX Compression

Adds deterministic provider adapter fixtures, request/response envelope diffing, no-network invocation replay, adapter failure UX rehearsal, safe transcript comparison, cross-provider capability matrix, and a safe metadata-only replay ledger. It remains disabled by default and enables no real provider calls, no hidden network calls, no live source fetching, no real OAuth/token lifecycle, no credential persistence, no backend/storage expansion, no automatic source verification, no automatic signoff/export lock, and no publication permission claim. Requires hosted evidence and canonical lock evidence bundle before lock.


Current release candidate: v1.4.0-alpha.15 — Roadmap Lock Completion + Manual Provider Adapter UX Compression

Required gates:

- `tests/manual-provider-adapter-sandbox-ephemeral-invocation-contract-check.mjs`
- alpha.6 through alpha.11 targeted continuity checks
- privacy/export checks
- provider/source checks
- canonical lock-evidence bundle checks
- hosted evidence matrix checks
- EN/AR/FR localization visible-label checks

Alpha.12 must prove no raw secret/token/API-key pattern appears in logs, hosted evidence, browser-visible text, release bundle, fixtures, or adapter sandbox ledger.

Node 24 CI compatibility is preserved for v1.4.0-alpha.14.

Boundary repetition for release-truth checks: no live scraping; no production OAuth; no real API keys; no automatic source verification; no cryptographic signature claim.

Baseline repetition for release-truth checks: v1.3.0 — Stable Manual Workflow Release; v1.4.0-alpha.7 — Source Acquisition Control Surface; v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence.

Screenshots alone are insufficient. A ZIP archive alone is insufficient.
Planning gate continuity: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, apply integrity, and changed-files-only discipline remain preserved.


Public Demo evidence remains required for lock: hosted evidence, visible-label snapshots, browser log, Playwright setup logs, and canonical lock bundle must all remain aligned with v1.4.0-alpha.15.

Locked baseline preserved: `v1.4.0-alpha.14 — Adapter Replay Fixture Corpus + Coverage Matrix` is locked with run ID `26640076472`, commit `476b97423d18842177ae47074967afa45e5962bb`, green no-browser CI, green browser CI, hosted-demo evidence, AR/FR/EN visible-text snapshots, canonical lock bundle, and artifact identity guard.

Evidence/runtime budget guard: evidence_surface_budget_version: 1.4.0-alpha.15; locked_baseline: 1.4.0-alpha.14; browser_check_budget_max: 20; hosted_language_count_expected: 3; hosted_surface_count_expected_max: 13; visible_snapshot_rows_expected_max: 39; runtime_budget_policy: guardrail_only; runtime_budget_enforced_without_network: true; provider_execution_performed: false; live_fetching_performed: false; credential_persistence_allowed: false.
