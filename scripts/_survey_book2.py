import fitz, re

doc = fitz.open(r'c:\Users\Ny\Downloads\7. Laos Book 2.pdf')
print(f'Total pages: {len(doc)}')

for i, page in enumerate(doc):
    text = page.get_text()
    imgs = page.get_images()
    has_sy = ('유의어' in text) or ('반의어' in text)
    has_imgs = len(imgs) >= 4
    if has_sy or has_imgs:
        preview = text[:100].replace('\n', ' ')
        print(f'p{i+1}: imgs={len(imgs)}, sy={has_sy}, text={preview}')
