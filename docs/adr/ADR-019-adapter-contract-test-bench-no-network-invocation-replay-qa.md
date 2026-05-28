# ADR-019 — Adapter Contract Test Bench + No-Network Invocation Replay QA

## Status

Accepted for v1.4.0-alpha.13.

## Context

The project now has a locked manual provider adapter sandbox and ephemeral invocation contract. Before any future live provider invocation is considered, adapter contracts need deterministic fixtures, request/response envelope diffing, no-network replay, adapter failure UX rehearsal, safe transcript comparison, and cross-provider capability mapping.

## Decision

Add a no-network adapter contract test bench that only produces metadata-safe replay QA artifacts. The bench remains disabled by default and never performs provider calls, source fetching, OAuth/token lifecycle work, credential persistence, backend/storage expansion, automatic verification, automatic signoff, export locking, or publication permission claims.

## Consequences

- Adapter compatibility can be tested without network execution.
- Request and response envelope shape drift can be detected deterministically.
- Adapter failure UX can be rehearsed before live execution exists.
- Replay transcripts and ledgers remain metadata-only.
- Future live execution remains blocked behind later explicit milestones.
