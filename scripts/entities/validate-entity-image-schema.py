#!/usr/bin/env python3
"""Validate canonical NPC/monster image frontmatter schema."""

from __future__ import annotations

import argparse
import datetime as dt
from dataclasses import dataclass, field
from pathlib import Path
import re
import sys
from typing import Any

REPO_ROOT = Path(__file__).resolve().parents[2]

NPC_DIR = Path("content/people")
MONSTER_DIR = Path("content/monsters")

CANONICAL_FIELDS = ["image", "imageRole", "tokenImage", "alternateImages", "assetFolder"]
LEGACY_IMAGE_FIELDS = [
    "image_primary",
    "image_token",
    "image_variants",
    "primary_image",
    "token_image",
    "alternate_images",
    "asset_folder",
]


@dataclass
class PageResult:
    page_type: str
    path: Path
    data: dict[str, Any] = field(default_factory=dict)
    parse_errors: list[str] = field(default_factory=list)
    errors: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)
    legacy_fields: list[str] = field(default_factory=list)

    @property
    def has_frontmatter(self) -> bool:
        return bool(self.data) and not self.parse_errors

    @property
    def canonical_complete(self) -> bool:
        if self.parse_errors:
            return False
        return all(field in self.data for field in CANONICAL_FIELDS)


def parse_scalar(value: str) -> Any:
    value = value.strip()
    if value in {"", "~", "null", "Null", "NULL"}:
        return None
    if value == "[]":
        return []
    if value in {"true", "True"}:
        return True
    if value in {"false", "False"}:
        return False
    if (value.startswith('"') and value.endswith('"')) or (
        value.startswith("'") and value.endswith("'")
    ):
        return value[1:-1]
    return value


def parse_frontmatter(path: Path) -> tuple[dict[str, Any], list[str]]:
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---\n"):
        return {}, ["Missing YAML frontmatter block."]

    lines = text.splitlines()
    end_idx = None
    for idx in range(1, len(lines)):
        if lines[idx].strip() == "---":
            end_idx = idx
            break

    if end_idx is None:
        return {}, ["Unclosed YAML frontmatter block."]

    fm_lines = lines[1:end_idx]
    data: dict[str, Any] = {}
    errors: list[str] = []

    i = 0
    while i < len(fm_lines):
        raw = fm_lines[i]
        stripped = raw.strip()

        if not stripped or stripped.startswith("#"):
            i += 1
            continue

        match = re.match(r"^([A-Za-z0-9_]+):\s*(.*)$", raw)
        if not match:
            errors.append(f"Unable to parse frontmatter line: {raw}")
            i += 1
            continue

        key, value = match.group(1), match.group(2)

        if value == "":
            items: list[str] = []
            j = i + 1
            while j < len(fm_lines):
                child = fm_lines[j]
                child_stripped = child.strip()
                if not child_stripped:
                    j += 1
                    continue
                if re.match(r"^\s*-\s+", child):
                    item_value = re.sub(r"^\s*-\s+", "", child).strip()
                    items.append(parse_scalar(item_value))
                    j += 1
                    continue
                if child.startswith(" ") or child.startswith("\t"):
                    errors.append(
                        f"Unsupported nested structure for '{key}' near line: {child}"
                    )
                    j += 1
                    continue
                break

            data[key] = items if items else None
            i = j
            continue

        data[key] = parse_scalar(value)
        i += 1

    return data, errors


def as_string(value: Any) -> str | None:
    if isinstance(value, str) and value.strip():
        return value.strip()
    return None


def validate_page(page_type: str, path: Path) -> PageResult:
    data, parse_errors = parse_frontmatter(path)
    result = PageResult(page_type=page_type, path=path, data=data, parse_errors=parse_errors)

    if parse_errors:
        result.errors.extend(parse_errors)
        return result

    for field in LEGACY_IMAGE_FIELDS:
        if field in data:
            result.legacy_fields.append(field)

    image = as_string(data.get("image"))
    if image is None:
        result.errors.append("Missing required field: image")
    else:
        if not (REPO_ROOT / image).exists():
            result.errors.append(f"image file does not exist: {image}")

    asset_folder_value = data.get("assetFolder")
    if asset_folder_value is None:
        result.errors.append("Missing required field: assetFolder")
    elif not isinstance(asset_folder_value, str):
        result.errors.append("Malformed assetFolder: expected a string path")
    else:
        asset_folder = asset_folder_value.strip()
        if not asset_folder:
            result.errors.append("Malformed assetFolder: empty string")
        else:
            if not asset_folder.endswith("/"):
                result.warnings.append("assetFolder should end with a trailing slash")
            if not (REPO_ROOT / asset_folder).exists():
                result.errors.append(f"assetFolder directory does not exist: {asset_folder}")

    token_image = as_string(data.get("tokenImage"))
    if token_image is not None and not (REPO_ROOT / token_image).exists():
        result.errors.append(f"tokenImage file does not exist: {token_image}")

    alt = data.get("alternateImages")
    if alt is not None:
        if not isinstance(alt, list):
            result.errors.append("alternateImages must be a list of paths")
        else:
            for idx, alt_path in enumerate(alt):
                alt_value = as_string(alt_path)
                if alt_value is None:
                    result.errors.append(
                        f"alternateImages[{idx}] must be a non-empty string path"
                    )
                    continue
                if not (REPO_ROOT / alt_value).exists():
                    result.errors.append(
                        f"alternateImages file does not exist: {alt_value}"
                    )

    if page_type == "monster":
        creature_type = as_string(data.get("creatureType"))
        if creature_type is None:
            result.errors.append("Missing required monster field: creatureType")

    return result


def gather_pages() -> list[tuple[str, Path]]:
    pages: list[tuple[str, Path]] = []
    for path in sorted((REPO_ROOT / NPC_DIR).glob("*.md")):
        if path.name == "index.md":
            continue
        pages.append(("npc", path))
    for path in sorted((REPO_ROOT / MONSTER_DIR).glob("*.md")):
        if path.name == "index.md":
            continue
        pages.append(("monster", path))
    return pages


def rel(path: Path) -> str:
    return str(path.relative_to(REPO_ROOT))


def wikilink_target(path: Path) -> str:
    relative = rel(path).removesuffix(".md")
    if relative.startswith("content/"):
        return relative[len("content/") :]
    return relative


def write_report(results: list[PageResult], target: Path) -> None:
    canonical = [r for r in results if r.canonical_complete]
    with_legacy = [r for r in results if r.legacy_fields]
    missing_image = [r for r in results if any("Missing required field: image" in e for e in r.errors)]
    missing_asset = [
        r for r in results if any("Missing required field: assetFolder" in e for e in r.errors)
    ]
    missing_creature = [
        r
        for r in results
        if r.page_type == "monster"
        and any("Missing required monster field: creatureType" in e for e in r.errors)
    ]
    malformed_asset = [r for r in results if any("Malformed assetFolder" in e for e in r.errors)]
    no_trailing_slash = [
        r
        for r in results
        if any("assetFolder should end with a trailing slash" in w for w in r.warnings)
    ]
    missing_asset_dirs = [
        r
        for r in results
        if any("assetFolder directory does not exist" in e for e in r.errors)
    ]
    missing_image_paths = [
        r
        for r in results
        if any("file does not exist" in e and "assetFolder" not in e for e in r.errors)
    ]

    lines = [
        "---",
        "title: Entity Image Schema Audit",
        "tags:",
        "  - reference",
        "  - workflow",
        "  - images",
        "status: active",
        "---",
        "",
        "# Entity Image Schema Audit",
        "",
        f"Generated: {dt.datetime.now(dt.timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}",
        "",
        "Command:",
        "",
        "```bash",
        "python3 scripts/entities/validate-entity-image-schema.py --write-report content/reference/entity-image-schema-audit.md",
        "```",
        "",
        "## Coverage",
        f"- Total entity pages scanned: **{len(results)}**",
        f"- NPC pages: **{sum(1 for r in results if r.page_type == 'npc')}**",
        f"- Monster pages: **{sum(1 for r in results if r.page_type == 'monster')}**",
        "",
        "## Audit Summary",
        f"- Pages already using canonical image fields (`image`, `imageRole`, `tokenImage`, `alternateImages`, `assetFolder`): **{len(canonical)}**",
        f"- Pages using legacy image fields: **{len(with_legacy)}**",
        f"- Pages missing `image`: **{len(missing_image)}**",
        f"- Pages missing `assetFolder`: **{len(missing_asset)}**",
        f"- Monster pages missing `creatureType`: **{len(missing_creature)}**",
        f"- Pages with malformed/non-parseable `assetFolder`: **{len(malformed_asset)}**",
        f"- Pages where `assetFolder` is missing trailing slash: **{len(no_trailing_slash)}**",
        f"- Pages where `assetFolder` directory does not exist: **{len(missing_asset_dirs)}**",
        f"- Pages where referenced `image` / `tokenImage` / `alternateImages` path does not exist: **{len(missing_image_paths)}**",
        "",
    ]

    def add_list(title: str, items: list[PageResult]) -> None:
        lines.append(f"## {title}")
        if not items:
            lines.append("- None")
        else:
            for item in items:
                lines.append(f"- [[{wikilink_target(item.path)}|{item.path.stem}]]")
        lines.append("")

    add_list("Pages Using Legacy Fields", with_legacy)
    add_list("Pages Missing Image", missing_image)
    add_list("Pages Missing assetFolder", missing_asset)
    add_list("Monster Pages Missing creatureType", missing_creature)
    add_list("Pages with Malformed assetFolder", malformed_asset)
    add_list("Pages with assetFolder Missing Trailing Slash", no_trailing_slash)
    add_list("Pages with Missing assetFolder Directory", missing_asset_dirs)
    add_list("Pages with Missing Referenced Image Paths", missing_image_paths)

    target.write_text("\n".join(lines), encoding="utf-8")


def print_console_report(results: list[PageResult]) -> None:
    error_count = sum(len(r.errors) for r in results)
    warning_count = sum(len(r.warnings) for r in results)

    print(f"Scanned {len(results)} entity pages.")
    print(f"Errors: {error_count}")
    print(f"Warnings: {warning_count}")

    for res in results:
        if not res.errors and not res.warnings and not res.legacy_fields:
            continue
        print(f"\n[{res.page_type.upper()}] {rel(res.path)}")
        if res.legacy_fields:
            print(f"  - legacy fields: {', '.join(res.legacy_fields)}")
        for message in res.errors:
            print(f"  - ERROR: {message}")
        for message in res.warnings:
            print(f"  - WARN: {message}")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--write-report",
        type=Path,
        help="Write a markdown audit report to the provided path.",
    )
    args = parser.parse_args()

    results = [validate_page(page_type, path) for page_type, path in gather_pages()]
    print_console_report(results)

    if args.write_report:
        report_path = (REPO_ROOT / args.write_report).resolve()
        report_path.parent.mkdir(parents=True, exist_ok=True)
        write_report(results, report_path)
        print(f"\nWrote report: {report_path.relative_to(REPO_ROOT)}")

    has_errors = any(r.errors for r in results)
    return 1 if has_errors else 0


if __name__ == "__main__":
    sys.exit(main())
