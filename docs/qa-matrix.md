## v1.0.13 — Manual Source Packet Import

| Gate | Command | Purpose |
|---|---|---|
| Source packet import | `npm run test:source:packet` | Verifies structured manual source packet JSON import with no live fetching or verification claims. |
| v1.0.13 no-browser | `npm run test:v113:no-browser` | Runs the stable no-browser suite plus the v1.0.13 packet-import gate. |

## v1.0.12 — Research Source Strategy Blueprint

| Gate | Command | Purpose |
|---|---|---|
| Source capability registry | `npm run test:source:capabilities` | Verifies availability/auth/freshness/privacy/demo visibility contracts without enabling live source behavior. |
| v1.0.12 no-browser | `npm run test:v112:no-browser` | Runs the stable no-browser suite plus the v1.0.12 registry gate. |

# QA Matrix

## Core no-browser gates

| Gate | Command | Purpose |
|---|---|---|
| QA aggregate | `npm run test:qa` | Runs core static, schema, fixture, workflow, privacy, migration, module, workspace, template, quality, export, backend, browser-hardening, onboarding, and release-packaging checks. |
| Static | `npm run test:static` | Checks syntax, required files, DOM IDs, legacy tokens, and version metadata. |
| Schema | `npm run test:schema` | Validates strategic-analysis and research-workflow schema structure. |
| Fixtures | `npm run test:fixtures` | Validates sample strategic-analysis fixtures. |
| Research workflow | `npm run test:research` | Validates the canonical research workflow fixture. |
| Accessibility static | `npm run test:a11y:static` | Runs static accessibility checks. |

## Privacy/export gates

| Gate | Command | Purpose |
|---|---|---|
| Privacy guard | `npm run test:privacy:guard` | Checks export guard behavior. |
| Privacy export | `npm run test:privacy:export` | Audits export/provider/privacy JSON candidates. |
| Privacy audit | `npm run test:privacy:audit` | Verifies redaction and audit release gate behavior. |
| Privacy bundle | `npm run test:privacy` | Runs all privacy gates. |
| Export Pack v2 | `npm run test:export-pack` | Validates structured export bundle artifacts. |

## Provider/source/backend gates

| Gate | Command | Purpose |
|---|---|---|
| Provider bundle | `npm run test:provider` | Checks provider identity, portable mock, OAuth spike, response contracts, and fixtures. |
| Source bundle | `npm run test:source` | Checks source planning, source import, review queue, GitHub connector, and web-search abstraction. |
| Backend bundle | `npm run test:backend` | Checks hosted proxy contract, hardening, and Worker smoke tests. |

## Stable patch gates

| Version | Gate | Command | Purpose |
|---|---|---|---|
| v1.0.1 | Patch-only stabilization | `npm run test:patch` | Ensures stable patch boundaries remain active. |
| v1.0.2 | UX stabilization | `npm run test:ux:stabilization` | Verifies workflow navigation and collapsed advanced hierarchy. |
| v1.0.3 | Screen discipline | `npm run test:screen-discipline` | Verifies compact screen hierarchy and no duplicate command surfaces. |
| v1.0.4 | Browser QA hardening | `npm run test:browser:qa` | Runs provider, layout, and visual browser gates. |
| v1.0.5 | Onboarding | `npm run test:onboarding` | Verifies first-run guide and export-safe onboarding metadata. |
| v1.0.6 | Release packaging | `npm run test:release-packaging` | Verifies corrected release labels, manifest, archive hygiene, and current snapshots. |
| v1.0.7 | Public demo readiness | `npm run test:public-demo` | Verifies public demo metadata, release notes, first-screen demo panel, and unchanged runtime boundaries. |
| v1.0.8 | Hosted demo verification | `npm run test:hosted-demo` | Verifies hosted-demo verification metadata, browser evidence capture metadata, and unchanged runtime boundaries. |
| v1.0.9 | Hosted demo evidence review | `npm run test:hosted-demo:evidence-review` | Verifies hosted URL routing, stable evidence artifacts, metadata snapshot contract, and evidence-review release gate. |
| v1.0.10 | Module type warning fix | `npm run test:module-type-warning` | Verifies package-level ESM mode and warning-clean backend Worker smoke validation. |
| v1.0.11 | Repository Hygiene + Stale Artifact Cleanup | `npm run test:repo:cleanup` | Verifies stale-artifact gates, release drift checks, and migration fixture coverage. |

## Browser gates

| Gate | Command | Purpose |
|---|---|---|
| Provider browser QA | `npm run test:browser:provider` | Validates provider UI flows. |
| Layout persistence | `npm run test:browser:layout` | Checks overflow and tab/collapse persistence across viewports. |
| Visual capture | `npm run test:browser:visual` | Captures screenshots as CI artifacts. |
| Hosted demo evidence | `npm run test:browser:evidence` | Captures hosted-demo screenshots and writes `hosted-demo-metadata.json`. |
| Strict visual baseline | `npm run test:browser:visual:strict` | Enforces approved Playwright baselines. |
| Full browser suite | `npm run test:browser` | Runs all Playwright tests. |

## Current release gates

```bash
npm run test:v113:no-browser
npm run test:source:packet
npm run test:ci:no-browser
npm run test:ci:browser
```

Public Demo boundary remains unchanged.
