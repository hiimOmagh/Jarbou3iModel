# Release Manifest — v1.0.19

## Package identity

- Package: `jarbou3i-research-engine`
- Version: `1.0.19`
- Release name: `Source Packet Template Presets`
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

v1.0.19 must not change provider behavior, OAuth behavior, backend endpoint behavior, live source connector behavior, storage model, or schema-breaking workflow structure. The patch is allowed to add local/manual source packet template presets, scoring-review preservation checks, release docs, fixtures, and QA wrappers.

## Required no-browser gates

```bash
npm run test:source:packet-templates
npm run test:source:packet-builder
npm run test:v119:no-browser
npm run test:ci:no-browser
```

## Required browser gates before publishing

```bash
npm run test:ci:browser
```

## Release archive exclusions

Generated dependency folders, test reports, browser screenshots, coverage output, OS metadata, logs, local environment files, and ZIP archives must not be shipped inside the committed release tree. See `.releaseignore`.

## v1.0.19 source packet template preset artifacts

- `src/research/source-packet-roundtrip.js`
- `src/research/source-packet-templates.js`
- `tests/source-packet-roundtrip-check.mjs`
- `tests/source-packet-template-presets-check.mjs`
- `tests/v119-no-browser-suite.mjs`
- `docs/v1.0.19-source-packet-template-presets.md`
- `fixtures/migrations/v1.0.19-packet.json`
- `fixtures/privacy/browser-generated-export-v1.0.19.json`

## Retained v1.0.16 artifacts

- `src/research/source-packet-builder.js`
- `tests/source-packet-builder-check.mjs`
- `tests/v116-no-browser-suite.mjs`
- `docs/v1.0.16-source-packet-builder-ui-scoring-review-controls.md`
- `fixtures/migrations/v1.0.16-packet.json`
- `fixtures/privacy/browser-generated-export-v1.0.16.json`
