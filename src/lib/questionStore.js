/**
 * Question Store — localStorage CRUD for the Admin Question Manager
 *
 * Two separate stores:
 *   eps_q_overrides  — Map of { bankId: { field overrides } } for base questions
 *   eps_q_custom     — Array of fully custom questions created by admin
 */

const OVERRIDE_KEY = 'eps_q_overrides';
const CUSTOM_KEY   = 'eps_q_custom';

// ─── Overrides (edits to base questions) ─────────────────────────────────────

export function getOverrides() {
  try { return JSON.parse(localStorage.getItem(OVERRIDE_KEY) || '{}'); }
  catch { return {}; }
}

export function saveOverride(bankId, fields) {
  const ov = getOverrides();
  ov[bankId] = { ...ov[bankId], ...fields };
  localStorage.setItem(OVERRIDE_KEY, JSON.stringify(ov));
}

export function clearOverride(bankId) {
  const ov = getOverrides();
  delete ov[bankId];
  localStorage.setItem(OVERRIDE_KEY, JSON.stringify(ov));
}

/** Merge overrides into a list of questions (non-destructive). */
export function applyOverrides(questions) {
  const ov = getOverrides();
  return questions.map((q) =>
    ov[q.bankId] ? { ...q, ...ov[q.bankId], _edited: true } : q
  );
}

// ─── Custom questions (created by admin) ─────────────────────────────────────

export function getCustomQuestions() {
  try { return JSON.parse(localStorage.getItem(CUSTOM_KEY) || '[]'); }
  catch { return []; }
}

export function addCustomQuestion(q) {
  const list = getCustomQuestions();
  const custom = { ...q, bankId: `C${Date.now()}`, _custom: true };
  list.push(custom);
  localStorage.setItem(CUSTOM_KEY, JSON.stringify(list));
  return custom;
}

export function updateCustomQuestion(bankId, fields) {
  const list = getCustomQuestions();
  const idx = list.findIndex((q) => q.bankId === bankId);
  if (idx >= 0) {
    list[idx] = { ...list[idx], ...fields };
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(list));
  }
}

export function deleteCustomQuestion(bankId) {
  const list = getCustomQuestions().filter((q) => q.bankId !== bankId);
  localStorage.setItem(CUSTOM_KEY, JSON.stringify(list));
}
