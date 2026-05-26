# ADR-001: Provider Execution Model

**Status:** Proposed — planning-gate only (v1.4.0-alpha.2)
**Milestone:** v1.4.0-alpha.2 — Provider/Source Execution Policy Matrix + Failure UX Contracts
**Date:** 2026-05-25
**Boundary:** No live provider execution enabled by this ADR. Implementation gated on v1.4.0-beta.1 or later after all acceptance criteria are met.

---

## Context

Jarbou3i Research Engine v1.3.0 ships with provider modules (`openai-compatible-provider.js`, `backend-proxy-provider.js`, `mock-provider.js`) that are present but not expanded as live execution paths. The stable release explicitly prohibits automatic provider execution, live API calls, production OAuth, and any automatic verification claims.

The post-stable roadmap requires a formal decision on the shape of controlled provider execution before any implementation work begins. This ADR records that decision.

---

## Decision

Provider execution will follow a **controlled, opt-in, preflight-gated** model with the following invariants:

1. **No default live execution.** Provider calls are disabled by default. A user must explicitly configure a provider and pass a preflight gate before any live call is made.

2. **Preflight gate required.** Before any provider is invoked, `provider-execution-preflight.js` must return `preflight_passed: true`. The gate checks: credential presence (not value), cost control configuration, timeout configuration, failure-UX readiness, and mock-equivalence test coverage.

3. **Mock-to-live equivalence.** Every live provider path must have a corresponding mock path with identical input/output contract. The mock path must pass all tests before the live path is enabled. This ensures the test suite never depends on live calls.

4. **No automatic verification claims.** Provider output is always labeled as AI-generated and unverified. The app must not assert that provider output constitutes source truth, factual verification, or editorial approval.

5. **Cost controls mandatory.** A per-session token budget and a hard abort threshold must be configured before any live call. No open-ended provider calls.

6. **Timeout controls mandatory.** Every provider call must have a configurable timeout. On timeout, the app returns a structured failure object — never hangs or crashes silently.

7. **Credential boundary.** Raw API keys and tokens must never appear in exports, logs, localStorage, or DOM. Only hashed/masked representations are permitted in any observable surface.

8. **Privacy review required.** Before any live provider path ships, a privacy audit must confirm: no PII leakage in prompts by default, no prompt-logged credentials, and no third-party telemetry beyond the configured provider endpoint.

---

## Consequences

- `provider-execution-preflight.js` must exist and be tested before any live provider work begins.
- `provider-execution-threat-model.js` must enumerate the threat surface and map mitigations.
- New CI gates (`provider-execution-preflight-check.mjs`, `provider-execution-threat-model-check.mjs`) must pass in the `release` gate.
- The `openai-compatible-provider.js` and `backend-proxy-provider.js` modules remain present but must not be called in any default code path until a future implementation milestone explicitly lifts this constraint.
- All boundary flags in `ci-gate-registry.json` remain `false` until an implementation milestone changes them with deliberate registry update.

---

## Rejected Alternatives

| Alternative | Reason rejected |
|---|---|
| Enable live calls behind a feature flag | Feature flags are hard to audit and easy to enable by accident. Preflight gate is explicit and tested. |
| Allow provider calls without cost controls | Unbounded cost is a hard blocker for any public or shared deployment. |
| Allow automatic verification claims | Conflicts with the fundamental epistemic boundary of the system. AI output is never ground truth. |
| Ship provider execution in the same milestone as preflight | Separation of planning and implementation prevents scope creep and keeps CI evidence clean. |
