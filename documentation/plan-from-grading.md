# Phase A — Plan from Phase 2 grading feedback

**Student:** Yokubjon Sulaymonov  
**Student ID:** s34852  
**Last Updated:** 2026-05-21  
**Course:** Analysis of Large Data Sets (ADD)  
**Repository:** https://github.com/ADD-PJATK/s34852_kafka

This document is the Phase A plan (evolved from Phase 2 AI work-plan feedback). Phase B uses `prompt.md`; evidence goes in `ai-fix-log.md`.

---

# 1. Scope of AI Use in This Project

This document describes how AI tools will be used during the ADD course project work. AI tools are used as development assistants, not as autonomous developers. All generated code, documentation, and configuration must be reviewed and verified manually before being committed.

| Activity | Allowed? | Notes |
|---|---|---|
| Boilerplate code generation | Yes | Must be reviewed and tested manually |
| CLI argument parsing | Yes | AI may suggest libraries and patterns |
| PySpark / streaming logic | Yes | APIs must be verified against official docs |
| Kafka consumer examples | Yes | Used only as implementation guidance |
| README drafting | Yes | Final wording reviewed manually |
| Git commit message suggestions | Yes | Messages edited manually if needed |
| Debugging stack traces | Yes | Errors analyzed manually before fixes |
| Architecture diagrams | Yes | Human-reviewed before submission |
| Runtime anonymization decisions | No | Forbidden by Assignment 1 |
| Automatic code generation without review | No | All code must be understood manually |
| Exam or individual graded work violating course rules | No | Must follow ADD academic integrity rules |

---

# 2. Tools and Models

## ChatGPT

ChatGPT is used for:
- explaining errors,
- suggesting implementation structures,
- generating README drafts,
- improving technical English,
- helping design workflows.

The tool is cloud-based. Sensitive information such as API keys, passwords, `.env` files, or private datasets must never be shared.

## GitHub Copilot

GitHub Copilot is used inside the IDE for:
- autocomplete,
- repetitive code generation,
- boilerplate functions,
- frontend component suggestions.

Generated code must always be reviewed manually before being accepted.

## Cursor

Cursor Agent may be used for:
- refactoring assistance,
- navigating larger codebases,
- generating small code modifications,
- improving developer productivity.

Only minimal context should be shared with the tool.

## Local Tools

Local terminal tools, linters, formatters, and testing frameworks are preferred whenever possible to reduce unnecessary data sharing.

---

# 3. Standard Workflow

The following workflow will be used consistently throughout the ADD project.

1. Read the assignment specification completely before asking AI for help.

2. Write a short human understanding of the task including:
    - inputs,
    - outputs,
    - constraints,
    - acceptance criteria.

3. Share only the minimum necessary context with AI tools:
    - file snippets,
    - schemas,
    - error messages,
    - configuration examples.

4. Request a high-level implementation plan before requesting actual code.

5. Ask for minimal and targeted changes instead of large rewrites.

6. Review every generated line manually before running the code.

7. Run the application locally and verify:
    - functionality,
    - logs,
    - outputs,
    - edge cases,
    - UTF-8 handling,
    - streaming behaviour.

8. Compare implementation results against assignment acceptance criteria.

9. Update README files, screenshots, and documentation after implementation changes.

10. Commit changes using meaningful commit messages reflecting the actual work completed.

---

# 4. Prompting Rules

The following prompting rules will always be followed when using AI tools.

- Always specify programming language and runtime versions.
- Always include exact file paths when requesting edits.
- Always mention assignment constraints explicitly.
- Request deterministic implementations whenever possible.
- Ask for error handling for invalid input and missing files.
- Require UTF-8-safe file handling.
- Ask for minimal diffs instead of rewriting entire files.
- Request step-by-step explanations before large implementations.
- Verify all imports and APIs against official documentation.
- Include acceptance criteria directly in prompts.
- Ask for clean commit-sized changes.
- End prompts with: “If unsure, ask clarifying questions before coding.”

---

# 5. Precautions and Prohibited Uses

The following rules are mandatory throughout the project.

1. API keys, `.env` files, passwords, and secrets must never be pasted into AI tools.

2. Real personal data must never be uploaded into cloud AI systems.

3. Only fictional, public, or assignment-safe datasets may be shared.

4. AI-generated code must never be merged without manual review and testing.

5. All Kafka, SSE, Python, and frontend APIs must be verified against official documentation.

6. AI tools must not introduce features outside assignment scope.

7. The anonymizer application must not use HTTP APIs, LLMs, or AI services at runtime.

8. All generated code must remain understandable by the student.

9. AI suggestions that appear incorrect, unsafe, or hallucinated must be rejected.

10. Screenshots, logs, and execution evidence must be stored in the repository.

11. The repository must maintain one consistent code style.

12. AI tools must not rewrite unrelated files during refactoring.

13. `.gitignore` must exclude secrets, virtual environments, and build artifacts.

14. Generated documentation must be checked by manually running all commands.

15. Commit history must reflect real development progress.

16. AI assistance does not remove academic responsibility from the student.

17. AI usage must stop when debugging security-sensitive or unclear production behaviour.

18. Deterministic behaviour is required for the anonymizer project.

---

# 6. Task-Specific AI Plans

## Task 1 — Local Data Anonymizer (`s34852_anonymize`)

### What AI will help with

- CLI argument parsing examples
- JSON schema validation
- UTF-8 file handling
- README formatting
- edge-case identification

### What I will do manually

- verify deterministic behaviour,
- validate overlapping replacement rules,
- test invalid mappings,
- ensure no runtime AI/API usage exists,
- verify UTF-8 output correctness.

### Definition of done

- Application processes `.txt`, `.csv`, `.json`, and `.md` files correctly.
- Invalid mappings return proper errors.
- README includes all required instructions.
- Screenshots and examples are included.

---

## Task 2 — Kafka Realtime Dashboard (`s34852_kafka`)

### What AI will help with

- SSE connection handling examples,
- frontend chart suggestions,
- reconnect logic,
- debugging streaming updates,
- UI layout improvements.

### What I will do manually

- verify API endpoints,
- test live updates locally,
- confirm ticker selection works,
- validate displayed timestamps and prices,
- test connection failure behaviour.

### Definition of done

- Dashboard receives live updates correctly.
- Reconnection logic functions properly.
- Charts or history tables display valid data.
- Screenshots show real live data.

---

## Task 3 — History Downloader / Viewer

### What AI will help with

- polling implementation examples,
- CSV export logic,
- JSON download formatting,
- frontend filtering suggestions,
- chart rendering examples.

### What I will do manually

- verify exported file contents,
- test time-range filtering,
- validate API key handling,
- confirm clean installation works.

### Definition of done

- Historical data loads correctly.
- CSV and JSON downloads work.
- Charts or tables display valid results.
- README instructions are reproducible.

---

## Task 4 — Documentation and Git Workflow

### What AI will help with

- improving technical English,
- markdown formatting,
- README organization,
- commit message suggestions.

### What I will do manually

- verify all commands,
- maintain repository structure,
- ensure screenshots are real,
- write accurate project explanations.

### Definition of done

- README files are complete,
- repositories contain meaningful commits,
- `.gitignore` is correct,
- setup works on clean installation.

---

# 7. Disclosure: How This Document Was Produced with AI

This document was partially drafted with assistance from AI tools including ChatGPT. AI assistance was used mainly for structuring sections, improving technical English, generating example workflow descriptions, and organizing the required assignment content into a professional format.

The prompts used were focused on:
- summarizing assignment requirements,
- generating markdown structures,
- creating examples of precautions,
- proposing workflow steps,
- improving wording clarity.

No secrets, API keys, private repositories, or personal datasets were shared with any AI system during the creation of this document.

After receiving AI-generated drafts, significant manual editing was performed. The workflow descriptions, project-specific tasks, and technical details were customized to match the actual ADD repositories and assignment requirements. Several AI-generated suggestions were rejected because they were too generic, added unnecessary features, or did not match the assignment scope.

The final responsibility for all content, implementations, and submitted work remains entirely with the student. AI tools are treated only as development assistants and not as authoritative sources.

---

# 8. Review Checklist Before Every Commit

- [ ] I ran the application locally.
- [ ] I verified all assignment acceptance criteria.
- [ ] No secrets or API keys are included in the commit.
- [ ] `.env` files are excluded from Git.
- [ ] README instructions were tested manually.
- [ ] Screenshots reflect real execution results.
- [ ] AI-generated code was reviewed manually.
- [ ] No unrelated files were modified.
- [ ] Commit message clearly describes the change.
- [ ] The application works on a clean environment.

---

# 10. AA4 mock integration plan (Phase A)

Based on my Phase 2 outcome (unified repo, AA1 + AA2 present, documentation graded). In my own words: the repo structure and README were acceptable, but **end-to-end integration** between streaming data and the anonymizer was not demonstrated, **run instructions** were easy to get wrong (paths, ports), and **tests** were missing for the combined flow.

## What I will mock (offline only)

| Component | Local substitute |
|-----------|------------------|
| Instructor stock API | `mock/server` on `localhost:4000` |
| Live dashboard | `mock/client-dashboard` on `4001` (proxies mock API) |
| SSE consumer + export | Dashboard buffers last **20** ticks; JSON/CSV export buttons |
| Anonymizer | `anonymizer/` + `mappings.json` (deterministic, no HTTP/LLM) |
| Proof | `integration/tests` + `scripts/demo.ps1` |

Fictional sensitive fields in fixtures/stream: `trader_email`, `operator_name`, `comment`.

## Success criteria (after Phase B)

- `scripts/demo.ps1` exits 0 with mock on `4000`.
- `integration/pipeline/out/*.ndjson` has **no** `trader_email`, `operator_name`, `comment`.
- All tests in `integration/tests/` pass with `MOCK_BASE=http://127.0.0.1:4000`.
- No secrets on `main`; no calls to `add.piotrkojalowicz.dev`.

## Intentional Phase A weaknesses (for the agent to fix)

These are **deliberate** on `main` before Phase B (not listed in `prompt.md`):

| # | Weakness | How to detect |
|---|----------|----------------|
| 1 | Pipeline calls `--input`/`--output`; anonymizer expects `--in`/`--out` | Anonymizer stderr / argparse error |
| 2 | `run.mjs` resolves `anonymizer` under `integration/` (one `..` too few) | `anonymize.py not found` |
| 3 | SSE collector splits on `\n` instead of `\n\n` | `JSON.parse` error on `data: {...}` or too few ticks |
| 4 | `mappings.json` still lists legacy keys (`analyst_email`, …) not stream fields | Tests pass mapping step but PII keys remain |
| 5 | `run_tests` defaults to port **4001** | Mock API tests fail if only port 4000 is running |
| 6 | `export-path.test.mjs` looks under `integration/export/` | Wrong-path assertion |
| 7 | README suggests manual `node run.mjs` without starting mock | Connection refused |
| 8 | Dashboard CSV export uses `;` delimiter | Broken import in Excel (documented in fix log) |

## Anticipated failure modes (agent debugging)

1. **ECONNREFUSED on fetch** — mock not running or wrong `MOCK_BASE` / port mismatch.  
2. **SyntaxError parsing SSE** — inspect raw `data:` lines; fix event framing (`\n\n`).  
3. **Anonymizer exit code ≠ 0** — compare CLI flags between `run.mjs` and `anonymize.py --help`.  
4. **PII still in `out/`** — open `mappings.json` `find[]` vs actual NDJSON keys.  
5. **Tests pass API but fail export path** — read `export-path.test.mjs` expected directory.  
6. **Race** — run `demo.ps1` (waits for `/api/tickers`) instead of raw `run_tests` before mock is up.  
7. **Wrong working directory** — run pipeline from repo root via documented scripts, not only `cd integration/pipeline`.

---

# 9. Revision Log

| Date | Version | Change |
|---|---|---|
| 2026-05-21 | 0.1 | Initial draft created with AI assistance |
| 2026-05-21 | 1.0 | Added project-specific workflows, precautions, and task plans |
| 2026-05-28 | 1.1 | Renamed to Phase A plan; repo reshaped for AA4 mock + integration |
| 2026-05-28 | 1.2 | Added §10 AA4 mock plan, failure modes, intentional bugs |
