# ADR-010 — Provider/Source Dry-Run Replay Pack

**Status:** Proposed — deterministic replay/control-plane only (v1.4.0-alpha.5)  
**Milestone:** v1.4.0-alpha.5 — Dry-Run Replay Pack + Operator Approval Simulation  
**Stable baseline:** v1.3.0 — Stable Manual Workflow Release  
**Trace/readiness baseline:** v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report

## Context

Alpha.4 made deterministic dry-run traces inspectable and exposed readiness blockers. The next control-plane need is a replay pack: a compact local bundle that lets an operator replay the dry-run evidence trail without re-running providers, fetching live sources, reading credentials, or asserting source verification.

## Decision

Add `providerSourceDryRunReplayPack` as a deterministic packaging layer. It consumes the dry-run harness, trace inspector, and execution readiness report, then emits replay items, review-required IDs, readiness summaries, and a non-cryptographic deterministic checksum.

## Boundaries

- `replay_pack_only: true`
- `deterministic_fixture_backed: true`
- `live_provider_execution_enabled: false`
- `live_source_fetching_enabled: false`
- `production_oauth_enabled: false`
- `automatic_source_verification_claimed: false`
- `automatic_signoff_performed: false`
- `automatic_export_lock_performed: false`
- `cryptographic_signature_claimed: false`
- `publication_permission_claimed: false`

The checksum is an integrity convenience for deterministic replay comparison. It is not a cryptographic signature and must not be described as one.

## Consequence

Operators can inspect repeatable dry-run replay items and readiness blockers before any future mock-to-live equivalence work. The release still cannot perform live execution or claim verified source truth.
