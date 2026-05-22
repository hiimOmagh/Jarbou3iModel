# AI Integration Policy

## v1.1.0-alpha.21 — Evidence Workspace UX Hardening + Review Throughput

Release apply integrity gate for changed-files-only patch handoff. Artifact download success, screenshots alone, or ZIP existence alone are insufficient. Required validation: `npm run test:v126:no-browser`, `npm run test:ci:no-browser`, and `PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser`. No runtime/provider/OAuth/backend/source/storage/public-demo capability expansion.


## v1.0.25 — Public Demo Release Lock

This guide applies to v1.0.25 — Public Demo Release Lock.

## Current state: v1.1.0-alpha.21

The research engine supports four provider modes:

1. `mock` — deterministic local provider, no network.
2. `openai_compatible` — BYOK direct provider mode, live only with explicit opt-in.
3. `backend_proxy` — hosted proxy scaffold, live only with explicit opt-in.
4. `portable_oauth` — local portable-account mock flow; no real OAuth or live calls.

v1.0.25 does not expand provider behavior. It locks public-demo release approval while preserving the manual/private default, privacy/export boundary, and unavailable-feature discipline.

## Portable account mock flow

```text
Connect mock portable account
→ receive mock account metadata and token hash
→ optionally refresh mock token hash
→ run provider task through MockProvider while preserving portable-account metadata
→ export safe status without raw token
```

No real OAuth authorization endpoint is contacted. No access token or refresh token is generated. Only a mock token hash is stored in state and exports.

## Non-negotiable guardrails

- Manual/private mode remains first-class.
- No raw API key is exported.
- No raw OAuth token is exported.
- Portable-account live calls remain blocked.
- Hosted proxy secrets must stay server-side.
- AI output must pass response-contract validation before it can affect app state.
- Public-demo release approval requires CI and evidence review, not screenshots or ZIP existence alone.

## Future real OAuth integration requirements

Before adding a real portable account provider:

- OAuth Authorization Code + PKCE must be implemented correctly.
- Access tokens must never be exported in packets, reports, or ledgers.
- Token refresh must be explicit and auditable.
- Billing owner and spending control must be shown clearly.
- Provider terms, privacy, and reliability must be reviewed.


Evidence manifest continuity: v1.1.0-alpha.21 preserves the single final metadata hosted-demo evidence manifest gate.

Continuity note: Root Manifest and Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, changed-files-only discipline, no live scraping, No real OAuth, screenshots alone, hosted evidence, and ZIPs are not sufficient for release approval.


Continuity discipline: Root Manifest and Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, and changed-files-only discipline are preserved.


Release-lock guard: v1.1.0-alpha.21 Evidence Workspace UX Hardening + Review Throughput requires green no-browser CI, green browser CI, and reviewed hosted-demo evidence. Screenshots alone are insufficient. ZIP existence alone is insufficient. A local ZIP archive alone is insufficient.

Current release reference: v1.1.0-alpha.21 — Evidence Workspace UX Hardening + Review Throughput. release-lock evidence remains required.

Governance continuity: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, and changed-files-only discipline are preserved.

Provenance continuity: Package Script Compression, CI Gate Registry, Root Manifest, Release Artifact Consolidation, Migration + Privacy Fixture Registry Consolidation, Fixture Registry payload compression, test organization audit, provenance ledger, changed-files-only discipline, visual freeze, and mobile header continuity are preserved.
