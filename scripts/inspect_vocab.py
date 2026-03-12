# -*- coding: utf-8 -*-
import fitz, sys, os
sys.stdout.reconfigure(encoding='utf-8')

PDF = r'c:\Users\Ny\Downloads\Documents\7. Laos Book 2.pdf'
doc = fitz.open(PDF)

page_num = 23
page = doc[page_num-1]
imgs = page.get_images(full=True)
print(f'Page {page_num} has {len(imgs)} images')
for i, img in enumerate(imgs[:6]):
    xref = img[0]
    base = doc.extract_image(xref)
    w, h = base['width'], base['height']
    ext = base['ext']
    print(f'  img {i}: {w}x{h} .{ext}')

print()
print('Blocks (image + text positions):')
for blk in page.get_text('dict')['blocks'][:15]:
    if blk['type'] == 1:
        x0,y0,x1,y1 = blk['bbox']
        print(f'  IMG at ({x0:.0f},{y0:.0f}) -> ({x1:.0f},{y1:.0f})')
    else:
        lines = []
        for ln in blk['lines']:
            for s in ln['spans']:
                lines.append(s['text'])
        text = ' '.join(lines)[:80]
        x0,y0 = blk['bbox'][0], blk['bbox'][1]
        print(f'  TXT at ({x0:.0f},{y0:.0f}): {text}')

doc.close()
