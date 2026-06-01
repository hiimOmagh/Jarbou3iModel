## v1.4.0-alpha.34 — Adapter Replay Review Pack Triage Workbench

Public label: v1.4.0-alpha.34 Adapter Replay Review Pack Triage Workbench

Status: built locally pending lock evidence. Adds a metadata-only triage workbench for the adapter replay review pack: replay-case priority ranking, blocker reason, evidence completeness, recommended next operator action, and export-ready triage summary. No live scraping. No production OAuth. No real OAuth. No real API keys. No credential persistence. No provider execution expansion. No backend behavior expansion. No storage expansion. No source behavior expansion. No automatic source verification. No automatic signoff. No automatic export lock. No cryptographic signing. No cryptographic signature claim. No publication permission claim. Preserves v1.3.0 — Stable Manual Workflow Release, v1.4.0-alpha.28 — Adapter Replay Review Pack + Operator Handoff Export, v1.4.0-alpha.31 — Adapter Replay Review Pack Operator Workflow Polish, and v1.4.0-alpha.32 — Adapter Replay Review Pack Evidence Trace Reader.


## v1.4.0-alpha.28 — Adapter Replay Review Pack + Operator Handoff Export

Public label: v1.4.0-alpha.28 Adapter Replay Review Pack + Operator Handoff Export

Status: built locally pending lock evidence. Adds a metadata-only adapter replay review pack, operator handoff export payload, required action summary, and triage workbench bundle from the alpha.27 drilldown links. No live scraping. No production OAuth. No real OAuth. No real API keys. No credential persistence. No provider execution expansion. No backend behavior expansion. No storage expansion. No source behavior expansion. No automatic source verification. No automatic signoff. No automatic export lock. No cryptographic signing. No cryptographic signature claim. No publication permission claim. Preserves v1.3.0 — Stable Manual Workflow Release, v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence, v1.4.0-alpha.7 — Source Acquisition Control Surface, and v1.4.0-alpha.14 — Adapter Replay Fixture Corpus + Coverage Matrix.

## v1.4.0-alpha.28 — Adapter Replay Review Pack + Operator Handoff Export

- Status: current candidate. Lock is pending green no-browser CI, green browser CI, hosted-demo evidence, artifact identity guard, and canonical lock bundle review.
- Public release label: v1.4.0-alpha.28 Adapter Replay Review Pack + Operator Handoff Export.
- Locked alpha.23 baseline: `v1.4.0-alpha.23 — Handoff Productivity Runbook Gate`. Alpha.23 lock evidence: Run ID `26684865061`; commit `4675e12940112f734e0434421bf4553906093ff8`; bundle SHA256 `441c4fb891effea54a8e4492730b2c851baec838a5e45b451ec3a501343356c6`; no-browser 144 checks passed; browser 17 checks passed; hosted-demo evidence passed; evidence matrix 39/39 passed; AR/FR/EN visible-text snapshots passed; artifact identity guard passed; bundle validation passed; lockable true.
- Scope: adapter replay insight UX only. It turns the deterministic replay corpus and coverage matrix into an operator-facing decision surface with coverage summaries, gap groups, failure reason groups, evidence links, and readiness verdicts without enabling live execution.
- Operator decision outcomes: review_replay_coverage; inspect_gap_groups; group_failure_reasons; trace_evidence_links; confirm_no_network_readiness.
- Safety: no live provider calls, hidden network calls, OAuth/token lifecycle, credential persistence, live source fetching, automatic verification, automatic signoff, automatic export lock, cryptographic signature claim, or publication permission.
- Runtime/provider/OAuth/backend/source/storage boundaries remain unchanged.

## v1.4.0-alpha.28 — Adapter Replay Review Pack + Operator Handoff Export

- Status: current candidate. Lock is pending green no-browser CI, green browser CI, hosted-demo evidence, artifact identity guard, and canonical lock bundle review.
- Public release label: v1.4.0-alpha.28 Adapter Replay Review Pack + Operator Handoff Export.
- Locked alpha.22 baseline: `v1.4.0-alpha.22 — Handoff Productivity Command Center`. Alpha.22 lock evidence: Run ID `26683651807`; commit `a86d23efa3df7450c34d151f0dbb30fe3abdabef`; bundle SHA256 `a93d248dbe256fe073f93d977ab7cf432207293e2d59fdef0dbc0652d45f0068`; no-browser 150 checks passed; browser 17 checks passed; hosted-demo evidence passed; evidence matrix 39/39 passed; AR/FR/EN visible-text snapshots passed; artifact identity guard passed; bundle validation passed; lockable true.
- Scope: static handoff productivity runbook gate only. It verifies current-candidate identity, no-browser/browser gates, hosted evidence matrix, visible-text snapshots, artifact identity guard, operator boundary, and no-automatic-signoff/export-lock runbook steps.
- Runbook outcomes: execute_operator_lock_runbook; review_budget_pressure_then_continue; repair_blockers_before_runbook; capture_missing_evidence_before_runbook.
- Safety: no live provider calls, hidden network calls, OAuth/token lifecycle, credential persistence, live source fetching, automatic verification, automatic signoff, automatic export lock, cryptographic signature claim, or publication permission.
- Runtime/provider/OAuth/backend/source/storage boundaries remain unchanged.

## v1.4.0-alpha.22 — Handoff Productivity Command Center

- Status: locked baseline. Alpha.22 lock evidence: Run ID `26683651807`; commit `a86d23efa3df7450c34d151f0dbb30fe3abdabef`; bundle SHA256 `a93d248dbe256fe073f93d977ab7cf432207293e2d59fdef0dbc0652d45f0068`; no-browser 150 checks passed; browser 17 checks passed; hosted-demo evidence passed; evidence matrix 39/39 passed; AR/FR/EN visible-text snapshots passed; artifact identity guard passed; bundle validation passed; lockable true.
- Public release label: v1.4.0-alpha.22 Handoff Productivity Command Center.
- Locked alpha.21 baseline: `v1.4.0-alpha.21 — Evidence Handoff Readiness Checklist`. Alpha.21 lock evidence: Run ID `26681464045`; commit `81675392a202ff1b175a8de62f6dbcd10962395e`; bundle SHA256 `a0be3068eedf344e25bb9bba0e7864790cb09fb0b0815c42a9edaca9185fcbfe`; no-browser 150 checks passed; browser 17 checks passed; hosted-demo evidence passed; evidence matrix 39/39 passed; AR/FR/EN visible-text snapshots passed; artifact identity guard passed; bundle validation passed; lockable true.
- Scope: static handoff productivity command center only. It turns handoff readiness, decision-ledger, actionability, evidence-budget, localization, artifact-identity, and operator-review signals into a prioritized operator next-step queue.
- Productivity outcomes: execute_lock_review_sequence; triage_budget_pressure_first; repair_blocking_handoff_defects_first; capture_missing_handoff_evidence_first.
- Safety: no live provider calls, hidden network calls, OAuth/token lifecycle, credential persistence, live source fetching, automatic verification, automatic signoff, automatic export lock, cryptographic signature claim, or publication permission.
- Runtime/provider/OAuth/backend/source/storage boundaries remain unchanged.

# Changelog

## v1.4.0-alpha.22 — Alpha.21 Lock Completion + Handoff Productivity Command Center

- Marked `v1.4.0-alpha.20 — Evidence Decision Ledger Handoff Audit` as locked with Run ID `26680024039` and commit `d492d8e7de270f6bab5780a5dad5f821056c74b7`.
- Added static handoff productivity command center.
- Added operator actions: handoff_packet_ready_for_review; review_handoff_warnings_before_lock; block_handoff_until_repaired; capture_handoff_evidence_before_review.
- Preserved alpha.14 replay corpus, alpha.15 UX/runtime guard, alpha.16 evidence-budget enforcement, alpha.17 regression dashboard, alpha.18 actionability, alpha.19 decision ledger, and alpha.20 handoff audit.
- No live scraping. No production OAuth. No real OAuth. No real API keys. No real token storage. No credential persistence. No live source fetching. No hidden network calls. No provider execution expansion. No backend behavior expansion. No storage expansion. No source behavior expansion. No automatic source verification. No automatic signoff. No automatic export lock. No cryptographic signing. No cryptographic signature claim. No publication permission claim.

## v1.4.0-alpha.20 — Evidence Decision Ledger Handoff Audit

- Locked evidence decision ledger handoff audit with Run ID `26680024039`, commit `d492d8e7de270f6bab5780a5dad5f821056c74b7`, no-browser 149, browser 17, hosted evidence passed, evidence matrix 39/39, and artifact identity guard passed.

Release continuity guard: v1.3.0 — Stable Manual Workflow Release; v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation; v1.4.0-alpha.2 — Provider/Source Execution Policy Matrix + Failure UX Contracts; v1.4.0-alpha.3 — Provider/Source Dry-Run Execution Harness + Policy Simulator; v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report; v1.4.0-alpha.5 — Dry-Run Replay Pack + Operator Approval Simulation; v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence; v1.4.0-alpha.7 — Source Acquisition Control Surface; v1.4.0-alpha.14 — Adapter Replay Fixture Corpus + Coverage Matrix; v1.3.0-alpha.10 — Brief Publication Pack v4; v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization.
Adapter continuity: adapter replay fixture corpus; coverage matrix; no-network replay QA; ephemeral credential handoff; provider request-envelope preview; no-network dry invocation transcript; adapter failure taxonomy; safe request/response metadata ledger; ADR-018; session state machine; kill-switch; timeout; budget; safe metadata-only session ledger; no-execution fallback; ADR-017; manual_source; provider_proposed_source; future_controlled_fetch; ADR-013.

Legacy locked alpha.19 baseline: v1.4.0-alpha.19 — Evidence Dashboard Decision Ledger; Run ID 26668213509; commit 2b3665b66861d631e779e9133d77399d0560d827. Handoff audit continuity preserved: تدقيق تسليم; audit de remise.

Legacy locked alpha.18 baseline: v1.4.0-alpha.18 — Alpha.17 Lock Completion + Evidence Budget Dashboard Actionability; Run ID 26660959763; commit 4e2c852fa0568fcc12881d7565ba9fd50844e0c4. Decision ledger continuity preserved.
Legacy locked alpha.17 baseline: v1.4.0-alpha.17 — Alpha.16 Lock Completion + Evidence Budget Regression Dashboard; Run ID 26655823066; commit fef004abd43511cca247debc417917a4c8fb1c27. Regression dashboard continuity preserved.
Legacy locked alpha.16 baseline: v1.4.0-alpha.16 — Alpha.15 Lock Completion + Evidence Surface Budget Enforcement; Run ID 26646993357; commit d40d2054060c14326c5871ec86bd7ef5d9aab2ed. Evidence budget enforcement continuity preserved.
Legacy locked alpha.15 baseline: v1.4.0-alpha.15 — Roadmap Lock Completion + Manual Provider Adapter UX Compression; Run ID 26643746981; commit 4ba0f9db8020a9d0158ec95854ef10fbfe47694c. UX compression continuity preserved.

## v1.4.0-alpha.16 — Alpha.15 Lock Completion + Evidence Surface Budget Enforcement

- Marked alpha.15 locked and cleaned release-history/changelog truth drift.
- Added evidence surface budget enforcement: browser check budget max 20, hosted languages expected 3, hosted surfaces max 13, visible snapshot rows max 39.
- Preserved alpha.14 replay corpus and alpha.15 UX/runtime-budget safety boundaries.

## v1.4.0-alpha.15 — Roadmap Lock Completion + Manual Provider Adapter UX Compression

- Roadmap lock completion after alpha.14.
- Manual provider adapter UX compression.
- Static evidence/runtime budget guard: browser check budget max 20, hosted languages expected 3, hosted surfaces max 13, visible snapshot rows max 39.
- Preserved the alpha.14 replay corpus and coverage matrix safety boundaries.

Evidence manifest gate continuity: single final metadata, capture manifest, visual freeze, mobile header, CI Gate Registry, Package Script, Root Manifest, Release Artifact Consolidation, Fixture Registry payload compression, test organization, planning gate. v1.1.0 and 1.3.0 continuity preserved.

Node 24 CI compatibility preserved.

Provenance gate continuity: provenance ledger, changed-files-only, fixture registry consolidation, visual freeze, mobile header, CI Gate Registry, Package Script, Root Manifest, Release Artifact Consolidation. v1.1.0 and 1.3.0 continuity preserved.

Public Demo readiness continuity preserved.

Arabic release token: بوابة دليل تشغيل إنتاجية التسليم.

French release token: Porte de runbook de productivité de remise.
