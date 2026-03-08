import React from 'react';
import { Volume2, Clock } from 'lucide-react';
import { EXAM_SECTIONS, LISTENING_PLAY_TIMES, LISTENING_ANSWER_TIME_SEC } from '../data/examData';
import { QUESTION_IMAGE_COMPONENTS } from './ExamImages';

const OPTION_SYMBOLS = ['①', '②', '③', '④'];

// ── Animated sound-wave bars ───────────────────────────────────────────────
const SoundWave = ({ active }) => (
  <div className="flex items-end gap-0.75 h-8">
    {[0, 1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className={`w-1.5 rounded-full transition-all ${active ? 'bg-blue-500' : 'bg-gray-300'}`}
        style={active ? {
          height: `${[60, 90, 100, 75, 55][i]}%`,
          animation: `soundBar 0.8s ease-in-out ${i * 0.12}s infinite alternate`,
        } : { height: '30%' }}
      />
    ))}
  </div>
);

// ── Real-exam style listening player (NO script shown) ────────────────────
const ListeningPlayer = ({ phase, playCount, secondsLeft, onTapToPlay }) => {
  if (!phase || phase === 'done') return null;

  // ── loading: auto-play in progress, show spinner + fallback tap button ───
  if (phase === 'loading') {
    return (
      <div className="rounded-xl border-2 border-blue-300 bg-blue-50 p-5 mb-5 flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-3 border-blue-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-blue-700 font-semibold text-sm">🎧 ກຳລັງໂຫລດສຽງ...</span>
        </div>
        {/* Fallback: only shows if auto-play was blocked by browser */}
        <button
          onClick={onTapToPlay}
          className="text-xs text-blue-500 underline underline-offset-2 active:text-blue-700"
        >
          ສຽງບໍ່ອອກ? ກົດທີ່ນີ້
        </button>
      </div>
    );
  }

  // ── playing: sound wave + play counter ───────────────────────────────────
  if (phase === 'playing') {
    return (
      <div className="rounded-xl border-2 border-blue-400 bg-blue-50 p-5 mb-5">
        <div className="flex items-center justify-between">
          {/* Left: icon + label */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow">
              <Volume2 size={20} className="text-white" />
            </div>
            <div>
              <div className="text-blue-800 font-bold text-sm">▶ ກຳລັງຫຼິ້ນ</div>
              <div className="text-blue-500 text-xs mt-0.5">
                ຄັ້ງທີ {playCount + 1} / {LISTENING_PLAY_TIMES}
              </div>
            </div>
          </div>
          {/* Right: animated bars */}
          <SoundWave active={true} />
        </div>
      </div>
    );
  }

  // ── pause: between plays ──────────────────────────────────────────────────
  if (phase === 'pause') {
    return (
      <div className="rounded-xl border-2 border-gray-300 bg-gray-50 p-5 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center">
            <Volume2 size={20} className="text-white" />
          </div>
          <div>
            <div className="text-gray-600 font-bold text-sm">⏸ ລໍຖ້າສັ້ນໆ...</div>
            <div className="text-gray-400 text-xs mt-0.5">
              ກຳລັງຈະຫຼິ້ນຄັ້ງທີ {playCount + 1} / {LISTENING_PLAY_TIMES}
            </div>
          </div>
          <SoundWave active={false} />
        </div>
      </div>
    );
  }

  // ── answering: countdown timer, answer selection open ────────────────────
  if (phase === 'answering') {
    const pct = Math.max(0, Math.min(100, ((LISTENING_ANSWER_TIME_SEC - secondsLeft) / LISTENING_ANSWER_TIME_SEC) * 100));
    const urgent = secondsLeft <= 5;
    return (
      <div className={`rounded-xl border-2 p-5 mb-5 transition-colors ${urgent ? 'border-red-400 bg-red-50' : 'border-amber-400 bg-amber-50'}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock size={18} className={`${urgent ? 'text-red-500' : 'text-amber-600'} animate-pulse`} />
            <span className={`font-bold text-sm ${urgent ? 'text-red-700' : 'text-amber-800'}`}>
              ✏️ ເລືອກຄຳຕອບ
            </span>
          </div>
          <span className={`font-bold text-lg tabular-nums ${urgent ? 'text-red-600' : 'text-amber-700'}`}>
            {secondsLeft}ວ
          </span>
        </div>
        {/* Countdown bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-1000 ${urgent ? 'bg-red-400' : 'bg-amber-400'}`}
            style={{ width: `${100 - pct}%` }}
          />
        </div>
      </div>
    );
  }

  return null;
};

// ── Main QuestionArea ─────────────────────────────────────────────────────
const QuestionArea = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  fontSize,
  listeningPhase,
  listeningPlayCount,
  listeningSecondsLeft,
  onTapToPlay,
}) => {
  if (!question) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
        ຍັງບໍ່ໄດ້ເລືອກຂໍ້ສອບ
      </div>
    );
  }

  const isListening = question.section === EXAM_SECTIONS.LISTENING;
  // Lock answer selection while audio is loading or playing (real exam behavior)
  const answersLocked = isListening && (listeningPhase === 'loading' || listeningPhase === 'playing');

  return (
    <article
      className="flex flex-col h-full overflow-y-auto p-6"
      style={{ fontSize: `${fontSize}px` }}
    >
      {/* Question number badge */}
      <div className="mb-4 flex items-center gap-3">
        <span className="inline-block border-2 border-gray-600 text-gray-700 font-bold px-4 py-1 text-base tracking-wider">
          [ {question.id} ]
        </span>
        {isListening && (
          <span className="text-xs bg-purple-100 text-purple-700 font-semibold px-3 py-1 rounded-full border border-purple-300">
            🎧 ການຟັງ
          </span>
        )}
        {!isListening && (
          <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full border border-blue-300">
            📖 ການອ່ານ
          </span>
        )}
      </div>

      {/* Group label */}
      {question.groupLabel && (
        <p className="text-gray-600 text-sm font-semibold mb-2 p-2 bg-gray-50 rounded border-l-4 border-gray-300 leading-relaxed">
          {question.groupLabel}
        </p>
      )}

      {/* Listening auto-play status */}
      {isListening && (
        <ListeningPlayer
          phase={listeningPhase}
          playCount={listeningPlayCount}
          secondsLeft={listeningSecondsLeft}
          onTapToPlay={onTapToPlay}
        />
      )}

      {/* Question text */}
      <p className="text-gray-800 font-semibold mb-5 leading-relaxed">
        {question.questionText}
      </p>

      {/* Inline SVG image (Reading section) */}
      {(() => {
        const SvgImage = QUESTION_IMAGE_COMPONENTS[question.bankId];
        if (SvgImage) {
          return (
            <div className="flex justify-center mb-6 exam-image-wrap">
              <SvgImage />
            </div>
          );
        }
        if (question.imageUrl) {
          return (
            <div className="flex justify-center mb-6">
              <img
                src={question.imageUrl}
                alt={question.imageAlt || '문제 그림'}
                className="max-w-full rounded border border-gray-300 shadow-sm"
                style={{ maxHeight: '240px', objectFit: 'contain' }}
              />
            </div>
          );
        }
        return null;
      })()}

      {/* Answer options */}
      <div className={`flex flex-col gap-3 mt-2 ${answersLocked ? 'pointer-events-none opacity-50' : ''}`}>
        {question.options.map((option, idx) => {
          const isSelected = selectedAnswer === idx;
          return (
            <button
              key={idx}
              onClick={() => !answersLocked && onSelectAnswer(question.id, idx)}
              disabled={answersLocked}
              className={`flex items-start gap-3 w-full text-left px-4 py-3 rounded-lg border-2 transition-all
                ${
                  isSelected
                    ? 'border-[#1a3a6b] bg-blue-50 text-[#1a3a6b] font-semibold shadow-sm'
                    : 'border-gray-200 bg-white text-gray-800 hover:border-gray-400 hover:bg-gray-50'
                }
              `}
            >
              <span className="shrink-0 text-lg leading-snug">{OPTION_SYMBOLS[idx]}</span>
              <span className="leading-relaxed">{option.replace(/^[①②③④]\s?/, '')}</span>
            </button>
          );
        })}
      </div>

      {answersLocked && (
        <p className="mt-3 text-center text-xs text-blue-500 font-medium">
          🔒 ສາມາດເລືອກຄຳຕອບໄດ້ຫຼັງຈາກຫຼິ້ນສຽງຈົບ
        </p>
      )}
    </article>
  );
};

export default QuestionArea;
