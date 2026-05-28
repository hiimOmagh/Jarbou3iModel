# Roadmap

## v1.4.0-alpha.13 — Adapter Contract Test Bench + No-Network Invocation Replay QA

Adds deterministic provider adapter fixtures, request/response envelope diffing, no-network invocation replay, adapter failure UX rehearsal, safe transcript comparison, cross-provider capability matrix, and a safe metadata-only replay ledger. It remains disabled by default and enables no real provider calls, no hidden network calls, no live source fetching, no real OAuth/token lifecycle, no credential persistence, no backend/storage expansion, no automatic source verification, no automatic signoff/export lock, and no publication permission claim. Requires hosted evidence and canonical lock evidence bundle before lock.


Current milestone: `v1.4.0-alpha.13 — Adapter Contract Test Bench + No-Network Invocation Replay QA`

Purpose: define a no-network manual provider adapter sandbox before any real provider invocation attempt. The milestone adds ephemeral credential handoff semantics without persistence, request-envelope preview, dry invocation transcript, adapter failure taxonomy, and safe metadata-only invocation ledger.

Locked baselines:

- `v1.4.0-alpha.11 — Manual Execution Safety Cockpit + Session Ledger` is locked. Do not patch it further.
- `v1.4.0-alpha.10 — Limited Manual Live-Execution Prototype` is locked. Do not patch it further.
- `v1.4.0-alpha.9 — Controlled Execution Candidate Gate` is locked. Do not patch it further.
- `v1.4.0-alpha.8 — Credential Boundary Runtime Drill` is locked. Do not patch it further.
- `v1.4.0-alpha.7 — Source Acquisition Control Surface` is locked. Do not patch it further.
- `v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence` is locked. Do not patch it further.
- `v1.3.0 — Stable Manual Workflow Release` is locked. Do not patch it further.

Compressed next milestones:

1. `v1.4.0-alpha.13 — Adapter Contract Test Bench + No-Network Invocation Replay QA` — no-network provider adapter sandbox and safe metadata ledger.
2. `v1.4.0-alpha.13 — Manual Provider Adapter UX Compression + Evidence Capture Runtime Budget` — only after alpha.12 locks; reduce browser evidence time and improve operator review clarity.

Forbidden until explicit later approval: no default live execution, no hidden network calls, no real OAuth, no real API keys, no real token storage, no credential persistence, live scraping, live source fetching, automatic source fetching, hidden background fetching, provider execution expansion, backend behavior expansion, storage expansion, automatic source verification, provider-suggested source bypass, automatic signoff, automatic export lock, cryptographic signature claim, publication permission claim.

No alpha.14 should start until v1.4.0-alpha.13 is locked with green no-browser CI, green browser CI, hosted evidence, and canonical lock evidence bundle.

Node 24 CI compatibility remains mandatory for v1.4.0-alpha.13 and later.
Planning gate continuity: apply integrity and changed-files-only discipline remain required before any provider/source execution expansion.

Boundary repetition for release-truth checks: no live scraping; no production OAuth; no real API keys; no automatic source verification; no cryptographic signature claim.

Full baseline repetition for release-truth checks: v1.4.0-alpha.5 — Dry-Run Replay Pack + Operator Approval Simulation; v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report; v1.4.0-alpha.3 — Provider/Source Dry-Run Execution Harness + Policy Simulator; v1.4.0-alpha.2 — Provider/Source Execution Policy Matrix + Failure UX Contracts; v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation; v1.3.0-alpha.10 — Brief Publication Pack v4.

Stable baseline repetition: v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization; v1.3.0-alpha.10 — Brief Publication Pack v4. No backend behavior expansion. No provider execution expansion.
