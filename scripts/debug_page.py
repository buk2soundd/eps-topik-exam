import fitz, re, sys
sys.stdout.reconfigure(encoding='utf-8')

doc = fitz.open(r'c:\Users\Ny\Downloads\Documents\7. Laos Book 2.pdf')
pg = doc[319]  # page 320, ch55
text = pg.get_text()

# Find the bracket pattern and show its hex codes
for m in re.finditer(r'\[\d+.+?\d+\]', text):
    s = m.group()
    print('Found:', s)
    print('Hex:', ' '.join(f'{ord(c):04x}' for c in s))
    break

# Show lines with [ ] that contain ~
for line in text.split('\n'):
    if '[' in line and ']' in line and any(c in line for c in '~～〜'):
        print('LINE:', repr(line))

# Show first 30 chars after [
idx = text.find('[1')
if idx >= 0:
    snippet = text[idx:idx+30]
    print('Snippet:', repr(snippet))
    print('Hex:', ' '.join(f'{ord(c):04x}' for c in snippet))
