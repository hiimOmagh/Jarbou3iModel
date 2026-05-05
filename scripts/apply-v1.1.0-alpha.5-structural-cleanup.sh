#!/usr/bin/env bash
set -euo pipefail

if [[ ! -d .git ]]; then
  echo "ERROR: run from repository root."
  exit 1
fi

required=(
  "docs/release-history.md"
  "docs/current-release.md"
  "docs/release-and-evidence.md"
  "tests/version-suite-registry.json"
  "tests/version-suite-registry-check.mjs"
  "tests/current-no-browser-suite.mjs"
  "tests/release-docs-loader.mjs"
)

for file in "${required[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "ERROR: required replacement file missing: $file"
    exit 1
  fi
done

echo "Removing obsolete standalone release docs and version-suite wrappers from Git tracking..."
git rm -f --ignore-unmatch docs/v*.md docs/repo-cleanup-audit-v1.0.6.md
git rm -f --ignore-unmatch tests/v*-no-browser-suite.mjs

echo "Verifying cleanup..."
if git ls-files 'docs/v*.md' | grep -q .; then
  echo "ERROR: standalone docs/v*.md files remain tracked."
  git ls-files 'docs/v*.md'
  exit 1
fi
if git ls-files 'docs/repo-cleanup-audit-v1.0.6.md' | grep -q .; then
  echo "ERROR: docs/repo-cleanup-audit-v1.0.6.md remains tracked."
  exit 1
fi
if git ls-files 'tests/v*-no-browser-suite.mjs' | grep -q .; then
  echo "ERROR: version-specific no-browser suite wrappers remain tracked."
  git ls-files 'tests/v*-no-browser-suite.mjs'
  exit 1
fi

echo "v1.1.0-alpha.5 structural cleanup deletions applied."
echo "Next validation: npm run test:current:no-browser && npm run test:ci:no-browser"
