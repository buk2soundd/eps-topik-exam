# -*- coding: utf-8 -*-
"""Convert vocab_data_all.json to src/data/vocabData.js"""
import json, sys, re
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

with open('scripts/vocab_data_all.json', encoding='utf-8') as f:
    data = json.load(f)

lines = []
lines.append('// Auto-generated vocabulary data from EPS-TOPIK Book 2 (Chapters 31-59)')
lines.append('// 605 vocab items with images and Lao translations')
lines.append('')
lines.append('export const VOCAB_CHAPTERS = [')

for ch_entry in data:
    ch_num = ch_entry['chapter']
    title = ch_entry['title']
    words = ch_entry['words']
    
    # Split title into Korean and Lao parts
    parts = title.split(' / ')
    title_kr = parts[0] if parts else title
    title_lo = parts[1] if len(parts) > 1 else ''
    
    lines.append(f'  {{')
    lines.append(f'    chapter: {ch_num},')
    lines.append(f'    titleKr: {json.dumps(title_kr, ensure_ascii=False)},')
    lines.append(f'    titleLo: {json.dumps(title_lo, ensure_ascii=False)},')
    lines.append(f'    words: [')
    
    for w in words:
        word = w['word']
        meaning = w['meaning'] or ''
        img = w['img']
        lines.append(f'      {{ word: {json.dumps(word, ensure_ascii=False)}, meaning: {json.dumps(meaning, ensure_ascii=False)}, img: {json.dumps(img, ensure_ascii=False)} }},')
    
    lines.append(f'    ],')
    lines.append(f'  }},')

lines.append('];')
lines.append('')
lines.append('// Category groupings for filtering')
lines.append('export const VOCAB_CATEGORIES = {')
lines.append("  general: { label: '일반 / ທົ່ວໄປ', chapters: [31,32,33,34,35,36,37,38,39,40] },")
lines.append("  industry: { label: '산업·공업 / ອຸດສາຫາກຳ', chapters: [41,42,43,44,47,48,49] },")
lines.append("  agriculture: { label: '농업·어업 / ກະສິກຳ·ປະມົງ', chapters: [45,46] },")
lines.append("  legal: { label: '법령·제도 / ກົດໝາຍ·ລະບຽບ', chapters: [51,52,53,54,55,56,57,58,59] },")
lines.append("  health: { label: '건강·안전 / ສຸຂະພາບ·ຄວາມປອດໄພ', chapters: [50] },")
lines.append('};')
lines.append('')

result = '\n'.join(lines)

with open('src/data/vocabData.js', 'w', encoding='utf-8') as f:
    f.write(result)

total = sum(len(c['words']) for c in data)
print(f'Created src/data/vocabData.js with {len(data)} chapters, {total} words')
