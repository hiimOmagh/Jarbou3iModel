Current release reference: v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence. Planning/preflight only; no live/provider/OAuth/backend/source/storage expansion. Locked stable baseline: v1.3.0 — Stable Manual Workflow Release. Locked trace/readiness baseline: v1.4.0-alpha.4 — Dry-Run Trace Inspector + Execution Readiness Report.

# Privacy Audit Release Gate

## v1.3.0 — Stable Manual Workflow Release

Release apply integrity gate for changed-files-only patch handoff. Artifact download success, screenshots alone, or ZIP existence alone are insufficient. Required validation: `npm run test:v126:no-browser`, `npm run test:ci:no-browser`, and `PLAYWRIGHT_SKIP_INSTALL=1 npm run test:ci:browser`. No runtime/provider/OAuth/backend/source/storage/public-demo capability expansion.


`v1.1.0` treats every exported JSON payload as a security boundary and preserves the privacy gate while public-demo release approval is locked.

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


Evidence manifest continuity: v1.1.0 preserves the single final metadata hosted-demo evidence manifest gate.

Continuity note: Root Manifest and Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, changed-files-only discipline, no live scraping, No real OAuth, screenshots alone, hosted evidence, and ZIPs are not sufficient for release approval.


Continuity discipline: Root Manifest and Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, and changed-files-only discipline are preserved.


Release-lock guard: v1.3.0 Stable Manual Workflow Release requires green no-browser CI, green browser CI, and reviewed hosted-demo evidence. Screenshots alone are insufficient. ZIP existence alone is insufficient. A local ZIP archive alone is insufficient.

Current release reference: v1.3.0 — Stable Manual Workflow Release. release-lock evidence remains required.

Governance continuity: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization audit, planning gate, apply integrity, and changed-files-only discipline are preserved.

Provenance continuity: Package Script Compression, CI Gate Registry, Root Manifest, Release Artifact Consolidation, Migration + Privacy Fixture Registry Consolidation, Fixture Registry payload compression, test organization audit, provenance ledger, changed-files-only discipline, visual freeze, and mobile header continuity are preserved.

Release continuity note: Root Manifest, Release Artifact Consolidation, Version Suite Registry, Package Script Compression, Fixture Registry payload compression, test organization, planning gate, apply integrity, and changed-files-only safeguards remain active.

Provenance ledger, changed-files-only, CI Gate Registry, Package Script Compression, Fixture Registry payload compression, visual freeze, and mobile header release safeguards remain active.

No live scraping. No real OAuth or production OAuth is enabled. Screenshots alone, ZIP existence alone, and ZIP archive alone are insufficient for release approval.

Evidence manifest gate continuity: single final metadata, capture manifest, visual freeze, mobile header, CI Gate Registry, Package Script, Root Manifest, Release Artifact Consolidation, Fixture Registry payload compression, test organization, planning gate. v1.1.0 and 1.3.0 continuity preserved.

Provenance gate continuity: provenance ledger, changed-files-only, fixture registry consolidation, visual freeze, mobile header, CI Gate Registry, Package Script, Root Manifest, Release Artifact Consolidation. v1.1.0 and 1.3.0 continuity preserved.
