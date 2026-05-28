# Jarbou3i Research Engine

`v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence`

A dark editorial intelligence workspace that turns messy AI output into structured strategic briefs. The locked public-demo/manual workflow remains first-class. This milestone adds deterministic dry-run replay packaging and local operator approval simulation only.

## Current boundary

- Current package version: `1.4.0-alpha.6`.
- Current release: `v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence`.
- Locked stable baseline: `v1.3.0 — Stable Manual Workflow Release`.
- Locked trace/readiness baseline: `v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report`.
- No live scraping.
- No live source fetching.
- No live provider execution.
- No production OAuth.
- No backend behavior expansion.
- No storage expansion.
- No automatic source verification.
- No automatic signoff.
- No automatic export lock.
- No cryptographic signature claim.
- No publication permission claim.

## Alpha.5 additions

- `src/research/provider-source-dry-run-replay-pack.js`
- `src/research/provider-source-operator-approval-simulation.js`
- `tests/provider-source-dry-run-replay-pack-check.mjs`
- `tests/provider-source-operator-approval-simulation-check.mjs`
- `docs/adr/ADR-010-provider-source-dry-run-replay-pack.md`
- `docs/adr/ADR-011-provider-source-operator-approval-simulation.md`

The replay pack packages deterministic dry-run traces, trace inspection summaries, readiness blockers, replay items, and non-cryptographic integrity checks for local review. The approval simulation classifies replay items as simulated-approved for replay review, held for operator review, or rejected for live execution. It never grants real live-execution authorization.

## Validation

```bash
npm install
npm run test:ci:no-browser
npm run test:ci:browser
```

Targeted alpha.5 checks:

```bash
node tests/provider-source-dry-run-replay-pack-check.mjs
node tests/provider-source-operator-approval-simulation-check.mjs
```

Public version label: v1.4.0-alpha.6 Provider Execution Harness Mock-to-Live Equivalence.

Release provenance continuity: changed-files-only discipline, provenance ledger, CI Gate Registry, and Package Script checks remain active for v1.4.0-alpha.6.

Public Demo boundary: v1.4.0-alpha.6 keeps the locked public demo/manual workflow behavior unchanged while adding deterministic mock-to-live equivalence validation only.

Locked RC baseline: `v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization`.
Manual workflow baseline: `v1.3.0-alpha.10 — Brief Publication Pack v4`.

Screenshots alone are insufficient. ZIP archive alone is insufficient; local ZIP existence must be paired with green CI, reviewed hosted evidence, and canonical lock evidence.
