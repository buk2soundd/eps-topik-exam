"""
Generate simple SVG placeholder images for new picture-match questions.
Each image shows the concept label in Korean so the UI is functional.
Run: python scripts/gen_placeholder_images.py
"""
import os

OUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'eps')
os.makedirs(OUT_DIR, exist_ok=True)

COLORS = ['#d0e8f8', '#d8f0d8', '#fde8d0', '#f0d8f0']  # blue/green/orange/purple soft

def make_svg(label: str, color: str) -> str:
    lines = []
    # Split long labels into two lines
    if len(label) > 10:
        mid = len(label) // 2
        # find space or split at mid
        for i in range(mid, min(mid+4, len(label))):
            if label[i] == ' ':
                mid = i; break
        line1 = label[:mid].strip()
        line2 = label[mid:].strip()
        text_block = f'<text x="100" y="90" font-size="18" fill="#333" dominant-baseline="middle" text-anchor="middle">{line1}</text><text x="100" y="115" font-size="18" fill="#333" dominant-baseline="middle" text-anchor="middle">{line2}</text>'
    else:
        text_block = f'<text x="100" y="100" font-size="20" fill="#333" dominant-baseline="middle" text-anchor="middle">{label}</text>'

    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <rect width="200" height="200" fill="{color}" rx="10"/>
  <rect x="4" y="4" width="192" height="192" fill="none" stroke="#aaa" stroke-width="1.5" rx="8"/>
  {text_block}
</svg>'''

# ─── Definitions ───────────────────────────────────────────────────────────────
# (filename_base, [label_opt1, label_opt2, label_opt3, label_opt4])
IMAGES = [
    # R137  트랙터로 밭을 갈다
    ('r137', ['씨앗 뿌리기', '트랙터 경운', '거름 주기', '물 주기']),
    # R138  분무기로 농약 살포
    ('r138', ['사과 따기', '씨 뿌리기', '농약 살포', '거름 주기']),
    # R139  소에게 사료 주기
    ('r139', ['소 세척', '소 사료 주기', '소 무게 재기', '소 이동']),
    # R140  그물로 물고기 잡기
    ('r140', ['부표 설치', '낚시하기', '그물로 어획', '통발 설치']),
    # R141  용접 마스크 쓰고 용접
    ('r141', ['그라인더 절단', '용접 작업', '스패너 조임', '드릴 작업']),
    # R142  지게차로 팔레트 이동
    ('r142', ['컨베이어 검사', '손으로 들기', '지게차 운반', '트럭 적재']),
    # R143  컨베이어 불량 검사
    ('r143', ['제품 조립', '제품 포장', '불량 검사', '기계 수리']),
    # R144  소화기로 불 끄기
    ('r144', ['비상구 대피', '소화기 보관', '119 신고', '소화기 사용']),
    # R145  안전대 매고 고소 작업
    ('r145', ['계단 오르기', '안전대 고소작업', '사다리 내려오기', '비계 걷기']),
    # R146  철근 묶기
    ('r146', ['굴착기 작업', '벽 페인트', '철근 묶기', '비계 조립']),
    # R147  ATM 인출
    ('r147', ['우체국 소포', 'ATM 인출', '편의점 구매', '병원 접수']),
    # R148  분리수거
    ('r148', ['쓰레기봉투', '음식물 쓰레기', '분리수거', '청소차 대기']),
    # R149  의사에게 진찰
    ('r149', ['약국 구매', '응급실 이동', '의사 진찰', '병원 대기']),
    # R150  고용센터 서류 제출
    ('r150', ['여권사진 촬영', '출입국 등록', '고용센터 서류', '은행 통장']),
    # R151  드릴로 구멍 뚫기
    ('r151', ['롤러 페인트', '드릴 구멍', '스패너 조임', '쇠톱 절단']),
    # L109  트랙터로 밭 갈기
    ('l109', ['씨앗 뿌리기', '트랙터 경운', '거름 주기', '물 주기']),
    # L110  닭장 청소
    ('l110', ['소 사료 주기', '닭장 청소', '돼지 무게 재기', '축사 수리']),
    # L111  갈퀴
    ('l111', ['괭이', '낫', '갈퀴', '호미']),
    # L112  컨베이어 포장
    ('l112', ['기계 조립', '제품 포장', '지게차 운전', '도면 보기']),
    # L113  제품 팔레트에 쌓기
    ('l113', ['트럭에 싣기', '팔레트 적재', '제품 검사', '부품 조립']),
    # L114  용접 마스크+장갑 착용
    ('l114', ['방진 마스크', '안전모 착용', '용접 보호구', '보안경 착용']),
    # L115  은행 해외 송금
    ('l115', ['우체국 소포', '은행 업무', '편의점 계산', '지원센터 상담']),
    # L116  가격 숫자 (option images = price tags)
    ('l116', ['11,000원', '12,000원', '20,000원', '22,000원']),
    # L117  가격 숫자
    ('l117', ['7,500원', '8,000원', '8,500원', '9,500원']),
    # L118  삼겹살 굽기
    ('l118', ['냉면 먹기', '비빔밥 먹기', '삼겹살 굽기', '라면 끓이기']),
    # L119  작업 일지 작성
    ('l119', ['보고서 출력', '작업 일지 작성', '서류 복사', '전화 받기']),
    # L120  안전화 착용 표지
    ('l120', ['금연 표지', '안전모 착용 표지', '안전화 착용 표지', '출입 금지 표지']),
]

count = 0
for base, labels in IMAGES:
    for i, label in enumerate(labels, 1):
        filename = f'{base}_{i:02d}.svg'
        filepath = os.path.join(OUT_DIR, filename)
        color = COLORS[(i - 1) % len(COLORS)]
        svg = make_svg(label, color)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(svg)
        count += 1

print(f'✅ Created {count} SVG placeholder images in {os.path.abspath(OUT_DIR)}')
