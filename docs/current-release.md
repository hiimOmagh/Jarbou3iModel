# Current Release

## v1.4.0-alpha.17 — Alpha.16 Lock Completion + Evidence Budget Regression Dashboard

Status: current candidate. Lock is pending green no-browser CI, green browser CI, hosted evidence, and canonical lock evidence bundle upload.

Public release label: v1.4.0-alpha.17 Evidence Budget Regression Dashboard.

Locked baseline completed immediately before this candidate: `v1.4.0-alpha.16 — Alpha.15 Lock Completion + Evidence Surface Budget Enforcement`.
Alpha.16 lock evidence: Run ID `26646993357`; commit `d40d2054060c14326c5871ec86bd7ef5d9aab2ed`; no-browser passed with 146 checks; browser passed with 17 checks; hosted-demo evidence passed; AR/FR/EN visible-text snapshots passed; evidence matrix passed 39/39; lock bundle validation passed; artifact identity guard passed.

Previous locked UX/runtime budget baseline: `v1.4.0-alpha.15 — Roadmap Lock Completion + Manual Provider Adapter UX Compression`.
Alpha.15 lock evidence: Run ID `26643746981`; commit `4ba0f9db8020a9d0158ec95854ef10fbfe47694c`; no-browser passed with 144 checks; browser passed with 17 checks; hosted-demo evidence passed; AR/FR/EN visible-text snapshots passed; evidence matrix passed 39/39; lock bundle validation passed; artifact identity guard passed.

Previous locked adapter replay baseline: `v1.4.0-alpha.14 — Adapter Replay Fixture Corpus + Coverage Matrix`.
Alpha.14 lock evidence: Run ID `26640076472`; commit `476b97423d18842177ae47074967afa45e5962bb`; no-browser passed with 143 checks; browser passed with 17 checks; hosted-demo evidence passed; AR/FR/EN visible-text snapshots passed; lock bundle validation passed; artifact identity guard passed.

Last locked adapter sandbox baseline: `v1.4.0-alpha.12 — Manual Provider Adapter Sandbox + Ephemeral Invocation Contract`.
Last locked safety cockpit baseline: `v1.4.0-alpha.11 — Manual Execution Safety Cockpit + Session Ledger`.
Last locked manual opt-in shell baseline: `v1.4.0-alpha.10 — Limited Manual Live-Execution Prototype`.
Last locked controlled execution candidate baseline: `v1.4.0-alpha.9 — Controlled Execution Candidate Gate`.
Last locked credential boundary baseline: `v1.4.0-alpha.8 — Credential Boundary Runtime Drill`.
Last locked source acquisition baseline: `v1.4.0-alpha.7 — Source Acquisition Control Surface`.
Last locked mock-to-live baseline: `v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence`.
Last locked stable baseline: `v1.3.0 — Stable Manual Workflow Release`.
Locked RC baseline: `v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization`.
Locked manual workflow baseline: `v1.3.0-alpha.10 — Brief Publication Pack v4`.

## Scope

Planning/control-plane only. Alpha.16 lock completion + evidence budget regression dashboard:

- Mark alpha.16 as locked across release truth, roadmap, QA, and release-evidence docs.
- Make alpha.17 the current candidate.
- Remove obsolete alpha.16 lock-pending wording from current release docs.
- Expose a compact evidence budget regression dashboard that records budget limits, alpha.16 observed lock metrics, and over-budget status.
- Preserve alpha.14 Adapter Replay Fixture Corpus + Coverage Matrix unchanged as locked baseline evidence.
- Preserve alpha.15 UX/runtime-budget and alpha.16 static evidence-budget safety boundaries.
- Keep browser evidence bounded: browser check budget max 20, hosted languages expected 3, hosted surfaces max 13, visible snapshot rows max 39.
- Keep dashboard static and metadata-only; no live timing instrumentation, hidden execution, or network expansion.

## Boundary flags

```text
alpha16_lock_completion_only: true
evidence_budget_regression_dashboard_only: true
static_metadata_only: true
adapter_replay_corpus_preserved: true
alpha15_ux_budget_boundaries_preserved: true
alpha16_evidence_budget_boundaries_preserved: true
runtime_budget_policy: guardrail_only
runtime_budget_enforced_without_network: true
safe_metadata_only: true
can_execute_now: false
network_invocation_allowed: false
live_provider_execution_enabled: false
live_provider_execution_performed: false
live_source_fetching_enabled: false
live_source_fetching_performed: false
hidden_network_calls_allowed: false
real_oauth_token_lifecycle_enabled: false
real_api_keys_stored: false
real_tokens_stored: false
credential_persistence_allowed: false
backend_behavior_changed: false
storage_behavior_changed: false
source_behavior_changed: false
uncontrolled_scraping_enabled: false
automatic_source_verification_claimed: false
provider_suggested_source_auto_acceptance: false
automatic_signoff_performed: false
automatic_export_lock_performed: false
publication_permission_claimed: false
```

No real OAuth. No production OAuth. No real API keys. No real token storage. No credential persistence. No live scraping. No live source fetching. No automatic source fetching. No hidden background fetching. No hidden network calls. No provider execution expansion. No backend behavior expansion. No storage expansion. No source behavior expansion. No automatic source verification. No provider-suggested source bypass. No automatic signoff. No automatic export lock. No cryptographic signature claim. No publication permission claim.

## Evidence/runtime budget metadata

```text
evidence_surface_budget_version: 1.4.0-alpha.17
locked_baseline: 1.4.0-alpha.16
locked_alpha16_baseline: 1.4.0-alpha.16
locked_alpha15_baseline: 1.4.0-alpha.15
locked_alpha14_baseline: 1.4.0-alpha.14
browser_check_budget_max: 20
hosted_language_count_expected: 3
hosted_surface_count_expected_max: 13
visible_snapshot_rows_expected_max: 39
runtime_budget_policy: guardrail_only
runtime_budget_enforced_without_network: true
provider_execution_performed: false
live_fetching_performed: false
credential_persistence_allowed: false
```

## Regression dashboard metadata

```text
evidence_budget_regression_dashboard_version: 1.4.0-alpha.17
locked_alpha16_run_id: 26646993357
locked_alpha16_commit: d40d2054060c14326c5871ec86bd7ef5d9aab2ed
locked_alpha16_no_browser_checks: 146
locked_alpha16_browser_checks: 17
locked_alpha16_hosted_languages: 3
locked_alpha16_hosted_surfaces: 13
locked_alpha16_visible_snapshot_rows: 39
browser_checks_over_budget: false
hosted_languages_match_budget: true
hosted_surfaces_over_budget: false
visible_snapshot_rows_over_budget: false
```

## Validation

- Version: `1.4.0-alpha.17`
- Required targeted checks: `tests/evidence-budget-regression-dashboard-lock-completion-check.mjs`, `tests/evidence-budget-regression-dashboard-evidence-runtime-budget-check.mjs`, `tests/evidence-surface-budget-enforcement-lock-completion-check.mjs`, `tests/manual-provider-adapter-ux-compression-evidence-runtime-budget-check.mjs`, `tests/adapter-replay-fixture-corpus-coverage-matrix-check.mjs`.
- Required CI: `npm run test:ci:no-browser`, `npm run test:ci:browser`.

Feature surface is frozen except static evidence budget regression dashboard and release-truth cleanup; no live execution, live fetching, real credential handling, backend/storage expansion, or source behavior expansion is enabled.

Machine tokens: runtime_capability_change=false; release_type=alpha16-lock-completion-evidence-budget-regression-dashboard; release_scope=evidence-budget-regression-dashboard-lock-completion-only; test:ci:browser required.
Node 24 CI compatibility preserved.
Release lock requires green no-browser CI, green browser CI, hosted-demo evidence, and canonical lock evidence bundle.

Full baseline repetition for release-truth checks: v1.4.0-alpha.16 — Alpha.15 Lock Completion + Evidence Surface Budget Enforcement; v1.4.0-alpha.15 — Roadmap Lock Completion + Manual Provider Adapter UX Compression; v1.4.0-alpha.14 — Adapter Replay Fixture Corpus + Coverage Matrix; v1.4.0-alpha.12 — Manual Provider Adapter Sandbox + Ephemeral Invocation Contract; v1.4.0-alpha.11 — Manual Execution Safety Cockpit + Session Ledger; v1.4.0-alpha.10 — Limited Manual Live-Execution Prototype; v1.4.0-alpha.9 — Controlled Execution Candidate Gate; v1.4.0-alpha.8 — Credential Boundary Runtime Drill; v1.4.0-alpha.7 — Source Acquisition Control Surface; v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence; v1.4.0-alpha.5 — Dry-Run Replay Pack + Operator Approval Simulation; v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report; v1.4.0-alpha.3 — Provider/Source Dry-Run Execution Harness + Policy Simulator; v1.4.0-alpha.2 — Provider/Source Execution Policy Matrix + Failure UX Contracts; v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation; v1.3.0-alpha.10 — Brief Publication Pack v4.
A ZIP archive alone is insufficient.
Screenshots alone are insufficient.

Alpha.16 continuity repetition: evidence surface budget enforcement; static evidence-surface budgets; browser check budget max 20; hosted languages expected 3; hosted surfaces max 13; visible snapshot rows max 39; evidence matrix 39/39.
Alpha.15 continuity repetition: roadmap lock completion; manual provider adapter UX compression; static evidence/runtime budget guard; browser check budget max 20; hosted languages expected 3; hosted surfaces max 13; visible snapshot rows max 39.
Alpha.14 continuity repetition: adapter replay fixture corpus; coverage matrix; deterministic replay fixtures; provider-family coverage rows; scenario-class coverage columns; coverage gap warnings; no-network replay QA.
Alpha.12 continuity repetition: ephemeral credential handoff; provider request-envelope preview; no-network dry invocation transcript; adapter failure taxonomy; safe request/response metadata ledger; ADR-018.
Alpha.11 continuity repetition: session state machine; kill-switch; timeout; budget; safe metadata-only session ledger; no-execution fallback; ADR-017.
Alpha.7 continuity repetition: manual_source; provider_proposed_source; future_controlled_fetch; ADR-013.

Additional lock markers for CI workflow quarantine:
live_fetching_performed: false
provider_execution_performed: false
green no-browser CI
green browser CI
reviewed hosted-demo evidence

Stable baseline repetition: v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization; v1.3.0-alpha.10 — Brief Publication Pack v4. No backend behavior expansion. No provider execution expansion.

Release manifest tokens for packaging checks:
package=jarbou3i-research-engine
version=1.4.0-alpha.17
runtime_capability_change=false
release_type=alpha16-lock-completion-evidence-budget-regression-dashboard
release_scope=evidence-budget-regression-dashboard-lock-completion-only
test:ci:browser required
Planning gate continuity: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, apply integrity, and changed-files-only discipline remain preserved.

Public Demo evidence remains required for lock: hosted evidence, visible-label snapshots, browser log, Playwright setup logs, and canonical lock bundle must all remain aligned with 1.4.0-alpha.17.
Node 24 CI compatibility preserved.
