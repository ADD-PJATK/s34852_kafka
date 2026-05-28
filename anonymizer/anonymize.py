#!/usr/bin/env python3
"""Local NDJSON anonymizer (AA1-style). Deterministic; no network/LLM."""
from __future__ import annotations

import argparse
import json
from pathlib import Path


def load_mappings(path: Path) -> list[dict]:
    data = json.loads(path.read_text(encoding="utf-8"))
    return data.get("rules", [])


def redact_row(row: dict, rules: list[dict]) -> dict:
    out = dict(row)
    for rule in rules:
        find_keys = rule.get("find", [])
        replacement = rule.get("replace", "")
        for key in find_keys:
            if key in out:
                out[key] = replacement
    return out


def main() -> None:
    parser = argparse.ArgumentParser(description="Local NDJSON anonymizer")
    parser.add_argument("--in", dest="input_path", required=True, type=Path)
    parser.add_argument("--out", dest="output_path", required=True, type=Path)
    args = parser.parse_args()

    mapping_file = Path(__file__).resolve().parent / "mappings.json"
    rules = load_mappings(mapping_file)

    lines_out: list[str] = []
    for line in args.input_path.read_text(encoding="utf-8").splitlines():
        if not line.strip():
            continue
        row = json.loads(line)
        lines_out.append(json.dumps(redact_row(row, rules), ensure_ascii=False))

    args.output_path.parent.mkdir(parents=True, exist_ok=True)
    args.output_path.write_text("\n".join(lines_out) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
