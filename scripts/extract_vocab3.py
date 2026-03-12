# -*- coding: utf-8 -*-
"""
extract_vocab3.py — fixed: collect ALL blocks below image (Korean + Lao separate blocks)
"""
import fitz, sys, os, json, re
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

PDF = r'c:\Users\Ny\Downloads\Documents\7. Laos Book 2.pdf'
OUT_IMG = r'D:\9.15\EPStest\public\images\vocab'
OUT_JSON = r'D:\9.15\EPStest\scripts\vocab_data.json'
os.makedirs(OUT_IMG, exist_ok=True)

# (page_1based, chapter_num)
# Removed exam-practice pages: 104, 116
VOCAB_PAGES = [
    (23, 31), (26, 31),
    (35, 32), (38, 32),
    (47, 33), (50, 33),
    (59, 34), (62, 34),
    (71, 35), (74, 35),
    (83, 36), (86, 36),
    (95, 37), (98, 37),
    (107, 38), (110, 38),
    (119, 39), (122, 39),
    (131, 40), (134, 40),
]

CHAPTER_TITLES = {
    31: '날씨·기후 / ດິນຟ້າອາກາດ',
    32: '한국 음식 / ອາຫານເກົາຫຼີ',
    33: '한국 명절 / ວັນພັກຂອງເກົາຫຼີ',
    34: '경조사 / ງານມົງຄົນ',
    35: '한국 문화·오락 / ວັດທະນະທຳ',
    36: '외모·복장 / ການແຕ່ງກາຍ',
    37: '집·건물 / ເຮືອນ·ສິ່ງກໍ່ສ້າງ',
    38: '직장생활 / ຊີວິດການເຮັດວຽກ',
    39: '회사 행사 / ກິດຈະກຳບໍລິສັດ',
    40: '직장 내 성희롱 / ການຄຸກຄາມທາງເພດ',
}

# Skip phrases: instruction lines, answer keys, etc.
SKIP_PATTERNS = [
    r'그림을 보고', r'알맞은 말', r'연결하세요', r'골라 넣으세요', r'보기',
    r'정답', r'문장을 완성', r'표현을 보기', r'^가:', r'^나:', r'읽고',
    r'다음 그림', r'이야기를', r'대화를', r'고르십시오', r'빈칸',
    r'사진에', r'이에요$', r'해요$', r'아요$', r'어요$',
]
SKIP_RE = re.compile('|'.join(SKIP_PATTERNS))

doc = fitz.open(PDF)


def is_korean(text):
    return bool(re.search(r'[\uAC00-\uD7A3]', text))


def has_lao(text):
    return bool(re.search(r'[\u0E80-\u0EFF]', text))


def clean_korean(text):
    """Extract Korean word/phrase, strip extraneous chars."""
    # Keep hangul, spaces, basic punctuation ·/()
    m = re.search(r'[\uAC00-\uD7A3][\uAC00-\uD7A3\s·/\-\(\)]*', text)
    if m:
        return m.group().strip()
    return ''


def clean_lao(text):
    """Extract Lao text."""
    parts = re.findall(r'[\u0E80-\u0EFF][\u0E80-\u0EFF\s\(\)\.]*', text)
    return ' '.join(p.strip() for p in parts if len(p.strip()) > 1).strip()


def extract_vocab_grid(page):
    page_h = page.rect.height
    blocks = page.get_text('dict')['blocks']

    # All small-to-medium images in page body area
    img_blocks = []
    for b in blocks:
        if b['type'] != 1:
            continue
        x0, y0, x1, y1 = b['bbox']
        w, h = x1 - x0, y1 - y0
        if 30 < w < 200 and 30 < h < 200 and y0 > 80 and y1 < page_h - 60:
            img_blocks.append(b)

    # All text blocks in body area
    txt_blocks = []
    for b in blocks:
        if b['type'] != 0:
            continue
        x0, y0, x1, y1 = b['bbox']
        if y0 < 80 or y1 > page_h - 50:
            continue
        lines = []
        for ln in b['lines']:
            t = ''.join(s['text'] for s in ln['spans']).strip()
            if t:
                lines.append(t)
        text = ' '.join(lines)
        txt_blocks.append({'bbox': b['bbox'], 'text': text})

    from collections import defaultdict

    def row_bin(y):
        return int(y / 80)

    img_rows = defaultdict(list)
    for ib in img_blocks:
        img_rows[row_bin(ib['bbox'][1])].append(ib)

    results = []
    used_txt = set()

    for row_key in sorted(img_rows.keys()):
        row_imgs = sorted(img_rows[row_key], key=lambda b: b['bbox'][0])

        for img in row_imgs:
            ix0, iy0, ix1, iy1 = img['bbox']
            ix_c = (ix0 + ix1) / 2

            # Collect ALL text blocks below image within 200pt, x-aligned  ±100pt
            nearby = []
            for i, tb in enumerate(txt_blocks):
                if i in used_txt:
                    continue
                tx0, ty0, tx1, ty1 = tb['bbox']
                tc = (tx0 + tx1) / 2
                dy = ty0 - iy1
                dx = abs(tc - ix_c)
                if 0 <= dy <= 200 and dx < 100:
                    nearby.append((dy, i, tb))

            if not nearby:
                continue

            # Sort by dy; take Korean block first, then Lao block
            nearby.sort(key=lambda x: x[0])

            word = ''
            meaning = ''
            used_in_this = []

            for dy, i, tb in nearby:
                text = tb['text']
                if not word and is_korean(text):
                    # Skip instruction lines
                    if SKIP_RE.search(text):
                        continue
                    w = clean_korean(text)
                    # Only accept up to ~20 chars (words/short phrases, not full sentences)
                    if w and len(w) <= 20:
                        word = w
                        used_in_this.append(i)
                        # If this block also has Lao, grab it
                        if has_lao(text):
                            meaning = clean_lao(text)
                elif word and not meaning and has_lao(text) and not is_korean(text):
                    meaning = clean_lao(text)
                    used_in_this.append(i)
                    break
                elif word and meaning:
                    break

            if not word:
                continue

            # Don't mark Lao-only blocks as used (they may serve other images)
            for i in used_in_this:
                used_txt.add(i)

            results.append({'word': word, 'meaning': meaning, 'bbox': img['bbox']})

    return results


def save_crop(page, bbox, out_path):
    x0, y0, x1, y1 = bbox
    pad = 4
    rect = fitz.Rect(x0 - pad, y0 - pad, x1 + pad, y1 + pad)
    mat = fitz.Matrix(2.5, 2.5)
    pix = page.get_pixmap(matrix=mat, clip=rect)
    pix.save(out_path)


# -------- Main --------
chapter_data = {}
idx_counter = {}

print('Extracting vocab from Book 2...\n')
for (pn, ch) in VOCAB_PAGES:
    page = doc[pn - 1]
    items = extract_vocab_grid(page)
    if ch not in chapter_data:
        chapter_data[ch] = []
    if ch not in idx_counter:
        idx_counter[ch] = 0

    for item in items:
        idx = idx_counter[ch]
        fn = f'ch{ch:02d}_{idx:02d}.jpg'
        save_crop(page, item['bbox'], os.path.join(OUT_IMG, fn))
        chapter_data[ch].append({
            'word': item['word'],
            'meaning': item['meaning'],
            'img': f'/images/vocab/{fn}',
        })
        meaning_preview = item['meaning'][:35] if item['meaning'] else '(no Lao)'
        print(f'  ch{ch} #{idx:02d}: {item["word"]:<25} | {meaning_preview}')
        idx_counter[ch] += 1

doc.close()

# Deduplicate by word within each chapter
for ch in chapter_data:
    seen = {}
    unique = []
    for w in chapter_data[ch]:
        if w['word'] not in seen:
            seen[w['word']] = True
            unique.append(w)
    chapter_data[ch] = unique

# Output
vocab_json = []
for ch in sorted(chapter_data.keys()):
    words = chapter_data[ch]
    if words:
        vocab_json.append({
            'chapter': ch,
            'title': CHAPTER_TITLES.get(ch, f'Ch{ch}'),
            'words': words,
        })
        no_lao = sum(1 for w in words if not w['meaning'])
        print(f'\n✅ Ch{ch}: {len(words)} words  ({no_lao} missing Lao)')

with open(OUT_JSON, 'w', encoding='utf-8') as f:
    json.dump(vocab_json, f, ensure_ascii=False, indent=2)

total = sum(len(v['words']) for v in vocab_json)
print(f'\nTotal: {total} vocab items')
