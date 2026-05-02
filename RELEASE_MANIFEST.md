# Release Manifest — v1.0.11

## Package identity

- Package: `jarbou3i-research-engine`
- Version: `1.0.12`
- Release name: `Research Source Strategy Blueprint`
- Release type: patch
- Runtime capability change: no

## Entry points

- Static app: `index.html`
- Main UI script: `src/app.js`
- Research runtime: `src/research-engine.js`
- Workflow schema: `schema/research-workflow.schema.json`
- Strategic output schema: `schema/strategic-analysis.schema.json`
- Optional backend worker: `backend/cloudflare-worker.js`

## Required package directories

- `.github/`
- `assets/`
- `backend/`
- `docs/`
- `fixtures/`
- `schema/`
- `scripts/`
- `src/`
- `tests/`

## Required root files

- `.nojekyll`
- `.gitignore`
- `.releaseignore`
- `BROWSER_EVIDENCE.md`
- `CHANGELOG.md`
- `CONTRIBUTING.md`
- `HOSTED_DEMO_VERIFICATION.md`
- `LICENSE`
- `PUBLIC_DEMO.md`
- `README.md`
- `RELEASE_MANIFEST.md`
- `RELEASE_NOTES.md`
- `SECURITY.md`
- `index.html`
- `manifest.webmanifest`
- `package.json`
- `playwright.config.js`
- `wrangler.toml`

## Compatibility boundary

v1.0.11 must not change provider behavior, OAuth behavior, backend endpoint behavior, source connector behavior, browser runtime behavior, storage model, or schema-breaking workflow structure. The patch is allowed to change package metadata, release hygiene checks, migration/privacy snapshots, release docs, and QA wrappers.

## Required no-browser gates

```bash
npm run test:qa
npm run test:privacy
npm run test:provider
npm run test:source
npm run test:backend
npm run test:export-pack
npm run test:quality
npm run test:migrations
npm run test:release-packaging
npm run test:repo:hygiene
npm run test:repo:cleanup
npm run test:public-demo
npm run test:hosted-demo
npm run test:hosted-demo:evidence-review
npm run test:module-type-warning
npm run test:v111:no-browser
```

## Required browser gates before publishing

```bash
npm run test:browser:provider
npm run test:browser:layout
npm run test:browser:visual
npm run test:browser:evidence
npm run test:e2e
npm run test:rtl
./node_modules/.bin/playwright test tests/a11y.spec.js
```

## Hosted URL evidence command

```bash
HOSTED_DEMO_URL="https://example.github.io/jarbou3i-research-engine" npm run test:browser:evidence
```

## Release archive exclusions

Generated dependency folders, test reports, browser screenshots, coverage output, OS metadata, logs, and local environment files must not be shipped in release archives. See `.releaseignore`.

## Repository hygiene gate

```bash
npm run test:repo:hygiene
```

The gate rejects stale duplicate release docs, orphan temporary files, generated dependency/build/test artifacts, root ZIP archives, and local secret/config files.

## Hosted demo verification files

- `HOSTED_DEMO_VERIFICATION.md`
- `BROWSER_EVIDENCE.md`
- `docs/v1.0.8-hosted-demo-deployment-browser-evidence.md`
- `docs/v1.0.9-hosted-demo-smoke-fixes-evidence-review.md`
- `docs/v1.0.10-hosted-url-ci-artifact-review-module-type-warning-fix.md`
- `docs/v1.0.11-repository-hygiene-stale-artifact-cleanup.md`
- `tests/hosted-demo-deployment-check.mjs`
- `tests/hosted-demo-evidence-review-check.mjs`
- `tests/hosted-demo-browser-evidence.spec.mjs`

Runtime capability change: no.


## v1.0.12 source strategy artifacts

- `src/research/source-capability-registry.js`
- `tests/source-capability-registry-check.mjs`
- `tests/v112-no-browser-suite.mjs`
- `docs/v1.0.12-research-source-strategy-blueprint.md`

Runtime capability change: no
