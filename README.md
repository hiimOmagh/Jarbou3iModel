# Jarbou3i Research Engine

`v1.4.0-alpha.7 — Source Acquisition Control Surface`

A dark editorial intelligence workspace that turns messy AI output into structured strategic briefs. The locked public-demo/manual workflow remains first-class. This milestone adds deterministic source acquisition mode control only.

## Current boundary

- Current package version: `1.4.0-alpha.7`.
- Current release: `v1.4.0-alpha.7 — Source Acquisition Control Surface`.
- Locked stable baseline: `v1.3.0 — Stable Manual Workflow Release`.
- Locked mock-to-live baseline: `v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence`.
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

## Alpha.7 additions

- `src/research/source-acquisition-control-surface.js`
- `tests/source-acquisition-control-surface-check.mjs`
- `docs/adr/ADR-013-source-acquisition-control-surface.md`

The source acquisition control surface classifies source candidates as `manual_source`, `imported_evidence`, `fixture_source`, `provider_proposed_source`, `blocked_source`, or `future_controlled_fetch`. It adds permission/provenance/risk labels, review queue routing, source-to-claim linkage preservation, and source-gap warnings. It never fetches, scrapes, verifies, auto-accepts, or authorizes provider-suggested sources.

## Validation

```bash
npm install
npm run test:ci:no-browser
npm run test:ci:browser
```

Targeted alpha.7 check:

```bash
node tests/source-acquisition-control-surface-check.mjs
```

Public version label: v1.4.0-alpha.7 Source Acquisition Control Surface.

Release provenance continuity: changed-files-only discipline, provenance ledger, CI Gate Registry, and Package Script checks remain active for v1.4.0-alpha.7.

Public Demo boundary: v1.4.0-alpha.7 keeps the locked public demo/manual workflow behavior unchanged while adding deterministic source acquisition control only.

Screenshots alone are insufficient. ZIP archive alone is insufficient; local ZIP existence must be paired with green CI, reviewed hosted evidence, and canonical lock evidence.
