# Roadmap

Current milestone:

`v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization`

Purpose: polish RC evidence and release notes after the locked `v1.3.0-rc.1 — Manual Workflow Release Candidate Freeze`, while preserving the `v1.3.0-alpha.10 — Brief Publication Pack v4` manual workflow baseline.

## Locked baselines

`v1.3.0-rc.1 — Manual Workflow Release Candidate Freeze` is locked. Do not patch rc.1 further.

`v1.3.0-alpha.10 — Brief Publication Pack v4` is locked. Do not patch alpha.10 further. It remains the completed manual publication-pack baseline for this RC line.

## Compressed next milestones

1. `v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization`
   - tighten evidence/release-notes wording
   - preserve manual workflow behavior
   - assert no provider/OAuth/backend/source/storage expansion
   - keep release lock evidence bundle as the only lock authority

2. `v1.3.0 — Manual Workflow Stable Release`
   - promote only if rc.2 evidence is clean
   - require no-browser CI, browser CI, hosted evidence matrix, and canonical lock bundle
   - keep manual/private mode first-class

3. `v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation`
   - threat model
   - ADR
   - privacy boundary
   - credential leak tests
   - failure UX
   - cost/timeout controls
   - mock-to-live equivalence tests

## Priority lanes

1. `release_candidate_evidence_tightening` — remove release-note ambiguity and preserve lock evidence authority.
2. `manual_workflow_stable_promotion` — promote only after clean rc evidence, not after feature expansion.
3. `export_publication_v4` — preserve traceability, provenance, lock-ledger review, source-to-claim gap closure, and publication packaging.
4. `source_strategy_v2` — source taxonomy, review status, source confidence, evidence-to-claim linking, and gap warnings before any live fetching.
5. `evidence_workspace_v2` — higher-throughput evidence review, contradiction handling, falsifier tracking, and publication-readiness triage.
6. `release_ops_hardening` — commit-bound evidence, artifact checksums, gate registry consistency, stale-artifact rejection, and release-truth checks.
7. `provider_execution_path` — threat model, ADR, backend/BYOK boundary, failure UX, and credential-leak proof before provider execution is exposed.
8. `ux_density_polish` — first-run clarity and reduced advanced-panel load without redesigning the product surface.

Allowed in this RC: version identity update, evidence/release-note guard, fixture/registry alignment, manifest/package/docs updates, and tests proving the manual workflow boundary.

Forbidden in this RC: live scraping, uncontrolled source fetching, real OAuth, provider execution expansion, backend behavior expansion, storage expansion, broad UI redesign, automatic signoff, automatic export lock, automatic source verification claims, publishing permission claims, and cryptographic signature claims.

No live scraping. No production OAuth. No backend behavior expansion. No provider execution expansion. No storage expansion. No automatic source verification claims. No automatic signoff. No automatic export lock.

Node 24 CI compatibility preserved.

Stable baseline retained: v1.1.0 remains the locked Public Demo reference for post-stable expansion gating.

Historical continuity note: v1.1.0 Diagnostic Repair Queue + Export Risk Resolution remains preserved in release corpus history.

Release discipline preserved: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization, planning gate, apply integrity, and changed-files-only handoff remain in force.
