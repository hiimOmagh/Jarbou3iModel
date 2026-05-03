# Release Manifest — v1.0.24

## Package identity

- Package: `jarbou3i-research-engine`
- Version: `1.0.24`
- Release name: `Repo Hygiene Execution + Stale Documentation Correction`
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
- Browser evidence artifacts are uploaded to `ci-artifacts/hosted-demo-evidence` for inspection.

## Compatibility boundary

v1.0.24 must not change provider behavior, OAuth behavior, backend endpoint behavior, live source connector behavior, storage model, source verification behavior, or public-demo capability surface. The patch executes repository hygiene and stale documentation correction only.

## Required no-browser gates

```bash
npm run test:lockfile:registry
npm run test:ci:workflow-install
npm run test:ci:node24
npm run test:release:evidence
npm run test:ci:result-review
npm run test:repo:hygiene-execution
npm run test:v124:no-browser
npm run test:ci:no-browser
```

## Required browser gates before publishing

```bash
npx playwright install --with-deps
PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser
```

## v1.0.24 artifacts

- `tests/repo-hygiene-execution-stale-docs-check.mjs`
- `tests/v124-no-browser-suite.mjs`
- `docs/v1.0.24-repo-hygiene-execution-stale-documentation-correction.md`
- `fixtures/migrations/v1.0.24-packet.json`
- `fixtures/privacy/browser-generated-export-v1.0.24.json`

## Retained v1.0.23 artifacts

- Retained release: `v1.0.23 — CI Result Review + Browser Evidence Artifact Audit`

- `tests/ci-result-review-browser-evidence-audit-check.mjs`
- `tests/v123-no-browser-suite.mjs`
- `docs/v1.0.23-ci-result-review-browser-evidence-artifact-audit.md`
- `fixtures/migrations/v1.0.23-packet.json`
- `fixtures/privacy/browser-generated-export-v1.0.23.json`

## Release evidence rules

- Browser evidence artifacts may be uploaded for inspection, but upload alone is not a pass condition.
- The release is not approved unless no-browser and browser CI pass for the intended release commit.
- ZIP absence is not proof of Git deletion; stale tracked files must be removed with `git rm`.
- Public repository state must match the release archive before public release.
- Current-state documentation must not advertise stale or unavailable capabilities.

## Required cleanup commands retained for verification

```bash
git rm -f --ignore-unmatch docs/v1.0.5-browser-qa-visual-regression-hardening.md
git rm -f --ignore-unmatch scripts/XXKuyryP
git rm -f --ignore-unmatch src/XXSyA2D3
git rm -f --ignore-unmatch src/XXvKXvVS
```

## Release archive exclusions

Generated dependency folders, test reports, browser screenshots, coverage output, OS metadata, logs, local environment files, and ZIP archives must not be shipped inside the committed release tree. See `.releaseignore`.
