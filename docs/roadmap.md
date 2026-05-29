# Roadmap

## Current candidate

`v1.4.0-alpha.16 — Alpha.15 Lock Completion + Evidence Surface Budget Enforcement`

Purpose: mark locked alpha.15 as the completed baseline, make alpha.16 the current candidate, clean release-history/changelog truth drift, and enforce static evidence-surface budgets. This is a planning/control-plane milestone only. It changes no provider/backend/OAuth/source/storage behavior.

## Locked baselines

- `v1.4.0-alpha.15 — Roadmap Lock Completion + Manual Provider Adapter UX Compression` is locked. Do not patch it further. Evidence: Run ID `26643746981`, commit `4ba0f9db8020a9d0158ec95854ef10fbfe47694c`, no-browser 144 checks passed, browser 17 checks passed, hosted-demo evidence passed, AR/FR/EN visible-text snapshots passed, evidence matrix 39/39 passed, canonical lock bundle accepted, artifact identity guard passed.
- `v1.4.0-alpha.14 — Adapter Replay Fixture Corpus + Coverage Matrix` is locked. Do not patch it further. Evidence: Run ID `26640076472`, commit `476b97423d18842177ae47074967afa45e5962bb`, no-browser 143 checks passed, browser 17 checks passed, hosted-demo evidence passed, AR/FR/EN visible-text snapshots passed, canonical lock bundle accepted, artifact identity guard passed.
- `v1.4.0-alpha.12 — Manual Provider Adapter Sandbox + Ephemeral Invocation Contract` is locked. Do not patch it further.
- `v1.4.0-alpha.11 — Manual Execution Safety Cockpit + Session Ledger` is locked. Do not patch it further.
- `v1.4.0-alpha.10 — Limited Manual Live-Execution Prototype` is locked. Do not patch it further.
- `v1.4.0-alpha.9 — Controlled Execution Candidate Gate` is locked. Do not patch it further.
- `v1.4.0-alpha.8 — Credential Boundary Runtime Drill` is locked. Do not patch it further.
- `v1.4.0-alpha.7 — Source Acquisition Control Surface` is locked. Do not patch it further.
- `v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence` is locked. Do not patch it further.
- `v1.3.0 — Stable Manual Workflow Release` is locked. Do not patch it further.
- `v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization` and `v1.3.0-alpha.10 — Brief Publication Pack v4` remain protected manual workflow baselines.

Continuity baselines retained for release-truth checks: `v1.4.0-alpha.5 — Dry-Run Replay Pack + Operator Approval Simulation`; `v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report`; `v1.4.0-alpha.3 — Provider/Source Dry-Run Execution Harness + Policy Simulator`; `v1.4.0-alpha.2 — Provider/Source Execution Policy Matrix + Failure UX Contracts`; `v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation`; `v1.3.0-alpha.10 — Brief Publication Pack v4`.

## v1.4.0-alpha.16 acceptance

- Current release/docs no longer describe alpha.15 as awaiting lock.
- Alpha.15 is recorded as locked baseline with Run ID `26643746981` and commit `4ba0f9db8020a9d0158ec95854ef10fbfe47694c`.
- CHANGELOG has exactly one alpha.15 section and no stale alpha.12/alpha.14 descriptions inside the alpha.15 entry.
- Browser evidence remains bounded: max 20 browser checks, 3 hosted languages, max 13 hosted surfaces, max 39 visible snapshot rows.
- Adapter replay fixture corpus and coverage matrix remain present and safety-bounded.
- Alpha.15 UX/runtime budget safety boundaries remain preserved.
- AR/FR/EN visible copy remains aligned.
- No live provider calls, hidden network calls, real OAuth/token lifecycle, real API keys, token storage, credential persistence, backend/storage/source expansion, uncontrolled scraping, automatic source verification, automatic signoff, automatic export lock, cryptographic signature claim, or publication permission claim.

## Compressed next milestones

1. `v1.4.0-alpha.16 — Alpha.15 Lock Completion + Evidence Surface Budget Enforcement` — current candidate.
2. `v1.4.0-alpha.17 — Adapter Replay Gap Triage + Operator Review Shortcuts` — only after alpha.16 locks; improve review workflow while preserving no-network replay boundaries.
3. `v1.4.0-alpha.18 — Evidence Pack Slimming + Hosted Capture Review Ergonomics` — only after alpha.17 locks; continue evidence-size control without reducing AR/FR/EN lock evidence.

Forbidden until explicit later approval: no default live execution, no hidden network calls, no live scraping, no real OAuth, no real API keys, no real token storage, no credential persistence, live source fetching, automatic source fetching, hidden background fetching, provider execution expansion, backend behavior expansion, storage expansion, source behavior expansion, automatic source verification, provider-suggested source bypass, automatic signoff, automatic export lock, cryptographic signature claim, publication permission claim.

Node 24 CI compatibility remains mandatory for v1.4.0-alpha.16 and later.

Boundary repetition: no backend behavior expansion; no provider execution expansion; no production OAuth; no real OAuth; no real API keys; no live scraping; no automatic source verification; no cryptographic signature claim.

Stable continuity: v1.3.0 — Stable Manual Workflow Release. Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, and changed-files-only discipline remain preserved.
