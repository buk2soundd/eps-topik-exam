# -*- coding: utf-8 -*-
"""Scan Book 2 pages 135-392 for 어휘/단어 vocab sections with images."""
import fitz, sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

PDF = r'c:\Users\Ny\Downloads\Documents\7. Laos Book 2.pdf'
doc = fitz.open(PDF)
n = len(doc)

vocab_pages = []
for pn in range(135, n + 1):
    page = doc[pn - 1]
    text = page.get_text()
    if '어휘' in text or '단어' in text:
        imgs = page.get_images(full=True)
        # Count medium-sized images (vocab images)
        vocab_imgs = 0
        for img in imgs:
            xref = img[0]
            try:
                base = doc.extract_image(xref)
                w, h = base['width'], base['height']
                if 30 < w < 300 and 30 < h < 300:
                    vocab_imgs += 1
            except:
                pass
        if vocab_imgs >= 3:
            # Get first line to see what chapter
            first_line = text.strip()[:80]
            vocab_pages.append((pn, vocab_imgs, first_line))

doc.close()

print(f'Vocab pages found (pages 135-{n}):')
for pn, ni, preview in vocab_pages:
    print(f'  Page {pn}: {ni} vocab images | {preview[:60]}')
print(f'\nTotal: {len(vocab_pages)} pages')
