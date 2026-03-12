"""
Copy key exam images from book2/ to public/images/eps/ with clean ASCII filenames.
Pattern: r{chap}_{nn}.jpg (reading), l{chap}_{nn}.jpg (listening)
"""
import os, shutil, sys

SRC = os.path.join('public', 'images', 'book2')
DST = os.path.join('public', 'images', 'eps')
os.makedirs(DST, exist_ok=True)

def find_chapter_dir(chapter_num):
    """Find the chapter directory by number prefix, e.g. ch37_*"""
    for name in os.listdir(SRC):
        if name.startswith(f'ch{chapter_num}_') or name.startswith(f'ch{chapter_num} '):
            return os.path.join(SRC, name)
    return None

def copy_reading_imgs(chapter_num, n=4, page=None):
    """Copy first n reading images from chapter to eps/rCH_01.jpg..."""
    chdir = find_chapter_dir(chapter_num)
    if not chdir:
        print(f'  ! ch{chapter_num} not found', file=sys.stderr)
        return []
    # find reading images
    imgs = sorted([f for f in os.listdir(chdir) if '_reading_img' in f and f.endswith('.jpg')])
    # filter by page if specified
    if page:
        imgs = [f for f in imgs if f'p{page:03d}_reading_img' in f or f'p{page}_reading_img' in f]
    urls = []
    for i, fname in enumerate(imgs[:n]):
        dst_name = f'r{chapter_num}_{i+1:02d}.jpg'
        src_path = os.path.join(chdir, fname)
        dst_path = os.path.join(DST, dst_name)
        shutil.copy2(src_path, dst_path)
        urls.append(f'/images/eps/{dst_name}')
        print(f'  {fname} -> {dst_name}')
    return urls

def copy_listening_imgs(chapter_num, n=4, offset=0):
    """Copy n listening images starting at offset from chapter."""
    chdir = find_chapter_dir(chapter_num)
    if not chdir:
        print(f'  ! ch{chapter_num} not found', file=sys.stderr)
        return []
    imgs = sorted([f for f in os.listdir(chdir) if '_listening_img' in f and f.endswith('.jpg')])
    # filter to largest-page listening (prefer main page not duplicate)
    if imgs:
        page_nums = {}
        for f in imgs:
            p = f.split('_')[0][1:]  # e.g. '102'
            if p not in page_nums:
                page_nums[p] = []
            page_nums[p].append(f)
        max_page = max(page_nums.keys(), key=lambda x: len(page_nums[x]))
        imgs = sorted(page_nums[max_page])
    selected = imgs[offset:offset+n]
    urls = []
    for i, fname in enumerate(selected):
        suffix = f'a{offset//4+1:02d}' if offset > 0 else ''
        dst_name = f'l{chapter_num}_{suffix}{i+1:02d}.jpg'
        src_path = os.path.join(chdir, fname)
        dst_path = os.path.join(DST, dst_name)
        shutil.copy2(src_path, dst_path)
        urls.append(f'/images/eps/{dst_name}')
        print(f'  {fname} -> {dst_name}')
    return urls

# ── Reading picture questions ─────────────────────────────────────────────
print('=== Reading Images ===')
print('Ch37 (가전기구/기숙사):')
r37 = copy_reading_imgs(37, 4)   # p104: 에어컨, 세탁기, 냉장고, 선풍기

print('Ch38 (직장생활 장면):')
r38 = copy_reading_imgs(38, 4)   # p116: 직장 모습

print('Ch41 (공구):')
r41 = copy_reading_imgs(41, 4)   # p152: 톱, 볼트, 드라이버, 스패너

print('Ch42 (기계/제품):')
r42 = copy_reading_imgs(42, 4)   # p164: 목재, 상자, 기계, 완성품

print('Ch43 (건설 자재):')
r43 = copy_reading_imgs(43, 4)   # p176: 벽돌, 철근, 비계, 굴착기

print('Ch44 (페인트 장비):')
r44 = copy_reading_imgs(44, 4)   # p188: 손수레, 롤러, 붓, 스프레이

print('Ch45 (농기구):')
r45 = copy_reading_imgs(45, 4)   # p200: 낫, 삽, 괭이, 호미

print('Ch46 (어업/축산 장비):')
r46 = copy_reading_imgs(46, 4)   # p212: 부표, 갈퀴, 통발, 밧줄

print('Ch47 (목공 작업):')
r47 = copy_reading_imgs(47, 4)   # p224: 홈파기, 조립, 사포, 도색

print('Ch48 (산업 기계):')
r48 = copy_reading_imgs(48, 4)   # p236: 선반기계, 프레스, etc.

print('Ch49 (안전 보호구) set1:')
r49a = copy_reading_imgs(49, 4)  # p248 img00-03

print('Ch49 (안전 보호구) set2:')
r49b = copy_reading_imgs(49, 8)  # p248 img00-07 (all 8, for second Q)
r49b = r49b[4:] if len(r49b) >= 8 else []  # Second 4

# ── Listening picture questions ────────────────────────────────────────────
print()
print('=== Listening Images ===')

print('Ch37 (도구 사용 동작) Q1:')
l37a = copy_listening_imgs(37, 4, 0)   # img00-03

print('Ch38 (직장 행동) Q1:')
l38a = copy_listening_imgs(38, 4, 0)   # img00-03

print('Ch43 (건설 작업) Q1:')
l43a = copy_listening_imgs(43, 4, 0)   # img00-03

print('Ch44 (페인트 작업) Q1:')
l44a = copy_listening_imgs(44, 4, 0)   # img00-03

print('Ch45 (농업 동작) Q1:')
l45a = copy_listening_imgs(45, 4, 0)   # img00-03

print('Ch46 (축산 관리) Q1:')
l46a = copy_listening_imgs(46, 4, 0)   # img00-03

print('Ch49 (안전 보호구 착용) Q1:')
l49a = copy_listening_imgs(49, 4, 0)   # img00-03


print()
print('URL mappings for examData.js:')
print(f'r37 = {r37}')
print(f'r38 = {r38}')
print(f'r41 = {r41}')
print(f'r42 = {r42}')
print(f'r43 = {r43}')
print(f'r44 = {r44}')
print(f'r45 = {r45}')
print(f'r46 = {r46}')
print(f'r47 = {r47}')
print(f'r48 = {r48}')
print(f'r49a = {r49a}')
print(f'l37a = {l37a}')
print(f'l38a = {l38a}')
print(f'l43a = {l43a}')
print(f'l44a = {l44a}')
print(f'l45a = {l45a}')
print(f'l46a = {l46a}')
print(f'l49a = {l49a}')
total = len(os.listdir(DST))
print(f'\nTotal images in eps/: {total}')
