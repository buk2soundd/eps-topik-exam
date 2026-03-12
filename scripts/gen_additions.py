import json, sys, re

d = json.load(open("scripts/book2_questions.json", encoding="utf-8"))
questions = d["questions"]

CHAPTER_TOPICS = {
    37:"공구 도구 사용", 38:"직장생활", 39:"회식 모임", 40:"직장 내 성희롱",
    41:"공구 사용법", 42:"기계 작동", 43:"건설 철근", 44:"페인트 작업",
    45:"농업 재배", 46:"축산 관리", 47:"재고 물류", 48:"산업 안전",
    49:"안전화 보호구", 50:"직장 성과", 51:"취업 입국", 52:"근로 계약",
    53:"외국인 등록", 54:"보험", 55:"급여 세금", 56:"휴가",
    57:"사업장 변경", 58:"체류 기간 연장",
}
AGRI_CHAPTERS = {45, 46}

def clean_text(s):
    s = s.replace("\u200b","").replace("\u200c","").replace("\u200d","")
    s = re.sub(r"[\u0e80-\u0eff]+", "", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s

def has_meaningful_content(qt):
    if not re.search(r"[\uac00-\ud7a3]", qt):
        return False
    korean_only = re.sub(r"[^\uac00-\ud7a3]", "", qt)
    if len(korean_only) < 5:
        return False
    bad_patterns = [
        r"^TOPIK\s*",
        r"^음\s*질문에\s*답하십시오",
        r"^\]\s*다음\s*질문에\s*답하십시오",
    ]
    for p in bad_patterns:
        if re.match(p, qt):
            return False
    return True

def is_good(q):
    if not q["isWorkplace"]:
        return False
    qt = clean_text(q["questionText"])
    if re.match(r"^\d{3}", qt):
        return False
    if not has_meaningful_content(qt):
        return False
    if q["correctIndex"] < 0 or q["correctIndex"] > 3:
        return False
    if len(q.get("options", [])) < 4:
        return False
    return True

def map_type(t):
    return {"picture-text": "picture-match", "fill-blank": "fill-blank"}.get(t, "comprehension")

def make_prompt(q):
    t = q.get("type","")
    if t == "picture-text":
        return "다음 그림을 보고 맞는 단어나 문장을 고르십시오."
    if t == "fill-blank":
        return "빈칸에 들어갈 가장 알맞은 것을 고르십시오."
    if re.search(r"가:", q.get("questionText","")):
        return "다음 대화를 읽고 빈칸에 알맞은 것을 고르십시오."
    return "다음 글을 읽고 물음에 답하십시오."

def jsstr(s):
    return s.replace("\\", "\\\\").replace("'", "\\'")

good = [q for q in questions if is_good(q)]
seen = set()
deduped = []
for q in good:
    k = q["bankIdSuggestion"]
    if k not in seen:
        deduped.append(q)
        seen.add(k)

agri_ids = []
ind_ids = []
js_lines = []
js_lines.append("  // --- FROM BOOK 2 ---")

for i, q in enumerate(deduped):
    rid = "R" + str(81 + i)
    ch = q["chapter"]
    topic = CHAPTER_TOPICS.get(ch, q.get("topic",""))
    qtype = map_type(q["type"])
    qt = clean_text(q["questionText"])
    opts = [clean_text(o) for o in q["options"]]
    correct = q["correctIndex"]
    prompt = make_prompt(q)
    src = q["bankIdSuggestion"]
    js_lines.append("  {")
    js_lines.append("    bankId: '" + rid + "',")
    js_lines.append("    chapter: " + str(ch) + ",")
    js_lines.append("    type: '" + qtype + "',")
    js_lines.append("    question: '" + jsstr(prompt) + "',")
    js_lines.append("    questionText: '" + jsstr(qt) + "',")
    js_lines.append("    options: ['" + jsstr(opts[0]) + "', '" + jsstr(opts[1]) + "', '" + jsstr(opts[2]) + "', '" + jsstr(opts[3]) + "'],")
    js_lines.append("    correctIndex: " + str(correct) + ",")
    js_lines.append("    explanation: '" + jsstr(topic + " -- " + src) + "'")
    js_lines.append("  },")
    if ch in AGRI_CHAPTERS:
        agri_ids.append(rid)
    else:
        ind_ids.append(rid)

output = "\n".join(js_lines)
with open("scripts/exam_additions.js", "w", encoding="utf-8") as f:
    f.write(output + "\n")
    f.write("// AGRI_R_IDS: " + str(agri_ids) + "\n")
    f.write("// IND_R_IDS: " + str(ind_ids) + "\n")
    f.write("// Total: R81-R" + str(80 + len(deduped)) + "\n")

print("Done: " + str(len(deduped)) + " questions -> scripts/exam_additions.js")
print("AGRI: " + str(agri_ids))
print("IND: " + str(ind_ids))
