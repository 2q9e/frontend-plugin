#!/usr/bin/env python3
"""Read-only scan for a few explicit UI placeholders and inert link targets.

This is a narrow source signal check, not an aesthetic or accessibility audit.
Every finding needs human context review; no file is modified.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Iterable


EXTENSIONS = {
    ".astro",
    ".css",
    ".htm",
    ".html",
    ".js",
    ".jsx",
    ".scss",
    ".svelte",
    ".ts",
    ".tsx",
    ".vue",
}
SKIP_DIRS = {
    ".git",
    ".next",
    ".nuxt",
    ".venv",
    "build",
    "coverage",
    "dist",
    "node_modules",
    "vendor",
}
MAX_FILE_BYTES = 2_000_000


@dataclass(frozen=True)
class Rule:
    name: str
    pattern: re.Pattern[str]
    reason: str


RULES = (
    Rule(
        "placeholder-copy",
        re.compile(
            r"\b(?:lorem\s+ipsum|your\s+(?:headline|heading|title|copy|text|content)\s+here|"
            r"insert\s+(?:text|copy|headline)\s+here|replace\s+this\s+(?:text|copy)|coming\s+soon)\b",
            re.IGNORECASE,
        ),
        "Confirm this is intentional sample content or replace it with approved copy.",
    ),
    Rule(
        "placeholder-image-url",
        re.compile(
            r"(?:https?:)?//(?:via\.placeholder\.com|placehold\.it|placehold\.co|dummyimage\.com)\b",
            re.IGNORECASE,
        ),
        "Check that a development placeholder was not left in the shipped interface.",
    ),
    Rule(
        "empty-link-target",
        re.compile(
            r"\b(?:href|to)\s*=\s*(['\"])(?:#|javascript:void\(0\))\1",
            re.IGNORECASE,
        ),
        "Give the link a real destination or use a button for an action.",
    ),
)


@dataclass(frozen=True)
class Finding:
    rule: str
    path: str
    line: int
    excerpt: str
    reason: str
    confidence: str = "review-needed"


def source_files(inputs: Iterable[Path]) -> Iterable[Path]:
    for input_path in inputs:
        if input_path.is_symlink():
            continue
        if input_path.is_file():
            if input_path.suffix.lower() in EXTENSIONS:
                yield input_path
            continue
        if not input_path.is_dir():
            continue
        for root, directories, names in os.walk(input_path, followlinks=False):
            directories[:] = [name for name in directories if name not in SKIP_DIRS]
            for name in names:
                path = Path(root) / name
                if not path.is_symlink() and path.suffix.lower() in EXTENSIONS:
                    yield path


def scan_file(path: Path) -> list[Finding]:
    try:
        if path.stat().st_size > MAX_FILE_BYTES:
            return []
        lines = path.read_text(encoding="utf-8", errors="replace").splitlines()
    except OSError as error:
        print(f"warning: cannot read {path}: {error}", file=sys.stderr)
        return []

    findings: list[Finding] = []
    for line_number, line in enumerate(lines, start=1):
        for rule in RULES:
            if rule.pattern.search(line):
                excerpt = line.strip()
                if len(excerpt) > 180:
                    excerpt = excerpt[:177] + "..."
                findings.append(
                    Finding(
                        rule=rule.name,
                        path=path.as_posix(),
                        line=line_number,
                        excerpt=excerpt,
                        reason=rule.reason,
                    )
                )
    return findings


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Read-only scan for explicit placeholder UI signals."
    )
    parser.add_argument(
        "paths",
        nargs="+",
        type=Path,
        help="files or directories to inspect (generated/vendor directories are skipped)",
    )
    parser.add_argument("--json", action="store_true", help="print findings as JSON")
    parser.add_argument(
        "--fail-on-findings",
        action="store_true",
        help="return exit code 1 when any review signals are found",
    )
    args = parser.parse_args()

    findings: list[Finding] = []
    for path in sorted(set(source_files(args.paths))):
        findings.extend(scan_file(path))

    if args.json:
        print(json.dumps([asdict(finding) for finding in findings], indent=2))
    elif findings:
        for finding in findings:
            print(
                f"{finding.path}:{finding.line}: {finding.rule}: {finding.excerpt}\n"
                f"  {finding.reason} Context-check before changing it."
            )
        print(
            f"{len(findings)} review signal(s). This scan does not assess visual quality, "
            "accessibility, or whether a pattern is appropriate."
        )
    else:
        print(
            "No explicit placeholder signals found in the scanned source files. "
            "This does not establish design quality or functional correctness."
        )

    return 1 if args.fail_on_findings and findings else 0


if __name__ == "__main__":
    raise SystemExit(main())
