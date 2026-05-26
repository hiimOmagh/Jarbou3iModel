# Jarbou3i Research Engine

`v1.4.0-alpha.2 — Provider/Source Execution Policy Matrix + Failure UX Contracts`

Planning/control-plane milestone after the locked `v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation` and the locked `v1.3.0 — Stable Manual Workflow Release`. This release defines provider/source execution policy states and operator-visible failure UX contracts only. It preserves the locked `v1.3.0-alpha.10 — Brief Publication Pack v4` manual publication-pack baseline.

## Scope

- Provider/source execution policy matrix.
- Provider/source failure UX contracts.
- ADR-004 provider/source execution policy matrix.
- ADR-005 provider/source failure UX contracts.
- Preserved provider execution threat model and preflight gate from alpha.1.
- Preserved ADR-001 provider execution model, ADR-002 source acquisition controls, and ADR-003 credential boundary.

## Hard boundaries

No live scraping. No live source fetching. No provider execution expansion. No production OAuth. No backend behavior expansion. No storage expansion. No automatic source verification. No automatic signoff. No automatic export lock. No cryptographic signature claim. No publication permission claim.

## Baselines

- Current package version: `1.4.0-alpha.2`.
- Current release: `v1.4.0-alpha.2 — Provider/Source Execution Policy Matrix + Failure UX Contracts`.
- Last locked control baseline: `v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation`.
- Last locked stable baseline: `v1.3.0 — Stable Manual Workflow Release`.
- Last locked RC baseline: `v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization`.
- Manual workflow baseline: `v1.3.0-alpha.10 — Brief Publication Pack v4`.

## Validation

```bash
node tests/provider-execution-threat-model-check.mjs
node tests/provider-execution-preflight-check.mjs
node tests/provider-source-execution-policy-matrix-check.mjs
node tests/provider-source-failure-ux-contracts-check.mjs
npm run test:current:no-browser
npm run test:source
npm run test:release
npm run test:qa
npm run test:ci:no-browser
npm run test:ci:browser
```

Screenshots alone are insufficient. A ZIP archive alone is insufficient. Lock requires green no-browser CI, green browser CI, hosted evidence, and canonical lock evidence bundle.

Public version label: v1.4.0-alpha.2 Provider/Source Execution Policy Matrix + Failure UX Contracts.

Release provenance continuity: changed-files-only discipline, provenance ledger, CI Gate Registry, and Package Script checks remain active for v1.4.0-alpha.2.

Public Demo boundary: v1.4.0-alpha.2 keeps the locked public demo/manual workflow behavior unchanged while defining execution policy and failure UX contracts.
