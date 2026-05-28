# AI fix log — Phase B/C evidence

Record each AI-assisted fix after Phase B. **Do not** document the intentional bug list here before the agent run (that belongs in `plan-from-grading.md` only).

| Date | Issue | Fix (files) | Verified by |
|------|-------|-------------|-------------|
| _Phase A_ | Baseline committed with intentional bugs | — | `scripts/demo.ps1` fails |
| _Phase B_ | _fill after agent run_ | _files_ | `scripts/run_tests.ps1` |

## Phase A — baseline failure (example)

Run before Phase B (save output in this section after you capture it):

```text
# .\scripts\demo.ps1
# Expected: pipeline and/or tests fail (SSE parse, CLI flags, paths, mappings, wrong test port)
```

## Reflection (fill after Phase C)

- What did the agent get right on the first try?
- What did you have to correct manually?
- What would you add to `prompt.md` next time?
