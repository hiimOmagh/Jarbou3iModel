# v1.4.0-alpha.48 — Bulk Diagnosis UX + Gate Failure Family Report

Public label: v1.4.0-alpha.48 Bulk Diagnosis UX + Gate Failure Family Report

Alpha.48 keeps the alpha.47 patch-package safety contract and adds operator-readable bulk diagnosis output: failure-family summary, failed commands, affected checks/files, likely root cause, recommended next command, and operator repair checklist.

# Patch Package Contract

This contract prevents patch-package artifacts from colliding with repository files on case-insensitive filesystems.

## Required ZIP shape

Every patch package ZIP must contain exactly one nested top-level folder.

Correct:

```text
alpha47-some-repair-package.zip
└── alpha47-some-repair/
    ├── apply-<slug>.mjs
    ├── validate-<slug>.mjs
    ├── README-PACKAGE.md
    └── PACKAGE-MANIFEST.json
```

Wrong:

```text
README.md
MANIFEST.json
manifest.json
package.json
package-lock.json
CHANGELOG.md
PUBLIC_DEMO.md
index.html
apply.mjs
validate.mjs
```

## Forbidden ZIP-root entries

Patch ZIPs must not place these names at ZIP root:

```text
README.md
MANIFEST.json
manifest.json
package.json
package-lock.json
CHANGELOG.md
PUBLIC_DEMO.md
index.html
```

If a real repo file must be changed, the package must carry that change inside the nested folder and apply it through `apply-<slug>.mjs`.

## Required package metadata

Use nested package metadata only:

```text
PACKAGE-MANIFEST.json
README-PACKAGE.md
```

Never use root-level `manifest.json` or root-level `README.md` as patch metadata.

## Cleanup invariant

The repository root must not contain:

```text
_patch-*
*-package.zip
PACKAGE-MANIFEST.json
README-PACKAGE.md
apply-*.mjs
validate-*.mjs
```

Run before validation:

```powershell
Remove-Item -Recurse -Force .\_patch-* -ErrorAction SilentlyContinue
Remove-Item -Force .\*-package.zip -ErrorAction SilentlyContinue
Remove-Item -Force .\PACKAGE-MANIFEST.json, .\README-PACKAGE.md, .\apply-*.mjs, .\validate-*.mjs -ErrorAction SilentlyContinue
```
