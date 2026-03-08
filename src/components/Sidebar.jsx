import React from 'react';
import { EXAM_SECTIONS } from '../data/examData';

/**
 * Right-side sidebar: section label, countdown timer, question grid navigation,
 * and Prev/Next navigation buttons.
 */
const Sidebar = ({
  currentSection,
  currentQuestionId,
  answers,
  remainingSeconds,
  setNumber,
  onNavigate,
  onPrev,
  onNext,
}) => {
  const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, '0');
  const seconds = String(remainingSeconds % 60).padStart(2, '0');

  // Reading: IDs 1-20, Listening: IDs 21-40
  const readingIds = Array.from({ length: 20 }, (_, i) => i + 1);
  const listeningIds = Array.from({ length: 20 }, (_, i) => i + 21);

  const isReading = currentSection === EXAM_SECTIONS.READING;
  const sectionIds = isReading ? readingIds : listeningIds;

  // Split into two columns: left = first 10, right = last 10
  const leftCol = sectionIds.slice(0, 10);
  const rightCol = sectionIds.slice(10, 20);

  return (
    <aside className="flex flex-col h-full bg-white border-l border-gray-300">
      {/* Section Label + Set Number */}
      <div className="bg-gray-200 text-center py-2 border-b border-gray-300">
        <div className="font-bold text-sm tracking-widest text-gray-700 uppercase">
          {currentSection}
        </div>
        <div className="text-xs text-gray-500 mt-0.5">
          ຊຸດທີ <span className="font-bold text-[#1a3a6b]">{setNumber}</span>
        </div>
      </div>

      {/* Timer */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300 bg-gray-50">
        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          ເວລາທີ່ເຫຼືອ
        </span>
        <span
          className={`timer-display text-xl font-bold ${
            remainingSeconds <= 60
              ? 'text-red-600 animate-pulse'
              : remainingSeconds <= 300
              ? 'text-orange-500'
              : 'text-gray-800'
          }`}
        >
          {minutes}:{seconds}
        </span>
      </div>

      {/* Section Tabs */}
      <div className="flex border-b border-gray-300">
        <button
          className={`flex-1 py-2 text-xs font-semibold transition-colors ${
            isReading
              ? 'bg-[#1a3a6b] text-white'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
          onClick={() => onNavigate(1)}
        >
          ການອ່ານ
        </button>
        <button
          className={`flex-1 py-2 text-xs font-semibold transition-colors ${
            !isReading
              ? 'bg-[#1a3a6b] text-white'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
          onClick={() => onNavigate(21)}
        >
          ການຟັງ
        </button>
      </div>

      {/* Question Grid Navigation */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="flex gap-1">
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-1">
            {leftCol.map((qId) => {
              const answered = answers[qId] !== undefined && answers[qId] !== null;
              const isCurrent = currentQuestionId === qId;
              return (
                <button
                  key={qId}
                  onClick={() => onNavigate(qId)}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded text-xs transition-colors w-full text-left
                    ${isCurrent ? 'bg-blue-100 border border-[#1a3a6b]' : 'hover:bg-gray-100'}
                  `}
                >
                  {/* Circle indicator */}
                  <span
                    className={`inline-flex items-center justify-center w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
                      answered
                        ? 'bg-[#1a3a6b] border-[#1a3a6b]'
                        : isCurrent
                        ? 'border-[#1a3a6b] bg-white'
                        : 'border-gray-400 bg-white'
                    }`}
                  >
                    {answered && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                    )}
                  </span>
                  <span
                    className={`font-medium ${
                      isCurrent ? 'text-[#1a3a6b] font-bold' : 'text-gray-700'
                    }`}
                  >
                    {qId}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Vertical divider */}
          <div className="w-px bg-gray-200 my-1" />

          {/* Right Column */}
          <div className="flex-1 flex flex-col gap-1">
            {rightCol.map((qId) => {
              const answered = answers[qId] !== undefined && answers[qId] !== null;
              const isCurrent = currentQuestionId === qId;
              return (
                <button
                  key={qId}
                  onClick={() => onNavigate(qId)}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded text-xs transition-colors w-full text-left
                    ${isCurrent ? 'bg-blue-100 border border-[#1a3a6b]' : 'hover:bg-gray-100'}
                  `}
                >
                  <span
                    className={`inline-flex items-center justify-center w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
                      answered
                        ? 'bg-[#1a3a6b] border-[#1a3a6b]'
                        : isCurrent
                        ? 'border-[#1a3a6b] bg-white'
                        : 'border-gray-400 bg-white'
                    }`}
                  >
                    {answered && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                    )}
                  </span>
                  <span
                    className={`font-medium ${
                      isCurrent ? 'text-[#1a3a6b] font-bold' : 'text-gray-700'
                    }`}
                  >
                    {qId}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Nav Buttons */}
      <div className="flex gap-2 p-3 border-t border-gray-300 bg-gray-50">
        <button
          onClick={onPrev}
          className="flex-1 bg-[#1a3a6b] hover:bg-[#122d56] active:bg-[#0d2245] text-white font-bold py-2 rounded text-sm tracking-widest uppercase transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={currentQuestionId <= 1}
        >
          ກ່ອນໜ້າ
        </button>
        <button
          onClick={onNext}
          className="flex-1 bg-[#1a3a6b] hover:bg-[#122d56] active:bg-[#0d2245] text-white font-bold py-2 rounded text-sm tracking-widest uppercase transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={currentQuestionId >= 40}
        >
          ຖັດໄປ
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
