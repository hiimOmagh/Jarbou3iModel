# ADR-007 — Provider/Source Policy Simulator

**Status:** Proposed — deterministic control-plane only (v1.4.0-alpha.4)  
**Milestone:** v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report  
**Stable baseline:** v1.3.0 — Stable Manual Workflow Release  
**Control baseline:** v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report

## Decision

Introduce a side-effect-free provider/source policy simulator.

The simulator evaluates execution requests against the alpha.2 dry-run harness and policy simulator, returning deterministic allow/block decisions for manual, mock, live-provider, live-source, credential, and backend modes.

## Required behavior

- Manual source import may be allowed.
- Mock provider response may be allowed as local simulation only.
- Live provider execution must be blocked.
- Live source fetching must be blocked.
- Production OAuth must be blocked.
- Backend proxy live execution must be blocked.
- Unknown execution modes must be blocked by default.
- Every blocked decision must identify a failure contract and require a future gate.

## Non-decisions

This ADR does not change provider behavior, source behavior, OAuth behavior, backend behavior, storage behavior, or runtime capabilities.

## Required gates

- `tests/provider-source-policy-simulator-check.mjs`
- `tests/provider-source-dry-run-execution-harness-check.mjs`
- `tests/provider-source-execution-policy-matrix-check.mjs`
- `tests/provider-source-failure-ux-contracts-check.mjs`
