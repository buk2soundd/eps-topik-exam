"""Fix the 6 remaining un-translated words that use a straight apostrophe."""
import json, shutil

VOCAB_PATH = "scripts/standard_vocab.json"
DATA_PATH  = "src/data/standardVocabData.json"

# straight-apostrophe keys  →  Lao translations
FIXES = {
    "to take one's temperature": "ວັດອຸນຫະພູມ",
    "to cut one's hand":         "ມືຖືກຕັດ",
    "to do the New Year's bow":  "ໄຫວ້ປີໃໝ່",
    "Parent's Day":              "ວັນພໍ່ແມ່",
    "to cross one's leg":        "ຂ້າມຂາ",
    "to blow (one's) nose":      "ສັ່ງນ້ຳມູກ",
}

with open(VOCAB_PATH, encoding="utf-8") as f:
    data = json.load(f)

applied = 0
for ch in data["chapters"]:
    for w in ch["words"]:
        eng = w.get("english", "")
        if eng in FIXES and w.get("lao", eng) == eng:
            w["lao"] = FIXES[eng]
            applied += 1

with open(VOCAB_PATH, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

shutil.copy(VOCAB_PATH, DATA_PATH)

# Verify
with open(VOCAB_PATH, encoding="utf-8") as f:
    data2 = json.load(f)
remaining = [w["english"] for ch in data2["chapters"] for w in ch["words"]
             if w.get("lao", w.get("english","")) == w.get("english","")]
NOT_REAL = {"K-dance","K-drama","K-beauty","K-variety show","K-webtoon","K-pop","K-food","TOPIK"}
real_remaining = [e for e in remaining if e not in NOT_REAL]

print(f"Applied: {applied}")
print(f"Real remaining (non-brand): {len(real_remaining)}")
for e in real_remaining:
    print(f"  {repr(e)}")
