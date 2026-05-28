# Public Demo — v1.4.0-alpha.13 Adapter Contract Test Bench + No-Network Invocation Replay QA

## v1.4.0-alpha.13 — Adapter Contract Test Bench + No-Network Invocation Replay QA

Adds deterministic provider adapter fixtures, request/response envelope diffing, no-network invocation replay, adapter failure UX rehearsal, safe transcript comparison, cross-provider capability matrix, and a safe metadata-only replay ledger. It remains disabled by default and enables no real provider calls, no hidden network calls, no live source fetching, no real OAuth/token lifecycle, no credential persistence, no backend/storage expansion, no automatic source verification, no automatic signoff/export lock, and no publication permission claim. Requires hosted evidence and canonical lock evidence bundle before lock.


The public demo remains a static/manual workflow surface. v1.4.0-alpha.13 adds an adapter contract test bench with deterministic fixtures, envelope diffing, no-network invocation replay, adapter failure UX rehearsal, safe transcript comparison, and safe metadata-only replay ledger.

Public release label: v1.4.0-alpha.13 Adapter Contract Test Bench + No-Network Invocation Replay QA.
Hosted demo metadata and hosted evidence must report v1.4.0-alpha.13 before lock.

## Demo boundary

- No default live execution.
- No hidden network calls.
- No real OAuth/token lifecycle.
- No credential persistence.
- No live provider calls.
- No live source fetching.
- No backend/storage expansion.
- No automatic source verification, signoff, export lock, cryptographic signature, or publication permission claim.

## Required evidence

- no-browser CI log.
- Playwright install-deps log.
- Playwright install log.
- browser CI log.
- hosted-demo-evidence.
- canonical lock-evidence bundle.

Screenshots alone and ZIP existence alone are insufficient.

Boundary repetition for release-truth checks: no live scraping; no production OAuth; no real API keys; no automatic source verification; no cryptographic signature claim.

Baseline repetition for release-truth checks: v1.3.0 — Stable Manual Workflow Release; v1.4.0-alpha.7 — Source Acquisition Control Surface; v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence.

Stable baseline repetition: v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization; v1.3.0-alpha.10 — Brief Publication Pack v4. No backend behavior expansion. No provider execution expansion.

Screenshots alone are insufficient. A ZIP archive alone is insufficient.
Provenance continuity: Package Script Compression, CI Gate Registry, Root Manifest, Release Artifact Consolidation, Fixture Registry payload compression, test organization audit, provenance ledger, and changed-files-only discipline remain active.
