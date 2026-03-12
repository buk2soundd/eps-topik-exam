# -*- coding: utf-8 -*-
"""
Inspect vocab pages — auto-detect chapter from page text, show image positions.
"""
import fitz, sys, re
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

PDF = r'c:\Users\Ny\Downloads\Documents\7. Laos Book 2.pdf'
doc = fitz.open(PDF)

TARGET_PAGES = [23, 26, 35, 38, 47, 50, 59, 62, 71, 74, 83, 86, 95, 98, 104, 107, 110, 116, 119, 122, 131, 134]

for pn in TARGET_PAGES:
    page = doc[pn-1]
    page_h = page.rect.height
    blocks = page.get_text('dict')['blocks']

    # Find page title (first few text lines)
    first_texts = []
    for b in blocks[:4]:
        if b['type'] == 0:
            lines = [''.join(s['text'] for s in ln['spans']) for ln in b['lines']]
            first_texts.append(' '.join(lines)[:80])

    img_blocks = [b for b in blocks if b['type'] == 1]
    vocab_imgs = [b for b in img_blocks if
                  30 < (b['bbox'][2]-b['bbox'][0]) < 200 and
                  30 < (b['bbox'][3]-b['bbox'][1]) < 200 and
                  b['bbox'][1] > 80 and b['bbox'][3] < page_h - 60]

    print(f'\nPage {pn}: {len(vocab_imgs)} vocab-sized images')
    print(f'  Title: {first_texts[0] if first_texts else "?"}')
    
    # Show first few image→text pairs
    txt_blocks = [b for b in blocks if b['type'] == 0]
    count = 0
    for img in vocab_imgs[:3]:
        ix0, iy0, ix1, iy1 = img['bbox']
        ix_center = (ix0 + ix1) / 2
        # Find nearest text below
        best = None; best_dy = 9999
        for tb in txt_blocks:
            tx0, ty0, tx1, ty1 = tb['bbox']
            tc = (tx0 + tx1) / 2
            dy = ty0 - iy1
            dx = abs(tc - ix_center)
            if 0 <= dy <= 150 and dx < 120 and dy < best_dy:
                best_dy = dy
                best = tb
        word = ''
        if best:
            word = ' '.join(''.join(s['text'] for s in ln['spans']) for ln in best['lines'])[:60]
        print(f'    img({ix0:.0f},{iy0:.0f}-{ix1:.0f},{iy1:.0f}) dy={best_dy:.0f} -> "{word}"')
        count += 1

doc.close()
