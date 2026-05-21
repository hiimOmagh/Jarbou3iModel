# Jarbou3i Research Engine — v1.1.0-alpha.15

Source Cluster + Gap Intelligence for the public-demo workspace. This alpha adds local-only source clustering, duplicate/overlap detection, source gap warnings, cluster quality scoring, and cluster cards inside the existing evidence-to-analysis workflow. No live provider call, live scraping, OAuth/backend expansion, source connector expansion, storage expansion, broad UI redesign, or large source refactor is introduced.

## Release focus

- Adds `src/research/source-cluster-engine.js` for local source-cluster and source-gap intelligence.
- Enhances the analysis brief with cluster cards, reliability/attention/traceability scoring, duplicate signals, and source-gap actions.
- Exports `source_clusters`, `source_cluster_report`, and `source_gap_report` through the research packet, schema, fixtures, and export continuity path.
- Preserves Evidence Workspace + Source Import V2, manual/private defaults, privacy/export boundaries, hosted evidence guards, visible-text guards, provider dry-run discipline, and CI gate registry discipline.

## Boundary

This release does not fetch, scrape, verify, or crawl external sources. Source Cluster + Gap Intelligence only evaluates source/evidence objects already present in the local research workspace.

## Validation

Run from repo root:

```bash
node tests/ci-gate-runner.mjs current-no-browser
node tests/ci-gate-runner.mjs source
node tests/ci-gate-runner.mjs release
node tests/source-cluster-gap-intelligence-check.mjs
```

For lock, GitHub no-browser CI, GitHub browser CI, and hosted-demo evidence must all be reviewed for the intended release commit.

Release approval guard:

- screenshots alone are insufficient.
- ZIP existence alone is insufficient.


Continuity discipline: Root Manifest and Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, and changed-files-only discipline are preserved.

Boundary: No real OAuth or production OAuth flow is enabled.
