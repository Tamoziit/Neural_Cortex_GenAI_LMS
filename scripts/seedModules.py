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
    modules_col = client[DB_NAME]["modules"]
    now         = datetime.now(timezone.utc)

    # modules.xlsx columns: role | phase | title | level | prerequisites
    rows = read_sheet(XLSX_DIR / "modules.xlsx")
    print(f"Seeding {len(rows)} modules into '{DB_NAME}'...\n")

    docs = [
        {
            "role":          row["role"],
            "phase":         int(row["phase"]),
            "title":         row["title"],
            "level":         row["level"],
            "prerequisites": [p.strip() for p in row.get("prerequisites", "").split(";") if p.strip()],
            "chapters":      [],
            "createdAt":     now,
            "updatedAt":     now,
        }
        for row in rows
    ]

    modules_col.delete_many({})
    modules_col.insert_many(docs)

    for doc in docs:
        print(f"  ✅  [{doc['role']} | {doc['level']} | Phase {doc['phase']}] {doc['title']}")

    client.close()
    print(f"\nDone. {len(docs)} modules seeded.")


if __name__ == "__main__":
    seed()