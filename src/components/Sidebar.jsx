import React from 'react';
import { EXAM_SECTIONS } from '../data/examData';

// Reading gets first half of exam time, listening gets second half
const HALF_SEC = 1200; // 20 min each

const fmtTime = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

const Sidebar = ({
  currentSection,
  currentQuestionId,
  answers,
  remainingSeconds,
  setNumber,
  onNavigate,
  onPrev,
  onNext,
  onClose,
}) => {
  // Dual timer: reading uses first 20 min, listening uses last 20 min
  const readDispSec   = Math.max(0, remainingSeconds - HALF_SEC);
  const listenDispSec = Math.min(remainingSeconds, HALF_SEC);
  const isListeningTime = remainingSeconds <= HALF_SEC;

  const isReading = currentSection === EXAM_SECTIONS.READING;
  const sectionIds = isReading
    ? Array.from({ length: 20 }, (_, i) => i + 1)
    : Array.from({ length: 20 }, (_, i) => i + 21);

  const leftCol  = sectionIds.slice(0, 10);
  const rightCol = sectionIds.slice(10, 20);

  return (
    <aside className="flex flex-col h-full" style={{ background: '#d7e4f2' }}>

      {/* Mobile close button (only shown in overlay mode) */}
      {onClose && (
        <div
          className="flex items-center justify-between px-3 py-2 shrink-0"
          style={{ background: '#1a3a6b' }}
        >
          <span className="text-white text-xs font-bold tracking-wide">ກະດານຄຳຖາມ</span>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-xl leading-none px-1 active:opacity-60"
            aria-label="close"
          >
            ✕
          </button>
        </div>
      )}

      {/* ── Dual Timer ─────────────────────────────────────────────── */}
      <div
        className="flex shrink-0 border-b-2"
        style={{ background: '#b8cfe6', borderColor: '#9ab8d4' }}
      >
        {/* Reading */}
        <div
          className="flex-1 py-2 text-center border-r"
          style={{
            borderColor: '#9ab8d4',
            opacity: isListeningTime ? 0.45 : 1,
          }}
        >
          <div className="text-[9px] font-bold uppercase tracking-wide" style={{ color: '#1a3a6b' }}>
            ການອ່ານ
          </div>
          <div
            className="timer-display font-bold text-base"
            style={{ color: readDispSec <= 60 ? '#c00' : '#1a3a6b' }}
          >
            {fmtTime(readDispSec)}
          </div>
        </div>

        {/* Listening */}
        <div
          className="flex-1 py-2 text-center"
          style={{ opacity: isListeningTime ? 1 : 0.45 }}
        >
          <div className="text-[9px] font-bold uppercase tracking-wide" style={{ color: '#1a3a6b' }}>
            ການຟັງ
          </div>
          <div
            className="timer-display font-bold text-base"
            style={{ color: isListeningTime && listenDispSec <= 60 ? '#c00' : '#1a3a6b' }}
          >
            {fmtTime(listenDispSec)}
          </div>
        </div>
      </div>

      {/* ── Section Tabs ───────────────────────────────────────────── */}
      <div className="flex shrink-0 border-b" style={{ borderColor: '#9ab8d4' }}>
        <button
          onClick={() => { onNavigate(1); onClose?.(); }}
          className="flex-1 py-1.5 text-xs font-bold transition-colors"
          style={{
            background: isReading ? '#1a3a6b' : 'transparent',
            color: isReading ? '#fff' : '#1a3a6b',
          }}
        >
          ການອ່ານ
        </button>
        <button
          onClick={() => { onNavigate(21); onClose?.(); }}
          className="flex-1 py-1.5 text-xs font-bold transition-colors"
          style={{
            background: !isReading ? '#1a3a6b' : 'transparent',
            color: !isReading ? '#fff' : '#1a3a6b',
          }}
        >
          ການຟັງ
        </button>
      </div>

      {/* ── Answer Status Grid ─────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-2">
        <table className="w-full border-collapse">
          <tbody>
            {Array.from({ length: 10 }, (_, row) => (
              <tr key={row}>
                {[leftCol[row], rightCol[row]].map((qId) => {
                  if (qId === undefined) return <td key={`empty-${row}`} />;
                  const answered  = answers[qId] !== undefined && answers[qId] !== null;
                  const isCurrent = currentQuestionId === qId;
                  return (
                    <td
                      key={qId}
                      onClick={() => { onNavigate(qId); onClose?.(); }}
                      className="cursor-pointer select-none text-center"
                      style={{
                        height: '26px',
                        border: '1px solid #9ab8d4',
                        background: isCurrent ? '#1a3a6b' : '#fff',
                        color: isCurrent ? '#fff' : '#333',
                        fontWeight: isCurrent ? 'bold' : 'normal',
                        fontSize: '11px',
                        padding: '1px 3px',
                        userSelect: 'none',
                      }}
                    >
                      {qId}
                      {answered && (
                        <span
                          style={{
                            color: isCurrent ? '#fde047' : '#1a3a6b',
                            marginLeft: '2px',
                            fontSize: '13px',
                            lineHeight: 1,
                          }}
                        >
                          •
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Answer count summary */}
        <div
          className="mt-2 text-center text-[10px]"
          style={{ color: '#1a3a6b' }}
        >
          ຕອບແລ້ວ{' '}
          <span className="font-bold">
            {sectionIds.filter((id) => answers[id] !== undefined && answers[id] !== null).length}
          </span>{' '}
          / 20
        </div>
      </div>

      {/* ── Prev / Next ────────────────────────────────────────────── */}
      <div
        className="flex gap-1 p-2 shrink-0 border-t"
        style={{ borderColor: '#9ab8d4' }}
      >
        <button
          onClick={onPrev}
          disabled={currentQuestionId <= 1}
          className="flex-1 text-white font-bold py-2 text-xs rounded transition-colors disabled:opacity-40"
          style={{ background: '#1a3a6b' }}
        >
          ◄ ກ່ອນ
        </button>
        <button
          onClick={onNext}
          disabled={currentQuestionId >= 40}
          className="flex-1 text-white font-bold py-2 text-xs rounded transition-colors disabled:opacity-40"
          style={{ background: '#1a3a6b' }}
        >
          ຖັດ ►
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;
