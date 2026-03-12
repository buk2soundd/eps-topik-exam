"""
extract_standard_book.py
────────────────────────────────────────────────────────────────────
ดึงคำศัพท์และภาพประกอบจาก EPS-TOPIK NEW 한국어 표준교재 1권

Usage:
  python scripts/extract_standard_book.py

Output:
  scripts/standard_vocab.json      ← คำศัพท์ทั้งหมดแยกตามหมวด/บท
  public/images/std/ch{N}/         ← ภาพประกอบแยกตามบท
"""

import fitz            # PyMuPDF
import json
import re
import os
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

PDF_PATH  = r'C:\Users\Ny\Downloads\Documents\book1_std.pdf'
IMG_DIR   = r'D:\9.15\EPStest\public\images\std'
OUT_JSON  = r'D:\9.15\EPStest\scripts\standard_vocab.json'

# ─── Chapter info (chapter_num → (group, korean_title, category)) ─────────────
CHAPTER_INFO = {
    1:  ('기본생활', '자기소개',               '기본생활'),
    2:  ('기본생활', '생활용품',               '기본생활'),
    3:  ('기본생활', '위치와 장소',             '기본생활'),
    4:  ('기본생활', '동작과 사물',             '기본생활'),
    5:  ('기본생활', '날짜와 요일',             '기본생활'),
    6:  ('기본생활', '하루 일과',               '기본생활'),
    7:  ('일상생활', '계절과 날씨',             '일상생활'),
    8:  ('일상생활', '가족',                   '일상생활'),
    9:  ('일상생활', '건강',                   '일상생활'),
    10: ('일상생활', '물건 구입',               '일상생활'),
    11: ('일상생활', '집안일',                 '일상생활'),
    12: ('일상생활', '대중교통',               '일상생활'),
    13: ('일상생활', '주말 활동',               '일상생활'),
    14: ('일상생활', '길 찾기',                '일상생활'),
    15: ('일상생활', '옷차림',                 '일상생활'),
    16: ('일상생활', '집 구하기',               '일상생활'),
    17: ('일상생활', '휴가',                   '일상생활'),
    18: ('일상생활', '취미',                   '일상생활'),
    19: ('일상생활', '요리',                   '일상생활'),
    20: ('일상생활', '인터넷과 스마트폰',        '일상생활'),
    21: ('공공기관', '병원',                   '공공기관'),
    22: ('공공기관', '약국',                   '공공기관'),
    23: ('공공기관', '우체국',                 '공공기관'),
    24: ('공공기관', '은행',                   '공공기관'),
    25: ('공공기관', '외국인 근로자 지원 기관',  '공공기관'),
    26: ('한국문화', '한국의 주거 문화와 음식 문화', '한국문화'),
    27: ('한국문화', '한국의 명절과 행사',       '한국문화'),
    28: ('한국문화', '한국의 예절',             '한국문화'),
    29: ('한국문화', '한국의 여가 생활',         '한국문화'),
    30: ('한국문화', '한국의 대중문화',          '한국문화'),
}

# Page ranges: Chapter N starts at 1-indexed page (N-1)*10 + 50
# Ch1→p50-59, Ch2→p60-69 ... Ch30→p340-349
def page_to_chapter(page_num: int) -> int:
    """Convert 1-indexed PDF page number to chapter number (1-30)."""
    ch = (page_num - 50) // 10 + 1
    if 1 <= ch <= 30:
        return ch
    return 0


# ─── Step 1: Extract all vocab from 어휘 색인 (index) ──────────────────────────

def is_section_header(s):
    skip_exact = {'어휘 색인', 'VOCABULARY INDEX', '부록', '한국어 표준교재', 'MEMO',
                  'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
                  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'M', 'N', 'O', 'P', 'R', 'S', 'T'}
    if s in skip_exact:
        return True
    if re.match(r'^\d{1,3}$', s):
        return True
    if re.match(r'^\d+\s+한국어', s):
        return True
    return False


def is_korean_entry(s):
    if not s or len(s) > 50:
        return False
    if not re.search(r'[가-힣]', s):
        return False
    bad = ['하세요', '보세요', '대화', '읽고', '듣고', '쓰세요',
           '고르세요', '연결하세요', '완성하세요', '색인']
    return not any(p in s for p in bad)


def is_english_trans(s):
    if not s or len(s) > 100:
        return False
    return bool(re.match(r'^[A-Za-z(]', s))


def extract_from_index(doc):
    """Parse 어휘 색인 (vocab index) pages at the back of the book."""
    # Find first and last page containing '어휘 색인'
    idx_pages = []
    for i in range(doc.page_count):
        if '어휘 색인' in doc[i].get_text():
            idx_pages.append(i)

    if not idx_pages:
        print('  ⚠  어휘 색인 not found')
        return []

    # The actual index is near the END of the book (pages ~371-385).
    # Ignore any early matches (e.g. the TOC mentions 어휘 색인 on page 9).
    MIN_INDEX_PAGE = doc.page_count - 30   # 0-indexed; last 30 pages only
    back_pages = [p for p in idx_pages if p >= MIN_INDEX_PAGE]
    if not back_pages:
        back_pages = idx_pages  # fallback: use all pages found

    scan_start = back_pages[0]
    scan_end   = min(back_pages[-1] + 5, doc.page_count)
    print(f'  Found 어휘 색인: PDF pages {scan_start+1}–{scan_end}')

    words = []
    for pg in range(scan_start, scan_end):
        text = doc[pg].get_text()
        lines = [l.strip() for l in text.split('\n') if l.strip()]
        i = 0
        while i < len(lines):
            line = lines[i]
            if is_section_header(line):
                i += 1
                continue
            if is_korean_entry(line) and i + 2 < len(lines):
                en_line = lines[i + 1]
                pg_line = lines[i + 2]
                if is_english_trans(en_line) and pg_line.isdigit():
                    pg_num = int(pg_line)
                    ch = page_to_chapter(pg_num)
                    words.append({
                        'korean':   line,
                        'english':  en_line,
                        'chapter':  ch,
                        'page_num': pg_num,
                        'subsection': '',
                    })
                    i += 3
                    continue
            i += 1
    return words


# ─── Step 2: Extract sub-section labels from vocab pages ──────────────────────

def extract_subsections(doc):
    """
    On each vocab page (어휘 VOCABULARY), detect sub-section titles like
    '나라 이름  Countries' and build a mapping {korean_word: subsection}.
    """
    mapping = {}
    for pg_idx in range(doc.page_count):
        page = doc[pg_idx]
        text = page.get_text()
        if '어휘' not in text and 'VOCABULARY' not in text:
            continue
        lines = [l.strip() for l in text.split('\n')]
        in_vocab = False
        subsection = ''
        for line in lines:
            if '어휘' in line and 'VOCABULARY' in line:
                in_vocab = True
                subsection = ''
                continue
            if in_vocab and any(x in line for x in ['문법  GRAMMAR', '문화와 정보', '확인해요', '발음  PRONUNCIATION']):
                in_vocab = False
            if not in_vocab:
                continue
            # Sub-section pattern: "나라 이름  Countries"
            ss = re.match(r'^([가-힣·\s]{2,20})\s{2,}([A-Z][a-zA-Z\s&,/\.]{2,40})$', line)
            if ss:
                subsection = ss.group(1).strip()
            elif is_korean_entry(line) and subsection:
                mapping[line] = subsection
    return mapping


# ─── Step 3: Extract images from vocab pages ──────────────────────────────────

def extract_vocab_images(doc):
    """Extract images from all 어휘 VOCABULARY pages."""
    images_by_chapter = {}
    saved_xrefs = set()

    for pg_idx in range(doc.page_count):
        page = doc[pg_idx]
        text = page.get_text()
        if '어휘' not in text and 'VOCABULARY' not in text:
            continue

        page_num = pg_idx + 1
        ch = page_to_chapter(page_num)
        if ch == 0:
            continue

        ch_dir = os.path.join(IMG_DIR, f'ch{ch:02d}')
        os.makedirs(ch_dir, exist_ok=True)
        ch_imgs = images_by_chapter.setdefault(ch, [])

        for idx, img_info in enumerate(page.get_images(full=True)):
            xref = img_info[0]
            w, h  = img_info[2], img_info[3]
            if w < 80 or h < 80:
                continue
            if xref in saved_xrefs:
                continue
            saved_xrefs.add(xref)
            try:
                pix = fitz.Pixmap(doc, xref)
                if pix.n > 4:
                    pix = fitz.Pixmap(fitz.csRGB, pix)
                fname = f'ch{ch:02d}_p{page_num:03d}_i{idx:02d}.jpg'
                pix.save(os.path.join(ch_dir, fname))
                ch_imgs.append({'file': fname, 'w': w, 'h': h, 'page': page_num})
                pix = None
            except Exception:
                pass

    return images_by_chapter


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    print(f'Opening: {PDF_PATH}')
    doc = fitz.open(PDF_PATH)
    print(f'  Total pages: {doc.page_count}')
    os.makedirs(IMG_DIR, exist_ok=True)

    print('\n[1] Extracting vocabulary from index (어휘 색인)...')
    words = extract_from_index(doc)
    print(f'  Raw entries: {len(words)}')

    print('\n[2] Extracting sub-section labels from vocab pages...')
    subsections = extract_subsections(doc)
    print(f'  Mappings found: {len(subsections)}')
    for w in words:
        w['subsection'] = subsections.get(w['korean'], '')

    print('\n[3] Extracting images from vocab pages...')
    images_by_chapter = extract_vocab_images(doc)
    total_imgs = sum(len(v) for v in images_by_chapter.values())
    print(f'  Images saved: {total_imgs}  across {len(images_by_chapter)} chapters')

    # Build output structure
    chapters_out = {}
    for ch_num in range(1, 31):
        info  = CHAPTER_INFO.get(ch_num, ('기타', f'제{ch_num}과', '기타'))
        ch_words = [w for w in words if w['chapter'] == ch_num]
        # Deduplicate by korean word
        seen, deduped = set(), []
        for w in ch_words:
            if w['korean'] not in seen:
                seen.add(w['korean'])
                deduped.append(w)
        chapters_out[ch_num] = {
            'chapter':  ch_num,
            'group':    info[0],
            'title':    info[1],
            'category': info[2],
            'words':    deduped,
            'images':   images_by_chapter.get(ch_num, []),
        }

    categories = {}
    for ch_num in range(1, 31):
        ch  = chapters_out[ch_num]
        cat = ch['category']
        categories.setdefault(cat, []).append({
            'chapter': ch['chapter'],
            'title':   ch['title'],
            'group':   ch['group'],
            'words':   ch['words'],
            'images':  ch['images'],
        })

    output = {
        'meta': {
            'source':      'EPS-TOPIK NEW 한국어 표준교재 1권 (일상생활)',
            'published':   '2024-11-30',
            'pages':       doc.page_count,
            'chapters':    30,
            'totalWords':  len(words),
            'totalImages': total_imgs,
        },
        'categories': categories,
        'chapters':   [chapters_out[k] for k in range(1, 31)],
    }

    with open(OUT_JSON, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    # Summary
    print()
    print('=' * 60)
    print(f'Done!  {len(words)} words · {total_imgs} images')
    print(f'  JSON : {OUT_JSON}')
    print(f'  Imgs : {IMG_DIR}')
    print()
    print('Category summary:')
    for cat, chs in categories.items():
        wc = sum(len(c['words']) for c in chs)
        ic = sum(len(c['images']) for c in chs)
        print(f'  {cat}: {len(chs)} chapters · {wc} words · {ic} images')
    print()
    print('Per-chapter:')
    for ch_num in range(1, 31):
        ch   = chapters_out[ch_num]
        subs = sorted(set(w['subsection'] for w in ch['words'] if w['subsection']))
        print(f'  Ch{ch_num:2d} {ch["title"]:<28s} {len(ch["words"]):3d} words  {len(ch["images"]):2d} imgs  [{", ".join(subs) or "-"}]')


if __name__ == '__main__':
    main()
