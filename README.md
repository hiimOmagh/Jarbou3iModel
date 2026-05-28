# Jarbou3i Research Engine

`v1.4.0-alpha.11 — Manual Execution Safety Cockpit + Session Ledger`

A dark editorial intelligence workspace that turns messy AI output into structured strategic briefs. The locked public-demo/manual workflow remains first-class. This milestone consolidates the alpha.6–alpha.10 safety layers into a disabled-by-default manual execution safety cockpit and safe session ledger.

## Current boundary

- Current package version: `1.4.0-alpha.11`.
- Current release: `v1.4.0-alpha.11 — Manual Execution Safety Cockpit + Session Ledger`.
- Locked manual opt-in shell baseline: `v1.4.0-alpha.10 — Limited Manual Live-Execution Prototype`.
- Locked controlled execution candidate baseline: `v1.4.0-alpha.9 — Controlled Execution Candidate Gate`.
- Locked credential boundary baseline: `v1.4.0-alpha.8 — Credential Boundary Runtime Drill`.
- Locked source acquisition baseline: `v1.4.0-alpha.7 — Source Acquisition Control Surface`.
- Locked mock-to-live baseline: `v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence`.
- Locked stable baseline: `v1.3.0 — Stable Manual Workflow Release`.
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

## Alpha.11 additions

- `src/research/manual-execution-safety-cockpit-session-ledger.js`
- `tests/manual-execution-safety-cockpit-session-ledger-check.mjs`
- `docs/adr/ADR-017-manual-execution-safety-cockpit-session-ledger.md`

The safety cockpit exposes a simulation-only state machine, operator start/abort/timeout drill, kill-switch status, budget/timeout/request guardrails, safe metadata-only session ledger, cross-layer continuity summaries, and no-execution fallback reporting. It does not execute provider calls, fetch sources, run background tasks, store credentials, manage OAuth/token lifecycle, or claim automatic verification/signoff/export/publication permission.

Public version label: v1.4.0-alpha.11 Manual Execution Safety Cockpit + Session Ledger.
Internal evidence metadata must report `1.4.0-alpha.11`.
Release provenance continuity: changed-files-only discipline, provenance ledger, CI Gate Registry, and Package Script checks remain active for v1.4.0-alpha.11.
Public Demo boundary: v1.4.0-alpha.11 keeps the locked public demo/manual workflow behavior unchanged while adding manual execution safety cockpit artifacts only.

## Validation

Run:

```bash
npm run test:ci:no-browser
npm run test:ci:browser
```

Lock only after green no-browser CI, green browser CI, reviewed hosted-demo evidence, and the canonical lock evidence bundle.

Screenshots alone are insufficient. ZIP archive alone is insufficient.
