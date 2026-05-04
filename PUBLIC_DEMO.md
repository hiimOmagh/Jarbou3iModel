# Public Demo Operator Guide

## v1.0.29 — Final Public Demo Hardening / Release Freeze Audit

Release apply integrity gate for changed-files-only patch handoff. Artifact download success, screenshots alone, or ZIP existence alone are insufficient. Required validation: `npm run test:v126:no-browser`, `npm run test:ci:no-browser`, and `PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser`. No runtime/provider/OAuth/backend/source/storage/public-demo capability expansion.


## v1.0.25 — Public Demo Release Lock

This guide applies to v1.0.25 — Public Demo Release Lock.

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

## Stop conditions

Do not publish the public demo package if no-browser CI, browser QA, privacy export, hosted-demo evidence review, public-claim alignment, or repo hygiene checks fail.
