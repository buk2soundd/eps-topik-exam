/**
 * Conversation TTS Utility
 * Parses Korean dialogue scripts into speaker segments and speaks them
 * with distinct voices (male / female) for a natural conversation feel.
 */

// ─── Script Parser ────────────────────────────────────────────────────────────
export function parseConversationScript(script) {
  if (!script) return [];
  const SPEAKERS = ['남자', '여자', '안내 방송', '방송'];
  const pattern = new RegExp(`(${SPEAKERS.join('|')}):\\s*`, 'g');
  const matches = [...script.matchAll(pattern)];

  if (matches.length === 0) {
    return [{ speaker: '방송', text: script.trim() }];
  }

  return matches
    .map((m, i) => {
      const nextIndex = matches[i + 1]?.index ?? script.length;
      const text = script.slice(m.index + m[0].length, nextIndex).trim();
      const rawSpeaker = m[1];
      const speaker = rawSpeaker === '안내 방송' ? '방송' : rawSpeaker;
      return { speaker, text };
    })
    .filter((s) => s.text.length > 0);
}

// ─── Voice Picker ─────────────────────────────────────────────────────────────
let _voiceCache = null;

/** Score a voice by naturalness — prefer Google/Neural/Online voices */
function qualityScore(v) {
  let s = 0;
  if (/google/i.test(v.name))           s += 8;
  if (/natural|neural/i.test(v.name))   s += 6;
  if (/online|network/i.test(v.name))   s += 4;
  if (/premium/i.test(v.name))          s += 3;
  if (!v.localService)                  s += 2; // cloud = higher quality
  return s;
}

/** Known male voice name keywords for Korean TTS */
const MALE_KW = /male|남자|남성|man\b|guy|hyunsu|인준|준호|junho|injoon|minjun|hemin|인식|남|seojun|jun\b/i;
/** Known female voice name keywords */
const FEMALE_KW = /female|여자|여성|woman|girl|yuna|유나|seoyeon|서연|narae|나래|sora|소라|jiyun|지윤|heami|hana/i;

function pickVoices(voices) {
  // Collect Korean voices, fall back to all voices if none found
  let ko = voices.filter((v) => v.lang.startsWith('ko'));
  if (ko.length === 0) ko = voices; // last-resort: any voice with ko-KR lang at utterance level

  if (ko.length === 0) return { male: null, female: null, distinct: false };

  // Sort by quality descending
  const sorted = [...ko].sort((a, b) => qualityScore(b) - qualityScore(a));

  // Debug: show all available Korean voices
  console.log('[TTS] Available Korean voices:', sorted.map((v) => `${v.name} (${v.lang})`));

  // Find the best female voice
  const femaleV =
    sorted.find((v) => FEMALE_KW.test(v.name)) ||
    sorted[0];

  // Find the best male voice (must be different from femaleV)
  const maleV =
    sorted.find((v) => MALE_KW.test(v.name)) ||
    sorted.find((v) => v !== femaleV) ||
    femaleV; // same voice as last resort

  const distinct = maleV !== femaleV;
  console.log(`[TTS] Selected → Male: "${maleV?.name}" | Female: "${femaleV?.name}" | Distinct: ${distinct}`);

  return { male: maleV, female: femaleV, distinct };
}

/**
 * Synchronous getter (returns cache or loads immediately).
 * Use loadKoreanVoices() for guaranteed async load.
 */
export function getKoreanVoices() {
  if (!window.speechSynthesis) return { male: null, female: null, distinct: false };
  if (_voiceCache) return _voiceCache;
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    _voiceCache = pickVoices(voices);
    return _voiceCache;
  }
  return { male: null, female: null, distinct: false };
}

/**
 * Async loader — waits for browser to finish loading voices.
 * Should be called once on app start (e.g. after user gesture).
 * Returns a Promise<{male, female, distinct}>.
 */
export function loadKoreanVoices() {
  return new Promise((resolve) => {
    if (!window.speechSynthesis) {
      resolve({ male: null, female: null, distinct: false });
      return;
    }
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      _voiceCache = pickVoices(voices);
      resolve(_voiceCache);
      return;
    }
    // Voices haven't loaded yet — wait for the event
    const onChanged = () => {
      window.speechSynthesis.removeEventListener('voiceschanged', onChanged);
      _voiceCache = pickVoices(window.speechSynthesis.getVoices());
      resolve(_voiceCache);
    };
    window.speechSynthesis.addEventListener('voiceschanged', onChanged);
    // Timeout fallback (3 s) in case event never fires
    setTimeout(() => {
      window.speechSynthesis.removeEventListener('voiceschanged', onChanged);
      _voiceCache = pickVoices(window.speechSynthesis.getVoices());
      resolve(_voiceCache);
    }, 3000);
  });
}

// Reset cache when voices list changes
if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.addEventListener('voiceschanged', () => {
    _voiceCache = null;
  });
}

// ─── Utterance Builder ────────────────────────────────────────────────────────
function buildUtterance(text, speaker, voicePair) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'ko-KR';

  const isMale = speaker === '남자';
  const isBroadcast = speaker === '방송';

  if (voicePair.distinct) {
    // Two different real voices — use them, tune rate for naturalness
    utter.voice = isMale ? voicePair.male : voicePair.female;
    utter.pitch = 1.0;
    utter.rate  = isBroadcast ? 0.87 : isMale ? 0.85 : 0.92;
  } else {
    // Single voice — differentiate with pitch & rate (moderate values for naturalness)
    const base = voicePair.female ?? voicePair.male;
    utter.voice = base;
    if (isMale) {
      utter.pitch = 0.70;  // lower but not extreme
      utter.rate  = 0.82;
    } else if (isBroadcast) {
      utter.pitch = 1.00;
      utter.rate  = 0.87;
    } else {
      utter.pitch = 1.20;  // somewhat higher, not robotic
      utter.rate  = 0.93;
    }
  }

  return utter;
}

// ─── Conversation Speaker ─────────────────────────────────────────────────────
/**
 * Speak a full conversation (array of {speaker, text} segments) in order.
 *
 * @param {Array}    segments        - [{speaker, text}, ...]
 * @param {Object}   voicePair       - {male, female, distinct}
 * @param {Function} onSegmentStart  - called with (speaker, segmentIndex) when each line starts
 * @param {Function} onComplete      - called when all segments finish
 * @param {Object}   refs            - {safariResumeRef} for iOS workarounds
 */
export function speakConversation(segments, voicePair, onSegmentStart, onComplete, refs = {}) {
  if (!window.speechSynthesis || segments.length === 0) {
    onComplete();
    return;
  }

  let idx = 0;
  let cancelled = false;
  const GAP_MS = 350; // pause between speakers (ms)

  // iOS Safari: resume if paused silently
  if (refs.safariResumeRef) {
    if (refs.safariResumeRef.current) clearInterval(refs.safariResumeRef.current);
    refs.safariResumeRef.current = setInterval(() => {
      if (window.speechSynthesis.paused) window.speechSynthesis.resume();
    }, 5000);
  }

  // iOS: resume on tab-visible
  const handleVisibility = () => {
    if (document.visibilityState === 'visible' && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  };
  document.addEventListener('visibilitychange', handleVisibility);

  function cleanup() {
    document.removeEventListener('visibilitychange', handleVisibility);
    if (refs.safariResumeRef?.current) {
      clearInterval(refs.safariResumeRef.current);
      refs.safariResumeRef.current = null;
    }
  }

  function speakNext() {
    if (cancelled || idx >= segments.length) {
      cleanup();
      if (!cancelled) onComplete();
      return;
    }

    const seg = segments[idx];
    const utter = buildUtterance(seg.text, seg.speaker, voicePair);

    onSegmentStart(seg.speaker, idx);
    idx++;

    // Safari onend fallback — estimated duration + 3s buffer
    const estimatedMs = Math.max((seg.text.length / 4) * (1000 / 0.87), 3000) + 3000;
    let fired = false;

    const fallback = setTimeout(() => {
      if (!fired) { fired = true; window.speechSynthesis.cancel(); setTimeout(speakNext, GAP_MS); }
    }, estimatedMs);

    utter.onend = () => {
      if (!fired) { fired = true; clearTimeout(fallback); setTimeout(speakNext, GAP_MS); }
    };

    utter.onerror = (e) => {
      if (e?.error === 'interrupted') return; // cancelled between segments — safe to ignore
      if (!fired) { fired = true; clearTimeout(fallback); setTimeout(speakNext, GAP_MS); }
    };

    window.speechSynthesis.speak(utter);
  }

  // Safari: cancel any lingering speech before starting
  window.speechSynthesis.cancel();
  setTimeout(speakNext, 100);

  // Return cancel function
  return () => {
    cancelled = true;
    cleanup();
    window.speechSynthesis.cancel();
  };
}
