#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
# BUG (Phase A): wrong default port (mock uses 4000)
export MOCK_BASE="${MOCK_BASE:-http://127.0.0.1:4001}"
cd "$ROOT/integration/tests"
node --test ./*.test.mjs
