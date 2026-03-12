import fitz, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

doc = fitz.open(r'c:\Users\Ny\Downloads\7. Laos Book 2.pdf')

# Page 3 has 유의어/반의어
print('=== PAGE 3 (full) ===')
print(doc[2].get_text())
print()

# Check the inline chapter vocab pages we identified
pages_to_check = [143, 146, 155, 158, 167, 170, 179, 182, 191, 194]
for pg in pages_to_check:
    print(f'=== PAGE {pg} ===')
    print(doc[pg-1].get_text()[:600])
    print()
