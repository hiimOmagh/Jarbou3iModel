# QA Matrix

## v1.1.0-alpha.2 — Fixture Registry Payload Compression + Test Organization Audit

Release apply integrity gate for changed-files-only patch handoff. Artifact download success, screenshots alone, or ZIP existence alone are insufficient. Required validation: `npm run test:v126:no-browser`, `npm run test:ci:no-browser`, and `PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser`. No runtime/provider/OAuth/backend/source/storage/public-demo capability expansion.


## Current targeted gates

| Gate | Command | Purpose |
|---|---|---|
| Lockfile registry | `npm run test:lockfile:registry` | Confirms the lockfile uses the public npm registry. |
| CI workflow install | `npm run test:ci:workflow-install` | Confirms workflow-level install and `PLAYWRIGHT_SKIP_INSTALL=1` discipline. |
| Node 24 compatibility | `npm run test:ci:node24` | Confirms GitHub Actions Node 24 compatibility. |
| Browser visual scope | `npm run test:browser:visual-scope` | Confirms visual tests remain scoped and artifact-safe. |
| Source packet template browser QA | `npm run test:source:packet-template-browser-qa` | Confirms template browser QA/copy safety remains guarded. |
| Public demo release lock | `npm run test:public-demo-release-lock` | Confirms release approval boundaries and public-demo claims are locked. |
| v1.0.25 no-browser | `npm run test:v125:no-browser` | Runs the targeted v1.0.25 patch guard suite. |
| Full no-browser CI | `npm run test:ci:no-browser` | Runs the complete static/schema/privacy/release/source gates. |
| Browser CI | `PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser` | Runs browser suite after workflow-level Playwright installation. |

## Boundary assertions

- Manual/private mode remains default.
- No live scraping is added.
- No real OAuth or PKCE production path is added.
- No provider expansion is added.
- No backend endpoint expansion is added.
- No source connector expansion is added.
- Evidence upload does not equal release approval.
- Screenshots alone do not equal release approval.
- ZIP existence alone does not equal release approval.
- GitHub Actions status must be reviewed against the intended release commit SHA.
- Current-state documentation must not advertise stale or unavailable capabilities.

## Public Demo boundary

The public demo remains local/manual/private by default in v1.0.25. No live scraping, provider expansion, OAuth expansion, backend endpoint expansion, source connector expansion, storage behavior expansion, or automated source verification is introduced.

## Retained v1.0.23 audit boundary

- v1.0.23 — CI Result Review + Browser Evidence Artifact Audit remains the historical CI/browser evidence audit patch.
- Evidence upload is still inspection material, not release approval.

## Current release

- v1.0.25 — Public Demo Release Lock is the active public-demo approval gate.

- v1.1.0-alpha.8 — Fixture Registry Payload Compression + Test Organization Audit: audit-only fixture registry, no deletion, no runtime behavior change.


Evidence manifest continuity: v1.1.0-alpha.8 preserves the single final metadata hosted-demo evidence manifest gate.

Node 24 CI compatibility is preserved with actions/checkout@v6, actions/setup-node@v6, actions/upload-artifact@v6, npm ci --no-audit --no-fund --ignore-scripts, and PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser.
