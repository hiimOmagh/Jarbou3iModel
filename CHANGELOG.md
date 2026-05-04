## v1.0.25 — Public Demo Release Lock

## v1.0.30 — Mobile Header Geometry Lock / Final Public Demo Visual Freeze

Release apply integrity gate for changed-files-only patch handoff. Artifact download success, screenshots alone, or ZIP existence alone are insufficient. Required validation: `npm run test:v126:no-browser`, `npm run test:ci:no-browser`, and `PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser`. No runtime/provider/OAuth/backend/source/storage/public-demo capability expansion.


- Promoted current release metadata to v1.0.25.
- Added `public_demo_release_lock` workflow metadata.
- Added v1.0.25 migration and privacy export fixtures.
- Added public-demo release-lock guard and v1.0.25 no-browser wrapper.
- Made release approval explicitly depend on green CI, reviewed hosted-demo evidence, current public claims, and release archive hygiene.
- Preserved Node 24 CI, Playwright install discipline, browser evidence review, Public Demo manual/private boundaries, and manual/private runtime boundaries.

## v1.0.24 — Repo Hygiene Execution + Stale Documentation Correction

- Promoted current release metadata to v1.0.24.
- Added v1.0.24 migration and privacy export fixtures.
- Added repo hygiene/stale documentation guard and v1.0.24 no-browser wrapper.
- Corrected stale current-state documentation in AI integration, architecture, and privacy audit docs.
- Corrected the historical v0.19 privacy-audit document heading mismatch.
- Preserved Node 24 CI, Playwright install discipline, browser evidence review, Public Demo manual/private boundaries, and manual/private runtime boundaries.

## v1.0.23 — CI Result Review + Browser Evidence Artifact Audit

- Added CI result review and browser evidence artifact audit guard.
- Added v1.0.23 no-browser suite wrapper.
- Added v1.0.23 migration and privacy fixtures.
- Preserved runtime capability boundaries while verifying GitHub Actions state and browser evidence upload discipline.
