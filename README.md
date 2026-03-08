# EPS-TOPIK CBT Mock Exam

A complete single-page Mock Exam web application for the EPS-TOPIK Computer-Based Test, built with React, Vite, and Tailwind CSS.

## Tech Stack
- React 19
- Vite 7
- Tailwind CSS 4 (via @tailwindcss/vite)
- Lucide React icons

## Run Locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Features
- 40-question exam (20 Reading + 20 Listening)
- 40-minute countdown timer
- Question navigation sidebar with answered/unanswered indicators
- Adjustable font size
- Circular score chart in result modal
- Pass/Fail verdict (≥ 120 pts to pass)
- Thai-language explanations for each question

## Supabase Integration
See `supabase_schema.sql` for the complete PostgreSQL DDL.  
Replace `<project>` in image/audio URLs with your Supabase project reference.

### Storage Bucket
Create a bucket named **`exam-media`** (public) with folders:
- `images/` — JPG images for Reading questions
- `audio/`  — MP3 clips for Listening questions
