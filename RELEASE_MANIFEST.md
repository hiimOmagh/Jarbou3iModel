# Release Manifest — v1.0.13

## Package identity

- Package: `jarbou3i-research-engine`
- Version: `1.0.13`
- Release name: `Manual Source Packet Import`
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

v1.0.13 must not change provider behavior, OAuth behavior, backend endpoint behavior, live source connector behavior, browser runtime behavior, storage model, or schema-breaking workflow structure. The patch is allowed to add local/manual source packet import parsing, schema/fixture coverage, release docs, and QA wrappers.

## Required no-browser gates

```bash
npm run test:source:packet
npm run test:source:import
npm run test:source:capabilities
npm run test:v113:no-browser
npm run test:ci:no-browser
```

## Required browser gates before publishing

```bash
npm run test:ci:browser
```

## Release archive exclusions

Generated dependency folders, test reports, browser screenshots, coverage output, OS metadata, logs, and local environment files must not be shipped in release archives. See `.releaseignore`.

## v1.0.13 manual source packet artifacts

- `src/research/source-packet-importer.js`
- `src/research/source-import-adapter.js`
- `fixtures/research/source-packet-sample.json`
- `fixtures/migrations/v1.0.13-packet.json`
- `fixtures/privacy/browser-generated-export-v1.0.13.json`
- `tests/source-packet-import-check.mjs`
- `tests/v113-no-browser-suite.mjs`
- `docs/v1.0.13-manual-source-packet-import.md`

## v1.0.12 source strategy artifacts

- `src/research/source-capability-registry.js`
- `tests/source-capability-registry-check.mjs`
- `tests/v112-no-browser-suite.mjs`
- `docs/v1.0.12-research-source-strategy-blueprint.md`

Runtime capability change: no
