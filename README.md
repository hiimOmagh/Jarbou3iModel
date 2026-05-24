# Jarbou3i Research Engine

`v1.3.0-alpha.3 — Brief Template System + Assembly Variant QA`

A dark editorial intelligence workspace that turns messy AI output into structured strategic briefs.

This alpha does not add live execution capability. It adds local/manual brief assembly variants and QA checks over the existing Guided Research Session and Source-to-Brief workflow.

Added surface:

- Strategic Brief template
- Source Audit Brief template
- Contradiction Brief template
- Executive Summary template
- Assembly Variant QA
- Template recommendation and export files

Preserved boundaries: manual/private mode remains first-class; no live scraping; no production OAuth; no backend behavior expansion; no live provider execution expansion; no storage expansion; no automatic source verification claims.

Core local validation:

```bash
npm install
npm run test:qa
npm run test:ci:no-browser
```

Browser validation before publication:

```bash
npx playwright install --with-deps
npm run test:ci:browser
```

Release-lock evidence boundary: screenshots alone are insufficient. ZIP archive alone is insufficient. Lock requires green no-browser CI, green browser CI, hosted-demo evidence, and the canonical lock bundle.

Public release label: v1.3.0-alpha.3 Brief Template System + Assembly Variant QA.

Public Demo continuity is preserved; release lock still requires hosted evidence review.

Node 24 CI compatibility is preserved.

v1.1.0 stable public-demo baseline remains protected.

Continuity: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization, planning gate, apply integrity, and changed-files-only discipline remain preserved.

Alpha.8 preserved feature surface: Diagnostic Repair Queue + Export Risk Resolution.
