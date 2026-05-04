# Roadmap

## v1.0.29 — Final Public Demo Hardening / Release Freeze Audit

Release apply integrity gate for changed-files-only patch handoff. Artifact download success, screenshots alone, or ZIP existence alone are insufficient. Required validation: `npm run test:v126:no-browser`, `npm run test:ci:no-browser`, and `PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser`. No runtime/provider/OAuth/backend/source/storage/public-demo capability expansion.


## Phase 0 — Stabilize release evidence before new features

| Stage | Version | Title | Status |
|---|---:|---|---|
| Current patch | `v1.0.29` | **Final Public Demo Hardening / Release Freeze Audit** | Current |
| Previous patch | `v1.0.25` | **Public Demo Release Lock** | Completed |
| Previous patch | `v1.0.24` | **Repo Hygiene Execution + Stale Documentation Correction** | Completed |
| Next capability jump | `v1.1.0` | **Controlled Source Workflow MVP** | Only after QA/release stability |
| Blocked | — | Live scraping, production OAuth, BrainLink/OpenRouter PKCE, new live connectors, provider behavior changes | Explicitly blocked |

### `v1.0.25 — Public Demo Release Lock`

Purpose: make the current stable/manual/private public demo releasable without overstating capability.

Must do:

- verify no-browser CI is green;
- verify browser CI is green;
- verify hosted-demo evidence is reviewed;
- verify public-demo claims match available features;
- verify manual/private mode remains default;
- verify exports preserve privacy and credential redaction;
- verify release archive hygiene;
- explicitly block approval from screenshots or ZIP existence alone.

Acceptance gate:

```bash
npm run test:public-demo-release-lock
npm run test:v125:no-browser
npm run test:ci:no-browser
PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser
```

Expected result: public demo can be published only from the intended release commit with green CI, reviewed evidence, aligned claims, and clean release boundaries.

### `v1.0.24 — Repo Hygiene Execution + Stale Documentation Correction`

Status: completed.

Purpose: execute cleanup that was documented but still needed Git-level and documentation-state verification.

Completed outcomes:

- stale current-state docs corrected;
- v1.0.24 fixtures added;
- stale generated artifacts and secret-bearing files kept outside the release tree;
- historical v1.0.23 release docs and fixtures preserved;
- release archive boundary verified.

## Boundary assertions

- Manual/private mode remains default.
- No live scraping is added.
- No real OAuth or PKCE production path is added.
- No provider expansion is added.
- No backend endpoint expansion is added.
- No source connector expansion is added.
- Evidence upload does not equal release approval.
- GitHub Actions status must be reviewed against the intended release commit SHA.
- Current-state documentation must not advertise stale or unavailable capabilities.

## CI baseline

Node 24 remains the GitHub Actions runtime baseline for v1.0.25.

## Retained v1.0.23 audit boundary

- v1.0.23 — CI Result Review + Browser Evidence Artifact Audit remains the historical CI/browser evidence audit patch.
- Evidence upload is still inspection material, not release approval.


### `v1.0.29 — Final Public Demo Hardening / Release Freeze Audit`

Purpose: changed-files-only patch apply verification before capability expansion.
