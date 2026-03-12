import json, sys
sys.stdout.reconfigure(encoding='utf-8')

d = json.load(open('scripts/book2_questions.json', encoding='utf-8'))
questions = d['questions']

good = []
for q in questions:
    if not q['isWorkplace']:
        continue
    qt = q['questionText'].strip()
    # Skip if questionText starts with page number (header garbage)
    if qt[:3].isdigit():
        continue
    # Skip if too short or just whitespace symbols
    if len(qt) < 8:
        continue
    # Skip if only whitespace/spaces/dots
    if all(c in ' \t\n.​①②③④?.' for c in qt):
        continue
    # Skip if correctIndex is same as first option (often means parsing error)
    if q['correctIndex'] == 0 and q['options'][0] == q['options'][0]:
        # only skip if Q text is bad
        pass
    good.append(q)

print(f'Total workplace: {len([q for q in questions if q["isWorkplace"]])}')
print(f'Good quality: {len(good)}')
print()

for q in good:
    print(f'--- {q["bankIdSuggestion"]} Ch{q["chapter"]} {q["type"]} correct={q["correctIndex"]}')
    print(f'    Q: {q["questionText"][:120]}')
    for i, o in enumerate(q['options']):
        mark = ' <--' if i == q['correctIndex'] else ''
        print(f'    {o[:60]}{mark}')
    print()
