# ADR-015 — Controlled Execution Candidate Gate

Status: accepted for v1.4.0-alpha.9 planning/control-plane implementation.

## Context

After the credential-boundary runtime drill, the project needs a deterministic gate that decides whether a future controlled execution design is ready to be considered. This milestone must not execute providers, fetch sources, use real credentials, expand backend/storage behavior, or imply publication permission.

## Decision

Add a no-execution controlled execution candidate gate. The gate assembles dependency evidence from the locked control-plane milestones, records manual operator preconditions, lists failure-to-enable reasons, and produces a dry candidate report.

The gate is explicitly not an execution authorization mechanism.

## Guardrails

- no live provider execution
- no live source fetching
- no real OAuth
- no real API keys
- no real token storage
- no backend expansion
- no storage expansion
- no automatic source verification
- no automatic signoff
- no automatic export lock
- no cryptographic signature claim
- no publication permission claim

## Consequences

Alpha.9 can report readiness for no-execution candidate review. Any later limited execution prototype must still pass a separate approval milestone and must not inherit authorization from this gate.
