#!/usr/bin/env bash
set -euo pipefail

MODE="${1:-dry-run}"

if [[ ! -d ".git" ]]; then
  echo "ERROR: Run this from the repository root."
  exit 1
fi

if [[ "$MODE" != "dry-run" && "$MODE" != "--apply" ]]; then
  echo "Usage:"
  echo "  bash scripts/apply-alpha4-tracked-cleanup.sh"
  echo "  bash scripts/apply-alpha4-tracked-cleanup.sh --apply"
  exit 1
fi

required_files=(
  "fixtures/migrations/migration-registry.json"
  "fixtures/privacy/privacy-export-registry.json"
  "assets/jarbou3i-mascot-192.png"
  "assets/jarbou3i-mascot-512.png"
  "assets/favicon-32.png"
  "assets/apple-touch-icon.png"
)

echo "Checking required replacement/active files..."
for file in "${required_files[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "ERROR: Required file missing: $file"
    echo "Do not delete old fixtures until the replacement registry/assets exist."
    exit 1
  fi
done

delete_targets=(
  "assets/jarbou3i-mascot.png"
  "docs/v1.1.0-alpha.3-repository-consolidation-audit-retention-registry.md"
)

echo
echo "Planned fixed deletions:"
for file in "${delete_targets[@]}"; do
  if git ls-files --error-unmatch "$file" >/dev/null 2>&1; then
    echo "  tracked: $file"
  elif [[ -e "$file" ]]; then
    echo "  untracked/local: $file"
  else
    echo "  absent: $file"
  fi
done

echo
echo "Planned migration fixture deletions:"
git ls-files "fixtures/migrations/v*-packet.json" || true

echo
echo "Planned privacy fixture deletions:"
git ls-files "fixtures/privacy/browser-generated-export-*.json" || true

if [[ "$MODE" == "dry-run" ]]; then
  echo
  echo "DRY RUN ONLY. Nothing deleted."
  echo "To apply:"
  echo "  bash scripts/apply-alpha4-tracked-cleanup.sh --apply"
  exit 0
fi

echo
echo "Applying tracked cleanup deletions..."

git rm -f --ignore-unmatch assets/jarbou3i-mascot.png
git rm -f --ignore-unmatch docs/v1.1.0-alpha.3-repository-consolidation-audit-retention-registry.md
git rm -f --ignore-unmatch fixtures/migrations/v*-packet.json
git rm -f --ignore-unmatch fixtures/privacy/browser-generated-export-*.json

echo
echo "Verifying obsolete tracked files are gone..."

if git ls-files "fixtures/migrations/v*-packet.json" | grep -q .; then
  echo "ERROR: Some migration packet files are still tracked."
  git ls-files "fixtures/migrations/v*-packet.json"
  exit 1
fi

if git ls-files "fixtures/privacy/browser-generated-export-*.json" | grep -q .; then
  echo "ERROR: Some privacy export fixture files are still tracked."
  git ls-files "fixtures/privacy/browser-generated-export-*.json"
  exit 1
fi

if git ls-files "assets/jarbou3i-mascot.png" | grep -q .; then
  echo "ERROR: Oversized unused mascot asset is still tracked."
  exit 1
fi

echo
echo "Cleanup applied successfully."
echo
echo "Next validation:"
echo "  npm run test:fixture-registry"
echo "  npm run test:v110a4:no-browser"
echo "  npm run test:ci:no-browser"
echo
echo "Then commit:"
echo "  git add -A"
echo "  git commit -m \"fix: apply alpha.4 tracked cleanup deletions\""
echo "  git push"