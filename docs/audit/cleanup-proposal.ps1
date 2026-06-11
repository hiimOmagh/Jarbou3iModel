# Generated cleanup proposal. Review before use.
# All Remove-Item commands are commented out intentionally.
# Un-comment only items you have manually approved.

$ErrorActionPreference = "Stop"

# Safe-remove candidates
# Remove-Item -Force '.\PACKAGE-MANIFEST.json' -ErrorAction SilentlyContinue  # root-level package/audit handoff file
# Remove-Item -Force '.\README-PACKAGE.md' -ErrorAction SilentlyContinue  # root-level package/audit handoff file
# Remove-Item -Force '.\repair-alpha66-v7.mjs' -ErrorAction SilentlyContinue  # root-level generated/debug/repair artifact pattern

# Review-before-remove candidates

Write-Host "Cleanup proposal reviewed. No commands run unless you uncomment them."