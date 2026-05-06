#!/usr/bin/env bash
set -euo pipefail
if [[ ! -d .git ]]; then echo "ERROR: run from repository root"; exit 1; fi
git rm -f --ignore-unmatch BROWSER_EVIDENCE.md HOSTED_DEMO_VERIFICATION.md RELEASE_MANIFEST.md RELEASE_NOTES.md MANIFEST.md CHANGED_FILES_MANIFEST.json DELETE_FILES_MANIFEST.json scripts/apply-v1.1.0-alpha.5-structural-cleanup.sh
echo "v1.1.0-alpha.7 root artifact cleanup deletions applied."
