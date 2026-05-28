# ADR-006 — Provider/Source Dry-Run Execution Harness

**Status:** Proposed — deterministic control-plane only (v1.4.0-alpha.4)  
**Milestone:** v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report  
**Stable baseline:** v1.3.0 — Stable Manual Workflow Release  
**Control baseline:** v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report

## Decision

Introduce a deterministic dry-run execution harness for provider/source execution planning.

The harness simulates provider/source execution traces using local fixture definitions only. It records allowed manual/mock paths, blocked live-provider paths, blocked live-source paths, preflight failures, and credential-boundary violations before any side effect can occur.

## Required behavior

- No live provider call.
- No live source fetch.
- No production OAuth.
- No credential value read.
- No backend proxy live execution.
- No storage behavior expansion.
- No automatic source verification.
- No automatic signoff or export lock.
- Every blocked trace must include an operator message and failure contract identifier.

## Allowed dry-run traces

- manual source import simulation
- mock provider response simulation
- provider preflight planning simulation

## Blocked dry-run traces

- live provider execution
- live source fetching
- production OAuth
- backend proxy live execution
- unknown execution modes

## Non-decisions

This ADR does not enable live provider execution, live source acquisition, OAuth, backend behavior, storage behavior, cryptographic signing, or publication permission claims.

## Required gates

- `tests/provider-source-dry-run-execution-harness-check.mjs`
- `tests/provider-source-policy-simulator-check.mjs`
- `tests/provider-source-execution-policy-matrix-check.mjs`
- `tests/provider-source-failure-ux-contracts-check.mjs`
- `tests/provider-execution-preflight-check.mjs`
