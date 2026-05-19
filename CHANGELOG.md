## v1.1.0-alpha.12 — Dev Productivity Command Center + Golden Baseline Automation

Cleanup-only repository reduction gate. Consolidates root-level release and evidence artifacts into `docs/current-release.md`, `docs/release-and-evidence.md`, and `MANIFEST.json`. No runtime/provider/OAuth/backend/source/storage behavior changes are introduced.

Continuity: Package Script Compression, CI Gate Registry, Version Suite Registry, Root Manifest, Release Artifact Consolidation, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, and changed-files-only release discipline remain preserved.

## Historical release history

Detailed historical release notes are consolidated in `docs/release-history.md`.

Evidence manifest continuity: v1.1.0-alpha.12 preserves the single final metadata hosted-demo evidence manifest gate.

Node 24 CI compatibility is preserved with actions/checkout@v6, actions/setup-node@v6, actions/upload-artifact@v6, npm ci --no-audit --no-fund --ignore-scripts, and PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser.
Public Demo boundaries remain preserved.

Public-demo boundary continuity: No live scraping, No real OAuth, and screenshots alone or ZIP archive alone are not sufficient for approval.

Continuity note: Root Manifest and Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, changed-files-only discipline, no live scraping, No real OAuth, screenshots alone, hosted evidence, and ZIPs are not sufficient for release approval.
