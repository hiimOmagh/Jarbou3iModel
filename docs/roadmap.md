## v1.4.0-alpha.20 — Alpha.19 Lock Completion + Evidence Decision Ledger Handoff Audit

- Status: current candidate. Lock is pending green no-browser CI, browser CI, hosted-demo evidence, artifact identity guard, and canonical lock bundle review.
- Public release label: v1.4.0-alpha.20 Evidence Decision Ledger Handoff Audit.
- Locked baseline: v1.4.0-alpha.19 — Evidence Dashboard Decision Ledger.
- Alpha.19 lock evidence: Run ID 26668213509; commit 2b3665b66861d631e779e9133d77399d0560d827; no-browser 148 checks passed; browser 17 checks passed; hosted-demo evidence passed; evidence matrix 39/39 passed; AR/FR/EN visible-text snapshots passed; artifact identity guard passed; bundle validation passed; lockable true.
- Scope: static evidence decision ledger handoff audit only. It verifies handoff readiness, lock-bundle identity, behavior-boundary confirmation, and manual operator review paths.
- Handoff audit states: handoff_ready_for_operator_review; handoff_ready_with_budget_pressure_review; handoff_blocked_until_decision_ledger_repaired; handoff_requires_current_evidence_capture.
- Safety: no live provider calls, hidden network calls, OAuth/token lifecycle, credential persistence, live source fetching, automatic verification, automatic signoff, automatic export lock, cryptographic signature claim, or publication permission.
- Runtime/provider/OAuth/backend/source/storage boundaries remain unchanged.

# Roadmap

## Current candidate
`v1.4.0-alpha.20 — Alpha.19 Lock Completion + Evidence Decision Ledger Handoff Audit`

Purpose: mark locked alpha.18 as the completed baseline, make alpha.19 the current candidate, and convert evidence dashboard actionability status into a static decision ledger for operator lock review.

## Locked baselines
- `v1.4.0-alpha.18 — Alpha.17 Lock Completion + Evidence Budget Dashboard Actionability` — Run ID `26660959763`, commit `4e2c852fa0568fcc12881d7565ba9fd50844e0c4`, no-browser 147, browser 17, hosted evidence passed, visible text AR/FR/EN passed, evidence matrix 39/39, artifact identity guard passed, bundle validation passed, lockable true.
- `v1.4.0-alpha.17 — Alpha.16 Lock Completion + Evidence Budget Regression Dashboard` — Run ID `26655823066`, commit `fef004abd43511cca247debc417917a4c8fb1c27`, no-browser 146, browser 17, hosted evidence passed, visible text AR/FR/EN passed, evidence matrix 39/39, artifact identity guard passed, bundle validation passed.
- `v1.4.0-alpha.16 — Alpha.15 Lock Completion + Evidence Surface Budget Enforcement` — Run ID `26646993357`, commit `d40d2054060c14326c5871ec86bd7ef5d9aab2ed`, no-browser 146, browser 17, hosted evidence passed, visible text AR/FR/EN passed, evidence matrix 39/39, artifact identity guard passed.
- `v1.4.0-alpha.15 — Roadmap Lock Completion + Manual Provider Adapter UX Compression` — Run ID `26643746981`, commit `4ba0f9db8020a9d0158ec95854ef10fbfe47694c`.
- `v1.4.0-alpha.14 — Adapter Replay Fixture Corpus + Coverage Matrix` — Run ID `26640076472`, commit `476b97423d18842177ae47074967afa45e5962bb`.

## v1.4.0-alpha.20 — Alpha.19 Lock Completion + Evidence Decision Ledger Handoff Audit

Status: current candidate. Lock is pending green no-browser CI, green browser CI, hosted evidence, and canonical lock evidence bundle upload.

Public release label: v1.4.0-alpha.20 Evidence Decision Ledger Handoff Audit.

Scope: alpha.18 lock completion plus a static evidence dashboard decision ledger. The ledger maps pass, warn, fail, and review-required status into explicit operator decision paths: lock_review_ready; review_budget_pressure_before_lock; block_lock_until_evidence_budget_regression_fixed; capture_current_evidence_before_lock.

No live provider calls, hidden network calls, live source fetching, OAuth/token lifecycle, credential persistence, backend/storage/source expansion, automatic source verification, automatic signoff, automatic export lock, cryptographic signature claim, or publication permission claim.

Screenshots alone are insufficient. A ZIP archive alone is insufficient. Public Demo evidence remains required for lock: hosted evidence, visible-label snapshots, browser log, Playwright setup logs, and canonical lock bundle must all remain aligned with 1.4.0-alpha.20.

## Next after lock
Do not start the next milestone until alpha.19 has green no-browser CI, green browser CI, hosted evidence, and canonical lock evidence bundle.
Node 24 CI compatibility preserved.

Continuity baselines preserved: v1.3.0 — Stable Manual Workflow Release; v1.4.0-alpha.7 — Source Acquisition Control Surface; v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence; v1.4.0-alpha.5 — Dry-Run Replay Pack + Operator Approval Simulation; v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report; v1.4.0-alpha.3 — Provider/Source Dry-Run Execution Harness + Policy Simulator; v1.4.0-alpha.2 — Provider/Source Execution Policy Matrix + Failure UX Contracts; v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation; v1.3.0-alpha.10 — Brief Publication Pack v4. No live scraping. No production OAuth. No real OAuth. No real API keys. No cryptographic signature claim. No automatic source verification.
 Locked RC baseline: `v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization`. Locked manual workflow baseline: `v1.3.0-alpha.10 — Brief Publication Pack v4`. No backend behavior expansion. No provider execution expansion.

Release continuity note: changed-files-only discipline, apply integrity, test organization, planning gate, Fixture Registry payload compression, Package Script Compression, Version Suite Registry, Root Manifest, and Release Artifact Consolidation remain preserved for v1.1.0 and v1.3.0 continuity.


Release continuity guard: v1.3.0 — Stable Manual Workflow Release; v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation; v1.4.0-alpha.2 — Provider/Source Execution Policy Matrix + Failure UX Contracts; v1.4.0-alpha.3 — Provider/Source Dry-Run Execution Harness + Policy Simulator; v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report; v1.4.0-alpha.5 — Dry-Run Replay Pack + Operator Approval Simulation; v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence; v1.4.0-alpha.7 — Source Acquisition Control Surface; v1.4.0-alpha.14 — Adapter Replay Fixture Corpus + Coverage Matrix; v1.3.0-alpha.10 — Brief Publication Pack v4. Boundaries: no live scraping; No production OAuth; No real OAuth; No real API keys; no real API keys; no automatic source verification; no cryptographic signing; no cryptographic signature claim. Adapter continuity: adapter replay fixture corpus; coverage matrix; no-network replay QA; ephemeral credential handoff; provider request-envelope preview; no-network dry invocation transcript; adapter failure taxonomy; safe request/response metadata ledger; ADR-018; session state machine; kill-switch; timeout; budget; safe metadata-only session ledger; no-execution fallback; ADR-017; manual_source; provider_proposed_source; future_controlled_fetch; ADR-013.
