# Source-File Refactor Readiness Audit

Version: `1.1.0-alpha.11`
Release: `v1.1.0-alpha.11 — Fixture/Test Debt Ledger + Source-File Refactor Readiness Audit`
Mode: audit-only, no source-file refactor yet.

## Files under observation

| File | Current role | Refactor pressure | Safe future seam | Forbidden in alpha.11 |
| --- | --- | --- | --- | --- |
| `src/app.js` | Client-side UI orchestration, i18n, import/repair flow, rendering glue. | Large file with mixed UI state, copy, prompt generation, validation, and rendering behavior. | Extract i18n/copy catalog, prompt builder, JSON import validation, and render sections behind behavior-preserving adapters. | No behavioral split, no new state model, no new feature path. |
| `src/research-engine.js` | Research workflow module composition and browser integration. | High coupling across planning, evidence, provider, scoring, export, and diagnostics surfaces. | Extract module adapters only after golden fixture snapshots and browser evidence baselines are locked. | No module split in alpha.11. |
| `src/styles.css` | Full visual system, responsive layout, RTL/mobile behavior, evidence/export panels. | Large visual surface with release-frozen public-demo constraints. | Introduce token/component sections only after visual regression baselines are expanded. | No redesign, no layout behavior change, no visual freeze violation. |

## Readiness gates before any future refactor

- Golden fixture kit for import/export, provider, source packet, and evidence review flows.
- Browser evidence baselines for desktop, mobile, provider mode, quality/export, RTL, and accessibility smoke.
- One-file-at-a-time refactor plan with measurable equivalence checks.
- Rollback condition: any schema, privacy, provider, OAuth, backend, source, storage, browser layout, or hosted evidence regression.

## Disproven if

This audit is invalid if alpha.11 changes runtime behavior, reorganizes source modules, weakens CSS visual freeze rules, deletes fixture coverage, or treats documentation/readiness as an implementation approval.
