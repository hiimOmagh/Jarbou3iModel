# Roadmap

## Current patch

`v1.0.20 — Source Packet Template Browser QA + Copy Safety`

Purpose: consolidate v1.0.19 CI follow-through and browser-test local/manual source packet template presets before any controlled source workflow expansion.

## Immediate next candidates

1. `v1.0.21 — Release Evidence + Repo Hygiene Verification`
   - Confirm GitHub Actions no-browser and browser CI pass from the real repository state.
   - Confirm stale tracked orphan files are deleted through Git, not merely absent from extracted ZIPs.

2. `v1.1.0 — Controlled Source Workflow MVP`
   - Only after browser QA, template presets, and copy/export safety are stable.

## Blocked until explicitly scoped

- Live scraping.
- Production OAuth.
- BrainLink/OpenRouter PKCE production flow.
- New live source connectors.
- Provider behavior changes.
