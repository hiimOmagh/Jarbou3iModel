# Release Manifest — v1.0.17

## Package identity

- Package: `jarbou3i-research-engine`
- Version: `1.0.17`
- Release name: `Source Packet Builder Browser QA + UX Tightening`
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
- `playwright.config.js`

## Compatibility boundary

v1.0.17 must not change provider behavior, OAuth behavior, backend endpoint behavior, live source connector behavior, storage model, or schema-breaking workflow structure. The patch is allowed to add browser QA, layout guardrails, source packet builder copy/preview tightening, release docs, fixtures, and QA wrappers.

## Required no-browser gates

```bash
npm run test:source:packet-builder:browser-qa
npm run test:source:packet-builder
npm run test:v117:no-browser
npm run test:ci:no-browser
```

## Required browser gates before publishing

```bash
npm run test:browser:source-packet-builder
npm run test:ci:browser
```

## Release archive exclusions

Generated dependency folders, test reports, browser screenshots, coverage output, OS metadata, logs, local environment files, and ZIP archives must not be shipped inside the committed release tree. See `.releaseignore`.

## v1.0.17 source packet builder browser QA artifacts

- `tests/source-packet-builder-browser-qa-check.mjs`
- `tests/source-packet-builder-browser.spec.mjs`
- `tests/v117-no-browser-suite.mjs`
- `docs/v1.0.17-source-packet-builder-browser-qa-ux-tightening.md`
- `fixtures/migrations/v1.0.17-packet.json`
- `fixtures/privacy/browser-generated-export-v1.0.17.json`

## Retained v1.0.16 artifacts

- `src/research/source-packet-builder.js`
- `tests/source-packet-builder-check.mjs`
- `tests/v116-no-browser-suite.mjs`
- `docs/v1.0.16-source-packet-builder-ui-scoring-review-controls.md`
- `fixtures/migrations/v1.0.16-packet.json`
- `fixtures/privacy/browser-generated-export-v1.0.16.json`
