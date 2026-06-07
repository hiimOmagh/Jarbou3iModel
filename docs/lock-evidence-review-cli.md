# Lock Evidence Review CLI Operator Commands

Current release: v1.4.0-alpha.57 — Visible-Text Token Drift Guard

This document is an operator handoff reference for the read-only lock evidence review CLI. It does not create, modify, sign, publish, or approve a release. It only reads the canonical dashboard digest already present in a lock evidence bundle.

## Review an extracted bundle

Use this when GitHub Actions artifacts have already been downloaded and extracted.

```powershell
node scripts/lock-evidence-review.mjs --bundle .\lock-evidence-bundle_1.4.0-alpha.57_<run_id>
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
node scripts/lock-evidence-review.mjs --bundle .\lock-evidence-bundle_1.4.0-alpha.57_<run_id>.zip
```

The command must remain read-only. It does not extract files into the repository and must not create `dist/`, `test-results/`, `playwright-report/`, or package artifacts.

## Emit JSON for automation handoff

Use JSON output when another script or an AI agent needs a structured lock review summary.

```powershell
node scripts/lock-evidence-review.mjs --bundle .\lock-evidence-bundle_1.4.0-alpha.57_<run_id>.zip --json
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
lock-evidence-review failed [LOCK_EVIDENCE_REVIEW_BUNDLE_CONTRACT/bundle_contract/exit 66]: lock evidence file missing: release-lock-dashboard/release-lock-dashboard-digest.json
```

or:

```text
lock-evidence-review failed [LOCK_EVIDENCE_REVIEW_BUNDLE_CONTRACT/bundle_contract/exit 66]: lock evidence file missing: release-lock-dashboard/release-lock-dashboard-digest.md
```

## Failure example: checksum omission

If the dashboard digest exists but is not listed in `checksums/SHA256SUMS.txt`, the command must fail with a checksum-coverage error:

```text
lock-evidence-review failed [LOCK_EVIDENCE_REVIEW_CHECKSUM_CONTRACT/checksum_contract/exit 67]: checksum manifest must include dashboard digest file: release-lock-dashboard/release-lock-dashboard-digest.json
```

## Exit code contract

The CLI uses stable exit codes so automation can distinguish a bad command from a bad bundle.

| Exit code | Failure family | Meaning |
| --- | --- | --- |
| `0` | `success` | Review completed; bundle is lockable, or `--allow-blocked` was used for an intentionally blocked bundle. |
| `1` | `unexpected` | Unexpected implementation failure. |
| `64` | `usage` | Missing or invalid CLI arguments, such as omitting `--bundle`. |
| `65` | `input` | Bundle path missing, unreadable, or invalid ZIP input. |
| `66` | `bundle_contract` | Required bundle/digest/schema/Markdown field is missing or malformed. |
| `67` | `checksum_contract` | Dashboard digest exists but checksum coverage is missing or malformed. |
| `68` | `lock_decision` | Bundle review completed but the evidence decision is not lockable. Use `--allow-blocked` only for inspection. |

Failure lines include the machine-readable code, failure family, and exit code:

```text
lock-evidence-review failed [LOCK_EVIDENCE_REVIEW_CHECKSUM_CONTRACT/checksum_contract/exit 67]: checksum manifest must include dashboard digest file
```

The JSON output also includes `exit_codes` and `failure_families` for automation handoff.

## CI smoke expectation

The CI lock-bundle job must run the review command against the generated bundle before uploading the canonical artifact:

```bash
node scripts/lock-evidence-review.mjs --bundle "$bundle"
node scripts/lock-evidence-review.mjs --bundle "$bundle" --json
```

A lock bundle is not ready for merge unless no-browser, browser, dashboard schema enforcement, checksum coverage, and this review CLI smoke all pass.

## Boundary statement

This CLI is release-evidence tooling only. It does not change provider execution, OAuth, backend, storage, source acquisition, browser UI, runtime behavior, credentials, export approval, publication status, or cryptographic signature state.
