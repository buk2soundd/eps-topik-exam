"""
Add best questions from book2_questions.json to examData.js.
Only includes questions with meaningful questionText.
"""
import json, sys, re

d = json.load(open('scripts/book2_questions.json', encoding='utf-8'))
questions = d['questions']

# ── Selection criteria ──────────────────────────────────────────────────────
def is_good(q):
    if not q['isWorkplace']:
        return False
    qt = q['questionText'].strip()
    # Skip page-header garbage: starts with 3 digits
    if re.match(r'^\d{3}', qt):
        return False
    # Skip very short
    if len(qt) < 8:
        return False
    # Skip if full of zero-width spaces only
    stripped = qt.replace('\u200b', '').replace(' ', '').strip()
    if len(stripped) < 5:
        return False
    # correctIndex must be 0-3
    if q['correctIndex'] < 0 or q['correctIndex'] > 3:
        return False
    return True

good = [q for q in questions if is_good(q)]

# Deduplicate by bankIdSuggestion (keep first)
seen = set()
deduped = []
for q in good:
    if q['bankIdSuggestion'] not in seen:
        deduped.append(q)
        seen.add(q['bankIdSuggestion'])

print(f'Good questions: {len(deduped)}', file=sys.stderr)

# ── Map question type ────────────────────────────────────────────────────────
def map_type(t):
    mapping = {
        'picture-text': 'picture-match',
        'fill-blank': 'fill-blank',
        'other': 'comprehension',
    }
    return mapping.get(t, 'comprehension')

# ── Map chapter to topic description ────────────────────────────────────────
CHAPTER_TOPICS = {
    37:'공구·도구 사용', 38:'직장생활', 39:'회식·모임', 40:'직장 내 성희롱',
    41:'공구 사용법', 42:'기계 작동', 43:'건설·철근', 44:'페인트 작업',
    45:'농업·재배', 46:'축산 관리', 47:'재고·물류', 48:'산업 안전 I',
    49:'안전화·보호구', 50:'직장 성과', 51:'취업·입국', 52:'근로 계약',
    53:'외국인 등록', 54:'보험', 55:'급여·세금', 56:'휴가',
    57:'사업장 변경', 58:'체류 기간 연장',
}

# ── Generate default question prompt by type ─────────────────────────────────
def make_question_prompt(q):
    t = q.get('type','')
    if t == 'picture-text':
        return '다음 그림을 보고 맞는 단어나 문장을 고르십시오.'
    if t == 'fill-blank':
        return '빈칸에 들어갈 가장 알맞은 것을 고르십시오.'
    return '다음을 읽고 물음에 답하십시오.'

# ── Clean question text ───────────────────────────────────────────────────────
def clean_text(s):
    # Remove zero-width spaces, normalize whitespace
    s = s.replace('\u200b', '').replace('\u200c', '').replace('\u200d', '')
    s = re.sub(r'\s+', ' ', s).strip()
    # Remove Lao text residue (U+0E80-0EFF)
    s = re.sub(r'[\u0e80-\u0eff]+', '', s)
    s = re.sub(r'\s+', ' ', s).strip()
    return s

# ── Clean option text ─────────────────────────────────────────────────────────
def clean_option(s):
    s = clean_text(s)
    # Ensure starts with ① ② ③ ④
    return s

# ── Generate JS entries ───────────────────────────────────────────────────────
# Agriculture: chapters 45-46 → AGRI
# Industry: chapters 37-44, 47-58 → IND
AGRI_CHAPTERS = {45, 46}

agri_ids = []
ind_ids = []

lines = []
lines.append('  // ─── FROM BOOK 2 (B2) ─────────────────────────────────────────────────────')

for i, q in enumerate(deduped):
    rid = f'R{81 + i}'
    ch = q['chapter']
    topic = CHAPTER_TOPICS.get(ch, q.get('topic', ''))
    qtype = map_type(q['type'])
    qt = clean_text(q['questionText'])
    options = [clean_option(o) for o in q['options']]
    correct = q['correctIndex']
    source = q['bankIdSuggestion']
    prompt = make_question_prompt(q)

    # Escape for JS
    def jsstr(s):
        return s.replace('\\', '\\\\').replace("'", "\\'").replace('\n', '\\n')

    lines.append(f'  {{')
    lines.append(f"    bankId: '{rid}',")
    lines.append(f"    chapter: {ch},")
    lines.append(f"    type: '{qtype}',")
    lines.append(f"    question: '{jsstr(prompt)}',")
    lines.append(f"    questionText: '{jsstr(qt)}',")
    lines.append(f"    options: ['{jsstr(options[0])}', '{jsstr(options[1])}', '{jsstr(options[2])}', '{jsstr(options[3])}'],")
    lines.append(f"    correctIndex: {correct},")
    lines.append(f"    explanation: '// {source} Ch{ch} {topic}'")
    lines.append(f'  }},')

    if ch in AGRI_CHAPTERS:
        agri_ids.append(rid)
    else:
        ind_ids.append(rid)

# Print JS block
print('// === PASTE INTO readingBank array (after R80) ====')
print('\n'.join(lines))
print()
print('// === ADD to AGRI_R_IDS set ====')
print(f"// Add these: {agri_ids}")
print()
print('// === ADD to IND_R_IDS set ====')
print(f"// Add these: {ind_ids}")
print()
print(f'// Total added: {len(deduped)} questions (R81-R{80+len(deduped)})', file=sys.stderr)
