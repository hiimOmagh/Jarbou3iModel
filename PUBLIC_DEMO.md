# Public Demo — v1.4.0-alpha.15 Manual Provider Adapter UX Compression

## v1.4.0-alpha.15 — Roadmap Lock Completion + Manual Provider Adapter UX Compression

Adds deterministic provider adapter fixtures, request/response envelope diffing, no-network invocation replay, adapter failure UX rehearsal, safe transcript comparison, cross-provider capability matrix, and a safe metadata-only replay ledger. It remains disabled by default and enables no real provider calls, no hidden network calls, no live source fetching, no real OAuth/token lifecycle, no credential persistence, no backend/storage expansion, no automatic source verification, no automatic signoff/export lock, and no publication permission claim. Requires hosted evidence and canonical lock evidence bundle before lock.


The public demo remains a static/manual workflow surface. v1.4.0-alpha.14 adds an adapter contract test bench with deterministic fixtures, envelope diffing, no-network invocation replay, adapter failure UX rehearsal, safe transcript comparison, and safe metadata-only replay ledger.

Public release label: v1.4.0-alpha.15 Manual Provider Adapter UX Compression.
Hosted demo metadata and hosted evidence must report v1.4.0-alpha.14 before lock.

## Demo boundary

- No default live execution.
- No hidden network calls.
- No real OAuth/token lifecycle.
- No credential persistence.
- No live provider calls.
- No live source fetching.
- No backend/storage expansion.
- No automatic source verification, signoff, export lock, cryptographic signature, or publication permission claim.

## Required evidence

- no-browser CI log.
- Playwright install-deps log.
- Playwright install log.
- browser CI log.
- hosted-demo-evidence.
- canonical lock-evidence bundle.

Screenshots alone and ZIP existence alone are insufficient.

Boundary repetition for release-truth checks: no live scraping; no production OAuth; no real API keys; no automatic source verification; no cryptographic signature claim.

Baseline repetition for release-truth checks: v1.3.0 — Stable Manual Workflow Release; v1.4.0-alpha.7 — Source Acquisition Control Surface; v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence.

Stable baseline repetition: v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization; v1.3.0-alpha.10 — Brief Publication Pack v4. No backend behavior expansion. No provider execution expansion.

Screenshots alone are insufficient. A ZIP archive alone is insufficient.
Provenance continuity: Package Script Compression, CI Gate Registry, Root Manifest, Release Artifact Consolidation, Fixture Registry payload compression, test organization audit, provenance ledger, and changed-files-only discipline remain active.

Locked baseline preserved: `v1.4.0-alpha.14 — Adapter Replay Fixture Corpus + Coverage Matrix` is locked with run ID `26640076472`, commit `476b97423d18842177ae47074967afa45e5962bb`, green no-browser CI, green browser CI, hosted-demo evidence, AR/FR/EN visible-text snapshots, canonical lock bundle, and artifact identity guard.

Evidence/runtime budget guard: evidence_surface_budget_version: 1.4.0-alpha.15; locked_baseline: 1.4.0-alpha.14; browser_check_budget_max: 20; hosted_language_count_expected: 3; hosted_surface_count_expected_max: 13; visible_snapshot_rows_expected_max: 39; runtime_budget_policy: guardrail_only; runtime_budget_enforced_without_network: true; provider_execution_performed: false; live_fetching_performed: false; credential_persistence_allowed: false.
