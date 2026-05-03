# v1.0.23 — CI Result Review + Browser Evidence Artifact Audit

## Added

- Added CI result review and browser evidence artifact audit guard.
- Added v1.0.23 no-browser suite wrapper.
- Added v1.0.23 migration and privacy fixtures.
- Added release documentation for GitHub Actions run review, browser evidence artifact inspection, and public repository alignment.
- Expanded roadmap sequencing through `v1.0.25`, `v1.1.x`, and the controlled live retrieval phase.

### Preserved

- Node 24 CI workflow compatibility from v1.0.21/v1.0.22.
- Public npm lockfile registry guard.
- `npm ci --no-audit --no-fund --ignore-scripts` install path.
- Browser CI single Playwright installation with `PLAYWRIGHT_SKIP_INSTALL=1`.
- Manual/private mode as default.
- No live scraping, real OAuth, provider expansion, or backend endpoint expansion.

### Audit finding

- Local no-browser CI passed on the uploaded source archive.
- Public GitHub repository state observed during this patch was not aligned with the uploaded archive; visible workflow evidence still showed an older `checkout@v4/setup-node@v4/node-version: 22/npm install` shape.
- Release approval must wait for a passing GitHub Actions run on the intended release commit.

### Verification

- `npm run test:ci:result-review`
- `npm run test:v123:no-browser`
- `npm run test:ci:no-browser`
- `PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser`

## v1.0.22 — Release Evidence + Repo Hygiene Verification

### Additions

- Added release evidence and repository hygiene verification guard.
- Added v1.0.22 no-browser suite wrapper.
- Added v1.0.22 migration and privacy fixtures.
- Added release documentation for Git-tracked orphan deletion and evidence artifact discipline.

### Preserved in v1.0.22

- Node 24 CI workflow compatibility from v1.0.21.
- Public npm lockfile registry guard.
- `npm ci --no-audit --no-fund --ignore-scripts` install path.
- Browser CI single Playwright installation with `PLAYWRIGHT_SKIP_INSTALL=1`.
- Manual/private mode as default.
- No live scraping, real OAuth, provider expansion, or backend endpoint expansion.

### Verification for v1.0.22

- `npm run test:release:evidence`
- `npm run test:v122:no-browser`
- `npm run test:ci:no-browser`
- `PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser`

## Public Demo boundary

The Public Demo remains manual/private, local-first, and release-gated. Evidence upload does not equal release approval.
