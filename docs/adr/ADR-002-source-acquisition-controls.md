# ADR-002: Source Acquisition Controls

**Status:** Proposed — planning-gate only (v1.4.0-alpha.1)
**Milestone:** v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation
**Date:** 2026-05-25
**Boundary:** No live source acquisition enabled by this ADR. Implementation gated on a future milestone after all acceptance criteria below are met.

---

## Context

v1.3.0 ships with source connector modules (`source-connectors.js`, `source-controller.js`, `controlled-connector-engine.js`) that operate in manual/mock mode only. No live fetching, no uncontrolled scraping, no web search execution occurs in the stable release.

Before any live source acquisition can be considered, the acquisition model must be formally specified, threat-modeled, and gate-checked.

---

## Decision

Source acquisition will follow a **controlled connector** model with the following invariants:

1. **No uncontrolled scraping.** Source acquisition is restricted to explicitly registered connector types with defined input contracts, output schemas, and review-gate requirements.

2. **Connector registry gating.** Every connector must be registered in `source-capability-registry.js` before it can be invoked. Unregistered connectors are rejected at the `controlled-connector-engine.js` boundary.

3. **Review gate mandatory.** Every source acquired through any connector — including manual import — must pass through the evidence review queue (`evidence_review_queue_required: true`). No connector result bypasses human review.

4. **No verification claim.** Connectors produce evidence candidates, not verified facts. The connector result schema must include `verification_claimed: false` and `live_fetching_performed` as an explicit boolean (not inferred).

5. **Rate limiting and abuse controls.** Any connector that makes external network requests must implement per-session request limits, backoff logic, and a hard abort after N failures. These limits must be configurable and tested.

6. **Scope isolation.** Each connector operates within a declared scope (URL list, transcript, search query, repository). Cross-scope access is not permitted without explicit user action.

7. **Dry-run mode required.** Every connector must support a `dry_run: true` mode that validates inputs and returns the expected output shape without performing any network request.

---

## Accepted Connector Types (planning phase)

| Connector ID | Input | Live network? | Status |
|---|---|---|---|
| `url_list_import` | User-provided URL list | No (manual import only in alpha) | Allowed in stable |
| `manual_transcript_import` | User-pasted text | No | Allowed in stable |
| `manual_source_list_import` | User-provided structured list | No | Allowed in stable |
| `web_search_api` | Query string | Yes — gated | Planning only |
| `github_public_repo` | Repo URL + path | Yes — gated | Planning only |

Live-network connectors require a separate implementation milestone with dedicated privacy review, rate-limit tests, and CI browser evidence.

---

## Consequences

- `controlled-connector-engine.js` is the enforcement point. It must remain the sole entry point for connector invocation.
- `source-capability-registry.js` must be updated before any new connector is activated.
- The dry-run / preflight shape of each live connector must be tested in CI before live execution is enabled.
- `live_fetching_performed: false` must remain true for all connectors in v1.4.0-alpha.1.

---

## Rejected Alternatives

| Alternative | Reason rejected |
|---|---|
| Allow any URL fetch given user consent | Consent UI is insufficient without rate-limit, scope, and abuse controls. |
| Enable web search as a default capability | Web search is a live network path — requires its own milestone, threat model, and privacy review. |
| Skip the review queue for trusted connectors | No connector is trusted enough to bypass human review at this stage of the system. |
