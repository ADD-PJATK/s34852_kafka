#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
export MOCK_PORT="${MOCK_PORT:-4000}"
export DASHBOARD_PORT="${DASHBOARD_PORT:-4001}"
export MOCK_BASE="http://127.0.0.1:${MOCK_PORT}"

(cd "$ROOT/mock/server" && npm install && node server.js) &
MOCK_PID=$!
sleep 1
(cd "$ROOT/mock/client-dashboard" && npm install && node server.js) &
DASH_PID=$!

echo "Mock API:  http://localhost:${MOCK_PORT} (pid $MOCK_PID)"
echo "Dashboard: http://localhost:${DASHBOARD_PORT} (pid $DASH_PID)"
wait
