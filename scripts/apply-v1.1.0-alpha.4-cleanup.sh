#!/usr/bin/env bash
set -euo pipefail
rm -f assets/jarbou3i-mascot.png
find fixtures/migrations -maxdepth 1 -type f -name 'v*-packet.json' -delete
find fixtures/privacy -maxdepth 1 -type f -name 'browser-generated-export-*.json' -delete
echo "v1.1.0-alpha.4 cleanup deletions applied."
