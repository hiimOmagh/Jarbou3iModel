# ADR-003: Credential Boundary

**Status:** Proposed — planning-gate only (v1.4.0-alpha.3)
**Milestone:** v1.4.0-alpha.3 — Provider/Source Dry-Run Execution Harness + Policy Simulator
**Date:** 2026-05-25
**Boundary:** No credential handling added by this ADR. This records the constraint contract that future implementation must satisfy.

---

## Context

When live provider execution is eventually enabled, the app will need to accept and use API credentials (API keys, tokens). The credential boundary defines what is and is not permitted at every observable surface. A violation of this boundary — even a momentary one — constitutes a security incident.

---

## Decision

The following credential boundary rules are mandatory for any future implementation milestone that introduces credential handling:

### What is never permitted

| Prohibited action | Surface |
|---|---|
| Raw API key in any export | JSON export, Markdown export, clipboard |
| Raw API key in localStorage | Any key |
| Raw API key in DOM | Any element, attribute, or data property |
| Raw API key in console output | Any log level |
| Raw token in any of the above | Same as API key |
| Raw refresh token in any of the above | Same as API key |
| Credential in URL query string | Any URL |
| Credential in HTTP request body logged to console | Any request |

### What is permitted

| Permitted action | Constraint |
|---|---|
| Hashed/masked credential in UI | Display only — `sha256(key).slice(0,8)` or `****{last4}` format |
| Credential in memory (JS variable) | Session-lifetime only, no serialization |
| Credential passed to provider module | Via function argument only, never stored in module state |
| Credential presence check | Boolean `has_credential: true/false` — never the value |

### Enforcement mechanisms required before implementation

1. **`privacy-export-guard.js`** must include a credential leak scan on every export payload. Any field matching a credential pattern must cause the export to fail with an explicit error.
2. **`privacy-audit.js`** must enumerate the credential handling surfaces and confirm none are in violation.
3. **CI test required:** A test must assert that a synthetic credential injected into app state does not appear in any export output (raw or encoded).
4. **`portable-account-mock.js`** is the reference implementation for the permitted pattern: `token_hash_only: true`, raw token never exported.

---

## Consequences

- Any provider implementation that stores credentials in module-level state is non-compliant with this ADR.
- The `openai-compatible-provider.js` module must be reviewed against this ADR before it is called in any non-mock path.
- `portable-oauth-spike.js` remains a spike — production OAuth requires a separate ADR.
- The credential leak CI test must be added to the `privacy` gate before any live credential path ships.

---

## Rejected Alternatives

| Alternative | Reason rejected |
|---|---|
| Store credentials in localStorage with encryption | Encryption key management is unsolved; localStorage is accessible to any same-origin script. |
| Allow raw credentials in debug/dev mode | Debug mode leaks to production in shared environments. Single rule for all modes. |
| Delegate credential safety to the provider module | Defence-in-depth requires the export guard to also check, independent of provider behaviour. |
