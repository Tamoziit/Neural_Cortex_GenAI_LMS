import os
import sys
from datetime import datetime, timezone
from pathlib import Path

import openpyxl
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGO_URI = os.getenv("MONGODB_URI")
DB_NAME   = os.getenv("DB_NAME", "azure_learning")
XLSX_DIR  = Path(os.getenv("XLSX_DIR", ".")).resolve()


def read_sheet(path: Path) -> list[dict]:
    wb   = openpyxl.load_workbook(path, read_only=True, data_only=True)
    rows = list(wb.active.iter_rows(values_only=True))
    wb.close()
    if not rows:
        return []
    headers = [str(h).strip() for h in rows[0]]
    return [
        {headers[i]: (str(v).strip() if v is not None else "") for i, v in enumerate(row)}
        for row in rows[1:]
        if any(v not in (None, "") for v in row)
    ]


def seed():
    if not MONGO_URI:
        print("❌  MONGO_URI is not set in .env")
        sys.exit(1)

    client       = MongoClient(MONGO_URI)
    db           = client[DB_NAME]
    chapters_col = db["chapters"]
    modules_col  = db["modules"]

    # collect all chapter xlsx files — named like AI-900.xlsx, DP-203.xlsx
    chapter_files = sorted(XLSX_DIR.glob("*.xlsx"), key=lambda p: p.stem)
    chapter_files = [f for f in chapter_files if f.stem != "modules"]

    print(f"Found {len(chapter_files)} chapter file(s) in '{XLSX_DIR}'\n")

    for file in chapter_files:
        module_azure_code = file.stem          # e.g. "AI-900"

        module = modules_col.find_one({"azureCode": module_azure_code}, {"_id": 1})
        if not module:
            print(f"  ⚠  [{module_azure_code}] No matching module in DB — skipping {file.name}")
            continue

        rows = read_sheet(file)
        chapter_ids = []

        for row in rows:
            azure_code  = row.get("azureCode", "").strip()
            title       = row.get("title", "").strip()
            now         = datetime.now(timezone.utc)

            if not azure_code:
                print(f"    ⚠  Skipping chapter with no azureCode: '{title}'")
                continue

            doc = {
                "title":       title,
                "description": [p.strip() for p in row.get("description", "").split("||") if p.strip()],
                "duration":    row.get("duration", ""),
                "azureCode":   azure_code,
                "url":         row.get("url", ""),
                "createdAt":   now,
            }

            result = chapters_col.update_one(
                {"azureCode": azure_code},
                {
                    "$setOnInsert": doc,
                    "$set":         {"updatedAt": now},
                },
                upsert=True,
            )

            chapter_id = result.upserted_id or chapters_col.find_one({"azureCode": azure_code}, {"_id": 1})["_id"]
            chapter_ids.append(chapter_id)

            status = "inserted" if result.upserted_id else "exists"
            print(f"    [{status}] {azure_code} — {title}")

        # back-reference: set chapters array on the module
        modules_col.update_one(
            {"_id": module["_id"]},
            {"$set": {"chapters": chapter_ids}},
        )

        print(f"  ✅  [{module_azure_code}] {len(chapter_ids)} chapters linked\n")

    client.close()
    print("Done.")


if __name__ == "__main__":
    seed()