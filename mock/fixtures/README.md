# Fixtures

Fictional market data for local development only.

- `tickers.json` — catalog returned by `GET /api/tickers`
- `seed-ticks.json` — initial snapshots for `GET /api/latest`

SSE ticks from `mock/server` also include fictional PII fields (`trader_email`, `operator_name`, `comment`) so the integration pipeline and anonymizer can be tested.
