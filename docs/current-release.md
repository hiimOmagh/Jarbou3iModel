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
- Evidence/export guard continuity: live_fetching_performed: false; provider_execution_performed: false; automatic_source_verification_claimed: false.

# Current Release

Locked alpha.20 baseline: `v1.4.0-alpha.20 — Evidence Decision Ledger Handoff Audit`. Alpha.20 lock evidence: Run ID `26680024039`; commit `d492d8e7de270f6bab5780a5dad5f821056c74b7`; bundle SHA256 `4b5f1d224c4fca49681981265c0d412c804972ede0e5636cdd2d3b5f06508147`; no-browser 149 checks passed; browser 17 checks passed; hosted-demo evidence passed; evidence matrix 39/39 passed; AR/FR/EN visible-text snapshots passed; artifact identity guard passed; bundle validation passed; lockable true.
Locked alpha.19 baseline: `v1.4.0-alpha.19 — Evidence Dashboard Decision Ledger`. Alpha.19 lock evidence: Run ID `26668213509`; commit `2b3665b66861d631e779e9133d77399d0560d827`; no-browser 148 checks passed; browser 17 checks passed; hosted-demo evidence passed; evidence matrix 39/39 passed; AR/FR/EN visible-text snapshots passed; artifact identity guard passed; bundle validation passed; lockable true.
Locked alpha.18 baseline: `v1.4.0-alpha.18 — Alpha.17 Lock Completion + Evidence Budget Dashboard Actionability`. Alpha.18 lock evidence: Run ID `26660959763`; commit `4e2c852fa0568fcc12881d7565ba9fd50844e0c4`; no-browser 147; browser 17; evidence matrix 39/39.
Locked alpha.17 baseline: `v1.4.0-alpha.17 — Alpha.16 Lock Completion + Evidence Budget Regression Dashboard`. Alpha.17 lock evidence: Run ID `26655823066`; commit `fef004abd43511cca247debc417917a4c8fb1c27`; no-browser 146; browser 17; evidence matrix 39/39.
Locked alpha.16 baseline: `v1.4.0-alpha.16 — Alpha.15 Lock Completion + Evidence Surface Budget Enforcement`. Alpha.16 lock evidence: Run ID `26646993357`; commit `d40d2054060c14326c5871ec86bd7ef5d9aab2ed`; no-browser 146; browser 17; evidence matrix 39/39.
Locked alpha.15 baseline: `v1.4.0-alpha.15 — Roadmap Lock Completion + Manual Provider Adapter UX Compression`. Alpha.15 lock evidence: Run ID `26643746981`; commit `4ba0f9db8020a9d0158ec95854ef10fbfe47694c`; no-browser 144; browser 17; evidence matrix 39/39.
Locked alpha.14 baseline: `v1.4.0-alpha.14 — Adapter Replay Fixture Corpus + Coverage Matrix`. Alpha.14 lock evidence: Run ID `26640076472`; commit `476b97423d18842177ae47074967afa45e5962bb`; no-browser 143; browser 17.
Last locked stable baseline: `v1.3.0 — Stable Manual Workflow Release`.
Locked RC baseline: `v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization`.
Locked manual workflow baseline: `v1.3.0-alpha.10 — Brief Publication Pack v4`.

Product-facing no-network replay insight only. Scope: alpha.26 converts adapter replay coverage evidence into operator-readable readiness, gap, and failure-reason decisions without expanding provider/source execution.

Evidence/runtime budget guard: evidence_surface_budget_version: 1.4.0-alpha.22; locked_baseline: 1.4.0-alpha.20; browser_check_budget_max: 20; hosted_language_count_expected: 3; hosted_surface_count_expected_max: 13; visible_snapshot_rows_expected_max: 39; runtime_budget_policy: guardrail_only; runtime_budget_enforced_without_network: true; provider_execution_performed: false; live_fetching_performed: false; credential_persistence_allowed: false.

No live scraping. No production OAuth. No real OAuth. No real API keys. No real token storage. No credential persistence. No live source fetching. No hidden network calls. No provider execution expansion. No backend behavior expansion. No storage expansion. No source behavior expansion. No automatic source verification. No automatic signoff. No automatic export lock. No cryptographic signing. No cryptographic signature claim. No publication permission claim.

Release continuity guard: v1.3.0 — Stable Manual Workflow Release; v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation; v1.4.0-alpha.2 — Provider/Source Execution Policy Matrix + Failure UX Contracts; v1.4.0-alpha.3 — Provider/Source Dry-Run Execution Harness + Policy Simulator; v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report; v1.4.0-alpha.5 — Dry-Run Replay Pack + Operator Approval Simulation; v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence; v1.4.0-alpha.7 — Source Acquisition Control Surface; v1.4.0-alpha.14 — Adapter Replay Fixture Corpus + Coverage Matrix; v1.3.0-alpha.10 — Brief Publication Pack v4; v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization.
Adapter continuity: adapter replay fixture corpus; coverage matrix; no-network replay QA; ephemeral credential handoff; provider request-envelope preview; no-network dry invocation transcript; adapter failure taxonomy; safe request/response metadata ledger; ADR-018; session state machine; kill-switch; timeout; budget; safe metadata-only session ledger; no-execution fallback; ADR-017; manual_source; provider_proposed_source; future_controlled_fetch; ADR-013.

Screenshots alone are insufficient. A ZIP archive alone is insufficient. Public Demo evidence remains required for lock: hosted evidence, visible-label snapshots, browser log, Playwright setup logs, and canonical lock bundle must all remain aligned with 1.4.0-alpha.28.

Release manifest tokens for packaging checks: package=jarbou3i-research-engine; version=1.4.0-alpha.28; runtime_capability_change=false; release_type=adapter-replay-insight-ux-operator-decision-surface; release_scope=adapter-replay-insight-ux-operator-decision-surface-only; test:ci:browser required.
Node 24 CI compatibility preserved.
Feature surface is limited to no-network adapter replay insight; no live execution is enabled.

Legacy locked alpha.19 baseline: v1.4.0-alpha.19 — Evidence Dashboard Decision Ledger; Run ID 26668213509; commit 2b3665b66861d631e779e9133d77399d0560d827. Handoff audit continuity preserved: تدقيق تسليم; audit de remise.

Legacy alpha.15 budget tokens: evidence_surface_budget_version: 1.4.0-alpha.22; locked_baseline: 1.4.0-alpha.14; browser_check_budget_max: 20; hosted_language_count_expected: 3; hosted_surface_count_expected_max: 13; visible_snapshot_rows_expected_max: 39; runtime_budget_policy: guardrail_only; runtime_budget_enforced_without_network: true; provider_execution_performed: false; live_fetching_performed: false; credential_persistence_allowed: false.

Evidence manifest gate continuity: single final metadata, capture manifest, visual freeze, mobile header, CI Gate Registry, Package Script, Root Manifest, Release Artifact Consolidation, Fixture Registry payload compression, test organization, planning gate. v1.1.0 and 1.3.0 continuity preserved.

Controlled provider/source preparation markers: live_fetching_performed: false; provider_execution_performed: false; automatic_source_verification_claimed: false; Handoff Productivity Runbook Gate.

Release-lock requirement: Screenshots alone are insufficient; A ZIP archive alone is insufficient; green no-browser CI; green browser CI; reviewed hosted-demo evidence.

Provenance gate continuity: provenance ledger, changed-files-only, fixture registry consolidation, visual freeze, mobile header, CI Gate Registry, Package Script, Root Manifest, Release Artifact Consolidation. v1.1.0 and 1.3.0 continuity preserved.

Hosted Demo browser evidence evidence review continuity preserved.

Arabic release token: بوابة دليل تشغيل إنتاجية التسليم.

French release token: Porte de runbook de productivité de remise.
