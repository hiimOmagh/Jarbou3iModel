# Jarbou3i Research Engine

`v1.4.0-alpha.10 — Limited Manual Live-Execution Prototype`

A dark editorial intelligence workspace that turns messy AI output into structured strategic briefs. The locked public-demo/manual workflow remains first-class. This milestone adds a disabled-by-default manual opt-in live-execution prototype shell only.

## Current boundary

- Current package version: `1.4.0-alpha.10`.
- Current release: `v1.4.0-alpha.10 — Limited Manual Live-Execution Prototype`.
- Locked stable baseline: `v1.3.0 — Stable Manual Workflow Release`.
- Locked controlled execution candidate baseline: `v1.4.0-alpha.9 — Controlled Execution Candidate Gate`.
- Locked credential boundary baseline: `v1.4.0-alpha.8 — Credential Boundary Runtime Drill`.
- Locked source acquisition baseline: `v1.4.0-alpha.7 — Source Acquisition Control Surface`.
- Locked mock-to-live baseline: `v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence`.
- No default live execution.
- No hidden network calls.
- No real OAuth.
- No real API keys.
- No real token storage.
- No credential persistence.
- No live scraping.
- No live source fetching.
- No automatic source fetching.
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

## Alpha.10 additions

- `src/research/limited-manual-live-execution-prototype.js`
- `tests/limited-manual-live-execution-prototype-check.mjs`
- `docs/adr/ADR-016-limited-manual-live-execution-prototype.md`

The limited manual live-execution prototype exposes a disabled-by-default manual opt-in shell. It records explicit operator preconditions, safe metadata-only status, and hard failure reasons when prerequisites are missing. It does not execute provider calls, fetch sources, run background tasks, store credentials, manage OAuth/token lifecycle, or claim automatic verification/signoff/export/publication permission.

Public version label: v1.4.0-alpha.10 Limited Manual Live-Execution Prototype.
Internal evidence metadata must report `1.4.0-alpha.10`.
Release provenance continuity: changed-files-only discipline, provenance ledger, CI Gate Registry, and Package Script checks remain active for v1.4.0-alpha.10.
Public Demo boundary: v1.4.0-alpha.10 keeps the locked public demo/manual workflow behavior unchanged while adding manual opt-in shell artifacts only.

## Validation

Run:

```bash
npm run test:ci:no-browser
npm run test:ci:browser
```

Lock only after green no-browser CI, green browser CI, reviewed hosted-demo evidence, and the canonical lock evidence bundle.

Screenshots alone are insufficient. ZIP archive alone is insufficient.
