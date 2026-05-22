# Roadmap

Current milestone:

`v1.1.0-rc.2-fix.1 — Lock Evidence Workspace Hygiene Fix`

RC0 is the canonical evidence bundling and public surface freeze. Feature surface is frozen.

Next valid milestones:
- `v1.1.0-rc.2-fix.1 — Release Candidate Corrections` only if RC0 exposes a real defect.
- `v1.1.0 — Public Demo Stable` if RC0 locks cleanly.

No alpha.26 unless a structural blocker appears.

Allowed changes before stable: cleanup, docs, tests, fixtures, release packaging, hosted evidence runbook, export consistency, CI/browser parity.

Forbidden changes before stable: new major feature surface, new live connectors, live provider expansion, OAuth/backend expansion, broad UI redesign, automatic source verification claims.

Node 24 CI compatibility is preserved for 1.1.0-rc.2-fix.1.

No live scraping, no live connector expansion, no live provider execution expansion, no OAuth/backend expansion, and no automatic source verification claims.

Continuity: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, and changed-files-only discipline remain preserved.

No live scraping. No real OAuth or production OAuth is enabled. Screenshots alone, ZIP existence alone, and ZIP archive alone are insufficient for release approval.
