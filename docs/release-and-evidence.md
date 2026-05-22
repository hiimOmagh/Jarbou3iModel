# Release and Evidence Policy

This document consolidates release and evidence policy previously scattered across root artifacts such as `BROWSER_EVIDENCE.md`, `HOSTED_DEMO_VERIFICATION.md`, `RELEASE_MANIFEST.md`, `RELEASE_NOTES.md`, `MANIFEST.md`, and `CHANGED_FILES_MANIFEST.json`.

## Current release

- Package: `jarbou3i-research-engine`
- Version: `1.1.0`
- Release: `v1.1.0-fix.2 — Public Demo Stable`
- Release type: cleanup-only alpha patch
- Runtime capability change: no
- Provider behavior change: no
- OAuth behavior change: no
- Backend/source/storage behavior change: no
- Public-demo capability expansion: no
- Required cleanup commands: apply tracked deletions for consolidated root release artifacts before validation.

## Browser evidence policy

Browser evidence is the proof bundle for inspecting the public hosted demo. It is not standalone release approval.

Required hosted-demo evidence artifacts:

- `desktop-first-screen.png`
- `mobile-first-screen.png`
- `provider-mode.png`
- `quality-export.png`
- `hosted-demo-metadata.json`

Artifact root:

```text
ci-artifacts/hosted-demo-evidence
```

Local static mode:

```bash
npm run test:browser:evidence
```

Hosted URL mode:

```bash
HOSTED_DEMO_URL="https://example.github.io/jarbou3i-research-engine" npm run test:browser:evidence
```

The screenshots must show no horizontal overflow, visible first-run/public-demo/hosted-demo/evidence-review panels, reachable provider/export states, and a metadata snapshot with app version `1.1.0` and the evidence-review panel present.

The hosted-demo evidence artifact must contain one final `hosted-demo-metadata.json` with all four required captures, viewport dimensions, screenshot dimensions, byte counts, full-page status, and horizontal-overflow sanity. Partial per-test metadata overwrites remain blocked by no-browser gates.

## Hosted-demo verification policy

The hosted demo must be verified as a deployed artifact, not only as a local static page.

Release gates:

- `hosted_demo_verified`
- `hosted_demo_smoke_fixed`
- `browser_evidence_capture_ready`
- `evidence_review_complete`
- `public_demo_release_locked`

## Release approval rule

CI green alone is not sufficient for public-demo approval.
Screenshots alone are not sufficient for public-demo approval.
ZIP existence alone is not sufficient for public-demo approval.

Public demo release approval requires:

- green no-browser CI
- green browser CI
- reviewed hosted-demo evidence
- aligned public claims
- privacy/export safety
- artifact SHA256
- clean archive boundary for the intended release commit
- public repository state matching the release archive

## Compatibility boundary

This release must not change provider behavior, OAuth behavior, backend endpoint behavior, live source connector behavior, storage model, source verification behavior, or public-demo capability surface.

Boundary reminder: no live scraping, no real OAuth/account login, and no automated source verification are enabled by this cleanup release.

## Release archive exclusions

The release archive must exclude:

- `node_modules/`
- `playwright-report/`
- `test-results/`
- `*.zip`
- logs
- temporary files
- secret-bearing local config such as `backend/.dev.vars`

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

## Required root files after alpha.6 consolidation

- `.nojekyll`
- `.releaseignore`
- `CHANGELOG.md`
- `CONTRIBUTING.md`
- `LICENSE`
- `MANIFEST.json`
- `PUBLIC_DEMO.md`
- `README.md`
- `SECURITY.md`
- `index.html`
- `manifest.webmanifest`
- `package.json`
- `package-lock.json`
- `playwright.config.js`

## Consolidated root artifacts

The following legacy root artifacts are intentionally consolidated and should not return as standalone root files:

- `BROWSER_EVIDENCE.md`
- `HOSTED_DEMO_VERIFICATION.md`
- `RELEASE_MANIFEST.md`
- `RELEASE_NOTES.md`
- `MANIFEST.md`
- `CHANGED_FILES_MANIFEST.json`
- `DELETE_FILES_MANIFEST.json`

## Historical continuity

- Public-demo visual freeze baseline: `v1.0.30 — Mobile Header Geometry Lock / Final Public Demo Visual Freeze`
- Fixture registry consolidation baseline: `v1.1.0-alpha.4 — Migration + Privacy Fixture Registry Consolidation`
- Version/documentation registry baseline: `v1.1.0-alpha.5 — Repository-Wide Structural Cleanup + Version/Documentation Registry Consolidation`
- Current root artifact consolidation: `v1.1.0-fix.2 — Public Demo Stable`

Evidence manifest continuity: v1.1.0 preserves the single final metadata hosted-demo evidence manifest gate.
Release apply integrity gate for changed-files-only patch handoff remains active.
Artifact download success, screenshots alone, or ZIP existence alone are insufficient.
Required validation: `npm run test:current:no-browser`, `npm run test:ci:no-browser`, and `PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser`.

## Compatibility wording

Hosted Demo evidence must preserve browser evidence and evidence review language for existing guards.


Release-lock guard: v1.1.0 Public Demo Stable requires green no-browser CI, green browser CI, and reviewed hosted-demo evidence. Screenshots alone are insufficient. ZIP existence alone is insufficient. A local ZIP archive alone is insufficient.

Release-lock reminder: screenshots alone are insufficient; ZIP archive alone is insufficient.

No live scraping and No real OAuth remain enforced.

Release-lock evidence reminder: screenshots alone are insufficient. ZIP existence alone is insufficient. A local ZIP archive alone is insufficient.

Provenance continuity: Package Script Compression, CI Gate Registry, Root Manifest, Release Artifact Consolidation, Migration + Privacy Fixture Registry Consolidation, Fixture Registry payload compression, test organization audit, provenance ledger, changed-files-only discipline, visual freeze, and mobile header continuity are preserved.

Public boundary: no live scraping, No real OAuth/production OAuth, and screenshots alone or ZIP existence alone are insufficient for approval.

Release continuity note: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization, planning gate, apply integrity, and changed-files-only safeguards remain active.

Provenance ledger, changed-files-only, CI Gate Registry, Package Script Compression, Fixture Registry payload compression, visual freeze, and mobile header release safeguards remain active.

No live scraping. No real OAuth or production OAuth is enabled. Screenshots alone, ZIP existence alone, and a ZIP archive alone are insufficient for release approval.
