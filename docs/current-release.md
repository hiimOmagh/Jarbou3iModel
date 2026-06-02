## v1.4.0-alpha.42 — Manual Workflow UX Consolidation

Public label: v1.4.0-alpha.42 Manual Workflow UX Consolidation

Product-facing source-to-brief operator control room. Adds a manual stage board, intervention lanes, blocker register, readiness scorecard, operator runbook, and export-ready control-room summary over the existing source-to-brief continuity metadata.

Boundaries: no live provider calls, no source fetching, no OAuth/token lifecycle change, no backend/storage/source behavior change, no automatic verification, no automatic signoff, no automatic export lock, no status persistence, no batch mutation, and no publication permission claim.


Continuity baselines: v1.3.0 — Stable Manual Workflow Release; v1.4.0-alpha.14 — Adapter Replay Fixture Corpus + Coverage Matrix; v1.4.0-alpha.7 — Source Acquisition Control Surface; v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence; v1.4.0-alpha.5 — Dry-Run Replay Pack + Operator Approval Simulation; v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report; v1.4.0-alpha.3 — Provider/Source Dry-Run Execution Harness + Policy Simulator; v1.4.0-alpha.2 — Provider/Source Execution Policy Matrix + Failure UX Contracts; v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation; v1.3.0-alpha.10 — Brief Publication Pack v4.

Boundary continuity: no live scraping. No production OAuth. No real OAuth. No real API keys. No credential persistence. No automatic source verification. No cryptographic signing or cryptographic signature claim. Preserves source strategy continuity, release evidence continuity, package script compression and CI gate registry, Planning/control-plane milestone, real API keys boundary, cryptographic signing boundary, adapter replay fixture corpus, coverage matrix, no-network replay QA, ephemeral credential handoff, provider request-envelope preview, no-network dry invocation transcript, adapter failure taxonomy, safe request/response metadata ledger, ADR-018, session state machine, kill-switch, timeout, budget, safe metadata-only session ledger, no-execution fallback, ADR-017, manual_source, provider_proposed_source, future_controlled_fetch, ADR-013.

A ZIP archive alone is insufficient for release lock; hosted evidence metadata, browser evidence, no-browser gates, artifact identity guard, and lockable bundle validation remain required.

Planning/control-plane only: controlled execution candidate behavior remains frozen unless explicit gates prove readiness.

Public and internal release versions are aligned.

Screenshots alone are insufficient; hosted metadata, browser evidence, no-browser evidence, and lock bundle validation are required.

Feature surface is frozen for execution behavior: no live execution, no provider execution expansion, and no source fetching.

live_fetching_performed: false

provider_execution_performed: false

automatic_source_verification_claimed: false

jarbou3i-research-engine

1.4.0-alpha.28

runtime_capability_change

test:ci:browser

release_type

release_scope

Node 24 CI compatibility preserved.

green no-browser CI

green browser CI

reviewed hosted-demo evidence

Public Demo evidence remains required for release lock.
