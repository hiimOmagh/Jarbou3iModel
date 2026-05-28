# Roadmap

Current milestone: `v1.4.0-alpha.10 — Limited Manual Live-Execution Prototype`

Purpose: add a disabled-by-default manual opt-in execution prototype shell that records explicit operator preconditions and hard failure reasons without performing live provider execution, source fetching, hidden network calls, real OAuth/API-key handling, credential persistence, backend/storage expansion, automatic verification, signoff, export lock, signatures, or publication permission claims.

Locked baselines:

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

1. `v1.4.0-alpha.10 — Limited Manual Live-Execution Prototype` — disabled-by-default manual opt-in shell, operator preconditions, hard failure reasons, no execution.
2. `v1.4.0-alpha.11 — Manual Execution Safety Review Gate` — only after alpha.10 locks; review the shell, CI timing, and whether a future manual-only live attempt is still justified.

Forbidden until explicit later approval: no default live execution, no hidden network calls, no real OAuth, no real API keys, no real token storage, no credential persistence, live scraping, live source fetching, automatic source fetching, hidden background fetching, provider execution expansion, backend behavior expansion, storage expansion, automatic source verification, provider-suggested source bypass, automatic signoff, automatic export lock, cryptographic signature claim, publication permission claim.

No alpha.11 should start until v1.4.0-alpha.10 is locked with green no-browser CI, green browser CI, hosted evidence, and canonical lock evidence bundle.

Boundary shorthand: disabled-by-default manual opt-in shell only; no execution authorization; no real credentials; no live scraping; no hidden background fetch; no production OAuth; no backend/storage expansion; no provider execution expansion; no cryptographic signature or publication claim.

Node 24 CI compatibility remains mandatory for v1.4.0-alpha.10 and later.

Planning gate continuity: apply integrity and changed-files-only discipline remain required before any provider/source execution expansion.

Boundary wording: no backend behavior expansion; no provider execution expansion; no production OAuth.
Continuity: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, and changed-files-only discipline remain preserved.
