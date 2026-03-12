"""
screenshot_pages.py
────────────────────────────────────────────────────────────────────────────────
Auto-captures EPS-TOPIK ebook pages by opening Chrome and taking screenshots.
Does NOT use puppeteer/CDP — just Win32 screen capture via PIL.

Requirements:
  pip install Pillow pyautogui pygetwindow

Usage:
  python scripts/screenshot_pages.py --book=1 --start=1 --end=50
  python scripts/screenshot_pages.py --book=1          # all pages
  python scripts/screenshot_pages.py --book=1 --page=45

Output:
  public/images/book1_p001.jpg, book1_p002.jpg, ...
"""

import argparse
import subprocess
import sys
import time
import os
import re

# ── Dependency check ──────────────────────────────────────────────────────────
def ensure_deps():
    try:
        import PIL
        import pyautogui
    except ImportError:
        print("Installing required packages...")
        subprocess.check_call([sys.executable, "-m", "pip", "install",
                               "Pillow", "pyautogui", "pygetwindow", "--quiet"])
        print("Done.")

ensure_deps()

from PIL import ImageGrab
import pyautogui

# ── Config ────────────────────────────────────────────────────────────────────
BOOK_URLS = {
    1: "https://epstopik.hrdkorea.or.kr/epstopik/ebook/Laos_1_j/index.html",
    2: "https://epstopik.hrdkorea.or.kr/epstopik/ebook/Laos_2_j/index.html",
}

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUT_DIR    = os.path.join(SCRIPT_DIR, "..", "public", "images")

# Wait times (seconds)
LOAD_WAIT     = 8    # wait for ebook to load after opening
PAGE_WAIT     = 1.5  # wait after page turn for render

# ── CLI args ──────────────────────────────────────────────────────────────────
parser = argparse.ArgumentParser()
parser.add_argument("--book",  type=int, default=1, help="1 or 2")
parser.add_argument("--start", type=int, default=1, help="First page number")
parser.add_argument("--end",   type=int, default=387, help="Last page number")
parser.add_argument("--page",  type=int, default=None, help="Single page (overrides start/end)")
parser.add_argument("--crop",  type=str, default=None,
    help="Manual crop box: left,top,right,bottom in pixels (e.g. 300,80,980,720)")
args = parser.parse_args()

book_url  = BOOK_URLS.get(args.book, BOOK_URLS[1])
page_start = args.page if args.page else args.start
page_end   = args.page if args.page else args.end

os.makedirs(OUT_DIR, exist_ok=True)

# ── Helper functions ──────────────────────────────────────────────────────────
def find_chrome():
    candidates = [
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
        os.path.expanduser(r"~\AppData\Local\Google\Chrome\Application\chrome.exe"),
    ]
    for path in candidates:
        if os.path.exists(path):
            return path
    return "chrome"   # Try PATH

def open_browser(url):
    chrome = find_chrome()
    print(f"Opening: {url}")
    # Open in a new window (not existing) with kiosk-like size
    cmd = [chrome, "--new-window", "--start-maximized",
           "--disable-features=TranslateUI", url]
    subprocess.Popen(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print(f"Waiting {LOAD_WAIT}s for page to load...")
    time.sleep(LOAD_WAIT)

def take_screenshot():
    """Capture the entire screen."""
    return ImageGrab.grab()

def auto_crop(img):
    """
    Attempt to auto-detect page content area.
    Looks for the main white-ish flipbook page area in the center.
    Falls back to center third of screen if detection fails.
    """
    w, h = img.size
    # Default: center region, skip browser chrome (~80px top, ~40px bottom)
    left  = w // 3          # right page of spread starts at ~1/3
    top   = 80
    right = w * 2 // 3      # right page ends at ~2/3
    bottom = h - 40
    return img.crop((left, top, right, bottom))

def nav_to_page(target_page, current_page):
    """Navigate to target page using URL fragment or keyboard."""
    diff = target_page - current_page
    if abs(diff) > 5:
        # Use pyautogui to type the page number in chrome address bar
        # (faster than pressing arrow key many times)
        new_url = book_url + f"#page={target_page}"
        pyautogui.hotkey("ctrl", "l")
        time.sleep(0.3)
        pyautogui.hotkey("ctrl", "a")
        pyautogui.typewrite(new_url, interval=0.03)
        pyautogui.press("enter")
        time.sleep(PAGE_WAIT + 0.5)
    elif diff > 0:
        for _ in range(diff):
            pyautogui.press("right")
            time.sleep(0.2)
        time.sleep(PAGE_WAIT)
    elif diff < 0:
        for _ in range(-diff):
            pyautogui.press("left")
            time.sleep(0.2)
        time.sleep(PAGE_WAIT)

# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    custom_crop = None
    if args.crop:
        parts = [int(x.strip()) for x in args.crop.split(",")]
        if len(parts) == 4:
            custom_crop = tuple(parts)
            print(f"Using custom crop: {custom_crop}")

    open_browser(book_url)

    print("\nIMPORTANT: Make sure the Chrome window with the ebook is MAXIMIZED")
    print("and the ebook flipbook is fully visible.")
    print("Press Enter when ready to start capturing...")
    input()

    saved = 0
    current = 1

    for page_num in range(page_start, page_end + 1):
        out_file = os.path.join(OUT_DIR, f"book{args.book}_p{page_num:03d}.jpg")
        if os.path.exists(out_file):
            print(f"  [skip] p{page_num}")
            current = page_num
            continue

        nav_to_page(page_num, current)
        current = page_num

        # Capture screen
        img = take_screenshot()

        if custom_crop:
            cropped = img.crop(custom_crop)
        else:
            cropped = auto_crop(img)

        cropped.save(out_file, "JPEG", quality=92)
        saved += 1
        print(f"  saved p{page_num}  ({cropped.size[0]}x{cropped.size[1]})")

    print(f"\nDone. {saved} pages captured.")
    print(f"Images saved to: {os.path.abspath(OUT_DIR)}")
    print()
    print("TIP: First run with --page=1 to check crop. Then adjust --crop if needed.")
    print('Example: python scripts/screenshot_pages.py --book=1 --page=1 --crop="320,90,980,730"')

if __name__ == "__main__":
    main()
