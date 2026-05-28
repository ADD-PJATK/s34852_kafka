#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
export MOCK_PORT="${MOCK_PORT:-4000}"
export MOCK_BASE="http://127.0.0.1:${MOCK_PORT}"

(cd "$ROOT/mock/server" && npm install && node server.js) &
MOCK_PID=$!
trap 'kill $MOCK_PID 2>/dev/null || true' EXIT

for _ in $(seq 1 30); do
  if curl -sf "${MOCK_BASE}/api/tickers" >/dev/null; then break; fi
  sleep 0.4
done

(cd "$ROOT/integration/pipeline" && node run.mjs)
"$ROOT/scripts/run_tests.sh"
