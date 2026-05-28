# Roadmap

Current milestone: `v1.4.0-alpha.11 — Manual Execution Safety Cockpit + Session Ledger`

Purpose: connect the locked alpha.6–alpha.10 safety layers into one disabled-by-default manual execution safety cockpit with session state, kill-switch drill, timeout/cost/request guardrails, safe metadata-only ledger, and no-execution fallback reporting.

Locked baselines:

- `v1.4.0-alpha.10 — Limited Manual Live-Execution Prototype` is locked. Do not patch it further.
- `v1.4.0-alpha.9 — Controlled Execution Candidate Gate` is locked. Do not patch it further.
- `v1.4.0-alpha.8 — Credential Boundary Runtime Drill` is locked. Do not patch it further.
- `v1.4.0-alpha.7 — Source Acquisition Control Surface` is locked. Do not patch it further.
- `v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence` is locked. Do not patch it further.
- `v1.4.0-alpha.5 — Dry-Run Replay Pack + Operator Approval Simulation` is locked. Do not patch it further.
- `v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report` is locked. Do not patch it further.
- `v1.4.0-alpha.3 — Provider/Source Dry-Run Execution Harness + Policy Simulator` is locked. Do not patch it further.
- `v1.4.0-alpha.2 — Provider/Source Execution Policy Matrix + Failure UX Contracts` is locked. Do not patch it further.
- `v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation` is locked. Do not patch it further.
- `v1.3.0 — Stable Manual Workflow Release` is locked. Do not patch it further.
- `v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization` is locked. Do not patch it further.
- `v1.3.0-alpha.10 — Brief Publication Pack v4` is locked and remains the manual publication-pack baseline.

Compressed next milestones:

1. `v1.4.0-alpha.11 — Manual Execution Safety Cockpit + Session Ledger` — simulation-only execution safety cockpit, kill-switch drill, session ledger, no execution.
2. `v1.4.0-alpha.12 — Manual Provider Adapter Sandbox + Ephemeral Invocation Contract` — only after alpha.11 locks; define an adapter sandbox contract before any real execution attempt.

Forbidden until explicit later approval: no default live execution, no hidden network calls, no real OAuth, no real API keys, no real token storage, no credential persistence, live scraping, live source fetching, automatic source fetching, hidden background fetching, provider execution expansion, backend behavior expansion, storage expansion, automatic source verification, provider-suggested source bypass, automatic signoff, automatic export lock, cryptographic signature claim, publication permission claim.

No alpha.12 should start until v1.4.0-alpha.11 is locked with green no-browser CI, green browser CI, hosted evidence, and canonical lock evidence bundle.

Boundary shorthand: safety cockpit simulation only; no execution authorization; no real credentials; no live scraping; no hidden background fetch; no production OAuth; no backend/storage expansion; no provider execution expansion; no cryptographic signature or publication claim.

Node 24 CI compatibility remains mandatory for v1.4.0-alpha.11 and later.

Planning gate continuity: apply integrity and changed-files-only discipline remain required before any provider/source execution expansion.

Boundary wording: no backend behavior expansion; no provider execution expansion; no production OAuth.
Continuity: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, and changed-files-only discipline remain preserved.
