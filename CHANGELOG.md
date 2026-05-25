# Changelog

## v1.3.0-alpha.7 — Release Truth Sweep + Roadmap Compression

- Corrects release-truth documentation after the locked v1.3.0-alpha.6 evidence bundle.
- Marks v1.3.0-alpha.6 as locked instead of pending browser evidence.
- Compresses the next roadmap into a smaller high-throughput sequence: signed export handoff, source-to-claim gap closure, and publication pack readiness.
- Removes stale milestone residue from source-refactor readiness language.
- Adds a release-truth consistency check and registers it in the CI gate registry.
- Preserves the alpha.6 operator signoff state, export lock ledger, preview diff, and export review signoff capability without adding runtime behavior.
- Adds no live scraping, no production OAuth, no backend behavior expansion, no provider execution expansion, no storage expansion, no automatic signoff, and no automatic source verification claims.

Release-lock guard: any future capability expansion requires green no-browser CI, green browser CI, reviewed hosted evidence, privacy/export gates, and explicit lane approval. Screenshots or ZIPs alone are insufficient.

Public label: `v1.3.0-alpha.7 Release Truth Sweep + Roadmap Compression`. Internal evidence metadata: `1.3.0-alpha.7`.

## v1.3.0-alpha.6 — Operator Signoff State + Export Lock Ledger

- LOCKED by no-browser CI, browser CI, hosted evidence matrix, visible-text snapshots, and canonical lock evidence bundle.
- Added local/manual operator signoff state.
- Added export lock ledger.
- Preserved the correct boundary: no automatic signoff, no automatic export lock, no live provider execution, no live scraping, and no automatic source verification claim.

## v1.2.0-alpha.1 - Post-Stable Capability Roadmap + Expansion Gate

- Historical note for v1.2.0-alpha.1: added the post-stable capability roadmap and expansion gate.
- Defined roadmap lanes, acceptance criteria, falsifiers, decision owners, blocked claims, and evidence requirements before implementation.
- Preserved manual/private default behavior and the v1.1.0 stable public-demo boundary.
- Preserved no-live, no-OAuth/backend-expansion, no-provider-expansion, no-broad-redesign boundaries.

Continuity note: v1.1.0 stable public-demo baseline and Diagnostic Repair Queue + Export Risk Resolution remain preserved.

Node 24 CI compatibility is preserved for v1.3.0-alpha.7 and the v1.1.0 stable public-demo baseline.

Continuity: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, and changed-files-only discipline remain preserved.
