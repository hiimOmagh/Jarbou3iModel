# Public Demo Operator Guide

## Demo goal

Show that the research engine turns a topic into a structured, evidence-aware strategic workflow without requiring a live provider, OAuth account, backend key, or source connector.

## Recommended demo path

1. Define a concrete topic and context.
2. Generate a research plan.
3. Add or import evidence.
4. Review the evidence queue before promotion.
5. Compile/check the quality gate.
6. Export only after verifying privacy/export gates.

## Boundaries to state during the demo

- Manual/private mode is the default.
- Live provider behavior is not part of this patch.
- Production OAuth is not enabled.
- Source automation remains planning/review-gated.
- Exported files must not contain provider keys or raw tokens.

## Stop conditions

Do not publish the public demo package if no-browser CI, browser QA, privacy export, or repo hygiene checks fail.
