# Current Release

## v1.1.0-fix.2 — Lockfile Dependency Version Integrity Fix

Stable corrective build for `v1.1.0-fix.2 — Public Demo Stable`. It fixes the public EN/AR/FR stable labels and release copy so the evidence matrix can validate the public demo surface while preserving internal evidence metadata as `1.1.0-fix.2`.

Public label: `v1.1.0 Public Demo Stable`
Internal build version: `1.1.0-fix.2`

Scope:
- fix stable public Arabic label/copy
- fix stable public French label/copy
- keep English stable public copy aligned
- align evidence matrix expected localized public labels
- preserve canonical lock evidence bundle and 39-row evidence matrix

Boundaries preserved: no product feature changes, no UI redesign, no live connector expansion, no provider execution expansion, no OAuth/backend expansion, and no product schema expansion.


Feature surface is frozen for this corrective stable localization patch.
A ZIP archive alone is insufficient for release approval.

Internal RC validation metadata remains represented by the internal build version `1.1.0-fix.2`; the public surface stays `v1.1.0 Public Demo Stable`.
Screenshots alone are insufficient for release approval. A ZIP archive alone is insufficient.
This patch introduces no new feature surface.

## Release Manifest

Package: `jarbou3i-research-engine`
Version: `1.1.0`
Version: `1.1.0-fix.2`
Runtime capability change: no
Required browser gates before publishing
Release archive exclusions
Required cleanup commands


Node 24 CI compatibility preserved for v1.1.0-fix.2.

Release-lock requirements: green no-browser CI, green browser CI, and reviewed hosted-demo evidence are mandatory before locking.


Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, and changed-files-only discipline remain preserved.


No live scraping. No real OAuth or production OAuth is enabled. Screenshots alone and ZIP archive alone are insufficient for release approval.
