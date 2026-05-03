# QA Matrix

## v1.0.24 — Repo Hygiene Execution + Stale Documentation Correction

| Gate | Command | Purpose |
|---|---|---|
| Lockfile registry | `npm run test:lockfile:registry` | Confirms `package-lock.json` uses public npm registry URLs. |
| Workflow install | `npm run test:ci:workflow-install` | Confirms deterministic `npm ci` path and Node 24 runtime pin. |
| Node 24 compatibility | `npm run test:ci:node24` | Confirms Node 24-compatible action majors and no stale Node 20/22 escape hatches. |
| Release evidence | `npm run test:release:evidence` | Confirms release evidence and repository hygiene guard remains intact. |
| CI result review | `npm run test:ci:result-review` | Confirms browser evidence boundary and public-repo alignment warning remain documented. |
| Repo hygiene execution | `npm run test:repo:hygiene-execution` | Confirms stale docs are corrected and generated artifacts remain outside the committed/release tree. |
| v1.0.24 no-browser | `npm run test:v124:no-browser` | Runs the targeted v1.0.24 patch guard suite. |
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
- GitHub Actions status must be reviewed against the intended release commit SHA.
- Current-state documentation must not advertise stale or unavailable capabilities.

## Public Demo boundary

The public demo remains local/manual/private by default in v1.0.24. No live scraping, provider expansion, OAuth expansion, backend endpoint expansion, source connector expansion, or storage behavior expansion is introduced.

## Retained v1.0.23 audit boundary

- v1.0.23 — CI Result Review + Browser Evidence Artifact Audit remains the historical CI/browser evidence audit patch.
- `npm run test:ci:result-review` verifies that this audit boundary remains documented while v1.0.24 handles repository hygiene.
