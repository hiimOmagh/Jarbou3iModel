# Roadmap

Current milestone:

`v1.3.0-alpha.9 — Source-to-Claim Gap Closure Queue`

Purpose: expose unresolved claim/evidence gaps, weak linkage, contradiction gaps, counter-evidence gaps, and scenario falsifier gaps before export.

## Locked baseline

`v1.3.0-alpha.8 — Signed Export Handoff Pack + Lock Ledger Review Surface` is locked. Do not patch alpha.8 further. It remains the reviewer-facing handoff and lock-ledger baseline for this gap-closure increment.

## Compressed next milestones

1. `v1.3.0-alpha.9 — Source-to-Claim Gap Closure Queue`
   - claims with missing evidence
   - evidence with weak claim linkage
   - evidence without claim links
   - unresolved contradictions
   - counter-evidence target gaps
   - falsifier gaps
   - export-blocking gap queue

2. `v1.3.0-alpha.10 — Brief Publication Pack v4`
   - final brief markdown
   - evidence appendix
   - contradiction/falsifier appendix
   - source gap appendix
   - operator signoff / lock ledger appendix
   - publication-readiness summary

3. `v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation`
   - threat model
   - ADR
   - privacy boundary
   - credential leak tests
   - failure UX
   - cost/timeout controls
   - mock-to-live equivalence tests

## Priority lanes

1. `export_publication_v4` — stronger traceability, provenance, lock-ledger review, source-to-claim gap closure, and publication packaging.
2. `source_strategy_v2` — source taxonomy, review status, source confidence, evidence-to-claim linking, and gap warnings before any live fetching.
3. `evidence_workspace_v2` — higher-throughput evidence review, contradiction handling, falsifier tracking, and publication-readiness triage.
4. `release_ops_hardening` — commit-bound evidence, artifact checksums, gate registry consistency, stale-artifact rejection, and release-truth checks.
5. `provider_execution_path` — threat model, ADR, backend/BYOK boundary, failure UX, and credential-leak proof before provider execution is exposed.
6. `ux_density_polish` — first-run clarity and reduced advanced-panel load without redesigning the product surface.

Allowed in this alpha: source-to-claim gap closure queue, before-export blocker counts, JSON/Markdown queue files, UI review panel, EN/AR/FR labels, tests, fixture/registry updates, manifest/package/docs updates.

Forbidden in this alpha: live scraping, uncontrolled source fetching, real OAuth, provider execution expansion, backend behavior expansion, storage expansion, broad UI redesign, automatic signoff, automatic export lock, automatic source verification claims, and cryptographic signature claims.

No live scraping. No production OAuth. No backend behavior expansion. No provider execution expansion. No storage expansion. No automatic source verification claims. No automatic signoff. No automatic export lock.

Node 24 CI compatibility preserved.

Stable baseline retained: v1.1.0 remains the locked Public Demo reference for post-stable expansion gating.

Historical continuity note: v1.1.0 Diagnostic Repair Queue + Export Risk Resolution remains preserved in release corpus history.

Release discipline preserved: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization, planning gate, apply integrity, and changed-files-only handoff remain in force.
