# Jarbou3i Research Engine

## Current version

`v1.0.23 — CI Result Review + Browser Evidence Artifact Audit`

A dark editorial intelligence workspace that turns messy AI/user research output into structured strategic briefs.

## What this patch changes

- Adds CI result review and browser evidence artifact audit discipline.
- Preserves Node 24 GitHub Actions compatibility.
- Verifies hosted-demo evidence artifact upload remains inspectable but not sufficient for release approval.
- Records public repository alignment as a release approval requirement.
- Keeps public npm lockfile registry validation before `npm ci`.
- Allows GitHub browser CI to skip duplicate Playwright installation with `PLAYWRIGHT_SKIP_INSTALL=1`.
- Keeps repository hygiene guards against stale `XX*` orphan files and documents required `git rm` cleanup.
- Preserves source packet template browser QA and copy/export safety from v1.0.20.

## Compatibility boundary

- No live scraping.
- No production OAuth.
- No provider behavior change.
- No backend endpoint behavior change.
- No source connector behavior change.
- No storage behavior change.
- Manual/private mode remains default.
- Template output is transport metadata and a drafting scaffold, not source verification.

## Stable workflow

```text
Topic/context
→ Research Plan
→ Evidence Matrix
→ Evidence Review Queue
→ Source Packet Builder
→ Source Packet Template Presets
→ Causal Links
→ Analysis Brief Compiler
→ Provider Harness
→ Provider Response Validation
→ Controlled Repair Loop
→ Privacy Export Guard
→ Quality Gate
→ Export Pack
→ Hosted Demo Evidence Review
```

## Local QA

```bash
npm ci --no-audit --no-fund --ignore-scripts
npm run test:lockfile:registry
npm run test:ci:workflow-install
npm run test:browser:visual-scope
npm run test:source:packet-template-browser-qa
npm run test:ci:no-browser
npx playwright install --with-deps
PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser
```

Targeted v1.0.23 checks:

```bash
npm run test:release:evidence
npm run test:ci:result-review
npm run test:ci:node24
npm run test:v123:no-browser
npm run test:browser:visual-scope
```

## Release history

- v1.0.23 — CI Result Review + Browser Evidence Artifact Audit
- v1.0.22 — Release Evidence + Repo Hygiene Verification
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
