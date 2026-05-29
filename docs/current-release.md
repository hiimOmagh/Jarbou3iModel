# Current Release

## v1.4.0-alpha.18 — Alpha.17 Lock Completion + Evidence Budget Dashboard Actionability

Status: current candidate. Lock is pending green no-browser CI, green browser CI, hosted evidence, and canonical lock evidence bundle upload.

Public release label: v1.4.0-alpha.18 Evidence Budget Dashboard Actionability.

Locked alpha.17 baseline: `v1.4.0-alpha.17 — Alpha.16 Lock Completion + Evidence Budget Regression Dashboard`. Alpha.17 lock evidence: Run ID `26655823066`; commit `fef004abd43511cca247debc417917a4c8fb1c27`; no-browser passed with 146 checks; browser passed with 17 checks; hosted-demo evidence passed; AR/FR/EN visible-text snapshots passed; evidence matrix passed 39/39; lock bundle validation passed; artifact identity guard passed; lockable: true.
Locked alpha.16 baseline: `v1.4.0-alpha.16 — Alpha.15 Lock Completion + Evidence Surface Budget Enforcement`. Alpha.16 lock evidence: Run ID `26646993357`; commit `d40d2054060c14326c5871ec86bd7ef5d9aab2ed`; no-browser passed with 146 checks; browser passed with 17 checks; hosted-demo evidence passed; AR/FR/EN visible-text snapshots passed; evidence matrix passed 39/39; lock bundle validation passed; artifact identity guard passed.
Locked alpha.15 baseline: `v1.4.0-alpha.15 — Roadmap Lock Completion + Manual Provider Adapter UX Compression`. Alpha.15 lock evidence: Run ID `26643746981`; commit `4ba0f9db8020a9d0158ec95854ef10fbfe47694c`; no-browser passed with 144 checks; browser passed with 17 checks; hosted-demo evidence passed; AR/FR/EN visible-text snapshots passed; evidence matrix passed 39/39; lock bundle validation passed; artifact identity guard passed.
Locked alpha.14 baseline: `v1.4.0-alpha.14 — Adapter Replay Fixture Corpus + Coverage Matrix`. Alpha.14 lock evidence: Run ID `26640076472`; commit `476b97423d18842177ae47074967afa45e5962bb`; no-browser passed with 143 checks; browser passed with 17 checks; hosted-demo evidence passed; AR/FR/EN visible-text snapshots passed; lock bundle validation passed; artifact identity guard passed.
Last locked stable baseline: `v1.3.0 — Stable Manual Workflow Release`.
Locked RC baseline: `v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization`.
Locked manual workflow baseline: `v1.3.0-alpha.10 — Brief Publication Pack v4`.

Planning/control-plane only. Scope: alpha.17 lock completion plus an evidence-budget dashboard actionability layer. Convert evidence-budget regression results into pass, warn, fail, and review-required operator actions without expanding browser scope.

Actionability statuses: pass, warn, fail, and review-required. Recommended operator actions: lock_review_ready; review_budget_pressure_before_lock; block_lock_until_evidence_budget_regression_fixed; capture_current_evidence_before_lock.

Evidence budget thresholds: browser_check_budget_max: 20; hosted_language_count_expected: 3; hosted_surface_count_expected_max: 13; visible_snapshot_rows_expected_max: 39; evidence_matrix_rows_expected: 39; horizontal_overflow_max_px_expected: 0.

Boundary flags: safe_metadata_only: true; can_execute_now: false; network_invocation_allowed: false; hidden_network_calls_allowed: false; live_provider_execution_performed: false; live_source_fetching_performed: false; credential_persistence_allowed: false; automatic_source_verification_claimed: false; automatic_signoff_performed: false; automatic_export_lock_performed: false; publication_permission_claimed: false.

No live scraping. No production OAuth. No real OAuth. No real API keys. No real token storage. No credential persistence. No live source fetching. No hidden network calls. No provider execution expansion. No backend behavior expansion. No storage expansion. No source behavior expansion. No automatic source verification. No cryptographic signature claim. No publication permission claim.

Continuity repetition: source strategy continuity; release evidence continuity; package script compression and CI gate registry; fixture registry payload compression; test organization audit; apply integrity; changed-files-only discipline. Alpha.14 continuity: adapter replay fixture corpus; coverage matrix; deterministic replay fixtures; provider-family coverage rows; scenario-class coverage columns; coverage gap warnings; no-network replay QA. Alpha.12 continuity: ephemeral credential handoff; provider request-envelope preview; no-network dry invocation transcript; adapter failure taxonomy; safe request/response metadata ledger; ADR-018. Alpha.11 continuity: session state machine; kill-switch; timeout; budget; safe metadata-only session ledger; no-execution fallback; ADR-017. Alpha.7 continuity: manual_source; provider_proposed_source; future_controlled_fetch; ADR-013. Baseline repetition: v1.4.0-alpha.7 — Source Acquisition Control Surface; v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence; v1.4.0-alpha.5 — Dry-Run Replay Pack + Operator Approval Simulation; v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report; v1.4.0-alpha.3 — Provider/Source Dry-Run Execution Harness + Policy Simulator; v1.4.0-alpha.2 — Provider/Source Execution Policy Matrix + Failure UX Contracts; v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation; v1.3.0-alpha.10 — Brief Publication Pack v4.

Screenshots alone are insufficient. A ZIP archive alone is insufficient. Public Demo evidence remains required for lock: hosted evidence, visible-label snapshots, browser log, Playwright setup logs, and canonical lock bundle must all remain aligned with 1.4.0-alpha.18.

Release manifest tokens for packaging checks: package=jarbou3i-research-engine; version=1.4.0-alpha.18; runtime_capability_change=false; release_type=alpha17-lock-completion-evidence-budget-dashboard-actionability; release_scope=evidence-budget-dashboard-actionability-lock-completion-only; test:ci:browser required.

Legacy CI workflow quarantine markers: live_fetching_performed: false; provider_execution_performed: false; automatic_source_verification_claimed: false; Evidence Budget Dashboard Actionability.
Node 24 CI compatibility preserved.
Release-lock requirement repetition: Screenshots alone are insufficient; A ZIP archive alone is insufficient; green no-browser CI; green browser CI; reviewed hosted-demo evidence.
Feature surface is frozen; no live execution is enabled.
