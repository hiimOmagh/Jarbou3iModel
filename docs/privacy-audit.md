# Privacy Audit Release Gate

## v1.1.0-alpha.4 — Migration + Privacy Fixture Registry Consolidation

Release apply integrity gate for changed-files-only patch handoff. Artifact download success, screenshots alone, or ZIP existence alone are insufficient. Required validation: `npm run test:v126:no-browser`, `npm run test:ci:no-browser`, and `PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser`. No runtime/provider/OAuth/backend/source/storage/public-demo capability expansion.


`v1.1.0-alpha.4` treats every exported JSON payload as a security boundary and preserves the privacy gate while public-demo release approval is locked.

The privacy system has two layers:

1. `privacy-export-guard.js` redacts obvious sensitive fields and secret-shaped text.
2. `privacy-audit.js` performs a final release-gate scan on the exported payload after redaction/removal.

## Export contract

Every safe export receives a `privacy_export` object with:

- `audit_version`
- `guard_version`
- `release_gate`
- `pre_redaction_issue_count`
- `post_redaction_issue_count`
- `key_exported:false`
- `raw_token_exported:false`
- `access_token_exported:false`
- `refresh_token_exported:false`
- `secret_exported:false`
- `credential_exported:false`
- `redaction_applied`
- `redacted_issues`

## Hard rule

Final exported payloads must pass with:

```text
release_gate: pass
post_redaction_issue_count: 0
key_exported: false
raw_token_exported: false
```

The scanner allows safe derived metadata such as `token_hash`, `key_exported:false`, and `raw_token_exported:false`. It does not allow raw secret fields or secret-shaped values in the final payload.

## Public demo release-lock interaction

Privacy is part of release approval. Public demo release approval is blocked if privacy/export gates fail, if raw artifacts contain secrets, or if generated artifacts are treated as approval without review.

## Repository hygiene interaction

- `.env`, `.env.*`, and `backend/.dev.vars*` stay excluded.
- ZIPs, logs, temp files, `node_modules`, `test-results`, `playwright-report`, build folders, and coverage folders stay excluded.
- Browser evidence artifacts remain review material, not release approval.

## Tests

```bash
npm run test:privacy
npm run test:privacy:audit
npm run test:privacy:release-gate
npm run test:public-demo-release-lock
```


Evidence manifest continuity: v1.1.0-alpha.4 preserves the single final metadata hosted-demo evidence manifest gate.
