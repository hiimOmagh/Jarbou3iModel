# Current Release

## v1.4.0-alpha.8 — Credential Boundary Runtime Drill

Status: built locally. Lock is pending green no-browser CI, green browser CI, hosted evidence, and canonical lock evidence bundle upload.

Public release label: v1.4.0-alpha.8 Credential Boundary Runtime Drill.

Last locked source acquisition baseline: `v1.4.0-alpha.7 — Source Acquisition Control Surface`.
Last locked mock-to-live baseline: `v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence`.
Last locked replay/approval baseline: `v1.4.0-alpha.5 — Dry-Run Replay Pack + Operator Approval Simulation`.
Last locked trace/readiness baseline: `v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report`.
Last locked dry-run baseline: `v1.4.0-alpha.3 — Provider/Source Dry-Run Execution Harness + Policy Simulator`.
Last locked policy/failure UX baseline: `v1.4.0-alpha.2 — Provider/Source Execution Policy Matrix + Failure UX Contracts`.
Locked preparation baseline: `v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation`.
Last locked stable baseline: `v1.3.0 — Stable Manual Workflow Release`.
Last locked RC baseline: `v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization`.
Manual workflow baseline: `v1.3.0-alpha.10 — Brief Publication Pack v4`. Do not patch locked baselines further.

## Scope

Planning/control-plane only. Deterministic credential boundary runtime drills:

- Fake secret injection drill.
- Export leak drill.
- Log leak drill.
- Browser-visible text leak drill.
- Fixture leak drill.
- Provider payload secret-boundary drill.
- Release bundle secret-boundary drill.
- Redaction reports and safe metadata-only outputs.
- Provider/source acquisition control surface from alpha.7 remains preserved.
- Provider execution mock-to-live equivalence from alpha.6 remains preserved.
- Provider/source dry-run replay pack and operator approval simulation from alpha.5 remain preserved.
- Provider/source dry-run trace inspector and execution readiness report from alpha.4 remain preserved.
- Provider/source dry-run execution harness and policy simulator from alpha.3 remain preserved.
- Provider/source execution policy matrix and failure UX contracts from alpha.2 remain preserved.
- Provider execution threat model and preflight gate from alpha.1 remain preserved.

## Boundary flags

```text
real_oauth_enabled: false
real_api_keys_used: false
real_token_storage_enabled: false
raw_token_exported: false
access_token_exported: false
refresh_token_exported: false
key_exported: false
secret_exported: false
credential_exported: false
live_fetching_performed: false
live_source_fetching_performed: false
source_fetching_performed: false
uncontrolled_scraping_performed: false
hidden_background_fetching_performed: false
provider_execution_performed: false
provider_behavior_changed: false
oauth_behavior_changed: false
backend_behavior_changed: false
source_behavior_changed: false
storage_behavior_changed: false
source_connector_behavior_changed: false
automatic_source_verification_claimed: false
provider_suggested_sources_auto_accepted: false
automatic_signoff_performed: false
automatic_export_lock_performed: false
cryptographic_signature_claimed: false
publication_permission_claimed: false
fake_secret_drill_only: true
redaction_required: true
```

No real OAuth. No production OAuth. No real API keys. No real token storage. No live scraping. No live source fetching. No hidden background fetching. No provider execution expansion. No backend behavior expansion. No storage expansion. No automatic source verification. No provider-suggested source bypass. No automatic signoff. No automatic export lock. No cryptographic signature claim. No publication permission claim.

Screenshots alone are insufficient. A ZIP archive alone is insufficient.

## Validation

- Version: `1.4.0-alpha.8`
- Required targeted checks: `tests/credential-boundary-runtime-drill-check.mjs`, `tests/source-acquisition-control-surface-check.mjs`, `tests/provider-execution-mock-to-live-equivalence-check.mjs`, `tests/provider-source-dry-run-replay-pack-check.mjs`, `tests/provider-source-operator-approval-simulation-check.mjs`.
- Required CI: `npm run test:ci:no-browser`, `npm run test:ci:browser`.

Feature surface is frozen except deterministic credential-boundary drill artifacts; no live execution, live fetching, or real credential handling is enabled.

## Release Manifest Compatibility

Package: `jarbou3i-research-engine`
Version: `1.4.0-alpha.8`
Runtime capability change: no
Required browser gates before publishing: `npm run test:ci:browser`
Release archive exclusions: `node_modules/`, `playwright-report/`, `test-results/`, `*.zip`, `backend/.dev.vars`
Required cleanup commands: remove generated Playwright/test output before packaging.

Machine tokens: runtime_capability_change=false; release_type=credential-boundary-runtime-drill; release_scope=fake-secret-boundary-drill-only; test:ci:browser required.
Node 24 CI compatibility preserved.
Release lock requires green no-browser CI, green browser CI, and reviewed hosted-demo evidence.
Planning gate continuity: apply integrity, changed-files-only patching, Package Script Compression, Version Suite Registry, Fixture Registry, and test organization checks remain active.
Public Demo boundary: v1.4.0-alpha.8 keeps the locked public demo/manual workflow behavior unchanged while adding deterministic credential-boundary drill artifacts only.
