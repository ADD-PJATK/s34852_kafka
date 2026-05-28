# Phase B — One-shot agent prompt

Use this file as the **single prompt** you paste into Cursor (or another agent) for Phase B. Fill in the bracketed sections before running.

---

## Context

- **Repo:** `s34852_kafka` (ADD course, AA4 on `main`)
- **Goal:** Wire `integration/pipeline` so it streams from `mock/server`, exports ticks, runs `anonymizer/` on the export, and writes redacted output to `integration/pipeline/out/`.
- **Tests:** `integration/tests/` must pass after your changes (they fail on purpose before Phase B).

## Constraints

- Do not add runtime LLM/API calls inside the anonymizer (AA1 rule).
- Use only fictional data from `mock/fixtures/`.
- Keep diffs minimal; match existing Node/Python style in the repo.
- Do not commit secrets or `.env` files.

## Tasks

1. Restore or verify `anonymizer/` from branch `backup` if the folder is still a stub.
2. Implement or fix `integration/pipeline` (stream → `export/` → anonymize → `out/`).
3. Ensure `mock/server` endpoints match what the pipeline and dashboard expect.
4. Make `scripts/demo.ps1` (and `.sh`) succeed end-to-end.
5. Update `documentation/ai-fix-log.md` with what you changed and how you verified it.

## Acceptance criteria

- [ ] `.\scripts\run_tests.ps1` exits 0
- [ ] `out/` contains no keys: `analyst_email`, `employee_id`, `internal_note`
- [ ] README quick-start commands still work
- [ ] No unrelated files refactored

## Prompt (copy below)

```
You are working in s34852_kafka on branch main.

Fix the integration pipeline and anonymizer wiring so integration/tests pass.

Read documentation/plan-from-grading.md and documentation/ai-fix-log.md first.
Run scripts/run_tests.ps1 after each change.

Requirements:
- Stream from MOCK_BASE (default http://localhost:4000) for ticker ACME
- Export NDJSON to integration/pipeline/export/
- Run anonymizer on that export; output to integration/pipeline/out/
- Strip fictional PII fields: analyst_email, employee_id, internal_note
- Do not use cloud AI inside the anonymizer at runtime

If anonymizer/ is empty, run: git checkout backup -- anonymizer

If unsure, ask clarifying questions before coding.
```
