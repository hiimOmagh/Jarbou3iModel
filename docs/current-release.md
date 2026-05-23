# Current Release

## v1.2.0-alpha.1 — Post-Stable Capability Roadmap + Expansion Gate

This is the first post-stable alpha after `v1.1.0 — Public Demo Stable`.

Scope: planning and release-control only. The release adds a capability roadmap and expansion gate so future work can be selected, ranked, falsified, and evidence-gated before implementation.

Boundaries preserved: no runtime feature expansion, no UI redesign, no live connector expansion, no provider execution expansion, no production OAuth, no backend behavior expansion, no storage expansion, and no automatic source verification claims.

The stable public-demo surface remains protected. Roadmap lanes may be documented and scored, but they are not available product capabilities until a later release explicitly implements and tests them.

Release-lock requirement: screenshots alone are insufficient. A ZIP archive alone is insufficient. Any capability expansion must pass the expansion gate, privacy/export gates, release evidence review, and browser evidence review before public claim or publication.

No live scraping. No production OAuth. No backend behavior expansion. No provider execution expansion. No storage expansion. No automatic source verification claims.

## Release Manifest

Package: `jarbou3i-research-engine`
Version: `1.2.0-alpha.1`
Runtime capability change: no
Required browser gates before publishing
Release archive exclusions
Required cleanup commands

Node 24 CI compatibility preserved.

## Release-lock evidence rule

Screenshots alone are insufficient.
A ZIP archive alone is insufficient.
green no-browser CI is required before release claim.
green browser CI is required before release claim.
reviewed hosted-demo evidence is required before public-demo publication.

Planning gate note: this release is a changed-files-only post-stable planning gate with release apply integrity controls.

Feature surface freeze: the v1.1.0 public-demo capability surface remains frozen; this alpha only adds planning and expansion-gate metadata.

Public and internal release versions are aligned: v1.2.0-alpha.1 Post-Stable Capability Roadmap + Expansion Gate.
Feature surface is frozen: no new feature surface is activated by this expansion gate.
