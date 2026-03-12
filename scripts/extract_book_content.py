"""
extract_book_content.py

Extracts question images and EPS-TOPIK reading questions from
EPS-TOPIK PDF textbooks (Laos Book 1 / Book 2).

Usage:
  python scripts/extract_book_content.py --pdf="path/to/book.pdf" --book=2
  python scripts/extract_book_content.py --pdf="path/to/book.pdf" --book=1

Outputs:
  public/images/book{N}/         - extracted images (by chapter)
  scripts/extracted_questions.json - EPS-TOPIK reading questions (for review)
  public/images/book{N}/pages/   - full-page PNG renders of EPS-TOPIK sections
"""

import fitz  # PyMuPDF
import json
import re
import os
import sys
import argparse
from pathlib import Path

# ── chapter map ───────────────────────────────────────────────────────────────
CHAPTER_TOPICS = {
    31: '날씨·기후', 32: '음식·요리', 33: '명절·행사', 34: '선물·예절',
    35: '한국문화', 36: '복장·예의', 37: '공구·도구 사용', 38: '직장생활',
    39: '회식·모임', 40: '직장 내 성희롱', 41: '공구 사용법',
    42: '기계 작동', 43: '건설·철근', 44: '페인트 작업',
    45: '농업·재배', 46: '축산 관리', 47: '재고·물류',
    48: '산업 안전 I', 49: '안전화·보호구', 50: '직장 성과',
    51: '취업·입국', 52: '근로 계약', 53: '외국인 등록',
    54: '보험', 55: '급여·세금', 56: '휴가', 57: '사업장 변경',
    58: '체류 기간 연장',
}

WORKPLACE_CHAPTERS = set(range(37, 59))  # chapters 37–58

# ── helpers ───────────────────────────────────────────────────────────────────

def parse_answers(text: str) -> dict:
    """Parse 정답 lines like '정답  1. ①   2. ③   3. ④'."""
    sym_map = {'①': 0, '②': 1, '③': 2, '④': 3}
    answers = {}
    for m in re.finditer(r'정답\s+(.*)', text):
        line = m.group(1)
        for q_m in re.finditer(r'(\d+)[.\s]\s*([①②③④])', line):
            q_num = int(q_m.group(1))
            answers[q_num] = sym_map.get(q_m.group(2), -1)
    return answers


def extract_options(text: str) -> list[str]:
    """Extract ①②③④ options from a clean Korean text block."""
    # Match each symbol followed by text until next symbol or end
    opts = re.findall(r'[①②③④]\s*([^\n①②③④]{2,80})', text)
    syms = ['①', '②', '③', '④']
    if len(opts) == 4:
        return [f'{syms[i]} {opts[i].strip()}' for i in range(4)]
    return []


def strip_lao(text: str) -> str:
    """Remove Lao script, keeping Korean and punctuation."""
    text = re.sub(r'[\u0e80-\u0eff]+', ' ', text)
    text = re.sub(r'[ \t]{2,}', ' ', text)
    return text


def get_chapter(page_text: str) -> int | None:
    """Extract chapter number from page header.
    Header format: 'PAGE_NUM  CHAPTER_NUM Title...'
    e.g. '44  32 복날에는...' or '320  55 급여...'
    """
    first_line = page_text.split('\n')[0].strip()
    nums = re.findall(r'\b(\d{1,3})\b', first_line[:60])
    # Chapter number is typically the 2nd number (after page number)
    for num_str in nums[1:]:
        ch = int(num_str)
        if 31 <= ch <= 60:
            return ch
    # Fallback: first number in range
    for num_str in nums:
        ch = int(num_str)
        if 31 <= ch <= 60:
            return ch
    return None


def parse_reading_questions(raw_text: str, base_answers: dict) -> list[dict]:
    """
    Parse EPS-TOPIK reading page using ① anchor scanning.
    For each ① found, check if ②③④ follow within 400 chars.
    Question text = text between previous ④ end and this ①.
    """
    # Strip Lao script
    text = strip_lao(raw_text)

    # Merge page answers with base
    page_answers = parse_answers(raw_text)
    answers = {**base_answers, **page_answers}

    # Trim text at 정답 line to avoid contaminating options
    cut = re.search(r'정답\s+\d', text)
    if cut:
        text = text[:cut.start()]

    questions = []
    q_num = 0
    prev_block_end = 0
    current_section_type = 'other'

    # Find every ① occurrence (options may have leading spaces)
    for m1 in re.finditer(r'\s*①\s*(.{2,60})', text):
        pos1 = m1.start()
        # Remaining text after ①
        rest = text[m1.end():m1.end()+400]
        # Look for ②③④ in rest
        m2 = re.search(r'\s*②\s*(.{2,60})', rest)
        m3 = re.search(r'\s*③\s*(.{2,60})', rest)
        m4 = re.search(r'\s*④\s*(.{2,60})', rest)
        if not (m2 and m3 and m4):
            continue
        # Verify order: ② before ③ before ④
        if not (m2.start() < m3.start() < m4.start()):
            continue

        opt1 = re.sub(r'\s+', ' ', m1.group(1)).strip()[:60]
        opt2 = re.sub(r'\s+', ' ', m2.group(1)).strip()[:60]
        opt3 = re.sub(r'\s+', ' ', m3.group(1)).strip()[:60]
        opt4 = re.sub(r'\s+', ' ', m4.group(1)).strip()[:60]

        opts = [f'① {opt1}', f'② {opt2}', f'③ {opt3}', f'④ {opt4}']

        # Question text = between prev ④-end and this ①
        q_text_raw = text[prev_block_end:pos1]
        prev_block_end = m1.end() + m4.end() + 5  # advance past ④

        # Clean question text
        q_text = re.sub(r'\s+', ' ', q_text_raw).strip()
        # Remove section headers
        q_text = re.sub(r'\[\d+[~～]\d+\][^\n]{0,80}', '', q_text)
        # Remove EPS-TOPIK header
        q_text = re.sub(r'EPS.TOPIK[^\n]{0,50}', '', q_text)
        # Remove leading question number
        q_text = re.sub(r'^\s*\d+\.\s*', '', q_text).strip()
        # Take last 250 chars if too long (last question/passage is what matters)
        if len(q_text) > 250:
            # Try to find question sentence ending with ?
            q_sents = re.findall(r'[^.?!\n]{10,150}\?', q_text)
            q_text = q_sents[-1].strip() if q_sents else q_text[-200:].strip()

        # Update section type from context
        if '빈칸' in q_text_raw or '___' in q_text_raw or '\u3131' in q_text_raw:
            current_section_type = 'fill-blank'
        elif '그림을 보고' in q_text_raw:
            current_section_type = 'picture-text'
        elif '내용과 같은' in q_text_raw or '글을 읽고' in q_text_raw:
            current_section_type = 'comprehension'
        elif '단어와 의미' in q_text_raw:
            current_section_type = 'word-match'
        elif '맞는 문장' in q_text_raw:
            current_section_type = 'correct-sentence'

        q_num += 1
        qtype = classify_question(q_text_raw) if q_text_raw.strip() else current_section_type

        questions.append({
            'qNum': q_num,
            'type': qtype,
            'questionText': q_text[:300],
            'options': opts,
            'correctIndex': answers.get(q_num, -1),
        })

    return questions


def save_images_from_page(doc, page_idx: int, out_dir: str, prefix: str) -> list[str]:
    """
    Save all usable images (>100×80 px) from a page.
    Returns list of saved file paths.
    """
    os.makedirs(out_dir, exist_ok=True)
    page = doc[page_idx]
    imgs = page.get_images(full=True)
    saved = []
    idx = 0
    for img in imgs:
        xref = img[0]
        try:
            pix = fitz.Pixmap(doc, xref)
            if pix.width < 100 or pix.height < 80:
                continue
            # Convert CMYK/Grey → RGB
            if pix.colorspace and pix.colorspace.n > 3:
                pix = fitz.Pixmap(fitz.csRGB, pix)
            elif pix.colorspace and pix.colorspace.n == 1:
                pix = fitz.Pixmap(fitz.csRGB, pix)
            fname = os.path.join(out_dir, f'{prefix}_img{idx:02d}.jpg')
            pix.save(fname, jpg_quality=85)
            saved.append(fname)
            idx += 1
        except Exception:
            pass
    return saved


def render_page(doc, page_idx: int, out_path: str, scale: float = 1.5):
    """Render a PDF page as PNG image."""
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    mat = fitz.Matrix(scale, scale)
    pix = doc[page_idx].get_pixmap(matrix=mat)
    pix.save(out_path)


# ── main question extraction ──────────────────────────────────────────────────

QUESTION_PATTERNS = [
    ('fill-blank',       r'빈칸에 들어갈 가장 알맞은'),
    ('comprehension',    r'다음 글을 읽고.*(내용과 같은|맞는 것)'),
    ('topic-id',         r'다음은 무엇에 대한 글'),
    ('picture-text',     r'다음 그림을 보고 맞는 (단어나 )?문장'),
    ('correct-sentence', r'밑줄 친 부분이 맞는 문장'),
    ('word-match',       r'다음 단어와 의미가 비슷한'),
]


def classify_question(text: str) -> str:
    for qtype, pat in QUESTION_PATTERNS:
        if re.search(pat, text):
            return qtype
    return 'other'


def extract_eps_reading_questions(doc, book_num: int) -> list[dict]:
    """
    Find all EPS-TOPIK reading pages and extract questions.
    """
    all_questions = []
    total_pages = doc.page_count

    # Find reading section pages
    reading_pages = []
    for i in range(total_pages):
        raw_text = doc[i].get_text()
        if 'EPS-TOPIK 읽기' in raw_text:
            reading_pages.append(i)

    print(f'Found {len(reading_pages)} EPS-TOPIK reading pages')

    for page_idx in reading_pages:
        raw_text = doc[page_idx].get_text()
        page_num = page_idx + 1
        chapter = get_chapter(raw_text)
        if not chapter:
            continue

        # Look for 정답 on THIS page and adjacent pages
        answers = parse_answers(raw_text)
        for delta in [1, -1, 2]:
            adj = page_idx + delta
            if 0 <= adj < total_pages:
                found = parse_answers(doc[adj].get_text())
                for k, v in found.items():
                    if k not in answers:
                        answers[k] = v

        topic = CHAPTER_TOPICS.get(chapter, f'Ch{chapter}')
        is_workplace = chapter in WORKPLACE_CHAPTERS

        parsed = parse_reading_questions(raw_text, answers)

        for q in parsed:
            # Skip questions with no useful text
            if len(q['questionText']) < 5 and q['type'] == 'picture-text':
                q['questionText'] = '[그림 참고]'  # image-based question

            all_questions.append({
                'bookNum': book_num,
                'chapter': chapter,
                'topic': topic,
                'isWorkplace': is_workplace,
                'sourcePage': page_num,
                'qNum': q['qNum'],
                'type': q['type'],
                'questionText': q['questionText'],
                'options': q['options'],
                'correctIndex': q['correctIndex'],
                'explanation': '',
                'bankIdSuggestion': f'B{book_num}Ch{chapter:02d}Q{q["qNum"]:02d}',
            })

    print(f'Extracted {len(all_questions)} questions')
    return all_questions


# ── image extraction ──────────────────────────────────────────────────────────

def extract_chapter_images(doc, book_num: int, out_root: str,
                            render_pages: bool = True) -> dict:
    """
    For each EPS-TOPIK section page, extract embedded images and
    optionally render the full page as PNG.
    Returns summary dict.
    """
    total_pages = doc.page_count
    summary = {'images': 0, 'pages_rendered': 0, 'chapters': {}}

    # Collect EPS-TOPIK pages (both reading and listening)
    eps_pages = []
    for i in range(total_pages):
        raw = doc[i].get_text()
        if ('EPS-TOPIK 읽기' in raw or 'EPS-TOPIK 듣기' in raw):
            chapter = get_chapter(raw)
            if chapter:
                eps_pages.append((i, chapter, 'reading' if '읽기' in raw else 'listening'))

    print(f'Processing {len(eps_pages)} EPS-TOPIK section pages...')

    for page_idx, chapter, section_type in eps_pages:
        topic = CHAPTER_TOPICS.get(chapter, f'ch{chapter}')
        out_dir = os.path.join(out_root, f'ch{chapter:02d}_{topic[:12]}')

        prefix = f'p{page_idx+1:03d}_{section_type}'

        # Extract embedded images
        saved = save_images_from_page(doc, page_idx, out_dir, prefix)
        summary['images'] += len(saved)

        # Render full page as PNG for visual review
        if render_pages:
            page_png = os.path.join(out_dir, f'page_{page_idx+1:03d}.png')
            render_page(doc, page_idx, page_png, scale=1.5)
            summary['pages_rendered'] += 1

        ch_key = f'ch{chapter:02d}'
        if ch_key not in summary['chapters']:
            summary['chapters'][ch_key] = {'chapter': chapter, 'topic': topic,
                                             'images': 0, 'pages': []}
        summary['chapters'][ch_key]['images'] += len(saved)
        summary['chapters'][ch_key]['pages'].append(page_idx + 1)

    return summary


# ── entry point ───────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description='Extract EPS-TOPIK content from PDF')
    parser.add_argument('--pdf', required=True, help='Path to PDF file')
    parser.add_argument('--book', type=int, default=2, help='Book number (1 or 2)')
    parser.add_argument('--no-render', action='store_true',
                        help='Skip full-page PNG rendering (faster)')
    parser.add_argument('--images-only', action='store_true',
                        help='Only extract images, skip question text')
    parser.add_argument('--questions-only', action='store_true',
                        help='Only extract questions, skip images')
    args = parser.parse_args()

    pdf_path = args.pdf
    if not os.path.exists(pdf_path):
        print(f'ERROR: PDF not found: {pdf_path}')
        sys.exit(1)

    book_num = args.book
    project_root = Path(__file__).parent.parent
    img_out = str(project_root / 'public' / 'images' / f'book{book_num}')
    json_out = str(project_root / 'scripts' / f'book{book_num}_questions.json')

    print(f'Opening: {pdf_path}')
    doc = fitz.open(pdf_path)
    print(f'Pages: {doc.page_count}')

    # ── Extract images ──
    if not args.questions_only:
        print('\n== Extracting images ==')
        summary = extract_chapter_images(
            doc, book_num, img_out,
            render_pages=not args.no_render
        )
        print(f'Images saved: {summary["images"]}')
        print(f'Pages rendered: {summary["pages_rendered"]}')
        for ch, info in sorted(summary['chapters'].items()):
            marker = '*' if info['chapter'] in WORKPLACE_CHAPTERS else ' '
            topic_ascii = info['topic'].encode('utf-8').decode('utf-8')
            print(f'  {marker} Ch{info["chapter"]:02d} {info["images"]} imgs  pages: {info["pages"]}')

    # ── Extract questions ──
    if not args.images_only:
        print('\n== Extracting EPS-TOPIK reading questions ==')
        questions = extract_eps_reading_questions(doc, book_num)

        # Group and save
        with open(json_out, 'w', encoding='utf-8') as f:
            json.dump({
                'book': book_num,
                'totalExtracted': len(questions),
                'workplaceOnly': sum(1 for q in questions if q['isWorkplace']),
                'questions': questions,
            }, f, ensure_ascii=False, indent=2)
        print(f'Questions saved: {json_out}')
        print(f'  Total: {len(questions)}')
        print(f'  Workplace chapters (37-58): {sum(1 for q in questions if q["isWorkplace"])}')

        # Print sample
        print('\nSample questions:')
        for q in [q for q in questions if q['isWorkplace']][:5]:
            print(f'  [{q["bankIdSuggestion"]}] Ch{q["chapter"]} | p{q["sourcePage"]} | {q["type"]}')
            print(f'    Q: {q["questionText"][:80]}')
            print(f'    A: {q["options"]}')
            print(f'    Correct: {q["correctIndex"]} | page ans: see {json_out}')
            print()

    print('\nDone!')


if __name__ == '__main__':
    main()
