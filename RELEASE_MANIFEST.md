# Release Manifest — v1.0.22

## Package identity

- Package: `jarbou3i-research-engine`
- Version: `1.0.22`
- Release name: `Release Evidence + Repo Hygiene Verification`
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

## CI runtime

- GitHub Actions runtime: Node 24.
- Browser CI installs Playwright once before using `PLAYWRIGHT_SKIP_INSTALL=1`.

## Compatibility boundary

v1.0.22 must not change provider behavior, OAuth behavior, backend endpoint behavior, live source connector behavior, storage model, or product capability surface. The patch adds release evidence and repository hygiene verification only.

## Required no-browser gates

```bash
npm run test:lockfile:registry
npm run test:ci:workflow-install
npm run test:ci:node24
npm run test:release:evidence
npm run test:v122:no-browser
npm run test:ci:no-browser
```

## Required browser gates before publishing

```bash
npx playwright install --with-deps
PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser
```

## v1.0.22 artifacts

- `tests/release-evidence-repo-hygiene-check.mjs`
- `tests/v122-no-browser-suite.mjs`
- `docs/v1.0.22-release-evidence-repo-hygiene-verification.md`
- `fixtures/migrations/v1.0.22-packet.json`
- `fixtures/privacy/browser-generated-export-v1.0.22.json`

## Retained v1.0.21 artifacts

- `tests/node24-ci-compat-check.mjs`
- `tests/v121-no-browser-suite.mjs`
- `docs/v1.0.21-node-24-ci-compatibility.md`
- `fixtures/migrations/v1.0.21-packet.json`
- `fixtures/privacy/browser-generated-export-v1.0.21.json`

## Release evidence rules

- Browser evidence artifacts may be uploaded for inspection, but upload alone is not a pass condition.
- The release is not approved unless no-browser and browser CI pass.
- ZIP absence is not proof of Git deletion; stale tracked files must be removed with `git rm`.

## Required cleanup commands

```bash
git rm -f --ignore-unmatch docs/v1.0.5-browser-qa-visual-regression-hardening.md
git rm -f --ignore-unmatch scripts/XXKuyryP
git rm -f --ignore-unmatch src/XXSyA2D3
git rm -f --ignore-unmatch src/XXvKXvVS
```

## Release archive exclusions

Generated dependency folders, test reports, browser screenshots, coverage output, OS metadata, logs, local environment files, and ZIP archives must not be shipped inside the committed release tree. See `.releaseignore`.
