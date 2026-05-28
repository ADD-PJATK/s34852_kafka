#!/usr/bin/env python3
"""
Stub anonymizer — Phase B must replace or restore real AA1 code from `backup`.

Currently copies input to output unchanged (integration tests should fail).
"""
from __future__ import annotations

import argparse
import shutil
from pathlib import Path


def main() -> None:
    parser = argparse.ArgumentParser(description="Stub local anonymizer")
    parser.add_argument("--input", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    args = parser.parse_args()

    args.output.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(args.input, args.output)


if __name__ == "__main__":
    main()
