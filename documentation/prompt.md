# Phase B — One-shot agent prompt

> **Phase A:** leave this file as a skeleton. During Phase B (~30 min) replace the block below with your **single** high-quality prompt, then run it **once** in Cursor Agent.

Do **not** paste secrets, API keys, or real personal data.

---

## Checklist before you run (Phase B)

- [ ] Phase A commit is pushed to `origin/main` (broken baseline)
- [ ] Mock stack fails or tests fail for the reasons in `plan-from-grading.md` §10
- [ ] Prompt includes: stack versions, layout, run commands, acceptance criteria, safety rules, debugging playbook
- [ ] Prompt is **not** trivial (“run the app”, “fix everything”)

---

## Your prompt (paste into the agent — fill in during Phase B)

```
[TODO — write your one-shot prompt here before running the agent.

Include at minimum:
- Python 3.x + Node 20 (or your versions)
- Paths: mock/server, mock/client-dashboard, integration/pipeline, integration/tests, anonymizer/
- Commands: npm install, scripts/run_mock.ps1, node integration/pipeline/run.mjs, scripts/run_tests.ps1, scripts/demo.ps1
- Acceptance: all integration tests pass; out/ has no trader_email, operator_name, comment; offline only
- Safety: no secrets; anonymizer deterministic (mappings.json); no external API
- Debug: run tests first; inspect SSE "data:" lines; check CLI flags (--in/--out vs --input/--output); verify mappings.json field names match fixtures
]
```

---

## After the run

1. Update `documentation/ai-fix-log.md` with failure logs, fixes, and passing `demo.ps1` output.
2. Export this chat to `documentation/ai-chat/` (see README there).
3. Push final `main` for MS Teams (repo URL + Phase A commit URL).
