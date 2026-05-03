# v1.0.24 — Repo Hygiene Execution + Stale Documentation Correction

v1.0.24 is a release-hygiene patch. It does not expand product capability. It updates the current release metadata, corrects stale current-state documentation, adds v1.0.24 fixtures, and strengthens the guard that keeps generated artifacts and local secrets out of the committed/release tree.

## Added

- v1.0.24 no-browser suite wrapper.
- v1.0.24 migration fixture.
- v1.0.24 privacy export fixture.
- Dedicated repo hygiene and stale documentation guard.
- v1.0.24 release hygiene documentation.

## Corrected

- `docs/ai-integration.md` now identifies the current state as v1.0.24 instead of v0.20.0-beta.
- `docs/architecture.md` now reflects the current research/source/export/release-hygiene pipeline.
- `docs/privacy-audit.md` now reflects the current privacy/export/repository hygiene boundary.
- `docs/v0.19.0-beta-privacy-audit-hardening.md` no longer carries the wrong v0.20 heading.
- Migration support preserves v1.0.23 as a valid source version and appends v1.0.24 as the current target.

## Preserved

- Node 24 GitHub Actions compatibility.
- Public npm lockfile registry validation before `npm ci`.
- Single workflow-level Playwright install followed by `PLAYWRIGHT_SKIP_INSTALL=1` browser CI.
- Browser evidence artifact upload as inspection material, not release approval.
- Manual/private mode as the default operating model.
- Local/manual source packet workflow without live scraping or source verification claims.

## Compatibility boundary

Manual/private mode remains default. v1.0.24 does not add live scraping, real OAuth, provider behavior expansion, backend endpoint expansion, new live source connectors, storage behavior changes, or public-demo capability expansion.

## Required validation

```bash
npm run test:repo:hygiene-execution
npm run test:v124:no-browser
npm run test:ci:no-browser
npx playwright install --with-deps
PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser
```

## Release decision

Do not approve v1.0.24 from a local ZIP alone. Completion requires a clean source tree, corrected stale current-state docs, passing no-browser/browser CI, and reviewed browser evidence artifacts for the intended release commit.
