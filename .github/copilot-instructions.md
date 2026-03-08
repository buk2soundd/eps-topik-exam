# Copilot Instructions

This is an EPS-TOPIK CBT Mock Exam React web application.

## Stack
- React 19 + Vite 7
- Tailwind CSS 4 (plugin via @tailwindcss/vite, import via `@import "tailwindcss"`)
- Lucide React icons

## Project Structure
- `src/data/examData.js` — All 40 exam questions and config constants
- `src/components/Header.jsx` — Top bar with font controls and Submit
- `src/components/Sidebar.jsx` — Timer, section tabs, question grid navigation
- `src/components/QuestionArea.jsx` — Question display and answer selection
- `src/components/ResultModal.jsx` — Score modal shown on submit/timer expiry
- `src/App.jsx` — Root component with all state management
- `supabase_schema.sql` — PostgreSQL DDL for Supabase backend

## Key Conventions
- Section IDs: Reading = Q1–Q20, Listening = Q21–Q40
- 5 points per question, max 200, pass threshold = 120
- Timer: 40 minutes (EXAM_DURATION_SECONDS = 2400)
- Colors: primary dark blue = `#1a3a6b`
