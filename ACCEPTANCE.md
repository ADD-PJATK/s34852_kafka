# AA4 acceptance checklist

## Repository

- [ ] Backup branch `backup/pre-aa4-2026-05-28` pushed
- [ ] `main` matches layout in assignment spec
- [ ] `.gitignore` excludes secrets, `node_modules`, `out/`
- [ ] `README.md` quick-start (mock, demo, tests)

## Documentation

- [ ] `documentation/plan-from-grading.md` (Phase 2 feedback + §10 mock plan)
- [ ] `documentation/prompt.md` (Phase B one-shot text)
- [ ] `documentation/ai-fix-log.md` (evidence after Phase B)
- [ ] `documentation/ai-chat/` (exported conversations)

## Mock stack

- [ ] `GET /api/tickers`, `/api/latest`, `/api/stream` on localhost
- [ ] Dashboard shows live ticker/price/ts; buffers **N=20** ticks
- [ ] Export JSON/CSV from dashboard
- [ ] Fictional PII in fixtures/stream

## Integration

- [ ] `integration/pipeline`: stream → `export/` → anonymizer → `out/`
- [ ] `integration/tests`: fail on Phase A baseline; pass after Phase B
- [ ] `scripts/demo.ps1` / `demo.sh` end-to-end

## Phase A submission

- [ ] Commit on `main` **before** Phase B agent run
- [ ] Message e.g. `AA4 Phase A: mock baseline with intentional bugs`
- [ ] MS Teams: Phase A commit URL + final repo URL

## Bonus (one prompt)

- [ ] Single agent run from `documentation/prompt.md`
- [ ] Prompt is detailed (not “run the app”)
- [ ] Instructor verifies app works after one run
