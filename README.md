## v1.1.0-alpha.13 — Prompt Compiler + Research Plan Upgrade

Local/template-driven research-plan upgrade for the public-demo workspace. This alpha adds a prompt compiler that turns messy topic/context input into a structured research plan seed: refined thesis, research objective, key questions, actor/tool hypotheses, evidence needs, counterarguments, disconfirming conditions, missing-context prompts, keywords, and an output plan. No live provider call, live scraping, OAuth/backend expansion, source connector expansion, storage expansion, UI redesign, or large source refactor is introduced.

# Jarbou3i Research Engine

A dark editorial intelligence workspace that turns messy AI/user research output into structured strategic briefs.

## Current version

`v1.1.0-alpha.13 — Prompt Compiler + Research Plan Upgrade`

## What this alpha changes

- Adds a deterministic local prompt compiler module at `src/research/prompt-compiler.js`.
- Integrates compiled plan output into the existing research-plan workflow.
- Adds prompt-compiler UI controls and output rendering.
- Extends workflow schema and sample fixtures with `research_plan.prompt_compiler`.
- Adds `tests/prompt-compiler-check.mjs` and registers it in the CI gate registry.
- Preserves alpha.12 developer productivity commands: `dev:doctor`, `dev:baseline`, `dev:impact`, and `dev:handoff`.
- Preserves hosted evidence capture, visible-text localization snapshots, privacy/export gates, fixture compression, and package script compression.

## Compatibility boundary

- No live scraping.
- No production OAuth.
- No real AI provider execution.
- No backend endpoint expansion.
- No source connector expansion.
- No storage behavior change.
- Manual/private mode remains default.
- The prompt compiler is a local drafting/planning scaffold, not source verification and not a claim of factual truth.

## Stable workflow

```text
Topic/context
→ Prompt Compiler
→ Research Plan
→ Evidence Matrix
→ Evidence Review Queue
→ Source Packet Builder
→ Source Packet Template Presets
→ Causal Links
→ Analysis Brief Compiler
→ Provider Harness
→ Provider Response Validation
→ Controlled Repair Loop
→ Privacy Export Guard
→ Quality Gate
→ Export Pack
→ Hosted Demo Evidence Review
```

## Local QA

```bash
npm ci --no-audit --no-fund --ignore-scripts
npm run test:current:no-browser
npm run test:ci:no-browser
npx playwright install --with-deps
PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser
```

Targeted alpha.13 checks:

```bash
node tests/prompt-compiler-check.mjs
npm run test:qa
npm run test:fixtures
npm run test:privacy
npm run test:source
npm run test:provider
npm run test:backend
npm run test:release
```

## Release approval boundary

Screenshots alone, hosted evidence alone, and ZIP existence alone are not sufficient for release approval. Approval requires green no-browser CI, green browser CI, reviewed hosted-demo evidence, aligned public claims, privacy/export safety, artifact SHA256, and a clean archive boundary for the intended release commit.

Continuity note: Root Manifest and Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, changed-files-only discipline, no live scraping, No real OAuth, screenshots alone, hosted evidence, and ZIPs are not sufficient for release approval.
