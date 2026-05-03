# Release Manifest — v1.0.20

## Package identity

- Package: `jarbou3i-research-engine`
- Version: `1.0.20`
- Release name: `Source Packet Template Browser QA + Copy Safety`
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

v1.0.20 must not change provider behavior, OAuth behavior, backend endpoint behavior, live source connector behavior, storage model, or schema-breaking workflow structure. The patch adds browser QA, copy/export safety, CI install consolidation, visual-regression project scoping, release docs, fixtures, and hygiene guards.

## Required no-browser gates

```bash
npm run test:lockfile:registry
npm run test:ci:workflow-install
npm run test:browser:visual-scope
npm run test:source:packet-template-browser-qa
npm run test:v120:no-browser
npm run test:ci:no-browser
```

## Required browser gates before publishing

```bash
npx playwright install --with-deps
PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser
```

## Release archive exclusions

Generated dependency folders, test reports, browser screenshots, coverage output, OS metadata, logs, local environment files, and ZIP archives must not be shipped inside the committed release tree. See `.releaseignore`.

## v1.0.20 artifacts

- `tests/source-packet-template-browser-qa-check.mjs`
- `tests/source-packet-template-browser.spec.mjs`
- `tests/browser-visual-project-scope-check.mjs`
- `tests/v120-no-browser-suite.mjs`
- `docs/v1.0.20-source-packet-template-browser-qa-copy-safety.md`
- `fixtures/migrations/v1.0.20-packet.json`
- `fixtures/privacy/browser-generated-export-v1.0.20.json`

## Retained v1.0.19 artifacts

- `src/research/source-packet-templates.js`
- `tests/source-packet-template-presets-check.mjs`
- `tests/v119-no-browser-suite.mjs`
- `docs/v1.0.19-source-packet-template-presets.md`
- `fixtures/migrations/v1.0.19-packet.json`
- `fixtures/privacy/browser-generated-export-v1.0.19.json`

## Retained v1.0.16-v1.0.18 source packet artifacts

- `src/research/source-packet-builder.js`
- `src/research/source-packet-roundtrip.js`
- `tests/source-packet-builder-check.mjs`
- `tests/source-packet-builder-browser-qa-check.mjs`
- `tests/source-packet-roundtrip-check.mjs`
- `docs/v1.0.16-source-packet-builder-ui-scoring-review-controls.md`
- `docs/v1.0.17-source-packet-builder-browser-qa-ux-tightening.md`
- `docs/v1.0.18-source-packet-builder-export-roundtrip-qa.md`
