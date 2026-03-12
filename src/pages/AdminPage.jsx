import React, { useState, useEffect, useMemo } from 'react';
import {
  Eye, EyeOff, Download, Trash2, BarChart3, Users,
  Award, Clock, RefreshCw, Lock, ChevronLeft, Search,
  CheckCircle, XCircle, BookOpen, Headphones,
  Plus, Edit3, X, ChevronDown, ChevronUp, Database,
  Settings, Wifi, WifiOff, Copy, RotateCcw, Save,
} from 'lucide-react';
import { getExamResults, deleteExamResult, testApiConnection } from '../lib/db';
import { readingBank, listeningBank, EXAM_SECTIONS } from '../data/examData';
import {
  getOverrides, saveOverride, clearOverride,
  getCustomQuestions, addCustomQuestion, updateCustomQuestion, deleteCustomQuestion,
} from '../lib/questionStore';
import { getSettings, saveSettings, resetSettings, SETTING_DEFAULTS } from '../lib/settings';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin1234';
const STORAGE_KEY = 'epsAdminLogged';

// ─── helpers ──────────────────────────────────────────────────────────────────
function fmtTime(sec) {
  if (!sec && sec !== 0) return '—';
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function fmtDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('th-TH', { day: '2-digit', month: '2-digit', year: '2-digit' })
    + ' ' + d.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
}

function exportCSV(rows) {
  const headers = ['ຊື່-ນາມສະກຸນ', 'ຄະແນນລວມ', 'ການອ່ານ', 'ການຟັງ', 'ຜົນ', 'ເວລາທີ່ໃຊ້', 'ຊຸດ', 'ໝວດ', 'ວັນທີ'];
  const lines = [
    headers.join(','),
    ...rows.map((r) => [
      `"${r.examiner_name}"`,
      r.total_score,
      r.reading_score,
      r.listening_score,
      r.passed ? 'ຜ່ານ' : 'ບໍ່ຜ່ານ',
      fmtTime(r.time_taken_sec),
      r.exam_set ?? '',
      r.category ?? '',
      fmtDate(r.created_at),
    ].join(',')),
  ];
  const blob = new Blob(['\uFEFF' + lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `eps-results-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Score histogram buckets ──────────────────────────────────────────────────
const BUCKETS = [
  { label: '0–39', min: 0, max: 39, color: '#ef4444' },
  { label: '40–79', min: 40, max: 79, color: '#f97316' },
  { label: '80–119', min: 80, max: 119, color: '#eab308' },
  { label: '120–159', min: 120, max: 159, color: '#22c55e' },
  { label: '160–200', min: 160, max: 200, color: '#1a3a6b' },
];

// ─── Login Screen ────────────────────────────────────────────────────────────
const LoginScreen = ({ onLogin }) => {
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [err, setErr] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, '1');
      onLogin();
    } else {
      setErr('ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ');
      setPw('');
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-800 to-[#1a3a6b] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#1a3a6b] rounded-full p-4 mb-4">
            <Lock size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-800">Admin Panel</h1>
          <p className="text-sm text-gray-500 mt-1">EPS-TOPIK Mock Exam</p>
        </div>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              value={pw}
              onChange={(e) => { setPw(e.target.value); setErr(''); }}
              placeholder="ລະຫັດຜ່ານ Admin"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 outline-none focus:border-[#1a3a6b] text-gray-700"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {err && <p className="text-red-500 text-sm text-center">{err}</p>}
          <button
            type="submit"
            className="bg-[#1a3a6b] hover:bg-blue-900 text-white font-bold py-3 rounded-xl transition-colors"
          >
            ເຂົ້າສູ່ລະບົບ
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-6">
          <a href="/" className="hover:text-blue-600 underline">← ກັບໄປໜ້າຫຼັກ</a>
        </p>
      </div>
    </div>
  );
};

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ icon, label, value, sub, color = '#1a3a6b' }) => (
  <div className="bg-white rounded-2xl shadow p-5 flex items-center gap-4 border border-gray-100">
    <div className="rounded-xl p-3 shrink-0" style={{ background: color + '18' }}>
      <span style={{ color }}>{icon}</span>
    </div>
    <div>
      <div className="text-xs text-gray-500 font-medium">{label}</div>
      <div className="text-2xl font-black text-gray-800">{value}</div>
      {sub && <div className="text-xs text-gray-400">{sub}</div>}
    </div>
  </div>
);

// ─── Question Manager Tab ────────────────────────────────────────────────────
const BLANK_FORM = {
  section: EXAM_SECTIONS.READING,
  groupLabel: '',
  questionText: '',
  options: ['', '', '', ''],
  correctIndex: 0,
  explanation: '',
  audioScript: '',
};

const SYMS = ['①', '②', '③', '④'];

const QuestionsTab = () => {
  const [secFilter, setSecFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(BLANK_FORM);
  const [customs, setCustoms] = useState(() => getCustomQuestions());
  const [overrides, setOverrides] = useState(() => getOverrides());

  const allBase = useMemo(() => [
    ...readingBank.map((q) => ({ ...q })),
    ...listeningBank.map((q) => ({ ...q })),
  ], []);

  const allQuestions = useMemo(() => {
    const base = allBase.map((q) =>
      overrides[q.bankId] ? { ...q, ...overrides[q.bankId], _edited: true } : q
    );
    return [...base, ...customs];
  }, [allBase, customs, overrides]);

  const filtered = useMemo(() => {
    return allQuestions.filter((q) => {
      if (secFilter !== 'ALL' && q.section !== secFilter) return false;
      const t = search.toLowerCase();
      if (t && !q.bankId?.toLowerCase().includes(t) &&
          !q.questionText?.toLowerCase().includes(t) &&
          !q.groupLabel?.toLowerCase().includes(t)) return false;
      return true;
    });
  }, [allQuestions, secFilter, search]);

  const openEdit = (q) => {
    setForm({
      section: q.section,
      groupLabel: q.groupLabel || '',
      questionText: q.questionText || '',
      options: q.options ? q.options.map((o) => o.replace(/^[①②③④]\s?/, '')) : ['', '', '', ''],
      correctIndex: q.correctIndex ?? 0,
      explanation: q.explanation || '',
      audioScript: q.audioScript || '',
    });
    setEditTarget({ bankId: q.bankId, isCustom: !!q._custom });
    setShowForm(true);
  };

  const openNew = () => {
    setForm(BLANK_FORM);
    setEditTarget(null);
    setShowForm(true);
  };

  const handleSave = () => {
    const built = {
      ...form,
      options: form.options.map((o, i) => `${SYMS[i]} ${o.trim()}`),
    };
    if (editTarget) {
      if (editTarget.isCustom) {
        updateCustomQuestion(editTarget.bankId, built);
        setCustoms(getCustomQuestions());
      } else {
        saveOverride(editTarget.bankId, built);
        setOverrides(getOverrides());
      }
    } else {
      addCustomQuestion(built);
      setCustoms(getCustomQuestions());
    }
    setShowForm(false);
  };

  const handleDelete = (q) => {
    if (!window.confirm(`ລຶບຂໍ້ສອບ ${q.bankId}?`)) return;
    if (q._custom) {
      deleteCustomQuestion(q.bankId);
      setCustoms(getCustomQuestions());
    } else {
      clearOverride(q.bankId);
      setOverrides(getOverrides());
    }
    setExpanded(null);
  };

  const formValid = form.questionText.trim() && form.options.every((o) => o.trim());

  // Export all listening questions (base overrides + custom) → JSON for audio generation
  const handleExportForTTS = () => {
    const listeningAll = allQuestions.filter(
      (q) => q.section === EXAM_SECTIONS.LISTENING && q.audioScript
    );
    const payload = listeningAll.map((q) => ({
      bankId: q.bankId,
      audioScript: q.audioScript,
    }));
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'custom_audio_scripts.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* Section filter */}
        <div className="flex rounded-xl border border-gray-200 overflow-hidden text-sm">
          {['ALL', EXAM_SECTIONS.READING, EXAM_SECTIONS.LISTENING].map((s) => (
            <button key={s} onClick={() => setSecFilter(s)}
              className={`px-3 py-2 font-semibold transition-colors ${
                secFilter === s ? 'bg-[#1a3a6b] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {s === 'ALL' ? 'ທັງໝົດ' : s === EXAM_SECTIONS.READING ? '📖 ອ່ານ' : '🎧 ຟັງ'}
            </button>
          ))}
        </div>
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="ຄົ້ນຫາ bankId / ຄຳຖາມ..."
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#1a3a6b]"
          />
        </div>
        {/* Add button */}
        <button onClick={openNew}
          className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus size={16} /> ເພີ່ມຂໍ້ສອບ
        </button>
        {/* Export for TTS */}
        <button onClick={handleExportForTTS}
          title="ດາວໂຫລດ JSON ສຳລັບ generate MP3"
          className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
        >
          <Download size={16} /> Export MP3
        </button>
      </div>

      {/* Stats row */}
      <p className="text-xs text-gray-400 mb-3">
        ສະແດງ <b className="text-gray-600">{filtered.length}</b> / {allQuestions.length} ຂໍ້
        &nbsp;·&nbsp; base {allBase.length} &nbsp;·&nbsp;
        <span className="text-green-600 font-semibold">custom {customs.length}</span>
        &nbsp;·&nbsp;
        <span className="text-amber-600 font-semibold">edited {Object.keys(overrides).length}</span>
      </p>

      {/* Question list */}
      <div className="flex flex-col gap-2">
        {filtered.map((q) => {
          const isExp = expanded === q.bankId;
          const badgeCls = q.section === EXAM_SECTIONS.READING
            ? 'bg-blue-100 text-blue-700'
            : 'bg-purple-100 text-purple-700';
          return (
            <div key={q.bankId} className={`bg-white rounded-xl border-2 shadow-sm ${
              q._custom ? 'border-green-200' : q._edited ? 'border-amber-200' : 'border-gray-100'
            }`}>
              {/* Header */}
              <div
                className="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-50 rounded-xl"
                onClick={() => setExpanded(isExp ? null : q.bankId)}
              >
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${badgeCls}`}>
                  {q.bankId}
                </span>
                {q._custom && (
                  <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold shrink-0">NEW</span>
                )}
                {q._edited && !q._custom && (
                  <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold shrink-0">EDITED</span>
                )}
                <span className="flex-1 text-sm text-gray-700 truncate">{q.questionText}</span>
                <span className="text-gray-400 shrink-0">
                  {isExp ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </span>
              </div>
              {/* Expanded detail */}
              {isExp && (
                <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                  {q.groupLabel && (
                    <p className="text-xs text-gray-500 bg-gray-50 rounded px-2 py-1 mb-2">{q.groupLabel}</p>
                  )}
                  <p className="text-sm text-gray-800 font-medium mb-3 whitespace-pre-wrap">{q.questionText}</p>
                  {/* Options */}
                  <div className="flex flex-col gap-1 mb-3">
                    {q.options?.map((opt, i) => (
                      <div key={i} className={`text-sm px-2 py-1 rounded ${
                        i === q.correctIndex ? 'bg-green-50 text-green-800 font-semibold' : 'text-gray-600'
                      }`}>
                        {i === q.correctIndex ? '✅ ' : ''}{opt}
                      </div>
                    ))}
                  </div>
                  {q.explanation && (
                    <p className="text-xs text-blue-700 bg-blue-50 rounded px-2 py-1 mb-2">💡 {q.explanation}</p>
                  )}
                  {q.audioScript && (
                    <p className="text-xs text-purple-700 bg-purple-50 rounded px-2 py-1 mb-3 whitespace-pre-wrap font-mono">
                      🎙️ {q.audioScript}
                    </p>
                  )}
                  {/* Action buttons */}
                  <div className="flex gap-2 mt-1">
                    <button onClick={() => openEdit(q)}
                      className="flex items-center gap-1 text-xs bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded-lg font-semibold transition-colors"
                    >
                      <Edit3 size={13} /> ແກ້ໄຂ
                    </button>
                    {q._edited && !q._custom && (
                      <button onClick={() => handleDelete(q)}
                        className="text-xs text-gray-500 hover:text-gray-700 border border-gray-200 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        ↩ ກັບຄືນຕົ້ນສະບັບ
                      </button>
                    )}
                    {q._custom && (
                      <button onClick={() => handleDelete(q)}
                        className="flex items-center gap-1 text-xs bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Trash2 size={13} /> ລຶບ
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">ບໍ່ພົບຂໍ້ສອບ</div>
        )}
      </div>

      {/* ─── Edit / Add Modal ───────────────────────────────────────────── */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="font-bold text-gray-800 text-base">
                {editTarget ? `ແກ້ໄຂ — ${editTarget.bankId}` : '➕ ເພີ່ມຂໍ້ສອບໃໝ່'}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="px-6 py-5 flex flex-col gap-4">
              {/* Section */}
              <div>
                <label className="text-xs font-bold text-gray-600 mb-1.5 block">ໝວດ (Section)</label>
                <div className="flex gap-2">
                  {[EXAM_SECTIONS.READING, EXAM_SECTIONS.LISTENING].map((s) => (
                    <button key={s} onClick={() => setForm((f) => ({ ...f, section: s }))}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${
                        form.section === s ? 'border-[#1a3a6b] bg-blue-50 text-[#1a3a6b]' : 'border-gray-200 text-gray-500 hover:border-gray-300'
                      }`}
                    >
                      {s === EXAM_SECTIONS.READING ? '📖 ການອ່ານ' : '🎧 ການຟັງ'}
                    </button>
                  ))}
                </div>
              </div>
              {/* Group Label */}
              <div>
                <label className="text-xs font-bold text-gray-600 mb-1 block">Group Label</label>
                <input value={form.groupLabel}
                  onChange={(e) => setForm((f) => ({ ...f, groupLabel: e.target.value }))}
                  placeholder="[문제 유형: ...]  ที่แสดงเหนือคำถาม"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1a3a6b]"
                />
              </div>
              {/* Question Text */}
              <div>
                <label className="text-xs font-bold text-gray-600 mb-1 block">ຄຳຖາມ *</label>
                <textarea value={form.questionText}
                  onChange={(e) => setForm((f) => ({ ...f, questionText: e.target.value }))}
                  rows={3} placeholder="ຂຽນຄຳຖາມທີ່ນີ..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1a3a6b] resize-none"
                />
              </div>
              {/* Options */}
              <div>
                <label className="text-xs font-bold text-gray-600 mb-1.5 block">
                  ຕົວເລືອກ * &nbsp;<span className="text-gray-400 font-normal">(ກົດ ⚪ ໝາຍຄຳຕອບທີ່ຖືກ)</span>
                </label>
                {form.options.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <button
                      onClick={() => setForm((f) => ({ ...f, correctIndex: i }))}
                      className={`w-7 h-7 shrink-0 rounded-full text-sm border-2 flex items-center justify-center transition-all ${
                        form.correctIndex === i
                          ? 'border-green-500 bg-green-500 text-white font-bold'
                          : 'border-gray-300 text-gray-400 hover:border-green-400'
                      }`}
                      title="ໝາຍເປັນຄຳຕອບທີ່ຖືກ"
                    >
                      {form.correctIndex === i ? '✓' : SYMS[i]}
                    </button>
                    <input value={opt}
                      onChange={(e) => setForm((f) => ({
                        ...f,
                        options: f.options.map((o, j) => j === i ? e.target.value : o),
                      }))}
                      placeholder={`ຕົວເລືອກ ${SYMS[i]}...`}
                      className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#1a3a6b]"
                    />
                  </div>
                ))}
              </div>
              {/* Explanation */}
              <div>
                <label className="text-xs font-bold text-gray-600 mb-1 block">ຄຳອະທິບາຍ (ສະແດງຫຼັງສອບ)</label>
                <textarea value={form.explanation}
                  onChange={(e) => setForm((f) => ({ ...f, explanation: e.target.value }))}
                  rows={2} placeholder="ອະທິບາຍຄຳຕອບ..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1a3a6b] resize-none"
                />
              </div>
              {/* Audio Script (listening only) */}
              {form.section === EXAM_SECTIONS.LISTENING && (
                <div>
                  <label className="text-xs font-bold text-gray-600 mb-1 block">
                    🎙️ Script ສຽງ &nbsp;
                    <span className="text-gray-400 font-normal">남자: ... 여자: ... ຫຼື 방송: ...</span>
                  </label>
                  <textarea value={form.audioScript}
                    onChange={(e) => setForm((f) => ({ ...f, audioScript: e.target.value }))}
                    rows={5} placeholder={`남자: xxxxxxxx 여자: xxxxxxxx`}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1a3a6b] resize-none font-mono"
                  />
                </div>
              )}
              {/* Buttons */}
              <div className="flex gap-3 pt-1">
                <button onClick={handleSave} disabled={!formValid}
                  className="flex-1 bg-[#1a3a6b] hover:bg-blue-900 disabled:opacity-40 text-white py-2.5 rounded-xl font-bold text-sm transition-colors"
                >
                  💾 ບັນທຶກ
                </button>
                <button onClick={() => setShowForm(false)}
                  className="px-6 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  ຍົກເລີກ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Database Tab ──────────────────────────────────────────────────────────
const DatabaseTab = () => {
  const [status, setStatus] = useState(null); // null | {ok, message}
  const [testing, setTesting] = useState(false);
  const settings = getSettings();
  const schema = `CREATE TABLE IF NOT EXISTS \`exam_results\` (
  \`id\`              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`created_at\`      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`examiner_name\`   VARCHAR(100) NOT NULL DEFAULT 'ຜູ້ສອບ',
  \`total_score\`     SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  \`reading_score\`   TINYINT UNSIGNED NOT NULL DEFAULT 0,
  \`listening_score\` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  \`passed\`          TINYINT(1) NOT NULL DEFAULT 0,
  \`time_taken_sec\`  SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  \`exam_set\`        VARCHAR(50) DEFAULT NULL,
  \`category\`        VARCHAR(50) NOT NULL DEFAULT 'ALL',
  INDEX \`idx_name\` (\`examiner_name\`),
  INDEX \`idx_date\` (\`created_at\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`;

  const handleTest = async () => {
    setTesting(true);
    const result = await testApiConnection();
    setStatus(result);
    setTesting(false);
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text).then(() => alert('คัดลอกแล้ว ✓'));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Connection Test */}
      <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
        <h2 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
          <Wifi size={18} className="text-[#1a3a6b]" /> ทดสอบการเชื่อมต่อ PHP API
        </h2>
        <div className="flex items-center gap-3 mb-3">
          <code className="flex-1 bg-gray-100 text-sm px-3 py-2 rounded-lg text-gray-700 font-mono truncate">
            {settings.apiBase}/get_results.php
          </code>
          <button
            onClick={handleTest}
            disabled={testing}
            className="flex items-center gap-2 bg-[#1a3a6b] hover:bg-blue-900 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors"
          >
            {testing ? <RefreshCw size={15} className="animate-spin" /> : <Wifi size={15} />}
            ทดสอบ
          </button>
        </div>
        {status && (
          <div className={`flex items-center gap-2 text-sm font-semibold px-4 py-3 rounded-xl ${
            status.ok ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {status.ok ? <CheckCircle size={16} /> : <WifiOff size={16} />}
            {status.message}
          </div>
        )}
      </div>

      {/* Setup Guide */}
      <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
        <h2 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
          <Database size={18} className="text-[#1a3a6b]" /> วิธีตั้งค่า MySQL บน cPanel (hostatom)
        </h2>
        <ol className="space-y-3 text-sm text-gray-600">
          {[
            'เข้า cPanel → MySQL Databases → สร้าง Database ใหม่ และ User',
            'กำหนดสิทธิ์ ALL PRIVILEGES ให้ User กับ Database นั้น',
            'เปิด phpMyAdmin → เลือก Database → แท็บ SQL → วาง SQL ด้านล่าง → กด Go',
            'แก้ไข api/config.php → ใส่ DB_NAME, DB_USER, DB_PASS, API_SECRET',
            'อัปโหลดโฟลเดอร์ dist/ และ api/ ขึ้น public_html/ ของ hostatom',
            'ใส่ API Secret ใน Admin → การตั้งค่า → API Secret (ต้องตรงกับ config.php)',
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="shrink-0 w-6 h-6 bg-[#1a3a6b] text-white rounded-full text-xs flex items-center justify-center font-bold">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* MySQL Schema */}
      <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-gray-700 flex items-center gap-2">
            <Database size={18} className="text-purple-600" /> MySQL Schema (วาง phpMyAdmin)
          </h2>
          <button
            onClick={() => copyText(schema)}
            className="flex items-center gap-1.5 text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 px-3 py-1.5 rounded-lg font-semibold transition-colors"
          >
            <Copy size={13} /> คัดลอก SQL
          </button>
        </div>
        <pre className="bg-gray-900 text-green-400 text-xs p-4 rounded-xl overflow-x-auto leading-relaxed font-mono">
          {schema}
        </pre>
      </div>

      {/* Upload guide */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-800">
        <p className="font-bold mb-2">📁 โครงสร้างไฟล์ที่ต้องอัปโหลดขึ้น public_html/</p>
        <pre className="font-mono text-xs leading-relaxed">
{`public_html/
  index.html          ← จากโฟลเดอร์ dist/
  assets/             ← จากโฟลเดอร์ dist/assets/
  api/
    config.php        ← แก้ไข DB credentials ก่อน
    save_result.php
    get_results.php
    check_name.php
    delete_result.php
    .htaccess`}
        </pre>
      </div>
    </div>
  );
};

// ─── Settings Tab ──────────────────────────────────────────────────────────
const SettingsTab = () => {
  const [form, setForm] = useState(() => getSettings());
  const [saved, setSaved] = useState(false);

  const durationOptions = [
    { label: '20 ນາທີ (ຝຶກ)', value: 1200 },
    { label: '30 ນາທີ', value: 1800 },
    { label: '40 ນາທີ (ມາດຕະຖານ)', value: 2400 },
    { label: '50 ນາທີ', value: 3000 },
    { label: '60 ນາທີ', value: 3600 },
  ];

  const handleSave = () => {
    saveSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (!window.confirm('รีเซ็ตการตั้งค่าทั้งหมดเป็นค่าเริ่มต้น?')) return;
    resetSettings();
    setForm(getSettings());
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-5">
      {/* Exam Duration */}
      <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
        <h2 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
          <Clock size={18} className="text-[#1a3a6b]" /> ເວລາສອບ (Timer)
        </h2>
        <div className="flex flex-wrap gap-2">
          {durationOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setForm((f) => ({ ...f, durationSec: opt.value }))}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                form.durationSec === opt.value
                  ? 'border-[#1a3a6b] bg-blue-50 text-[#1a3a6b]'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">
          ປັດຈຸບັນ: <b className="text-gray-700">{Math.floor(form.durationSec / 60)} ນາທີ</b> ({form.durationSec} ວິນາທີ)
        </p>
      </div>

      {/* Pass Score */}
      <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
        <h2 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
          <Award size={18} className="text-green-600" /> ເກນຄະແນນຜ່ານ
        </h2>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={60} max={160} step={5}
            value={form.passScore}
            onChange={(e) => setForm((f) => ({ ...f, passScore: +e.target.value }))}
            className="flex-1 accent-[#1a3a6b]"
          />
          <div className="text-2xl font-black text-[#1a3a6b] w-16 text-center">
            {form.passScore}
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-1">ຄະແນນ / 200 &nbsp;·&nbsp; ຄ່າເລີ່ມຕົ້ນ: 120</p>
      </div>

      {/* Block Duplicates */}
      <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-gray-700 flex items-center gap-2">
              <Lock size={18} className="text-red-500" /> ລັອກຊື່ຊ້ຳ
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">ກັນຜູ້ສອບຊື່ດຽວກັນສົ່ງຊ້ຳ</p>
          </div>
          <button
            onClick={() => setForm((f) => ({ ...f, blockDuplicates: !f.blockDuplicates }))}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              form.blockDuplicates ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
              form.blockDuplicates ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>
      </div>

      {/* API Settings */}
      <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
        <h2 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
          <Database size={18} className="text-purple-600" /> ຕັ້ງຄ່າ PHP API
        </h2>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-1">API Base URL</label>
            <input
              value={form.apiBase}
              onChange={(e) => setForm((f) => ({ ...f, apiBase: e.target.value.trim() }))}
              placeholder="/api"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono outline-none focus:border-[#1a3a6b]"
            />
            <p className="text-xs text-gray-400 mt-1">ຄ່າເລີ່ມຕົ້ນ /api — ປ່ຽນຖ້ານຳ PHP ໄວ້ທີ່ path ອື່ນ</p>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-1">API Secret (ສຳລັບລຶບຂໍ້ມູນ)</label>
            <input
              type="password"
              value={form.apiSecret}
              onChange={(e) => setForm((f) => ({ ...f, apiSecret: e.target.value }))}
              placeholder="ຕ້ອງຕົງກັນກັບ API_SECRET ໃນ api/config.php"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1a3a6b]"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
            saved
              ? 'bg-green-500 text-white'
              : 'bg-[#1a3a6b] hover:bg-blue-900 text-white'
          }`}
        >
          {saved ? <CheckCircle size={16} /> : <Save size={16} />}
          {saved ? 'ບັນທຶກສຳເລັດ ✓' : 'ບັນທຶກການຕັ້ງຄ່າ'}
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-5 py-3 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <RotateCcw size={15} /> ຣີເຊັດ
        </button>
      </div>

      <p className="text-xs text-gray-400 text-center">
        ການຕັ້ງຄ່ານີ້ຈະໃຊ້ທັນທີໃນຄັ້ງຕໍ່ໄປທີ່ເລີ່ມການສອບ
      </p>
    </div>
  );
};

// ─── Main Admin Page ─────────────────────────────────────────────────────────
const AdminPage = () => {
  const [loggedIn, setLoggedIn] = useState(() => sessionStorage.getItem(STORAGE_KEY) === '1');
  const [tab, setTab] = useState('dashboard');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('created_at');
  const [sortDir, setSortDir] = useState('desc');
  const [deleting, setDeleting] = useState(null);

  const fetchResults = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getExamResults();
      setResults(data);
    } catch (e) {
      setError('ບໍ່ສາມາດໂຫຼດຂໍ້ມູນໄດ້: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loggedIn) fetchResults();
  }, [loggedIn]);

  const handleDelete = async (id) => {
    if (!window.confirm('ລຶບຂໍ້ມູນຜູ້ສອບຄົນນີ້?\n(ຜູ້ສອບຈະສາມາດສອບໃໝ່ໄດ້ຫຼັງຈາກລຶບ)')) return;
    setDeleting(id);
    try {
      await deleteExamResult(id);
      setResults((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      alert('ລຶບບໍ່ສຳເລັດ: ' + e.message);
    } finally {
      setDeleting(null);
    }
  };

  // ─── Stats ────────────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const total = results.length;
    const passed = results.filter((r) => r.passed).length;
    const passRate = total > 0 ? Math.round((passed / total) * 100) : 0;
    const avgScore = total > 0
      ? Math.round(results.reduce((s, r) => s + r.total_score, 0) / total)
      : 0;
    const avgTime = total > 0
      ? Math.round(results.reduce((s, r) => s + (r.time_taken_sec || 0), 0) / total)
      : 0;
    return { total, passed, passRate, avgScore, avgTime };
  }, [results]);

  const bucketCounts = useMemo(() => {
    return BUCKETS.map((b) => ({
      ...b,
      count: results.filter((r) => r.total_score >= b.min && r.total_score <= b.max).length,
    }));
  }, [results]);
  const maxBucket = Math.max(...bucketCounts.map((b) => b.count), 1);

  // ─── Filtered + sorted results ────────────────────────────────────────────
  const filteredResults = useMemo(() => {
    let rows = results.filter((r) =>
      r.examiner_name?.toLowerCase().includes(search.toLowerCase())
    );
    rows = [...rows].sort((a, b) => {
      let av = a[sortKey], bv = b[sortKey];
      if (typeof av === 'string') av = av.toLowerCase();
      if (typeof bv === 'string') bv = bv.toLowerCase();
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return rows;
  }, [results, search, sortKey, sortDir]);

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('desc'); }
  };

  const SortIcon = ({ k }) => {
    if (sortKey !== k) return <span className="text-gray-300 ml-1">↕</span>;
    return <span className="text-blue-600 ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>;
  };

  // ─── Logout ────────────────────────────────────────────────────────────────
  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setLoggedIn(false);
  };

  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-[#1a3a6b] text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <a href="/" className="hover:opacity-70 transition-opacity">
            <ChevronLeft size={22} />
          </a>
          <div>
            <div className="font-extrabold text-lg tracking-wide">Admin Panel</div>
            <div className="text-xs opacity-70">EPS-TOPIK Mock Exam</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchResults}
            className="flex items-center gap-1 text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            ໂຫຼດໃໝ່
          </button>
          <button
            onClick={logout}
            className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors"
          >
            ອອກຈາກລະບົບ
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-1 overflow-x-auto">
          {[
            { key: 'dashboard', label: 'ພາບລວມ',   icon: <BarChart3 size={16} /> },
            { key: 'results',   label: 'ຜູ້ສອບ',    icon: <Users size={16} /> },
            { key: 'questions', label: 'ຄັງຂໍ້ສອບ', icon: <Database size={16} /> },
            { key: 'database',  label: 'ຖານຂໍ້ມູນ', icon: <Wifi size={16} /> },
            { key: 'settings',  label: 'ການຕັ້ງຄ່າ', icon: <Settings size={16} /> },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${
                tab === t.key
                  ? 'border-[#1a3a6b] text-[#1a3a6b]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mx-6 mt-4 bg-red-50 border border-red-300 rounded-xl p-3 text-red-700 text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* ── DASHBOARD TAB ────────────────────────────────────────────────── */}
      {tab === 'dashboard' && (
        <div className="p-6 max-w-4xl mx-auto">
          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={<Users size={22} />}
              label="ຜູ້ສອບທັງໝົດ"
              value={stats.total}
              sub="ຄົນ"
            />
            <StatCard
              icon={<CheckCircle size={22} />}
              label="ຜ່ານ"
              value={stats.passed}
              sub={`${stats.passRate}% ຂອງທັງໝົດ`}
              color="#16a34a"
            />
            <StatCard
              icon={<Award size={22} />}
              label="ຄະແນນສະເລ່ຍ"
              value={stats.avgScore}
              sub="/ 200 ຄະແນນ"
              color="#d97706"
            />
            <StatCard
              icon={<Clock size={22} />}
              label="ເວລາສະເລ່ຍ"
              value={fmtTime(stats.avgTime)}
              sub="/ 40:00 ນາທີ"
              color="#7c3aed"
            />
          </div>

          {/* Score distribution */}
          <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
            <h2 className="font-bold text-gray-700 mb-5 flex items-center gap-2">
              <BarChart3 size={18} className="text-[#1a3a6b]" />
              ກະຈາຍຄະແນນ (Score Distribution)
            </h2>
            {results.length === 0 ? (
              <p className="text-center text-gray-400 py-8">ຍັງບໍ່ມີຂໍ້ມູນ</p>
            ) : (
              <div className="flex items-end gap-4 h-48">
                {bucketCounts.map((b) => (
                  <div key={b.label} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-xs font-bold text-gray-600">{b.count}</span>
                    <div
                      className="w-full rounded-t-lg transition-all duration-700"
                      style={{
                        height: `${(b.count / maxBucket) * 160}px`,
                        minHeight: b.count > 0 ? '8px' : '2px',
                        background: b.color,
                      }}
                    />
                    <div className="text-center">
                      <div className="text-xs font-semibold text-gray-600">{b.label}</div>
                      {b.min >= 120 ? (
                        <div className="text-[10px] text-green-600 font-bold">ຜ່ານ</div>
                      ) : (
                        <div className="text-[10px] text-red-400">ບໍ່ຜ່ານ</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pass/Fail breakdown */}
          {results.length > 0 && (
            <div className="mt-4 bg-white rounded-2xl shadow p-5 border border-gray-100">
              <h2 className="font-bold text-gray-700 mb-4">ສັດສ່ວນ ຜ່ານ / ບໍ່ຜ່ານ</h2>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all duration-700"
                    style={{ width: `${stats.passRate}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-green-600 w-16 text-right">
                  {stats.passRate}% ຜ່ານ
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span className="flex items-center gap-1">
                  <CheckCircle size={12} className="text-green-500" />
                  ຜ່ານ: {stats.passed} ຄົນ
                </span>
                <span className="flex items-center gap-1">
                  <XCircle size={12} className="text-red-400" />
                  ບໍ່ຜ່ານ: {stats.total - stats.passed} ຄົນ
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── RESULTS TAB ──────────────────────────────────────────────────── */}
      {tab === 'results' && (
        <div className="p-6 max-w-6xl mx-auto">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="relative flex-1 min-w-48">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ຄົ້ນຫາຊື່ຜູ້ສອບ..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#1a3a6b]"
              />
            </div>
            <button
              onClick={() => exportCSV(filteredResults)}
              disabled={filteredResults.length === 0}
              className="flex items-center gap-2 bg-[#1a3a6b] hover:bg-blue-900 disabled:opacity-40 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
            >
              <Download size={16} />
              Export CSV ({filteredResults.length})
            </button>
          </div>

          {/* Table */}
          {loading ? (
            <div className="text-center py-12 text-gray-400">
              <RefreshCw size={24} className="animate-spin mx-auto mb-2" />
              ກຳລັງໂຫຼດ...
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              {search ? 'ບໍ່ພົບຜູ້ສອບທີ່ຄົ້ນຫາ' : 'ຍັງບໍ່ມີຂໍ້ມູນຜູ້ສອບ'}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <Th onClick={() => toggleSort('examiner_name')}>
                        ຊື່-ນາມສະກຸນ <SortIcon k="examiner_name" />
                      </Th>
                      <Th onClick={() => toggleSort('total_score')} center>
                        ຄະແນນ <SortIcon k="total_score" />
                      </Th>
                      <Th center>
                        <BookOpen size={13} className="inline mr-1" />ອ່ານ
                      </Th>
                      <Th center>
                        <Headphones size={13} className="inline mr-1" />ຟັງ
                      </Th>
                      <Th center>ຜົນ</Th>
                      <Th onClick={() => toggleSort('time_taken_sec')} center>
                        ເວລາ <SortIcon k="time_taken_sec" />
                      </Th>
                      <Th center>ຊຸດ</Th>
                      <Th center>ໝວດ</Th>
                      <Th onClick={() => toggleSort('created_at')}>
                        ວັນທີ <SortIcon k="created_at" />
                      </Th>
                      <Th center>ປົດລັອກ/ລຶບ</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResults.map((r, i) => (
                      <tr
                        key={r.id}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          i % 2 === 0 ? '' : 'bg-gray-50/50'
                        }`}
                      >
                        <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">
                          {r.examiner_name}
                        </td>
                        <td className="px-4 py-3 text-center font-black text-lg" style={{ color: r.passed ? '#16a34a' : '#dc2626' }}>
                          {r.total_score}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-600">{r.reading_score * 5}</td>
                        <td className="px-4 py-3 text-center text-gray-600">{r.listening_score * 5}</td>
                        <td className="px-4 py-3 text-center">
                          {r.passed ? (
                            <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold">
                              <CheckCircle size={11} /> ຜ່ານ
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs font-bold">
                              <XCircle size={11} /> ຕົກ
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-500 font-mono text-xs">
                          {fmtTime(r.time_taken_sec)}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-500">{r.exam_set ?? '—'}</td>
                        <td className="px-4 py-3 text-center text-gray-500 text-xs">{r.category ?? '—'}</td>
                        <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                          {fmtDate(r.created_at)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleDelete(r.id)}
                            disabled={deleting === r.id}
                            title="ລຶບ = ປົດລັອກໃຫ້ສອບໃໝ່"
                            className="text-red-400 hover:text-red-600 disabled:opacity-40 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-500 text-right">
                ທັງໝົດ {filteredResults.length} ລາຍການ
              </div>
            </div>
          )}
        </div>
      )}
      {tab === 'questions' && <QuestionsTab />}
      {tab === 'database'  && <DatabaseTab />}
      {tab === 'settings'  && <SettingsTab />}
    </div>
  );
};

const Th = ({ children, onClick, center }) => (
  <th
    onClick={onClick}
    className={`px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide whitespace-nowrap
      ${onClick ? 'cursor-pointer hover:text-gray-700 select-none' : ''}
      ${center ? 'text-center' : 'text-left'}`}
  >
    {children}
  </th>
);

export default AdminPage;
