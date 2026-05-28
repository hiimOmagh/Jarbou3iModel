# ADR-017 — Manual Execution Safety Cockpit + Session Ledger

Status: Accepted for v1.4.0-alpha.11

## Context

The project now has locked execution-control layers from alpha.6 through alpha.10. They prove mock-to-live planning equivalence, source acquisition controls, fake-secret credential boundaries, candidate-gate preconditions, and a disabled-by-default manual opt-in shell. The missing piece is an operator-facing safety cockpit that connects these layers into a session lifecycle without performing execution.

## Decision

Add a deterministic manual execution safety cockpit and safe session ledger. The cockpit exposes session states, manual preconditions, kill-switch and timeout drills, budget/request metadata, cross-layer continuity summaries, and no-execution fallback reasons.

The session ledger is safe metadata only. It may record state, summaries, failure reasons, and checksums. It must not record raw credentials, tokens, API keys, authorization headers, raw provider payloads, raw source fetch results, or browser/session secrets.

## Boundaries

This release does not enable default live execution, hidden network calls, real OAuth, API keys, token storage, credential persistence, backend/storage expansion, uncontrolled scraping, automatic source fetching, automatic source verification, provider-suggested source auto-acceptance, automatic signoff, automatic export lock, cryptographic signature claims, or publication permission claims.

## Consequences

Operators get a coherent simulation/control surface before any future execution adapter work. Future execution work must use a separate milestone and must not reinterpret this cockpit as authorization to run provider/source calls.
