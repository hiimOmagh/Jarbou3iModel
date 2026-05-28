# ADR-018 — Manual Provider Adapter Sandbox + Ephemeral Invocation Contract

Status: accepted for v1.4.0-alpha.12 candidate build.

## Context

The locked alpha.6–alpha.11 chain established mock-to-live equivalence, source acquisition controls, credential boundary drills, a controlled execution candidate gate, a disabled-by-default manual opt-in shell, and a manual execution safety cockpit with safe session ledger. The next useful layer is a provider-adapter sandbox that lets operators inspect what a future manual invocation would look like without performing network activity or storing credentials.

## Decision

Add a no-network manual provider adapter sandbox with:

- ephemeral credential handoff contract without persistence;
- provider request-envelope preview;
- no-network dry invocation transcript;
- adapter failure taxonomy;
- safe request/response metadata ledger;
- hard boundary flags proving no live provider call, source fetch, OAuth/token lifecycle, credential persistence, backend/storage expansion, automatic verification, signoff, export lock, cryptographic signature, or publication permission claim.

## Consequences

The system can rehearse adapter semantics and operator review flow without crossing into real execution. Any later live adapter must be introduced through a separate milestone and must prove ephemeral handling, budget/timeout/kill-switch semantics, network visibility, source permissions, and release evidence before any default capability is considered.

## Non-goals

- No default live execution.
- No hidden network calls.
- No real OAuth/token lifecycle.
- No credential persistence.
- No live source fetching.
- No backend/storage expansion.
- No automatic source verification.
- No provider-suggested source auto-acceptance.
- No automatic signoff/export lock.
- No publication permission claim.
