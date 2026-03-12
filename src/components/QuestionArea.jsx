import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { EXAM_SECTIONS } from '../data/examData';
import { QUESTION_IMAGE_COMPONENTS, IMAGE_OPTION_COMPONENTS } from './ExamImages';

// ── Real-photo with SVG fallback ───────────────────────────────────────────
// Shows a real image from imageUrl; if it fails to load, falls back to SVG.
const ImageWithFallback = ({ imageUrl, imageAlt, SvgImage }) => {
  const [imgFailed, setImgFailed] = useState(false);

  if (imageUrl && !imgFailed) {
    return (
      <div className="flex justify-center mb-6">
        <img
          src={imageUrl}
          alt={imageAlt || '문제 그림'}
          className="max-w-full rounded-lg border border-gray-300 shadow"
          style={{ maxHeight: '280px', objectFit: 'contain', background: '#fff' }}
          onError={() => setImgFailed(true)}
        />
      </div>
    );
  }
  if (SvgImage) {
    return (
      <div className="flex justify-center mb-6 exam-image-wrap">
        <SvgImage />
      </div>
    );
  }
  return null;
};

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

  // ── loading / playing: show big headphone icon ─────────────────────
  if (phase === 'loading' || phase === 'playing') {
    const isPlaying = phase === 'playing';
    return (
      <div className="flex flex-col items-center justify-center py-8 mb-5 gap-4">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all
          ${isPlaying ? 'bg-blue-600 animate-pulse' : 'bg-gray-300'}`}>
          <Volume2 size={36} className="text-white" />
        </div>
        {isPlaying && <SoundWave active={true} />}
        {phase === 'loading' && (
          <button
            onClick={onTapToPlay}
            className="text-xs text-blue-400 underline underline-offset-2 mt-1"
          >
            ສຽງບໍ່ອອກ? ກົດທີ່ນີ້
          </button>
        )}
      </div>
    );
  }

  // pause / done — show nothing (answer options remain accessible)
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
  // For listening: answers are always selectable (no lock)
  const answersLocked = false;
  // Hide question text/label during all active listening phases (including pause & done)
  const audioActive = isListening && listeningPhase !== null;

  return (
    <article
      className="flex flex-col h-full overflow-y-auto p-4 md:p-5"
      style={{ fontSize: `${fontSize}px`, color: '#333', background: '#fff', fontFamily: 'Dotum, ሴ체, 굴림, Arial, sans-serif' }}
    >
      {/* Question number badge */}
      <div className="mb-3 flex items-center gap-2">
        <span className="font-bold text-[#1a3a6b] text-base">[{question.id}]</span>
        {isListening ? (
          <span
            className="text-[10px] font-semibold px-2 py-0.5"
            style={{ background: '#d7e4f2', color: '#1a3a6b', border: '1px solid #9ab8d4' }}
          >
            🎧 ຟັງ
          </span>
        ) : (
          <span
            className="text-[10px] font-semibold px-2 py-0.5"
            style={{ background: '#e8eef8', color: '#1a3a6b', border: '1px solid #b0c8e4' }}
          >
            📖 ອ່ານ
          </span>
        )}
      </div>

      {/* Listening auto-play status */}
      {isListening && (
        <ListeningPlayer
          phase={listeningPhase}
          playCount={listeningPlayCount}
          secondsLeft={listeningSecondsLeft}
          onTapToPlay={onTapToPlay}
        />
      )}

      {/* Group label — hidden during audio playback for listening */}
      {question.groupLabel && !audioActive && (
        <p
          className="text-sm mb-3 leading-relaxed"
          style={{ border: '1px solid #333', padding: '9px', color: '#333' }}
        >
          {question.groupLabel}
        </p>
      )}

      {/* Question text — hidden during audio playback for listening */}
      {!audioActive && (
        <p className="font-semibold mb-3 leading-relaxed" style={{ color: '#333' }}>
          {question.questionText}
        </p>
      )}

      {/* Image — prefer real photo (imageUrl) over SVG, with fallback */}
      {(() => {
        const SvgImage = QUESTION_IMAGE_COMPONENTS[question.bankId];
        if (!question.imageUrl && !SvgImage) return null;
        return (
          <ImageWithFallback
            imageUrl={question.imageUrl}
            imageAlt={question.imageAlt}
            SvgImage={SvgImage}
          />
        );
      })()}

      {/* Answer options: image-option 2×2 grid OR normal text list */}
      {(question.imageOptions?.length === 4 || question.imageOptionUrls?.length === 4) ? (
        <div className="grid grid-cols-2 gap-3 mt-2">
          {(question.imageOptionUrls || question.imageOptions).map((imgOrKey, idx) => {
            const isUrl = !!question.imageOptionUrls;
            const ImgComp = !isUrl ? IMAGE_OPTION_COMPONENTS[imgOrKey] : null;
            const isSelected = selectedAnswer === idx;
            return (
              <button
                key={idx}
                onClick={() => onSelectAnswer(question.id, idx)}
                className="flex flex-col items-center transition-all p-1"
                style={{
                  border: isSelected ? '2px solid #1a3a6b' : '2px solid #ccc',
                  background: isSelected ? '#d7e4f2' : '#fff',
                }}
              >
                <div className="w-full">
                  {isUrl ? (
                    <img
                      src={imgOrKey}
                      alt={`선택지 ${OPTION_SYMBOLS[idx]}`}
                      className="w-full rounded"
                      style={{ maxHeight: '130px', objectFit: 'contain', background: '#f8f8f8' }}
                    />
                  ) : ImgComp ? <ImgComp /> : <div className="h-20 bg-gray-100 rounded"/>}
                </div>
                <span className={`mt-1 text-sm font-semibold ${
                  isSelected ? 'text-[#1a3a6b]' : 'text-[#333]'
                }`}>
                  {OPTION_SYMBOLS[idx]}
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="mt-3" style={{ border: '1px solid #ccc' }}>
          {question.options.map((option, idx) => {
            const isSelected = selectedAnswer === idx;
            return (
              <button
                key={idx}
                onClick={() => onSelectAnswer(question.id, idx)}
                className="flex items-center w-full text-left px-3 py-3 transition-colors"
                style={{
                  borderBottom: idx < question.options.length - 1 ? '1px solid #e0e0e0' : 'none',
                  background: isSelected ? '#d7e4f2' : '#fff',
                  color: isSelected ? '#1a3a6b' : '#333',
                  fontWeight: isSelected ? '600' : 'normal',
                }}
              >
                <span className="shrink-0 w-7 text-base leading-none">{OPTION_SYMBOLS[idx]}</span>
                {isSelected && (
                  <span
                    className="w-2 h-2 rounded-full mr-2 shrink-0"
                    style={{ background: '#1a3a6b' }}
                  />
                )}
                <span className="leading-relaxed">{option.replace(/^[①②③④]\s?/, '')}</span>
              </button>
            );
          })}
        </div>
      )}


    </article>
  );
};

export default QuestionArea;
