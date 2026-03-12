# -*- coding: utf-8 -*-
"""
extract_vocab.py
Extracts vocabulary items (image + Korean word + Lao meaning) from Book 2 vocab pages.
Output:
  - public/images/vocab/  -> JPEG images named ch{N}_{index}.jpg
  - scripts/vocab_data.json -> [{chapter, title, words:[{word, meaning, img}]}]
"""
import fitz, sys, os, json, re
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

PDF = r'c:\Users\Ny\Downloads\Documents\7. Laos Book 2.pdf'
OUT_IMG = r'D:\9.15\EPStest\public\images\vocab'
OUT_JSON = r'D:\9.15\EPStest\scripts\vocab_data.json'

os.makedirs(OUT_IMG, exist_ok=True)

# All vocab pages that have images (identified by 어휘/단어 keyword search)
# Format: (page_number_1based, chapter_number, chapter_title, vocab_section_label)
# Identified from previous scan + manual mapping
# Book 2 chapters 31-58, vocab pages found at:
VOCAB_PAGES = [
    (23, 31, '날씨·기후', '어휘 1'),
    (26, 31, '날씨·기후', '어휘 2'),
    (35, 32, '일상생활 물건', '어휘 1'),
    (38, 32, '일상생활 물건', '어휘 2'),
    (47, 33, '집 구조·가구', '어휘 1'),
    (50, 33, '집 구조·가구', '어휘 2'),
    (59, 34, '음식·식사', '어휘 1'),
    (62, 34, '음식·식사', '어휘 2'),
    (71, 35, '이동·교통', '어휘 1'),
    (74, 35, '이동·교통', '어휘 2'),
    (83, 36, '몸·건강', '어휘 1'),
    (86, 36, '몸·건강', '어휘 2'),
    (95, 37, '가전기구·도구', '어휘 1'),
    (98, 37, '가전기구·도구', '어휘 2'),
    (104, 38, '직장생활', '어휘 1'),
    (107, 38, '직장생활', '어휘 2'),
    (110, 38, '직장생활', '어휘 3'),
    (116, 39, '급여·비용', '어휘 1'),
    (119, 39, '급여·비용', '어휘 2'),
    (122, 40, '주거·환경', '어휘 1'),
    (131, 41, '공구·기계', '어휘 1'),
    (134, 41, '공구·기계', '어휘 2'),
]

doc = fitz.open(PDF)

# Group vocab sections by chapter
chapters = {}
for (pn, ch, title, section) in VOCAB_PAGES:
    if ch not in chapters:
        chapters[ch] = {'chapter': ch, 'title': title, 'words': []}


def extract_vocab_from_page(page, chapter, section, base_idx):
    """
    Returns list of {word, meaning, img_path} items.
    Strategy: find all image blocks, find text block below each image,
    parse Korean + Lao from text.
    """
    blocks = page.get_text('dict')['blocks']
    img_blocks = [b for b in blocks if b['type'] == 1]
    txt_blocks = [b for b in blocks if b['type'] == 0]

    # Get page dimensions to filter out header/footer decorative images
    page_rect = page.rect
    page_h = page_rect.height

    items = []
    used_imgs = set()

    # For each image block, find text below it (within ~120pt)
    for img_blk in img_blocks:
        ix0, iy0, ix1, iy1 = img_blk['bbox']
        iw = ix1 - ix0
        ih = iy1 - iy0

        # Skip tiny images (decorative: bullets, icons < 30pt) or very wide banners
        if iw < 30 or ih < 30 or iw > 300:
            continue
        # Skip images in header/footer area (top 80pt or bottom 80pt)
        if iy0 < 80 or iy1 > page_h - 60:
            continue

        ix_center = (ix0 + ix1) / 2

        # Find text block below this image (y starts within 120pt of image bottom)
        best_txt = None
        best_dy = 9999
        for txt_blk in txt_blocks:
            tx0, ty0, tx1, ty1 = txt_blk['bbox']
            tx_center = (tx0 + tx1) / 2
            # Must be below image, within 120pt vertically, and horizontally aligned (within 80pt)
            dy = ty0 - iy1
            dx = abs(tx_center - ix_center)
            if 0 <= dy <= 120 and dx < 100:
                if dy < best_dy:
                    best_dy = dy
                    best_txt = txt_blk

        if best_txt is None:
            continue

        # Extract text from the text block
        lines_text = []
        for ln in best_txt['lines']:
            line_str = ''.join(s['text'] for s in ln['spans']).strip()
            if line_str:
                lines_text.append(line_str)
        full_text = ' '.join(lines_text)

        # Split into Korean and Lao parts
        # Korean chars: \uAC00-\uD7A3, Hangul jamo: \u1100-\u11FF, \u3130-\u318F
        # Lao chars: \u0E80-\u0EFF
        korean_chars = re.findall(r'[\uAC00-\uD7A3\u1100-\u11FF\u3130-\u318F\u0030-\u007A\u0041-\u005A\s]+', full_text)
        lao_chars = re.findall(r'[\u0E80-\u0EFF]+[\u0E80-\u0EFF\s\(\)\.]*', full_text)

        korean_word = ' '.join(korean_chars).strip()
        lao_meaning = ' '.join(lao_chars).strip()

        # Clean up - remove stray numbers and single chars
        korean_word = re.sub(r'^\d+\s*', '', korean_word).strip()
        if not korean_word or not lao_meaning:
            continue

        # Key to avoid duplicates (same image xref)
        img_key = str(img_blk['bbox'])
        if img_key in used_imgs:
            continue
        used_imgs.add(img_key)

        items.append({
            'word': korean_word,
            'meaning': lao_meaning,
            '_bbox': img_blk['bbox'],
        })

    return items


def save_image_from_page(page, bbox, out_path):
    """Crop image region from page and save as JPEG."""
    x0, y0, x1, y1 = bbox
    # Add small padding
    pad = 5
    rect = fitz.Rect(x0 - pad, y0 - pad, x1 + pad, y1 + pad)
    mat = fitz.Matrix(2, 2)  # 2x upscale for quality
    clip = page.get_pixmap(matrix=mat, clip=rect)
    clip.save(out_path)


print(f'Processing {len(VOCAB_PAGES)} vocab pages from Book 2...')
print()

# Track all extracted items per chapter
chapter_items = {}  # ch -> list of (word, meaning, idx)
idx_counter = {}    # ch -> int

for (pn, ch, title, section) in VOCAB_PAGES:
    page = doc[pn - 1]
    if ch not in idx_counter:
        idx_counter[ch] = 0

    items = extract_vocab_from_page(page, ch, section, idx_counter[ch])

    if ch not in chapter_items:
        chapter_items[ch] = []

    for item in items:
        idx = idx_counter[ch]
        idx_counter[ch] += 1
        img_filename = f'ch{ch:02d}_{idx:02d}.jpg'
        img_path = os.path.join(OUT_IMG, img_filename)
        save_image_from_page(page, item['_bbox'], img_path)
        chapter_items[ch].append({
            'word': item['word'],
            'meaning': item['meaning'],
            'img': f'/images/vocab/{img_filename}',
        })
        print(f'  ch{ch} #{idx}: {item["word"]} = {item["meaning"][:40]}')

doc.close()

# Build final vocab data structure
vocab_data = []
CHAPTER_TITLES = {
    31: '날씨·기후 / ດິນຟ້າອາກາດ',
    32: '일상생활 물건 / ຂອງໃຊ້ປະຈຳວັນ',
    33: '집 구조·가구 / ໂຄງສ້າງເຮືອນ·ເຟີນີເຈີ',
    34: '음식·식사 / ອາຫານ·ການກິນ',
    35: '이동·교통 / ການເດີນທາງ',
    36: '몸·건강 / ຮ່າງກາຍ·ສຸຂະພາບ',
    37: '가전기구·도구 / ເຄື່ອງໃຊ້ໄຟຟ້າ·ອຸປະກອນ',
    38: '직장생활 / ຊີວິດການເຮັດວຽກ',
    39: '급여·비용 / ເງິນເດືອນ·ຄ່າໃຊ້ຈ່າຍ',
    40: '주거·환경 / ທີ່ຢູ່ອາໄສ·ສິ່ງແວດລ້ອມ',
    41: '공구·기계 / ເຄື່ອງມື·ເຄື່ອງຈັກ',
}

for ch in sorted(chapter_items.keys()):
    if chapter_items[ch]:
        vocab_data.append({
            'chapter': ch,
            'title': CHAPTER_TITLES.get(ch, f'Chapter {ch}'),
            'words': chapter_items[ch],
        })
        print(f'\nChapter {ch}: {len(chapter_items[ch])} vocab items')

with open(OUT_JSON, 'w', encoding='utf-8') as f:
    json.dump(vocab_data, f, ensure_ascii=False, indent=2)

print(f'\nDone! Saved JSON to {OUT_JSON}')
total = sum(len(v['words']) for v in vocab_data)
print(f'Total vocab items: {total}')
