import React from 'react';
import { ClipboardList, Clock, BookOpen, Headphones, ChevronRight, Tractor, Factory, LayoutGrid, User, Shuffle } from 'lucide-react';
import { EXAM_CATEGORIES } from '../data/examData';

const SET_COLORS = [
  '#1a3a6b', '#065f46', '#7c2d12', '#581c87', '#9f1239',
  '#0369a1', '#166534', '#92400e', '#4c1d95', '#881337',
];
const SET_BG = [
  '#dbeafe', '#d1fae5', '#ffedd5', '#ede9fe', '#ffe4e6',
  '#e0f2fe', '#dcfce7', '#fef3c7', '#f3e8ff', '#fff1f2',
];

const CATEGORY_OPTIONS = [
  {
    key: EXAM_CATEGORIES.ALL,
    label: 'ທຸກໝວດ',
    labelKo: '전체',
    desc: 'ສຸ່ມຈາກຄຳຖາມທັງໝົດ',
    icon: <LayoutGrid size={22} />,
    color: '#1a3a6b',
    bg: '#dbeafe',
    border: '#93c5fd',
  },
  {
    key: EXAM_CATEGORIES.AGRICULTURE,
    label: 'ງານກະສິກຳ',
    labelKo: '농업',
    desc: 'ເນັ້ນຂໍ້ສອບດ້ານກະສິກຳ',
    icon: <Tractor size={22} />,
    color: '#065f46',
    bg: '#d1fae5',
    border: '#6ee7b7',
  },
  {
    key: EXAM_CATEGORIES.INDUSTRY,
    label: 'ງານອຸດສາຫະກຳ',
    labelKo: '산업',
    desc: 'ເນັ້ນຂໍ້ສອບດ້ານອຸດສາຫະກຳ',
    icon: <Factory size={22} />,
    color: '#7c2d12',
    bg: '#ffedd5',
    border: '#fdba74',
  },
];

const StartScreen = ({ assignedSet, selectedCategory, onCategoryChange, examinerName, onNameChange, onStart, onReshuffle, isBlocked, blockLoading }) => {
  const cat = CATEGORY_OPTIONS.find((c) => c.key === selectedCategory) || CATEGORY_OPTIONS[0];
  const canStart = examinerName.trim().length >= 2 && !isBlocked && !blockLoading;
  // pick color from seed: colorIdx 0-9 based on last digit of seed
  const colorIdx = assignedSet % 10;
  const setColor = SET_COLORS[colorIdx];
  const setBg    = SET_BG[colorIdx];
  // Display as 6-digit code
  const setCode = String(assignedSet).padStart(6, '0');

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">

        {/* Header */}
        <div className="bg-[#1a3a6b] px-8 py-6 text-white text-center">
          <div className="text-xs tracking-[0.3em] uppercase opacity-80 mb-1">Computer-Based Test</div>
          <div className="text-3xl font-extrabold tracking-widest">EPS-TOPIK</div>
          <div className="text-sm opacity-70 mt-1">산업인력공단 한국어능력시험</div>
        </div>

        {/* ── Category Selector ── */}
        <div className="px-6 pt-5 pb-1">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 text-center">
            ເລືອກໝວດໝູ່ຂໍ້ສອບ / 시험 분야 선택
          </div>
          <div className="grid grid-cols-3 gap-2">
            {CATEGORY_OPTIONS.map((opt) => {
              const active = selectedCategory === opt.key;
              return (
                <button
                  key={opt.key}
                  onClick={() => onCategoryChange(opt.key)}
                  className="flex flex-col items-center gap-1 rounded-xl px-2 py-3 border-2 transition-all text-center"
                  style={{
                    background: active ? opt.bg : '#f9fafb',
                    borderColor: active ? opt.color : '#e5e7eb',
                    boxShadow: active ? `0 0 0 2px ${opt.border}` : 'none',
                  }}
                >
                  <span style={{ color: opt.color }}>{opt.icon}</span>
                  <span className="text-xs font-extrabold leading-tight" style={{ color: opt.color }}>
                    {opt.label}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">{opt.labelKo}</span>
                </button>
              );
            })}
          </div>
          {selectedCategory !== EXAM_CATEGORIES.ALL && (
            <p className="text-center text-[11px] mt-2 font-medium" style={{ color: cat.color }}>
              ✓ {cat.desc} — ຄຳຖາມຂອງໝວດນີ້ຈະມາກ່ອນ, ຕື່ມດ້ວຍຄຳຖາມທົ່ວໄປ
            </p>
          )}
        </div>

        {/* Set Badge */}
        <div className="flex flex-col items-center mt-4 mb-1 gap-2">
          <div
            className="flex flex-col items-center justify-center rounded-2xl px-10 py-4 shadow-md border-2"
            style={{ background: setBg, borderColor: setColor }}
          >
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: setColor }}>
              ລະຫັດຊຸດຂໍ້ສອບ (ສຸ່ມ)
            </span>
            <span className="text-3xl font-black mt-1 font-mono tracking-widest" style={{ color: setColor }}>
              #{setCode}
            </span>
            <span className="text-xs font-medium mt-1 opacity-70" style={{ color: setColor }}>
              ແຕ່ລະລະຫັດ = ຊຸດຂໍ້ສອບທີ່ແຕກຕ່າງກັນ
            </span>
          </div>
          <button
            onClick={onReshuffle}
            className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full border-2 transition-all hover:opacity-80 active:scale-95"
            style={{ borderColor: setColor, color: setColor, background: setBg }}
          >
            <Shuffle size={13} />
            ສຸ່ມລະຫັດໃໝ່
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mb-3">
          ລະຫັດ 1–999,999 ທຳໃຫ້ແຕ່ລະຄົນໄດ້ຂໍ້ສອບ ແລະ ລຳດັບຕົວເລືອກທີ່ຕ່າງກັນ
        </p>

        {/* Exam Info */}
        <div className="px-6 pb-2">
          <div className="grid grid-cols-2 gap-3">
            <InfoCard icon={<ClipboardList size={18} />} label="ຈຳນວນຂໍ້" value="40 ຂໍ້" />
            <InfoCard icon={<Clock size={18} />} label="ເວລາສອບ" value="40 ນາທີ" />
            <InfoCard icon={<BookOpen size={18} />} label="ອ່ານ (Reading)" value="ຂໍ້ 1–20" />
            <InfoCard icon={<Headphones size={18} />} label="ຟັງ (Listening)" value="ຂໍ້ 21–40" />
          </div>
        </div>

        {/* Listening notice */}
        <div className="mx-6 mt-3 bg-amber-50 border border-amber-300 rounded-xl p-3 text-xs text-amber-800">
          <div className="font-bold mb-1">📢 ສ່ວນການຟັງ (ຂໍ້ 21–40)</div>
          <ul className="list-disc list-inside space-y-0.5 text-amber-700">
            <li>ລະບົບຈະຫຼິ້ນສຽງອັດຕະໂນມັດ <strong>2 ຄັ້ງ</strong> ຕໍ່ຂໍ້</li>
            <li>ຫຼັງຫຼິ້ນຄົບ, ລະບົບຈະ<strong>ຂ້າມໄປຂໍ້ຕໍ່ໄປເອງ</strong></li>
            <li>ກະລຸນາກຽມຫູຟັງໃຫ້ພ້ອມ</li>
          </ul>
        </div>

        {/* Scoring */}
        <div className="mx-6 mt-3 bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-800">
          <span className="font-bold">ຄະແນນ:</span> ຂໍ້ລະ 5 ຄະແນນ | ລວມ 200 ຄະແນນ | ເກດຜ່ານ 120 ຄະແນນ
        </div>

        {/* Name Input */}
        <div className="px-6 mt-3 mb-1">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
            ຊື່-ນາມສະກຸນ ຜູ້ສອບ
          </label>
          <div className="relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={examinerName}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="ໃສ່ຊື່-ນາມສະກຸນ (ຢ່າງໜ້ອຍ 2 ຕົວ)"
              maxLength={60}
              className="w-full border-2 border-gray-200 focus:border-[#1a3a6b] rounded-xl pl-9 pr-4 py-3 text-sm outline-none text-gray-700 transition-colors"
            />
          </div>
          {!canStart && examinerName.length > 0 && !isBlocked && !blockLoading && (
            <p className="text-xs text-red-400 mt-1">ກະລຸນາໃສ່ຊື່ຢ່າງໜ້ອຍ 2 ຕົວອັກສອນ</p>
          )}
          {isBlocked && (
            <div className="mt-2 bg-red-50 border border-red-300 rounded-xl p-3 text-xs text-red-700">
              <div className="font-bold mb-0.5">🚫 ຊື່ນີ້ໄດ້ທຳການສອບແລ້ວ</div>
              <div>ກະລຸນາຕິດຕໍ່ Admin ເພື່ອປົດລັອກ ແລ້ວລອງໃໝ່</div>
            </div>
          )}
        </div>

        {/* Start Button */}
        <div className="px-6 mt-5 mb-6">
          <button
            onClick={onStart}
            disabled={!canStart}
            className="w-full hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold py-4 rounded-xl text-lg tracking-widest uppercase transition-all shadow-lg flex items-center justify-center gap-2"
            style={{ background: cat.color }}
          >
            {blockLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                ກຳລັງກວດສອບ...
              </>
            ) : (
              <>
                เริ่มสอบ
                <ChevronRight size={22} />
              </>
            )}
          </button>
          <p className="text-center text-xs text-gray-400 mt-2">
            시작 버튼을 누르면 타이머가 작동합니다
          </p>
        </div>

      </div>
    </div>
  );
};

const InfoCard = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 border border-gray-200">
    <span className="text-[#1a3a6b]">{icon}</span>
    <div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="font-bold text-gray-800 text-sm">{value}</div>
    </div>
  </div>
);

export default StartScreen;
