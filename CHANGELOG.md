## v1.0.14 — Evidence Scoring v1

- Added `src/research/evidence-scorer.js` for local evidence scoring.
- Added per-evidence `evidence_scoring` metadata and packet-level `evidence_scoring_report`.
- Separated `attention_signal_score` from `reliability_score`; attention is explicitly not treated as truth.
- Added traceability, specificity, recency, contradiction-value, and synthesis-weight scoring.
- Added Quality Gate v3 evidence reliability and attention-integrity dimensions.
- Updated source import and source-packet import paths so imported candidates are scored but remain review-gated.
- Added schema, fixtures, migration/privacy snapshots, `tests/evidence-scoring-check.mjs`, and `tests/v114-no-browser-suite.mjs`.
- Preserved provider/OAuth/backend/source/storage behavior and manual/private mode.

## v1.0.13 — Manual Source Packet Import

- Added `src/research/source-packet-importer.js` for structured manual source packet JSON import.
- Extended the source import adapter with `source_packet` detection and conversion.
- Added review-gated source packet fixtures, schema coverage, and `tests/source-packet-import-check.mjs`.
- Preserved manual/private mode, disabled live scraping, and kept OAuth/provider/backend/storage behavior unchanged.

## v1.0.12 — Research Source Strategy Blueprint

- Added source capability registry for availability/auth/freshness/evidence/privacy/demo-visibility contracts.
- Added packet/schema/fixture coverage and CI checks.
- Preserved manual/private mode and avoided live source/provider/OAuth expansion.

## v1.0.11 — Repository Hygiene + Stale Artifact Cleanup

- Added repository hygiene cleanup gates for stale artifacts, duplicate release docs, generated outputs, secret-bearing local config, and migration fixture drift.
- Added `tests/repository-hygiene-cleanup-check.mjs` and `tests/v111-no-browser-suite.mjs`.
- Added v1.0.11 migration/privacy snapshots and `docs/v1.0.11-repository-hygiene-stale-artifact-cleanup.md`.
- Added missing `fixtures/migrations/v1.0.4-packet.json` coverage for a supported stable migration source.
- Preserved provider/OAuth/backend/source/storage behavior and kept manual/private mode first-class.

## v1.0.11 — Repository Hygiene + Stale Artifact Cleanup

- Rebuilt the failed-download v1.0.10 patch from the confirmed v1.0.9 baseline.
- Added package-level ESM mode via `"type": "module"` to remove Node's `MODULE_TYPELESS_PACKAGE_JSON` warning during Worker smoke validation.
- Added `tests/module-type-warning-fix-check.mjs` to prove `tests/backend-worker-smoke.mjs` exits cleanly without ESM reparsing warnings.
- Added `tests/v110-no-browser-suite.mjs` and wired the module-warning check into no-browser CI.
- Updated v1.0.10 schema, migration fixture, privacy fixture, release manifest, release notes, README, roadmap, and QA matrix.
- Preserved provider, OAuth, backend endpoint, source connector, storage, browser runtime, and privacy/export boundaries.

## v1.0.9 — Hosted Demo Smoke Fixes + Evidence Review

- Added hosted-demo smoke-fix metadata and evidence-review metadata to exported research packets, schema, fixtures, privacy snapshots, and migration defaults.
- Added an evidence-review first-screen panel for hosted-demo publication readiness.
- Updated Playwright config so browser evidence can run against either the local static server or `HOSTED_DEMO_URL`.
- Updated browser evidence capture to write stable screenshot files plus `test-results/hosted-demo-evidence/hosted-demo-metadata.json`.
- Added `tests/hosted-demo-evidence-review-check.mjs` and `tests/v109-no-browser-suite.mjs`.
- Updated GitHub Actions to upload `hosted-demo-evidence` as a dedicated artifact.
- Refined browser CI to avoid duplicate full-suite evidence reruns while preserving targeted browser coverage.
- Preserved provider, OAuth, backend, source connector, storage, and privacy/export boundaries.

## v1.0.8 — Hosted Demo Deployment Verification + Browser Evidence Capture

- Added `src/research/hosted-demo-verification.js` for hosted-demo and browser-evidence metadata.
- Added a first-screen hosted demo verification panel.
- Added export-safe `hosted_demo_verification` and `browser_evidence_capture` packet sections.
- Added schema, migration, privacy, and canonical workflow fixture coverage for hosted demo verification.
- Added `HOSTED_DEMO_VERIFICATION.md`, `BROWSER_EVIDENCE.md`, and `docs/v1.0.8-hosted-demo-deployment-browser-evidence.md`.
- Added `tests/hosted-demo-deployment-check.mjs`, `tests/hosted-demo-browser-evidence.spec.mjs`, and `tests/v108-no-browser-suite.mjs`.
- Preserved provider, OAuth, backend, source connector, storage, and privacy/export boundaries.

## v1.0.7 — Public Demo Readiness + Release Notes Polish

- Added `src/research/public-demo-readiness.js` for public-demo and release-note metadata.
- Added a first-screen public demo readiness panel.
- Added export-safe `public_demo` and `release_notes` packet sections.
- Added schema, migration, privacy, and canonical workflow fixture coverage for public demo readiness.
- Added `PUBLIC_DEMO.md`, `RELEASE_NOTES.md`, and `docs/v1.0.7-public-demo-readiness-release-notes.md`.
- Added `tests/public-demo-readiness-check.mjs` and `tests/v107-no-browser-suite.mjs`.
- Preserved provider, OAuth, backend, source connector, storage, and privacy/export boundaries.

## v1.0.6 — Documentation + Release Packaging Cleanup

### Repository hygiene hotfix

- Added `tests/repo-file-hygiene-check.mjs` for full repository file cleanup auditing.
- Added `docs/repo-cleanup-audit-v1.0.6.md` with exact deletion/retention guidance.
- Added `npm run test:repo:hygiene` and wired the hygiene guard into `test:ci:no-browser`.
- Clarified that `docs/v1.0.5-browser-qa-visual-regression-hardening.md` must be removed; `docs/v1.0.4-browser-qa-visual-regression-hardening.md` is the canonical file.

- Corrected historical release labels across README, changelog, QA matrix, and versioned docs.
- Added `RELEASE_MANIFEST.md` as the canonical package inventory for review before publishing.
- Added `.releaseignore` to document generated/local files that should not enter release archives.
- Removed the duplicate/misnamed `docs/v1.0.5-browser-qa-visual-regression-hardening.md`; v1.0.4 remains the canonical browser-QA hardening document.
- Added `docs/v1.0.6-documentation-release-packaging-cleanup.md`.
- Added `tests/release-packaging-cleanup-check.mjs` and `tests/v106-no-browser-suite.mjs`.
- Added v1.0.6 migration/privacy snapshots.
- Preserved provider, OAuth, backend, source connector, storage, and schema compatibility boundaries.

## v1.0.5 — Onboarding + First-Run Success

- Added local-only first-run guide: topic → plan → evidence → review queue → quality gate → safe export.
- Added `src/research/onboarding.js`.
- Added onboarding state persistence through local state store.
- Added export-safe `onboarding` metadata to research packets, schema, fixtures, privacy snapshots, and migration defaults.
- Added `tests/onboarding-first-run-check.mjs` and `tests/v105-no-browser-suite.mjs`.
- Preserved provider, OAuth, backend, source connector, and storage boundaries.

## v1.0.4 — Browser QA + Visual Regression Hardening

- Added browser layout persistence tests.
- Added visual regression capture scaffolding with optional strict baseline mode.
- Added browser QA hardening metadata to exported packets and schema.
- Updated CI browser gate to include provider, layout, visual capture, and full browser suite.
- Preserved patch-only boundary: no new engine feature, connector, provider, or OAuth behavior.

## v1.0.3 — Screen Discipline Patch

- Removed global section numbering from workflow cards.
- Collapsed duplicate command surfaces by default.
- Added explicit show/hide toggles and compact next-action guidance.
- Converted advanced/internal cards into collapsed accordion-style panels.
- Added `tests/screen-discipline-patch-check.mjs` and `tests/v103-no-browser-suite.mjs`.

## v1.0.2 — UX Stabilization Patch

- Added workflow navigation tabs for Analysis, Evidence, Sources, Quality & Export, and Settings / Advanced.
- Added layout persistence tests and screen hierarchy checks.

## v1.0.1 — Patch-only Stabilization

- Added patch-only release gates and strict stable-release guardrails.

## v1.0.0 — Public Beta / Stable Research Engine

- Promoted the release candidate to stable public beta.
- Preserved provider, privacy, export, source, backend, migration, and browser gates.

## v0.29.0-rc.1 — Release Candidate Freeze

- Added stable release metadata and release-candidate freeze checks.

## v0.28.0-beta — Real Portable OAuth Spike

- Added OAuth/PKCE spike scaffolding without production token storage.

## v0.27.0-beta — Web Search Provider Abstraction

- Added dry-run web-search provider abstraction without live fetching.

## v0.26.0-beta — Real Source Connector Prototype

- Added public GitHub metadata connector with review-gated evidence import.

## v0.25.0-beta — Real Backend Provider Hardening

- Added optional hosted proxy hardening and backend worker smoke tests.

## v0.24.0-beta — Export Pack v2

- Added structured export pack generation with research-packet, brief, evidence, review queue, ledger, quality, and privacy artifacts.

## v0.23.0-beta — Advanced Quality Gate v3

- Upgraded quality diagnostics with weighted dimensions, weakest-dimension reporting, publication readiness, observed counts, and fix actions.

## v0.22.0-beta — Analysis Template System

- Added selectable analysis template registry and template-fit diagnostics.

## v0.21.0-beta — Project Workspace + Local Storage Management

- Added local-only project workspace management for saving, duplicating, deleting, exporting, and importing project bundles.

## v0.20.0-beta — UX Reliability Pass

- Added provider mode guide, stronger empty states, disabled states, destructive-action confirmations, and export confirmation summary.

## v0.19.0-beta — Privacy Audit Hardening

- Added privacy audit release gate, final exported-payload scanner, and browser-generated privacy export fixture.

## v0.18.0-beta — Research Engine Module Split

- Split stable responsibilities into focused browser modules while preserving behavior.

## v0.17.0-beta — State Migration + Version Compatibility Layer

- Added packet migration module, migration report metadata, legacy fixtures, and secret-redaction migration checks.

## v0.16.0-beta — Provider Mode Browser QA + Privacy Export Tests

- Added provider-mode browser QA and privacy export tests.

## v0.15.0-beta — Portable Account Mock Flow

- Added local portable-account/OAuth mock lifecycle without real OAuth credentials, raw tokens, or vendor dependency.

Public Demo boundary remains unchanged.
