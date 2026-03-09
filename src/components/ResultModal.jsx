import React from 'react';
import { X } from 'lucide-react';
import { EXAM_SECTIONS, TOTAL_QUESTIONS, POINTS_PER_QUESTION } from '../data/examData';

const OPTION_SYMBOLS = ['①', '②', '③', '④'];

/**
 * Calculate score for a given section.
 */
function calcScore(section, questions, answers) {
  return questions
    .filter((q) => q.section === section)
    .reduce((acc, q) => {
      return answers[q.id] === q.correctIndex ? acc + 1 : acc;
    }, 0);
}

/**
 * A simple circular SVG score chart.
 */
const CircleChart = ({ score, total }) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progress = total > 0 ? score / total : 0;
  const dashOffset = circumference * (1 - progress);
  const percentage = Math.round(progress * 100);

  return (
    <div className="relative flex items-center justify-center w-40 h-40">
      <svg className="absolute inset-0 -rotate-90" width="160" height="160" viewBox="0 0 160 160">
        {/* Background circle */}
        <circle cx="80" cy="80" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="12" />
        {/* Progress circle */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke={percentage >= 60 ? '#1a3a6b' : '#ef4444'}
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      {/* Center text */}
      <div className="flex flex-col items-center z-10">
        <span className="text-2xl font-bold text-gray-800">{score * POINTS_PER_QUESTION}</span>
        <span className="text-xs text-gray-500">/ {total * POINTS_PER_QUESTION}</span>
        <span className="text-xs text-gray-400 mt-0.5">{score}/{total} ຖືກ</span>
      </div>
    </div>
  );
};

/**
 * Result modal shown on submit or timer expiry.
 */
const ResultModal = ({ answers, examQuestions, setNumber, onClose, onRestart }) => {
  const readingScore = calcScore(EXAM_SECTIONS.READING, examQuestions, answers);
  const listeningScore = calcScore(EXAM_SECTIONS.LISTENING, examQuestions, answers);
  const totalScore = readingScore + listeningScore;

  const readingQuestions = examQuestions.filter((q) => q.section === EXAM_SECTIONS.READING);
  const listeningQuestions = examQuestions.filter((q) => q.section === EXAM_SECTIONS.LISTENING);

  const renderAnswer = (q) => {
    const userIdx = answers[q.id];
    const isCorrect = userIdx === q.correctIndex;
    const symbol = userIdx !== undefined && userIdx !== null ? OPTION_SYMBOLS[userIdx] : '—';

    return (
      <div
        key={q.id}
        className={`flex items-center gap-2 px-2 py-1 rounded text-xs ${
          userIdx === undefined || userIdx === null
            ? 'text-gray-400'
            : isCorrect
            ? 'text-green-700 bg-green-50'
            : 'text-red-700 bg-red-50'
        }`}
      >
        <span className="w-6 text-right text-gray-500 font-semibold">{q.id}.</span>
        <span className="flex-1 font-semibold">{symbol}</span>
        {!isCorrect && userIdx !== undefined && userIdx !== null && (
          <span className="text-gray-400">→ {OPTION_SYMBOLS[q.correctIndex]}</span>
        )}
        <span className="ml-auto">
          {userIdx === undefined || userIdx === null ? (
            <span className="text-gray-300">○</span>
          ) : isCorrect ? (
            <span className="text-green-500">✓</span>
          ) : (
            <span className="text-red-500">✗</span>
          )}
        </span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 tracking-wide">
            ຜົນການສອບ
            <span className="ml-2 text-sm font-normal text-gray-400">ຊຸດທີ {setNumber}</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex flex-col md:flex-row overflow-hidden flex-1 min-h-0">
          {/* ── Left: Score Summary ── */}
          <div className="md:w-56 shrink-0 flex flex-col items-center justify-center gap-5 p-6 border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50">
            <CircleChart score={totalScore} total={TOTAL_QUESTIONS} />

            {/* Badge pills */}
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center justify-between bg-blue-100 text-blue-800 rounded-full px-4 py-1.5 text-sm font-semibold">
                <span>ການອ່ານ</span>
                <span className="bg-white rounded-full px-2 py-0.5 text-xs text-blue-700 font-bold shadow-sm">
                  {readingScore * POINTS_PER_QUESTION}&nbsp;/&nbsp;{20 * POINTS_PER_QUESTION}
                </span>
              </div>
              <div className="flex items-center justify-between bg-purple-100 text-purple-800 rounded-full px-4 py-1.5 text-sm font-semibold">
                <span>ການຟັງ</span>
                <span className="bg-white rounded-full px-2 py-0.5 text-xs text-purple-700 font-bold shadow-sm">
                  {listeningScore * POINTS_PER_QUESTION}&nbsp;/&nbsp;{20 * POINTS_PER_QUESTION}
                </span>
              </div>
            </div>

            {/* Pass/Fail */}
            <div
              className={`w-full text-center rounded-lg py-2 font-bold text-sm tracking-wide ${
                totalScore * POINTS_PER_QUESTION >= 120
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {totalScore * POINTS_PER_QUESTION >= 120 ? '✓ ຜ່ານ' : '✗ ບໍ່ຜ່ານ'}
              <div className="text-xs font-normal text-gray-500 mt-0.5">
                (ຜ່ານຕ່ຳສຸດ: 120 ຄະແນນ)
              </div>
            </div>

            {/* Restart */}
            <button
              onClick={onRestart}
              className="w-full bg-[#1a3a6b] hover:bg-[#122d56] text-white font-bold py-2 rounded text-sm tracking-widest uppercase transition-colors"
            >
              ເລີ່ມໃໝ່
            </button>
          </div>

          {/* ── Right: Detailed Answer List ── */}
          <div className="flex-1 overflow-y-auto p-4 min-h-0">
            <div className="flex gap-4">
              {/* Reading Column */}
              <div className="flex-1">
                <div className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-2 pb-1 border-b border-blue-200">
                  ການອ່ານ (1–20) &nbsp;{readingScore}/20
                </div>
                <div className="flex flex-col gap-0.5">
                  {readingQuestions.map(renderAnswer)}
                </div>
              </div>

              {/* Listening Column */}
              <div className="flex-1">
                <div className="text-xs font-bold text-purple-700 uppercase tracking-widest mb-2 pb-1 border-b border-purple-200">
                  ການຟັງ (21–40) &nbsp;{listeningScore}/20
                </div>
                <div className="flex flex-col gap-0.5">
                  {listeningQuestions.map(renderAnswer)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
