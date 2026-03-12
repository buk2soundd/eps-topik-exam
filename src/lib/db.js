import { getSettings } from './settings';

function base() {
  return getSettings().apiBase || '/api';
}
function secret() {
  return getSettings().apiSecret || '';
}

/**
 * Save an exam result after submission.
 * Silently returns null if the API is unavailable.
 */
export async function saveExamResult({
  examinerName,
  totalScore,
  readingScore,
  listeningScore,
  passed,
  timeTakenSec,
  examSet,
  category,
}) {
  try {
    const res = await fetch(`${base()}/save_result.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        examiner_name:   examinerName || 'ຜູ້ສອບ',
        total_score:     totalScore,
        reading_score:   readingScore,
        listening_score: listeningScore,
        passed,
        time_taken_sec:  timeTakenSec,
        exam_set:        examSet,
        category:        category || 'ALL',
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    console.warn('[db] saveExamResult failed:', e.message);
    return null;
  }
}

/**
 * Retrieve all exam results (newest first).
 * Returns [] if the API is unavailable.
 */
export async function getExamResults() {
  try {
    const res = await fetch(`${base()}/get_results.php`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    console.warn('[db] getExamResults failed:', e.message);
    return [];
  }
}

/**
 * Check whether a given examiner name has already submitted an exam.
 * Returns false (fail-open) on any error.
 */
export async function checkNameSubmitted(name) {
  if (!name) return false;
  try {
    const res = await fetch(
      `${base()}/check_name.php?name=${encodeURIComponent(name.trim())}`
    );
    if (!res.ok) return false;
    const d = await res.json();
    return !!d.exists;
  } catch {
    return false;
  }
}

/**
 * Delete a single exam result by id.
 */
export async function deleteExamResult(id) {
  const res = await fetch(`${base()}/delete_result.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Secret': secret(),
    },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) {
    const d = await res.json().catch(() => ({}));
    throw new Error(d.error || `HTTP ${res.status}`);
  }
}

/**
 * Test whether the PHP API is reachable.
 * Returns { ok, status, message }
 */
export async function testApiConnection() {
  try {
    const res = await fetch(`${base()}/get_results.php`);
    if (res.ok) {
      return { ok: true, status: res.status, message: 'เชื่อมต่อ MySQL สำเร็จ ✓' };
    }
    return { ok: false, status: res.status, message: `Server ตอบกลับ HTTP ${res.status}` };
  } catch (e) {
    return { ok: false, status: 0, message: `ไม่สามารถเชื่อมต่อได้: ${e.message}` };
  }
}
