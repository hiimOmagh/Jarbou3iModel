# Current Release

## v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence

Status: built locally. Lock is pending green no-browser CI, green browser CI, hosted evidence, and canonical lock evidence bundle upload.

Public release label: v1.4.0-alpha.6 Provider Execution Harness Mock-to-Live Equivalence.

Last locked replay/approval baseline: `v1.4.0-alpha.5 — Dry-Run Replay Pack + Operator Approval Simulation`.
Last locked trace/readiness baseline: `v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report`.
Last locked dry-run baseline: `v1.4.0-alpha.3 — Provider/Source Dry-Run Execution Harness + Policy Simulator`.
Last locked policy/failure UX baseline: `v1.4.0-alpha.2 — Provider/Source Execution Policy Matrix + Failure UX Contracts`.
Locked preparation baseline: `v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation`.
Last locked stable baseline: `v1.3.0 — Stable Manual Workflow Release`.
Last locked RC baseline: `v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization`.
Manual workflow baseline: `v1.3.0-alpha.10 — Brief Publication Pack v4`. Do not patch locked baselines further.

## Scope

Planning/preflight only. Deterministic planning/control-plane only:

- Provider execution mock-to-live equivalence report.
- Planned future-live envelope shape validation.
- Payload-shape comparison between dry-run replay items and future-live envelopes.
- Policy-boundary, failure-contract, readiness-blocker, and operator-approval boundary preservation checks.
- ADR-012 provider execution mock-to-live equivalence.
- Provider/source dry-run replay pack from alpha.5 remains preserved.
- Provider/source operator approval simulation from alpha.5 remains preserved.
- Provider/source dry-run trace inspector from alpha.4 remains preserved.
- Provider/source execution readiness report from alpha.4 remains preserved.
- Provider/source dry-run execution harness from alpha.3 remains preserved.
- Provider/source policy simulator from alpha.3 remains preserved.
- Provider/source execution policy matrix from alpha.2 remains preserved.
- Provider/source failure UX contracts from alpha.2 remains preserved.
- Provider execution threat model from alpha.1 remains preserved.
- Provider execution preflight gate from alpha.1 remains preserved.

## Boundary flags

```text
live_fetching_performed: false
live_source_fetching_performed: false
provider_execution_performed: false
provider_behavior_changed: false
oauth_behavior_changed: false
backend_behavior_changed: false
source_behavior_changed: false
storage_behavior_changed: false
source_connector_behavior_changed: false
automatic_source_verification_claimed: false
automatic_signoff_performed: false
automatic_export_lock_performed: false
cryptographic_signature_claimed: false
publication_permission_claimed: false
operator_approval_simulation_only: true
replay_pack_only: true
mock_to_live_equivalence_only: true
future_live_envelope_only: true
```

No live scraping. No live source fetching. No provider execution expansion. No production OAuth. No backend behavior expansion. No storage expansion. No automatic source verification. No automatic signoff. No automatic export lock. No cryptographic signature claim. No publication permission claim.

Screenshots alone are insufficient. A ZIP archive alone is insufficient.

## Validation

- Version: `1.4.0-alpha.6`
- Required targeted checks: `tests/provider-execution-threat-model-check.mjs`, `tests/provider-execution-preflight-check.mjs`, `tests/provider-source-execution-policy-matrix-check.mjs`, `tests/provider-source-failure-ux-contracts-check.mjs`, `tests/provider-source-dry-run-execution-harness-check.mjs`, `tests/provider-source-policy-simulator-check.mjs`, `tests/provider-source-dry-run-trace-inspector-check.mjs`, `tests/provider-source-execution-readiness-report-check.mjs`, `tests/provider-source-dry-run-replay-pack-check.mjs`, `tests/provider-source-operator-approval-simulation-check.mjs`, `tests/provider-execution-mock-to-live-equivalence-check.mjs`.
- Required CI: `npm run test:ci:no-browser`, `npm run test:ci:browser`.

Feature surface is frozen except deterministic planning/control-plane artifacts; no live execution is enabled.

## Release Manifest Compatibility

Package: `jarbou3i-research-engine`
Version: `1.4.0-alpha.6`
Runtime capability change: no
Required browser gates before publishing: `npm run test:ci:browser`
Release archive exclusions: `node_modules/`, `playwright-report/`, `test-results/`, `*.zip`, `backend/.dev.vars`
Required cleanup commands: remove generated Playwright/test output before packaging.

Machine tokens: runtime_capability_change=false; release_type=provider-execution-harness-mock-to-live-equivalence; release_scope=deterministic-planning-control-plane-only; test:ci:browser required.
Node 24 CI compatibility preserved.
Release lock requires green no-browser CI, green browser CI, and reviewed hosted-demo evidence.
Planning gate continuity: apply integrity, changed-files-only patching, Package Script Compression, Version Suite Registry, Fixture Registry, and test organization checks remain active.
Public Demo boundary: v1.4.0-alpha.6 keeps the locked public demo/manual workflow behavior unchanged while adding deterministic mock-to-live equivalence validation only.
