# ADR-012 — Provider Execution Mock-to-Live Equivalence

**Status:** Proposed — deterministic equivalence/control-plane only (v1.4.0-alpha.6)  
**Milestone:** v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence  
**Replay/approval baseline:** v1.4.0-alpha.5 — Dry-Run Replay Pack + Operator Approval Simulation

## Context

v1.4.0-alpha.5 produced deterministic replay-pack and operator-approval simulation artifacts. Those artifacts are useful only if a future live execution path cannot silently diverge from the dry-run path in payload shape, policy decisions, failure UX, readiness blockers, or approval boundaries.

The risk is premature live-provider or live-source execution disguised as an equivalence test. Therefore alpha.6 defines planned future-live envelopes as inert planning artifacts only.

## Decision

Add a deterministic mock-to-live equivalence layer that compares dry-run replay items against inert future-live execution envelopes.

The equivalence layer must validate:

- payload-shape equivalence;
- policy-boundary preservation;
- failure-contract mapping;
- execution-readiness blocker preservation;
- operator-approval boundary preservation;
- absence of credential values, raw tokens, secrets, network invocation, provider execution, source fetching, automatic source verification, automatic signoff, automatic export lock, cryptographic-signature claims, and publication-permission claims.

## Boundary

The planned future-live envelope is not a live execution request.

It must keep these flags false:

```text
live_provider_execution_enabled
live_source_fetching_enabled
production_oauth_enabled
provider_execution_performed
source_fetch_performed
credential_read_attempted
automatic_source_verification_claimed
automatic_signoff_performed
automatic_export_lock_performed
cryptographic_signature_claimed
publication_permission_claimed
```

It may keep these flags true:

```text
mock_to_live_equivalence_only
future_live_envelope_only
deterministic_fixture_backed
```

## Consequences

- Future live execution cannot be introduced by changing only UI copy or operator approval simulation.
- Any future provider/source execution milestone must pass through the equivalence layer first.
- A simulated approval remains review metadata only and cannot authorize live provider execution, live source fetching, credential access, export lock, or publication.
- The non-cryptographic checksum is an integrity aid only. It is not a signature.

## Rejection conditions

This ADR is violated if:

- any equivalence envelope contains raw credentials, tokens, API keys, or authorization headers;
- any equivalence envelope performs or authorizes a network request;
- any simulated approval becomes a live authorization;
- any report claims automatic source verification, automatic signoff, automatic export lock, cryptographic signing, or publication permission;
- any source or provider is fetched/executed outside a future explicitly approved milestone.
