# Current Release

## v1.1.0-alpha.16 — Entity Intelligence Layer

Status: candidate package.
Version: `1.1.0-alpha.16`

Scope:
- local entity extraction from reviewed evidence/source candidates
- entity profiles with category, aliases, evidence links, and cluster links
- alias/fuzzy merge and ignore-list continuity
- entity map and alias reports in research packet/export flow
- Source Cluster + Gap Intelligence preserved

Boundaries:
- no uncontrolled scraping
- no live provider calls
- no OAuth/backend expansion
- no source connector expansion
- no external NER model download
- no storage expansion
- no broad UI redesign

## Release manifest summary

- Package: `jarbou3i-research-engine`
- Version: `1.1.0-alpha.16`
- Runtime capability change: no
- Required browser gates before publishing: no-browser CI, browser CI, hosted-demo evidence capture, visible-text snapshots, and metadata review.
- Release archive exclusions: node_modules/, playwright-report/, test-results/, generated ZIPs, backend/.dev.vars.
- Required cleanup commands: verify release tree hygiene, remove generated artifacts, and run CI gate registry checks before packaging.


Node 24 CI compatibility remains preserved for this release.

## Release-lock requirements

- Screenshots alone are insufficient.
- A ZIP archive alone is insufficient.
- Required: green no-browser CI.
- Required: green browser CI.
- Required: reviewed hosted-demo evidence.


Release-lock guard: v1.1.0-alpha.16 Entity Intelligence Layer requires green no-browser CI, green browser CI, and reviewed hosted-demo evidence. Screenshots alone are insufficient. ZIP existence alone is insufficient. A local ZIP archive alone is insufficient.


Continuity discipline: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, and changed-files-only release discipline remain preserved.


Public Demo boundary remains preserved: manual/private mode, no live scraping, no production OAuth, and hosted evidence review required.
