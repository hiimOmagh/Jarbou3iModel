# Privacy Audit Release Gate

`v1.0.24` treats every exported JSON payload as a security boundary and preserves the privacy gate while repository hygiene is tightened.

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

## Repository hygiene interaction

Privacy is not only an export issue. Release hygiene also requires local secret files and generated artifacts to stay out of the committed tree and out of release archives:

- `.env`, `.env.*`, and `backend/.dev.vars*` stay excluded.
- ZIPs, logs, temp files, `node_modules`, `test-results`, `playwright-report`, build folders, and coverage folders stay excluded.
- Browser evidence artifacts remain review material, not release approval.

## Tests

```bash
npm run test:privacy
npm run test:privacy:audit
npm run test:privacy:release-gate
npm run test:repo:hygiene-execution
```

Release-gate candidates include workflow fixtures, migration fixtures, schema JSON, browser-generated export fixtures, and repository hygiene checks.
