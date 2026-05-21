# Jarbou3i Research Engine — v1.1.0-alpha.16

Entity Intelligence Layer for the public-demo workspace. This alpha adds local-only entity extraction from reviewed evidence and source clusters, manual-review entity profiles, alias/fuzzy merge logic, ignore-list continuity, entity-to-evidence linking, entity-to-cluster linking, and entity map export continuity. No live provider call, live scraping, OAuth/backend expansion, source connector expansion, storage expansion, broad UI redesign, external NER model download, or large source refactor is introduced.

## Current release

`v1.1.0-alpha.16 — Entity Intelligence Layer`

## Boundary

This release does not fetch, scrape, verify, crawl, or download external NER models. Entity Intelligence only evaluates evidence and source clusters already present in the local research workspace.

## Validation

Use:

```bash
node tests/ci-gate-runner.mjs no-browser
```

Run browser CI/hosted evidence capture before locking the public demo.


Release-lock guard: v1.1.0-alpha.16 Entity Intelligence Layer requires green no-browser CI, green browser CI, and reviewed hosted-demo evidence. Screenshots alone are insufficient. ZIP existence alone is insufficient. A local ZIP archive alone is insufficient.


Continuity discipline: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, and changed-files-only release discipline remain preserved.

Boundary note: No real OAuth or production OAuth flow is enabled in v1.1.0-alpha.16.
