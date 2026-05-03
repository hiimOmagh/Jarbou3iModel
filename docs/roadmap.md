# Roadmap

## Current patch

`v1.0.22 — Release Evidence + Repo Hygiene Verification`

Purpose: verify that the real repository state, evidence artifacts, Node 24 CI workflow, and release hygiene gates are aligned before any new product capability is added.

## Immediate next candidates

1. `v1.0.23 — CI Result Review + Browser Evidence Artifact Audit`
   - Use actual GitHub Actions logs and uploaded evidence artifacts to verify the full pipeline.
   - Review traces/screenshots only if browser CI still fails.
   - Keep the patch feature-neutral.

2. `v1.1.0 — Controlled Source Workflow MVP`
   - Only after browser QA, Node 24 CI compatibility, release evidence, template presets, and copy/export safety are stable.

## Blocked until explicitly scoped

- Live scraping.
- Production OAuth.
- BrainLink/OpenRouter PKCE production flow.
- New live source connectors.
- Provider behavior changes.
