# QA Matrix

## Core no-browser gates

| Gate | Command | Purpose |
|---|---|---|
| QA aggregate | `npm run test:qa` | Runs core static, schema, fixture, workflow, privacy, migration, module, workspace, template, quality, export, backend, browser-hardening, onboarding, release-packaging, and evidence-scoring checks. |
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
| Source bundle | `npm run test:source` | Checks source planning, source import, source packets, evidence scoring, review queue, GitHub connector, and web-search abstraction. |
| Backend bundle | `npm run test:backend` | Checks hosted proxy contract, hardening, and Worker smoke tests. |

## Stable patch gates

| Version | Gate | Command | Purpose |
|---|---|---|---|
| v1.0.10 | Module type warning fix | `npm run test:module-type-warning` | Verifies package-level ESM mode and warning-clean backend Worker smoke validation. |
| v1.0.11 | Repository hygiene cleanup | `npm run test:repo:cleanup` | Verifies stale-artifact gates, release drift checks, and migration fixture coverage. |
| v1.0.12 | Source capability registry | `npm run test:source:capabilities` | Verifies source availability/auth/freshness/privacy/demo contracts without enabling live source behavior. |
| v1.0.13 | Manual source packet import | `npm run test:source:packet` | Verifies structured manual source packet import with no live fetching or verification claims. |
| v1.0.15 | Evidence Scoring UI Explanation + Calibration Pass | `npm run test:evidence:scoring` | Verifies reliability, attention, traceability, contradiction value, synthesis weight, and attention-not-truth guardrails. |

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
npm run test:evidence:scoring
npm run test:v114:no-browser
npm run test:ci:no-browser
npm run test:ci:browser
```

Public Demo boundary remains unchanged: use manual/mock mode unless browser QA and release gates pass.
