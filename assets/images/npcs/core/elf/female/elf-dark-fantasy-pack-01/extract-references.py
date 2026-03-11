#!/usr/bin/env python3
"""Extract PNG references from the MidJourney zip into normalized filenames."""

from pathlib import Path
from zipfile import ZipFile
import shutil

FOLDER = Path(__file__).resolve().parent
ZIP_FILE = FOLDER / "midjourney_session (1).zip"
PREFIX = "elf-dark-fantasy-pack-01-reference-"


def main() -> int:
    if not ZIP_FILE.exists():
        print(f"Missing zip archive: {ZIP_FILE}")
        return 1

    with ZipFile(ZIP_FILE) as archive:
        png_entries = sorted(
            name for name in archive.namelist() if name.lower().endswith(".png")
        )
        for index, entry_name in enumerate(png_entries, start=1):
            output_path = FOLDER / f"{PREFIX}{index:02d}.png"
            with archive.open(entry_name) as source, output_path.open("wb") as target:
                shutil.copyfileobj(source, target)

    print(f"Extracted {len(png_entries)} PNG files into: {FOLDER}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
