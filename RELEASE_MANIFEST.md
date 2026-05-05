# Release Manifest — v1.1.0-alpha.3

## v1.1.0-alpha.3 — Repository Consolidation Audit + Retention Registry

This patch adds a release-application integrity gate for changed-files-only handoffs. Artifact download success, screenshots alone, or ZIP existence alone are insufficient. The patch must be applied to the intended base, validated with CI, and reviewed against manifest/SHA evidence before publication.

## Package identity

- Package: `jarbou3i-research-engine`
- Version: `1.1.0-alpha.3`
- Release name: `Repository Consolidation Audit + Retention Registry`
- Release type: patch
- Patch type: `changed-files-only over v1.0.25`
- Runtime capability change: no
- Artifact: `jarbou3i-research-engine-v1.1.0-alpha.3-repository-consolidation-audit-retention-registry-patch.zip`

## Entry points

- Static app: `index.html`
- Main UI script: `src/app.js`
- Research runtime: `src/research-engine.js`
- Release apply integrity module: `src/research/release-apply-integrity.js`
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

## Required v1.1.0-alpha.3 release-lock files

- `docs/v1.1.0-alpha.3-repository-consolidation-audit-retention-registry.md`
- `fixtures/migrations/v1.1.0-alpha.3-packet.json`
- `fixtures/privacy/browser-generated-export-v1.1.0-alpha.3.json`
- `tests/release-apply-integrity-check.mjs`
- `tests/v126-no-browser-suite.mjs`

## CI runtime

- GitHub Actions runtime: Node 24.
- Browser CI installs Playwright once before using `PLAYWRIGHT_SKIP_INSTALL=1`.
- Browser evidence artifacts are uploaded to `ci-artifacts/hosted-demo-evidence` for inspection and review.

## Compatibility boundary

v1.1.0-alpha.3 must not change provider behavior, OAuth behavior, backend endpoint behavior, live source connector behavior, storage model, source verification behavior, or public-demo capability surface. The patch locks release-application integrity only.

## Required apply sequence

```bash
unzip -o jarbou3i-research-engine-v1.1.0-alpha.3-repository-consolidation-audit-retention-registry-patch.zip -d .
npm ci --no-audit --no-fund --ignore-scripts
npm run test:v126:no-browser
npm run test:ci:no-browser
PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser
git add .
git commit -m "chore: add release apply integrity gate"
git push
```

## Required no-browser gates

```bash
npm run test:lockfile:registry
npm run test:ci:workflow-install
npm run test:ci:node24
npm run test:release-apply-integrity
npm run test:v126:no-browser
npm run test:ci:no-browser
```

## Required browser gates before publishing

```bash
npx playwright install --with-deps
PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser
```

## Release approval rule

Screenshots alone are insufficient. A ZIP archive alone is insufficient. Public demo release approval requires green no-browser CI, green browser CI, reviewed hosted-demo evidence, aligned public claims, privacy/export safety, artifact SHA256, and a clean archive boundary for the intended release commit.

## Retained v1.0.25 audit boundary

- v1.0.25 — Public Demo Release Lock remains the historical public-demo approval boundary.
- Evidence upload remains inspection material, not release approval.

## Release archive exclusions

The release archive must exclude `node_modules/`, `playwright-report/`, `test-results/`, `*.zip`, logs, temp files, and secret-bearing local config such as `backend/.dev.vars`.

## Required cleanup commands

No generated artifact, orphan `XX*` temporary file, ZIP archive, test report, or secret-bearing local config may be committed or shipped.

## Release history map

- v1.1.0-alpha.3 — Repository Consolidation Audit + Retention Registry
- v1.0.25 — Public Demo Release Lock
- v1.0.24 — Repo Hygiene Execution + Stale Documentation Correction
- v1.0.23 — CI Result Review + Browser Evidence Artifact Audit
- v1.0.22 — Release Evidence + Repository Hygiene Verification
- v1.0.21 — Node 24 CI Compatibility + Action Runtime Migration
- v1.0.20 — Source Packet Template Browser QA + Copy Safety
- v1.0.19 — Source Packet Template Presets
- v1.0.18 — Source Packet Builder Export Roundtrip QA
- v1.0.17 — Source Packet Builder Browser QA + UX Tightening
- v1.0.16 — Source Packet Builder UI + Scoring Review Controls
- v1.0.15 — Evidence Scoring UI Explanation + Calibration Pass
- v1.0.14 — Evidence Scoring v1
- v1.0.13 — Manual Source Packet Import
- v1.0.12 — Research Source Strategy Blueprint
- v1.0.11 — Repository Hygiene + Stale Artifact Cleanup
- v1.0.10 — Hosted URL CI Artifact Review + Module-Type Warning Fix
- v1.0.9 — Hosted Demo Smoke Fixes + Evidence Review
- v1.0.8 — Hosted Demo Deployment Verification + Browser Evidence Capture
- v1.0.7 — Public Demo Readiness + Release Notes Polish
- v1.0.6 — Documentation + Release Packaging Cleanup
- v1.0.5 — Onboarding + First-Run Success
- v1.0.4 — Browser QA + Visual Regression Hardening
- v1.0.3 — Screen Discipline Patch
- v1.0.2 — UX Stabilization Patch
- v1.0.1 — Patch-only Stabilization
- v1.0.0 — Public Beta / Stable Research Engine
- v0.29.0-rc.1 — Release Candidate Freeze
- v0.28.0-beta — Real Portable OAuth Spike
- v0.27.0-beta — Web Search Provider Abstraction
- v0.26.0-beta — Real Source Connector Prototype
- v0.25.0-beta — Real Backend Provider Hardening
- v0.24.0-beta — Export Pack v2
- v0.23.0-beta — Advanced Quality Gate v3
