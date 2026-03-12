import json, sys
sys.stdout.reconfigure(encoding='utf-8')
from collections import defaultdict

d = json.load(open('scripts/book2_questions.json', encoding='utf-8'))
by_ch = defaultdict(list)
for q in d['questions']:
    if q['isWorkplace']:
        by_ch[q['chapter']].append(q)

for ch in sorted(by_ch):
    qs = by_ch[ch]
    topic = qs[0]['topic']
    print(f'Ch{ch} {topic} ({len(qs)} questions):')
    for q in qs[:3]:
        print(f'  [{q["bankIdSuggestion"]}] {q["type"]} correct={q["correctIndex"]}')
        print(f'    Q: {q["questionText"][:70]}')
        print(f'    opts: {q["options"][0][:40]} / {q["options"][q["correctIndex"]][:40] if q["correctIndex"]>=0 else "?"}')
    print()
