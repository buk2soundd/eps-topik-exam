"""
Generate detailed SVG illustrations for EPS-TOPIK picture-match questions.
Creates 108 SVGs (27 questions × 4 options) with clear pictographic drawings.
Style: simple colored illustrations matching real EPS-TOPIK exam style.
"""
import os

OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'public', 'images', 'eps')
os.makedirs(OUT_DIR, exist_ok=True)

W, H = 300, 250

def svg_wrap(inner, bg='#f0f4f8'):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">
<rect width="{W}" height="{H}" fill="{bg}" rx="8"/>
{inner}
</svg>'''

# ═══════════════════════════════════════════════════════════════════════════════
# REUSABLE ELEMENTS
# ═══════════════════════════════════════════════════════════════════════════════

def ground(color='#8B6914', y=200):
    return f'<rect x="0" y="{y}" width="{W}" height="{H-y}" fill="{color}"/>'

def sky():
    return '<rect x="0" y="0" width="300" height="160" fill="#87CEEB"/><circle cx="260" cy="40" r="25" fill="#FFD700"/>'

def farm_bg():
    return sky() + ground('#6B8E23', 180) + ground('#8B6914', 210)

def indoor_bg(wall='#E8E0D0', floor='#C4A882'):
    return f'<rect x="0" y="0" width="{W}" height="170" fill="{wall}"/><rect x="0" y="170" width="{W}" height="80" fill="{floor}"/><line x1="0" y1="170" x2="300" y2="170" stroke="#999" stroke-width="2"/>'

def person(x, y, shirt='#2563EB', pants='#1E3A5F', hard_hat=False, face_right=True):
    """Simple person figure at position (x,y) = center of feet"""
    d = 1 if face_right else -1
    hat = f'<ellipse cx="{x}" cy="{y-68}" rx="14" ry="6" fill="#FFD700"/>' if hard_hat else ''
    return f'''<circle cx="{x}" cy="{y-60}" r="12" fill="#FDBCB4"/>
{hat}
<rect x="{x-10}" y="{y-48}" width="20" height="25" rx="3" fill="{shirt}"/>
<rect x="{x-8}" y="{y-23}" width="7" height="23" fill="{pants}"/>
<rect x="{x+1}" y="{y-23}" width="7" height="23" fill="{pants}"/>
<rect x="{x-9}" y="{y}" width="8" height="5" rx="2" fill="#333"/>
<rect x="{x+1}" y="{y}" width="8" height="5" rx="2" fill="#333"/>
<line x1="{x+10*d}" y1="{y-45}" x2="{x+25*d}" y2="{y-30}" stroke="{shirt}" stroke-width="4" stroke-linecap="round"/>'''

def cow(x, y):
    return f'''<ellipse cx="{x}" cy="{y}" rx="35" ry="20" fill="white" stroke="#333" stroke-width="1.5"/>
<ellipse cx="{x+8}" cy="{y+3}" rx="10" ry="8" fill="#8B4513"/>
<circle cx="{x+30}" cy="{y-8}" r="10" fill="white" stroke="#333" stroke-width="1.5"/>
<circle cx="{x+34}" cy="{y-10}" r="2" fill="#333"/>
<rect x="{x-25}" y="{y+15}" width="5" height="15" fill="#333"/>
<rect x="{x-10}" y="{y+15}" width="5" height="15" fill="#333"/>
<rect x="{x+10}" y="{y+15}" width="5" height="15" fill="#333"/>
<rect x="{x+22}" y="{y+15}" width="5" height="15" fill="#333"/>'''

def chicken(x, y):
    return f'''<ellipse cx="{x}" cy="{y}" rx="15" ry="12" fill="white" stroke="#333"/>
<circle cx="{x+12}" cy="{y-8}" r="7" fill="white" stroke="#333"/>
<polygon points="{x+18},{y-8} {x+24},{y-10} {x+18},{y-6}" fill="#FF6600"/>
<circle cx="{x+14}" cy="{y-10}" r="1.5" fill="#333"/>
<polygon points="{x+10},{y-15} {x+13},{y-20} {x+16},{y-15}" fill="#CC0000"/>
<line x1="{x-8}" y1="{y+12}" x2="{x-8}" y2="{y+20}" stroke="#CC6600" stroke-width="2"/>
<line x1="{x+5}" y1="{y+12}" x2="{x+5}" y2="{y+20}" stroke="#CC6600" stroke-width="2"/>'''

def tractor(x, y):
    return f'''<rect x="{x}" y="{y}" width="60" height="30" rx="3" fill="#CC0000"/>
<rect x="{x+45}" y="{y-15}" width="20" height="25" rx="2" fill="#CC0000"/>
<rect x="{x+48}" y="{y-12}" width="14" height="15" fill="#ADD8E6" rx="1"/>
<circle cx="{x+15}" cy="{y+35}" r="18" fill="#333" stroke="#666" stroke-width="3"/>
<circle cx="{x+15}" cy="{y+35}" r="6" fill="#999"/>
<circle cx="{x+55}" cy="{y+30}" r="12" fill="#333" stroke="#666" stroke-width="3"/>
<circle cx="{x+55}" cy="{y+30}" r="4" fill="#999"/>
<rect x="{x+58}" y="{y-20}" width="3" height="12" fill="#333"/>'''

def fish(x, y, size=1):
    s = size
    return f'''<ellipse cx="{x}" cy="{y}" rx="{20*s}" ry="{10*s}" fill="#4682B4"/>
<polygon points="{x-20*s},{y} {x-32*s},{y-10*s} {x-32*s},{y+10*s}" fill="#4682B4"/>
<circle cx="{x+10*s}" cy="{y-3*s}" r="{2*s}" fill="white"/>
<circle cx="{x+11*s}" cy="{y-3*s}" r="{1*s}" fill="#333"/>'''

def fire():
    return '''<path d="M150,80 Q140,50 150,30 Q155,50 165,40 Q160,60 170,80 Q160,90 150,90 Q140,90 130,80 Z" fill="#FF4500" opacity="0.9"/>
<path d="M148,85 Q143,65 150,50 Q155,65 160,55 Q157,75 163,85 Q155,90 148,90 Z" fill="#FFD700" opacity="0.8"/>'''

def safety_sign(x, y, shape='circle', color='#0066CC', icon=''):
    """Safety sign - circle=mandatory, triangle=warning, square=prohibition"""
    if shape == 'circle':
        border = f'<circle cx="{x}" cy="{y}" r="45" fill="{color}"/><circle cx="{x}" cy="{y}" r="38" fill="white"/>'
    elif shape == 'triangle':
        border = f'<polygon points="{x},{y-45} {x-45},{y+30} {x+45},{y+30}" fill="{color}" stroke="white" stroke-width="3"/>'
    else:
        border = f'<rect x="{x-45}" y="{y-45}" width="90" height="90" fill="{color}" rx="5"/>'
    return border + icon

def price_tag(amount):
    """Price display card"""
    inner = f'''<rect x="50" y="40" width="200" height="120" rx="15" fill="white" stroke="#1a3a6b" stroke-width="3"/>
<rect x="50" y="40" width="200" height="35" rx="15" fill="#1a3a6b"/>
<rect x="50" y="60" width="200" height="15" fill="#1a3a6b"/>
<text x="150" y="62" text-anchor="middle" font-size="14" fill="white" font-weight="bold" font-family="Arial">가 격</text>
<text x="150" y="120" text-anchor="middle" font-size="32" fill="#1a3a6b" font-weight="bold" font-family="Arial">{amount}</text>
<text x="150" y="148" text-anchor="middle" font-size="14" fill="#666" font-family="Arial">원 (원)</text>'''
    return svg_wrap(inner, '#f8f9fa')

# ═══════════════════════════════════════════════════════════════════════════════
# IMAGE DEFINITIONS: Each returns full SVG string
# ═══════════════════════════════════════════════════════════════════════════════

IMAGES = {}

# ─── R137: 트랙터로 밭을 갈고 있습니다 ────────────────────────────────────────
IMAGES['r137_01'] = lambda: svg_wrap(farm_bg() + person(100, 175, '#4CAF50') +
    f'''<line x1="115" y1="155" x2="130" y2="175" stroke="#8B4513" stroke-width="3"/>
<circle cx="140" cy="180" r="8" fill="none" stroke="#8B4513" stroke-width="2"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">씨앗 뿌리기</text>''')

IMAGES['r137_02'] = lambda: svg_wrap(farm_bg() + tractor(90, 140) +
    f'''<path d="M80,210 Q100,200 120,210 Q140,200 160,210 Q180,200 200,210" stroke="#6B3A0A" stroke-width="3" fill="none"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">트랙터 경운</text>''')

IMAGES['r137_03'] = lambda: svg_wrap(farm_bg() + person(100, 175, '#4CAF50') +
    f'''<ellipse cx="130" cy="165" rx="15" ry="10" fill="#8B6914" stroke="#5C4A00" stroke-width="1.5"/>
<path d="M115,150 Q130,140 145,150" stroke="#8B6914" stroke-width="3" fill="none"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">거름 주기</text>''')

IMAGES['r137_04'] = lambda: svg_wrap(farm_bg() + person(90, 175, '#4CAF50') +
    f'''<line x1="105" y1="140" x2="140" y2="120" stroke="#666" stroke-width="3"/>
<path d="M135,115 Q145,105 155,115 L150,120 Q145,118 140,120 Z" fill="#4682B4"/>
<path d="M135,120 L140,145 L130,145 Z" fill="#4682B4" opacity="0.4"/>
<path d="M140,120 L148,145 L138,145 Z" fill="#4682B4" opacity="0.4"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">물 주기</text>''')

# ─── R138: 분무기로 농약을 살포 ───────────────────────────────────────────────
IMAGES['r138_01'] = lambda: svg_wrap(farm_bg() +
    f'''<rect x="120" y="100" width="8" height="60" fill="#5C3A00"/>
<circle cx="124" cy="85" r="20" fill="#228B22"/>
<circle cx="140" cy="80" r="15" fill="#228B22"/>
<circle cx="110" cy="90" r="12" fill="#228B22"/>''' +
    person(80, 175, '#FF6347') +
    f'''<circle cx="105" cy="145" r="6" fill="#CC0000"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">사과 따기</text>''')

IMAGES['r138_02'] = lambda: svg_wrap(farm_bg() + person(100, 175, '#4CAF50') +
    f'''<line x1="115" y1="155" x2="130" y2="175" stroke="#8B4513" stroke-width="3"/>
<circle cx="140" cy="180" r="8" fill="none" stroke="#8B4513" stroke-width="2"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">씨 뿌리기</text>''')

IMAGES['r138_03'] = lambda: svg_wrap(farm_bg() + person(80, 175, '#4CAF50') +
    f'''<rect x="95" y="130" width="15" height="30" rx="3" fill="#666"/>
<line x1="102" y1="130" x2="140" y2="100" stroke="#666" stroke-width="3"/>
<path d="M130,100 L145,90 L150,95 L140,105 Z" fill="#999"/>
<path d="M140,105 Q155,110 170,140 Q160,145 145,120" fill="#90EE90" opacity="0.5"/>
<path d="M142,108 Q160,100 175,130 Q165,135 150,115" fill="#90EE90" opacity="0.4"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">농약 살포</text>''')

IMAGES['r138_04'] = lambda: svg_wrap(farm_bg() + person(100, 175, '#4CAF50') +
    f'''<ellipse cx="130" cy="165" rx="15" ry="10" fill="#8B6914" stroke="#5C4A00"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">거름 주기</text>''')

# ─── R139: 소에게 사료를 주고 있습니다 ──────────────────────────────────────────
IMAGES['r139_01'] = lambda: svg_wrap(farm_bg() + cow(150, 150) + person(70, 175, '#2563EB') +
    f'''<line x1="85" y1="145" x2="120" y2="155" stroke="#4682B4" stroke-width="3"/>
<path d="M115,150 Q125,145 130,155 Q120,160 115,155 Z" fill="#4682B4" opacity="0.4"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">소 세척</text>''')

IMAGES['r139_02'] = lambda: svg_wrap(farm_bg() + cow(170, 155) + person(70, 178, '#2563EB') +
    f'''<rect x="90" y="150" width="25" height="18" rx="3" fill="#D2691E" stroke="#8B4513"/>
<rect x="95" y="145" width="15" height="8" fill="#FFD700"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">소 사료 주기</text>''')

IMAGES['r139_03'] = lambda: svg_wrap(farm_bg() + cow(155, 145) +
    f'''<rect x="60" y="160" width="50" height="35" fill="#CCC" stroke="#999" stroke-width="2"/>
<text x="85" y="183" text-anchor="middle" font-size="14" fill="#333" font-family="Arial">kg</text>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">소 무게 재기</text>''')

IMAGES['r139_04'] = lambda: svg_wrap(farm_bg() + cow(180, 155) + person(60, 178, '#2563EB') +
    f'''<line x1="75" y1="148" x2="150" y2="150" stroke="#8B4513" stroke-width="3"/>
<path d="M170,175 L200,175 L210,165 L220,175" stroke="#333" stroke-width="2" fill="none"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">소 이동</text>''')

# ─── R140: 그물로 바다에서 물고기를 잡기 ──────────────────────────────────────
def sea_bg():
    return '<rect x="0" y="0" width="300" height="100" fill="#87CEEB"/><rect x="0" y="100" width="300" height="150" fill="#1E90FF"/>' + \
           ''.join(f'<path d="M{x},110 Q{x+15},105 {x+30},110 Q{x+45},115 {x+60},110" stroke="white" stroke-width="1" fill="none" opacity="0.5"/>' for x in range(0, 300, 60))

IMAGES['r140_01'] = lambda: svg_wrap(sea_bg() +
    f'''<rect x="120" y="70" width="60" height="30" rx="5" fill="#8B4513"/>
<rect x="130" y="50" width="5" height="20" fill="#8B4513"/>
<rect x="155" y="55" width="5" height="15" fill="#8B4513"/>
<circle cx="150" cy="45" r="10" fill="#FF6600"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="white" font-family="Arial">부표 설치</text>''')

IMAGES['r140_02'] = lambda: svg_wrap(sea_bg() + person(80, 95, '#FF6347') +
    f'''<line x1="95" y1="60" x2="180" y2="30" stroke="#666" stroke-width="2"/>
<line x1="180" y1="30" x2="185" y2="120" stroke="#999" stroke-width="1"/>''' +
    fish(185, 130) +
    f'''<text x="150" y="240" text-anchor="middle" font-size="11" fill="white" font-family="Arial">낚시하기</text>''')

IMAGES['r140_03'] = lambda: svg_wrap(sea_bg() +
    f'''<rect x="80" y="50" width="100" height="25" rx="5" fill="#8B4513"/>
<rect x="85" y="30" width="8" height="30" fill="#8B4513"/>
<rect x="175" y="30" width="8" height="30" fill="#8B4513"/>''' +
    person(60, 95, '#FFD700') +
    f'''<path d="M100,80 Q120,130 140,80 Q160,130 180,80 Q200,130 220,80" stroke="#999" stroke-width="2" fill="none"/>
<path d="M110,95 L130,120 L170,120 L190,95 L180,110 L120,110 Z" stroke="#666" stroke-width="1" fill="none"/>''' +
    fish(140, 110, 0.7) + fish(160, 115, 0.6) +
    f'''<text x="150" y="240" text-anchor="middle" font-size="11" fill="white" font-family="Arial">그물로 어획</text>''')

IMAGES['r140_04'] = lambda: svg_wrap(sea_bg() +
    f'''<rect x="120" y="100" width="50" height="40" rx="5" fill="#8B4513" stroke="#5C3A00"/>
<rect x="125" y="90" width="40" height="15" rx="3" fill="#8B4513"/>
<line x1="145" y1="80" x2="145" y2="65" stroke="#8B4513" stroke-width="2"/>
<circle cx="145" cy="60" r="6" fill="#FF6600"/>''' +
    person(70, 95, '#2563EB') +
    f'''<text x="150" y="240" text-anchor="middle" font-size="11" fill="white" font-family="Arial">통발 설치</text>''')

# ─── R141: 용접 마스크를 쓰고 용접 작업 ──────────────────────────────────────
IMAGES['r141_01'] = lambda: svg_wrap(indoor_bg() + person(100, 175, '#FF6347', hard_hat=True) +
    f'''<ellipse cx="155" cy="155" rx="20" ry="5" fill="#CCC"/>
<rect x="130" y="140" width="50" height="15" rx="3" fill="#999"/>
<path d="M160,140 L170,120 L175,125 L165,145" fill="#FFD700" opacity="0.6"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">그라인더 절단</text>''')

IMAGES['r141_02'] = lambda: svg_wrap(indoor_bg() +
    f'''<circle cx="120" cy="110" r="12" fill="#FDBCB4"/>
<rect x="105" y="100" width="30" height="25" rx="5" fill="#333"/>
<rect x="112" y="108" width="16" height="8" fill="#1a1a1a" rx="2"/>
<rect x="110" y="122" width="20" height="30" rx="3" fill="#666"/>
<line x1="130" y1="135" x2="170" y2="140" stroke="#666" stroke-width="4" stroke-linecap="round"/>
<circle cx="175" cy="142" r="6" fill="#FFD700"/>
<path d="M170,135 L180,120 L185,125 L175,140" fill="#FF4500" opacity="0.7"/>
<path d="M172,132 L178,115 L182,118 L176,136" fill="#FFD700" opacity="0.5"/>
<rect x="110" y="152" width="8" height="25" fill="#1E3A5F"/>
<rect x="122" y="152" width="8" height="25" fill="#1E3A5F"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">용접 작업</text>''')

IMAGES['r141_03'] = lambda: svg_wrap(indoor_bg() + person(100, 175, '#2563EB') +
    f'''<rect x="130" y="145" width="40" height="8" fill="#999"/>
<rect x="130" y="140" width="5" height="15" fill="#999"/>
<circle cx="160" cy="155" r="8" fill="#CCC" stroke="#999"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">스패너 조임</text>''')

IMAGES['r141_04'] = lambda: svg_wrap(indoor_bg() + person(100, 175, '#2563EB', hard_hat=True) +
    f'''<rect x="128" y="120" width="8" height="45" fill="#666"/>
<rect x="125" y="115" width="14" height="10" rx="3" fill="#FFD700"/>
<circle cx="132" cy="170" r="3" fill="#CCC"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">드릴 작업</text>''')

# ─── R142: 지게차로 팔레트 이동 ───────────────────────────────────────────────
def forklift(x, y):
    return f'''<rect x="{x}" y="{y}" width="55" height="35" rx="3" fill="#FFD700"/>
<rect x="{x+30}" y="{y-20}" width="25" height="25" rx="2" fill="#FFD700"/>
<rect x="{x+35}" y="{y-15}" width="15" height="15" fill="#ADD8E6"/>
<rect x="{x-20}" y="{y+10}" width="25" height="5" fill="#999"/>
<rect x="{x-22}" y="{y-15}" width="5" height="30" fill="#999"/>
<circle cx="{x+10}" cy="{y+40}" r="10" fill="#333"/>
<circle cx="{x+45}" cy="{y+40}" r="10" fill="#333"/>'''

def pallet_boxes(x, y):
    return f'''<rect x="{x}" y="{y}" width="40" height="8" fill="#D2B48C"/>
<rect x="{x+2}" y="{y-25}" width="16" height="25" fill="#C19A6B" stroke="#8B6914"/>
<rect x="{x+20}" y="{y-25}" width="16" height="25" fill="#C19A6B" stroke="#8B6914"/>
<rect x="{x+8}" y="{y-48}" width="16" height="23" fill="#C19A6B" stroke="#8B6914"/>'''

IMAGES['r142_01'] = lambda: svg_wrap(indoor_bg() + person(80, 175, '#2563EB') +
    f'''<rect x="120" y="120" width="120" height="8" fill="#999"/>
<rect x="115" y="100" width="8" height="30" fill="#666"/>
<rect x="245" y="100" width="8" height="30" fill="#666"/>
<rect x="140" y="105" width="30" height="20" fill="#C19A6B" stroke="#8B6914"/>
<rect x="185" y="105" width="30" height="20" fill="#C19A6B" stroke="#8B6914"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">컨베이어 검사</text>''')

IMAGES['r142_02'] = lambda: svg_wrap(indoor_bg() + person(130, 175, '#2563EB') +
    f'''<rect x="148" y="125" width="30" height="25" fill="#C19A6B" stroke="#8B6914" stroke-width="1.5"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">손으로 들기</text>''')

IMAGES['r142_03'] = lambda: svg_wrap(indoor_bg() + forklift(130, 130) + pallet_boxes(95, 135) +
    f'''<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">지게차 운반</text>''')

IMAGES['r142_04'] = lambda: svg_wrap(
    f'''<rect x="0" y="0" width="300" height="250" fill="#87CEEB"/>
<rect x="0" y="170" width="300" height="80" fill="#999"/>''' +
    f'''<rect x="100" y="80" width="120" height="70" rx="5" fill="#3366CC"/>
<rect x="80" y="130" width="160" height="20" fill="#333"/>
<circle cx="115" cy="165" r="18" fill="#333" stroke="#666" stroke-width="3"/>
<circle cx="215" cy="165" r="18" fill="#333" stroke="#666" stroke-width="3"/>
<rect x="105" y="85" width="40" height="25" fill="#ADD8E6" rx="2"/>''' +
    pallet_boxes(140, 100) +
    f'''<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">트럭 적재</text>''')

# ─── R143: 컨베이어 불량 검사 ─────────────────────────────────────────────────
def conveyor(y=140):
    return f'''<rect x="30" y="{y}" width="240" height="10" fill="#999"/>
<circle cx="40" cy="{y+5}" r="8" fill="#666"/>
<circle cx="260" cy="{y+5}" r="8" fill="#666"/>
<rect x="80" y="{y-15}" width="25" height="15" fill="#C19A6B" stroke="#8B6914"/>
<rect x="130" y="{y-15}" width="25" height="15" fill="#C19A6B" stroke="#8B6914"/>
<rect x="180" y="{y-15}" width="25" height="15" fill="#C19A6B" stroke="#8B6914"/>'''

IMAGES['r143_01'] = lambda: svg_wrap(indoor_bg() + person(80, 175, '#2563EB') +
    f'''<rect x="130" y="130" width="50" height="35" fill="#CCC" stroke="#999"/>
<rect x="145" y="135" width="20" height="10" fill="#666"/>
<circle cx="155" cy="155" r="5" fill="#333"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">제품 조립</text>''')

IMAGES['r143_02'] = lambda: svg_wrap(indoor_bg() + person(80, 175, '#2563EB') +
    f'''<rect x="120" y="140" width="30" height="25" fill="#C19A6B" stroke="#8B6914"/>
<rect x="113" y="133" width="44" height="10" fill="#DDD"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">제품 포장</text>''')

IMAGES['r143_03'] = lambda: svg_wrap(indoor_bg() + conveyor() + person(150, 175, '#2563EB') +
    f'''<rect x="168" y="118" width="10" height="15" fill="white" stroke="#2563EB"/>
<text x="173" y="130" text-anchor="middle" font-size="8" fill="#2563EB" font-family="Arial">✓</text>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">불량 검사</text>''')

IMAGES['r143_04'] = lambda: svg_wrap(indoor_bg() + person(80, 175, '#2563EB') +
    f'''<rect x="140" y="100" width="80" height="60" rx="5" fill="#999"/>
<rect x="150" y="105" width="30" height="15" fill="#666"/>
<rect x="190" y="110" width="20" height="40" fill="#CCC"/>
<circle cx="155" cy="140" r="8" fill="#333"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">기계 수리</text>''')

# ─── R144: 소화기 사용 ─────────────────────────────────────────────────────────
IMAGES['r144_01'] = lambda: svg_wrap(indoor_bg('#DDD', '#BBB') +
    f'''<rect x="180" y="60" width="50" height="100" fill="#2E8B57"/>
<text x="205" y="115" text-anchor="middle" font-size="12" fill="white" font-weight="bold" font-family="Arial">EXIT</text>
<path d="M190,80 L200,70 L210,80 L205,80 L205,95 L195,95 L195,80 Z" fill="white"/>''' +
    person(100, 175, '#FF6347') +
    f'''<path d="M120,165 L170,145" stroke="#333" stroke-width="2" stroke-dasharray="5"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">비상구 대피</text>''')

IMAGES['r144_02'] = lambda: svg_wrap(indoor_bg() +
    f'''<rect x="120" y="80" width="60" height="15" rx="3" fill="#CC0000"/>
<rect x="135" y="95" width="30" height="50" rx="5" fill="#CC0000"/>
<rect x="130" y="70" width="10" height="15" fill="#333"/>
<rect x="110" y="150" width="80" height="40" rx="5" fill="#CC0000" stroke="#990000"/>
<text x="150" y="175" text-anchor="middle" font-size="11" fill="white" font-weight="bold" font-family="Arial">소화기</text>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">소화기 보관</text>''')

IMAGES['r144_03'] = lambda: svg_wrap(indoor_bg() + person(100, 175, '#2563EB') +
    f'''<rect x="145" y="130" width="50" height="35" rx="5" fill="#333"/>
<rect x="150" y="135" width="40" height="20" fill="#2196F3"/>
<text x="170" y="150" text-anchor="middle" font-size="10" fill="white" font-weight="bold" font-family="Arial">119</text>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">119 신고</text>''')

IMAGES['r144_04'] = lambda: svg_wrap(indoor_bg() + person(90, 175, '#2563EB') + fire() +
    f'''<rect x="110" y="135" width="12" height="35" rx="3" fill="#CC0000"/>
<rect x="105" y="130" width="22" height="8" rx="2" fill="#CC0000"/>
<line x1="120" y1="135" x2="145" y2="115" stroke="#CCC" stroke-width="2"/>
<path d="M140,115 Q150,100 160,110 Q155,115 148,118" fill="white" opacity="0.6"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">소화기 사용</text>''')

# ─── R145: 안전대 고소작업 ─────────────────────────────────────────────────────
IMAGES['r145_01'] = lambda: svg_wrap(indoor_bg() + person(130, 175, '#2563EB') +
    f'''<rect x="160" y="80" width="40" height="100" fill="#999"/>
<rect x="162" y="90" width="36" height="5" fill="#CCC"/>
<rect x="162" y="110" width="36" height="5" fill="#CCC"/>
<rect x="162" y="130" width="36" height="5" fill="#CCC"/>
<rect x="162" y="150" width="36" height="5" fill="#CCC"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">계단 오르기</text>''')

IMAGES['r145_02'] = lambda: svg_wrap(
    '<rect x="0" y="0" width="300" height="250" fill="#87CEEB"/>' +
    f'''<rect x="50" y="50" width="200" height="8" fill="#999"/>
<rect x="55" y="58" width="5" height="110" fill="#999"/>
<rect x="240" y="58" width="5" height="110" fill="#999"/>
<rect x="50" y="168" width="200" height="8" fill="#999"/>''' +
    person(150, 160, '#FF6347', hard_hat=True) +
    f'''<path d="M140,115 Q135,100 145,105" stroke="#FFD700" stroke-width="2" fill="none"/>
<line x1="140" y1="115" x2="120" y2="60" stroke="#FFD700" stroke-width="2"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">안전대 고소작업</text>''')

IMAGES['r145_03'] = lambda: svg_wrap(indoor_bg() +
    f'''<line x1="150" y1="40" x2="150" y2="170" stroke="#999" stroke-width="4"/>
<line x1="130" y1="60" x2="170" y2="60" stroke="#999" stroke-width="3"/>
<line x1="130" y1="90" x2="170" y2="90" stroke="#999" stroke-width="3"/>
<line x1="130" y1="120" x2="170" y2="120" stroke="#999" stroke-width="3"/>
<line x1="130" y1="150" x2="170" y2="150" stroke="#999" stroke-width="3"/>''' +
    person(145, 130, '#FF6347') +
    f'''<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">사다리 내려오기</text>''')

IMAGES['r145_04'] = lambda: svg_wrap(
    '<rect x="0" y="0" width="300" height="250" fill="#87CEEB"/>' +
    f'''<rect x="40" y="60" width="8" height="160" fill="#999"/>
<rect x="240" y="60" width="8" height="160" fill="#999"/>
<rect x="40" y="80" width="210" height="8" fill="#8B4513"/>
<rect x="40" y="130" width="210" height="8" fill="#8B4513"/>
<rect x="40" y="170" width="210" height="8" fill="#8B4513"/>''' +
    person(150, 125, '#FF6347', hard_hat=True) +
    f'''<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">비계 걷기</text>''')

# ─── R146: 철근 묶기 ─────────────────────────────────────────────────────────
IMAGES['r146_01'] = lambda: svg_wrap(
    sky() + ground('#999', 170) +
    f'''<rect x="100" y="80" width="100" height="60" rx="5" fill="#FFD700"/>
<rect x="130" y="50" width="40" height="40" fill="#FFD700" rx="3"/>
<rect x="135" y="55" width="30" height="25" fill="#ADD8E6"/>
<rect x="80" y="140" width="40" height="35" rx="5" fill="#333"/>
<path d="M170,100 L200,130 L210,125 L190,95 Z" fill="#666"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">굴착기 작업</text>''')

IMAGES['r146_02'] = lambda: svg_wrap(indoor_bg() + person(100, 175, '#FFF') +
    f'''<rect x="145" y="60" width="80" height="110" fill="#ADD8E6" stroke="#87CEEB" stroke-width="2"/>
<rect x="130" y="140" width="10" height="30" fill="#999"/>
<circle cx="135" cy="155" r="12" fill="#ADD8E6" opacity="0.6"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">벽 페인트</text>''')

IMAGES['r146_03'] = lambda: svg_wrap(
    sky() + ground('#C4A882', 180) + person(100, 178, '#FF6347', hard_hat=True) +
    f'''<line x1="140" y1="140" x2="200" y2="140" stroke="#555" stroke-width="4"/>
<line x1="150" y1="140" x2="180" y2="170" stroke="#555" stroke-width="4"/>
<line x1="170" y1="140" x2="200" y2="170" stroke="#555" stroke-width="4"/>
<line x1="140" y1="170" x2="200" y2="170" stroke="#555" stroke-width="4"/>
<circle cx="165" cy="155" r="6" fill="#999"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">철근 묶기</text>''')

IMAGES['r146_04'] = lambda: svg_wrap(
    sky() + ground('#C4A882', 180) +
    f'''<rect x="60" y="60" width="8" height="130" fill="#999"/>
<rect x="220" y="60" width="8" height="130" fill="#999"/>
<rect x="60" y="80" width="170" height="8" fill="#8B4513"/>
<rect x="60" y="130" width="170" height="8" fill="#8B4513"/>''' +
    person(150, 178, '#FF6347', hard_hat=True) +
    f'''<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">비계 조립</text>''')

# ─── R147: ATM 인출 ──────────────────────────────────────────────────────────
IMAGES['r147_01'] = lambda: svg_wrap(indoor_bg('#E8E0D0', '#DDD') + person(80, 175, '#2563EB') +
    f'''<rect x="150" y="80" width="80" height="80" rx="5" fill="#CC6600"/>
<rect x="155" y="90" width="30" height="5" fill="#FFF"/>
<rect x="155" y="100" width="30" height="5" fill="#FFF"/>
<text x="190" y="145" text-anchor="middle" font-size="10" fill="white" font-weight="bold" font-family="Arial">POST</text>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">우체국 소포</text>''')

IMAGES['r147_02'] = lambda: svg_wrap(indoor_bg('#E0E0E0', '#CCC') + person(100, 175, '#2563EB') +
    f'''<rect x="155" y="70" width="70" height="100" rx="5" fill="#1a3a6b"/>
<rect x="162" y="80" width="56" height="35" fill="#4CAF50"/>
<text x="190" y="105" text-anchor="middle" font-size="10" fill="white" font-family="Arial">ATM</text>
<rect x="170" y="125" width="40" height="5" rx="2" fill="#CCC"/>
<rect x="170" y="135" width="40" height="5" rx="2" fill="#333"/>
<rect x="185" y="147" width="20" height="8" fill="#FFD700"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">ATM 인출</text>''')

IMAGES['r147_03'] = lambda: svg_wrap(indoor_bg('#F5F5F5', '#DDD') + person(80, 175, '#2563EB') +
    f'''<rect x="140" y="90" width="80" height="60" rx="5" fill="#FFF" stroke="#CCC"/>
<rect x="145" y="95" width="25" height="10" fill="#4CAF50"/>
<rect x="175" y="95" width="25" height="10" fill="#2196F3"/>
<rect x="145" y="110" width="25" height="10" fill="#FF9800"/>
<rect x="175" y="110" width="25" height="10" fill="#9C27B0"/>
<rect x="155" y="130" width="50" height="15" rx="3" fill="#CCC"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">편의점 구매</text>''')

IMAGES['r147_04'] = lambda: svg_wrap(indoor_bg('#FFF', '#E8E0D0') + person(80, 175, '#2563EB') +
    f'''<rect x="140" y="100" width="100" height="60" rx="3" fill="#FFF" stroke="#CCC" stroke-width="2"/>
<text x="190" y="125" text-anchor="middle" font-size="10" fill="#666" font-family="Arial">접수</text>
<rect x="145" y="135" width="40" height="8" fill="#EEE"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">병원 접수</text>''')

# ─── R148: 분리수거 ──────────────────────────────────────────────────────────
IMAGES['r148_01'] = lambda: svg_wrap(indoor_bg() + person(80, 175, '#2563EB') +
    f'''<path d="M150,110 L170,170 L130,170 Z" fill="#333" stroke="#666"/>
<rect x="135" y="100" width="30" height="12" fill="#333"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">쓰레기봉투</text>''')

IMAGES['r148_02'] = lambda: svg_wrap(indoor_bg() + person(80, 175, '#2563EB') +
    f'''<rect x="140" y="120" width="50" height="45" rx="5" fill="#8B6914"/>
<text x="165" y="150" text-anchor="middle" font-size="9" fill="white" font-family="Arial">음식물</text>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">음식물 쓰레기</text>''')

IMAGES['r148_03'] = lambda: svg_wrap(indoor_bg('#F0F0F0', '#DDD') + person(70, 175, '#2563EB') +
    f'''<rect x="120" y="100" width="35" height="65" rx="5" fill="#2196F3"/>
<text x="137" y="140" text-anchor="middle" font-size="8" fill="white" font-family="Arial">종이</text>
<rect x="160" y="100" width="35" height="65" rx="5" fill="#FF9800"/>
<text x="177" y="140" text-anchor="middle" font-size="7" fill="white" font-family="Arial">플라스틱</text>
<rect x="200" y="100" width="35" height="65" rx="5" fill="#4CAF50"/>
<text x="217" y="140" text-anchor="middle" font-size="8" fill="white" font-family="Arial">유리</text>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">분리수거</text>''')

IMAGES['r148_04'] = lambda: svg_wrap(
    '<rect x="0" y="0" width="300" height="250" fill="#E8E8E8"/><rect x="0" y="170" width="300" height="80" fill="#999"/>' +
    f'''<rect x="80" y="90" width="140" height="80" rx="5" fill="#4CAF50"/>
<circle cx="110" cy="180" r="15" fill="#333"/>
<circle cx="200" cy="180" r="15" fill="#333"/>
<rect x="85" y="95" width="50" height="30" fill="#ADD8E6" rx="2"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">청소차 대기</text>''')

# ─── R149: 의사 진찰 ─────────────────────────────────────────────────────────
IMAGES['r149_01'] = lambda: svg_wrap(indoor_bg('#FFF', '#E8E0D0') + person(80, 175, '#2563EB') +
    f'''<rect x="150" y="100" width="80" height="60" rx="5" fill="#FFF" stroke="#4CAF50" stroke-width="2"/>
<circle cx="165" cy="115" r="8" fill="#4CAF50"/>
<rect x="165" y="125" width="50" height="8" rx="2" fill="#EEE"/>
<rect x="165" y="137" width="50" height="8" rx="2" fill="#EEE"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">약국 구매</text>''')

IMAGES['r149_02'] = lambda: svg_wrap(indoor_bg('#FFF', '#E8E0D0') +
    f'''<rect x="100" y="110" width="100" height="50" rx="5" fill="#FFF" stroke="#CCC"/>
<circle cx="120" cy="125" r="8" fill="#CC0000"/>
<text x="125" y="128" text-anchor="middle" font-size="8" fill="white" font-family="Arial">+</text>''' +
    person(150, 175, '#2563EB') +
    f'''<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">응급실 이동</text>''')

IMAGES['r149_03'] = lambda: svg_wrap(indoor_bg('#FFF', '#E8E0D0') +
    # Doctor
    f'''<circle cx="180" cy="100" r="12" fill="#FDBCB4"/>
<rect x="170" y="112" width="20" height="30" rx="3" fill="white"/>
<circle cx="175" cy="90" r="7" fill="white" opacity="0.5"/>''' +
    # Patient
    person(100, 175, '#2563EB') +
    f'''<circle cx="200" cy="130" r="10" fill="#CCC"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">의사 진찰</text>''')

IMAGES['r149_04'] = lambda: svg_wrap(indoor_bg('#FFF', '#E8E0D0') + person(80, 175, '#2563EB') +
    f'''<rect x="130" y="130" width="60" height="30" fill="#999"/>
<rect x="200" y="130" width="60" height="30" fill="#999"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">병원 대기</text>''')

# ─── R150: 고용센터 서류 제출 ─────────────────────────────────────────────────
IMAGES['r150_01'] = lambda: svg_wrap(indoor_bg() + person(100, 175, '#2563EB') +
    f'''<rect x="155" y="90" width="60" height="80" rx="5" fill="#999"/>
<circle cx="185" cy="110" r="15" fill="#333"/>
<rect x="170" y="130" width="30" height="30" fill="#ADD8E6"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">여권사진 촬영</text>''')

IMAGES['r150_02'] = lambda: svg_wrap(indoor_bg('#E8E0D0', '#DDD') + person(80, 175, '#2563EB') +
    f'''<rect x="140" y="90" width="100" height="70" rx="5" fill="#FFF" stroke="#1a3a6b" stroke-width="2"/>
<text x="190" y="110" text-anchor="middle" font-size="9" fill="#1a3a6b" font-weight="bold" font-family="Arial">출입국</text>
<text x="190" y="125" text-anchor="middle" font-size="9" fill="#1a3a6b" font-weight="bold" font-family="Arial">관리사무소</text>
<rect x="155" y="135" width="70" height="15" rx="3" fill="#E8E0D0"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">출입국 등록</text>''')

IMAGES['r150_03'] = lambda: svg_wrap(indoor_bg('#E8E0D0', '#DDD') + person(80, 175, '#2563EB') +
    f'''<rect x="135" y="90" width="110" height="70" rx="5" fill="#FFF" stroke="#2196F3" stroke-width="2"/>
<text x="190" y="110" text-anchor="middle" font-size="9" fill="#2196F3" font-weight="bold" font-family="Arial">고용센터</text>
<rect x="145" y="120" width="90" height="10" fill="#E8E8E8"/>
<rect x="145" y="135" width="90" height="10" fill="#E8E8E8"/>
<rect x="100" y="140" width="30" height="40" fill="white" stroke="#CCC"/>
<text x="115" y="162" text-anchor="middle" font-size="7" fill="#999" font-family="Arial">신청서</text>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">고용센터 서류</text>''')

IMAGES['r150_04'] = lambda: svg_wrap(indoor_bg('#E8E0D0', '#DDD') + person(80, 175, '#2563EB') +
    f'''<rect x="150" y="90" width="80" height="60" rx="5" fill="#1a3a6b"/>
<text x="190" y="115" text-anchor="middle" font-size="10" fill="white" font-weight="bold" font-family="Arial">BANK</text>
<rect x="160" y="130" width="60" height="12" rx="3" fill="#FFD700"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">은행 통장</text>''')

# ─── R151: 드릴로 벽에 구멍 ───────────────────────────────────────────────────
IMAGES['r151_01'] = lambda: svg_wrap(indoor_bg() + person(100, 175, '#2563EB') +
    f'''<rect x="170" y="60" width="80" height="110" fill="#ADD8E6" stroke="#87CEEB" stroke-width="2"/>
<rect x="130" y="140" width="10" height="30" fill="#999"/>
<circle cx="135" cy="155" r="12" fill="#9ACD32"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">롤러 페인트</text>''')

IMAGES['r151_02'] = lambda: svg_wrap(indoor_bg() + person(100, 175, '#2563EB', hard_hat=True) +
    f'''<rect x="180" y="60" width="60" height="110" fill="#D2B48C"/>
<rect x="128" y="120" width="8" height="30" fill="#666"/>
<rect x="125" y="115" width="14" height="10" rx="3" fill="#FFD700"/>
<circle cx="200" cy="130" r="4" fill="#333"/>
<circle cx="200" cy="130" r="2" fill="#666"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">드릴 구멍</text>''')

IMAGES['r151_03'] = lambda: svg_wrap(indoor_bg() + person(100, 175, '#2563EB') +
    f'''<rect x="135" y="145" width="40" height="8" fill="#999"/>
<rect x="135" y="140" width="5" height="15" fill="#999"/>
<circle cx="165" cy="155" r="8" fill="#CCC" stroke="#999"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">스패너 조임</text>''')

IMAGES['r151_04'] = lambda: svg_wrap(indoor_bg() + person(100, 175, '#2563EB') +
    f'''<rect x="135" y="130" width="60" height="3" fill="#999"/>
<rect x="130" y="120" width="8" height="20" fill="#666"/>
<rect x="195" y="130" width="25" height="8" fill="#CCC" stroke="#999"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">쇠톱 절단</text>''')

# ═══════════════════════════════════════════════════════════════════════════════
# LISTENING QUESTIONS (L109-L120) — share many visuals with Reading
# ═══════════════════════════════════════════════════════════════════════════════

# L109 = same theme as R137 (tractor plowing)
IMAGES['l109_01'] = IMAGES['r137_01']
IMAGES['l109_02'] = IMAGES['r137_02']
IMAGES['l109_03'] = IMAGES['r137_03']
IMAGES['l109_04'] = IMAGES['r137_04']

# L110: 닭장 청소
IMAGES['l110_01'] = lambda: svg_wrap(farm_bg() + cow(170, 150) + person(70, 178, '#2563EB') +
    f'''<rect x="90" y="150" width="25" height="18" rx="3" fill="#D2691E"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">소 사료 주기</text>''')

IMAGES['l110_02'] = lambda: svg_wrap(farm_bg() +
    f'''<rect x="80" y="100" width="140" height="70" rx="3" fill="#D2B48C" stroke="#8B6914" stroke-width="2"/>
<rect x="130" y="100" width="40" height="50" fill="#8B6914"/>''' +
    chicken(110, 140) + chicken(170, 145) +
    person(60, 178, '#2563EB') +
    f'''<rect x="75" y="155" width="20" height="5" fill="#999"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">닭장 청소</text>''')

IMAGES['l110_03'] = lambda: svg_wrap(farm_bg() +
    f'''<ellipse cx="160" cy="145" rx="30" ry="20" fill="#FFB6C1" stroke="#333"/>
<circle cx="185" cy="135" r="10" fill="#FFB6C1" stroke="#333"/>
<circle cx="190" cy="132" r="2" fill="#333"/>''' +
    f'''<rect x="70" y="160" width="50" height="35" fill="#CCC" stroke="#999" stroke-width="2"/>
<text x="95" y="183" text-anchor="middle" font-size="14" fill="#333" font-family="Arial">kg</text>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">돼지 무게 재기</text>''')

IMAGES['l110_04'] = lambda: svg_wrap(farm_bg() + person(80, 178, '#2563EB', hard_hat=True) +
    f'''<rect x="140" y="100" width="100" height="70" rx="3" fill="#D2B48C" stroke="#8B6914" stroke-width="2"/>
<rect x="145" y="105" width="20" height="30" fill="#8B6914"/>
<rect x="170" y="135" width="30" height="20" fill="#999"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">축사 수리</text>''')

# L111: 갈퀴
def farm_tool(name, tool_svg):
    return lambda: svg_wrap(farm_bg() + tool_svg +
    f'''<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">{name}</text>''')

IMAGES['l111_01'] = farm_tool('괭이', f'''<line x1="150" y1="60" x2="150" y2="180" stroke="#8B6914" stroke-width="5"/>
<path d="M130,65 L150,60 L155,80 L135,75 Z" fill="#666"/>''')

IMAGES['l111_02'] = farm_tool('낫', f'''<line x1="150" y1="80" x2="150" y2="180" stroke="#8B6914" stroke-width="5"/>
<path d="M150,80 Q120,60 100,80 Q110,90 140,85 Z" fill="#999" stroke="#666"/>''')

IMAGES['l111_03'] = farm_tool('갈퀴', f'''<line x1="150" y1="60" x2="150" y2="180" stroke="#8B6914" stroke-width="5"/>
<rect x="125" y="55" width="50" height="8" fill="#8B6914"/>
<line x1="130" y1="63" x2="128" y2="85" stroke="#666" stroke-width="3"/>
<line x1="140" y1="63" x2="138" y2="85" stroke="#666" stroke-width="3"/>
<line x1="150" y1="63" x2="150" y2="85" stroke="#666" stroke-width="3"/>
<line x1="160" y1="63" x2="162" y2="85" stroke="#666" stroke-width="3"/>
<line x1="170" y1="63" x2="172" y2="85" stroke="#666" stroke-width="3"/>''')

IMAGES['l111_04'] = farm_tool('호미', f'''<line x1="150" y1="70" x2="150" y2="180" stroke="#8B6914" stroke-width="5"/>
<path d="M140,70 L160,65 L165,80 L140,75 Z" fill="#666"/>''')

# L112 = same theme as R143 (conveyor packaging)
IMAGES['l112_01'] = IMAGES['r143_01']
IMAGES['l112_02'] = IMAGES['r143_02']
IMAGES['l112_03'] = IMAGES['r142_03']
IMAGES['l112_04'] = lambda: svg_wrap(indoor_bg() + person(80, 175, '#2563EB') +
    f'''<rect x="140" y="100" width="80" height="50" fill="white" stroke="#333"/>
<line x1="160" y1="110" x2="200" y2="110" stroke="#999"/>
<line x1="160" y1="120" x2="200" y2="120" stroke="#999"/>
<line x1="160" y1="130" x2="200" y2="130" stroke="#999"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">도면 보기</text>''')

# L113 = pallet stacking
IMAGES['l113_01'] = IMAGES['r142_04']
IMAGES['l113_02'] = lambda: svg_wrap(indoor_bg() + person(80, 175, '#2563EB') + person(200, 175, '#FF6347') +
    pallet_boxes(130, 170) +
    f'''<rect x="135" y="118" width="16" height="25" fill="#C19A6B" stroke="#8B6914"/>
<rect x="155" y="118" width="16" height="25" fill="#C19A6B" stroke="#8B6914"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">팔레트 적재</text>''')
IMAGES['l113_03'] = IMAGES['r143_03']
IMAGES['l113_04'] = IMAGES['r143_01']

# L114 = welding safety gear
IMAGES['l114_01'] = lambda: svg_wrap(indoor_bg() + person(150, 175, '#2563EB') +
    f'''<circle cx="150" cy="100" r="15" fill="#FDBCB4"/>
<rect x="135" y="90" width="30" height="20" rx="5" fill="white"/>
<rect x="142" y="95" width="16" height="10" fill="#CCC"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">방진 마스크</text>''')

IMAGES['l114_02'] = lambda: svg_wrap(indoor_bg() + person(150, 175, '#2563EB', hard_hat=True) +
    f'''<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">안전모 착용</text>''')

IMAGES['l114_03'] = lambda: svg_wrap(indoor_bg() +
    f'''<circle cx="150" cy="105" r="15" fill="#FDBCB4"/>
<rect x="133" y="93" width="34" height="28" rx="5" fill="#333"/>
<rect x="140" y="100" width="20" height="10" fill="#1a1a1a" rx="2"/>
<rect x="140" y="118" width="20" height="30" rx="3" fill="#666"/>
<rect x="160" y="125" width="25" height="12" fill="#FFD700" rx="3"/>
<rect x="115" y="125" width="25" height="12" fill="#FFD700" rx="3"/>
<rect x="140" y="148" width="8" height="25" fill="#1E3A5F"/>
<rect x="152" y="148" width="8" height="25" fill="#1E3A5F"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">용접 보호구</text>''')

IMAGES['l114_04'] = lambda: svg_wrap(indoor_bg() + person(150, 175, '#2563EB') +
    f'''<rect x="137" y="95" width="26" height="12" rx="3" fill="#CCC" stroke="#999"/>
<rect x="141" y="97" width="18" height="8" fill="#ADD8E6"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">보안경 착용</text>''')

# L115 = bank (similar to R147)
IMAGES['l115_01'] = IMAGES['r147_01']
IMAGES['l115_02'] = lambda: svg_wrap(indoor_bg('#E0E0E0', '#CCC') + person(80, 175, '#2563EB') +
    f'''<rect x="140" y="70" width="110" height="80" rx="5" fill="#1a3a6b"/>
<text x="195" y="100" text-anchor="middle" font-size="12" fill="white" font-weight="bold" font-family="Arial">BANK</text>
<rect x="150" y="115" width="90" height="25" rx="3" fill="white"/>
<text x="195" y="133" text-anchor="middle" font-size="9" fill="#1a3a6b" font-family="Arial">해외 송금</text>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">은행 업무</text>''')
IMAGES['l115_03'] = IMAGES['r147_03']
IMAGES['l115_04'] = lambda: svg_wrap(indoor_bg('#E8E0D0', '#DDD') + person(80, 175, '#2563EB') +
    f'''<rect x="140" y="90" width="100" height="65" rx="5" fill="#FFF" stroke="#4CAF50" stroke-width="2"/>
<text x="190" y="115" text-anchor="middle" font-size="9" fill="#4CAF50" font-weight="bold" font-family="Arial">지원센터</text>
<rect x="145" y="125" width="90" height="20" rx="3" fill="#E8F5E9"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">지원센터 상담</text>''')

# L116: 만 이천 원 (12,000원 = correct)
IMAGES['l116_01'] = lambda: price_tag('11,000')
IMAGES['l116_02'] = lambda: price_tag('12,000')
IMAGES['l116_03'] = lambda: price_tag('20,000')
IMAGES['l116_04'] = lambda: price_tag('22,000')

# L117: 팔천오백 원 (8,500원 = correct)
IMAGES['l117_01'] = lambda: price_tag('7,500')
IMAGES['l117_02'] = lambda: price_tag('8,000')
IMAGES['l117_03'] = lambda: price_tag('8,500')
IMAGES['l117_04'] = lambda: price_tag('9,500')

# L118: 삼겹살 구워 먹기
def food_img(name, food_svg):
    bg = indoor_bg('#FFF5E6', '#E8D8C0')
    return lambda: svg_wrap(bg + f'''<ellipse cx="150" cy="130" rx="60" ry="40" fill="white" stroke="#CCC" stroke-width="2"/>''' + food_svg +
    f'''<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">{name}</text>''')

IMAGES['l118_01'] = food_img('냉면', f'''<path d="M120,120 Q130,140 150,130 Q170,140 180,120" stroke="#C19A6B" stroke-width="2" fill="none"/>
<path d="M125,125 Q140,145 155,130 Q170,145 175,125" stroke="#C19A6B" stroke-width="2" fill="none"/>
<ellipse cx="150" cy="115" rx="15" ry="5" fill="#8B6914"/>
<circle cx="140" cy="110" r="8" fill="#FF6347" opacity="0.7"/>''')

IMAGES['l118_02'] = food_img('비빔밥',
    f'''<circle cx="135" cy="115" r="10" fill="#FFD700"/>
<circle cx="165" cy="115" r="10" fill="#CC0000"/>
<ellipse cx="150" cy="135" rx="15" ry="8" fill="#228B22"/>
<circle cx="150" cy="118" r="6" fill="#FF6347"/>
<ellipse cx="145" cy="128" rx="12" ry="5" fill="white"/>''')

IMAGES['l118_03'] = food_img('삼겹살 굽기',
    f'''<rect x="115" y="110" width="70" height="8" fill="#999" rx="2"/>
<line x1="120" y1="118" x2="120" y2="150" stroke="#666" stroke-width="2"/>
<line x1="180" y1="118" x2="180" y2="150" stroke="#666" stroke-width="2"/>
<rect x="125" y="115" width="20" height="10" rx="2" fill="#D2691E"/>
<rect x="150" y="115" width="20" height="10" rx="2" fill="#C19A6B"/>
<path d="M135,110 Q137,100 139,110" stroke="#FF6600" stroke-width="1" fill="none" opacity="0.5"/>
<path d="M160,110 Q162,100 164,110" stroke="#FF6600" stroke-width="1" fill="none" opacity="0.5"/>''')

IMAGES['l118_04'] = food_img('라면',
    f'''<rect x="125" y="105" width="50" height="35" rx="5" fill="#FFD700" stroke="#FF6600" stroke-width="2"/>
<path d="M130,115 Q140,125 150,115 Q160,125 170,115" stroke="#C19A6B" stroke-width="2" fill="none"/>
<path d="M130,125 Q140,135 150,125 Q160,135 170,125" stroke="#C19A6B" stroke-width="2" fill="none"/>
<path d="M145,105 Q147,90 149,105" stroke="#CCC" stroke-width="1" fill="none"/>
<path d="M155,105 Q157,90 159,105" stroke="#CCC" stroke-width="1" fill="none"/>''')

# L119: 작업 일지 작성
IMAGES['l119_01'] = lambda: svg_wrap(indoor_bg() + person(80, 175, '#2563EB') +
    f'''<rect x="140" y="90" width="80" height="60" rx="5" fill="#333"/>
<rect x="145" y="95" width="70" height="45" fill="#4CAF50"/>
<rect x="150" y="100" width="30" height="5" fill="white"/>
<rect x="150" y="110" width="50" height="5" fill="white"/>
<rect x="150" y="120" width="40" height="5" fill="white"/>
<rect x="200" y="150" width="30" height="5" fill="white"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">보고서 출력</text>''')

IMAGES['l119_02'] = lambda: svg_wrap(indoor_bg() + person(100, 175, '#2563EB') +
    f'''<rect x="130" y="120" width="60" height="45" fill="white" stroke="#333" stroke-width="1.5"/>
<text x="160" y="135" text-anchor="middle" font-size="7" fill="#1a3a6b" font-weight="bold" font-family="Arial">작업 일지</text>
<line x1="135" y1="140" x2="185" y2="140" stroke="#CCC"/>
<line x1="135" y1="147" x2="175" y2="147" stroke="#CCC"/>
<line x1="135" y1="154" x2="180" y2="154" stroke="#CCC"/>
<line x1="120" y1="148" x2="138" y2="132" stroke="#2563EB" stroke-width="2"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">작업 일지 작성</text>''')

IMAGES['l119_03'] = lambda: svg_wrap(indoor_bg() + person(80, 175, '#2563EB') +
    f'''<rect x="150" y="100" width="70" height="50" rx="3" fill="white" stroke="#CCC"/>
<rect x="165" y="105" width="40" height="5" fill="#EEE"/>
<rect x="165" y="115" width="40" height="5" fill="#EEE"/>
<rect x="150" y="105" width="10" height="35" fill="#999"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">서류 복사</text>''')

IMAGES['l119_04'] = lambda: svg_wrap(indoor_bg() + person(130, 175, '#2563EB') +
    f'''<rect x="145" y="118" width="25" height="35" rx="5" fill="#333"/>
<rect x="148" y="122" width="19" height="25" fill="#4CAF50" rx="2"/>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">전화 받기</text>''')

# L120: 안전 표지
IMAGES['l120_01'] = lambda: svg_wrap('<rect width="300" height="250" fill="#f0f4f8" rx="8"/>' +
    safety_sign(150, 115, 'circle', '#CC0000',
        f'''<circle cx="150" cy="115" r="38" fill="white"/>
<line x1="120" y1="85" x2="180" y2="145" stroke="#CC0000" stroke-width="6"/>
<path d="M140,115 Q145,100 150,108 Q155,100 160,115 L155,115 Q150,108 145,115 Z" fill="#666" stroke="#333"/>
<path d="M143,115 Q145,125 150,120 Q155,125 157,115" fill="#FF6600" opacity="0.5"/>''') +
    f'''<text x="150" y="185" text-anchor="middle" font-size="12" fill="#CC0000" font-weight="bold" font-family="Arial">금연</text>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">금연 표지</text>''')

IMAGES['l120_02'] = lambda: svg_wrap('<rect width="300" height="250" fill="#f0f4f8" rx="8"/>' +
    safety_sign(150, 115, 'circle', '#0066CC',
        f'''<circle cx="150" cy="115" r="38" fill="white"/>
<ellipse cx="150" cy="95" rx="20" ry="10" fill="#FFD700" stroke="#CC9900" stroke-width="2"/>
<rect x="135" y="95" width="30" height="20" fill="#FFD700" stroke="#CC9900" stroke-width="2"/>''') +
    f'''<text x="150" y="185" text-anchor="middle" font-size="12" fill="#0066CC" font-weight="bold" font-family="Arial">안전모 착용</text>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">안전모 착용 표지</text>''')

IMAGES['l120_03'] = lambda: svg_wrap('<rect width="300" height="250" fill="#f0f4f8" rx="8"/>' +
    safety_sign(150, 115, 'circle', '#0066CC',
        f'''<circle cx="150" cy="115" r="38" fill="white"/>
<path d="M135,130 L135,110 Q135,100 145,100 L155,100 Q165,100 165,110 L165,130 Z" fill="#333" stroke="#1a1a1a"/>
<rect x="132" y="125" width="36" height="8" fill="#CCC" stroke="#999"/>''') +
    f'''<text x="150" y="185" text-anchor="middle" font-size="12" fill="#0066CC" font-weight="bold" font-family="Arial">안전화 착용</text>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">안전화 착용 표지</text>''')

IMAGES['l120_04'] = lambda: svg_wrap('<rect width="300" height="250" fill="#f0f4f8" rx="8"/>' +
    safety_sign(150, 115, 'circle', '#CC0000',
        f'''<circle cx="150" cy="115" r="38" fill="white"/>
<line x1="120" y1="85" x2="180" y2="145" stroke="#CC0000" stroke-width="6"/>
<path d="M140,100 L140,130 L160,130 L160,100 Z" fill="#333" opacity="0.5"/>
<path d="M145,130 L135,145 L165,145 L155,130 Z" fill="#333" opacity="0.5"/>''') +
    f'''<text x="150" y="185" text-anchor="middle" font-size="12" fill="#CC0000" font-weight="bold" font-family="Arial">출입 금지</text>
<text x="150" y="240" text-anchor="middle" font-size="11" fill="#333" font-family="Arial">출입 금지 표지</text>''')

# ═══════════════════════════════════════════════════════════════════════════════
# GENERATE ALL FILES
# ═══════════════════════════════════════════════════════════════════════════════

def main():
    count = 0
    for key, gen_fn in sorted(IMAGES.items()):
        path = os.path.join(OUT_DIR, f'{key}.svg')
        svg = gen_fn()
        with open(path, 'w', encoding='utf-8') as f:
            f.write(svg)
        count += 1

    print(f'✅ Generated {count} detailed SVG illustrations in {OUT_DIR}')

if __name__ == '__main__':
    main()
