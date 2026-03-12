# -*- coding: utf-8 -*-
"""Scan Book 1 for vocab pages with images."""
import fitz, sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

PDF = r'C:\Users\Ny\Downloads\7. Laos Book 1.pdf'
doc = fitz.open(PDF)
n = len(doc)
print(f'Book 1: {n} pages')

vocab_pages = []
for pn in range(1, n + 1):
    page = doc[pn - 1]
    text = page.get_text()
    if '어휘' in text or '단어' in text:
        imgs = page.get_images(full=True)
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
            first_line = text.strip()[:100].replace('\n', ' ')
            vocab_pages.append((pn, vocab_imgs, first_line))

doc.close()

print(f'\nVocab pages with images: {len(vocab_pages)}')
for pn, ni, preview in vocab_pages:
    print(f'  Page {pn}: {ni} images | {preview[:80]}')
