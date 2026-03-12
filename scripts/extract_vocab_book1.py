# -*- coding: utf-8 -*-
"""
extract_vocab_book1.py — extract vocab from Book 1 (Ch.06–Ch.30)
Output:
  - public/images/vocab/b1_ch{N}_{idx}.jpg
  - scripts/vocab_data_book1.json
"""
import fitz, sys, os, json, re
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

PDF = r'C:\Users\Ny\Downloads\7. Laos Book 1.pdf'
OUT_IMG = r'D:\9.15\EPStest\public\images\vocab'
OUT_JSON = r'D:\9.15\EPStest\scripts\vocab_data_book1.json'
os.makedirs(OUT_IMG, exist_ok=True)

# (page_1based, chapter_num)
VOCAB_PAGES = [
    (70, 6),
    (79, 7), (82, 7),
    (91, 8), (94, 8),
    (103, 9), (106, 9),
    (118, 10),
    (127, 11), (130, 11),
    (139, 12), (142, 12),
    (151, 13), (154, 13),
    (163, 14), (166, 14),
    (178, 15),
    (187, 16), (190, 16),
    (199, 17), (202, 17),
    (211, 18), (214, 18),
    (223, 19), (226, 19),
    (235, 20), (238, 20),
    (247, 21), (250, 21),
    (259, 22), (262, 22),
    (271, 23), (274, 23),
    (283, 24), (286, 24),
    (295, 25), (298, 25),
    (310, 26),
    (319, 27), (322, 27),
    (331, 28), (334, 28),
    (343, 29), (346, 29),
    (355, 30), (358, 30),
]

CHAPTER_TITLES = {
    6:  '직업·국적 / ອາຊີບ·ສັນຊາດ',
    7:  '사무실·물건 / ຫ້ອງການ·ສິ່ງຂອງ',
    8:  '일과·시간 / ກິດຈະວັດ·ເວລາ',
    9:  '가족·외모 / ຄອບຄົວ·ຮູບຮ່າງ',
    10: '장소·활동 / ສະຖານທີ່·ກິດຈະກຳ',
    11: '과일·쇼핑·돈 / ໝາກໄມ້·ຊ໊ອບປິ້ງ·ເງິນ',
    12: '위치·방향 / ທີ່ຕັ້ງ·ທິດທາງ',
    13: '감정·약속 / ຄວາມຮູ້ສຶກ·ນັດໝາຍ',
    14: '음식·맛 / ອາຫານ·ລົດຊາດ',
    15: '날씨·감정 / ອາກາດ·ອາລົມ',
    16: '취미·운동 / ງານອະດິເລກ·ກິລາ',
    17: '여행·관광 / ການທ່ອງທ່ຽວ',
    18: '교통·이동 / ການຄົມມະນາຄົມ',
    19: '전화·인터넷·쇼핑 / ໂທລະສັບ·ອິນເຕີເນັດ',
    20: '집안일·청소 / ວຽກເຮືອນ·ທຳຄວາມສະອາດ',
    21: '초대·예의 / ການເຊີນ·ມາລະຍາດ',
    22: '규칙·금지 / ກົດລະບຽບ·ຫ້າມ',
    23: '한국 예절 / ມາລະຍາດເກົາຫຼີ',
    24: '공부·교육 / ການຮຽນ·ການສຶກສາ',
    25: '종교 / ສາດສະໜາ',
    26: '건강·병 / ສຸຂະພາບ·ພະຍາດ',
    27: '병원·치료 / ໂຮງໝໍ·ການປິ່ນປົວ',
    28: '은행·금융 / ທະນາຄານ·ການເງິນ',
    29: '우체국·소포 / ໄປສະນີ·ພັດສະດຸ',
    30: '문화 센터·레저 / ສູນວັດທະນະທຳ',
}

SKIP_PATTERNS = [
    r'^그림을', r'알맞은 말', r'연결하세요', r'골라 넣으세요', r'^보기$',
    r'^정답', r'문장을 완성', r'표현을 보기', r'^가:', r'^나:', r'읽고',
    r'다음 그림', r'빈칸에', r'사진에', r'^[①②③④⑤]',
    r'고르십시오', r'찾으세요', r'답하세요', r'표시하세요',
]
SKIP_RE = re.compile('|'.join(SKIP_PATTERNS))
SKIP_WORDS = {'가', '나', '다', '라', '보기', '정답', '개', '건', '명'}

doc = fitz.open(PDF)


def is_korean(text):
    return bool(re.search(r'[\uAC00-\uD7A3]', text))


def has_lao(text):
    return bool(re.search(r'[\u0E80-\u0EFF]', text))


def has_english(text):
    return bool(re.search(r'[A-Za-z]{3,}', text))


def clean_korean(text):
    m = re.search(r'[\uAC00-\uD7A3][\uAC00-\uD7A3\s·/\-\(\)]*', text)
    if m:
        return m.group().strip()
    return ''


def clean_lao(text):
    parts = re.findall(r'[\u0E80-\u0EFF][\u0E80-\u0EFF\s\(\)\.]*', text)
    return ' '.join(p.strip() for p in parts if len(p.strip()) > 1).strip()


def clean_english(text):
    """Extract English translation as fallback."""
    # Remove Korean and Lao chars
    cleaned = re.sub(r'[\uAC00-\uD7A3\u0E80-\u0EFF]', '', text)
    cleaned = cleaned.strip(' /,;')
    return cleaned[:60].strip()


def extract_vocab_grid(page):
    page_h = page.rect.height
    blocks = page.get_text('dict')['blocks']

    img_blocks = []
    for b in blocks:
        if b['type'] != 1:
            continue
        x0, y0, x1, y1 = b['bbox']
        w, h = x1 - x0, y1 - y0
        if 30 < w < 200 and 30 < h < 200 and y0 > 80 and y1 < page_h - 60:
            img_blocks.append(b)

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

            nearby = []
            for i, tb in enumerate(txt_blocks):
                if i in used_txt:
                    continue
                tx0, ty0, tx1, ty1 = tb['bbox']
                tc = (tx0 + tx1) / 2
                dy = ty0 - iy1
                dx = abs(tc - ix_c)
                if 0 <= dy <= 200 and dx < 110:
                    nearby.append((dy, i, tb))

            if not nearby:
                continue

            nearby.sort(key=lambda x: x[0])

            word = ''
            meaning = ''
            used_in_this = []

            for dy, i, tb in nearby:
                text = tb['text']
                if not word and is_korean(text):
                    if SKIP_RE.search(text):
                        continue
                    w = clean_korean(text)
                    if not w or len(w) <= 1 or w in SKIP_WORDS:
                        continue
                    # Skip very long sentences
                    if len(w) > 25:
                        continue
                    word = w
                    used_in_this.append(i)
                    if has_lao(text):
                        meaning = clean_lao(text)
                    elif has_english(text):
                        meaning = clean_english(text)
                elif word and not meaning and has_lao(text) and not is_korean(text):
                    meaning = clean_lao(text)
                    used_in_this.append(i)
                    break
                elif word and not meaning and has_english(text) and not is_korean(text):
                    meaning = clean_english(text)
                    used_in_this.append(i)
                    break
                elif word and meaning:
                    break

            if not word:
                continue

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

print('Extracting vocab from Book 1...\n')
for (pn, ch) in VOCAB_PAGES:
    page = doc[pn - 1]
    items = extract_vocab_grid(page)
    if ch not in chapter_data:
        chapter_data[ch] = []
    if ch not in idx_counter:
        idx_counter[ch] = 0

    for item in items:
        idx = idx_counter[ch]
        fn = f'b1_ch{ch:02d}_{idx:02d}.jpg'
        save_crop(page, item['bbox'], os.path.join(OUT_IMG, fn))
        chapter_data[ch].append({
            'word': item['word'],
            'meaning': item['meaning'],
            'img': f'/images/vocab/{fn}',
        })
        meaning_preview = item['meaning'][:35] if item['meaning'] else '(no translation)'
        print(f'  ch{ch} #{idx:02d}: {item["word"]:<25} | {meaning_preview}')
        idx_counter[ch] += 1

doc.close()

# Dedup within chapters
for ch in chapter_data:
    seen = {}
    unique = []
    for w in chapter_data[ch]:
        if w['word'] not in seen:
            seen[w['word']] = True
            unique.append(w)
    chapter_data[ch] = unique

# Filter
SENTENCE_RE = re.compile(r'(요|다|세요|어요|아요|이에요|이야|니다)$')
SKIP_W = {'가', '나', '다', '라', '보기', '정답', '개', '건', '명'}
for ch in chapter_data:
    filtered = []
    for w in chapter_data[ch]:
        word = w['word'].strip()
        if len(word) <= 1 or word in SKIP_W:
            continue
        if len(word) > 20 and SENTENCE_RE.search(word):
            continue
        filtered.append(w)
    chapter_data[ch] = filtered

vocab_json = []
for ch in sorted(chapter_data.keys()):
    words = chapter_data[ch]
    if words:
        title = CHAPTER_TITLES.get(ch, f'Ch{ch}')
        parts = title.split(' / ')
        vocab_json.append({
            'chapter': ch,
            'title': title,
            'titleKr': parts[0],
            'titleLo': parts[1] if len(parts) > 1 else '',
            'words': words,
        })
        no_trans = sum(1 for w in words if not w['meaning'])
        print(f'\nCh{ch:02d} [{parts[0]}]: {len(words)} words  ({no_trans} missing translation)')

with open(OUT_JSON, 'w', encoding='utf-8') as f:
    json.dump(vocab_json, f, ensure_ascii=False, indent=2)

total = sum(len(v['words']) for v in vocab_json)
print(f'\nGrand total: {total} vocab items from Book 1')
print(f'Saved: {OUT_JSON}')
