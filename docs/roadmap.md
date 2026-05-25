# Roadmap

Current milestone:

`v1.3.0-alpha.8 — Signed Export Handoff Pack + Lock Ledger Review Surface`

Purpose: make the alpha.6/alpha.7 manual review state useful to a reviewer before export by adding a compact handoff pack and lock-ledger review surface.

## Locked baseline

`v1.3.0-alpha.7 — Release Truth Sweep + Roadmap Compression` is locked. Do not patch alpha.7 further. It remains the release-truth and roadmap baseline for this feature increment.

## Compressed next milestones

1. `v1.3.0-alpha.8 — Signed Export Handoff Pack + Lock Ledger Review Surface`
   - reviewer-facing handoff summary
   - lock-ledger review card/panel
   - blocked / unlocked / locked handoff status
   - JSON/Markdown handoff files
   - no cryptographic signing claim

2. `v1.3.0-alpha.9 — Source-to-Claim Gap Closure Queue`
   - claims with missing evidence
   - evidence with weak claim linkage
   - unresolved contradictions
   - falsifier gaps
   - export-blocking gap queue

3. `v1.3.0-alpha.10 — Brief Publication Pack v4`
   - final brief markdown
   - evidence appendix
   - contradiction/falsifier appendix
   - source gap appendix
   - operator signoff / lock ledger appendix
   - publication-readiness summary

4. `v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation`
   - threat model
   - ADR
   - privacy boundary
   - credential leak tests
   - failure UX
   - cost/timeout controls
   - mock-to-live equivalence tests

## Priority lanes

1. `export_publication_v4` — stronger traceability, provenance, lock-ledger review, and publication packaging.
2. `source_strategy_v2` — source taxonomy, review status, source confidence, evidence-to-claim linking, and gap warnings before any live fetching.
3. `evidence_workspace_v2` — higher-throughput evidence review, contradiction handling, and publication-readiness triage.
4. `release_ops_hardening` — commit-bound evidence, artifact checksums, gate registry consistency, stale-artifact rejection, and release-truth checks.
5. `provider_execution_path` — threat model, ADR, backend/BYOK boundary, failure UX, and credential-leak proof before provider execution is exposed.
6. `ux_density_polish` — first-run clarity and reduced advanced-panel load without redesigning the product surface.

Allowed in this alpha: signed export handoff pack, lock-ledger review surface, export pack files, UI review panels, EN/AR/FR labels, tests, manifest/package/docs updates.

Forbidden in this alpha: live scraping, uncontrolled source fetching, real OAuth, provider execution expansion, backend behavior expansion, storage expansion, broad UI redesign, automatic signoff, automatic export lock, automatic source verification claims, and cryptographic signature claims.

No live scraping. No production OAuth. No backend behavior expansion. No provider execution expansion. No storage expansion. No automatic source verification claims. No automatic signoff. No automatic export lock.

Node 24 CI compatibility preserved.

Stable baseline retained: v1.1.0 remains the locked Public Demo reference for post-stable expansion gating.

Historical continuity note: v1.1.0 Diagnostic Repair Queue + Export Risk Resolution remains preserved in release corpus history.

Release discipline preserved: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization, planning gate, apply integrity, and changed-files-only handoff remain in force.
