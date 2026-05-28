# Mock stock stack

Local substitute for the upstream ADD stock API (no `API_KEY` required).

| Path | Role |
|------|------|
| `server/` | Express API: `GET /api/tickers`, `/api/latest`, `/api/stream` (SSE) |
| `client-dashboard/` | Minimal UI + proxy to the mock API |
| `fixtures/` | Synthetic ticks and fictional sensitive fields |

Start both services: `../scripts/run_mock.ps1` or `../scripts/run_mock.sh`.
