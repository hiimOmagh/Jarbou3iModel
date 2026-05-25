# Current Release

Public Demo continuity: retained. Diagnostic Repair Queue + Export Risk Resolution continuity retained from the alpha8 repair workflow. The v1.1.0 stable public-demo baseline remains the protected reference for post-stable expansion gating.

## v1.3.0-alpha.4 — Brief Template UX Polish + Matrix Hygiene Cleanup

Public release label: v1.3.0-alpha.4 Brief Template UX Polish + Matrix Hygiene Cleanup.

Public and internal release versions are aligned. Internal stable validation metadata remains explicit for hosted evidence review.

Status: built locally, no-browser validated pending browser lock evidence.

Feature surface is frozen for this release: brief template selection and assembly variant QA only.

Scope: controlled brief assembly variant release. This release adds a local/manual Brief Template UX Polish and Matrix Hygiene Cleanup layer over the existing guided session and source-to-brief workbench. It does not add new acquisition, execution, verification, backend, OAuth, or storage behavior.

## Feature surface

- Brief Template System
- Assembly Variant QA
- Four local/manual brief variants:
  - Strategic Brief
  - Source Audit Brief
  - Contradiction Brief
  - Executive Summary
- Template recommendation based on export risks, weak claims, and contradiction pressure
- Template section plans with traceability and evidence-boundary requirements
- Assembly variant QA checklist
- Export artifacts for template system and variant QA

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

## Release manifest

- Package: `jarbou3i-research-engine`
- Version: `1.3.0-alpha.4`
- Runtime capability change: no
- Required browser gates before publishing
- Release archive exclusions
- Required cleanup commands

## CI controls retained

The workflow quarantine controls introduced in alpha8.1 remain active:

- workflow-level concurrency
- cancel-in-progress
- manual workflow_dispatch
- no-browser before browser
- bounded job timeouts
- canonical lock-evidence bundle

## Release lock requirements

Screenshots alone are insufficient for release approval. A ZIP archive alone is insufficient for release approval. Lock requires green no-browser CI, green browser CI, and reviewed hosted-demo evidence.

Lock only after:

- no-browser CI passes
- browser CI passes
- hosted evidence matrix passes 39/39
- visible text is clean in EN / AR / FR
- mojibake detected is false
- horizontal overflow is 0
- forbidden-capability flags remain false

Boundary wording: no live scraping, no production OAuth, no backend behavior expansion, no provider execution expansion, and no automatic source verification claims.

Node 24 CI compatibility is preserved.

Continuity: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization, planning gate, apply integrity, and changed-files-only discipline remain preserved.
