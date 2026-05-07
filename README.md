# Live price updates (SSE)

## Run locally (PowerShell)

```powershell
cd <path-to-your-cloned-repo>

npm install

$env:API_KEY="<PUT_YOUR_KEY_HERE>"

npm run dev
```

Then open the URL printed in the terminal, e.g. `http://localhost:3000` (or `:3001` if 3000 is taken).

## Use

1. In the left panel, **select one or more tickers** (checkboxes).
2. Watch the “Live” table for **ticker / price / timestamp** updates.
3. Click **“Clear selection”** to unsubscribe from all streams.

