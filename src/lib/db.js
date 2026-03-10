import { supabase } from './supabase';

const TABLE = 'exam_results';

/**
 * Save an exam result after submission.
 * Silently skips if Supabase is not configured.
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
  if (!supabase) return null;
  const { data, error } = await supabase.from(TABLE).insert([
    {
      examiner_name: examinerName || 'ຜູ້ສອບ',
      total_score: totalScore,
      reading_score: readingScore,
      listening_score: listeningScore,
      passed,
      time_taken_sec: timeTakenSec,
      exam_set: examSet,
      category: category || 'ALL',
    },
  ]);
  if (error) throw error;
  return data;
}

/**
 * Retrieve all exam results (newest first).
 * Returns [] if Supabase is not configured.
 */
export async function getExamResults() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

/**
 * Check whether a given examiner name has already submitted an exam.
 * Returns false (fail-open) if Supabase is not configured or on error.
 */
export async function checkNameSubmitted(name) {
  if (!supabase || !name) return false;
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select('id')
      .ilike('examiner_name', name.trim())
      .limit(1);
    if (error) return false;
    return data && data.length > 0;
  } catch {
    return false;
  }
}

/**
 * Delete a single exam result by id.
 * Silently skips if Supabase is not configured.
 */
export async function deleteExamResult(id) {
  if (!supabase) return;
  const { error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw error;
}
