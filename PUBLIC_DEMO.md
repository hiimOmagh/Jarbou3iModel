# Public Demo — v1.4.0-alpha.16 Evidence Surface Budget Enforcement

## v1.4.0-alpha.16 — Alpha.15 Lock Completion + Evidence Surface Budget Enforcement

The public demo remains a static/manual workflow surface. v1.4.0-alpha.16 marks alpha.15 as locked, cleans release-history/changelog truth drift, and enforces static evidence-surface budgets without expanding runtime/provider/OAuth/backend/source/storage behavior.

Public release label: v1.4.0-alpha.16 Evidence Surface Budget Enforcement.
Hosted demo metadata and hosted evidence must report v1.4.0-alpha.16 before lock.

## Locked baselines

- `v1.4.0-alpha.15 — Roadmap Lock Completion + Manual Provider Adapter UX Compression` is locked with Run ID `26643746981`, commit `4ba0f9db8020a9d0158ec95854ef10fbfe47694c`, green no-browser CI, green browser CI, hosted-demo evidence, AR/FR/EN visible-text snapshots, evidence matrix 39/39, canonical lock bundle, and artifact identity guard.
- `v1.4.0-alpha.14 — Adapter Replay Fixture Corpus + Coverage Matrix` is locked with Run ID `26640076472`, commit `476b97423d18842177ae47074967afa45e5962bb`, green no-browser CI, green browser CI, hosted-demo evidence, AR/FR/EN visible-text snapshots, canonical lock bundle, and artifact identity guard.
- `v1.3.0 — Stable Manual Workflow Release`, `v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization`, and `v1.3.0-alpha.10 — Brief Publication Pack v4` remain protected.

## Demo boundary

- No default live execution.
- No hidden network calls.
- No real OAuth/token lifecycle.
- No credential persistence.
- No live provider calls.
- No live source fetching.
- No backend/storage/source expansion.
- No automatic source verification, signoff, export lock, cryptographic signature, or publication permission claim.

## Evidence budget

Evidence/runtime budget guard: evidence_surface_budget_version: 1.4.0-alpha.16; locked_baseline: 1.4.0-alpha.14; locked_alpha15_baseline: 1.4.0-alpha.15; browser_check_budget_max: 20; hosted_language_count_expected: 3; hosted_surface_count_expected_max: 13; visible_snapshot_rows_expected_max: 39; runtime_budget_policy: guardrail_only; runtime_budget_enforced_without_network: true; provider_execution_performed: false; live_fetching_performed: false; credential_persistence_allowed: false.

## Required evidence

- no-browser CI log.
- Playwright install-deps log.
- Playwright install log.
- browser CI log.
- hosted-demo-evidence.
- canonical lock-evidence bundle.

Screenshots alone and ZIP existence alone are insufficient.

Boundary repetition for release-truth checks: no live scraping; no production OAuth; no real API keys; no automatic source verification; no cryptographic signature claim. No backend behavior expansion. No provider execution expansion.

Provenance continuity: Package Script Compression, CI Gate Registry, Root Manifest, Release Artifact Consolidation, Fixture Registry payload compression, test organization audit, provenance ledger, and changed-files-only discipline remain active.

Baseline repetition for release-truth checks: v1.3.0 — Stable Manual Workflow Release; v1.4.0-alpha.7 — Source Acquisition Control Surface; v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence; v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization; v1.3.0-alpha.10 — Brief Publication Pack v4.
