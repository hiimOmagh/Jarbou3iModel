# Evidence Performance Policy Enforcement Wiring

Current release: v1.4.0-alpha.63 — Evidence Performance Policy Enforcement Wiring

This playbook explains how operators should interpret hosted evidence performance threshold output and what to do when a release shows pass, warn, or fail status.

## Policy source

The policy is enforced by:

- `scripts/hosted-evidence-performance-trend-diff.mjs`
- `tests/hosted-evidence-performance-threshold-policy-check.mjs`
- `tests/hosted-evidence-performance-trend-diff-check.mjs`
- `performance-trends/hosted-evidence-performance-trend-ledger.json`

The performance trend diff compares the current hosted-evidence timing ledger against a previous ledger entry. It does not change runtime behavior, provider execution, OAuth, backend, storage, source fetching, or UI behavior.

## Thresholds

| Policy dimension | Warning threshold | Failure threshold |
| --- | ---: | ---: |
| Total hosted-evidence duration regression | 10% | 20% |
| Per-phase duration regression | 15% | 30% |
| Per-phase budget utilization | 75% | 90% |

The stable band is 5%. Small timing movement inside the stable band should not trigger operational action.

## Status interpretation

| Status | Meaning | Operator action |
| --- | --- | --- |
| `pass` | Timing is stable or improved; no policy threshold is breached. | Continue normal lock review. |
| `warn` | Timing crossed a warning threshold but did not fail policy. | Review the slowest phase and compare against the previous ledger before merging. |
| `fail` | Timing crossed a failure threshold. | Stop release lock, inspect timing evidence, and patch the evidence pipeline or budget only if the regression is real and reproducible. |

## Total-duration warning checklist

When total duration warns:

1. Read `performance-trends/hosted-evidence-performance-trend-ledger.json`.
2. Check `total_duration_ms`, `total_capture_budget_ms`, and `total_within_budget`.
3. Compare against the previous release ledger using the trend diff tool.
4. Confirm whether the increase is broad or caused by one phase.
5. If the increase is isolated, use the phase checklist instead of changing global budgets.

## Phase-duration warning checklist

When a phase warns:

1. Identify the phase from `threshold_policy.warning_phases`.
2. Check the phase record for `duration_ms`, `budget_ms`, and `budget_utilization`.
3. Compare the same phase in the previous ledger.
4. Prefer a narrow repair: selector stabilization, artifact race removal, serial execution enforcement, or timing budget calibration.
5. Do not change product/runtime behavior to satisfy evidence timing.

## Utilization warning checklist

When utilization warns:

1. Confirm the phase is below the 90% failure threshold.
2. Check whether the phase is naturally heavy, such as `evidence-matrix` or targeted screenshot capture.
3. If utilization is close to 90%, inspect browser traces and hosted evidence metadata before merging.
4. If utilization remains high across two releases, create a process-only hardening milestone.

## Failure protocol

When policy status is `fail`:

1. Do not merge the release branch.
2. Preserve the failed lock evidence bundle and browser/no-browser logs.
3. Classify the failure family:
   - total-duration regression
   - phase-duration regression
   - phase-utilization regression
   - missing previous ledger
   - malformed ledger
4. Re-run only if the failure appears transient.
5. Patch narrowly if the failure repeats.
6. Keep the patch inside evidence tooling unless the evidence proves a product regression.

## Commands

Generate a trend diff:

```powershell
node scripts/hosted-evidence-performance-trend-diff.mjs --current-ledger .\current-ledger.json --previous-ledger .\previous-ledger.json --output-dir .\dist\performance-trends
```

Review generated output:

```powershell
Get-Content .\dist\performance-trends\hosted-evidence-performance-trend-diff.md
Get-Content .\dist\performance-trends\hosted-evidence-performance-trend-diff.json
```

Run the policy checks:

```powershell
node tests/hosted-evidence-performance-trend-diff-check.mjs
node tests/hosted-evidence-performance-threshold-policy-check.mjs
node tests/evidence-performance-policy-docs-check.mjs
```

## Invariants

This playbook must preserve these constraints:

- no runtime behavior change
- no provider behavior change
- no OAuth behavior change
- no backend behavior change
- no storage behavior change
- no source behavior change
- no UI feature expansion
- no executable patch-package workflow
