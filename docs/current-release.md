# Current Release

Public Demo continuity: retained. Diagnostic Repair Queue + Export Risk Resolution continuity retained from the alpha8 repair workflow. The v1.1.0 stable public-demo baseline remains the protected reference for post-stable expansion gating.

## v1.3.0-alpha.2 — Guided Session UX Compression + Brief Assembly Export QA

Public release label: v1.3.0-alpha.2 Guided Session UX Compression + Brief Assembly Export QA.

Public and internal release versions are aligned. Internal stable validation metadata remains explicit for hosted evidence review. Feature surface is frozen: the release adds guided orchestration over existing local/manual tools and no new feature surface beyond that scoped workflow.

Status: built locally, no-browser validated pending browser lock evidence.

Scope: major orchestration release with changed-files-only apply integrity preserved that turns the existing local/manual Source-to-Brief tools into a guided research session. It adds session progress, step completion states, next-best-action guidance, manual checkpoints, and a brief assembly preview over the existing evidence, claim, contradiction, repair, ledger, and export-risk surfaces.

Feature boundary: this release does not add live web search, scraping, provider execution, production OAuth, backend expansion, storage expansion, or automatic source verification. All session guidance is local/manual and remains advisory.

## Feature surface

Feature surface: guided session orchestration and brief assembly over existing local/manual tools only.

## Main capability

- Guided Research Session Engine
- Brief Assembly Workflow
- Step-level completion / warning / blocker states
- Manual operator checkpoints
- Next-best-action guidance
- Brief assembly preview
- Guided session JSON / Markdown export artifacts
- Brief assembly preview Markdown artifact

## Evidence boundary flags

- live_fetching_performed: false
- live_web_search_performed: false
- provider_execution_performed: false
- provider_execution_expanded: false
- production_oauth_enabled: false
- backend_behavior_expanded: false
- storage_behavior_expanded: false
- automatic_source_verification_claimed: false
- verification_claimed: false

## Release manifest

- Package: `jarbou3i-research-engine`
- Version: `1.3.0-alpha.2`
- Runtime capability change: no
- Required browser gates before publishing
- Release archive exclusions
- Required cleanup commands

## CI controls retained

Node 24 CI compatibility remains preserved for this guided session release.

The workflow quarantine controls introduced in alpha8.1 remain active:

- workflow-level concurrency
- cancel-in-progress
- manual workflow_dispatch
- no-browser before browser
- bounded job timeouts
- canonical lock-evidence bundle

## Release lock requirements

Screenshots alone are insufficient for release approval. A ZIP archive alone is insufficient for release approval. Lock requires green no-browser CI, green browser CI, and reviewed hosted-demo evidence.

## Lock requirements

Lock only after evidence manifest review, capture manifest completeness, single final metadata consistency, visual freeze review, and mobile header continuity.

Lock only after:

- no-browser CI passes
- browser CI passes
- hosted evidence matrix passes 39/39
- visible text is clean in EN / AR / FR
- mojibake detected is false
- horizontal overflow is 0
- forbidden-capability flags remain false

Boundary wording: no live scraping, no production OAuth, no backend behavior expansion, no provider execution expansion, and no automatic source verification claims.
