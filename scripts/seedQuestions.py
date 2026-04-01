import os
import sys
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path

import openpyxl
from dotenv import load_dotenv
from pymongo import MongoClient
from bson import ObjectId

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

    client        = MongoClient(MONGO_URI)
    questions_col = client[DB_NAME]["questions"]
    now           = datetime.now(timezone.utc)

    rows = read_sheet(XLSX_DIR / "questions.xlsx")

    # group rows by role — one document per role
    grouped = defaultdict(list)
    for row in rows:
        grouped[row["role"]].append({
            "_id": ObjectId(),
            "question": row["question"],
            "options":  [row["option0"], row["option1"], row["option2"], row["option3"]],
            "correct":  int(row["correct"]),
        })

    docs = [
        {
            "role":      role,
            "questions": questions,
            "createdAt": now,
            "updatedAt": now,
        }
        for role, questions in grouped.items()
    ]

    questions_col.delete_many({})
    questions_col.insert_many(docs)

    print(f"✅  {len(docs)} roles seeded ({len(rows)} questions total)")
    for doc in docs:
        print(f"   {doc['role']}: {len(doc['questions'])} questions")

    client.close()


if __name__ == "__main__":
    seed()