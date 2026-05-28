# ADR-004 — Provider/Source Execution Policy Matrix

**Status:** Proposed — planning/control-plane only (v1.4.0-alpha.4)  
**Milestone:** v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report  
**Baseline:** v1.3.0 — Stable Manual Workflow Release  
**Preparation baseline:** v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation

## Decision

Define a provider/source execution policy matrix before any live provider call, live source fetch, production OAuth, backend execution path, or storage behavior expansion is enabled.

The matrix is a control-plane artifact. It declares which execution modes are currently allowed, blocked, or planning-only. It does not execute network calls and does not alter runtime provider/source behavior.

## Current allowed states

- Manual source import remains allowed.
- Mock provider responses remain allowed.
- Provider dry-run preflight remains allowed as planning-only.

## Current blocked states

- Live provider execution.
- Live source fetching.
- Production OAuth.
- Backend proxy live execution.

## Unlock requirements

A future milestone may only unlock live behavior after explicit implementation of:

- provider execution preflight pass
- credential boundary runtime drill
- cost and timeout controls
- failure UX contracts
- mock-to-live equivalence tests
- source acquisition allowlist and rate limits
- CI boundary flags deliberately changed and reviewed

## Non-decisions

This ADR does not enable live provider execution, live source fetching, OAuth, backend expansion, storage expansion, or automatic source verification.

## Required gates

- `tests/provider-source-execution-policy-matrix-check.mjs`
- `tests/provider-execution-threat-model-check.mjs`
- `tests/provider-execution-preflight-check.mjs`
- `tests/privacy-export-guard-check.mjs`
- `tests/publication-review-gate-check.mjs`
