# Current Release

## v1.1.0 — Public Demo Stable

Canonical lock evidence bundle and final stable handoff: resets the public-facing surface toward v1.1.0 public-demo stable language, consolidates public-demo docs, preserves internal evidence lineage, verifies stale-copy cleanup, golden workflow regression, Export Pack v3 consistency, repository hygiene, and no-browser/browser CI parity without adding product feature surface.

Public surface: `v1.1.0 Public Demo Stable`.
Internal RC validation metadata: `1.1.0`.

Release-lock guard: 1.1.0 Public Demo Stable requires green no-browser CI, green browser CI, and reviewed hosted-demo evidence. Screenshots alone are insufficient. ZIP existence alone is insufficient. A ZIP archive alone is insufficient. A local ZIP archive alone is insufficient.

Allowed changes: public-copy freeze, release docs consolidation, stale-copy sweep, repo/package hygiene, golden workflow regression lock, Export Pack v3 artifact consistency lock, hosted evidence runbook tightening, and no-browser/browser CI parity.

Forbidden changes: no new feature surface, no live connector expansion, no provider execution expansion, no OAuth/backend expansion, no broad UI redesign, and no schema expansion unless a release gate requires it.

Node 24 CI compatibility is preserved. Public Demo release evidence and hosted-demo review remain required. No real OAuth is enabled; production OAuth remains out of scope.

## Release Manifest

Package: `jarbou3i-research-engine`
Version: `1.1.0`
Runtime capability change: no
Required browser gates before publishing
Release archive exclusions
Required cleanup commands

Continuity notes: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, and changed-files-only safeguards remain preserved.

No live scraping. No real OAuth or production OAuth is enabled. Screenshots alone, ZIP existence alone, and ZIP archive alone are insufficient for release approval.
