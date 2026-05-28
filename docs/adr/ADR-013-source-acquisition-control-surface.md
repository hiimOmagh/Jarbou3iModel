# ADR-013 — Source Acquisition Control Surface

Status: accepted for v1.4.0-alpha.7 planning/control-plane implementation.

## Context

After `v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence`, the project needs a safer source acquisition control surface before any credential or execution work. The system must distinguish user-provided material, local imports, deterministic fixtures, provider-proposed-but-unfetched candidates, policy-blocked candidates, and future controlled fetch candidates.

## Decision

Add `src/research/source-acquisition-control-surface.js` as a deterministic control-plane module. It defines these acquisition modes:

- `manual_source`
- `imported_evidence`
- `fixture_source`
- `provider_proposed_source`
- `blocked_source`
- `future_controlled_fetch`

Each mode has explicit permission state, provenance state, review state, risk label, review-queue behavior, source-to-claim linkage requirement, source-gap warning behavior, and export eligibility boundary.

## Boundaries

This milestone does not enable:

- live scraping
- live source fetching
- hidden background fetching
- production OAuth
- backend behavior expansion
- storage expansion
- live provider execution
- automatic source verification
- provider-suggested source auto-acceptance
- automatic signoff
- automatic export lock
- cryptographic signature claims
- publication permission claims

Provider-suggested sources are unfetched suggestions. They can enter review only as candidates and cannot bypass operator review.

`future_controlled_fetch` is a disabled/future-gated state, not a live fetch capability.

## Consequences

The source layer now has an explicit pre-execution acquisition vocabulary. Later credential and controlled-execution milestones can test against these states instead of relying on vague source/import terminology.

## Validation

Required check:

```bash
node tests/source-acquisition-control-surface-check.mjs
```

Required release gates:

```bash
npm run test:ci:no-browser
npm run test:ci:browser
```
