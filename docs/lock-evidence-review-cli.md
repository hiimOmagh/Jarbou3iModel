# Lock Evidence Review CLI Operator Commands

Current release: v1.4.0-alpha.55 — Lock Review CLI CI Smoke + Operator Command Docs

This document is an operator handoff reference for the read-only lock evidence review CLI. It does not create, modify, sign, publish, or approve a release. It only reads the canonical dashboard digest already present in a lock evidence bundle.

## Review an extracted bundle

Use this when GitHub Actions artifacts have already been downloaded and extracted.

```powershell
node scripts/lock-evidence-review.mjs --bundle .\lock-evidence-bundle_1.4.0-alpha.55_<run_id>
```

Expected successful summary includes:

```text
Lock evidence review: LOCKABLE
no-browser: passed
browser: passed
Evidence matrix: 39/39
Hosted captures: 4/4
Targeted regions: 5/5
Dashboard digest checksums: present
```

## Review a ZIP bundle directly

Use this when the canonical lock bundle is still compressed.

```powershell
node scripts/lock-evidence-review.mjs --bundle .\lock-evidence-bundle_1.4.0-alpha.55_<run_id>.zip
```

The command must remain read-only. It does not extract files into the repository and must not create `dist/`, `test-results/`, `playwright-report/`, or package artifacts.

## Emit JSON for automation handoff

Use JSON output when another script or an AI agent needs a structured lock review summary.

```powershell
node scripts/lock-evidence-review.mjs --bundle .\lock-evidence-bundle_1.4.0-alpha.55_<run_id>.zip --json
```

Required JSON fields include:

```text
review_contract_version
release
version
identity.commit_sha
identity.ref_name
identity.run_id
gates.no_browser.status
gates.browser.status
evidence.evidence_matrix.passed_rows
evidence.hosted_demo.capture_count
evidence.targeted_regions.passed_count
lock_decision.reviewer_decision
checksum_manifest_includes_dashboard_digest
next_action
```

## Failure example: missing dashboard digest

If the bundle does not contain the dashboard JSON or Markdown digest, the command must fail before any merge decision:

```text
lock-evidence-review failed: lock evidence file missing: release-lock-dashboard/release-lock-dashboard-digest.json
```

or:

```text
lock-evidence-review failed: lock evidence file missing: release-lock-dashboard/release-lock-dashboard-digest.md
```

## Failure example: checksum omission

If the dashboard digest exists but is not listed in `checksums/SHA256SUMS.txt`, the command must fail with a checksum-coverage error:

```text
lock-evidence-review failed: checksum manifest must include dashboard digest file: release-lock-dashboard/release-lock-dashboard-digest.json
```

## CI smoke expectation

The CI lock-bundle job must run the review command against the generated bundle before uploading the canonical artifact:

```bash
node scripts/lock-evidence-review.mjs --bundle "$bundle"
node scripts/lock-evidence-review.mjs --bundle "$bundle" --json
```

A lock bundle is not ready for merge unless no-browser, browser, dashboard schema enforcement, checksum coverage, and this review CLI smoke all pass.

## Boundary statement

This CLI is release-evidence tooling only. It does not change provider execution, OAuth, backend, storage, source acquisition, browser UI, runtime behavior, credentials, export approval, publication status, or cryptographic signature state.
