# ADR-011 — Provider/Source Operator Approval Simulation

**Status:** Proposed — deterministic approval-state simulation only (v1.4.0-alpha.6)  
**Milestone:** v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence  
**Stable baseline:** v1.3.0 — Stable Manual Workflow Release  
**Replay baseline:** ADR-010 provider/source dry-run replay pack

## Context

A replay pack is useful only if the operator can see how replay items would flow through an approval queue. The approval surface must stay simulated because the project has not approved live provider/source execution, production OAuth, backend expansion, export locking, cryptographic signing, or publication permission.

## Decision

Add `providerSourceOperatorApprovalSimulation`. It classifies replay items into:

- simulated approved for replay review,
- simulated held for operator review,
- simulated rejected for live execution.

The simulation records decision state and rationale while keeping every live authorization false.

## Boundaries

- `operator_approval_simulation_only: true`
- `real_operator_signoff_performed: false`
- `export_lock_performed: false`
- `live_provider_execution_enabled: false`
- `live_source_fetching_enabled: false`
- `production_oauth_enabled: false`
- `automatic_signoff_performed: false`
- `automatic_export_lock_performed: false`
- `cryptographic_signature_claimed: false`
- `publication_permission_claimed: false`

A simulated approval is not a real signoff, not a provider/source execution authorization, not an export lock, and not publication permission.

## Consequence

The operator gets a deterministic rehearsal of approval behavior while the actual execution boundary remains unchanged.
