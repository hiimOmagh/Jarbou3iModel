# Current Release

## v1.1.0-alpha.24 — Golden Workflow Corpus + End-to-End Demo Run

Status: candidate package pending CI/browser evidence lock.

Release-lock guard: 1.1.0-alpha.24 Golden Workflow Corpus + End-to-End Demo Run requires green no-browser CI, green browser CI, and reviewed hosted-demo evidence. Screenshots alone are insufficient. ZIP existence alone is insufficient. A ZIP archive alone is insufficient. A local ZIP archive alone is insufficient.

Version: `1.1.0-alpha.24`

Scope:
- observation / inference / estimate claim classification
- claim-boundary audit before export
- unsupported conclusion detection
- contradiction/falsifier completeness check
- publication-readiness blocker reasons
- export-safe final review report
- visible traceability warnings in quality/export

Boundaries preserved: no live scraping, no live provider execution expansion, no OAuth/backend expansion, no new connector sprawl, no automatic source verification claims, and no broad UI redesign.

## Release Manifest

Package: `jarbou3i-research-engine`
Version: `1.1.0-alpha.24`
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

Node 24 CI compatibility is preserved for v1.1.0-alpha.24.

Continuity notes: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, and changed-files-only release discipline remain preserved.

Public Demo release evidence and hosted-demo review remain required.
No real OAuth is enabled; production OAuth remains out of scope.
