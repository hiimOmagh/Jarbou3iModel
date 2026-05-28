# ADR-008 — Provider/Source Dry-Run Trace Inspector

**Status:** Proposed — deterministic review/control-plane only (v1.4.0-alpha.4)  
**Milestone:** v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report  
**Stable baseline:** v1.3.0 — Stable Manual Workflow Release  
**Dry-run baseline:** v1.4.0-alpha.3 — Provider/Source Dry-Run Execution Harness + Policy Simulator

## Decision

Add a deterministic trace inspector for provider/source dry-run traces. The inspector converts fixture-backed dry-run traces into review rows with level, state transition, failure contract, side-effect violation count, and operator-review requirements.

## Scope

Allowed:

- inspect deterministic dry-run traces;
- classify informational, review, and blocking trace states;
- expose side-effect violation counters;
- verify no live network, provider execution, source fetch, credential access, automatic verification, automatic signoff, or automatic export lock occurred;
- remain compatible with the alpha.3 dry-run harness.

Forbidden:

- live provider execution;
- live source fetching;
- production OAuth;
- backend/proxy runtime behavior expansion;
- persistent storage expansion;
- automatic verification or approval claims.

## Boundary flags

```text
runtime_capability_change: false
provider_behavior_changed: false
oauth_behavior_changed: false
backend_behavior_changed: false
source_behavior_changed: false
storage_behavior_changed: false
source_connector_behavior_changed: false
live_provider_execution_enabled: false
live_source_fetching_enabled: false
production_oauth_enabled: false
network_side_effects_allowed: false
trace_inspection_only: true
deterministic_fixture_backed: true
```

## Validation

```bash
node tests/provider-source-dry-run-trace-inspector-check.mjs
```
