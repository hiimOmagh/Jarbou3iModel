# Jarbou3i Research Engine

`v1.4.0-alpha.9 — Controlled Execution Candidate Gate`

A dark editorial intelligence workspace that turns messy AI output into structured strategic briefs. The locked public-demo/manual workflow remains first-class. This milestone adds a no-execution controlled execution candidate gate only.

## Current boundary

- Current package version: `1.4.0-alpha.9`.
- Current release: `v1.4.0-alpha.9 — Controlled Execution Candidate Gate`.
- Locked stable baseline: `v1.3.0 — Stable Manual Workflow Release`.
- Locked source acquisition baseline: `v1.4.0-alpha.7 — Source Acquisition Control Surface`.
- Locked mock-to-live baseline: `v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence`.
- No real OAuth.
- No real API keys.
- No real token storage.
- No live scraping.
- No live source fetching.
- No hidden background fetching.
- No live provider execution.
- No production OAuth.
- No backend behavior expansion.
- No storage expansion.
- No automatic source verification.
- No provider-suggested source bypass.
- No automatic signoff.
- No automatic export lock.
- No cryptographic signature claim.
- No publication permission claim.

## Alpha.9 additions

- `src/research/controlled-execution-candidate-gate.js`
- `tests/controlled-execution-candidate-gate-check.mjs`
- `docs/adr/ADR-015-controlled-execution-candidate-gate.md`

The controlled execution candidate gate assembles locked credential, source, policy, readiness, replay, and approval evidence into a no-execution dry candidate report. It records manual operator preconditions and failure-to-enable reasons without authorizing live execution.

## Validation

```bash
npm install
npm run test:ci:no-browser
npm run test:ci:browser
```

Targeted alpha.9 check:

```bash
node tests/controlled-execution-candidate-gate-check.mjs
```

Public version label: v1.4.0-alpha.9 Controlled Execution Candidate Gate.

Release provenance continuity: changed-files-only discipline, provenance ledger, CI Gate Registry, and Package Script checks remain active for v1.4.0-alpha.9.

Public Demo boundary: v1.4.0-alpha.9 keeps the locked public demo/manual workflow behavior unchanged while adding no-execution candidate-gate artifacts only.

Screenshots alone are insufficient. ZIP archive alone is insufficient; local ZIP existence must be paired with green CI, reviewed hosted evidence, and canonical lock evidence.
