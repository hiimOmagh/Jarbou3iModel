# Release Manifest — v1.0.16

## Package identity

- Package: `jarbou3i-research-engine`
- Version: `1.0.16`
- Release name: `Source Packet Builder UI + Scoring Review Controls`
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

v1.0.16 must not change provider behavior, OAuth behavior, backend endpoint behavior, live source connector behavior, browser runtime behavior, storage model, or schema-breaking workflow structure. The patch is allowed to add local/manual source packet builder UI, scoring review controls, schema/fixture coverage, release docs, and QA wrappers.

## Required no-browser gates

```bash
npm run test:source:packet-builder
npm run test:evidence:calibration
npm run test:v116:no-browser
npm run test:ci:no-browser
```

## Required browser gates before publishing

```bash
npm run test:ci:browser
```

## Release archive exclusions

Generated dependency folders, test reports, browser screenshots, coverage output, OS metadata, logs, and local environment files must not be shipped in release archives. See `.releaseignore`.

## v1.0.16 source packet builder artifacts

- `src/research/source-packet-builder.js`
- `tests/source-packet-builder-check.mjs`
- `tests/v116-no-browser-suite.mjs`
- `docs/v1.0.16-source-packet-builder-ui-scoring-review-controls.md`
- `fixtures/migrations/v1.0.16-packet.json`
- `fixtures/privacy/browser-generated-export-v1.0.16.json`
