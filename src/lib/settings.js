/**
 * Runtime settings — stored in localStorage, editable via Admin Panel.
 * Provides runtime overrides for exam config without needing a rebuild.
 */

const KEY = 'eps_settings';

export const SETTING_DEFAULTS = {
  durationSec:       2400,   // 40 minutes exam timer
  passScore:         120,    // minimum passing score out of 200
  blockDuplicates:   true,   // prevent same name from re-submitting
  apiBase:           '/api', // PHP API folder path (relative or absolute URL)
  apiSecret:         '',     // must match API_SECRET in api/config.php
};

export function getSettings() {
  try {
    const stored = JSON.parse(localStorage.getItem(KEY) || '{}');
    return { ...SETTING_DEFAULTS, ...stored };
  } catch {
    return { ...SETTING_DEFAULTS };
  }
}

export function saveSettings(partial) {
  const current = getSettings();
  localStorage.setItem(KEY, JSON.stringify({ ...current, ...partial }));
}

export function resetSettings() {
  localStorage.removeItem(KEY);
}
