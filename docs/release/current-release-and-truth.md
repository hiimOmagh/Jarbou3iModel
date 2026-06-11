# Current Release and Truth Surface

Purpose: provide one canonical release-truth surface for the repository so release identity, historical baselines, non-goals, and validation status are not repeatedly expanded across README, public demo notes, QA matrix, roadmap, release history, and release evidence files.

## Current consolidation milestone

**v1.4.0-alpha.67 — Release Truth Surface Reduction**

This milestone is a documentation and repository-governance reduction pass. It does not add product behavior and does not change provider, OAuth, backend, storage, or source acquisition behavior.

The immediate predecessor audit branch is:

**v1.4.0-alpha.66 — Repository Truth Surface Consolidation Audit**

That audit established the evidence base for reducing duplicated truth surfaces. Alpha.67 begins the reduction by introducing canonical documents before converting legacy documents into smaller wrappers.

## Stable baselines preserved

The following baselines remain valid and must not be erased by consolidation work:

- **v1.3.0 — Stable Manual Workflow Release**
- **v1.4.0-alpha.1 — Controlled Provider/Source Execution Preparation**
- **v1.4.0-alpha.2 — Provider/Source Execution Policy Matrix + Failure UX Contracts**
- **v1.4.0-alpha.3 — Provider/Source Dry-Run Execution Harness + Policy Simulator**
- **v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report**
- **v1.4.0-alpha.5 — Dry-Run Replay Pack + Operator Approval Simulation**
- **v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence**
- **v1.4.0-alpha.7 — Source Acquisition Control Surface**
- **v1.4.0-alpha.14 — Adapter Replay Fixture Corpus + Coverage Matrix**
- **v1.4.0-alpha.64 — Live Evidence Performance Trend Diff Bundle Inclusion**

## Release truth rules

1. A release milestone may add product behavior only when the runtime capability change is explicit and tested.
2. A documentation/repository milestone may remain stamped with the previous runtime identity when it does not alter runtime behavior.
3. Historical baselines should be referenced once from this canonical file, then linked from wrappers instead of duplicated verbatim.
4. Release-truth tests should eventually read from this file plus structured release identity data rather than forcing every legacy document to repeat the same continuity tokens.
5. Evidence claims must distinguish local no-browser, CI no-browser, browser, hosted evidence, and lock-bundle validation.

## Non-goals and behavior boundaries

Alpha.67 does not authorize:

- live scraping
- real provider execution expansion
- production OAuth
- real OAuth
- real API keys
- backend behavior expansion
- storage behavior expansion
- source behavior expansion
- cryptographic signing claims
- hidden hosted behavior changes

## Current reduction target

The first alpha.67 pass adds canonical surfaces only:

- `docs/release/current-release-and-truth.md`
- `docs/engineering/qa-and-evidence-gates.md`
- `docs/product/current-public-surface.md`
- `docs/engineering/operator-runbook.md`
- `docs/strategy/roadmap.md`
- `scripts/release-truth-surface-reduction-check.mjs`

Legacy files remain in place during the first pass. They can be reduced in later passes after gates prove the canonical documents are stable.

## Wrapper migration plan

Legacy files to reduce later:

- `README.md`
- `PUBLIC_DEMO.md`
- `CHANGELOG.md`
- `docs/current-release.md`
- `docs/qa-matrix.md`
- `docs/release-and-evidence.md`
- `docs/release-history.md`
- `docs/roadmap.md`

The reduction rule is: convert legacy files into short index/summary wrappers first, not deletions.
