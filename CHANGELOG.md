## v1.0.18 — Source Packet Builder Export Roundtrip QA

- Added `src/research/source-packet-roundtrip.js` for local/manual source packet export/import roundtrip QA.
- Added `tests/source-packet-roundtrip-check.mjs`.
- Added `tests/v118-no-browser-suite.mjs`.
- Preserved source packet scoring review metadata as import metadata.
- Added `source_packet_roundtrip_report` to schema, fixtures, migrations, and exported research packets.
- Confirmed re-imported evidence remains queue-only, unverified, and locally scored.
- Preserved provider/OAuth/backend/source/storage behavior and manual/private mode.

## v1.0.17 — Source Packet Builder Browser QA + UX Tightening

- Added Source Packet Builder browser-QA hook and guardrail copy.
- Added responsive builder action layout for build/copy/export controls.
- Added bounded metadata preview for generated source packets.
- Added overflow-safe chip, warning, and preview styling.
- Ensured Source Packet Builder appears in Sources and Quality workflow tabs.
- Added `tests/source-packet-builder-browser-qa-check.mjs`.
- Added `tests/source-packet-builder-browser.spec.mjs`.
- Added `tests/v117-no-browser-suite.mjs`.
- Wired static and browser builder QA into CI scripts.
- Preserved provider/OAuth/backend/source/storage behavior and manual/private mode.

## v1.0.16 — Source Packet Builder UI + Scoring Review Controls

- Added `src/research/source-packet-builder.js` for local/manual source packet construction.
- Added build-from-evidence and build-from-review-queue controls.
- Added copy/export controls for generated manual source packet JSON.
- Added scoring review controls for imported evidence candidates.
- Preserved no-fetch/no-verification/no-OAuth boundaries.

## v1.0.15 — Evidence Scoring UI Explanation + Calibration Pass

- Added calibration bands and score-theater guardrails around evidence scoring.
- Clarified reliability, attention, traceability, and synthesis weight in UI and exports.

## v1.0.14 — Evidence Scoring v1

- Added local evidence scoring that separates attention signal from evidence reliability.

## v1.0.13 — Manual Source Packet Import

- Added structured manual source packet JSON import into the Evidence Review Queue.

## v1.0.12 — Research Source Strategy Blueprint

- Added source capability registry for availability/auth/freshness/evidence/privacy/demo-visibility contracts.

## v1.0.11 — Repository Hygiene + Stale Artifact Cleanup

- Added repository hygiene cleanup gates for stale artifacts, duplicate release docs, generated outputs, and migration fixture drift.

## v1.0.10 — Hosted URL CI Artifact Review + Module-Type Warning Fix

- Added package-level ESM mode via `"type": "module"` to remove Node module-type warnings.

## v1.0.9 — Hosted Demo Smoke Fixes + Evidence Review

- Added hosted-demo smoke-fix metadata and evidence-review metadata.

## v1.0.8 — Hosted Demo Deployment Verification + Browser Evidence Capture

- Added hosted-demo and browser-evidence metadata, docs, and Playwright capture flow.

## v1.0.7 — Public Demo Readiness + Release Notes Polish

- Added public-demo and release-note metadata.

## v1.0.6 — Documentation + Release Packaging Cleanup

- Added release manifest, release ignore policy, packaging checks, and repo hygiene audit.

## v1.0.5 — Onboarding + First-Run Success

- Added local-only first-run guide.

## v1.0.4 — Browser QA + Visual Regression Hardening

- Added browser layout persistence tests and visual regression capture scaffolding.

## v1.0.3 — Screen Discipline Patch

- Removed global section numbering and collapsed advanced/internal cards.

## v1.0.2 — UX Stabilization Patch

- Added workflow navigation tabs and layout persistence checks.

## v1.0.1 — Patch-only Stabilization

- Added patch-only release gates and stable-release guardrails.

## v1.0.0 — Public Beta / Stable Research Engine

- Promoted the release candidate to stable public beta.

## v0.29.0-rc.1 — Release Candidate Freeze

- Added stable release metadata and release-candidate freeze checks.

## v0.28.0-beta — Real Portable OAuth Spike

- Added OAuth/PKCE spike scaffolding without production token storage.

## v0.27.0-beta — Web Search Provider Abstraction

- Added web-search provider abstraction without enabling live search by default.
