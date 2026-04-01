import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

import openpyxl
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGO_URI = os.getenv("MONGODB_URI")
DB_NAME   = os.getenv("DB_NAME", "test")
XLSX_DIR  = Path(os.getenv("XLSX_DIR", ".")).resolve()

# Matches filenames like Azure_AI_Engineer_Beginner.xlsx
FILE_PATTERN = re.compile(
    r"^(?P<role>Azure_[A-Za-z_]+)_(?P<level>Beginner|Intermediate|Advanced)\.xlsx$"
)


def read_sheet(path: Path) -> list[dict]:
    wb   = openpyxl.load_workbook(path, read_only=True, data_only=True)
    rows = list(wb.active.iter_rows(values_only=True))
    wb.close()
    if not rows:
        return []
    headers = [str(h).strip() if h is not None else "" for h in rows[0]]
    return [
        {headers[i]: (str(v).strip() if v is not None else "") for i, v in enumerate(row)}
        for row in rows[1:]
        if any(v not in (None, "") for v in row)
    ]


def parse_chapter(row: dict) -> dict:
    return {
        "title":     row.get("title", "").strip(),
        "type":      row.get("type", "").strip().upper(),
        "duration":  row.get("duration", "").strip(),
        "azureCode": row.get("azureCode", "").strip(),
        "url":       row.get("url", "").strip(),
        "phase":     int(float(row.get("phase", 0) or 0)),
    }


def seed():
    if not MONGO_URI:
        print("❌  MONGODB_URI is not set in .env")
        sys.exit(1)

    client       = MongoClient(MONGO_URI)
    db           = client[DB_NAME]
    chapters_col = db["chapters"]
    modules_col  = db["modules"]
    now          = datetime.now(timezone.utc)

    chapter_files = [
        (f, FILE_PATTERN.match(f.name))
        for f in sorted(XLSX_DIR.glob("*.xlsx"))
        if FILE_PATTERN.match(f.name)
    ]

    if not chapter_files:
        print("❌  No chapter files found matching pattern <Role>_<Level>.xlsx")
        sys.exit(1)

    print(f"Found {len(chapter_files)} chapter file(s)\n")

    # deduplicate on (title, url) — azureCode is not unique across chapters
    seen      = {}  # (title, url) → chapter doc
    file_rows = []  # (role, level, parsed_rows) per file

    for file, match in chapter_files:
        role  = match.group("role")
        level = match.group("level")
        rows  = [parse_chapter(r) for r in read_sheet(file) if r.get("title")]

        print(f"  📋  {file.name} → {len(rows)} rows parsed")

        for ch in rows:
            key = (ch["title"], ch["url"])
            if key not in seen:
                seen[key] = {
                    "title":       ch["title"],
                    "type":        ch["type"],
                    "description": [],
                    "duration":    ch["duration"],
                    "azureCode":   ch["azureCode"],
                    "url":         ch["url"],
                    "createdAt":   now,
                    "updatedAt":   now,
                }

        file_rows.append((role, level, rows))

    if not seen:
        print("❌  No chapters collected — check your Excel headers match: title, type, duration, azureCode, phase, url")
        client.close()
        sys.exit(1)

    # ── insert all unique chapters ─────────────────────────────────────────────
    chapters_col.delete_many({})
    inserted = chapters_col.insert_many(list(seen.values()))

    chapter_id_map = {
        key: _id
        for key, _id in zip(seen.keys(), inserted.inserted_ids)
    }

    print(f"\n✅  {len(inserted.inserted_ids)} unique chapters seeded\n")

    # ── back-reference chapters to their modules by (role, level, phase) ───────
    for role, level, rows in file_rows:
        phase_map = {}
        for ch in rows:
            _id = chapter_id_map.get((ch["title"], ch["url"]))
            if _id:
                phase_map.setdefault(ch["phase"], []).append(_id)

        for phase, chapter_ids in phase_map.items():
            result = modules_col.update_one(
                {"role": role, "level": level, "phase": phase},
                {"$set": {"chapters": chapter_ids, "updatedAt": now}},
            )
            if result.matched_count:
                print(f"  ✅  [{role} | {level} | Phase {phase}] {len(chapter_ids)} chapters linked")
            else:
                print(f"  ⚠   [{role} | {level} | Phase {phase}] no matching module — run seed_modules.py first")

    client.close()
    print("\nDone.")


if __name__ == "__main__":
    seed()