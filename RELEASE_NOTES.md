# v1.0.23 — CI Result Review + Browser Evidence Artifact Audit

## Summary

v1.0.23 is an audit-only patch. It does not expand product capability. It adds a dedicated contract for reviewing the real GitHub Actions result, the no-browser/browser CI split, and uploaded browser evidence artifacts before release approval.

## Added

- CI result review and browser evidence artifact audit guard.
- v1.0.23 no-browser suite.
- v1.0.23 migration fixture.
- v1.0.23 privacy export fixture.
- Release documentation that distinguishes browser evidence upload from release approval.
- Roadmap detail for `v1.0.24`, `v1.0.25`, and the controlled source workflow sequence.

## CI boundary

The workflow must remain on Node 24 and continue to use:

```bash
npm ci --no-audit --no-fund --ignore-scripts
npx playwright install --with-deps
PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser
```

## Audit finding

The uploaded v1.0.22 source archive is locally consistent and passes no-browser CI, but the visible public GitHub repository state observed during this patch was not aligned with the archive. The public workflow page still exposed an older workflow using `actions/checkout@v4`, `actions/setup-node@v4`, `node-version: 22`, and `npm install`.

That mismatch means local ZIP validation alone is insufficient. The release must not be approved until the intended release commit is pushed and the exact GitHub Actions run for that commit passes both no-browser and browser jobs.

## Manual/private boundary

Manual/private mode remains default. v1.0.23 does not add live scraping, real OAuth, provider behavior expansion, backend endpoint expansion, or new live source connectors.

## Required validation

```bash
npm run test:ci:result-review
npm run test:v123:no-browser
npm run test:ci:no-browser
npx playwright install --with-deps
PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser
```

## Release decision rule

Do not claim v1.0.23 complete from local/sandbox results alone. Completion requires a reviewed GitHub Actions run for the intended release commit, with both no-browser and browser jobs passing, plus inspection of the uploaded browser evidence artifact.

## Public Demo boundary

The Public Demo remains manual/private, local-first, and release-gated. Evidence upload does not equal release approval.
