# QA Matrix

## v1.0.21 — Node 24 CI Compatibility + Action Runtime Migration

| Gate | Command | Purpose |
|---|---|---|
| Lockfile registry | `npm run test:lockfile:registry` | Confirms `package-lock.json` uses public npm registry URLs. |
| Workflow install | `npm run test:ci:workflow-install` | Confirms deterministic `npm ci` path and Node 24 runtime pin. |
| Node 24 compatibility | `npm run test:ci:node24` | Confirms Node 24-compatible action majors and no stale Node 20 escape hatches. |
| v1.0.21 no-browser | `npm run test:v121:no-browser` | Runs the targeted v1.0.21 patch guard suite. |
| Full no-browser CI | `npm run test:ci:no-browser` | Runs the complete static/schema/privacy/release/source gates. |
| Browser CI | `PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser` | Runs browser suite after workflow-level Playwright installation. |

## Boundary assertions

- Manual/private mode remains default.
- No live scraping is added.
- No real OAuth or PKCE is added.
- No provider expansion is added.
- No backend endpoint expansion is added.

## Public Demo boundary

The public demo remains local/manual/private by default in v1.0.21. No live scraping, provider expansion, OAuth expansion, or backend endpoint expansion is introduced.
