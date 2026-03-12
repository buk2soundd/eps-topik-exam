# -*- coding: utf-8 -*-
import json, sys, re
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

with open('scripts/vocab_data.json', encoding='utf-8') as f:
    data = json.load(f)

# Post-process: remove garbage entries
SENTENCE_ENDINGS = re.compile(r'(요|다|세요|어요|아요|하자|해요|이에요|이야)$')
SKIP_WORDS = {'가', '나', '다', '보기', '정답'}

cleaned = []
for ch_entry in data:
    ch = ch_entry['chapter']
    title = ch_entry['title']
    words = ch_entry['words']
    clean_words = []
    seen = set()
    for w in words:
        word = w['word'].strip()
        # Skip single chars
        if len(word) <= 1 or word in SKIP_WORDS:
            continue
        # Skip long sentences (> 15 chars with sentence ending)
        if len(word) > 15 and SENTENCE_ENDINGS.search(word):
            continue
        # Skip duplicates
        if word in seen:
            continue
        seen.add(word)
        clean_words.append(w)
    cleaned.append({'chapter': ch, 'title': title, 'words': clean_words})
    print(f'Ch{ch} {title[:32]}: {len(words)} -> {len(clean_words)}')

total = sum(len(c['words']) for c in cleaned)
print(f'\nTotal after cleanup: {total}')

with open('scripts/vocab_data_clean.json', 'w', encoding='utf-8') as f:
    json.dump(cleaned, f, ensure_ascii=False, indent=2)
print('Saved to scripts/vocab_data_clean.json')
