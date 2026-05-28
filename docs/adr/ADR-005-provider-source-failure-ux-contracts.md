# ADR-005 — Provider/Source Failure UX Contracts

**Status:** Proposed — planning/control-plane only (v1.4.0-alpha.3)  
**Milestone:** v1.4.0-alpha.3 — Provider/Source Dry-Run Execution Harness + Policy Simulator  
**Baseline:** v1.3.0 — Stable Manual Workflow Release  
**Preparation baseline:** v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation

## Decision

Every future provider/source execution path must have an operator-visible failure UX contract before it can be unlocked.

A failure contract defines:

- user-facing failure message
- operator action
- retry policy
- state transition
- credential/secret handling
- verification-claim boundary

## Required failure families

- provider timeout
- provider credential missing
- provider rate limit
- provider cost/token budget exceeded
- provider invalid response
- source fetch blocked by policy
- source rate limit
- credential boundary violation

## Mandatory behavior

- No silent failure.
- No automatic retry loop.
- No credential rendering.
- No provider output merged as verified evidence.
- No export if a credential boundary violation is detected.
- Manual workspace state must be preserved on recoverable failures.

## Non-decisions

This ADR does not enable live provider execution, live source fetching, OAuth, backend expansion, storage expansion, or automatic source verification.

## Required gates

- `tests/provider-source-failure-ux-contracts-check.mjs`
- `tests/provider-source-execution-policy-matrix-check.mjs`
- `tests/provider-execution-preflight-check.mjs`
- `tests/privacy-export-guard-check.mjs`
- `tests/publication-review-gate-check.mjs`
