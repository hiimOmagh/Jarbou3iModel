# v1.4.0-alpha.68 — Release Identity Field Map

This milestone is intentionally **diagnostic-only**. It does not update the package version, release title, current-release contract, registries, or documentation release labels.

The purpose is to map every release-identity surface before the next mutating patch. This prevents the previous global-replacement failure mode where old release titles were partially rewritten into corrupted mixed strings.

## Scope

Added files:

- `scripts/release-identity-field-map.mjs`
- `scripts/release-identity-field-map-check.mjs`
- `docs/release/release-identity-field-map.md`
- generated after script execution: `docs/release/release-identity-field-map-latest.json`

## Rules

- No global string replacement.
- No title-word replacement inside historical labels.
- No mutation of lock evidence bundles.
- No rewriting of historical release notes unless explicitly classified as current release identity.
- No runtime, provider, OAuth, backend, storage, or source-acquisition behavior changes.

## Operator commands

```powershell
node .\scripts\release-identity-field-map.mjs
node .\scripts\release-identity-field-map-check.mjs
node .\tests\repo-file-hygiene-check.mjs
node .\tests\test-organization-audit-check.mjs
node .\tests\effective-diff-check.mjs
npm run test:current:no-browser
```

## Expected output

The generated JSON file should identify:

- current owner candidate files
- JSON fields that mention the current release version or label
- tests asserting current identity
- historical reference candidates that should not be rewritten automatically
- blocked mutation rules
- corruption findings, expected to be empty

## Follow-up milestone

`v1.4.0-alpha.69 — Structured Release Identity Mutation`

Alpha.69 may implement the actual version update only after the alpha.68 field map is reviewed. The alpha.69 updater must operate from an allowlist derived from the field map, not from global string replacement.
