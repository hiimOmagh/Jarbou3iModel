# Current Release

Public Demo continuity: retained. The v1.1.0 stable public-demo baseline remains the protected reference for post-stable expansion gating.

Historical continuity note: v1.1.0 Diagnostic Repair Queue + Export Risk Resolution remains preserved in release corpus history.

## v1.3.0-alpha.8 — Signed Export Handoff Pack + Lock Ledger Review Surface

Public release label: v1.3.0-alpha.8 Signed Export Handoff Pack + Lock Ledger Review Surface.

Status: built locally. Lock is pending green no-browser CI, green browser CI, hosted-demo evidence review, and canonical lock-evidence bundle for alpha.8.

Public and internal release versions are aligned. Feature surface is frozen for runtime/provider/OAuth/backend/source/storage expansion; alpha.8 adds only reviewer-facing manual export handoff and lock-ledger review surface.

Last locked release: `v1.3.0-alpha.7 — Release Truth Sweep + Roadmap Compression`. Alpha.7 no-browser CI, browser CI, hosted-demo evidence, evidence matrix, and bundle integrity were accepted before this handoff-surface build.

Purpose: convert the locked operator-signoff/export-lock state into a reviewer-facing signed export handoff pack and lock-ledger review surface. This release adds review/export packaging surface, not live execution.

## Alpha.8 feature surface

- Signed Export Handoff Pack
- Lock Ledger Review Surface
- locked / blocked / unlocked export handoff status
- operator ID, signoff timestamp, and lock hash only when explicit operator signoff created a lock
- JSON/Markdown handoff files
- UI review panels and trilingual labels

## Preserved feature surface

- Operator Signoff State
- Export Lock Ledger
- Brief Assembly Preview Diff
- Export Review Signoff dossier
- Required operator confirmations before export lock
- Release Truth Sweep + Roadmap Compression guardrails

## Evidence boundary flags

- live_fetching_performed: false
- live_web_search_performed: false
- provider_execution_performed: false
- provider_execution_expanded: false
- production_oauth_enabled: false
- backend_behavior_expanded: false
- storage_behavior_expanded: false
- automatic_source_verification_claimed: false
- verification_claimed: false
- automatic_signoff_performed: false
- automatic_export_lock_performed: false
- cryptographic_signature_claimed: false

## Release manifest

- Package: `jarbou3i-research-engine`
- Version: `1.3.0-alpha.8`
- Runtime capability change: no
- Public surface: reviewer-facing manual export handoff surface
- Required browser gates before publishing
- Release archive exclusions
- Required cleanup commands

## CI controls retained

- workflow-level concurrency
- cancel-in-progress
- manual workflow_dispatch
- no-browser before browser
- bounded job timeouts
- canonical lock-evidence bundle

## Release lock requirements

Screenshots alone are insufficient for release approval. A ZIP archive alone is insufficient for release approval. Lock requires green no-browser CI, green browser CI, reviewed hosted-demo evidence, and canonical lock-evidence bundle.

Lock only after:

- no-browser CI passes
- browser CI passes
- hosted evidence matrix passes 39/39
- visible text is clean in EN / AR / FR
- mojibake detected is false
- horizontal overflow is 0
- forbidden-capability flags remain false

Boundary wording: no live scraping, no production OAuth, no backend behavior expansion, no provider execution expansion, no automatic source verification claims, no automatic signoff, no automatic export lock, and no cryptographic signature claim.

Node 24 CI compatibility is preserved.

Continuity: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization, planning gate, apply integrity, and changed-files-only discipline remain preserved.
