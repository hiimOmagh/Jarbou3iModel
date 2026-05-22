# Current Release

## v1.1.0-rc.0 — Public Demo Release Candidate

Status: release candidate package pending GitHub CI/browser evidence lock.

Purpose: final public-demo release candidate. This milestone freezes feature surface and verifies final versioning, public-demo release docs, stable handoff package, final stale-copy sweep, final repo/package hygiene verification, hosted-demo evidence runbook, golden workflow regression lock, Export Pack v3 artifact consistency lock, and no-browser/browser CI parity.

Release-lock guard: 1.1.0-rc.0 Public Demo Release Candidate requires green no-browser CI, green browser CI, and reviewed hosted-demo evidence. Screenshots alone are insufficient. ZIP existence alone is insufficient. A ZIP archive alone is insufficient. A local ZIP archive alone is insufficient.

Allowed scope:
- final release-candidate versioning
- public-demo release docs
- stable handoff package
- final hosted-demo evidence runbook
- final stale-copy sweep
- final repo/package hygiene verification
- no-browser/browser CI parity lock
- release notes and public positioning polish

Forbidden scope:
- no new major feature surface
- no live connector expansion
- no provider execution expansion
- no OAuth/backend expansion
- no broad UI redesign
- no schema expansion unless a release gate requires it

Public Demo release evidence and hosted-demo review remain required. No real OAuth is enabled; production OAuth remains out of scope. No live scraping. No automatic source verification claims.

Node 24 CI compatibility is preserved for 1.1.0-rc.0.

Continuity notes: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, provenance ledger, changed-files-only discipline, visual freeze, mobile header guards, and release evidence continuity remain preserved.

## Release Manifest

Package: `jarbou3i-research-engine`
Version: `1.1.0-rc.0`
Runtime capability change: no

Required browser gates before publishing:
- GitHub no-browser CI must pass.
- GitHub browser CI must pass.
- Hosted demo evidence must be reviewed.

Release archive exclusions:
- `node_modules/`
- `playwright-report/`
- `test-results/`
- `*.zip`
- `backend/.dev.vars`

Required cleanup commands:
- Use repository hygiene checks before release handoff.
- Do not ship generated logs or local evidence archives.
