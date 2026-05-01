# Release Manifest — v1.0.8

## Package identity

- Package: `jarbou3i-research-engine`
- Version: `1.0.8`
- Release name: `Hosted Demo Deployment Verification + Browser Evidence Capture`
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
- `CHANGELOG.md`
- `CONTRIBUTING.md`
- `LICENSE`
- `README.md`
- `RELEASE_MANIFEST.md`
- `SECURITY.md`
- `index.html`
- `manifest.webmanifest`
- `package.json`
- `playwright.config.js`
- `wrangler.toml`

## Compatibility boundary

v1.0.8 must not change provider behavior, OAuth behavior, backend endpoint behavior, source connector behavior, storage model, or schema-breaking workflow structure. The patch is allowed to change public-demo copy, release notes, export-safe demo metadata, QA wrappers, version snapshots, and documentation.

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
npm run test:public-demo
npm run test:v107:no-browser
```

## Required browser gates before publishing

```bash
npm run test:browser:provider
npm run test:browser:layout
npm run test:browser:visual
npm run test:browser
```

## Release archive exclusions

Generated dependency folders, test reports, browser screenshots, coverage output, OS metadata, logs, and local environment files must not be shipped in release archives. See `.releaseignore`.


## Repository hygiene gate

Run before publishing or merging release cleanup patches:

```bash
npm run test:repo:hygiene
```

The gate rejects stale duplicate release docs, orphan temporary files, generated dependency/build/test artifacts, root ZIP archives, and local secret/config files.


## Hosted demo verification files

- `HOSTED_DEMO_VERIFICATION.md`
- `BROWSER_EVIDENCE.md`
- `docs/v1.0.8-hosted-demo-deployment-browser-evidence.md`
- `tests/hosted-demo-deployment-check.mjs`
- `tests/hosted-demo-browser-evidence.spec.mjs`

Runtime capability change: no.
