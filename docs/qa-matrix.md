# QA Matrix

## v1.4.0-alpha.19 — Alpha.18 Lock Completion + Evidence Dashboard Decision Ledger

Status: current candidate. Lock is pending green no-browser CI, green browser CI, hosted evidence, and canonical lock evidence bundle upload.

Public release label: v1.4.0-alpha.19 Evidence Dashboard Decision Ledger.

Locked alpha.17 baseline: `v1.4.0-alpha.17 — Alpha.16 Lock Completion + Evidence Budget Regression Dashboard`. Alpha.17 lock evidence: Run ID `26655823066`; commit `fef004abd43511cca247debc417917a4c8fb1c27`; no-browser passed with 146 checks; browser passed with 17 checks; hosted-demo evidence passed; AR/FR/EN visible-text snapshots passed; evidence matrix passed 39/39; lock bundle validation passed; artifact identity guard passed; lockable: true.
Locked alpha.16 baseline: `v1.4.0-alpha.16 — Alpha.15 Lock Completion + Evidence Surface Budget Enforcement`. Alpha.16 lock evidence: Run ID `26646993357`; commit `d40d2054060c14326c5871ec86bd7ef5d9aab2ed`; no-browser passed with 146 checks; browser passed with 17 checks; hosted-demo evidence passed; AR/FR/EN visible-text snapshots passed; evidence matrix passed 39/39; lock bundle validation passed; artifact identity guard passed.
Locked alpha.15 baseline: `v1.4.0-alpha.15 — Roadmap Lock Completion + Manual Provider Adapter UX Compression`. Alpha.15 lock evidence: Run ID `26643746981`; commit `4ba0f9db8020a9d0158ec95854ef10fbfe47694c`; no-browser passed with 144 checks; browser passed with 17 checks; hosted-demo evidence passed; AR/FR/EN visible-text snapshots passed; evidence matrix passed 39/39; lock bundle validation passed; artifact identity guard passed.
Locked alpha.14 baseline: `v1.4.0-alpha.14 — Adapter Replay Fixture Corpus + Coverage Matrix`. Alpha.14 lock evidence: Run ID `26640076472`; commit `476b97423d18842177ae47074967afa45e5962bb`; no-browser passed with 143 checks; browser passed with 17 checks; hosted-demo evidence passed; AR/FR/EN visible-text snapshots passed; lock bundle validation passed; artifact identity guard passed.
Last locked stable baseline: `v1.3.0 — Stable Manual Workflow Release`.
Locked RC baseline: `v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization`.
Locked manual workflow baseline: `v1.3.0-alpha.10 — Brief Publication Pack v4`.

Scope: alpha.17 lock completion plus an evidence-budget dashboard actionability layer. Convert evidence-budget regression results into pass, warn, fail, and review-required operator actions without expanding browser scope.

Actionability statuses: pass, warn, fail, and review-required. Recommended operator actions: lock_review_ready; review_budget_pressure_before_lock; block_lock_until_evidence_budget_regression_fixed; capture_current_evidence_before_lock.

Evidence budget thresholds: browser_check_budget_max: 20; hosted_language_count_expected: 3; hosted_surface_count_expected_max: 13; visible_snapshot_rows_expected_max: 39; evidence_matrix_rows_expected: 39; horizontal_overflow_max_px_expected: 0.

Boundary flags: safe_metadata_only: true; can_execute_now: false; network_invocation_allowed: false; hidden_network_calls_allowed: false; live_provider_execution_performed: false; live_source_fetching_performed: false; credential_persistence_allowed: false; automatic_source_verification_claimed: false; automatic_signoff_performed: false; automatic_export_lock_performed: false; publication_permission_claimed: false.

No live scraping. No production OAuth. No real OAuth. No real API keys. No real token storage. No credential persistence. No live source fetching. No hidden network calls. No provider execution expansion. No backend behavior expansion. No storage expansion. No source behavior expansion. No automatic source verification. No cryptographic signature claim. No publication permission claim.

Continuity repetition: source strategy continuity; release evidence continuity; package script compression and CI gate registry; fixture registry payload compression; test organization audit; apply integrity; changed-files-only discipline. Alpha.14 continuity: adapter replay fixture corpus; coverage matrix; deterministic replay fixtures; provider-family coverage rows; scenario-class coverage columns; coverage gap warnings; no-network replay QA. Alpha.12 continuity: ephemeral credential handoff; provider request-envelope preview; no-network dry invocation transcript; adapter failure taxonomy; safe request/response metadata ledger; ADR-018. Alpha.11 continuity: session state machine; kill-switch; timeout; budget; safe metadata-only session ledger; no-execution fallback; ADR-017. Alpha.7 continuity: manual_source; provider_proposed_source; future_controlled_fetch; ADR-013. Baseline repetition: v1.4.0-alpha.7 — Source Acquisition Control Surface; v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence; v1.4.0-alpha.5 — Dry-Run Replay Pack + Operator Approval Simulation; v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report; v1.4.0-alpha.3 — Provider/Source Dry-Run Execution Harness + Policy Simulator; v1.4.0-alpha.2 — Provider/Source Execution Policy Matrix + Failure UX Contracts; v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation; v1.3.0-alpha.10 — Brief Publication Pack v4.

Screenshots alone are insufficient. A ZIP archive alone is insufficient. Public Demo evidence remains required for lock: hosted evidence, visible-label snapshots, browser log, Playwright setup logs, and canonical lock bundle must all remain aligned with 1.4.0-alpha.19.

---

## v1.4.0-alpha.19 — Alpha.18 Lock Completion + Evidence Dashboard Decision Ledger

Required targeted QA:

- `tests/evidence-budget-regression-dashboard-lock-completion-check.mjs`
- `tests/manual-provider-adapter-ux-compression-evidence-runtime-budget-check.mjs`
- `tests/adapter-replay-fixture-corpus-coverage-matrix-check.mjs`
- `tests/release-truth-consistency-check.mjs`
- `tests/ci-gate-registry-check.mjs`
- `tests/version-suite-registry-check.mjs`
- `tests/static-check.mjs`

Budget enforcement targets: browser_check_budget_max: 20; hosted_language_count_expected: 3; hosted_surface_count_expected_max: 13; visible_snapshot_rows_expected_max: 39.
Locked alpha.16 baseline: `v1.4.0-alpha.16 — Alpha.15 Lock Completion + Evidence Surface Budget Enforcement`; Run ID `26646993357`; commit `d40d2054060c14326c5871ec86bd7ef5d9aab2ed`; no-browser 146; browser 17; hosted-demo evidence passed; AR/FR/EN visible-text snapshots passed; evidence matrix 39/39; artifact identity guard passed.

Locked alpha.15 evidence: Run ID `26643746981`; commit `4ba0f9db8020a9d0158ec95854ef10fbfe47694c`; no-browser 144; browser 17; hosted-demo evidence passed; AR/FR/EN visible-text snapshots passed; evidence matrix 39/39; artifact identity guard passed.

Locked alpha.14 evidence: Run ID `26640076472`; commit `476b97423d18842177ae47074967afa45e5962bb`; no-browser 143; browser 17; hosted-demo evidence passed; AR/FR/EN visible-text snapshots passed; artifact identity guard passed.

No live provider calls, hidden network calls, OAuth/token lifecycle, credential persistence, backend/storage/source expansion, automatic source verification, automatic signoff, automatic export lock, or publication permission claim.


<!-- preserved-historical-body -->

# QA Matrix

## v1.4.0-alpha.19 — Alpha.18 Lock Completion + Evidence Dashboard Decision Ledger

Adds deterministic provider adapter fixtures, request/response envelope diffing, no-network invocation replay, adapter failure UX rehearsal, safe transcript comparison, cross-provider capability matrix, and a safe metadata-only replay ledger. It remains disabled by default and enables no real provider calls, no hidden network calls, no live source fetching, no real OAuth/token lifecycle, no credential persistence, no backend/storage expansion, no automatic source verification, no automatic signoff/export lock, and no publication permission claim. Requires hosted evidence and canonical lock evidence bundle before lock.


Current release candidate: v1.4.0-alpha.19 — Alpha.18 Lock Completion + Evidence Dashboard Decision Ledger

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


Public Demo evidence remains required for lock: hosted evidence, visible-label snapshots, browser log, Playwright setup logs, and canonical lock bundle must all remain aligned with v1.4.0-alpha.19.

Locked baseline preserved: `v1.4.0-alpha.14 — Adapter Replay Fixture Corpus + Coverage Matrix` is locked with run ID `26640076472`, commit `476b97423d18842177ae47074967afa45e5962bb`, green no-browser CI, green browser CI, hosted-demo evidence, AR/FR/EN visible-text snapshots, canonical lock bundle, and artifact identity guard.

Evidence/runtime budget guard: evidence_surface_budget_version: 1.4.0-alpha.19; locked_baseline: 1.4.0-alpha.14; browser_check_budget_max: 20; hosted_language_count_expected: 3; hosted_surface_count_expected_max: 13; visible_snapshot_rows_expected_max: 39; runtime_budget_policy: guardrail_only; runtime_budget_enforced_without_network: true; provider_execution_performed: false; live_fetching_performed: false; credential_persistence_allowed: false.

Locked alpha.15 baseline: `v1.4.0-alpha.15 — Roadmap Lock Completion + Manual Provider Adapter UX Compression`; Run ID `26643746981`; commit `4ba0f9db8020a9d0158ec95854ef10fbfe47694c`.

Release-truth continuity block: v1.3.0 — Stable Manual Workflow Release; v1.4.0-alpha.7 — Source Acquisition Control Surface; v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence; v1.4.0-alpha.5 — Dry-Run Replay Pack + Operator Approval Simulation; v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report; v1.4.0-alpha.3 — Provider/Source Dry-Run Execution Harness + Policy Simulator; v1.4.0-alpha.2 — Provider/Source Execution Policy Matrix + Failure UX Contracts; v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation; v1.3.0-alpha.10 — Brief Publication Pack v4. No live scraping. No production OAuth. No real OAuth. No real API keys. No automatic source verification. No cryptographic signature claim. No publication permission claim.
Screenshots alone are insufficient. ZIP archive alone is insufficient.

Locked alpha.18 evidence: Run ID `26660959763`; commit `4e2c852fa0568fcc12881d7565ba9fd50844e0c4`; no-browser 147; browser 17; evidence matrix 39/39.
