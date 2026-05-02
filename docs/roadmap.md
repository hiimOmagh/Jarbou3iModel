# Roadmap

## Current patch

`v1.0.17 — Source Packet Builder Browser QA + UX Tightening`

Purpose: verify and tighten the local/manual Source Packet Builder UI before adding any new source/provider capability.

## Immediate next candidates

1. `v1.0.18 — Source Packet Builder Export Roundtrip QA`
   - Validate generated manual source packet JSON can be re-imported cleanly.
   - Confirm review queue and scoring metadata survive roundtrip.

2. `v1.0.19 — Source Packet Template Presets`
   - Add local-only templates for Reddit thread, official report, YouTube transcript, market signal, GitHub release, and generic article packets.

3. `v1.1.0 — Controlled Source Workflow MVP`
   - Only after browser QA, roundtrip QA, and templates are stable.

## Blocked until later

- Live scraping.
- Production OAuth.
- BrainLink/OpenRouter PKCE production flow.
- New live source connectors.
- Provider behavior changes.
