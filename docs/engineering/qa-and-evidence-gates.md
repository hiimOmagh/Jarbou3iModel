# QA and Evidence Gates

Purpose: consolidate validation and evidence expectations in one engineering surface instead of scattering gate descriptions across QA, release, roadmap, public demo, and changelog files.

## Gate tiers

### Focused checks

Use focused checks while developing a small consolidation patch:

```powershell
node .\scripts\release-truth-surface-reduction-check.mjs
node .\tests\repo-file-hygiene-check.mjs
node .\tests\test-organization-audit-check.mjs
node .\tests\effective-diff-check.mjs
```

### Current no-browser gate

Use this for the current release registry path:

```powershell
npm run test:current:no-browser
```

### Full no-browser gate

Use this before pushing or asking for a lock decision:

```powershell
Remove-Item -Recurse -Force .\playwright-report, .\test-results, .\dist, .\ci-artifacts -ErrorAction SilentlyContinue
npm run test:ci:no-browser
```

### Browser gate on Windows with Git Bash

The `npm run test:ci:browser` script calls Bash. On Windows without WSL, run the browser script through Git Bash:

```powershell
Remove-Item -Recurse -Force .\playwright-report, .\test-results, .\dist, .\ci-artifacts, .\hosted-demo-evidence-local -ErrorAction SilentlyContinue
$env:HOSTED_DEMO_EVIDENCE_DIR="$PWD\hosted-demo-evidence-local"
& "C:\Program Files\Git\bin\bash.exe" scripts/ci-browser.sh
Remove-Item Env:\HOSTED_DEMO_EVIDENCE_DIR -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .\hosted-demo-evidence-local -ErrorAction SilentlyContinue
git status --short
```

## Evidence classification

Validation evidence must be classified as one of the following:

- focused local check
- current no-browser gate
- full no-browser gate
- browser gate
- hosted demo evidence
- lock evidence bundle
- GitHub Actions CI evidence

Do not collapse these into one generic "tests passed" claim when locking a release.

## Release-truth consolidation rule

When a patch changes only documentation or audit artifacts, it must still include one verifier under `scripts/` if the effective-diff guard requires a script/test/workflow change.

Do not place ad-hoc verifier files under `tests/` unless they are properly registered in the test organization model. Script-level verifiers are preferred for one-off consolidation checks.

## No-behavior-change validation

For documentation and truth-surface reduction milestones, validation must confirm:

- no runtime behavior change
- no provider behavior change
- no OAuth behavior change
- no backend behavior change
- no storage behavior change
- no source behavior change
- no production OAuth
- no real API keys
- no live scraping
- no cryptographic signing claims
