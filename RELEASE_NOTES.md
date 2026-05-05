## v1.1.0-alpha.5 — Version Suite Registry + Package Script Compression

Audit-only repository reduction gate. Adds a machine-readable fixture registry and consolidation classifier for active files, security gates, migration/privacy fixtures, historical version-suite wrappers, release docs, and generated artifacts. No files are deleted and no runtime/provider/OAuth/backend/source/storage behavior changes are introduced.

# v1.0.25 — Public Demo Release Lock

## v1.1.0-alpha.2 — Expansion Lane Acceptance Criteria Matrix

Release apply integrity gate for changed-files-only patch handoff. Artifact download success, screenshots alone, or ZIP existence alone are insufficient. Required validation: `npm run test:v126:no-browser`, `npm run test:ci:no-browser`, and `PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser`. No runtime/provider/OAuth/backend/source/storage/public-demo capability expansion.


v1.0.25 is a public-demo release-lock patch. It does not expand product capability. It makes release approval explicit: passing CI, reviewed hosted-demo evidence, public-claim alignment, privacy/export safety, and release archive hygiene must all agree before the demo is treated as publishable.

## Added

- `public_demo_release_lock` workflow metadata.
- v1.0.25 migration fixture.
- v1.0.25 privacy export fixture.
- Dedicated public-demo release-lock guard.
- v1.0.25 no-browser suite wrapper.
- v1.0.25 release-lock documentation.

## Corrected

- Current public-demo documentation now states that screenshots alone are not release approval.
- Current release docs now state that ZIP existence alone is not release approval.
- Current docs now identify v1.0.25 as the active release and v1.0.24 as historical.

## Preserved

- Node 24 GitHub Actions compatibility.
- Public npm lockfile registry validation before `npm ci`.
- Single workflow-level Playwright install followed by `PLAYWRIGHT_SKIP_INSTALL=1` browser CI.
- Browser evidence artifact upload as inspection material, not release approval.
- Manual/private mode as the default operating model.
- Local/manual source packet workflow without live scraping or source verification claims.

## Compatibility boundary

Manual/private mode remains default. v1.0.25 does not add live scraping, real OAuth, provider behavior expansion, backend endpoint expansion, new live source connectors, storage behavior changes, or public-demo capability expansion.

## Required validation

```bash
npm run test:public-demo-release-lock
npm run test:v125:no-browser
npm run test:ci:no-browser
npx playwright install --with-deps
PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser
```

## Release decision

Do not approve v1.0.25 from screenshots, a local ZIP, or a passing partial suite alone. Approval requires the intended release commit to have green no-browser CI, green browser CI, reviewed hosted-demo evidence, current metadata, public claim alignment, and a clean release archive boundary.

## v1.1.0-alpha.2 evidence-manifest hardening

The hosted-demo evidence artifact must now contain one final `hosted-demo-metadata.json` with all four required captures, viewport dimensions, screenshot dimensions, byte counts, and horizontal-overflow sanity. Partial per-test metadata overwrites are blocked by the v1.1.0-alpha.2 no-browser gate.


Evidence manifest continuity: v1.1.0-alpha.5 preserves the single final metadata hosted-demo evidence manifest gate.
