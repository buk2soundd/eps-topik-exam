import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, X, BookOpen, Image } from 'lucide-react';
import vocabData from '../data/standardVocabData.json';

// Category display config
const CAT_CONFIG = {
  '기본생활': { label: 'ພື້ນຖານ', labelKo: '기본생활', color: '#1a3a6b', bg: '#dbeafe', border: '#93c5fd' },
  '일상생활': { label: 'ຊີວິດປະຈຳວັນ', labelKo: '일상생활', color: '#065f46', bg: '#d1fae5', border: '#6ee7b7' },
  '공공기관': { label: 'ສຳນັກງານ', labelKo: '공공기관', color: '#92400e', bg: '#fef3c7', border: '#fcd34d' },
  '한국문화': { label: 'ວັດທະນະທຳ', labelKo: '한국문화', color: '#6b21a8', bg: '#f3e8ff', border: '#d8b4fe' },
};

const imgUrl = (chapterNum, filename) =>
  `/images/std/ch${String(chapterNum).padStart(2, '0')}/${filename}`;

const StandardVocabPage = ({ onBack }) => {
  const [activeCat, setActiveCat] = useState('기본생활');
  const [activeChapter, setActiveChapter] = useState(null);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('words'); // 'words' | 'images'
  const [enlarged, setEnlarged] = useState(null);

  const categories = Object.keys(CAT_CONFIG);

  const catChapters = useMemo(
    () => vocabData.categories[activeCat] || [],
    [activeCat]
  );

  const selectedChapter = useMemo(() => {
    if (activeChapter !== null) {
      const found = catChapters.find((c) => c.chapter === activeChapter);
      if (found) return found;
    }
    return catChapters[0] || null;
  }, [activeCat, activeChapter, catChapters]);

  // Subsection grouping
  const groupedWords = useMemo(() => {
    if (!selectedChapter) return [];
    const q = search.trim().toLowerCase();
    const words = q
      ? selectedChapter.words.filter(
          (w) =>
            w.korean.toLowerCase().includes(q) ||
            w.english.toLowerCase().includes(q) ||
            (w.lao || '').toLowerCase().includes(q)
        )
      : selectedChapter.words;

    const groups = {};
    words.forEach((w) => {
      const key = w.subsection || '일반';
      if (!groups[key]) groups[key] = [];
      groups[key].push(w);
    });
    return Object.entries(groups);
  }, [selectedChapter, search]);

  const totalWords = useMemo(
    () => catChapters.reduce((s, c) => s + c.words.length, 0),
    [catChapters]
  );

  const cfg = CAT_CONFIG[activeCat];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* ── Top Bar ── */}
      <div className="text-white px-4 py-3 flex items-center gap-3 shadow-md sticky top-0 z-10"
        style={{ background: cfg.color }}>
        <button
          onClick={onBack}
          className="flex items-center gap-1 rounded-lg px-3 py-1.5 bg-white/10 hover:bg-white/20 transition-colors text-sm font-bold"
        >
          <ArrowLeft size={16} />
          ກັບຫລັງ
        </button>
        <div className="flex-1 text-center">
          <div className="font-extrabold text-lg tracking-wide">한국어 표준교재 어휘</div>
          <div className="text-xs opacity-70">EPS-TOPIK NEW 1권 · 30 ບົດ · {vocabData.meta.totalWords} ຄຳ</div>
        </div>
        <div className="text-xs bg-white/10 rounded-full px-3 py-1 font-bold">
          {selectedChapter ? selectedChapter.words.length : 0} ຄຳ
        </div>
      </div>

      {/* ── Category Tabs ── */}
      <div className="bg-white border-b border-gray-200 px-3 pt-3 pb-0">
        <div className="flex gap-1.5 overflow-x-auto pb-3 hide-scrollbar">
          {categories.map((cat) => {
            const c = CAT_CONFIG[cat];
            const active = activeCat === cat;
            return (
              <button
                key={cat}
                onClick={() => { setActiveCat(cat); setActiveChapter(null); setSearch(''); setTab('words'); }}
                className="shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all"
                style={active
                  ? { background: c.color, color: '#fff', borderColor: c.color }
                  : { background: '#fff', color: '#374151', borderColor: '#e5e7eb' }}
              >
                {c.label}
                <span className="ml-1 opacity-70 font-normal">{c.labelKo}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Chapter List ── */}
        <div className="w-36 sm:w-44 shrink-0 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
            ບົດ ({catChapters.length})
          </div>
          {catChapters.map((ch) => {
            const isActive = selectedChapter?.chapter === ch.chapter;
            return (
              <button
                key={ch.chapter}
                onClick={() => { setActiveChapter(ch.chapter); setSearch(''); setTab('words'); }}
                className="w-full text-left px-3 py-2.5 text-xs border-b border-gray-50 transition-colors"
                style={isActive
                  ? { background: cfg.bg, color: cfg.color, fontWeight: 700, borderLeft: `3px solid ${cfg.color}` }
                  : { color: '#4b5563' }}
              >
                <div className="font-bold text-[11px] opacity-60 mb-0.5">제{ch.chapter}과</div>
                <div className="leading-tight">{ch.title}</div>
                <div className="mt-0.5 text-[10px] opacity-50">{ch.words.length}ຄຳ · {ch.images.length}ຮູບ</div>
              </button>
            );
          })}
          <div className="p-3 text-center text-xs text-gray-400 border-t border-gray-100 mt-1">
            ລວມ {totalWords} ຄຳ
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedChapter ? (
            <>
              {/* Chapter Header */}
              <div className="px-4 py-3 border-b border-gray-200 bg-white">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div>
                    <span className="text-xs font-bold opacity-60 mr-2" style={{ color: cfg.color }}>
                      제{selectedChapter.chapter}과
                    </span>
                    <span className="font-extrabold text-gray-800 text-base">
                      {selectedChapter.title}
                    </span>
                    <span className="ml-2 text-xs text-gray-400">
                      {selectedChapter.words.length}ຄຳ · {selectedChapter.images.length}ຮູບ
                    </span>
                  </div>
                  {/* Word / Image tab toggle */}
                  <div className="flex rounded-lg overflow-hidden border border-gray-200 text-xs font-bold">
                    <button
                      onClick={() => setTab('words')}
                      className={`px-3 py-1.5 flex items-center gap-1 transition-colors ${tab === 'words' ? 'text-white' : 'bg-white text-gray-500'}`}
                      style={tab === 'words' ? { background: cfg.color } : {}}
                    >
                      <BookOpen size={13} /> ຄຳສັບ
                    </button>
                    <button
                      onClick={() => setTab('images')}
                      className={`px-3 py-1.5 flex items-center gap-1 transition-colors ${tab === 'images' ? 'text-white' : 'bg-white text-gray-500'}`}
                      style={tab === 'images' ? { background: cfg.color } : {}}
                    >
                      <Image size={13} /> ຮູບ ({selectedChapter.images.length})
                    </button>
                  </div>
                </div>

                {/* Search */}
                {tab === 'words' && (
                  <div className="relative mt-2">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="ຄົ້ນຫາ / 검색..."
                      className="w-full border border-gray-200 rounded-lg pl-8 pr-8 py-1.5 text-sm outline-none text-gray-700 focus:border-blue-400 transition-colors"
                    />
                    {search && (
                      <button onClick={() => setSearch('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        <X size={14} />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-3">
                {tab === 'words' ? (
                  groupedWords.length === 0 ? (
                    <div className="text-center text-gray-400 py-12 text-sm">ບໍ່ພົບຄຳສັບ</div>
                  ) : (
                    groupedWords.map(([subsection, words]) => (
                      <div key={subsection} className="mb-4">
                        {/* Sub-section header */}
                        {subsection !== '일반' && (
                          <div className="flex items-center gap-2 mb-2 px-1">
                            <div className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                              style={{ background: cfg.color }}>
                              {subsection}
                            </div>
                          </div>
                        )}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                          {words.map((w, i) => (
                            <div key={i}
                              className="bg-white rounded-xl px-3 py-2.5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                              <div className="font-extrabold text-gray-800 text-sm leading-tight">{w.korean}</div>
                              {w.lao && w.lao !== w.english && (
                                <div className="text-xs font-medium mt-0.5 leading-tight" style={{ color: '#1a3a6b' }}>{w.lao}</div>
                              )}
                              <div className="text-xs text-gray-400 mt-0.5 leading-tight">{w.english}</div>
                              <div className="text-[10px] text-gray-300 mt-1">p.{w.page_num}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )
                ) : (
                  /* Images Tab */
                  selectedChapter.images.length === 0 ? (
                    <div className="text-center text-gray-400 py-12 text-sm">ບໍ່ມີຮູບໃນບົດນີ້</div>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
                      {selectedChapter.images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setEnlarged(imgUrl(selectedChapter.chapter, img.file))}
                          className="aspect-square rounded-xl overflow-hidden border-2 border-gray-100 hover:border-blue-300 transition-all bg-gray-50 flex items-center justify-center"
                        >
                          <img
                            src={imgUrl(selectedChapter.chapter, img.file)}
                            alt={`ch${selectedChapter.chapter}_img${i}`}
                            className="w-full h-full object-contain"
                            loading="lazy"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                        </button>
                      ))}
                    </div>
                  )
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
              ເລືອກບົດຈາກລາຍການທາງຊ້າຍ
            </div>
          )}
        </div>
      </div>

      {/* Enlarged image modal */}
      {enlarged && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setEnlarged(null)}
        >
          <button
            className="absolute top-4 right-4 text-white bg-white/20 rounded-full p-2 hover:bg-white/30 transition-colors"
            onClick={() => setEnlarged(null)}
          >
            <X size={24} />
          </button>
          <img
            src={enlarged}
            alt="enlarged"
            className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default StandardVocabPage;
