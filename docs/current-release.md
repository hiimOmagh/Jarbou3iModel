# Current Release

Public Demo continuity: retained. The v1.1.0 stable public-demo baseline remains the protected reference for post-stable expansion gating.

## v1.3.0-alpha.7 — Release Truth Sweep + Roadmap Compression

Public release label: v1.3.0-alpha.7 Release Truth Sweep + Roadmap Compression.

Public and internal release versions are aligned. Internal stable validation metadata remains explicit for hosted evidence review.

Status: built locally. Lock is pending green no-browser CI, green browser CI, hosted-demo evidence review, and canonical lock-evidence bundle for alpha.7.

Last locked release: `v1.3.0-alpha.6 — Operator Signoff State + Export Lock Ledger`. Alpha.6 no-browser CI, browser CI, hosted-demo evidence, evidence matrix, and bundle integrity were accepted before this release-truth sweep.

Purpose: correct release-truth drift and compress the next roadmap before adding more product surface. This release does not add runtime behavior.

Feature surface is frozen for this release: alpha.7 adds release-truth documentation and CI consistency only; the product surface remains the locked alpha.6 local/manual workflow.

## Alpha.7 correction surface

- Current release status reflects alpha.6 as locked, not pending evidence.
- Roadmap next milestones are compressed and sequenced for faster progress.
- Stale alpha.5/alpha.6 planning residue is removed.
- Source-refactor readiness language no longer references a specific obsolete alpha.11 milestone.
- Release-truth consistency is protected by CI.

## Preserved alpha.6 feature surface

- Operator Signoff State
- Export Lock Ledger
- Brief Assembly Preview Diff
- Export Review Signoff dossier
- Required operator confirmations before export lock
- JSON/Markdown export review artifacts
- UI panels and EN/AR/FR labels for review/export state

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

## Release manifest

- Package: `jarbou3i-research-engine`
- Version: `1.3.0-alpha.7`
- Runtime capability change: no
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

Boundary wording: no live scraping, no production OAuth, no backend behavior expansion, no provider execution expansion, no automatic source verification claims, and no automatic signoff.

Node 24 CI compatibility is preserved.

Continuity: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization, planning gate, apply integrity, and changed-files-only discipline remain preserved.

Continuity note: v1.1.0 stable public-demo baseline and Diagnostic Repair Queue + Export Risk Resolution remain preserved.
