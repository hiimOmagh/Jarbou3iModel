# ADR-014 — Credential Boundary Runtime Drill

Status: accepted for v1.4.0-alpha.8 planning/control-plane implementation.

## Context

The project is approaching controlled execution design but must prove credential-boundary discipline first. Earlier milestones locked source acquisition control, mock-to-live equivalence, dry-run replay, operator approval simulation, trace inspection, readiness reporting, policy matrices, and failure UX contracts without enabling live execution.

The remaining risk before controlled execution design is credential leakage across exports, logs, browser-visible text, fixtures, provider payloads, and release bundles.

## Decision

Add a deterministic credential boundary runtime drill that uses fake-secret vectors only. The drill validates redaction and safe metadata-only output across:

- fake secret injection
- export leak drill
- log leak drill
- browser-visible text leak drill
- fixture leak drill
- provider payload secret-boundary drill
- release bundle secret-boundary drill

The drill may include fake secret-like values as test vectors inside the local module, but outputs must redact them before export/report surfaces.

## Boundaries

The milestone does not enable:

- real OAuth
- real API keys
- real token storage
- live provider execution
- live source fetching
- backend expansion
- storage expansion
- automatic source verification
- automatic signoff
- automatic export lock
- cryptographic signature claim
- publication permission claim

## Acceptance

```bash
node tests/credential-boundary-runtime-drill-check.mjs
npm run test:ci:no-browser
npm run test:ci:browser
```

The canonical lock evidence bundle remains required before lock.
