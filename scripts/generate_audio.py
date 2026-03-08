"""
EPS-TOPIK Listening Audio Generator
Uses Microsoft Edge TTS (edge-tts) to generate high-quality Korean MP3 files.

Voices:
  남자  → ko-KR-InJoonNeural   (natural male)
  여자  → ko-KR-SunHiNeural    (natural female)
  방송  → ko-KR-SunHiNeural    (female broadcast style)

Setup:
  pip install edge-tts

Usage:
  1. node scripts/export_audio_scripts.mjs   ← run this first
  2. python scripts/generate_audio.py
"""

import asyncio
import json
import os
import re
import sys
import tempfile

# ─── Install edge-tts if missing ─────────────────────────────────────────────
try:
    import edge_tts
except ImportError:
    print("📦 edge-tts not found. Installing...")
    os.system(f'"{sys.executable}" -m pip install edge-tts')
    import edge_tts

# ─── Voice map ────────────────────────────────────────────────────────────────
VOICES = {
    '남자':      'ko-KR-InJoonNeural',   # Natural male Korean
    '여자':      'ko-KR-SunHiNeural',    # Natural female Korean
    '방송':      'ko-KR-SunHiNeural',    # Broadcast (female)
    '안내 방송': 'ko-KR-SunHiNeural',    # Announcement
}
DEFAULT_VOICE = 'ko-KR-SunHiNeural'

# Speech rate adjustments
RATE = {
    '남자':      '-5%',   # slightly slower for clarity
    '여자':      '+0%',
    '방송':      '-8%',   # broadcast is slower and clear
    '안내 방송': '-8%',
}

# Silence gap between speakers (milliseconds)
SILENCE_MS = 500


# ─── Script parser ────────────────────────────────────────────────────────────
def parse_script(script: str) -> list[tuple[str, str]]:
    """
    Parse '남자: text 여자: text' → [(speaker, text), ...]
    Falls back to single broadcast segment if no labels found.
    """
    speakers = ['안내 방송', '남자', '여자', '방송']  # '안내 방송' must come first (longer match)
    pattern = re.compile(r'(' + '|'.join(re.escape(s) for s in speakers) + r'):\s*')
    matches = list(pattern.finditer(script))

    if not matches:
        return [('방송', script.strip())]

    segments = []
    for i, m in enumerate(matches):
        end = matches[i + 1].start() if i + 1 < len(matches) else len(script)
        text = script[m.end():end].strip()
        if text:
            segments.append((m.group(1), text))
    return segments


# ─── Minimal silent MP3 frame (MPEG1 Layer3, 128kbps, 44.1kHz stereo) ─────────
# Each frame ≈ 26ms. We concatenate N frames to fill the desired gap.
_SILENT_MP3_FRAME = bytes([
    0xFF, 0xFB, 0x90, 0x00,  # MPEG1, Layer3, 128kbps, 44100Hz, stereo
    *([0x00] * 413),          # zero payload = silence
    0x00,                     # padding
])


def make_silence(ms: int) -> bytes:
    frames = max(1, int(ms / 26))
    return _SILENT_MP3_FRAME * frames


# ─── Core TTS generation ──────────────────────────────────────────────────────
async def tts_to_bytes(text: str, speaker: str) -> bytes:
    """Generate TTS audio for one segment and return raw MP3 bytes."""
    voice = VOICES.get(speaker, DEFAULT_VOICE)
    rate  = RATE.get(speaker, '+0%')
    communicate = edge_tts.Communicate(text, voice, rate=rate)

    audio_data = b''
    async for chunk in communicate.stream():
        if chunk['type'] == 'audio':
            audio_data += chunk['data']
    return audio_data


async def generate_question(bank_id: str, script: str, output_dir: str) -> None:
    """Generate combined MP3 for one listening question."""
    out_path = os.path.join(output_dir, f'{bank_id}.mp3')

    # Skip if already generated (remove file to regenerate)
    if os.path.exists(out_path):
        print(f'  ⏭  {bank_id}: already exists — skipping')
        return

    segments = parse_script(script)
    pieces: list[bytes] = []

    for i, (speaker, text) in enumerate(segments):
        audio = await tts_to_bytes(text, speaker)
        pieces.append(audio)
        if i < len(segments) - 1:
            pieces.append(make_silence(SILENCE_MS))

    combined = b''.join(pieces)
    with open(out_path, 'wb') as f:
        f.write(combined)

    speakers_str = ' → '.join(sp for sp, _ in segments)
    size_kb = len(combined) // 1024
    print(f'  ✅ {bank_id}: {len(segments)} segment(s) [{speakers_str}] — {size_kb} KB')


# ─── Main ─────────────────────────────────────────────────────────────────────
async def main():
    script_dir   = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    output_dir   = os.path.join(project_root, 'public', 'audio')
    os.makedirs(output_dir, exist_ok=True)

    # ── Load base scripts (exported from examData.js) ────────────────────────
    base_path = os.path.join(script_dir, 'audio_scripts.json')
    if not os.path.exists(base_path):
        print('❌ audio_scripts.json not found.')
        print('   Run first:  node scripts/export_audio_scripts.mjs')
        sys.exit(1)
    with open(base_path, encoding='utf-8') as f:
        scripts = json.load(f)

    # ── Load custom scripts (exported from Admin Panel) ───────────────────────
    custom_path = os.path.join(script_dir, 'custom_audio_scripts.json')
    if os.path.exists(custom_path):
        with open(custom_path, encoding='utf-8') as f:
            custom_scripts = json.load(f)
        # Merge: custom overrides base if same bankId
        base_ids = {s['bankId'] for s in scripts}
        added = [s for s in custom_scripts if s['bankId'] not in base_ids]
        overridden = [s for s in custom_scripts if s['bankId'] in base_ids]
        # Replace overridden entries
        if overridden:
            ov_map = {s['bankId']: s for s in overridden}
            scripts = [ov_map.get(s['bankId'], s) for s in scripts]
            print(f'✏️  {len(overridden)} base question(s) overridden by admin edits')
        if added:
            scripts.extend(added)
            print(f'➕  {len(added)} custom question(s) added from admin panel')
    else:
        print('ℹ️  custom_audio_scripts.json not found — generating base questions only')
        print('   (ถ้าต้องการ generate ข้อสอบ admin: กด "Export MP3" ใน Admin Panel → บันทึกเป็น scripts/custom_audio_scripts.json)\n')

    print(f'\n🎙  Generating {len(scripts)} Korean audio files')
    print(f'📁  Output: {output_dir}')
    print(f'🎤  Voices: InJoon (남자) | SunHi (여자/방송)\n')

    for item in scripts:
        try:
            await generate_question(item['bankId'], item['audioScript'], output_dir)
        except Exception as exc:
            print(f'  ❌ {item["bankId"]}: {exc}')

    mp3_files = [f for f in os.listdir(output_dir) if f.endswith('.mp3')]
    print(f'\n🎉 Done! {len(mp3_files)} MP3 files in public/audio/')


if __name__ == '__main__':
    asyncio.run(main())
