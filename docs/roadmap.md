# Roadmap

Current milestone: `v1.4.0-alpha.3 — Provider/Source Dry-Run Execution Harness + Policy Simulator`

Purpose: simulate provider/source policy decisions and failure paths with deterministic fixtures after the locked `v1.4.0-alpha.2 — Provider/Source Execution Policy Matrix + Failure UX Contracts`. This is a planning/control-plane milestone only.

Locked baselines:

- `v1.4.0-alpha.2 — Provider/Source Execution Policy Matrix + Failure UX Contracts` is locked. Do not patch it further.
- `v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation` is locked. Do not patch it further.
- `v1.3.0 — Stable Manual Workflow Release` is locked. Do not patch it further.
- `v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization` is locked. Do not patch it further.
- `v1.3.0-alpha.10 — Brief Publication Pack v4` is locked and remains the manual publication-pack baseline.

Compressed next milestones:

1. `v1.4.0-alpha.3 — Provider/Source Dry-Run Execution Harness + Policy Simulator` — deterministic planning/control-plane only.
2. `v1.4.0-alpha.4 — Provider Execution Harness Mock-to-Live Equivalence` — still no default live execution.
3. `v1.4.0-alpha.5 — Source Acquisition Control Surface` — controlled source modes without uncontrolled scraping.
4. `v1.4.0-alpha.6 — Credential Boundary Runtime Drill` — leak tests and redaction drills.

Forbidden until explicit later approval: live scraping, live source fetching, provider execution expansion, production OAuth, backend behavior expansion, storage expansion, automatic source verification, automatic signoff, automatic export lock, cryptographic signature claim, publication permission claim.

No alpha.4 should start until v1.4.0-alpha.3 is locked with green no-browser CI, green browser CI, hosted evidence, and canonical lock evidence bundle.

Boundary shorthand: no live scraping; no production OAuth; no backend behavior expansion; no provider execution expansion; no cryptographic signature claim.

Node 24 CI compatibility remains mandatory for v1.4.0-alpha.3 and later.

Planning gate continuity: apply integrity and changed-files-only discipline remain required before any provider/source execution expansion.
