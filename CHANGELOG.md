## v1.1.0-alpha.7 — Package Script Compression + CI Gate Registry

Cleanup-only repository reduction gate. Consolidates root-level release and evidence artifacts into `docs/current-release.md`, `docs/release-and-evidence.md`, and `MANIFEST.json`. No runtime/provider/OAuth/backend/source/storage behavior changes are introduced.

## Historical release history

Detailed historical release notes are consolidated in `docs/release-history.md`.

Evidence manifest continuity: v1.1.0-alpha.7 preserves the single final metadata hosted-demo evidence manifest gate.

Node 24 CI compatibility is preserved with actions/checkout@v6, actions/setup-node@v6, actions/upload-artifact@v6, npm ci --no-audit --no-fund --ignore-scripts, and PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser.
Public Demo boundaries remain preserved.
