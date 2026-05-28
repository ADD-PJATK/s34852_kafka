# Local data anonymizer (AA1)

This folder should contain your Assignment 1 anonymizer. If you only see a stub, restore the real project from the backup branch:

```bash
git checkout backup -- anonymizer
```

## Expected CLI (integration pipeline)

The integration pipeline calls:

```bash
python anonymize.py -i <export.ndjson> -o <out.ndjson>
```

Mapping rules live in `mappings.json` (`find[]` → `replace`).

## Rules

- Deterministic replacements only (mapping files).
- No HTTP, LLM, or cloud AI at runtime.
- UTF-8 in/out.
