# Jarbou3iModel alpha.11 → alpha.14 context reconstruction

## Canonical chain found from uploaded ZIPs

- v1.1.0-alpha.11 hotfix sequence:
  - select-option quality language hotfix
  - final residual language hotfix
  - template-report localization-aware hotfix
  - localized policy assertion hotfix
- v1.1.0-alpha.12 sequence:
  - dev productivity command center + golden baseline automation
  - visible-text evidence root hotfix
  - locale snapshot switching hotfix
  - visible-text residual guard hotfix
- v1.1.0-alpha.13 sequence:
  - prompt compiler + research plan upgrade
  - release copy visible-text hotfix
  - final status: LOCKED in prior handoff
- v1.1.0-alpha.14:
  - current patch packet: Evidence Workspace + Source Import V2
  - not locked yet

## Locked base

The correct base is v1.1.0-alpha.13 release-copy-visible-text-hotfix, not the earlier alpha.13 prompt-compiler ZIP alone.

Alpha.13 lock evidence from handoff:
- no-browser CI: green
- browser CI: green
- hosted evidence: accepted
- visible-text snapshots: accepted
- next milestone: v1.1.0-alpha.14 Evidence Workspace + Source Import V2

## Alpha.14 intended scope

Allowed:
- evidence/source cards
- raw → reviewed → accepted/rejected evidence workflow
- contradiction marker
- source confidence/type classification
- evidence-to-claim linking
- source gap warnings
- preserve prompt compiler
- preserve visible-text snapshot guard

Forbidden:
- no uncontrolled scraping
- no live provider call
- no OAuth/backend expansion
- no broad refactor
- no UI redesign beyond evidence workflow surface

## Current local failure diagnosis

The registry fix was applied successfully and `node tests/evidence-workspace-check.mjs` passed.

`node tests/ci-gate-registry-check.mjs` also passed, which proves the CI registry is structurally valid after the alpha.14 registry fix.

The remaining `node tests/test-organization-audit-check.mjs` failure is not a real unregistered-file problem. It is a Windows-only path separator bug:
- registry stores paths as `tests/file-check.mjs`
- `path.join('tests', name)` returns `tests\file-check.mjs` on Windows
- the audit compares those strings literally

This fix normalizes backslashes to forward slashes inside `tests/test-organization-audit-check.mjs`.

## Local PowerShell validation commands

Use direct Node runner commands instead of Bash scripts on Windows:

```powershell
node .\fix-alpha14-windows-paths.mjs
node tests/evidence-workspace-check.mjs
node tests/test-organization-audit-check.mjs
node tests/ci-gate-registry-check.mjs
node tests/ci-gate-runner.mjs no-browser
```

Do not use these on PowerShell unless Bash/WSL/Git-Bash is available:

```powershell
npm run test:ci:no-browser
npm run test:ci:browser
```

Those scripts call `bash scripts/ci-*.sh`, so they fail on Windows machines without `/bin/bash`.

## Locking rule

Alpha.14 is not lockable until:
- no-browser CI is green on GitHub Actions
- browser CI is green on GitHub Actions
- hosted evidence is recaptured from the alpha.14 build
- `hosted-demo-metadata.json` says `evidence_review_version: 1.1.0-alpha.14`
