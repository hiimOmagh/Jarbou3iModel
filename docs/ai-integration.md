# AI Integration Policy

## v1.1.0-alpha.10 — Hosted Evidence Capture Polish + Visual Artifact Guard

Release apply integrity gate for changed-files-only patch handoff. Artifact download success, screenshots alone, or ZIP existence alone are insufficient. Required validation: `npm run test:v126:no-browser`, `npm run test:ci:no-browser`, and `PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser`. No runtime/provider/OAuth/backend/source/storage/public-demo capability expansion.


## v1.0.25 — Public Demo Release Lock

This guide applies to v1.0.25 — Public Demo Release Lock.

## Current state: v1.1.0-alpha.10

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


Evidence manifest continuity: v1.1.0-alpha.10 preserves the single final metadata hosted-demo evidence manifest gate.
