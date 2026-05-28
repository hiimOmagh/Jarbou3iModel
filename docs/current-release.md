# Current Release

## v1.4.0-alpha.11 — Manual Execution Safety Cockpit + Session Ledger

Status: built locally. Lock is pending green no-browser CI, green browser CI, hosted evidence, and canonical lock evidence bundle upload.

Public release label: v1.4.0-alpha.11 Manual Execution Safety Cockpit + Session Ledger.

Last locked manual opt-in shell baseline: `v1.4.0-alpha.10 — Limited Manual Live-Execution Prototype`.
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

Planning/control-plane only. Deterministic manual execution safety cockpit + session ledger:

- Session state machine with idle, preflight, operator review, armed, simulated running, abort, kill-switch, timeout, completed-no-execution, blocked, and failed-precondition states.
- Kill-switch drill and terminal-state rule: killed or timed-out sessions require a new session ID before re-arming.
- Cost, timeout, and request-budget guardrails as metadata only.
- Safe session ledger with summaries, failure reasons, no-execution report, and checksum.
- Forbidden ledger fields for raw credentials, raw tokens, raw API keys, authorization headers, raw provider payloads with secrets, raw source fetch results, and browser/session secrets.
- Cross-layer continuity from alpha.6 mock-to-live, alpha.7 source acquisition, alpha.8 credential drill, alpha.9 candidate gate, and alpha.10 manual opt-in shell.
- No-execution fallback report when prerequisites are incomplete.

## Boundary flags

```text
safety_cockpit_simulation_only: true
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
uncontrolled_scraping_enabled: false
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

- Version: `1.4.0-alpha.11`
- Required targeted checks: `tests/manual-execution-safety-cockpit-session-ledger-check.mjs`, `tests/limited-manual-live-execution-prototype-check.mjs`, `tests/controlled-execution-candidate-gate-check.mjs`, `tests/credential-boundary-runtime-drill-check.mjs`, `tests/source-acquisition-control-surface-check.mjs`, `tests/provider-execution-mock-to-live-equivalence-check.mjs`, `tests/provider-source-dry-run-replay-pack-check.mjs`, `tests/provider-source-operator-approval-simulation-check.mjs`.
- Required CI: `npm run test:ci:no-browser`, `npm run test:ci:browser`.

Feature surface is frozen except deterministic manual execution safety cockpit + session ledger artifacts; no live execution, live fetching, or real credential handling is enabled.

## Release Manifest Compatibility

Package: `jarbou3i-research-engine`
Version: `1.4.0-alpha.11`
Runtime capability change: no
Required browser gates before publishing: `npm run test:ci:browser`
Release archive exclusions: `node_modules/`, `playwright-report/`, `test-results/`, `*.zip`, `backend/.dev.vars`
Required cleanup commands: remove generated Playwright/test output before packaging.

Machine tokens: runtime_capability_change=false; release_type=manual-execution-safety-cockpit-session-ledger; release_scope=safety-cockpit-simulation-only; test:ci:browser required.
Node 24 CI compatibility preserved.
Release lock requires green no-browser CI, green browser CI, and reviewed hosted-demo evidence.
Planning gate continuity: apply integrity, changed-files-only patching, Package Script Compression, Version Suite Registry, Fixture Registry, and test organization checks remain active.
Public Demo boundary: v1.4.0-alpha.11 keeps the locked public demo/manual workflow behavior unchanged while adding deterministic safety cockpit/session-ledger artifacts only.
