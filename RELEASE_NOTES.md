## v1.0.20 — Source Packet Template Browser QA + Copy Safety

This patch consolidates v1.0.19 follow-through work and adds browser-level QA for local/manual Source Packet Template Presets.

### Added

- Source packet template browser QA for all six presets.
- Copy/export safety checks for generated source packet JSON.
- Static guard for Playwright visual-regression project scoping.
- v1.0.20 migration and privacy fixtures.
- v1.0.20 no-browser suite wrapper.

### Fixed

- Desktop visual screenshot capture is scoped to `chromium` only.
- Mobile visual screenshot capture is scoped to `mobile-chrome` only.
- Browser CI can skip duplicate Playwright install with `PLAYWRIGHT_SKIP_INSTALL=1` after workflow-level browser installation.
- CI keeps the public npm lockfile registry guard before `npm ci`.
- Repository hygiene remains defensive against tracked orphan `XX*` files.

### Unchanged boundaries

- No live scraping.
- No real OAuth or PKCE.
- No provider expansion.
- No backend endpoint expansion.
- Manual/private mode remains default.
- Source packet templates remain drafting scaffolds, not source verification.

- Public Demo boundaries remain unchanged: manual/private mode stays default and no fake-live source behavior is exposed.
