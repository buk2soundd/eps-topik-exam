import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { GRAMMAR_CATEGORIES, GRAMMAR_PATTERNS } from '../data/grammarData';

const GrammarPage = ({ onBack }) => {
  const [activeCat, setActiveCat] = useState(GRAMMAR_CATEGORIES[0].id);
  const [expanded, setExpanded] = useState(null); // pattern index or null

  const cat = GRAMMAR_CATEGORIES.find((c) => c.id === activeCat);
  const patterns = GRAMMAR_PATTERNS[activeCat] || [];

  const handleCatChange = (id) => {
    setActiveCat(id);
    setExpanded(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* ── Top Bar ── */}
      <div className="bg-[#1a3a6b] text-white px-4 py-3 flex items-center gap-3 shadow-md sticky top-0 z-10">
        <button
          onClick={onBack}
          className="flex items-center gap-1 rounded-lg px-3 py-1.5 bg-white/10 hover:bg-white/20 transition-colors text-sm font-bold"
        >
          <ArrowLeft size={16} />
          ກັບຫລັງ
        </button>
        <div className="flex-1 text-center">
          <div className="font-extrabold text-lg tracking-wide">ໄວຍາກອນ EPS-TOPIK</div>
          <div className="text-xs opacity-70">문법 패턴 | ຮູບແບບໄວຍາກອນ</div>
        </div>
        <div className="text-xs bg-white/10 rounded-full px-3 py-1 font-bold">
          {patterns.length} ຮູບແບບ
        </div>
      </div>

      {/* ── Category Tabs ── */}
      <div className="bg-white border-b border-gray-200 px-3 pt-3 pb-3 sticky top-[57px] z-10 shadow-sm">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {GRAMMAR_CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => handleCatChange(c.id)}
              className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold border-2 transition-all"
              style={
                activeCat === c.id
                  ? { background: c.color, color: '#fff', borderColor: c.color }
                  : { background: '#fff', color: '#374151', borderColor: '#e5e7eb' }
              }
            >
              <span>{c.icon}</span>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Pattern List ── */}
      <div className="flex-1 p-3 space-y-3">
        {/* Category Header */}
        <div
          className="rounded-xl px-4 py-2.5 flex items-center gap-2"
          style={{ background: cat.bg }}
        >
          <span className="text-xl">{cat.icon}</span>
          <div>
            <div className="font-extrabold text-sm" style={{ color: cat.color }}>
              {cat.label}
            </div>
            <div className="text-xs text-gray-500">{patterns.length} ຮູບ ແບບ ໄວ ຍາ ກ ອ ນ</div>
          </div>
        </div>

        {/* Pattern Cards */}
        {patterns.map((p, idx) => {
          const isOpen = expanded === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
            >
              {/* Header row — always visible */}
              <button
                className="w-full px-4 py-3.5 flex items-start gap-3 text-left active:bg-gray-50"
                onClick={() => setExpanded(isOpen ? null : idx)}
              >
                {/* Form badge */}
                <div
                  className="shrink-0 rounded-xl px-3 py-1.5 text-white text-sm font-black tracking-wide mt-0.5"
                  style={{ background: cat.color }}
                >
                  {p.form}
                </div>
                {/* Meaning + expand icon */}
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gray-800 text-sm leading-snug">{p.meaning}</div>
                  {!isOpen && (
                    <div className="text-[11px] text-gray-400 mt-0.5 truncate">{p.tip}</div>
                  )}
                </div>
                <div className="shrink-0 mt-1" style={{ color: cat.color }}>
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </button>

              {/* Expanded content */}
              {isOpen && (
                <div className="border-t border-gray-100">
                  {/* Tip */}
                  <div
                    className="px-4 py-2.5 text-xs font-semibold flex items-start gap-2"
                    style={{ background: cat.bg, color: cat.color }}
                  >
                    <span className="shrink-0 mt-0.5">💬</span>
                    <span>{p.tip}</span>
                  </div>

                  {/* Examples */}
                  <div className="px-4 pb-4 pt-3 space-y-3">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      ຕົວຢ່າງປະໂຫຍກ / 예문
                    </div>
                    {p.examples.map((ex, ei) => (
                      <ExampleCard key={ei} ex={ex} color={cat.color} bg={cat.bg} idx={ei} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ExampleCard = ({ ex, color, bg, idx }) => (
  <div className="rounded-xl overflow-hidden border border-gray-100">
    <div className="px-3 py-2" style={{ background: bg }}>
      <div className="flex items-start gap-2">
        <span
          className="shrink-0 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center text-white mt-0.5"
          style={{ background: color }}
        >
          {idx + 1}
        </span>
        <div className="font-bold text-gray-800 text-sm leading-snug">{ex.kr}</div>
      </div>
    </div>
    <div className="px-3 py-2 bg-white">
      <div className="text-xs text-gray-600 leading-relaxed pl-7">{ex.lo}</div>
    </div>
  </div>
);

export default GrammarPage;
