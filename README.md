# Jarbou3i Research Engine

`v1.4.0-alpha.8 — Credential Boundary Runtime Drill`

A dark editorial intelligence workspace that turns messy AI output into structured strategic briefs. The locked public-demo/manual workflow remains first-class. This milestone adds deterministic credential-boundary runtime drills only.

## Current boundary

- Current package version: `1.4.0-alpha.8`.
- Current release: `v1.4.0-alpha.8 — Credential Boundary Runtime Drill`.
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

## Alpha.8 additions

- `src/research/credential-boundary-runtime-drill.js`
- `tests/credential-boundary-runtime-drill-check.mjs`
- `docs/adr/ADR-014-credential-boundary-runtime-drill.md`

The credential boundary runtime drill runs deterministic fake-secret test vectors across fake secret injection, export leak, log leak, browser-visible text leak, fixture leak, provider payload secret-boundary, and release bundle secret-boundary surfaces. It produces redaction reports and safe metadata-only outputs. It never uses or stores real credentials.

## Validation

```bash
npm install
npm run test:ci:no-browser
npm run test:ci:browser
```

Targeted alpha.8 check:

```bash
node tests/credential-boundary-runtime-drill-check.mjs
```

Public version label: v1.4.0-alpha.8 Credential Boundary Runtime Drill.

Release provenance continuity: changed-files-only discipline, provenance ledger, CI Gate Registry, and Package Script checks remain active for v1.4.0-alpha.8.

Public Demo boundary: v1.4.0-alpha.8 keeps the locked public demo/manual workflow behavior unchanged while adding deterministic credential boundary drill artifacts only.

Screenshots alone are insufficient. ZIP archive alone is insufficient; local ZIP existence must be paired with green CI, reviewed hosted evidence, and canonical lock evidence.
