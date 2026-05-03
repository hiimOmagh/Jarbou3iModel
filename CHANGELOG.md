## v1.0.22 — Release Evidence + Repo Hygiene Verification

### Added
- Added release evidence and repository hygiene verification guard.
- Added v1.0.22 no-browser suite wrapper.
- Added v1.0.22 migration and privacy fixtures.
- Added release documentation for Git-tracked orphan deletion and evidence artifact discipline.

### Preserved
- Node 24 CI workflow compatibility from v1.0.21.
- Public npm lockfile registry guard.
- `npm ci --no-audit --no-fund --ignore-scripts` install path.
- Browser CI single Playwright installation with `PLAYWRIGHT_SKIP_INSTALL=1`.
- Manual/private mode as default.
- No live scraping, real OAuth, provider expansion, or backend endpoint expansion.

### Verification
- `npm run test:release:evidence`
- `npm run test:v122:no-browser`
- `npm run test:ci:no-browser`
- `PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser`


## Public Demo boundary

The Public Demo remains manual/private, local-first, and release-gated. Evidence upload does not equal release approval.
