## v1.0.21 — Node 24 CI Compatibility + Action Runtime Migration

- Migrated GitHub Actions workflow from Node 20-era action majors to Node 24-compatible action majors.
- Updated CI runtime pin from Node 20 to Node 24.
- Retained public npm lockfile registry validation before `npm ci`.
- Retained locked install path: `npm ci --no-audit --no-fund --ignore-scripts`.
- Retained one-time Playwright installation plus `PLAYWRIGHT_SKIP_INSTALL=1` browser CI behavior.
- Added Node 24 CI compatibility static guard and v1.0.21 no-browser suite.
- No live scraping, OAuth, provider, backend, or storage behavior expansion.

## v1.0.20 — Source Packet Template Browser QA + Copy Safety

- Added browser QA for Source Packet Template Presets.
- Added source packet template copy/export safety checks.
- Added static visual-project scope guard so desktop captures run only under `chromium` and mobile captures run only under `mobile-chrome`.
- Added v1.0.20 migration/privacy fixtures and v1.0.20 no-browser suite.
- Updated CI browser flow to honor `PLAYWRIGHT_SKIP_INSTALL=1` after workflow-level browser installation.
- Retained public npm lockfile registry validation before `npm ci`.
- Retained repository hygiene guards for stale orphan `XX*` files.

## v1.0.19 — Source Packet Template Presets

- Added local/manual source packet template presets for official reports, Reddit threads, YouTube transcripts, prediction markets, GitHub releases, and generic articles.
- Kept template output as drafting scaffolds, not verification.
- Added schema, fixtures, and no-browser checks for template preset boundaries.

## v1.0.18 — Source Packet Builder Export Roundtrip QA

- Added source packet export/import roundtrip checks.
- Preserved scoring metadata and queue-only import behavior.

## v1.0.17 — Source Packet Builder Browser QA + UX Tightening

- Added source packet builder browser QA and UX tightening.

## v1.0.16 — Source Packet Builder UI + Scoring Review Controls

- Added local/manual source packet builder output and scoring review controls.

## v1.0.15 — Evidence Scoring UI Explanation + Calibration Pass

- Added evidence scoring explanation and calibration guardrails.

## v1.0.14 — Evidence Scoring v1

- Added evidence scoring with attention/reliability separation.

- Public Demo boundaries remain unchanged: manual/private mode stays default and no fake-live source behavior is exposed.
