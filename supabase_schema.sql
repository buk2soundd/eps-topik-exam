-- ============================================================
-- EPS-TOPIK Mock Exam – Supabase (PostgreSQL) Database Schema
-- ============================================================
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ============================================================

-- Enable UUID extension (already enabled in Supabase by default)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────────────────────────
-- 1. questions
--    Stores every exam question (Reading & Listening).
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.questions (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Human-readable ordering inside an exam set
  position      SMALLINT NOT NULL,            -- 1-40

  section       TEXT NOT NULL                 -- 'READING' | 'LISTENING'
                CHECK (section IN ('READING','LISTENING')),

  category      TEXT NOT NULL DEFAULT 'Basic' -- e.g. 'Industry', 'Basic', 'Safety'
                CHECK (category IN ('Basic','Industry','Safety','Labor Law')),

  group_label   TEXT,                         -- "[1~2] 다음 그림을 보고 …" shared by several Qs
  question_text TEXT NOT NULL,                -- main Korean question text

  image_url     TEXT,                         -- URL of JPG stored in 'exam-media' bucket (Reading)
  audio_url     TEXT,                         -- URL of MP3 stored in 'exam-media' bucket (Listening)

  explanation   TEXT                          -- Thai-language explanation for review
);

COMMENT ON TABLE public.questions IS 'Stores EPS-TOPIK exam questions (Reading & Listening).';

-- ─────────────────────────────────────────────────────────────
-- 2. options
--    Each question has exactly 4 options.
--    Relationship: options.question_id → questions.id  (N:1)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.options (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  question_id   UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,

  position      SMALLINT NOT NULL CHECK (position BETWEEN 1 AND 4),  -- 1=①, 2=②, 3=③, 4=④
  option_text   TEXT NOT NULL,
  is_correct    BOOLEAN NOT NULL DEFAULT FALSE,

  UNIQUE (question_id, position)
);

COMMENT ON TABLE public.options IS '4 multiple-choice options per question; is_correct marks the right answer.';

-- ─────────────────────────────────────────────────────────────
-- 3. exam_sessions
--    One row per exam attempt by a user.
--    Relationship: exam_sessions.user_id → auth.users.id (N:1)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.exam_sessions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  total_score     SMALLINT NOT NULL DEFAULT 0,     -- 0-200 (40 questions × 5 pts)
  reading_score   SMALLINT NOT NULL DEFAULT 0,     -- 0-100
  listening_score SMALLINT NOT NULL DEFAULT 0,     -- 0-100

  time_taken_sec  INT NOT NULL DEFAULT 0,           -- seconds spent (max 2400)
  is_completed    BOOLEAN NOT NULL DEFAULT FALSE,   -- FALSE while in-progress
  passed          BOOLEAN GENERATED ALWAYS AS (total_score >= 120) STORED
);

COMMENT ON TABLE public.exam_sessions IS 'Tracks each exam attempt. passed = total_score ≥ 120.';

-- ─────────────────────────────────────────────────────────────
-- 4. user_answers
--    Records which option the user chose per question per session.
--    Relationships:
--      user_answers.session_id  → exam_sessions.id  (N:1)
--      user_answers.question_id → questions.id       (N:1)
--      user_answers.option_id   → options.id         (N:1, nullable = skipped)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.user_answers (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  session_id   UUID NOT NULL REFERENCES public.exam_sessions(id) ON DELETE CASCADE,
  question_id  UUID NOT NULL REFERENCES public.questions(id)     ON DELETE CASCADE,
  option_id    UUID          REFERENCES public.options(id)       ON DELETE SET NULL, -- NULL = skipped

  is_correct   BOOLEAN,   -- denormalized for fast scoring; NULL if skipped

  UNIQUE (session_id, question_id)
);

COMMENT ON TABLE public.user_answers IS 'The option selected per question per session. NULL option_id means skipped.';

-- ─────────────────────────────────────────────────────────────
-- INDEXES
-- ─────────────────────────────────────────────────────────────
CREATE INDEX idx_questions_section       ON public.questions     (section);
CREATE INDEX idx_options_question_id     ON public.options       (question_id);
CREATE INDEX idx_user_answers_session    ON public.user_answers  (session_id);
CREATE INDEX idx_exam_sessions_user_id   ON public.exam_sessions (user_id);

-- ─────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY (RLS)
-- ─────────────────────────────────────────────────────────────

-- Questions & options are read-only for everyone (no login needed to view questions)
ALTER TABLE public.questions      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.options        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_sessions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_answers   ENABLE ROW LEVEL SECURITY;

-- questions: public read
CREATE POLICY "Public read questions"
  ON public.questions FOR SELECT
  USING (true);

-- options: public read
CREATE POLICY "Public read options"
  ON public.options FOR SELECT
  USING (true);

-- exam_sessions: users can read/create their own sessions
CREATE POLICY "Users read own sessions"
  ON public.exam_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own sessions"
  ON public.exam_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own sessions"
  ON public.exam_sessions FOR UPDATE
  USING (auth.uid() = user_id);

-- user_answers: users can read/write answers only for their own sessions
CREATE POLICY "Users read own answers"
  ON public.user_answers FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.exam_sessions s
      WHERE s.id = session_id AND s.user_id = auth.uid()
    )
  );

CREATE POLICY "Users insert own answers"
  ON public.user_answers FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.exam_sessions s
      WHERE s.id = session_id AND s.user_id = auth.uid()
    )
  );

CREATE POLICY "Users upsert own answers"
  ON public.user_answers FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.exam_sessions s
      WHERE s.id = session_id AND s.user_id = auth.uid()
    )
  );

-- ─────────────────────────────────────────────────────────────
-- STORAGE BUCKETS  (run in Dashboard → Storage, or via SQL below)
-- ─────────────────────────────────────────────────────────────
-- Create bucket via Supabase Dashboard:
--   Name: exam-media
--   Public: true  (images/audio can be served directly)
--   Allowed MIME types: image/jpeg, image/png, audio/mpeg
--
-- Folder convention inside 'exam-media':
--   images/q<id>.jpg    – question images
--   audio/q<id>.mp3     – listening audio clips
--
-- Example public URL:
--   https://<project>.supabase.co/storage/v1/object/public/exam-media/images/q1.jpg

-- ─────────────────────────────────────────────────────────────
-- SAMPLE DATA
-- ─────────────────────────────────────────────────────────────

-- 1. Reading question – industry measurement (65cm towel)
WITH q AS (
  INSERT INTO public.questions (position, section, category, group_label, question_text, image_url, explanation)
  VALUES (
    1,
    'READING',
    'Industry',
    '[1~2] 다음 그림을 보고 맞는 단어나 문장을 고르십시오.',
    '1. 다음 그림에 알맞은 것을 고르십시오.',
    'https://<project>.supabase.co/storage/v1/object/public/exam-media/images/q1.jpg',
    'ภาพแสดงการวัดความยาวของผ้าขนหนู ซึ่งมีความยาว 65 เซนติเมตร (65cm) ดังนั้นคำตอบที่ถูกต้องคือ ①'
  )
  RETURNING id
)
INSERT INTO public.options (question_id, position, option_text, is_correct)
SELECT id, 1, '65cm',  TRUE  FROM q UNION ALL
SELECT id, 2, '65kg',  FALSE FROM q UNION ALL
SELECT id, 3, '65개',  FALSE FROM q UNION ALL
SELECT id, 4, '65명',  FALSE FROM q;

-- 2. Listening question – factory work conversation
WITH q AS (
  INSERT INTO public.questions (position, section, category, group_label, question_text, audio_url, explanation)
  VALUES (
    21,
    'LISTENING',
    'Industry',
    '[21~22] 다음을 듣고 알맞은 것을 고르십시오.',
    '21. 남자가 하는 말의 의미로 알맞은 것을 고르십시오.',
    'https://<project>.supabase.co/storage/v1/object/public/exam-media/audio/q21.mp3',
    'ชายพูดว่า "지금 작업 중입니다" หมายความว่ากำลังทำงานอยู่ในขณะนี้ ดังนั้นคำตอบที่ถูกต้องคือ ②'
  )
  RETURNING id
)
INSERT INTO public.options (question_id, position, option_text, is_correct)
SELECT id, 1, '지금 점심을 먹고 있습니다.',  FALSE FROM q UNION ALL
SELECT id, 2, '지금 작업 중입니다.',          TRUE  FROM q UNION ALL
SELECT id, 3, '지금 퇴근했습니다.',           FALSE FROM q UNION ALL
SELECT id, 4, '지금 휴식 중입니다.',          FALSE FROM q;

-- ─────────────────────────────────────────────────────────────
-- TABLE RELATIONSHIP SUMMARY
-- ─────────────────────────────────────────────────────────────
-- questions ──< options          (1 question has 4 options)
-- auth.users ──< exam_sessions   (1 user has many sessions)
-- exam_sessions ──< user_answers (1 session has 40 answers)
-- questions ──< user_answers     (1 question referenced in many answers)
-- options   ──< user_answers     (1 option selected in many answers)
-- ─────────────────────────────────────────────────────────────


-- ═════════════════════════════════════════════════════════════
-- ADMIN BACKEND – Run this block in Supabase SQL Editor
-- Creates a simple exam_results table (no auth required).
-- ═════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.exam_results (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  examiner_name   TEXT NOT NULL DEFAULT 'ຜູ້ສອບ',
  total_score     SMALLINT NOT NULL DEFAULT 0,
  reading_score   SMALLINT NOT NULL DEFAULT 0,  -- number of correct answers (0-20)
  listening_score SMALLINT NOT NULL DEFAULT 0,  -- number of correct answers (0-20)
  passed          BOOLEAN NOT NULL DEFAULT FALSE,
  time_taken_sec  INT NOT NULL DEFAULT 0,
  exam_set        SMALLINT,
  category        TEXT DEFAULT 'ALL'
);

COMMENT ON TABLE public.exam_results IS
  'Stores one row per completed exam attempt. No auth required – open insert via RLS policy.';

-- Enable Row Level Security
ALTER TABLE public.exam_results ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users (app users) to INSERT their result
CREATE POLICY "Public can insert results"
  ON public.exam_results FOR INSERT
  WITH CHECK (true);

-- Allow anyone to SELECT (admin reads via anon key for demo; use service key in production)
CREATE POLICY "Public can select results"
  ON public.exam_results FOR SELECT
  USING (true);

-- Allow DELETE (admin only in production – restrict with a role check if needed)
CREATE POLICY "Public can delete results"
  ON public.exam_results FOR DELETE
  USING (true);
