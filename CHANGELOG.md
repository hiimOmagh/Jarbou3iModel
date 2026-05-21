# Changelog

## v1.1.0-alpha.16 — Entity Intelligence Layer

- Added local-only entity intelligence over accepted evidence and source clusters.
- Added entity profiles with categories, aliases, evidence IDs, cluster IDs, review flags, and strategic relevance scores.
- Added alias/fuzzy merge logic and ignore-list continuity without external NER model download.
- Added entity map and alias reports for research packet/export continuity.
- Preserved Source Cluster + Gap Intelligence and Evidence Workspace + Source Import V2.
- Preserved manual/private default mode, hosted evidence guards, privacy/export boundary, and no-live-provider/source/OAuth/backend/storage boundary.

## v1.1.0-alpha.15 — Source Cluster + Gap Intelligence

- Added local-only source clustering and source-gap diagnostics to the reviewed evidence workflow.
- Added duplicate and overlap detection, source-gap warnings, cluster quality scoring, cluster cards, and cluster exports.
- Preserved Evidence Workspace + Source Import V2 and no-live-provider/source/OAuth/backend/storage boundary.

## v1.1.0-alpha.14 — Evidence Workspace + Source Import V2

- Added reviewed evidence/source candidate workflow and Source Import V2.
- Preserved manual/private mode and hosted evidence guards.

Release approval guard:

- screenshots alone are insufficient.
- ZIP existence alone is insufficient.

Continuity discipline: Root Manifest and Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, and changed-files-only discipline are preserved.

Public demo boundary: public demo readiness, hosted evidence review, and release-lock safeguards remain preserved.

Boundary: No real OAuth or production OAuth flow is enabled.


Node 24 CI compatibility remains preserved for this release.


Release-lock guard: v1.1.0-alpha.16 Entity Intelligence Layer requires green no-browser CI, green browser CI, and reviewed hosted-demo evidence. Screenshots alone are insufficient. ZIP existence alone is insufficient. A local ZIP archive alone is insufficient.
