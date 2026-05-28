# Jarbou3i Research Engine

`v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report`

Deterministic planning/control-plane milestone after the locked `v1.4.0-alpha.3 — Provider/Source Dry-Run Execution Harness + Policy Simulator` and the locked `v1.3.0 — Stable Manual Workflow Release`. This release makes dry-run traces reviewable and reports execution readiness gaps without enabling live provider/source execution. It preserves the locked `v1.3.0-alpha.10 — Brief Publication Pack v4` manual publication-pack baseline.

## Scope

- Provider/source dry-run trace inspector.
- Provider/source execution readiness report.
- ADR-008 provider/source dry-run trace inspector.
- ADR-009 provider/source execution readiness report.
- Preserved dry-run execution harness and policy simulator from alpha.3.
- Preserved provider/source execution policy matrix and failure UX contracts from alpha.2.
- Preserved provider execution threat model and preflight gate from alpha.1.
- Preserved ADR-001 through ADR-007.

## Hard boundaries

No live scraping. No live source fetching. No provider execution expansion. No production OAuth. No backend behavior expansion. No storage expansion. No automatic source verification. No automatic signoff. No automatic export lock. No cryptographic signature claim. No publication permission claim.

## Baselines

- Current package version: `1.4.0-alpha.4`.
- Current release: `v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report`.
- Last locked dry-run baseline: `v1.4.0-alpha.3 — Provider/Source Dry-Run Execution Harness + Policy Simulator`.
- Last locked policy/failure UX baseline: `v1.4.0-alpha.2 — Provider/Source Execution Policy Matrix + Failure UX Contracts`.
- Locked preparation baseline: `v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation`.
- Last locked stable baseline: `v1.3.0 — Stable Manual Workflow Release`.
- Last locked RC baseline: `v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization`.
- Manual workflow baseline: `v1.3.0-alpha.10 — Brief Publication Pack v4`.

## Validation

```bash
node tests/provider-execution-threat-model-check.mjs
node tests/provider-execution-preflight-check.mjs
node tests/provider-source-execution-policy-matrix-check.mjs
node tests/provider-source-failure-ux-contracts-check.mjs
node tests/provider-source-dry-run-execution-harness-check.mjs
node tests/provider-source-policy-simulator-check.mjs
node tests/provider-source-dry-run-trace-inspector-check.mjs
node tests/provider-source-execution-readiness-report-check.mjs
npm run test:current:no-browser
npm run test:source
npm run test:release
npm run test:qa
npm run test:ci:no-browser
npm run test:ci:browser
```

Screenshots alone are insufficient. A ZIP archive alone is insufficient. Lock requires green no-browser CI, green browser CI, hosted evidence, and canonical lock evidence bundle.

Public version label: v1.4.0-alpha.4 Dry-Run Trace Inspector + Execution Readiness Report.

Release provenance continuity: changed-files-only discipline, provenance ledger, CI Gate Registry, and Package Script checks remain active for v1.4.0-alpha.4.

Public Demo boundary: v1.4.0-alpha.4 keeps the locked public demo/manual workflow behavior unchanged while adding deterministic dry-run trace inspection and execution readiness reporting only.
