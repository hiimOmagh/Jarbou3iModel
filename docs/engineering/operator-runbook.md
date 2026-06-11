# Operator Runbook

Purpose: keep release-operation commands in one place so release docs do not repeatedly duplicate the same cleanup, validation, and lock commands.

## Standard cleanup

```powershell
Remove-Item -Recurse -Force .\playwright-report, .\test-results, .\dist, .\ci-artifacts, .\hosted-demo-evidence-local -ErrorAction SilentlyContinue
Remove-Item Env:\HOSTED_DEMO_EVIDENCE_DIR -ErrorAction SilentlyContinue
```

## Status checks

```powershell
git status --short
git branch --show-current
git log --oneline -3
```

## Focused consolidation checks

```powershell
node .\scripts\release-truth-surface-reduction-check.mjs
node .\tests\repo-file-hygiene-check.mjs
node .\tests\test-organization-audit-check.mjs
node .\tests\effective-diff-check.mjs
```

## No-browser validation

```powershell
npm run test:current:no-browser
Remove-Item -Recurse -Force .\playwright-report, .\test-results, .\dist, .\ci-artifacts -ErrorAction SilentlyContinue
npm run test:ci:no-browser
```

## Browser validation on Windows

```powershell
Remove-Item -Recurse -Force .\playwright-report, .\test-results, .\dist, .\ci-artifacts, .\hosted-demo-evidence-local -ErrorAction SilentlyContinue
$env:HOSTED_DEMO_EVIDENCE_DIR="$PWD\hosted-demo-evidence-local"
& "C:\Program Files\Git\bin\bash.exe" scripts/ci-browser.sh
Remove-Item Env:\HOSTED_DEMO_EVIDENCE_DIR -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .\hosted-demo-evidence-local -ErrorAction SilentlyContinue
git status --short
```

## Commit pattern

For alpha.67 first pass:

```powershell
git add docs/release/current-release-and-truth.md docs/engineering/qa-and-evidence-gates.md docs/product/current-public-surface.md docs/engineering/operator-runbook.md docs/strategy/roadmap.md scripts/release-truth-surface-reduction-check.mjs
git commit -m "docs: introduce canonical release truth surfaces"
git push
```

## Lock note

A documentation consolidation branch can be considered locally locked only when:

- working tree is clean
- focused consolidation checks pass
- current no-browser passes
- full no-browser passes
- browser passes locally or in GitHub Actions
