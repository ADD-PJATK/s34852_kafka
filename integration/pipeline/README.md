# Pipeline: stream → export → anonymize → out/

1. Connect to `MOCK_BASE` (default `http://127.0.0.1:4000`) and read `PIPELINE_TICK_COUNT` SSE ticks for `PIPELINE_TICKER` (default `ACME`).
2. Write NDJSON to `export/`.
3. Invoke `anonymizer/anonymize.py` and write redacted NDJSON to `out/`.

```bash
node run.mjs
```

Environment: `MOCK_BASE`, `PIPELINE_TICKER`, `PIPELINE_TICK_COUNT`, `PYTHON`.
