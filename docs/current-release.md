# Current Release

## v1.1.0-alpha.5 — Repository-Wide Structural Cleanup + Version/Documentation Registry Consolidation

This release consolidates historical version-suite wrappers and fragmented release documentation into registry-backed files while preserving regression coverage.

Current status:

- Runtime capability change: false
- Provider behavior change: false
- OAuth behavior change: false
- Backend/source/storage behavior change: false
- Public-demo honesty boundary: preserved
- Migration/privacy fixture registries: preserved from v1.1.0-alpha.4
- Version-suite wrappers: consolidated into `tests/version-suite-registry.json` and `tests/version-suite-registry-check.mjs`
- Historical release docs: consolidated into `docs/release-history.md`

No live scraping, no real OAuth, no live provider execution, no backend endpoint expansion, no source connector expansion, no automated source verification, and no storage expansion are introduced.

