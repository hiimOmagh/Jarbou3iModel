# Roadmap

Current milestone: `v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence`

Purpose: prove that the deterministic dry-run/mock execution path structurally matches the planned future-live execution envelope for payload shape, policy decisions, failure UX contracts, readiness blockers, replay compatibility, and operator approval boundaries. This is an equivalence/planning milestone only; it does not enable live execution.

Locked baselines:

- `v1.4.0-alpha.5 — Dry-Run Replay Pack + Operator Approval Simulation` is locked. Do not patch it further.
- `v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report` is locked. Do not patch it further.
- `v1.4.0-alpha.3 — Provider/Source Dry-Run Execution Harness + Policy Simulator` is locked. Do not patch it further.
- `v1.4.0-alpha.2 — Provider/Source Execution Policy Matrix + Failure UX Contracts` is locked. Do not patch it further.
- `v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation` is locked. Do not patch it further.
- `v1.3.0 — Stable Manual Workflow Release` is locked. Do not patch it further.
- `v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization` is locked. Do not patch it further.
- `v1.3.0-alpha.10 — Brief Publication Pack v4` is locked and remains the manual publication-pack baseline.

Compressed next milestones:

1. `v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence` — deterministic equivalence validation only; still no default live execution.
2. `v1.4.0-alpha.7 — Source Acquisition Control Surface` — controlled source modes without uncontrolled scraping.
3. `v1.4.0-alpha.8 — Credential Boundary Runtime Drill` — fake-token leak tests and redaction drills.
4. `v1.4.0-alpha.9 — Controlled Execution Candidate Gate` — decide whether a limited execution candidate is safe enough to design.
5. `v1.4.0-alpha.10 — Limited Manual Live-Execution Prototype` — only if all prior control gates pass.

Forbidden until explicit later approval: live scraping, live source fetching, provider execution expansion, production OAuth, backend behavior expansion, storage expansion, automatic source verification, automatic signoff, automatic export lock, cryptographic signature claim, publication permission claim.

No alpha.7 should start until v1.4.0-alpha.6 is locked with green no-browser CI, green browser CI, hosted evidence, and canonical lock evidence bundle.

Boundary shorthand: no live scraping; no production OAuth; no backend behavior expansion; no provider execution expansion; no cryptographic signature claim.

Node 24 CI compatibility remains mandatory for v1.4.0-alpha.6 and later.

Planning gate continuity: apply integrity and changed-files-only discipline remain required before any provider/source execution expansion.
