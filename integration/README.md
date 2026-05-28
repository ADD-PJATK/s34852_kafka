# Integration (AA4)

| Path | Role |
|------|------|
| `pipeline/` | Stream from mock API → `export/` → anonymizer → `out/` |
| `tests/` | Node test runner; **fails** until Phase B fixes anonymizer wiring |

Run pipeline (mock server must be up):

```bash
cd pipeline && node run.mjs
```

Run tests:

```bash
../scripts/run_tests.ps1
```

End-to-end: `../scripts/demo.ps1`
