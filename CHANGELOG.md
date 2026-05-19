## v1.1.0-alpha.13 — Prompt Compiler + Research Plan Upgrade

Adds a local/template-driven prompt compiler to improve the research-plan stage without introducing live provider calls or new source acquisition. The compiler turns messy topic/context input into a deterministic structured plan seed: refined thesis, objective, key questions, actor/tool hypotheses, evidence needs, counterarguments, disconfirming conditions, missing-context prompts, keywords, and output-plan guidance.

Validation and release discipline are extended with `tests/prompt-compiler-check.mjs`, schema/fixture updates, and CI registry coverage. Existing developer-productivity commands (`dev:doctor`, `dev:baseline`, `dev:impact`, `dev:handoff`), visible-text localization snapshots, hosted evidence capture, fixture compression, privacy/export guards, and package script compression remain preserved.

No live scraping, No real OAuth, no live provider execution, no backend endpoint expansion, no source connector expansion, no storage expansion, no UI redesign, and no large source refactor are introduced.

## Historical release history

Detailed historical release notes are consolidated in `docs/release-history.md`.

Evidence manifest continuity: v1.1.0-alpha.13 preserves the single final metadata hosted-demo evidence manifest gate.

Node 24 CI compatibility is preserved with actions/checkout@v6, actions/setup-node@v6, actions/upload-artifact@v6, npm ci --no-audit --no-fund --ignore-scripts, and PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser.
Public Demo boundaries remain preserved.

Public-demo boundary continuity: No live scraping, No real OAuth, and screenshots alone or ZIP archive alone are not sufficient for approval.

Continuity note: Root Manifest and Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, changed-files-only discipline, no live scraping, No real OAuth, screenshots alone, hosted evidence, and ZIPs are not sufficient for release approval.
