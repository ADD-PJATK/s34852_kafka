# Local data anonymizer (AA1)

This folder should contain your Assignment 1 anonymizer. If you only see a stub, restore the real project from the backup branch:

```bash
git checkout backup -- anonymizer
```

## Expected CLI (integration pipeline)

The integration pipeline calls:

```bash
python anonymize.py --input <export.ndjson> --output <out.ndjson>
```

Adjust `anonymize.py` argument names in `integration/pipeline/run.mjs` if your AA1 CLI differs.

## Rules

- Deterministic replacements only (mapping files).
- No HTTP, LLM, or cloud AI at runtime.
- UTF-8 in/out.
