import os
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
        print("❌  MONGODB_URI is not set in .env")
        sys.exit(1)

    client      = MongoClient(MONGO_URI)
    db          = client[DB_NAME]
    modules_col = db["modules"]

    module_rows = read_sheet(XLSX_DIR / "modules.xlsx")
    print(f"Seeding {len(module_rows)} modules into '{DB_NAME}'...\n")

    for row in module_rows:
        azure_code = row.get("azureCode", "").strip()
        title      = row.get("title", "").strip()
        now        = datetime.now(timezone.utc)

        modules_col.update_one(
            {"azureCode": azure_code},
            {
                "$set": {
                    "azureCode":     azure_code,
                    "title":         title,
                    "description":   row.get("description", ""),
                    "role":          row.get("role", ""),
                    "level":         row.get("level", ""),
                    "prerequisites": [p.strip() for p in row.get("prerequisites", "").split(";") if p.strip()],
                    "updatedAt":     now,
                },
                "$setOnInsert": {
                    "createdAt": now,
                },
            },
            upsert=True,
        )

        print(f"  ✅  [{azure_code}] {title}")

    client.close()
    print("\nDone.")


if __name__ == "__main__":
    seed()