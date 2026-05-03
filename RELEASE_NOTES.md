# v1.0.21 — Node 24 CI Compatibility + Action Runtime Migration

This patch migrates the GitHub Actions runtime path to Node 24-compatible action majors while preserving the stable manual/private product boundary.

## Added

- Node 24 CI compatibility guard.
- v1.0.21 no-browser suite wrapper.
- v1.0.21 release documentation.

## Changed

- `actions/checkout@v6`
- `actions/setup-node@v6`
- `actions/upload-artifact@v6`
- `node-version: 24`

## Preserved

- Public npm lockfile registry validation before install.
- `npm ci --no-audit --no-fund --ignore-scripts`.
- Single Playwright browser installation in workflow.
- `PLAYWRIGHT_SKIP_INSTALL=1` inside browser CI.
- Manual/private mode as default.

## Unchanged boundaries

- No live scraping.
- No real OAuth or PKCE.
- No provider expansion.
- No backend endpoint expansion.
- No storage-model expansion.

## Public Demo boundary

The Public Demo remains manual/private by default. v1.0.21 changes CI runtime compatibility only; it does not add live scraping, real OAuth, provider expansion, or backend endpoint expansion.
