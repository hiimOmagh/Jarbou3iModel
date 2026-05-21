# Public Demo Operator Guide

## v1.1.0-alpha.15 — Source Cluster + Gap Intelligence

This guide preserves the public-demo operating boundary after root release/evidence artifacts were consolidated into the docs layer.

## Demo goal

Show that the research engine turns a topic into a structured, evidence-aware strategic workflow without requiring a live provider, OAuth account, backend key, source connector, or live scraping.

## Recommended demo path

1. Define a concrete topic and context.
2. Generate a research plan.
3. Add or import evidence.
4. Review the evidence queue before promotion.
5. Compile/check the quality gate.
6. Export only after verifying privacy/export gates.
7. Treat hosted-demo screenshots and metadata as review evidence, not automatic approval.

## Boundaries to state during the demo

- Manual/private mode is the default.
- Live provider behavior is not part of this patch.
- Production OAuth is not enabled.
- Source automation remains planning/review-gated.
- Source packet templates are local/manual scaffolds, not verification claims.
- Exported files must not contain provider keys or raw tokens.
- Screenshots alone do not approve the release.
- ZIP existence alone does not approve the release.
- Root release/evidence artifacts are consolidated in `docs/release-and-evidence.md` and `docs/current-release.md`.

## Stop conditions

Do not publish the public demo package if no-browser CI, browser QA, privacy export, hosted-demo evidence review, public-claim alignment, or repo hygiene checks fail.

Evidence manifest continuity: v1.1.0-alpha.15 preserves the single final metadata hosted-demo evidence manifest gate.


Release provenance ledger, changed-files-only discipline, Package Script Compression, CI Gate Registry, Fixture Registry payload compression, and mobile header visual freeze continuity remain preserved.

Continuity note: Root Manifest and Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, changed-files-only discipline, no live scraping, No real OAuth, screenshots alone, hosted evidence, and ZIPs are not sufficient for release approval.
