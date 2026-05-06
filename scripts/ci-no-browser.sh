#!/usr/bin/env bash
set -euo pipefail

node tests/ci-gate-runner.mjs no-browser
