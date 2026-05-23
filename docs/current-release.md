# Current Release

## v1.2.0-alpha.8.1 — CI Stabilization + Workflow Quarantine

This is an incident/stabilization patch over `v1.2.0-alpha.8.1 — CI Stabilization + Workflow Quarantine`.

Scope: stabilize CI and lock-evidence flow after alpha.8 produced stuck/queued workflow behavior. This patch keeps the alpha.8 diagnostic repair queue and export-risk resolution workflow intact, but adds workflow-level quarantine controls: concurrency cancellation, manual dispatch, job timeouts, no-browser-first browser gating, and versioned lock-evidence bundle naming.

Feature surface is frozen for this stabilization patch; alpha8.1 adds CI quarantine only, not a new product capability.

Product behavior boundary: no runtime capability expansion. The existing local/manual diagnostic repair queue remains visible, but alpha8.1 adds no new data acquisition, no provider execution, no backend/OAuth behavior, no storage expansion, and no automatic source verification claim.

Release-lock requirement: screenshots alone are insufficient. A ZIP archive alone is insufficient. Any lock claim requires green no-browser CI, green browser CI, complete hosted-demo evidence, clean visible text, zero horizontal overflow, and the canonical lock evidence bundle.

Release apply integrity and changed-files-only discipline remain enforced by the CI gate registry.

## Release Manifest

Package: `jarbou3i-research-engine`
Version: `1.2.0-alpha.8.1`
Release: `v1.2.0-alpha.8.1 — CI Stabilization + Workflow Quarantine`
Runtime capability change: no
Required browser gates before publishing
Release archive exclusions
Required cleanup commands

Node 24 CI compatibility preserved.

Stable baseline retained: v1.1.0 remains the locked Public Demo reference for post-stable expansion gating.

## CI quarantine controls

- Workflow concurrency is enabled with `cancel-in-progress: true`.
- Manual `workflow_dispatch` is enabled for controlled reruns during incidents.
- Browser CI now depends on no-browser CI to avoid expensive/stuck browser runs after early failures.
- No-browser, browser, and lock-evidence jobs have explicit timeout limits.
- Browser matrix validation must report internal build version `1.2.0-alpha.8.1`.
- Lock evidence bundle artifacts are named `lock-evidence-bundle_1.2.0-alpha.8.1_<run_id>`.

## Forbidden-capability flags

live_fetching_performed: false
provider_execution_performed: false
automatic_source_verification_claimed: false
production_oauth_enabled: false
backend_behavior_expanded: false
storage_behavior_expanded: false
queue_bypass_enabled: false

No live scraping. No production OAuth. No backend behavior expansion. No provider execution expansion. No storage expansion. No automatic source verification claims.

## Release-lock evidence rule

Screenshots alone are insufficient.
A ZIP archive alone is insufficient.
green no-browser CI is required before release claim.
green browser CI is required before release claim.
reviewed hosted-demo evidence is required before public-demo publication.

Public and internal release versions are aligned: v1.2.0-alpha.8.1 CI Stabilization + Workflow Quarantine.


Alpha.8 preserved feature surface: Diagnostic Repair Queue + Export Risk Resolution.
