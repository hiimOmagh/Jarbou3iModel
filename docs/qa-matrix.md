# QA Matrix

| Version | Area | Primary gate | Purpose |
|---|---|---|---|
| v1.0.18 | Source Packet Builder Export Roundtrip QA | `npm run test:source:packet-roundtrip` | Verifies builder export, source-packet re-import, scoring-review preservation, queue-only discipline, and no-fetch/no-verification boundaries. |
| v1.0.17 | Source Packet Builder Browser QA + UX Tightening | `npm run test:source:packet-builder:browser-qa` + `npm run test:browser:source-packet-builder` | Verifies builder visibility, overflow safety, local/manual semantics, and copy/export control reachability. |
| v1.0.16 | Source Packet Builder UI + Scoring Review Controls | `npm run test:source:packet-builder` | Verifies local/manual source packet builder output and scoring review controls. |
| v1.0.15 | Evidence Scoring UI Explanation + Calibration Pass | `npm run test:evidence:calibration` | Verifies scoring interpretation and calibration guardrails. |
| v1.0.14 | Evidence Scoring v1 | `npm run test:evidence:scoring` | Verifies attention and reliability remain separate. |
| v1.0.13 | Manual Source Packet Import | `npm run test:source:packet` | Verifies manual source packet import into review queue. |
| v1.0.12 | Research Source Strategy Blueprint | `npm run test:source:capabilities` | Verifies source/auth/freshness/privacy/demo visibility registry. |
| v1.0.11 | Repository Hygiene + Stale Artifact Cleanup | `npm run test:repo:cleanup` | Verifies stale files, migration fixture drift, and release hygiene. |
| v1.0.10 | Module-Type Warning Fix | `npm run test:module-type-warning` | Verifies Worker smoke test has no module-type warning. |
| v1.0.9 | Hosted Demo Smoke Fixes + Evidence Review | `npm run test:hosted-demo:evidence-review` | Verifies hosted demo evidence review metadata. |
| v1.0.8 | Hosted Demo Deployment Verification + Browser Evidence Capture | `npm run test:browser:evidence` | Captures hosted demo browser evidence. |
| v1.0.7 | Public Demo Readiness + Release Notes Polish | `npm run test:public-demo` | Verifies demo honesty and release-note metadata. |
| v1.0.6 | Documentation + Release Packaging Cleanup | `npm run test:release-packaging` | Verifies release manifest, docs, and package hygiene. |
| v1.0.5 | Onboarding + First-Run Success | `npm run test:onboarding` | Verifies local-only first-run guide. |
| v1.0.4 | Browser QA + Visual Regression Hardening | `npm run test:browser:qa` | Verifies browser layout and visual capture. |
| v1.0.3 | Screen Discipline Patch | `npm run test:screen-discipline` | Verifies screen hierarchy and advanced panels. |
| v1.0.2 | UX Stabilization Patch | `npm run test:ux:stabilization` | Verifies workflow navigation and persistence. |
| v1.0.1 | Patch-only Stabilization | `npm run test:patch` | Verifies stable patch boundaries. |
| v1.0.0 | Stable Research Engine | `npm run test:stable` | Verifies stable release baseline. |
