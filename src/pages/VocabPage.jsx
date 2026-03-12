import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, BookOpen, X } from 'lucide-react';
import { VOCAB_CHAPTERS, VOCAB_CATEGORIES, VOCAB_WORD_PAIRS } from '../data/vocabData';

const VocabPage = ({ onBack }) => {
  const [activeCat, setActiveCat] = useState(Object.keys(VOCAB_CATEGORIES)[0]);
  const [activeChapter, setActiveChapter] = useState(null);
  const [search, setSearch] = useState('');
  const [enlarged, setEnlarged] = useState(null); // { word, meaning, img }

  const isPairsMode = activeCat === 'word_pairs';

  const catChapters = useMemo(() => {
    if (isPairsMode) return [];
    const cat = VOCAB_CATEGORIES[activeCat];
    return VOCAB_CHAPTERS.filter((ch) => cat.chapters.includes(ch.chapter));
  }, [activeCat, isPairsMode]);

  // Auto-select first chapter when category changes
  const selectedChapter = useMemo(() => {
    if (activeChapter && catChapters.find((c) => c.chapter === activeChapter)) {
      return catChapters.find((c) => c.chapter === activeChapter);
    }
    return catChapters[0] || null;
  }, [activeCat, activeChapter, catChapters]);

  const displayedWords = useMemo(() => {
    if (!selectedChapter) return [];
    const q = search.trim().toLowerCase();
    if (!q) return selectedChapter.words;
    return selectedChapter.words.filter(
      (w) =>
        w.word.toLowerCase().includes(q) ||
        w.meaning.toLowerCase().includes(q)
    );
  }, [selectedChapter, search]);

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
          <div className="font-extrabold text-lg tracking-wide">ຄຳສັບ EPS-TOPIK</div>
          <div className="text-xs opacity-70">어휘 사전 | Book 1–2 Ch.06–59</div>
        </div>
        <div className="text-xs bg-white/10 rounded-full px-3 py-1 font-bold">
          {isPairsMode
            ? `${VOCAB_WORD_PAIRS.reduce((s, g) => s + g.pairs.length, 0)} ຄູ່`
            : `${selectedChapter ? selectedChapter.words.length : 0} ຄຳ`}
        </div>
      </div>

      {/* ── Category Tabs ── */}
      <div className="bg-white border-b border-gray-200 px-3 pt-3 pb-0">
        <div className="flex gap-1.5 overflow-x-auto pb-3 hide-scrollbar">
          {Object.entries(VOCAB_CATEGORIES).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => { setActiveCat(key); setActiveChapter(null); setSearch(''); }}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${
                activeCat === key
                  ? key === 'word_pairs'
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-[#1a3a6b] text-white border-[#1a3a6b]'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#1a3a6b]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {isPairsMode ? (
        /* ── Pairs Mode ── */
        <div className="flex-1 p-3 space-y-4">
          {VOCAB_WORD_PAIRS.map((group, gi) => (
            <div key={gi} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className={`px-4 py-2.5 ${group.pairs[0]?.type === 'synonym' ? 'bg-purple-50 border-b border-purple-100' : 'bg-blue-50 border-b border-blue-100'}`}>
                <div className={`font-extrabold text-sm ${group.pairs[0]?.type === 'synonym' ? 'text-purple-700' : 'text-[#1a3a6b]'}`}>
                  {group.group}
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {group.pairs.map((pair, pi) => (
                  <PairCard key={pi} pair={pair} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ── Normal Chapter Mode ── */
        <>
          {/* ── Chapter Selector ── */}
          <div className="bg-white border-b border-gray-100 px-3 py-2">
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              {catChapters.map((ch) => {
                const isActive = selectedChapter?.chapter === ch.chapter;
                return (
                  <button
                    key={ch.chapter}
                    onClick={() => { setActiveChapter(ch.chapter); setSearch(''); }}
                    className={`shrink-0 flex flex-col items-center px-3 py-2 rounded-xl border-2 transition-all min-w-[80px] ${
                      isActive
                        ? 'bg-blue-50 border-[#1a3a6b] text-[#1a3a6b]'
                        : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-400'
                    }`}
                  >
                    <span className={`text-[10px] font-bold ${isActive ? 'text-[#1a3a6b]' : 'text-gray-400'}`}>
                      Ch.{ch.chapter}
                    </span>
                    <span className="text-[11px] font-bold text-center leading-tight mt-0.5">
                      {ch.titleKr}
                    </span>
                    <span className="text-[9px] text-gray-400 mt-0.5">{ch.words.length} ຄຳ</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Search Bar ── */}
          <div className="px-4 py-3 bg-white border-b border-gray-100">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ຄົ້ນຫາຄຳສັບ… / 단어 검색…"
                className="w-full border border-gray-200 rounded-xl pl-9 pr-9 py-2 text-sm outline-none focus:border-[#1a3a6b] bg-gray-50"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* ── Chapter Title ── */}
          {selectedChapter && (
            <div className="px-4 py-2 bg-blue-50 border-b border-blue-100">
              <div className="font-bold text-[#1a3a6b] text-sm">{selectedChapter.titleKr}</div>
              <div className="text-xs text-blue-500">{selectedChapter.titleLo}</div>
            </div>
          )}

          {/* ── Word Grid ── */}
          <div className="flex-1 p-3">
            {displayedWords.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <BookOpen size={40} className="mx-auto mb-3 opacity-40" />
                <div className="text-sm">ບໍ່ພົບຄຳສັບ</div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {displayedWords.map((word, idx) => (
                  <VocabCard
                    key={idx}
                    word={word}
                    onClick={() => setEnlarged(word)}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* ── Enlarged Card Modal ── */}
      {enlarged && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6"
          onClick={() => setEnlarged(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-xs w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {enlarged.img ? (
                <img
                  src={enlarged.img}
                  alt={enlarged.word}
                  className="w-full aspect-square object-cover bg-gray-100"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : (
                <div className="w-full aspect-square bg-blue-50 flex items-center justify-center">
                  <BookOpen size={48} className="text-blue-200" />
                </div>
              )}
              <button
                onClick={() => setEnlarged(null)}
                className="absolute top-2 right-2 bg-black/40 text-white rounded-full p-1 hover:bg-black/60"
              >
                <X size={18} />
              </button>
            </div>
            <div className="px-6 py-4 text-center">
              <div className="text-2xl font-black text-[#1a3a6b] mb-1">{enlarged.word}</div>
              {enlarged.meaning && (
                <div className="text-base text-gray-600">{enlarged.meaning}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PairCard = ({ pair }) => {
  const isAntonym = pair.type === 'antonym';
  return (
    <div className="flex items-stretch px-3 py-3 gap-2">
      <div className={`flex-1 rounded-xl px-3 py-2.5 text-center ${isAntonym ? 'bg-blue-50 border border-blue-100' : 'bg-purple-50 border border-purple-100'}`}>
        <div className={`text-sm font-extrabold ${isAntonym ? 'text-blue-800' : 'text-purple-800'}`}>{pair.word1}</div>
        <div className="text-[11px] text-gray-500 mt-0.5">{pair.meaning1}</div>
      </div>
      <div className="flex items-center justify-center w-8 shrink-0">
        <span className={`text-lg font-black ${isAntonym ? 'text-red-400' : 'text-purple-400'}`}>
          {isAntonym ? '↔' : '≈'}
        </span>
      </div>
      <div className={`flex-1 rounded-xl px-3 py-2.5 text-center ${isAntonym ? 'bg-blue-50 border border-blue-100' : 'bg-purple-50 border border-purple-100'}`}>
        <div className={`text-sm font-extrabold ${isAntonym ? 'text-blue-800' : 'text-purple-800'}`}>{pair.word2}</div>
        <div className="text-[11px] text-gray-500 mt-0.5">{pair.meaning2}</div>
      </div>
    </div>
  );
};

const VocabCard = ({ word, onClick }) => {
  const [imgError, setImgError] = useState(false);
  const hasImage = word.img && !imgError;

  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md hover:border-[#1a3a6b] transition-all active:scale-95 text-left"
    >
      {hasImage ? (
        <img
          src={word.img}
          alt={word.word}
          className="w-full aspect-square object-cover bg-gray-100"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full aspect-square bg-blue-50 flex items-center justify-center">
          <BookOpen size={28} className="text-blue-200" />
        </div>
      )}
      <div className="px-2 py-2">
        <div className="text-xs font-black text-[#1a3a6b] leading-tight">{word.word}</div>
        {word.meaning && (
          <div className="text-[10px] text-gray-500 leading-tight mt-0.5 line-clamp-2">
            {word.meaning}
          </div>
        )}
      </div>
    </button>
  );
};

export default VocabPage;
