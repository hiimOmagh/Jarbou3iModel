# Architecture

## v1.2.0-alpha.2 â€” Source-to-Brief Intelligence Workbench

Release apply integrity gate for changed-files-only patch handoff. Artifact download success, screenshots alone, or ZIP existence alone are insufficient. Required validation: `npm run test:v126:no-browser`, `npm run test:ci:no-browser`, and `PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser`. No runtime/provider/OAuth/backend/source/storage/public-demo capability expansion.


## Current v1.1.0 pipeline

```text
Topic/context
â†’ Research Plan
â†’ Evidence Matrix
â†’ Evidence Review Queue
â†’ Source Packet Builder
â†’ Source Packet Template Presets
â†’ Causal Links
â†’ Analysis Brief Compiler
â†’ Provider Harness
â†’ Provider Response Validation
â†’ Controlled Repair Loop
â†’ Critique
â†’ Privacy Export Guard
â†’ Quality Gate
â†’ Export Pack
â†’ Hosted Demo Evidence Review
â†’ Public Demo Release Lock
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


Evidence manifest continuity: v1.1.0 preserves the single final metadata hosted-demo evidence manifest gate.

Continuity note: Root Manifest and Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, changed-files-only discipline, no live scraping, No real OAuth, screenshots alone, hosted evidence, and ZIPs are not sufficient for release approval.


Continuity discipline: Root Manifest and Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, and changed-files-only discipline are preserved.


Release-lock guard: v1.2.0-alpha.2 Source-to-Brief Intelligence Workbench requires green no-browser CI, green browser CI, and reviewed hosted-demo evidence. Screenshots alone are insufficient. ZIP existence alone is insufficient. A local ZIP archive alone is insufficient.

Current release reference: v1.2.0-alpha.2 â€” Source-to-Brief Intelligence Workbench. release-lock evidence remains required.

Governance continuity: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, and changed-files-only discipline are preserved.

Provenance continuity: Package Script Compression, CI Gate Registry, Root Manifest, Release Artifact Consolidation, Migration + Privacy Fixture Registry Consolidation, Fixture Registry payload compression, test organization audit, provenance ledger, changed-files-only discipline, visual freeze, and mobile header continuity are preserved.

Release continuity note: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization, planning gate, apply integrity, and changed-files-only safeguards remain active.

Provenance ledger, changed-files-only, CI Gate Registry, Package Script Compression, Fixture Registry payload compression, visual freeze, and mobile header release safeguards remain active.

No live scraping. No real OAuth or production OAuth is enabled. Screenshots alone, ZIP existence alone, and ZIP archive alone are insufficient for release approval.
