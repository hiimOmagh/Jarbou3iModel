# Changelog

## v1.3.0-alpha.9 — Source-to-Claim Gap Closure Queue

- Adds Signed Export Handoff Pack for reviewer-facing export package state.
- Adds Lock Ledger Review Surface for lock status, blockers, warnings, operator metadata, and review cards.
- Exposes locked / blocked / unlocked handoff status in JSON, Markdown, and UI panels.
- Includes operator ID, signoff timestamp, and lock hash only when explicit operator signoff created a lock.
- Adds source-to-brief export files:
  - `source-to-brief/signed-export-handoff-pack.json`
  - `source-to-brief/signed-export-handoff-pack.md`
  - `source-to-brief/lock-ledger-review-surface.json`
  - `source-to-brief/lock-ledger-review-surface.md`
- Adds no cryptographic signature claim; the signed handoff is operator-review metadata only.
- Preserves no live scraping, no production OAuth, no backend behavior expansion, no provider execution expansion, no storage expansion, no automatic signoff, no automatic export lock, and no automatic source verification claims.

Release-lock guard: any future capability expansion requires green no-browser CI, green browser CI, reviewed hosted evidence, privacy/export gates, and explicit lane approval. Screenshots or ZIPs alone are insufficient.

Public label: `v1.3.0-alpha.9 Source-to-Claim Gap Closure Queue`. Internal evidence metadata: `1.3.0-alpha.9`.

## v1.3.0-alpha.7 — Release Truth Sweep + Roadmap Compression

- LOCKED by no-browser CI, browser CI, hosted evidence matrix, visible-text snapshots, and canonical lock evidence bundle.
- Corrected release-truth documentation after the locked v1.3.0-alpha.6 evidence bundle.
- Marked v1.3.0-alpha.6 as locked instead of pending browser evidence.
- Compressed the next roadmap into a smaller high-throughput sequence.
- Added release-truth consistency coverage.

## v1.3.0-alpha.6 — Operator Signoff State + Export Lock Ledger

- LOCKED by no-browser CI, browser CI, hosted evidence matrix, visible-text snapshots, and canonical lock evidence bundle.
- Added local/manual operator signoff state.
- Added export lock ledger.
- Preserved the correct boundary: no automatic signoff, no automatic export lock, no live provider execution, no live scraping, and no automatic source verification claim.

Continuity note: v1.1.0 stable public-demo baseline and Diagnostic Repair Queue + Export Risk Resolution remain preserved.

Node 24 CI compatibility is preserved for v1.3.0-alpha.9 and the v1.1.0 stable public-demo baseline.

Continuity: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, and changed-files-only discipline remain preserved.
