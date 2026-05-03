# Architecture

## Current v1.0.24 pipeline

```text
Topic/context
→ Research Plan
→ Evidence Matrix
→ Evidence Review Queue
→ Source Packet Builder
→ Source Packet Template Presets
→ Causal Links
→ Analysis Brief Compiler
→ Provider Harness
→ Provider Response Validation
→ Controlled Repair Loop
→ Critique
→ Privacy Export Guard
→ Quality Gate
→ Export Pack
→ Hosted Demo Evidence Review
→ Release Hygiene Guard
```

## Provider architecture

Provider code is split into modules:

- `src/research/provider-identity.js`
- `src/research/portable-account-mock.js`
- `src/research/provider-core.js`
- `src/research/mock-provider.js`
- `src/research/openai-compatible-provider.js`
- `src/research/backend-proxy-provider.js`

The provider identity layer models `auth_type`, `billing_owner`, `key_exposure`, `privacy_mode`, `credential_class`, live support, and production status.

## Portable account mock

`portable_oauth` is not a real OAuth integration yet. It is a local simulation that creates safe account metadata:

- account ID
- token hash
- token expiry timestamp
- scopes
- spending limit metadata
- safety verdict

It never creates or exports a raw token.

## Source workflow boundary

The current source workflow is manual/import-first. Source packets, templates, and evidence review metadata are local drafting and organization structures. They do not perform live scraping and do not verify source truth.

## Backend layer

The Cloudflare Worker scaffold remains optional. The static app must remain functional without backend deployment.

## Release hygiene layer

v1.0.24 adds no runtime capability. It verifies that stale current-state documentation, generated artifacts, ZIPs, logs, test outputs, and secret-bearing local config files do not pollute the source/release boundary.
