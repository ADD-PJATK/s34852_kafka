#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
export MOCK_BASE="${MOCK_BASE:-http://127.0.0.1:4000}"
cd "$ROOT/integration/tests"
node --test ./*.test.mjs
