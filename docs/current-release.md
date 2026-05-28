# Current Release

## v1.4.0-alpha.10 — Limited Manual Live-Execution Prototype

Status: built locally. Lock is pending green no-browser CI, green browser CI, hosted evidence, and canonical lock evidence bundle upload.

Public release label: v1.4.0-alpha.10 Limited Manual Live-Execution Prototype.

Last locked controlled execution candidate baseline: `v1.4.0-alpha.9 — Controlled Execution Candidate Gate`.
Last locked credential boundary baseline: `v1.4.0-alpha.8 — Credential Boundary Runtime Drill`.
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

Planning/control-plane only. Deterministic limited manual live-execution prototype shell:

- Disabled-by-default manual opt-in shell.
- Explicit operator opt-in precondition.
- Operator runtime abort acknowledgement.
- Operator cost and timeout acknowledgement.
- Ephemeral credential handoff flag without credential storage.
- Source-scope review without automatic source fetching.
- Provider-payload review without raw secrets.
- Failure UX review before any future manual attempt.
- Hard failure reasons when prerequisites are missing.
- Safe metadata-only output and checksum.
- Candidate gate continuity from alpha.9 remains preserved.
- Credential boundary runtime drill from alpha.8 remains preserved.
- Source acquisition control surface from alpha.7 remains preserved.
- Provider execution mock-to-live equivalence from alpha.6 remains preserved.
- Provider/source dry-run replay pack and operator approval simulation from alpha.5 remain preserved.
- Provider/source dry-run trace inspector and execution readiness report from alpha.4 remain preserved.
- Provider/source dry-run execution harness and policy simulator from alpha.3 remain preserved.
- Provider/source execution policy matrix and failure UX contracts from alpha.2 remain preserved.
- Provider execution threat model and preflight gate from alpha.1 remain preserved.

## Boundary flags

```text
manual_only_live_execution_prototype_shell: true
disabled_by_default: true
execution_enabled: false
can_execute_now: false
live_provider_execution_enabled: false
live_provider_execution_performed: false
live_source_fetching_enabled: false
live_source_fetching_performed: false
live_fetching_performed: false
hidden_network_calls_allowed: false
background_execution_allowed: false
real_oauth_enabled: false
production_oauth_enabled: false
real_api_keys_used: false
real_api_keys_stored: false
real_token_storage_enabled: false
credential_persistence_allowed: false
backend_behavior_changed: false
source_behavior_changed: false
storage_behavior_changed: false
automatic_source_fetching_enabled: false
automatic_source_verification_claimed: false
provider_suggested_sources_auto_accepted: false
automatic_signoff_performed: false
automatic_export_lock_performed: false
cryptographic_signature_claimed: false
publication_permission_claimed: false
safe_metadata_only: true
```

No real OAuth. No production OAuth. No real API keys. No real token storage. No credential persistence. No live scraping. No live source fetching. No automatic source fetching. No hidden background fetching. No hidden network calls. No provider execution expansion. No backend behavior expansion. No storage expansion. No automatic source verification. No provider-suggested source bypass. No automatic signoff. No automatic export lock. No cryptographic signature claim. No publication permission claim.

Screenshots alone are insufficient. A ZIP archive alone is insufficient.

## Validation

- Version: `1.4.0-alpha.10`
- Required targeted checks: `tests/limited-manual-live-execution-prototype-check.mjs`, `tests/controlled-execution-candidate-gate-check.mjs`, `tests/credential-boundary-runtime-drill-check.mjs`, `tests/source-acquisition-control-surface-check.mjs`, `tests/provider-execution-mock-to-live-equivalence-check.mjs`, `tests/provider-source-dry-run-replay-pack-check.mjs`, `tests/provider-source-operator-approval-simulation-check.mjs`.
- Required CI: `npm run test:ci:no-browser`, `npm run test:ci:browser`.

Feature surface is frozen except deterministic limited manual live-execution prototype shell artifacts; no live execution, live fetching, or real credential handling is enabled.

## Release Manifest Compatibility

Package: `jarbou3i-research-engine`
Version: `1.4.0-alpha.10`
Runtime capability change: no
Required browser gates before publishing: `npm run test:ci:browser`
Release archive exclusions: `node_modules/`, `playwright-report/`, `test-results/`, `*.zip`, `backend/.dev.vars`
Required cleanup commands: remove generated Playwright/test output before packaging.

Machine tokens: runtime_capability_change=false; release_type=limited-manual-live-execution-prototype; release_scope=manual-opt-in-shell-only; test:ci:browser required.
Node 24 CI compatibility preserved.
Release lock requires green no-browser CI, green browser CI, and reviewed hosted-demo evidence.
Planning gate continuity: apply integrity, changed-files-only patching, Package Script Compression, Version Suite Registry, Fixture Registry, and test organization checks remain active.
Public Demo boundary: v1.4.0-alpha.10 keeps the locked public demo/manual workflow behavior unchanged while adding deterministic limited manual live-execution prototype artifacts only.
