# Roadmap

## Current patch

`v1.0.21 — Node 24 CI Compatibility + Action Runtime Migration`

Purpose: remove Node 20 action-runtime fragility and validate the stable release pipeline under Node 24 without expanding product capabilities.

## Immediate next candidates

1. `v1.0.22 — Release Evidence + Repo Hygiene Verification`
   - Confirm GitHub Actions no-browser and browser CI pass from the real repository state.
   - Confirm stale tracked orphan files are deleted through Git, not merely absent from extracted ZIPs.

2. `v1.1.0 — Controlled Source Workflow MVP`
   - Only after browser QA, Node 24 CI compatibility, template presets, and copy/export safety are stable.

## Blocked until explicitly scoped

- Live scraping.
- Production OAuth.
- BrainLink/OpenRouter PKCE production flow.
- New live source connectors.
- Provider behavior changes.
