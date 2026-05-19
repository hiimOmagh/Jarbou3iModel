## v1.1.0-alpha.12 — Dev Productivity Command Center + Golden Baseline Automation

Audit-only repository reduction gate. Adds a machine-readable fixture registry and consolidation classifier for active files, security gates, migration/privacy fixtures, historical version-suite wrappers, release docs, and generated artifacts. No files are deleted and no runtime/provider/OAuth/backend/source/storage behavior changes are introduced.

# Jarbou3i Research Engine

## v1.1.0-alpha.2 — Expansion Lane Acceptance Criteria Matrix

Release apply integrity gate for changed-files-only patch handoff. Artifact download success, screenshots alone, or ZIP existence alone are insufficient. Required validation: `npm run test:v126:no-browser`, `npm run test:ci:no-browser`, and `PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser`. No runtime/provider/OAuth/backend/source/storage/public-demo capability expansion.


## Current version

`v1.0.25 — Public Demo Release Lock`

A dark editorial intelligence workspace that turns messy AI/user research output into structured strategic briefs.

## What this patch changes

- Promotes current release metadata to v1.0.25.
- Adds a public-demo release-lock metadata object to workflow packets.
- Adds v1.0.25 migration and privacy export fixtures.
- Adds a dedicated public-demo release-lock guard.
- Blocks release approval from screenshots alone or ZIP existence alone.
- Keeps browser evidence artifacts as inspection material requiring review.
- Preserves repository hygiene guards against generated artifact pollution.
- Preserves Node 24 GitHub Actions compatibility and Playwright install discipline.
- Preserves source packet template browser QA and copy/export safety.

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
→ Public Demo Release Lock
```

## Local QA

```bash
npm ci --no-audit --no-fund --ignore-scripts
npm run test:lockfile:registry
npm run test:ci:workflow-install
npm run test:browser:visual-scope
npm run test:source:packet-template-browser-qa
npm run test:public-demo-release-lock
npm run test:ci:no-browser
npx playwright install --with-deps
PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser
```

Targeted v1.0.25 checks:

```bash
npm run test:public-demo-release-lock
npm run test:v125:no-browser
npm run test:ci:node24
npm run test:browser:visual-scope
```

## Release history

- v1.0.25 — Public Demo Release Lock
- v1.0.24 — Repo Hygiene Execution + Stale Documentation Correction
- v1.0.23 — CI Result Review + Browser Evidence Artifact Audit

## v1.1.0-alpha.2 evidence-manifest hardening

The hosted-demo evidence artifact must now contain one final `hosted-demo-metadata.json` with all four required captures, viewport dimensions, screenshot dimensions, byte counts, and horizontal-overflow sanity. Partial per-test metadata overwrites are blocked by the v1.1.0-alpha.2 no-browser gate.


Evidence manifest continuity: v1.1.0-alpha.12 preserves the single final metadata hosted-demo evidence manifest gate.

Continuity note: Root Manifest and Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, changed-files-only discipline, no live scraping, No real OAuth, screenshots alone, hosted evidence, and ZIPs are not sufficient for release approval.
