# Release Manifest — v1.0.21

## Package identity

- Package: `jarbou3i-research-engine`
- Version: `1.0.21`
- Release name: `Node 24 CI Compatibility + Action Runtime Migration`
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
- `package-lock.json`
- `playwright.config.js`

## Compatibility boundary

v1.0.21 must not change provider behavior, OAuth behavior, backend endpoint behavior, live source connector behavior, storage model, or product capability surface. The patch updates CI action/runtime compatibility and adds static guards/docs only.

## Required no-browser gates

```bash
npm run test:lockfile:registry
npm run test:ci:workflow-install
npm run test:ci:node24
npm run test:v121:no-browser
npm run test:ci:no-browser
```

## Required browser gates before publishing

```bash
npx playwright install --with-deps
PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser
```

## v1.0.21 artifacts

- `tests/node24-ci-compat-check.mjs`
- `tests/v121-no-browser-suite.mjs`
- `docs/v1.0.21-node-24-ci-compatibility.md`
- `fixtures/migrations/v1.0.21-packet.json`
- `fixtures/privacy/browser-generated-export-v1.0.21.json`

## Retained v1.0.20 artifacts

- `tests/source-packet-template-browser-qa-check.mjs`
- `tests/source-packet-template-browser.spec.mjs`
- `tests/browser-visual-project-scope-check.mjs`
- `tests/v120-no-browser-suite.mjs`
- `docs/v1.0.20-source-packet-template-browser-qa-copy-safety.md`
- `fixtures/migrations/v1.0.20-packet.json`
- `fixtures/privacy/browser-generated-export-v1.0.20.json`

## Release archive exclusions

Generated dependency folders, test reports, browser screenshots, coverage output, OS metadata, logs, local environment files, and ZIP archives must not be shipped inside the committed release tree. See `.releaseignore`.
