# Current Release

## v1.4.0-alpha.14 — Adapter Replay Fixture Corpus + Coverage Matrix

Status: built locally. Lock is pending green no-browser CI, green browser CI, hosted evidence, and canonical lock evidence bundle upload.

Public release label: v1.4.0-alpha.14 Adapter Replay Fixture Corpus + Coverage Matrix.

Last locked adapter sandbox baseline: `v1.4.0-alpha.12 — Manual Provider Adapter Sandbox + Ephemeral Invocation Contract`.
Last locked safety cockpit baseline: `v1.4.0-alpha.11 — Manual Execution Safety Cockpit + Session Ledger`.
Last locked manual opt-in shell baseline: `v1.4.0-alpha.10 — Limited Manual Live-Execution Prototype`.
Last locked controlled execution candidate baseline: `v1.4.0-alpha.9 — Controlled Execution Candidate Gate`.
Last locked credential boundary baseline: `v1.4.0-alpha.8 — Credential Boundary Runtime Drill`.
Last locked source acquisition baseline: `v1.4.0-alpha.7 — Source Acquisition Control Surface`.
Last locked mock-to-live baseline: `v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence`.
Last locked stable baseline: `v1.3.0 — Stable Manual Workflow Release`.

## Scope

Planning/control-plane only. Deterministic adapter contract test bench + no-network invocation replay QA:

- Deterministic provider adapter fixtures for manual provider families.
- Request/response envelope diffing without raw request bodies, raw response bodies, authorization headers, or secret material.
- No-network invocation replay with provider call count and network request count fixed at zero.
- Adapter failure UX rehearsal for missing fixtures, missing replay acknowledgement, envelope mismatch, unsafe transcript comparison, and missing operator no-network boundary acknowledgement.
- Safe transcript comparison and safe metadata-only replay ledger with checksum.
- Cross-provider capability matrix that explicitly states live invocation is unsupported in this release.
- Continuity from alpha.12 adapter sandbox, alpha.11 safety cockpit, alpha.10 manual shell, alpha.9 candidate gate, alpha.8 credential drill, alpha.7 source acquisition, and alpha.6 mock-to-live equivalence.

## Boundary flags

```text
adapter_contract_test_bench_only: true
no_network_invocation_replay_qa_only: true
deterministic_fixtures_only: true
disabled_by_default: true
safe_metadata_only: true
live_provider_execution_enabled: false
live_provider_execution_performed: false
live_source_fetching_enabled: false
live_source_fetching_performed: false
hidden_network_calls_allowed: false
real_oauth_token_lifecycle_enabled: false
real_api_keys_stored: false
real_tokens_stored: false
credential_persistence_allowed: false
backend_behavior_changed: false
storage_behavior_changed: false
uncontrolled_scraping_enabled: false
automatic_source_verification_claimed: false
provider_suggested_source_auto_acceptance: false
automatic_signoff_performed: false
automatic_export_lock_performed: false
publication_permission_claimed: false
```

No real OAuth. No production OAuth. No real API keys. No real token storage. No credential persistence. No live scraping. No live source fetching. No automatic source fetching. No hidden background fetching. No hidden network calls. No provider execution expansion. No backend behavior expansion. No storage expansion. No automatic source verification. No provider-suggested source bypass. No automatic signoff. No automatic export lock. No cryptographic signature claim. No publication permission claim.

## Validation

- Version: `1.4.0-alpha.14`
- Required targeted checks: `tests/adapter-replay-fixture-corpus-coverage-matrix-check.mjs`, `tests/manual-provider-adapter-sandbox-ephemeral-invocation-contract-check.mjs`, `tests/manual-execution-safety-cockpit-session-ledger-check.mjs`, `tests/limited-manual-live-execution-prototype-check.mjs`, `tests/controlled-execution-candidate-gate-check.mjs`, `tests/credential-boundary-runtime-drill-check.mjs`, `tests/source-acquisition-control-surface-check.mjs`, `tests/provider-execution-mock-to-live-equivalence-check.mjs`.
- Required CI: `npm run test:ci:no-browser`, `npm run test:ci:browser`.

Feature surface is frozen except deterministic no-network adapter contract replay QA artifacts; no live execution, live fetching, or real credential handling is enabled.

Machine tokens: runtime_capability_change=false; release_type=adapter-replay-fixture-corpus-coverage-matrix; release_scope=adapter-replay-fixture-corpus-coverage-matrix-only; test:ci:browser required.
Node 24 CI compatibility preserved.
Release lock requires green no-browser CI, green browser CI, hosted-demo evidence, and canonical lock evidence bundle.

Full baseline repetition for release-truth checks: v1.4.0-alpha.12 — Manual Provider Adapter Sandbox + Ephemeral Invocation Contract; v1.4.0-alpha.11 — Manual Execution Safety Cockpit + Session Ledger; v1.4.0-alpha.10 — Limited Manual Live-Execution Prototype; v1.4.0-alpha.9 — Controlled Execution Candidate Gate; v1.4.0-alpha.8 — Credential Boundary Runtime Drill; v1.4.0-alpha.7 — Source Acquisition Control Surface; v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence; v1.4.0-alpha.5 — Dry-Run Replay Pack + Operator Approval Simulation; v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report; v1.4.0-alpha.3 — Provider/Source Dry-Run Execution Harness + Policy Simulator; v1.4.0-alpha.2 — Provider/Source Execution Policy Matrix + Failure UX Contracts; v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation; v1.3.0-alpha.10 — Brief Publication Pack v4.
A ZIP archive alone is insufficient.

Alpha.12 continuity repetition: ephemeral credential handoff; provider request-envelope preview; no-network dry invocation transcript; adapter failure taxonomy; safe request/response metadata ledger; ADR-018.
Alpha.11 continuity repetition: session state machine; kill-switch; timeout; budget; safe metadata-only session ledger; no-execution fallback; ADR-017.
Alpha.7 continuity repetition: manual_source; provider_proposed_source; future_controlled_fetch; ADR-013.

Additional lock markers for CI workflow quarantine:
live_fetching_performed: false
provider_execution_performed: false
Screenshots alone are insufficient.
green no-browser CI
green browser CI
reviewed hosted-demo evidence

Stable baseline repetition: v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization; v1.3.0-alpha.10 — Brief Publication Pack v4. No backend behavior expansion. No provider execution expansion.

Release manifest tokens for packaging checks:
package=jarbou3i-research-engine
version=1.4.0-alpha.14
runtime_capability_change=false
release_type=adapter-replay-fixture-corpus-coverage-matrix
release_scope=adapter-replay-fixture-corpus-coverage-matrix-only
test:ci:browser required
Planning gate continuity: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, apply integrity, and changed-files-only discipline remain preserved.

Public Demo evidence remains required for lock: hosted evidence, visible-label snapshots, browser log, Playwright setup logs, and canonical lock bundle must all remain aligned with v1.4.0-alpha.14.
