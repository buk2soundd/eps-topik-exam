# -*- coding: utf-8 -*-
"""
extract_vocab2.py  — improved grid-based extraction of vocabulary from Book 2.

Layout: vocab pages have 3–4 columns, each column = image on top + text below.
Strategy: bin blocks into y-rows, then sort columns left→right, pair 1-to-1.
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
    36: '외모·용모 / ການແຕ່ງກາຍ',
    37: '집·건물 / ເຮືອນ·ສິ່ງກໍ່ສ້າງ',
    38: '직장생활 / ຊີວິດການເຮັດວຽກ',
    39: '회사 행사 / ກິດຈະກຳບໍລິສັດ',
    40: '직장 내 성희롱 / ການຄຸກຄາມທາງເພດ',
}

doc = fitz.open(PDF)


def is_korean(text):
    return bool(re.search(r'[\uAC00-\uD7A3]', text))


def extract_lao(text):
    parts = re.findall(r'[\u0E80-\u0EFF][^\u0000-\u00FF\uAC00-\uD7A3]*', text)
    return ' '.join(p.strip() for p in parts if len(p.strip()) > 1)


def extract_korean(text):
    parts = re.findall(r'[\uAC00-\uD7A3][\uAC00-\uD7A3\s·\-/()]*', text)
    return ' '.join(p.strip() for p in parts if p.strip())


def extract_vocab_grid(page):
    """
    Extract vocab pairs from a vocab page using grid-based matching.
    Returns list of {word, meaning, bbox}.
    """
    page_h = page.rect.height
    blocks = page.get_text('dict')['blocks']

    # Filter: small-to-medium square images in body area
    img_blocks = []
    for b in blocks:
        if b['type'] != 1:
            continue
        x0, y0, x1, y1 = b['bbox']
        w, h = x1 - x0, y1 - y0
        # Vocab images: 30–200pt wide/tall, in page body
        if 30 < w < 200 and 30 < h < 200 and y0 > 80 and y1 < page_h - 60:
            img_blocks.append(b)

    # Filter text blocks: short label text below images
    txt_blocks = []
    for b in blocks:
        if b['type'] != 0:
            continue
        lines = []
        for ln in b['lines']:
            l = ''.join(s['text'] for s in ln['spans']).strip()
            if l:
                lines.append(l)
        text = ' '.join(lines)
        # Must contain Korean + ideally Lao
        if not is_korean(text):
            continue
        # Skip long sentences (> 50 Korean chars = probably a sentence, not a word)
        kr = extract_korean(text)
        if len(kr) > 50:
            continue
        x0, y0, x1, y1 = b['bbox']
        if y0 > 80 and y1 < page_h - 50:
            txt_blocks.append({'bbox': b['bbox'], 'text': text})

    # Bin images into y-rows (within 80pt of each other → same row)
    def row_bin(y):
        return int(y / 80)

    from collections import defaultdict
    img_rows = defaultdict(list)
    for ib in img_blocks:
        r = row_bin(ib['bbox'][1])
        img_rows[r].append(ib)

    results = []
    used_txt = set()

    for row_key in sorted(img_rows.keys()):
        row_imgs = sorted(img_rows[row_key], key=lambda b: b['bbox'][0])

        for img in row_imgs:
            ix0, iy0, ix1, iy1 = img['bbox']
            ix_c = (ix0 + ix1) / 2

            # Find best matching text block: below image (dy 0–150pt), nearest x-center
            best = None
            best_score = 9999
            for i, tb in enumerate(txt_blocks):
                if i in used_txt:
                    continue
                tx0, ty0, tx1, ty1 = tb['bbox']
                tc = (tx0 + tx1) / 2
                dy = ty0 - iy1
                dx = abs(tc - ix_c)
                if 0 <= dy <= 150 and dx < 120:
                    # Score: prioritize x-alignment, then dy
                    score = dx * 2 + dy
                    if score < best_score:
                        best_score = score
                        best = (i, tb)

            if best is None:
                continue
            idx, tb = best

            text = tb['text']
            word = extract_korean(text).strip()
            meaning = extract_lao(text).strip()

            # Skip if no meaningful Korean word (likely a phrase > 5 chars is ok)
            # but skip duplicates and very short matches
            if not word or len(word) < 1:
                continue
            # Skip multi-sentence entries (Korean sentences often end with 요,다,세요)
            if len(word) > 30:
                continue

            used_txt.add(idx)
            results.append({'word': word, 'meaning': meaning, 'bbox': img['bbox']})

    return results


def save_crop(page, bbox, out_path):
    x0, y0, x1, y1 = bbox
    pad = 4
    rect = fitz.Rect(x0 - pad, y0 - pad, x1 + pad, y1 + pad)
    mat = fitz.Matrix(2.5, 2.5)
    pix = page.get_pixmap(matrix=mat, clip=rect)
    pix.save(out_path)


# ---------- Main extraction ----------
chapter_data = {}
idx_counter = {}

print('Extracting vocabulary from Book 2...\n')

for (pn, ch) in VOCAB_PAGES:
    page = doc[pn - 1]
    items = extract_vocab_grid(page)

    if ch not in chapter_data:
        chapter_data[ch] = []
    if ch not in idx_counter:
        idx_counter[ch] = 0

    for item in items:
        idx = idx_counter[ch]
        img_fn = f'ch{ch:02d}_{idx:02d}.jpg'
        img_path = os.path.join(OUT_IMG, img_fn)
        save_crop(page, item['bbox'], img_path)
        chapter_data[ch].append({
            'word': item['word'],
            'meaning': item['meaning'],
            'img': f'/images/vocab/{img_fn}',
        })
        print(f'  ch{ch} #{idx:02d}: {item["word"]} | {item["meaning"][:40]}')
        idx_counter[ch] += 1

doc.close()

# Remove obvious duplicates within chapter (same word)
for ch in chapter_data:
    seen = {}
    unique = []
    for w in chapter_data[ch]:
        key = w['word'].strip()
        if key not in seen:
            seen[key] = True
            unique.append(w)
    chapter_data[ch] = unique

# Build output JSON
vocab_json = []
for ch in sorted(chapter_data.keys()):
    words = chapter_data[ch]
    if words:
        vocab_json.append({
            'chapter': ch,
            'title': CHAPTER_TITLES.get(ch, f'Ch{ch}'),
            'words': words,
        })
        print(f'\n✅ Chapter {ch} ({CHAPTER_TITLES[ch]}): {len(words)} words')

with open(OUT_JSON, 'w', encoding='utf-8') as f:
    json.dump(vocab_json, f, ensure_ascii=False, indent=2)

total = sum(len(v['words']) for v in vocab_json)
print(f'\nTotal: {total} vocab items saved to {OUT_JSON}')
print(f'Images: {OUT_IMG}')
