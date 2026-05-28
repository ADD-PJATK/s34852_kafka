# s34852_kafka — ADD AA4 (main branch)

Local mock stock API, integration pipeline (stream → export → anonymize), and course documentation. Earlier assignments live in sibling folders or on the `backup` branch.

## Quick start (mock stack)

**PowerShell (Windows):**

```powershell
.\scripts\run_mock.ps1
```

**Bash:**

```bash
./scripts/run_mock.sh
```

- Mock API: `http://localhost:4000` — `GET /api/tickers`, `/api/latest`, `/api/stream` (SSE)
- Dashboard: `http://localhost:4001` (proxies the mock API)

Set `MOCK_PORT` / `DASHBOARD_PORT` to override defaults.

## Integration demo

```powershell
.\scripts\demo.ps1
```

Runs the pipeline against the mock server and executes integration tests. Tests are **expected to fail** until Phase B wiring and anonymizer fixes are complete.

## Repository layout

```
s34852_kafka/
├── README.md
├── .gitignore
├── documentation/
│   ├── prompt.md
│   ├── plan-from-grading.md
│   ├── ai-fix-log.md
│   └── ai-chat/
├── anonymizer/
├── kafka-stocks/
├── mock/
│   ├── server/
│   ├── client-dashboard/
│   └── fixtures/
├── integration/
│   ├── pipeline/
│   └── tests/
└── scripts/
    ├── run_mock.sh | run_mock.ps1
    ├── run_tests.sh | run_tests.ps1
    └── demo.sh | demo.ps1
```

| Path | Purpose |
|------|---------|
| `documentation/` | Phase A plan, Phase B prompt, AI fix log, chat exports |
| `anonymizer/` | AA1 local anonymizer (restore from `backup` if empty) |
| `kafka-stocks/` | AA2 live dashboard (optional; upstream or mock) |
| `mock/` | Local API + fixtures + minimal dashboard |
| `integration/` | Pipeline and tests |
| `scripts/` | `run_mock`, `run_tests`, `demo` |

On Linux/macOS you can also use `make mock`, `make test`, or `make demo`.

## Documentation

- [Phase A plan](documentation/plan-from-grading.md)
- [Phase B agent prompt](documentation/prompt.md)
- [AI fix log](documentation/ai-fix-log.md)
- [AI chat exports](documentation/ai-chat/README.md)

## kafka-stocks (AA2)

See [kafka-stocks/README.md](kafka-stocks/README.md) for the upstream SSE dashboard (`API_KEY` required).

## Anonymizer (AA1)

If `anonymizer/` is only a stub, restore from backup:

```bash
git checkout backup -- anonymizer
```
