# Roadmap

## Current candidate

`v1.4.0-alpha.17 — Alpha.16 Lock Completion + Evidence Budget Regression Dashboard`

Purpose: mark locked alpha.16 as the completed baseline, make alpha.17 the current candidate, and expose a compact evidence budget regression dashboard so future releases cannot silently grow browser evidence checks, hosted surfaces, hosted languages, or visible snapshot rows.

Status: current candidate. Lock is pending green no-browser CI, green browser CI, hosted evidence, and canonical lock bundle.

## Locked baseline

`v1.4.0-alpha.16 — Alpha.15 Lock Completion + Evidence Surface Budget Enforcement` is locked.

- Run ID: `26646993357`
- Commit: `d40d2054060c14326c5871ec86bd7ef5d9aab2ed`
- no-browser: passed with 146 checks
- browser: passed with 17 checks
- hosted-demo evidence: passed
- AR/FR/EN visible-text snapshots: passed
- evidence matrix: 39/39 passed
- artifact identity guard: passed
- bundle validation: passed

Previous locked baselines:

- `v1.4.0-alpha.15 — Roadmap Lock Completion + Manual Provider Adapter UX Compression` — Run ID `26643746981`, commit `4ba0f9db8020a9d0158ec95854ef10fbfe47694c`.
- `v1.4.0-alpha.14 — Adapter Replay Fixture Corpus + Coverage Matrix` — Run ID `26640076472`, commit `476b97423d18842177ae47074967afa45e5962bb`.
- `v1.4.0-alpha.12 — Manual Provider Adapter Sandbox + Ephemeral Invocation Contract`.
- `v1.4.0-alpha.11 — Manual Execution Safety Cockpit + Session Ledger`.
- `v1.4.0-alpha.10 — Limited Manual Live-Execution Prototype`.
- `v1.4.0-alpha.9 — Controlled Execution Candidate Gate`.
- `v1.4.0-alpha.8 — Credential Boundary Runtime Drill`.
- `v1.4.0-alpha.7 — Source Acquisition Control Surface`.
- `v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence`.
- `v1.3.0 — Stable Manual Workflow Release`.

## Alpha.17 scope

Allowed:

- Record alpha.16 lock evidence across release truth surfaces.
- Add static evidence budget regression dashboard metadata.
- Add targeted regression dashboard QA.
- Preserve alpha.14 replay corpus, alpha.15 UX/runtime budget, and alpha.16 evidence budget boundaries.
- Keep browser-evidence scope bounded at max 20 browser checks, 3 hosted languages, max 13 hosted surfaces, and max 39 visible snapshot rows.

Forbidden:

- No live provider calls.
- No hidden network calls.
- No live source fetching.
- No OAuth/token lifecycle expansion.
- No credential persistence.
- No backend/storage/source behavior expansion.
- No automatic source verification.
- No automatic signoff.
- No automatic export lock.
- No publication permission claim.

## Evidence budget dashboard limits

```text
evidence_surface_budget_version: 1.4.0-alpha.17
locked_baseline: 1.4.0-alpha.16
locked_alpha16_baseline: 1.4.0-alpha.16
locked_alpha15_baseline: 1.4.0-alpha.15
locked_alpha14_baseline: 1.4.0-alpha.14
browser_check_budget_max: 20
hosted_language_count_expected: 3
hosted_surface_count_expected_max: 13
visible_snapshot_rows_expected_max: 39
runtime_budget_policy: guardrail_only
runtime_budget_enforced_without_network: true
provider_execution_performed: false
live_fetching_performed: false
credential_persistence_allowed: false
```

## Next candidate after lock

Do not start the next milestone until alpha.17 has green no-browser CI, green browser CI, hosted evidence, and canonical lock evidence bundle.

## Continuity and boundary repetition for release-truth gates

No live scraping. No production OAuth. No real OAuth. No real API keys. No automatic source verification. No cryptographic signature claim. No publication permission claim. No backend behavior expansion. No provider execution expansion. No source behavior expansion. No storage behavior expansion.

Baseline repetition: v1.4.0-alpha.7 — Source Acquisition Control Surface; v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence; v1.4.0-alpha.5 — Dry-Run Replay Pack + Operator Approval Simulation; v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report; v1.4.0-alpha.3 — Provider/Source Dry-Run Execution Harness + Policy Simulator; v1.4.0-alpha.2 — Provider/Source Execution Policy Matrix + Failure UX Contracts; v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation; v1.3.0-alpha.10 — Brief Publication Pack v4.
Locked RC baseline repetition: v1.3.0-rc.2 — RC Evidence Tightening + Release Notes Finalization.
Node 24 CI compatibility preserved.
Planning gate continuity: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, apply integrity, and changed-files-only discipline remain preserved.
