# Architecture

## Current v1.0.25 pipeline

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
→ Public Demo Release Lock
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

`portable_oauth` is not a real OAuth integration yet. It is a local simulation that creates safe account metadata: account ID, token hash, token expiry timestamp, scopes, spending limit metadata, and safety verdict. It never creates or exports a raw token.

## Source workflow boundary

The current source workflow is manual/import-first. Source packets, templates, and evidence review metadata are local drafting and organization structures. They do not perform live scraping and do not verify source truth.

## Backend layer

The Cloudflare Worker scaffold remains optional. The static app must remain functional without backend deployment.

## Release lock layer

v1.0.25 adds no runtime capability. It locks public-demo release approval behind green CI, reviewed hosted-demo evidence, current public claims, privacy/export safety, and clean archive boundaries.
