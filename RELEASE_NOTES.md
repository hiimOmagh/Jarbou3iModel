# Release Notes — v1.0.11

## v1.0.11 — Repository Hygiene + Stale Artifact Cleanup

This patch tightens repo hygiene and stale-artifact protection after the v1.0.11 module-type warning fix. It does not add runtime features and does not enable new provider, OAuth, backend, source connector, or storage behavior.

## What changed

- Added `tests/repository-hygiene-cleanup-check.mjs`.
- Added `tests/v111-no-browser-suite.mjs`.
- Added `docs/v1.0.11-repository-hygiene-stale-artifact-cleanup.md`.
- Added v1.0.11 migration and privacy snapshots.
- Added the missing `fixtures/migrations/v1.0.4-packet.json` coverage fixture.
- Updated repo hygiene and release packaging checks to include v1.0.11.
- Kept the v1.0.11 module-type warning fix active.

## Validation

```bash
npm run test:ci:no-browser
npm run test:v111:no-browser
npm run test:repo:cleanup
npm run test:repo:hygiene
```

Browser validation remains required before updating a hosted demo:

```bash
npm run test:ci:browser
```

## Runtime boundary

Runtime capability change: no. Public Demo behavior and manual/private defaults remain unchanged.
