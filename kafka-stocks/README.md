# Live price updates (SSE) — AA2

Optional Assignment 2 dashboard. Uses the course upstream API when `API_KEY` is set, or point `UPSTREAM_BASE` at the local mock (`http://localhost:4000`).

## Run locally (PowerShell)

```powershell
cd kafka-stocks
npm install
$env:API_KEY="<PUT_YOUR_KEY_HERE>"   # omit when using mock/server only
npm run dev
```

Open the URL printed in the terminal (default `http://localhost:3000`).

## Use

1. Select tickers in the left panel.
2. Watch live price and timestamp updates.
3. Click **Clear selection** to unsubscribe.

For AA4 work on `main`, prefer `mock/client-dashboard` and `scripts/run_mock.ps1`.
