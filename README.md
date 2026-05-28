# Jarbou3i Research Engine

## v1.4.0-alpha.13 — Adapter Contract Test Bench + No-Network Invocation Replay QA

Adds deterministic provider adapter fixtures, request/response envelope diffing, no-network invocation replay, adapter failure UX rehearsal, safe transcript comparison, cross-provider capability matrix, and a safe metadata-only replay ledger. It remains disabled by default and enables no real provider calls, no hidden network calls, no live source fetching, no real OAuth/token lifecycle, no credential persistence, no backend/storage expansion, no automatic source verification, no automatic signoff/export lock, and no publication permission claim. Requires hosted evidence and canonical lock evidence bundle before lock.


`v1.4.0-alpha.13 — Adapter Contract Test Bench + No-Network Invocation Replay QA`

A dark editorial intelligence workspace that turns messy AI output into structured strategic briefs. The locked public-demo/manual workflow remains first-class. This milestone adds a no-network manual provider adapter sandbox with an ephemeral invocation contract, request-envelope preview, dry invocation transcript, adapter failure taxonomy, and safe metadata-only invocation ledger.

## Current boundary

- Current package version: `1.4.0-alpha.13`.
- Current release: `v1.4.0-alpha.13 — Adapter Contract Test Bench + No-Network Invocation Replay QA`.
- Locked safety cockpit baseline: `v1.4.0-alpha.11 — Manual Execution Safety Cockpit + Session Ledger`.
- Locked manual opt-in shell baseline: `v1.4.0-alpha.10 — Limited Manual Live-Execution Prototype`.
- Locked controlled execution candidate baseline: `v1.4.0-alpha.9 — Controlled Execution Candidate Gate`.
- Locked credential boundary baseline: `v1.4.0-alpha.8 — Credential Boundary Runtime Drill`.
- Locked source acquisition baseline: `v1.4.0-alpha.7 — Source Acquisition Control Surface`.
- Locked mock-to-live baseline: `v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence`.
- Locked stable baseline: `v1.3.0 — Stable Manual Workflow Release`.
- No default live execution.
- No hidden network calls.
- No real OAuth/token lifecycle.
- No real API keys.
- No real token storage.
- No credential persistence.
- No live scraping or live source fetching.
- No automatic source fetching or hidden background fetching.
- No live provider execution.
- No backend behavior expansion.
- No storage expansion.
- No automatic source verification.
- No provider-suggested source bypass.
- No automatic signoff.
- No automatic export lock.
- No cryptographic signature claim.
- No publication permission claim.

## Alpha.12 additions

- `src/research/manual-provider-adapter-sandbox-ephemeral-invocation-contract.js`
- `tests/manual-provider-adapter-sandbox-ephemeral-invocation-contract-check.mjs`
- `docs/adr/ADR-018-manual-provider-adapter-sandbox-ephemeral-invocation-contract.md`

The adapter sandbox exposes a no-network dry invocation contract: ephemeral credential handoff without persistence, provider request-envelope preview, dry invocation transcript, adapter failure taxonomy, and safe request/response metadata ledger. It performs no provider call, source fetch, OAuth/token lifecycle, credential storage, backend/storage expansion, automatic verification, signoff, export lock, cryptographic signature, or publication permission action.

Public version label: v1.4.0-alpha.13 Adapter Contract Test Bench + No-Network Invocation Replay QA.
Internal evidence metadata must report `1.4.0-alpha.13`.
Release provenance continuity: changed-files-only discipline, provenance ledger, CI Gate Registry, Package Script checks, Playwright cache/fail-fast setup, and canonical lock-evidence bundle checks remain active for v1.4.0-alpha.13.
Public Demo boundary: v1.4.0-alpha.13 keeps the locked public demo/manual workflow behavior unchanged while adding no-network adapter contract replay QA artifacts only.

## Validation

Run:

```bash
npm run test:ci:no-browser
npm run test:ci:browser
```

Lock only after green no-browser CI, green browser CI, reviewed hosted-demo evidence, and the canonical lock evidence bundle.

Screenshots alone are insufficient. ZIP archive alone is insufficient.
