# Release and Evidence

## v1.4.0-alpha.16 — Alpha.15 Lock Completion + Evidence Surface Budget Enforcement

Current candidate. Lock requires green no-browser CI, green browser CI, hosted-demo evidence, AR/FR/EN visible-text snapshots, canonical lock evidence bundle, and artifact identity guard.

Locked alpha.15 evidence: Run ID `26643746981`; commit `4ba0f9db8020a9d0158ec95854ef10fbfe47694c`; no-browser 144; browser 17; hosted-demo evidence passed; visible-text AR/FR/EN passed; evidence matrix 39/39 passed; lock bundle validation passed; artifact identity guard passed.

Locked alpha.14 evidence: Run ID `26640076472`; commit `476b97423d18842177ae47074967afa45e5962bb`; no-browser 143; browser 17; hosted-demo evidence passed; visible-text AR/FR/EN passed; lock bundle validation passed; artifact identity guard passed.

Evidence/runtime budget guard: evidence_surface_budget_version: 1.4.0-alpha.16; locked_baseline: 1.4.0-alpha.14; locked_alpha15_baseline: 1.4.0-alpha.15; browser_check_budget_max: 20; hosted_language_count_expected: 3; hosted_surface_count_expected_max: 13; visible_snapshot_rows_expected_max: 39; runtime_budget_policy: guardrail_only; runtime_budget_enforced_without_network: true; provider_execution_performed: false; live_fetching_performed: false; credential_persistence_allowed: false.

No live provider calls. No hidden network calls. No real OAuth/token lifecycle. No credential persistence. No backend/storage/source expansion. No automatic source verification. No automatic signoff/export lock. No publication permission claim.


<!-- preserved-historical-body -->

Current release reference: v1.4.0-alpha.16 — Alpha.15 Lock Completion + Evidence Surface Budget Enforcement. No-network replay QA only; no default live execution, hidden network calls, real credentials, live/provider/OAuth/backend/source/storage expansion, credential persistence, or automatic source fetching. Locked stable baseline: v1.3.0 — Stable Manual Workflow Release. Locked mock-to-live baseline: v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence. Locked trace/readiness baseline: v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report.

# Release and Evidence Policy

This document consolidates release and evidence policy previously scattered across root artifacts such as `BROWSER_EVIDENCE.md`, `HOSTED_DEMO_VERIFICATION.md`, `RELEASE_MANIFEST.md`, `RELEASE_NOTES.md`, `MANIFEST.md`, and `CHANGED_FILES_MANIFEST.json`.

## Current release

- Package: `jarbou3i-research-engine`
- Version: `1.4.0-alpha.14`
- Release: `v1.4.0-alpha.16 — Alpha.15 Lock Completion + Evidence Surface Budget Enforcement`
- Release type: manual execution safety cockpit + session ledger alpha
- Runtime capability change: no
- Provider behavior change: no
- OAuth behavior change: no
- Backend/live-source/storage behavior change: no
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
PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser
```

Hosted URL mode:

```bash
HOSTED_DEMO_URL="https://example.github.io/jarbou3i-research-engine" PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser
```

The screenshots must show no horizontal overflow, visible first-run/public-demo/hosted-demo/evidence-review panels, reachable provider/export states, and a metadata snapshot with app version `1.4.0-alpha.14` and the evidence-review panel present.

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

Boundary reminder: no live scraping, no live source fetching, no hidden network calls, no real OAuth/account login, no provider execution expansion, no backend behavior expansion, no new persistent storage, no credential persistence, no automatic source fetching, and no automated source verification are enabled by this limited manual prototype shell. The shell only records manual opt-in preconditions and hard failure reasons for review.

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
- Current root artifact consolidation: `v1.3.0 — Stable Manual Workflow Release`

Evidence manifest continuity: v1.1.0 preserves the single final metadata hosted-demo evidence manifest gate.
Release apply integrity gate for changed-files-only patch handoff remains active.
Artifact download success, screenshots alone, or ZIP existence alone are insufficient.
Required validation: `npm run test:current:no-browser`, `npm run test:ci:no-browser`, and `PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser`.

## Compatibility wording

Hosted Demo evidence must preserve browser evidence and evidence review language for existing guards.


Release-lock guard: v1.3.0 Stable Manual Workflow Release requires green no-browser CI, green browser CI, and reviewed hosted-demo evidence. Screenshots alone are insufficient. ZIP existence alone is insufficient. A local ZIP archive alone is insufficient.

Release-lock reminder: screenshots alone are insufficient; ZIP archive alone is insufficient.

No live scraping and No real OAuth remain enforced.

Release-lock evidence reminder: screenshots alone are insufficient. ZIP existence alone is insufficient. A local ZIP archive alone is insufficient.

Provenance continuity: Package Script Compression, CI Gate Registry, Root Manifest, Release Artifact Consolidation, Migration + Privacy Fixture Registry Consolidation, Fixture Registry payload compression, test organization audit, provenance ledger, changed-files-only discipline, visual freeze, and mobile header continuity are preserved.

Public boundary: no live scraping, No real OAuth/production OAuth, and screenshots alone or ZIP existence alone are insufficient for approval.

Release continuity note: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization, planning gate, apply integrity, and changed-files-only safeguards remain active.

Provenance ledger, changed-files-only, CI Gate Registry, Package Script Compression, Fixture Registry payload compression, visual freeze, and mobile header release safeguards remain active.

No live scraping. No real OAuth or production OAuth is enabled. Screenshots alone, ZIP existence alone, and a ZIP archive alone are insufficient for release approval.

Locked baseline preserved: `v1.4.0-alpha.14 — Adapter Replay Fixture Corpus + Coverage Matrix` is locked with run ID `26640076472`, commit `476b97423d18842177ae47074967afa45e5962bb`, green no-browser CI, green browser CI, hosted-demo evidence, AR/FR/EN visible-text snapshots, canonical lock bundle, and artifact identity guard.

Evidence/runtime budget guard: evidence_surface_budget_version: 1.4.0-alpha.16; locked_baseline: 1.4.0-alpha.14; browser_check_budget_max: 20; hosted_language_count_expected: 3; hosted_surface_count_expected_max: 13; visible_snapshot_rows_expected_max: 39; runtime_budget_policy: guardrail_only; runtime_budget_enforced_without_network: true; provider_execution_performed: false; live_fetching_performed: false; credential_persistence_allowed: false.

Baseline repetition for release-truth checks: v1.3.0 — Stable Manual Workflow Release; v1.4.0-alpha.7 — Source Acquisition Control Surface; v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence; v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization; v1.3.0-alpha.10 — Brief Publication Pack v4.

Locked alpha.15 baseline: `v1.4.0-alpha.15 — Roadmap Lock Completion + Manual Provider Adapter UX Compression`; Run ID `26643746981`; commit `4ba0f9db8020a9d0158ec95854ef10fbfe47694c`.
