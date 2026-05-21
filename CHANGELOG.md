# Changelog

## v1.1.0-alpha.15 — Source Cluster + Gap Intelligence

Adds local-only source clustering and source-gap diagnostics to the reviewed evidence workflow without introducing live provider calls, live fetching, scraping, OAuth/backend expansion, source connector expansion, storage expansion, broad UI redesign, or large source refactor.

### Added

- `src/research/source-cluster-engine.js` for deterministic local source clustering.
- Duplicate and overlap detection across reviewed evidence claims.
- Source-gap warnings for weak traceability, missing dates, missing URLs, source-type concentration, social-only clusters, and missing counter-evidence.
- Cluster scoring for reliability, attention, synthesis weight, and traceability.
- Cluster cards in the analysis brief output.
- `source_clusters`, `source_cluster_report`, and `source_gap_report` in research packet/schema/fixture continuity.
- `tests/source-cluster-gap-intelligence-check.mjs` registered in source/no-browser/release gates.

### Preserved

- Evidence Workspace + Source Import V2.
- Manual/private default mode.
- Privacy/export boundary.
- Hosted evidence and visible-text guards.
- No live provider/source/OAuth/backend/storage expansion.

### CI continuity

- Node 24 CI compatibility remains preserved.

Release approval guard:

- screenshots alone are insufficient.
- ZIP existence alone is insufficient.


Continuity discipline: Root Manifest and Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, and changed-files-only discipline are preserved.

Public demo boundary: public demo readiness, hosted evidence review, and release-lock safeguards remain preserved.

Boundary: No real OAuth or production OAuth flow is enabled.
