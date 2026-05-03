# v1.0.22 — Release Evidence + Repo Hygiene Verification

## Summary

v1.0.22 is a verification-only patch. It does not expand product capability. It consolidates release evidence discipline after the Node 24 migration by making repository hygiene, browser evidence artifacts, and Git-tracked orphan deletion requirements explicit and testable.

## Added

- Release evidence and repository hygiene verification check.
- v1.0.22 no-browser suite.
- v1.0.22 migration fixture.
- v1.0.22 privacy export fixture.
- Documentation for distinguishing evidence upload from release approval.

## CI boundary

The workflow remains on Node 24 and continues to use:

```bash
npm ci --no-audit --no-fund --ignore-scripts
npx playwright install --with-deps
PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser
```

## Manual/private boundary

Manual/private mode remains default. v1.0.22 does not add live scraping, real OAuth, provider behavior expansion, backend endpoint expansion, or new live source connectors.

## Required validation

```bash
npm run test:release:evidence
npm run test:v122:no-browser
npm run test:ci:no-browser
npx playwright install --with-deps
PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser
```

## Release decision rule

Do not claim v1.0.22 complete until both no-browser and browser CI pass in GitHub Actions and stale orphan files are committed as deleted if Git still tracks them.

## Public Demo boundary

The Public Demo remains manual/private, local-first, and release-gated. Evidence upload does not equal release approval.
