import React, { useState, useMemo, useCallback } from 'react';
import { ArrowLeft, ChevronRight, ChevronLeft, RotateCcw, CheckCircle, XCircle, Trophy, BookOpen, Shuffle } from 'lucide-react';
import { INDUSTRY_CATEGORIES, INDUSTRY_QUESTIONS } from '../data/industryData';

// ── Helpers ────────────────────────────────────────────────────────────────

const INDUSTRY_COLORS = {
  metal:       { bg: '#fef2f2', border: '#fca5a5', text: '#991b1b', badge: '#dc2626' },
  electronics: { bg: '#eff6ff', border: '#93c5fd', text: '#1e40af', badge: '#2563eb' },
  food:        { bg: '#f0fdf4', border: '#86efac', text: '#166534', badge: '#16a34a' },
  machinery:   { bg: '#fff7ed', border: '#fdba74', text: '#9a3412', badge: '#ea580c' },
  pulpwood:    { bg: '#fefce8', border: '#fde047', text: '#854d0e', badge: '#ca8a04' },
  rubber:      { bg: '#fdf4ff', border: '#d8b4fe', text: '#6b21a8', badge: '#9333ea' },
  textile:     { bg: '#fdf2f8', border: '#f9a8d4', text: '#9d174d', badge: '#db2777' },
};

const SYMBOLS = ['①', '②', '③', '④'];

// Fisher-Yates shuffle seeded by index
function shuffleArray(arr, seed) {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickQuestions(industryKey, count = 20, seed = 42) {
  const bank = INDUSTRY_QUESTIONS[industryKey] || [];
  return shuffleArray(bank, seed).slice(0, Math.min(count, bank.length));
}

// ── Sub-components ─────────────────────────────────────────────────────────

function ScoreBar({ score, total }) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const passed = pct >= 60;
  return (
    <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
      <div
        className="h-3 rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, background: passed ? '#16a34a' : '#dc2626' }}
      />
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

const QUIZ_COUNT = 20;

const IndustryPage = ({ onBack }) => {
  const [activeKey, setActiveKey] = useState(null);          // selected industry
  const [quizMode, setQuizMode] = useState(false);           // false = browse, true = quiz
  const [quizSeed, setQuizSeed] = useState(1);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // idx → optIdx
  const [showResult, setShowResult] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  // Browse mode state
  const [browsePage, setBrowsePage] = useState(0);
  const [browseAns, setBrowseAns] = useState({});            // num → selected optIdx

  const BROWSE_PER_PAGE = 10;

  const activeCat = useMemo(
    () => INDUSTRY_CATEGORIES.find((c) => c.key === activeKey),
    [activeKey]
  );
  const colors = activeKey ? (INDUSTRY_COLORS[activeKey] || INDUSTRY_COLORS.metal) : {};

  // ── Start quiz ──────────────────────────────────────────────────────────
  const startQuiz = useCallback((key, seed) => {
    const qs = pickQuestions(key, QUIZ_COUNT, seed);
    setQuizQuestions(qs);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setShowResult(false);
    setReviewMode(false);
    setQuizMode(true);
  }, []);

  const handleSelectIndustry = (key) => {
    setActiveKey(key);
    setBrowsePage(0);
    setBrowseAns({});
    setQuizMode(false);
    setShowResult(false);
  };

  const handleBack = () => {
    if (reviewMode) { setReviewMode(false); setShowResult(true); return; }
    if (showResult) { setShowResult(false); setQuizMode(false); return; }
    if (quizMode) { setQuizMode(false); return; }
    if (activeKey) { setActiveKey(null); return; }
    onBack();
  };

  // ── Quiz answer ─────────────────────────────────────────────────────────
  const handleAnswer = (optIdx) => {
    if (selectedAnswers[currentIdx] !== undefined) return; // already answered
    setSelectedAnswers((prev) => ({ ...prev, [currentIdx]: optIdx }));
  };

  const handleNextQ = () => {
    if (currentIdx < quizQuestions.length - 1) setCurrentIdx((i) => i + 1);
    else setShowResult(true);
  };

  const handlePrevQ = () => {
    if (currentIdx > 0) setCurrentIdx((i) => i - 1);
  };

  const quizScore = useMemo(() => {
    return quizQuestions.reduce((acc, q, idx) => {
      return acc + (selectedAnswers[idx] === q.ans ? 1 : 0);
    }, 0);
  }, [quizQuestions, selectedAnswers]);

  // ── Browse questions ────────────────────────────────────────────────────
  const allBrowseQs = activeKey ? (INDUSTRY_QUESTIONS[activeKey] || []) : [];
  const browseStart = browsePage * BROWSE_PER_PAGE;
  const browseSlice = allBrowseQs.slice(browseStart, browseStart + BROWSE_PER_PAGE);
  const browseTotal = Math.ceil(allBrowseQs.length / BROWSE_PER_PAGE);

  // ── Render: industry selector ───────────────────────────────────────────
  if (!activeKey) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50">
        <div className="bg-[#1a3a6b] text-white px-4 py-3 flex items-center gap-3 shadow-md sticky top-0 z-10">
          <button
            onClick={onBack}
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 bg-white/10 hover:bg-white/20 transition-colors text-sm font-bold"
          >
            <ArrowLeft size={16} />
            ກັບຫລັງ
          </button>
          <div className="flex-1 text-center">
            <div className="font-extrabold text-lg">ຂໍ້ສອບ Special EPS-TOPIK</div>
            <div className="text-xs opacity-70">특별한국어능력시험 | ສາຂາອຸດສາຫາກຳ</div>
          </div>
        </div>

        <div className="p-4">
          <p className="text-center text-sm text-gray-500 mb-4">ເລືອກສາຂາອຸດສາຫາກຳ / 업종 선택</p>
          <div className="grid grid-cols-1 gap-3 max-w-lg mx-auto">
            {INDUSTRY_CATEGORIES.map((cat) => {
              const c = INDUSTRY_COLORS[cat.key] || INDUSTRY_COLORS.metal;
              const count = (INDUSTRY_QUESTIONS[cat.key] || []).length;
              return (
                <button
                  key={cat.key}
                  onClick={() => handleSelectIndustry(cat.key)}
                  className="flex items-center gap-4 rounded-2xl border-2 p-4 shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-left"
                  style={{ background: c.bg, borderColor: c.border }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-black shrink-0"
                    style={{ background: c.badge }}
                  >
                    {cat.labelKr.slice(0, 1)}
                  </div>
                  <div className="flex-1">
                    <div className="font-extrabold text-base" style={{ color: c.text }}>{cat.labelKr}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{cat.labelLo}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black text-lg" style={{ color: c.badge }}>{count}</div>
                    <div className="text-[10px] text-gray-400">ຂໍ້ສອບ</div>
                  </div>
                  <ChevronRight size={18} style={{ color: c.text }} className="shrink-0" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ── Render: Quiz result ─────────────────────────────────────────────────
  if (showResult && !reviewMode) {
    const pct = Math.round((quizScore / quizQuestions.length) * 100);
    const passed = pct >= 60;
    return (
      <div className="flex flex-col min-h-screen bg-slate-50">
        <div className="bg-[#1a3a6b] text-white px-4 py-3 flex items-center gap-3 shadow-md">
          <button onClick={handleBack} className="flex items-center gap-1 rounded-lg px-3 py-1.5 bg-white/10 hover:bg-white/20 transition-colors text-sm font-bold">
            <ArrowLeft size={16} />ກັບ
          </button>
          <div className="flex-1 text-center font-bold">ຜົນການທົດສອບ</div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6 gap-4">
          <div className={`w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-lg ${passed ? 'bg-green-100' : 'bg-red-100'}`}>
            {passed
              ? <Trophy size={36} className="text-green-600" />
              : <XCircle size={36} className="text-red-500" />
            }
          </div>
          <div className="text-center">
            <div className="text-4xl font-black" style={{ color: passed ? '#16a34a' : '#dc2626' }}>
              {quizScore}/{quizQuestions.length}
            </div>
            <div className="text-lg font-bold text-gray-600 mt-1">{pct}%</div>
            <div className={`text-sm font-bold mt-1 ${passed ? 'text-green-600' : 'text-red-500'}`}>
              {passed ? '✓ ຜ່ານ (60% ຂຶ້ນໄປ)' : '✗ ບໍ່ຜ່ານ'}
            </div>
          </div>
          <ScoreBar score={quizScore} total={quizQuestions.length} />

          <div className="flex flex-col gap-3 w-full max-w-sm mt-2">
            <button
              onClick={() => setReviewMode(true)}
              className="w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2"
              style={{ background: colors.badge || '#1a3a6b' }}
            >
              <BookOpen size={18} />ທົບທວນຄຳຕອບ
            </button>
            <button
              onClick={() => { const s = quizSeed + 1; setQuizSeed(s); startQuiz(activeKey, s); }}
              className="w-full py-3 rounded-xl font-bold border-2 flex items-center justify-center gap-2"
              style={{ borderColor: colors.badge || '#1a3a6b', color: colors.badge || '#1a3a6b' }}
            >
              <Shuffle size={18} />ທົດສອບຊຸດໃໝ່
            </button>
            <button onClick={handleBack} className="w-full py-3 rounded-xl font-bold border-2 border-gray-300 text-gray-600 flex items-center justify-center gap-2">
              <ArrowLeft size={18} />ກັບໜ້າຫລັກ
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Render: Quiz review ─────────────────────────────────────────────────
  if (reviewMode) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50">
        <div className="bg-[#1a3a6b] text-white px-4 py-3 flex items-center gap-3 shadow-md sticky top-0 z-10">
          <button onClick={handleBack} className="flex items-center gap-1 rounded-lg px-3 py-1.5 bg-white/10 hover:bg-white/20 transition-colors text-sm font-bold">
            <ArrowLeft size={16} />ກັບ
          </button>
          <div className="flex-1 text-center font-bold">ທົບທວນຄຳຕອບ — {activeCat?.labelKr}</div>
          <div className="text-sm font-black">{quizScore}/{quizQuestions.length}</div>
        </div>
        <div className="p-4 flex flex-col gap-4 max-w-2xl mx-auto w-full">
          {quizQuestions.map((q, idx) => {
            const selected = selectedAnswers[idx];
            const correct = q.ans;
            const isRight = selected === correct;
            return (
              <div key={idx} className={`rounded-2xl border-2 p-4 ${isRight ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
                <div className="flex items-start gap-2 mb-3">
                  {isRight
                    ? <CheckCircle size={18} className="text-green-600 shrink-0 mt-0.5" />
                    : <XCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                  }
                  <div className="text-sm font-bold text-gray-800">
                    <span className="text-gray-400 mr-1">Q{idx + 1}.</span>{q.q}
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 ml-6">
                  {q.opts.map((opt, oi) => {
                    let bg = 'bg-white border-gray-200 text-gray-700';
                    if (oi === correct) bg = 'bg-green-100 border-green-500 text-green-800 font-bold';
                    else if (oi === selected && !isRight) bg = 'bg-red-100 border-red-400 text-red-700 line-through';
                    return (
                      <div key={oi} className={`text-xs rounded-lg border px-3 py-2 ${bg}`}>
                        {SYMBOLS[oi]} {opt}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Render: Quiz in progress ────────────────────────────────────────────
  if (quizMode) {
    const q = quizQuestions[currentIdx];
    const selected = selectedAnswers[currentIdx];
    const answered = selected !== undefined;
    const progress = Math.round(((currentIdx + 1) / quizQuestions.length) * 100);

    return (
      <div className="flex flex-col min-h-screen bg-slate-50">
        {/* Header */}
        <div className="text-white px-4 py-3 flex items-center gap-3 shadow-md sticky top-0 z-10" style={{ background: colors.badge || '#1a3a6b' }}>
          <button onClick={handleBack} className="flex items-center gap-1 rounded-lg px-3 py-1.5 bg-white/10 hover:bg-white/20 transition-colors text-sm font-bold">
            <ArrowLeft size={16} />
          </button>
          <div className="flex-1">
            <div className="text-xs opacity-70">{activeCat?.labelKr}</div>
            <div className="text-xs font-bold">{currentIdx + 1} / {quizQuestions.length} ຂໍ້</div>
          </div>
          <div className="text-sm font-black bg-white/20 rounded-full px-3 py-1">
            ✓ {Object.values(selectedAnswers).filter((v, i) => quizQuestions[i]?.ans === v).length}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-gray-200">
          <div className="h-1.5 transition-all duration-300" style={{ width: `${progress}%`, background: colors.badge || '#1a3a6b' }} />
        </div>

        {/* Question */}
        <div className="flex-1 p-4 max-w-2xl mx-auto w-full">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
            <div className="text-xs font-bold mb-2 uppercase tracking-widest" style={{ color: colors.text }}>
              ຂໍ້ {q.num}
            </div>
            <div className="text-base font-bold text-gray-800 leading-relaxed">{q.q}</div>
          </div>

          <div className="flex flex-col gap-3">
            {q.opts.map((opt, oi) => {
              let cls = 'bg-white border-gray-200 text-gray-800 hover:border-gray-400';
              if (answered) {
                if (oi === q.ans) cls = 'bg-green-100 border-green-500 text-green-800';
                else if (oi === selected) cls = 'bg-red-100 border-red-400 text-red-700';
                else cls = 'bg-white border-gray-200 text-gray-400';
              }
              return (
                <button
                  key={oi}
                  onClick={() => handleAnswer(oi)}
                  disabled={answered}
                  className={`w-full text-left rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all flex items-center gap-3 ${cls} ${answered ? '' : 'active:scale-[0.98]'}`}
                >
                  <span className="text-lg shrink-0">{SYMBOLS[oi]}</span>
                  <span>{opt}</span>
                  {answered && oi === q.ans && <CheckCircle size={16} className="ml-auto text-green-600 shrink-0" />}
                  {answered && oi === selected && oi !== q.ans && <XCircle size={16} className="ml-auto text-red-500 shrink-0" />}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className="mt-4 flex gap-3">
              {currentIdx > 0 && (
                <button onClick={handlePrevQ} className="flex-1 py-3 rounded-xl border-2 border-gray-300 text-gray-600 font-bold flex items-center justify-center gap-2">
                  <ChevronLeft size={18} />
                </button>
              )}
              <button
                onClick={handleNextQ}
                className="flex-1 py-3 rounded-xl text-white font-bold flex items-center justify-center gap-2"
                style={{ background: colors.badge || '#1a3a6b' }}
              >
                {currentIdx < quizQuestions.length - 1 ? (
                  <><span>ຂໍ້ຕໍ່ໄປ</span><ChevronRight size={18} /></>
                ) : (
                  <><Trophy size={18} /><span>ເບິ່ງຜົນ</span></>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Render: Browse questions ────────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <div className="text-white px-4 py-3 flex items-center gap-3 shadow-md sticky top-0 z-10" style={{ background: colors.badge || '#1a3a6b' }}>
        <button onClick={handleBack} className="flex items-center gap-1 rounded-lg px-3 py-1.5 bg-white/10 hover:bg-white/20 transition-colors text-sm font-bold">
          <ArrowLeft size={16} />ກັບ
        </button>
        <div className="flex-1 text-center">
          <div className="font-extrabold text-base">{activeCat?.labelKr}</div>
          <div className="text-xs opacity-70">{activeCat?.labelLo} · {allBrowseQs.length} ຂໍ້ສອບ</div>
        </div>
        <button
          onClick={() => { const s = Math.floor(Math.random() * 99999) + 1; setQuizSeed(s); startQuiz(activeKey, s); }}
          className="flex items-center gap-1 rounded-lg px-3 py-1.5 bg-white/20 hover:bg-white/30 transition-colors text-sm font-bold"
        >
          ທົດສອບ {QUIZ_COUNT} ຂໍ້
        </button>
      </div>

      {/* Browse list */}
      <div className="flex-1 p-4 max-w-2xl mx-auto w-full">
        <div className="flex flex-col gap-4">
          {browseSlice.map((q) => {
            const userAns = browseAns[q.num];
            const answered = userAns !== undefined;
            return (
              <div key={q.num} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <div className="text-xs font-bold mb-2 uppercase tracking-widest" style={{ color: colors.text }}>
                  ຂໍ້ {q.num}
                </div>
                <div className="text-sm font-bold text-gray-800 mb-3 leading-relaxed">{q.q}</div>
                <div className="flex flex-col gap-2">
                  {q.opts.map((opt, oi) => {
                    let cls = 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-400';
                    if (answered) {
                      if (oi === q.ans) cls = 'border-green-500 bg-green-50 text-green-800 font-bold';
                      else if (oi === userAns) cls = 'border-red-400 bg-red-50 text-red-700 line-through';
                      else cls = 'border-gray-100 bg-white text-gray-400';
                    }
                    return (
                      <button
                        key={oi}
                        onClick={() => !answered && setBrowseAns((prev) => ({ ...prev, [q.num]: oi }))}
                        disabled={answered}
                        className={`w-full text-left rounded-xl border-2 px-3 py-2 text-xs transition-all flex items-center gap-2 ${cls}`}
                      >
                        <span className="text-base shrink-0">{SYMBOLS[oi]}</span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {browseTotal > 1 && (
          <div className="flex items-center justify-center gap-3 mt-6 mb-4">
            <button
              onClick={() => { setBrowsePage((p) => Math.max(0, p - 1)); setBrowseAns({}); window.scrollTo(0, 0); }}
              disabled={browsePage === 0}
              className="px-4 py-2 rounded-xl border-2 border-gray-300 text-gray-600 font-bold disabled:opacity-30"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm font-bold text-gray-600">
              {browsePage + 1} / {browseTotal}
            </span>
            <button
              onClick={() => { setBrowsePage((p) => Math.min(browseTotal - 1, p + 1)); setBrowseAns({}); window.scrollTo(0, 0); }}
              disabled={browsePage === browseTotal - 1}
              className="px-4 py-2 rounded-xl border-2 border-gray-300 text-gray-600 font-bold disabled:opacity-30"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndustryPage;
