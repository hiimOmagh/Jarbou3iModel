# Changelog

## v1.4.0-alpha.16 — Alpha.15 Lock Completion + Evidence Surface Budget Enforcement

- Marked `v1.4.0-alpha.15 — Roadmap Lock Completion + Manual Provider Adapter UX Compression` as locked with Run ID `26643746981` and commit `4ba0f9db8020a9d0158ec95854ef10fbfe47694c`.
- Cleaned release-history and changelog truth drift.
- Enforced static evidence-surface budgets: browser check budget max 20, hosted languages expected 3, hosted surfaces max 13, visible snapshot rows max 39.
- Preserved alpha.14 replay corpus/coverage matrix and alpha.15 UX/runtime-budget safety boundaries.
- No live provider calls, hidden network calls, live source fetching, real OAuth/token lifecycle, credential persistence, backend/storage/source expansion, automatic source verification, automatic signoff/export lock, or publication permission claim.

## v1.4.0-alpha.15 — Roadmap Lock Completion + Manual Provider Adapter UX Compression

- Marked `v1.4.0-alpha.14 — Adapter Replay Fixture Corpus + Coverage Matrix` as locked across release truth, roadmap, QA, and release-evidence docs.
- Made alpha.15 the current candidate before lock.
- Compressed manual provider adapter/replay evidence review copy.
- Added static evidence/runtime budget guard metadata: browser check budget max 20, hosted languages expected 3, hosted surfaces max 13, visible snapshot rows max 39.
- Preserved the alpha.14 replay corpus and coverage matrix safety boundaries unchanged.
- No live provider calls, hidden network calls, live source fetching, real OAuth/token lifecycle, credential persistence, backend/storage/source expansion, automatic source verification, automatic signoff/export lock, or publication permission claim.

## v1.4.0-alpha.14 — Adapter Replay Fixture Corpus + Coverage Matrix

- Added deterministic metadata-only adapter replay fixture corpus and coverage matrix.
- Added provider-family coverage rows, scenario-class coverage columns, coverage gap warnings, and no-network replay QA.
- Preserved no live provider calls, no hidden network calls, no real OAuth/token lifecycle, no credential persistence, no backend/storage/source expansion, no automatic source verification, no automatic signoff/export lock, and no publication permission claim.

## v1.4.0-alpha.12 — Manual Provider Adapter Sandbox + Ephemeral Invocation Contract

- Added no-network manual provider adapter sandbox.
- Added ephemeral credential handoff contract without persistence.
- Added provider request-envelope preview and no-network dry invocation transcript.
- Added adapter failure taxonomy and safe request/response metadata ledger.
- Added ADR-018 and targeted check `tests/manual-provider-adapter-sandbox-ephemeral-invocation-contract-check.mjs`.

## v1.4.0-alpha.11 — Manual Execution Safety Cockpit + Session Ledger

- Added deterministic manual execution safety cockpit and safe session ledger.
- Added session state machine, kill-switch drill, timeout/budget/request guardrails, safe ledger, and no-execution fallback report.
- Added ADR-017 and targeted check `tests/manual-execution-safety-cockpit-session-ledger-check.mjs`.
- Preserved locked alpha.6–alpha.10 safety layers.

## v1.4.0-alpha.10 — Limited Manual Live-Execution Prototype

- Added disabled-by-default manual opt-in shell and hard failure reasons.
- Preserved no hidden network calls, no real OAuth/token lifecycle, no credential persistence, and no automatic source fetching.

## v1.4.0-alpha.9 — Controlled Execution Candidate Gate

- Added no-execution candidate gate with manual preconditions and failure-to-enable reasons.

## v1.4.0-alpha.8 — Credential Boundary Runtime Drill

- Added fake-secret credential boundary runtime drills for exports, logs, browser-visible text, fixtures, provider payloads, and release bundles.

## v1.4.0-alpha.7 — Source Acquisition Control Surface

- Added deterministic source acquisition modes, review routing, provenance/risk labels, source-to-claim linkage, and source-gap warnings.

## v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence

- Added deterministic mock-to-live equivalence report without enabling live execution.

## v1.4.0-alpha.5 — Dry-Run Replay Pack + Operator Approval Simulation

- Added deterministic dry-run replay pack and operator approval simulation.

## v1.3.0 — Stable Manual Workflow Release

- Promoted the locked manual workflow release to stable.

Boundary repetition for release-truth checks: no live scraping; no production OAuth; no real API keys; no automatic source verification; no cryptographic signature claim.
Node 24 CI compatibility preserved.

Stable baseline repetition: v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization; v1.3.0-alpha.10 — Brief Publication Pack v4. No backend behavior expansion. No provider execution expansion.

Screenshots alone are insufficient. A ZIP archive alone is insufficient.
Planning gate continuity: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, apply integrity, and changed-files-only discipline remain preserved.

Public Demo evidence remains required for lock: hosted evidence, visible-label snapshots, browser log, Playwright setup logs, and canonical lock bundle must all remain aligned with v1.4.0-alpha.16.

Locked alpha.15 baseline: `v1.4.0-alpha.15 — Roadmap Lock Completion + Manual Provider Adapter UX Compression` is locked with run ID `26643746981`, commit `4ba0f9db8020a9d0158ec95854ef10fbfe47694c`, green no-browser CI, green browser CI, hosted-demo evidence, AR/FR/EN visible-text snapshots, evidence matrix 39/39, canonical lock bundle, and artifact identity guard.
Locked alpha.14 baseline: `v1.4.0-alpha.14 — Adapter Replay Fixture Corpus + Coverage Matrix` is locked with run ID `26640076472`, commit `476b97423d18842177ae47074967afa45e5962bb`, green no-browser CI, green browser CI, hosted-demo evidence, AR/FR/EN visible-text snapshots, canonical lock bundle, and artifact identity guard.

Evidence/runtime budget guard: evidence_surface_budget_version: 1.4.0-alpha.16; locked_baseline: 1.4.0-alpha.14; locked_alpha15_baseline: 1.4.0-alpha.15; browser_check_budget_max: 20; hosted_language_count_expected: 3; hosted_surface_count_expected_max: 13; visible_snapshot_rows_expected_max: 39; runtime_budget_policy: guardrail_only; runtime_budget_enforced_without_network: true; provider_execution_performed: false; live_fetching_performed: false; credential_persistence_allowed: false.
