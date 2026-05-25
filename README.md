# Jarbou3i Research Engine

`v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation`

Planning/preflight milestone after the locked `v1.3.0 — Stable Manual Workflow Release`. This release prepares controlled provider/source execution by adding threat-model and preflight planning gates only. It preserves the locked `v1.3.0-alpha.10 — Brief Publication Pack v4` manual publication-pack baseline.

## Scope

- Provider execution threat model.
- Provider execution preflight gate.
- ADR-001 provider execution model.
- ADR-002 source acquisition controls.
- ADR-003 credential boundary.

## Hard boundaries

No live scraping. No live source fetching. No provider execution expansion. No production OAuth. No backend behavior expansion. No storage expansion. No automatic source verification. No automatic signoff. No automatic export lock. No cryptographic signature claim. No publication permission claim.

## Baselines

- Current package version: `1.4.0-alpha.1`.
- Current release: `v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation`.
- Last locked stable baseline: `v1.3.0 — Stable Manual Workflow Release`.
- Last locked RC baseline: `v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization`.
- Manual workflow baseline: `v1.3.0-alpha.10 — Brief Publication Pack v4`.

## Validation

```bash
node tests/provider-execution-threat-model-check.mjs
node tests/provider-execution-preflight-check.mjs
npm run test:current:no-browser
npm run test:source
npm run test:release
npm run test:qa
npm run test:ci:no-browser
npm run test:ci:browser
```

Screenshots alone are insufficient. A ZIP archive alone is insufficient. Lock requires green no-browser CI, green browser CI, hosted evidence, and canonical lock evidence bundle.

Public version label: v1.4.0-alpha.1 Controlled Provider/Source Execution Preparation.

Release provenance continuity: changed-files-only discipline, provenance ledger, CI Gate Registry, and Package Script checks remain active for v1.4.0-alpha.1.

Public Demo boundary: v1.4.0-alpha.1 keeps the locked public demo/manual workflow behavior unchanged while preparing controlled execution gates.
