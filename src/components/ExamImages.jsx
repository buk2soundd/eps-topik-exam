import React from 'react';

/**
 * Inline SVG images styled to look like real EPS-TOPIK exam illustrations.
 * Each component is named after the question it represents.
 */

// ── Q1: Measuring a towel — 65 cm ─────────────────────────────────────────
export const ImageQ1 = () => (
  <svg viewBox="0 0 480 230" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-lg mx-auto rounded border border-gray-300 shadow-sm bg-white">
    <defs>
      <marker id="q1ArrowL" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
        <path d="M7,0 L0,4 L7,8 Z" fill="#cc0000" />
      </marker>
      <marker id="q1ArrowR" markerWidth="8" markerHeight="8" refX="0" refY="4" orient="auto">
        <path d="M0,0 L7,4 L0,8 Z" fill="#cc0000" />
      </marker>
    </defs>
    <rect width="480" height="230" fill="#ffffff" />

    {/* Table top */}
    <rect x="30" y="155" width="420" height="14" rx="2" fill="#c8a96e" />
    <rect x="30" y="167" width="420" height="4" rx="1" fill="#a07840" />

    {/* Towel body (unrolled flat towel on table) */}
    <rect x="90" y="108" width="300" height="48" rx="5" fill="#e8f4fd" stroke="#5b9bd5" strokeWidth="2" />
    {/* Towel texture stripes */}
    {[0,1,2,3,4,5].map(i => (
      <rect key={i} x="90" y={108 + i * 8} width="300" height="4" fill={i % 2 === 0 ? "#cde4f5" : "#e8f4fd"} />
    ))}
    {/* Blue border stripe on towel edge */}
    <rect x="90" y="108" width="300" height="7" rx="3" fill="#4a90d9" />
    <rect x="90" y="150" width="300" height="6" rx="0" fill="#4a90d9" />
    {/* Towel label tag */}
    <rect x="218" y="120" width="44" height="18" rx="2" fill="white" stroke="#5b9bd5" strokeWidth="1" />
    <text x="240" y="133" textAnchor="middle" fontSize="9" fontFamily="Arial" fill="#1a56a5" fontWeight="bold" className="ko-blur">수건</text>

    {/* Tape measure below towel */}
    <rect x="90" y="158" width="300" height="16" rx="2" fill="#fffde7" stroke="#f9a825" strokeWidth="1.5" />
    {/* Tape measure ticks: one per cm = 300px / 65 ≈ 4.6px */}
    {Array.from({ length: 66 }, (_, i) => {
      const x = 90 + (i / 65) * 300;
      const isFive = i % 5 === 0;
      const isTen = i % 10 === 0;
      return (
        <line key={i} x1={x} y1="158" x2={x} y2={isTen ? 171 : isFive ? 168 : 163}
          stroke="#8d6e00" strokeWidth={isTen ? 1.5 : 0.8} />
      );
    })}
    {/* Tape measure numbers every 10 */}
    {[0,10,20,30,40,50,60].map(n => (
      <text key={n} x={90 + (n / 65) * 300} y="177"
        textAnchor="middle" fontSize="7.5" fontFamily="monospace" fill="#5d4c00">{n}</text>
    ))}
    <text x="90" y="184" fontSize="6" fontFamily="monospace" fill="#8d6e00">cm</text>

    {/* Double-headed measurement arrow */}
    <line x1="94" y1="97" x2="386" y2="97" stroke="#cc0000" strokeWidth="2.5"
      markerStart="url(#q1ArrowL)" markerEnd="url(#q1ArrowR)" />
    <rect x="200" y="84" width="80" height="20" rx="4" fill="#cc0000" />
    <text x="240" y="98" textAnchor="middle" fontSize="14" fontFamily="Arial" fill="white" fontWeight="bold">65 cm</text>

    {/* Caption */}
    <text x="240" y="218" textAnchor="middle" fontSize="11" fontFamily="Arial" fill="#555" className="ko-blur">
      그림: 수건의 길이를 재고 있습니다
    </text>
  </svg>
);

// ── Q2: Putting on work uniform ────────────────────────────────────────────
export const ImageQ2 = () => (
  <svg viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-lg mx-auto rounded border border-gray-300 shadow-sm bg-white">
    <defs>
      <marker id="q2ArrLeft" markerWidth="8" markerHeight="8" refX="0" refY="4" orient="auto">
        <path d="M0,0 L7,4 L0,8 Z" fill="#cc3300" />
      </marker>
      <marker id="q2ArrRight" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
        <path d="M7,0 L0,4 L7,8 Z" fill="#cc3300" />
      </marker>
    </defs>
    <rect width="480" height="240" fill="#ffffff" />

    {/* ── Person (center) ── */}
    {/* Head */}
    <circle cx="240" cy="42" r="22" fill="#f5c9a0" stroke="#c8905a" strokeWidth="1.5" />
    {/* Hair (short, slightly dark) */}
    <ellipse cx="240" cy="24" rx="22" ry="12" fill="#2d1a05" />
    {/* Eyes */}
    <circle cx="232" cy="41" r="2.5" fill="#2d1a05" />
    <circle cx="248" cy="41" r="2.5" fill="#2d1a05" />
    {/* Mouth - neutral */}
    <path d="M234,52 Q240,56 246,52" stroke="#a06030" strokeWidth="1.5" fill="none" />

    {/* Neck */}
    <rect x="232" y="63" width="16" height="13" rx="5" fill="#f5c9a0" />

    {/* Work jacket body (being worn, open front visible) */}
    {/* Back of jacket + shoulders */}
    <path d="M195,76 L165,85 L158,130 L175,132 L178,160 L302,160 L305,132 L322,130 L315,85 L285,76 Q262,70 240,70 Q218,70 195,76Z"
      fill="#1a4a8a" stroke="#12357a" strokeWidth="2" />
    {/* Left sleeve */}
    <path d="M178,88 L155,85 L140,110 L130,128 L145,136 L162,115 L178,112Z"
      fill="#1a4a8a" stroke="#12357a" strokeWidth="1.5" />
    {/* Right sleeve */}
    <path d="M302,88 L325,85 L340,110 L350,128 L335,136 L318,115 L302,112Z"
      fill="#1a4a8a" stroke="#12357a" strokeWidth="1.5" />
    {/* Jacket collar notch */}
    <path d="M218,76 L240,95 L262,76" stroke="#6ea0e0" strokeWidth="2" fill="none" />
    {/* Reflective safety stripe on jacket */}
    <rect x="178" y="133" width="124" height="8" rx="2" fill="#f5c300" stroke="#c9a000" strokeWidth="1" />
    {/* Jacket pocket left */}
    <rect x="185" y="113" width="32" height="22" rx="3" fill="none" stroke="#4a80c4" strokeWidth="1.5" />
    {/* Jacket pocket flap */}
    <path d="M185,120 Q201,116 217,120" stroke="#4a80c4" strokeWidth="1" fill="none" />
    {/* Company patch */}
    <rect x="245" y="110" width="36" height="20" rx="3" fill="#f5c300" />
    <text x="263" y="124" textAnchor="middle" fontSize="9" fontFamily="Arial" fill="#1a1a00" fontWeight="bold" className="ko-blur">작업복</text>

    {/* Pants */}
    <rect x="210" y="159" width="60" height="38" rx="2" fill="#374151" stroke="#2d3748" strokeWidth="1" />
    {/* Leg seam */}
    <line x1="240" y1="159" x2="240" y2="197" stroke="#2d3748" strokeWidth="1.5" />
    {/* Left leg */}
    <rect x="210" y="195" width="26" height="32" rx="3" fill="#374151" stroke="#2d3748" strokeWidth="1" />
    {/* Right leg */}
    <rect x="244" y="195" width="26" height="32" rx="3" fill="#374151" stroke="#2d3748" strokeWidth="1" />
    {/* Safety boots */}
    <rect x="205" y="223" width="34" height="12" rx="5" fill="#111" />
    <rect x="239" y="223" width="34" height="12" rx="5" fill="#111" />

    {/* Left arm raised (putting sleeve on) */}
    <path d="M140,136 L120,148 L130,158 L150,144Z" fill="#f5c9a0" />
    {/* Right arm raised (putting sleeve on) */}
    <path d="M335,136 L355,148 L345,158 L325,144Z" fill="#f5c9a0" />

    {/* Motion arrows showing arms going into sleeves */}
    <path d="M118,136 Q110,118 130,105" stroke="#cc3300" strokeWidth="2.5" fill="none"
      markerEnd="url(#q2ArrLeft)" strokeDasharray="5,3" />
    <path d="M362,136 Q370,118 350,105" stroke="#cc3300" strokeWidth="2.5" fill="none"
      markerEnd="url(#q2ArrRight)" strokeDasharray="5,3" />

    {/* Caption */}
    <text x="240" y="237" textAnchor="middle" fontSize="11" fontFamily="Arial" fill="#555" className="ko-blur">
      그림: 작업복(안전조끼)을 입고 있습니다
    </text>
  </svg>
);

// ── Q7 & Q8: Fire Prohibited Warning Sign ─────────────────────────────────
// Styled after the authentic Korean industrial safety standard sign (KS+ISO 7010 P003)
export const ImageFireSign = () => (
  <svg viewBox="0 0 340 360" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs mx-auto rounded border border-gray-300 shadow-md bg-white">

    {/* ── Sign board (white rectangle, thick red border) ── */}
    <rect x="18" y="18" width="304" height="324" rx="10" fill="#fff" stroke="#cc0000" strokeWidth="7" />

    {/* ── Red header band ── */}
    <rect x="18" y="18" width="304" height="56" rx="10" fill="#cc0000" />
    {/* Fix bottom of header to be flat */}
    <rect x="18" y="52" width="304" height="22" fill="#cc0000" />
    {/* "경고" text in header */}
    <text x="170" y="58" textAnchor="middle" fontSize="28" fontFamily="'Malgun Gothic','Arial'" fill="white" fontWeight="bold" letterSpacing="6" className="ko-blur">경 고</text>

    {/* ── ISO P003 Prohibition Circle ── */}
    {/* White fill of circle */}
    <circle cx="170" cy="195" r="96" fill="white" />
    {/* Red circle border */}
    <circle cx="170" cy="195" r="96" fill="none" stroke="#cc0000" strokeWidth="14" />

    {/* Flame symbol (ISO P003 reference — upright stylized flame, dark) */}
    <g transform="translate(170,195)">
      {/* Outer flame shape */}
      <path d="M0,-60 C-4,-42 -20,-30 -20,-12 C-26,-24 -22,-44 -14,-54
               C-32,-34 -33,-10 -24,14
               C-38,-4 -36,-26 -28,-42
               C-44,-20 -40,6 -28,28
               C-32,44 -14,62 0,62
               C14,62 32,44 28,28
               C40,6 44,-20 28,-42
               C36,-26 38,-4 24,14
               C33,-10 32,-34 14,-54
               C22,-44 26,-24 20,-12
               C20,-30 4,-42 0,-60Z"
        fill="#2c2c2c" />
      {/* Inner flame (yellow/amber) */}
      <path d="M0,-30 C-2,-20 -9,-13 -8,-4 C-11,-10 -9,-22 -5,-28
               C-14,-18 -14,-5 -9,8
               C-16,1 -14,-10 -10,-18
               C-18,-8 -16,4 -10,14
               C-12,22 0,30 0,30
               C0,30 12,22 10,14
               C16,4 18,-8 10,-18
               C14,-10 16,1 9,8
               C14,-5 14,-18 5,-28
               C9,-22 11,-10 8,-4
               C9,-13 2,-20 0,-30Z"
        fill="#e07800" />
      {/* Flame highlight */}
      <path d="M0,-12 C-1,-7 -4,-4 -3,1 C-4,-1 -3,-6 -1,-9 C-5,-4 -4,1 -2,5 C0,8 0,8 0,8 C0,8 2,5 2,1 C4,-4 5,-7 1,-9 C3,-6 4,-1 3,1 C4,-4 1,-7 0,-12Z"
        fill="#ffcc00" />
    </g>

    {/* ── Red diagonal prohibition bar (left-top to right-bottom, over flame) ── */}
    <line x1="105" y1="130" x2="235" y2="260" stroke="#cc0000" strokeWidth="14" strokeLinecap="round" />

    {/* ── Bottom text area ── */}
    {/* Divider line */}
    <line x1="35" y1="303" x2="305" y2="303" stroke="#cc0000" strokeWidth="1.5" />
    {/* Main Korean text */}
    <text x="170" y="328" textAnchor="middle" fontSize="30" fontFamily="'Malgun Gothic','Arial'" fill="#cc0000" fontWeight="bold" letterSpacing="4" className="ko-blur">화기엄금</text>
    {/* English sub-text */}
    <text x="170" y="348" textAnchor="middle" fontSize="11" fontFamily="Arial" fill="#888">NO OPEN FLAME / FIRE PROHIBITED</text>
  </svg>
);

// ── Q15: Correct lifting posture ──────────────────────────────────────────
export const ImageLiftingPosture = () => (
  <svg viewBox="0 0 500 255" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xl mx-auto rounded border border-gray-300 shadow-sm bg-white">
    <rect width="500" height="255" fill="#ffffff" />

    {/* ══ LEFT: WRONG posture ══ */}
    {/* Panel background */}
    <rect x="10" y="10" width="220" height="235" rx="8" fill="#fff5f5" stroke="#f87171" strokeWidth="1.5" />
    {/* Header */}
    <rect x="10" y="10" width="220" height="32" rx="8" fill="#ef4444" />
    <rect x="10" y="30" width="220" height="12" fill="#ef4444" />
    <text x="120" y="32" textAnchor="middle" fontSize="16" fontFamily="'Malgun Gothic','Arial'" fill="white" fontWeight="bold" className="ko-blur">✗  잘못된 자세</text>

    {/* Box on floor */}
    <rect x="65" y="198" width="65" height="38" rx="3" fill="#fca5a5" stroke="#dc2626" strokeWidth="2" />
    <line x1="65" y1="211" x2="130" y2="211" stroke="#dc2626" strokeWidth="1" strokeDasharray="4,3" />
    <line x1="98" y1="198" x2="98" y2="236" stroke="#dc2626" strokeWidth="1" strokeDasharray="4,3" />
    <text x="97" y="220" textAnchor="middle" fontSize="11" fontFamily="'Malgun Gothic','Arial'" fill="#7f1d1d" className="ko-blur">상자</text>

    {/* Wrong figure: back bent forward, knees straight */}
    {/* Head */}
    <circle cx="100" cy="73" r="17" fill="#f5c9a0" stroke="#c88050" strokeWidth="1.5" />
    {/* Hair */}
    <ellipse cx="100" cy="59" rx="17" ry="10" fill="#333" />
    {/* Eyes */}
    <circle cx="94" cy="73" r="2" fill="#333" />
    <circle cx="106" cy="73" r="2" fill="#333" />
    {/* Worried expression */}
    <path d="M94,82 Q100,79 106,82" stroke="#a06030" strokeWidth="1.5" fill="none" />

    {/* Neck */}
    <rect x="93" y="89" width="14" height="10" rx="4" fill="#f5c9a0" />

    {/* Wrong: torso bent boldly forward (~50° forward), from hip at y=155 */}
    {/* Spine line: hip (95,158) → shoulder (60,103) */}
    <line x1="95" y1="158" x2="60" y2="103" stroke="#f5c9a0" strokeWidth="14" strokeLinecap="round" />
    {/* Shirt */}
    <path d="M85,105 Q72,133 78,158 L112,158 Q118,133 105,105Z" fill="#5b8dd9" opacity="0.9" />

    {/* Wrong: straight legs (no knee bend) */}
    {/* Left leg: hip (93,158) → foot (85,236) */}
    <line x1="90" y1="158" x2="78" y2="236" stroke="#374151" strokeWidth="12" strokeLinecap="round" />
    {/* Right leg: hip (97,158) → foot (113,236) */}
    <line x1="100" y1="158" x2="116" y2="236" stroke="#374151" strokeWidth="12" strokeLinecap="round" />
    {/* Feet */}
    <ellipse cx="74" cy="237" rx="14" ry="6" fill="#1f2937" />
    <ellipse cx="120" cy="237" rx="14" ry="6" fill="#1f2937" />

    {/* Wrong: arms reaching down */}
    {/* Upper arm from shoulder (60,103) going down toward box */}
    <line x1="58" y1="110" x2="68" y2="198" stroke="#f5c9a0" strokeWidth="8" strokeLinecap="round" />
    <line x1="62" y1="110" x2="130" y2="195" stroke="#f5c9a0" strokeWidth="8" strokeLinecap="round" />

    {/* Pain lightning bolt at lower back */}
    <path d="M60,152 L48,162 L57,162 L43,178 L56,168 L48,168 Z" fill="#fbbf24" stroke="#dc2626" strokeWidth="1" />

    {/* Pain label */}
    <text x="30" y="190" fontSize="10" fontFamily="'Malgun Gothic','Arial'" fill="#dc2626" fontWeight="bold" className="ko-blur">허리 통증!</text>

    {/* Vertical guide line showing bent back */}
    <line x1="125" y1="90" x2="125" y2="175" stroke="#dc2626" strokeWidth="1" strokeDasharray="4,3" opacity="0.6" />
    <line x1="60" y1="103" x2="125" y2="103" stroke="#dc2626" strokeWidth="1" strokeDasharray="4,3" opacity="0.6" />
    <text x="142" y="140" fontSize="9" fontFamily="Arial" fill="#dc2626" transform="rotate(-55,142,140)" className="ko-blur">등 굽힘</text>

    {/* ══ DIVIDER ══ */}
    <line x1="250" y1="10" x2="250" y2="245" stroke="#d1d5db" strokeWidth="2" strokeDasharray="6,4" />

    {/* ══ RIGHT: CORRECT posture ══ */}
    {/* Panel background */}
    <rect x="270" y="10" width="220" height="235" rx="8" fill="#f0fdf4" stroke="#4ade80" strokeWidth="1.5" />
    {/* Header */}
    <rect x="270" y="10" width="220" height="32" rx="8" fill="#16a34a" />
    <rect x="270" y="30" width="220" height="12" fill="#16a34a" />
    <text x="380" y="32" textAnchor="middle" fontSize="16" fontFamily="'Malgun Gothic','Arial'" fill="white" fontWeight="bold" className="ko-blur">✓  올바른 자세</text>

    {/* Box on floor */}
    <rect x="325" y="198" width="65" height="38" rx="3" fill="#86efac" stroke="#16a34a" strokeWidth="2" />
    <line x1="325" y1="211" x2="390" y2="211" stroke="#16a34a" strokeWidth="1" strokeDasharray="4,3" />
    <line x1="358" y1="198" x2="358" y2="236" stroke="#16a34a" strokeWidth="1" strokeDasharray="4,3" />
    <text x="357" y="220" textAnchor="middle" fontSize="11" fontFamily="'Malgun Gothic','Arial'" fill="#14532d" className="ko-blur">상자</text>

    {/* Correct figure: back straight, knees bent (squat) */}
    {/* Head */}
    <circle cx="360" cy="65" r="17" fill="#f5c9a0" stroke="#c88050" strokeWidth="1.5" />
    {/* Hair */}
    <ellipse cx="360" cy="51" rx="17" ry="10" fill="#333" />
    {/* Eyes */}
    <circle cx="354" cy="65" r="2" fill="#333" />
    <circle cx="366" cy="65" r="2" fill="#333" />
    {/* Smile */}
    <path d="M354,74 Q360,79 366,74" stroke="#a06030" strokeWidth="1.5" fill="none" />

    {/* Neck */}
    <rect x="353" y="81" width="14" height="10" rx="4" fill="#f5c9a0" />

    {/* Correct: upright torso */}
    {/* Spine: shoulder (360,91) → hip (360,158) */}
    <line x1="360" y1="91" x2="360" y2="158" stroke="#f5c9a0" strokeWidth="14" strokeLinecap="round" />
    {/* Shirt */}
    <path d="M345,93 L345,158 L375,158 L375,93Z" fill="#16803c" opacity="0.9" rx="3" />

    {/* Correct: bent knees */}
    {/* Left thigh: hip-left (352,158) → knee (330,198) */}
    <line x1="352" y1="158" x2="326" y2="198" stroke="#374151" strokeWidth="12" strokeLinecap="round" />
    {/* Left shin: knee (330,198) → foot (330,236) */}
    <line x1="326" y1="198" x2="326" y2="236" stroke="#374151" strokeWidth="12" strokeLinecap="round" />
    {/* Right thigh: hip-right (368,158) → knee (390,198) */}
    <line x1="368" y1="158" x2="394" y2="198" stroke="#374151" strokeWidth="12" strokeLinecap="round" />
    {/* Right shin: knee (390,198) → foot (390,236) */}
    <line x1="394" y1="198" x2="394" y2="236" stroke="#374151" strokeWidth="12" strokeLinecap="round" />
    {/* Feet */}
    <ellipse cx="322" cy="237" rx="14" ry="6" fill="#1f2937" />
    <ellipse cx="398" cy="237" rx="14" ry="6" fill="#1f2937" />

    {/* Correct: arms holding box at waist level */}
    <line x1="347" y1="110" x2="326" y2="195" stroke="#f5c9a0" strokeWidth="8" strokeLinecap="round" />
    <line x1="373" y1="110" x2="391" y2="195" stroke="#f5c9a0" strokeWidth="8" strokeLinecap="round" />

    {/* Vertical guide showing straight back */}
    <line x1="305" y1="65" x2="305" y2="175" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.7" />
    <text x="295" y="120" fontSize="9" fontFamily="Arial" fill="#16a34a" transform="rotate(-90,295,120)" className="ko-blur">등 곧게</text>

    {/* Caption */}
    <text x="250" y="253" textAnchor="middle" fontSize="11" fontFamily="'Malgun Gothic','Arial'" fill="#555" className="ko-blur">
      그림: 무거운 물건을 들 때 올바른 자세
    </text>
  </svg>
);

// ── Emergency Exit Sign (비상구) — ISO 7010 E001 style ────────────────────
export const ImageExitSign = () => (
  <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs mx-auto rounded border border-gray-300 shadow-md">
    <rect width="320" height="200" rx="8" fill="#00913f" />
    {/* White border inside */}
    <rect x="8" y="8" width="304" height="184" rx="5" fill="none" stroke="white" strokeWidth="3" />
    {/* Running person (white) */}
    {/* Head */}
    <circle cx="102" cy="48" r="13" fill="white" />
    {/* Body leaning forward with arm forward */}
    <path d="M102,60 Q96,80 90,95" stroke="white" strokeWidth="8" strokeLinecap="round" fill="none" />
    {/* Left arm swinging back */}
    <line x1="100" y1="70" x2="82" y2="58" stroke="white" strokeWidth="7" strokeLinecap="round" />
    {/* Right arm forward */}
    <line x1="99" y1="70" x2="118" y2="60" stroke="white" strokeWidth="7" strokeLinecap="round" />
    {/* Left leg (back) */}
    <line x1="90" y1="95" x2="75" y2="122" stroke="white" strokeWidth="7" strokeLinecap="round" />
    {/* Right leg (forward) */}
    <line x1="90" y1="95" x2="108" y2="118" stroke="white" strokeWidth="7" strokeLinecap="round" />

    {/* Door frame (right side) */}
    <rect x="148" y="38" width="58" height="100" rx="3" fill="none" stroke="white" strokeWidth="5" />
    {/* Door open panel */}
    <path d="M148,38 Q165,45 165,88 Q165,130 148,138" stroke="white" strokeWidth="4" fill="none" />
    {/* Door handle */}
    <circle cx="162" cy="90" r="4" fill="white" />

    {/* Arrow pointing right toward door */}
    <line x1="122" y1="90" x2="145" y2="90" stroke="white" strokeWidth="6" />
    <path d="M138,82 L148,90 L138,98" stroke="white" strokeWidth="5" fill="none" strokeLinejoin="round" />

    {/* Bottom text bar */}
    <rect x="0" y="155" width="320" height="45" rx="0" fill="rgba(0,0,0,0.2)" />
    <rect x="0" y="192" width="320" height="8" rx="8" fill="rgba(0,0,0,0.2)" />
    <text x="160" y="183" textAnchor="middle" fontSize="26" fontFamily="'Malgun Gothic','Arial'" fill="white" fontWeight="bold" letterSpacing="8" className="ko-blur">비상구</text>
    <text x="160" y="197" textAnchor="middle" fontSize="10" fontFamily="Arial" fill="rgba(255,255,255,0.75)" letterSpacing="2">EMERGENCY EXIT</text>
  </svg>
);

// ── No Smoking Sign (금연) — ISO 7010 P002 style ─────────────────────────
export const ImageNoSmoking = () => (
  <svg viewBox="0 0 300 340" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs mx-auto rounded border border-gray-300 shadow-md bg-white">
    {/* Sign board */}
    <rect x="12" y="12" width="276" height="316" rx="10" fill="white" stroke="#cc0000" strokeWidth="5" />
    {/* Red header */}
    <rect x="12" y="12" width="276" height="50" rx="10" fill="#cc0000" />
    <rect x="12" y="46" width="276" height="16" fill="#cc0000" />
    <text x="150" y="46" textAnchor="middle" fontSize="24" fontFamily="'Malgun Gothic','Arial'" fill="white" fontWeight="bold" letterSpacing="4" className="ko-blur">금 지</text>

    {/* White prohibition circle */}
    <circle cx="150" cy="185" r="88" fill="white" />
    {/* Red border */}
    <circle cx="150" cy="185" r="88" fill="none" stroke="#cc0000" strokeWidth="13" />

    {/* Cigarette body (inside) */}
    <rect x="80" y="175" width="95" height="18" rx="3" fill="#e8c87a" stroke="#b8984a" strokeWidth="1" />
    {/* Filter tip */}
    <rect x="170" y="173" width="22" height="22" rx="3" fill="#f0a050" />
    {/* Filter ring */}
    <rect x="168" y="173" width="5" height="22" fill="#d4af37" />
    {/* Ash end */}
    <rect x="78" y="177" width="8" height="14" rx="2" fill="#aaa" />
    {/* Smoke wisps */}
    <path d="M86,173 Q80,162 86,155 Q92,148 88,138" stroke="#999" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M96,173 Q90,160 95,152 Q100,144 96,133" stroke="#bbb" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M76,172 Q70,165 74,158" stroke="#ccc" strokeWidth="1.5" fill="none" strokeLinecap="round" />

    {/* Red diagonal prohibition bar (consistent angle) */}
    <line x1="90" y1="118" x2="210" y2="252" stroke="#cc0000" strokeWidth="13" strokeLinecap="round" />

    {/* Bottom text */}
    <line x1="28" y1="288" x2="272" y2="288" stroke="#cc0000" strokeWidth="1.5" />
    <text x="150" y="314" textAnchor="middle" fontSize="30" fontFamily="'Malgun Gothic','Arial'" fill="#cc0000" fontWeight="bold" letterSpacing="4" className="ko-blur">금 연</text>
    <text x="150" y="330" textAnchor="middle" fontSize="11" fontFamily="Arial" fill="#888" letterSpacing="2">NO SMOKING</text>
  </svg>
);

// ── Forklift Warning Sign (지게차 주의) ───────────────────────────────────
export const ImageForkliftSign = () => (
  <svg viewBox="0 0 320 350" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs mx-auto rounded border border-gray-300 shadow-md bg-white">
    {/* Sign board */}
    <rect x="10" y="10" width="300" height="330" rx="10" fill="white" stroke="#e6a000" strokeWidth="5" />
    {/* Yellow header */}
    <rect x="10" y="10" width="300" height="50" rx="10" fill="#f5a700" />
    <rect x="10" y="44" width="300" height="16" fill="#f5a700" />
    <text x="160" y="46" textAnchor="middle" fontSize="22" fontFamily="'Malgun Gothic','Arial'" fill="#1a1a00" fontWeight="bold" letterSpacing="2" className="ko-blur">경 고</text>

    {/* Warning triangle */}
    <path d="M160,80 L60,240 L260,240 Z" fill="#f5a700" stroke="#1a1a00" strokeWidth="5" />
    {/* Inner triangle white */}
    <path d="M160,100 L76,230 L244,230 Z" fill="#f5a700" />

    {/* Forklift silhouette (black) inside triangle */}
    {/* Body/cabin */}
    <rect x="120" y="175" width="55" height="38" rx="3" fill="#1a1a00" />
    {/* Cabin window */}
    <rect x="127" y="180" width="30" height="18" rx="2" fill="#f5a700" />
    {/* Rear counterweight */}
    <rect x="175" y="188" width="20" height="22" rx="3" fill="#1a1a00" />
    {/* Mast (vertical frame left) */}
    <rect x="105" y="148" width="8" height="65" rx="2" fill="#1a1a00" />
    <rect x="117" y="148" width="8" height="65" rx="2" fill="#1a1a00" />
    {/* Forks (horizontal) */}
    <rect x="88" y="208" width="30" height="5" rx="1" fill="#1a1a00" />
    <rect x="88" y="218" width="30" height="5" rx="1" fill="#1a1a00" />
    {/* Load on forks */}
    <rect x="88" y="180" width="24" height="28" rx="2" fill="#4a4a00" opacity="0.7" />
    {/* Rear wheel */}
    <circle cx="180" cy="213" r="12" fill="#1a1a00" />
    <circle cx="180" cy="213" r="5" fill="#f5a700" />
    {/* Front wheel */}
    <circle cx="116" cy="213" r="12" fill="#1a1a00" />
    <circle cx="116" cy="213" r="5" fill="#f5a700" />

    {/* Exclamation mark */}
    <text x="160" y="172" textAnchor="middle" fontSize="28" fontFamily="Arial" fill="#1a1a00" fontWeight="bold">!</text>

    {/* Bottom text */}
    <line x1="25" y1="258" x2="295" y2="258" stroke="#e6a000" strokeWidth="2" />
    <text x="160" y="284" textAnchor="middle" fontSize="22" fontFamily="'Malgun Gothic','Arial'" fill="#e6a000" fontWeight="bold" className="ko-blur">지게차 주의</text>
    <text x="160" y="305" textAnchor="middle" fontSize="13" fontFamily="'Malgun Gothic','Arial'" fill="#888">FORKLIFT IN OPERATION</text>
    <text x="160" y="325" textAnchor="middle" fontSize="11" fontFamily="Arial" fill="#aaa" className="ko-blur">접근 금지 / Keep Clear</text>
  </svg>
);

// ── Pesticide Warning Sign (농약 위험) ────────────────────────────────────
export const ImagePesticideSign = () => (
  <svg viewBox="0 0 320 370" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs mx-auto rounded border border-gray-300 shadow-md bg-white">
    {/* Sign board */}
    <rect x="10" y="10" width="300" height="350" rx="10" fill="white" stroke="#cc0000" strokeWidth="5" />
    {/* Red header */}
    <rect x="10" y="10" width="300" height="52" rx="10" fill="#cc0000" />
    <rect x="10" y="46" width="300" height="16" fill="#cc0000" />
    <text x="160" y="47" textAnchor="middle" fontSize="25" fontFamily="'Malgun Gothic','Arial'" fill="white" fontWeight="bold" letterSpacing="3" className="ko-blur">위 험</text>

    {/* Orange warning diamond */}
    <path d="M160,82 L260,192 L160,302 L60,192 Z" fill="#ff8000" stroke="#cc4400" strokeWidth="4" />
    {/* Inner white diamond */}
    <path d="M160,102 L243,192 L160,282 L77,192 Z" fill="#fff5e6" />

    {/* Skull icon */}
    {/* Skull shape */}
    <ellipse cx="160" cy="175" rx="38" ry="34" fill="#2c2c2c" />
    {/* Eye sockets */}
    <ellipse cx="147" cy="172" rx="10" ry="11" fill="#fff5e6" />
    <ellipse cx="173" cy="172" rx="10" ry="11" fill="#fff5e6" />
    {/* Nose */}
    <path d="M155,188 L160,183 L165,188 L162,193 L158,193 Z" fill="#2c2c2c" />
    {/* Jawbone */}
    <rect x="140" y="198" width="40" height="14" rx="3" fill="#2c2c2c" />
    <line x1="152" y1="198" x2="152" y2="212" stroke="#fff5e6" strokeWidth="3" />
    <line x1="160" y1="198" x2="160" y2="212" stroke="#fff5e6" strokeWidth="3" />
    <line x1="168" y1="198" x2="168" y2="212" stroke="#fff5e6" strokeWidth="3" />
    {/* Crossbones */}
    <line x1="118" y1="222" x2="202" y2="260" stroke="#2c2c2c" strokeWidth="10" strokeLinecap="round" />
    <line x1="202" y1="222" x2="118" y2="260" stroke="#2c2c2c" strokeWidth="10" strokeLinecap="round" />
    {/* Bone ends */}
    <circle cx="116" cy="222" r="7" fill="#2c2c2c" />
    <circle cx="204" cy="222" r="7" fill="#2c2c2c" />
    <circle cx="116" cy="260" r="7" fill="#2c2c2c" />
    <circle cx="204" cy="260" r="7" fill="#2c2c2c" />

    {/* Bottom text */}
    <line x1="25" y1="318" x2="295" y2="318" stroke="#cc0000" strokeWidth="1.5" />
    <text x="160" y="342" textAnchor="middle" fontSize="26" fontFamily="'Malgun Gothic','Arial'" fill="#cc0000" fontWeight="bold" letterSpacing="3" className="ko-blur">농약 위험</text>
    <text x="160" y="358" textAnchor="middle" fontSize="11" fontFamily="Arial" fill="#888">DANGEROUS PESTICIDE</text>
  </svg>
);

// ── Tractor Illustration (트랙터) ─────────────────────────────────────────
export const ImageTractor = () => (
  <svg viewBox="0 0 480 260" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-lg mx-auto rounded border border-gray-300 shadow-sm bg-white">
    <rect width="480" height="260" fill="#f0f7e6" />
    {/* Ground */}
    <rect x="0" y="210" width="480" height="50" fill="#c8a850" rx="0" />
    <rect x="0" y="208" width="480" height="6" fill="#8b6914" />
    {/* Soil texture */}
    {[20,60,100,140,180,220,260,300,340,380,420,460].map(x => (
      <ellipse key={x} cx={x} cy="218" rx="14" ry="4" fill="#a07828" opacity="0.5" />
    ))}

    {/* ── Tractor body ── */}
    {/* Rear large wheel */}
    <circle cx="165" cy="195" r="65" fill="#222" stroke="#444" strokeWidth="3" />
    <circle cx="165" cy="195" r="50" fill="#333" />
    <circle cx="165" cy="195" r="18" fill="#555" stroke="#666" strokeWidth="2" />
    {/* Wheel tread marks */}
    {[0,30,60,90,120,150,180,210,240,270,300,330].map(deg => {
      const rad = (deg * Math.PI) / 180;
      const x1 = 165 + 52 * Math.cos(rad);
      const y1 = 195 + 52 * Math.sin(rad);
      const x2 = 165 + 64 * Math.cos(rad);
      const y2 = 195 + 64 * Math.sin(rad);
      return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#555" strokeWidth="4" />;
    })}

    {/* Front small wheel */}
    <circle cx="375" cy="205" r="35" fill="#222" stroke="#444" strokeWidth="3" />
    <circle cx="375" cy="205" r="27" fill="#333" />
    <circle cx="375" cy="205" r="10" fill="#555" />
    {[0,45,90,135,180,225,270,315].map(deg => {
      const rad = (deg * Math.PI) / 180;
      const x1 = 375 + 28 * Math.cos(rad);
      const y1 = 205 + 28 * Math.sin(rad);
      const x2 = 375 + 34 * Math.cos(rad);
      const y2 = 205 + 34 * Math.sin(rad);
      return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#555" strokeWidth="3" />;
    })}

    {/* Main body (green) */}
    <path d="M200,175 L200,120 Q202,105 230,105 L360,105 Q380,105 385,120 L390,175 Z"
      fill="#2d6a1e" stroke="#1a4010" strokeWidth="2" />

    {/* Chassis / frame */}
    <rect x="140" y="165" width="255" height="20" rx="4" fill="#1a4010" />

    {/* Cabin / hood block */}
    <rect x="260" y="88" width="110" height="80" rx="6" fill="#2d6a1e" stroke="#1a4010" strokeWidth="2" />
    {/* Cabin windows (front) */}
    <rect x="272" y="96" width="45" height="35" rx="4" fill="#aed6f1" stroke="#1a4010" strokeWidth="1.5" />
    {/* Cabin window (side) */}
    <rect x="340" y="98" width="25" height="28" rx="3" fill="#aed6f1" stroke="#1a4010" strokeWidth="1.5" />
    {/* Roof */}
    <rect x="255" y="82" width="120" height="12" rx="4" fill="#1a4010" />

    {/* Exhaust pipe */}
    <rect x="245" y="58" width="12" height="52" rx="3" fill="#555" />
    {/* Smoke */}
    <ellipse cx="251" cy="52" rx="7" ry="5" fill="#ccc" opacity="0.7" />
    <ellipse cx="258" cy="43" rx="8" ry="6" fill="#ddd" opacity="0.5" />
    <ellipse cx="249" cy="35" rx="6" ry="5" fill="#eee" opacity="0.4" />

    {/* Engine hood */}
    <path d="M200,120 Q205,108 230,108 L260,108 L260,175 L200,175 Z"
      fill="#3a8026" stroke="#1a4010" strokeWidth="1.5" />
    {/* Hood lines */}
    <line x1="215" y1="115" x2="255" y2="115" stroke="#1a4010" strokeWidth="1.5" />
    <line x1="215" y1="128" x2="255" y2="128" stroke="#1a4010" strokeWidth="1.5" />
    <line x1="215" y1="141" x2="255" y2="141" stroke="#1a4010" strokeWidth="1" />

    {/* Red grille */}
    <rect x="196" y="136" width="14" height="28" rx="3" fill="#cc2200" stroke="#991100" strokeWidth="1" />
    {/* Headlight */}
    <circle cx="200" cy="154" r="6" fill="#fff9a0" stroke="#888" strokeWidth="1" />

    {/* Rear hitch */}
    <rect x="124" y="176" width="28" height="10" rx="2" fill="#555" />
    <rect x="108" y="181" width="20" height="6" rx="2" fill="#444" />

    {/* Caption */}
    <text x="240" y="248" textAnchor="middle" fontSize="13" fontFamily="'Malgun Gothic','Arial'" fill="#2d5a1e" fontWeight="bold" className="ko-blur">트랙터 (Tractor)</text>
  </svg>
);

// ── Greenhouse Work (비닐하우스 작업) ─────────────────────────────────────
export const ImageGreenhouse = () => (
  <svg viewBox="0 0 480 250" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-lg mx-auto rounded border border-gray-300 shadow-sm bg-white">
    <rect width="480" height="250" fill="#e8f5e9" />

    {/* Ground inside */}
    <rect x="0" y="195" width="480" height="55" fill="#8b5e2a" />
    <rect x="0" y="193" width="480" height="5" fill="#5c3d14" />
    {/* Soil furrows */}
    {[30,90,150,210,270,330,390,450].map(x => (
      <ellipse key={x} cx={x} cy="202" rx="22" ry="5" fill="#6b4920" opacity="0.6" />
    ))}

    {/* Greenhouse arch structure */}
    {/* Arched frame (multiple arches) */}
    {[80, 160, 240, 320, 400].map(cx => (
      <path key={cx} d={`M${cx-50},195 Q${cx-50},120 ${cx},80 Q${cx+50},120 ${cx+50},195`}
        fill="none" stroke="#aaa" strokeWidth="3" opacity="0.6" />
    ))}
    {/* Main arch outline */}
    <path d="M30,195 Q30,60 240,30 Q450,60 450,195"
      fill="rgba(200,240,255,0.35)" stroke="#888" strokeWidth="3" />
    {/* Polythene surface sheen */}
    <path d="M50,195 Q50,70 240,42 Q430,70 430,195"
      fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeDasharray="12,8" />

    {/* Side walls */}
    <line x1="30" y1="120" x2="30" y2="195" stroke="#888" strokeWidth="3" />
    <line x1="450" y1="120" x2="450" y2="195" stroke="#888" strokeWidth="3" />

    {/* Plant rows */}
    {[60,120,180,240,300,360,420].map(x => (
      <g key={x}>
        <line x1={x} y1="193" x2={x} y2="155" stroke="#2e7d32" strokeWidth="3" />
        <ellipse cx={x} cy="152" rx="12" ry="8" fill="#43a047" />
        <ellipse cx={x-8} cy="158" rx="9" ry="6" fill="#388e3c" />
        <ellipse cx={x+8} cy="158" rx="9" ry="6" fill="#2e7d32" />
        {x % 60 === 0 && <ellipse cx={x} cy="145" rx="6" ry="5" fill="#e53935" />}
      </g>
    ))}

    {/* Worker figure */}
    {/* Head */}
    <circle cx="240" cy="112" r="14" fill="#f5c9a0" stroke="#c88050" strokeWidth="1.5" />
    {/* Straw hat */}
    <ellipse cx="240" cy="103" rx="20" ry="7" fill="#d4a520" />
    <rect x="230" y="97" width="20" height="10" rx="5" fill="#c8941a" />
    {/* Body */}
    <rect x="228" y="126" width="24" height="38" rx="4" fill="#1565c0" />
    {/* Arms down (working) */}
    <line x1="228" y1="132" x2="210" y2="155" stroke="#f5c9a0" strokeWidth="7" strokeLinecap="round" />
    <line x1="252" y1="132" x2="268" y2="155" stroke="#f5c9a0" strokeWidth="7" strokeLinecap="round" />
    {/* Tool (hoe) */}
    <line x1="268" y1="155" x2="268" y2="193" stroke="#8b5e2a" strokeWidth="4" strokeLinecap="round" />
    <path d="M258,193 L278,193 L272,183 L264,183 Z" fill="#888" stroke="#555" strokeWidth="1" />
    {/* Legs */}
    <line x1="234" y1="164" x2="230" y2="193" stroke="#1565c0" strokeWidth="8" strokeLinecap="round" />
    <line x1="246" y1="164" x2="250" y2="193" stroke="#1565c0" strokeWidth="8" strokeLinecap="round" />

    {/* Caption */}
    <text x="240" y="240" textAnchor="middle" fontSize="12" fontFamily="'Malgun Gothic','Arial'" fill="#2d5a1e" fontWeight="bold" className="ko-blur">
      비닐하우스 작업 (Greenhouse Work)
    </text>
  </svg>
);

// ── Welding Safety Sign (용접 안전) ───────────────────────────────────────
export const ImageWeldingSign = () => (
  <svg viewBox="0 0 320 340" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs mx-auto rounded border border-gray-300 shadow-md bg-white">
    {/* Sign board */}
    <rect x="10" y="10" width="300" height="320" rx="10" fill="white" stroke="#f5a700" strokeWidth="5" />
    {/* Yellow header */}
    <rect x="10" y="10" width="300" height="50" rx="10" fill="#f5a700" />
    <rect x="10" y="44" width="300" height="16" fill="#f5a700" />
    <text x="160" y="46" textAnchor="middle" fontSize="23" fontFamily="'Malgun Gothic','Arial'" fill="#1a1a00" fontWeight="bold" letterSpacing="3" className="ko-blur">주 의</text>

    {/* Warning triangle */}
    <path d="M160,78 L72,218 L248,218 Z" fill="#f5a700" stroke="#1a1a00" strokeWidth="4" />
    <path d="M160,96 L86,208 L234,208 Z" fill="#fff5cc" />

    {/* Welder icon inside triangle */}
    {/* Sparks */}
    {[[130,140,118,128],[140,135,125,120],[150,133,148,118],[160,135,165,120],[170,140,178,128]].map(([x1,y1,x2,y2], i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ffcc00" strokeWidth="2.5" strokeLinecap="round" />
    ))}
    {/* Welding arc glow */}
    <circle cx="150" cy="152" r="14" fill="#ffffaa" opacity="0.8" />
    {/* Weld torch */}
    <rect x="145" y="155" width="25" height="35" rx="4" fill="#555" transform="rotate(-25,157,172)" />
    <rect x="150" y="175" width="14" height="20" rx="2" fill="#888" transform="rotate(-25,157,185)" />
    {/* Welding flash */}
    <path d="M148,148 L142,140 L152,146 L148,136 L156,145 L152,135 L162,148Z" fill="#ffff00" opacity="0.9" />

    {/* Protective shield icon */}
    <text x="160" y="205" textAnchor="middle" fontSize="14" fontFamily="Arial" fill="#555">🥽</text>

    {/* Bottom labels */}
    <line x1="25" y1="232" x2="295" y2="232" stroke="#e6a000" strokeWidth="1.5" />
    <text x="160" y="257" textAnchor="middle" fontSize="19" fontFamily="'Malgun Gothic','Arial'" fill="#e6a000" fontWeight="bold" className="ko-blur">용접 작업 주의</text>
    <text x="160" y="278" textAnchor="middle" fontSize="12" fontFamily="'Malgun Gothic','Arial'" fill="#555" className="ko-blur">• 차광 안경 착용 필수</text>
    <text x="160" y="298" textAnchor="middle" fontSize="12" fontFamily="'Malgun Gothic','Arial'" fill="#555" className="ko-blur">• 불꽃 튀김 주의</text>
    <text x="160" y="318" textAnchor="middle" fontSize="10" fontFamily="Arial" fill="#aaa">WELDING HAZARD</text>
  </svg>
);

// ── Hard Hat Required Sign (안전모 착용) ───────────────────────────────────
export const ImageHardHatSign = () => (
  <svg viewBox="0 0 300 330" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs mx-auto rounded border border-gray-300 shadow-md bg-white">
    {/* Sign board */}
    <rect x="10" y="10" width="280" height="310" rx="10" fill="white" stroke="#006db8" strokeWidth="5" />
    {/* Blue header */}
    <rect x="10" y="10" width="280" height="50" rx="10" fill="#0057a8" />
    <rect x="10" y="44" width="280" height="16" fill="#0057a8" />
    <text x="150" y="46" textAnchor="middle" fontSize="23" fontFamily="'Malgun Gothic','Arial'" fill="white" fontWeight="bold" letterSpacing="3" className="ko-blur">지 시</text>

    {/* Blue mandatory circle */}
    <circle cx="150" cy="178" r="82" fill="#0057a8" />
    {/* White inner circle to show person */}
    <circle cx="150" cy="178" r="68" fill="#0057a8" />

    {/* Hard hat icon (white) */}
    {/* Helmet dome */}
    <path d="M115,178 Q115,140 150,132 Q185,140 185,178Z" fill="white" />
    {/* Helmet brim */}
    <rect x="105" y="175" width="90" height="8" rx="4" fill="white" />
    {/* Inner lining */}
    <path d="M125,178 Q125,152 150,146 Q175,152 175,178Z" fill="#0057a8" />
    {/* Head/face */}
    <circle cx="150" cy="198" r="22" fill="white" />
    {/* Chin strap */}
    <path d="M130,210 Q150,218 170,210" stroke="#ccc" strokeWidth="3" fill="none" />

    {/* Bottom text */}
    <line x1="25" y1="272" x2="275" y2="272" stroke="#0057a8" strokeWidth="1.5" />
    <text x="150" y="296" textAnchor="middle" fontSize="20" fontFamily="'Malgun Gothic','Arial'" fill="#0057a8" fontWeight="bold" className="ko-blur">안전모 착용</text>
    <text x="150" y="316" textAnchor="middle" fontSize="10" fontFamily="Arial" fill="#888">HARD HAT REQUIRED</text>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// ── 2026 FORMAT QUESTION IMAGES ───────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

// ── Keyword Badge — for 단어와 관계있는 것 고르기 ─────────────────────────────
const KeywordBadge = ({ text, scale = 1 }) => {
  const bw = Math.round(380 * scale);
  const vw = bw + 80;
  const fs = text.length <= 2 ? 64 : text.length <= 3 ? 52 : 42;
  return (
    <svg viewBox={`0 0 ${vw} 162`} xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-sm mx-auto my-1">
      <rect width={vw} height="162" fill="#fdf7f5" rx="10"/>
      <rect x="22" y="22" width={bw + 36} height="118" rx="55" fill="#c01040"/>
      <text x={vw / 2} y="101" textAnchor="middle" fontSize={fs}
        fontFamily="'Malgun Gothic','Apple SD Gothic Neo','Noto Sans KR',sans-serif"
        fill="white" fontWeight="bold">{text}</text>
    </svg>
  );
};
export const KeywordChuksa   = () => <KeywordBadge text="축사" />;
export const KeywordBiryo    = () => <KeywordBadge text="비료" />;
export const KeywordYongjeop = () => <KeywordBadge text="용접" />;
export const KeywordJigecha  = () => <KeywordBadge text="지게차" scale={1.25} />;

// ── Fill-in-Blank Badge — for 빈칸에 들어갈 알맞은 것 고르기 ──────────────────
const BlankBadge = ({ label }) => (
  <svg viewBox="0 0 580 162" xmlns="http://www.w3.org/2000/svg"
    className="w-full max-w-xl mx-auto my-1">
    <rect width="580" height="162" fill="#fdf7f5" rx="10"/>
    <rect x="18" y="22" width="544" height="118" rx="55" fill="#c01040"/>
    <text x="290" y="100" textAnchor="middle" fontSize="30"
      fontFamily="'Malgun Gothic','Apple SD Gothic Neo','Noto Sans KR',sans-serif"
      fill="white" fontWeight="bold">{label}:  ___________</text>
  </svg>
);
export const BlankChurgunJangso = () => <BlankBadge label="출근 장소" />;
export const BlankSafetyGear    = () => <BlankBadge label="안전 장비" />;
export const BlankBohoJangbi    = () => <BlankBadge label="보호 장비" />;

// ── 저울 (Dial Scale) ──────────────────────────────────────────────────────────
export const ImageScaleJoul = () => {
  const needleA = (-225 + (3 / 10) * 270) * Math.PI / 180;
  const nx = +(140 + 38 * Math.cos(needleA)).toFixed(1);
  const ny = +(188 + 38 * Math.sin(needleA)).toFixed(1);
  return (
    <svg viewBox="0 0 280 300" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-xs mx-auto rounded-lg border border-gray-200 shadow-sm bg-white">
      <rect width="280" height="300" fill="white"/>
      {/* Base */}
      <ellipse cx="140" cy="270" rx="72" ry="14" fill="#9a5510"/>
      <rect x="68" y="254" width="144" height="22" fill="#c07020"/>
      {/* Body cylinder */}
      <rect x="76" y="118" width="128" height="144" rx="14" fill="#e09030"/>
      <path d="M76,118 L76,262 Q76,270 90,270 L76,262 Z" fill="#c07020" opacity="0.45"/>
      <path d="M204,118 L204,262 Q204,270 190,270 L204,262 Z" fill="#c07020" opacity="0.45"/>
      {/* Dial face */}
      <circle cx="140" cy="188" r="56" fill="#fffce8" stroke="#c07020" strokeWidth="4"/>
      <circle cx="140" cy="188" r="50" fill="white"/>
      {/* Tick marks – 25 positions, 270° arc */}
      {Array.from({length: 25}, (_, i) => {
        const a = (-225 + i * (270 / 24)) * Math.PI / 180;
        const major = i % 4 === 0;
        return (
          <line key={i}
            x1={+(140 + (major ? 34 : 40) * Math.cos(a)).toFixed(1)}
            y1={+(188 + (major ? 34 : 40) * Math.sin(a)).toFixed(1)}
            x2={+(140 + 46 * Math.cos(a)).toFixed(1)}
            y2={+(188 + 46 * Math.sin(a)).toFixed(1)}
            stroke="#555" strokeWidth={major ? 2 : 0.8}/>
        );
      })}
      {/* Labels 0 2 4 6 8 10 */}
      {[0,2,4,6,8,10].map((n, i) => {
        const a = (-225 + i * (270 / 5)) * Math.PI / 180;
        return (
          <text key={n}
            x={+(140 + 27 * Math.cos(a)).toFixed(1)}
            y={+(192 + 27 * Math.sin(a)).toFixed(1)}
            textAnchor="middle" fontSize="9" fill="#333" fontWeight="bold">{n}</text>
        );
      })}
      <text x="140" y="178" textAnchor="middle" fontSize="9" fill="#c01040" fontWeight="bold">kg</text>
      {/* Needle */}
      <line x1="140" y1="188" x2={nx} y2={ny} stroke="#cc0000" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="140" cy="188" r="4.5" fill="#444"/>
      {/* Platform post */}
      <rect x="134" y="65" width="12" height="57" fill="#c07020"/>
      <ellipse cx="140" cy="66" rx="56" ry="10" fill="#e0e0e0" stroke="#bbb" strokeWidth="1.5"/>
      <ellipse cx="140" cy="62" rx="56" ry="10" fill="#ebebeb" stroke="#ccc" strokeWidth="1.5"/>
      {/* Caption */}
      <text x="140" y="292" textAnchor="middle" fontSize="14"
        fontFamily="'Malgun Gothic','Arial',sans-serif" fill="#555" fontWeight="bold">저울</text>
    </svg>
  );
};

// ── 버니어 캘리퍼스 (Vernier Caliper) ─────────────────────────────────────────
export const ImageVernierCaliper = () => (
  <svg viewBox="0 0 500 210" xmlns="http://www.w3.org/2000/svg"
    className="w-full max-w-xl mx-auto rounded-lg border border-gray-200 shadow-sm bg-white">
    <rect width="500" height="210" fill="white"/>
    {/* Main beam */}
    <rect x="28" y="94" width="414" height="22" rx="4" fill="#c8c8c8" stroke="#999" strokeWidth="1.5"/>
    {/* Scale ticks & numbers */}
    {Array.from({length: 21}, (_, i) => (
      <g key={i}>
        <line x1={38 + i * 18} y1="94" x2={38 + i * 18} y2={i % 5 === 0 ? 82 : 88}
          stroke="#444" strokeWidth={i % 5 === 0 ? 1.5 : 0.8}/>
        {i % 5 === 0 && (
          <text x={38 + i * 18} y="78" textAnchor="middle" fontSize="9" fill="#333">{i * 5}</text>
        )}
      </g>
    ))}
    <text x="414" y="80" fontSize="8" fill="#666">mm</text>
    {/* Fixed jaw */}
    <rect x="28" y="60" width="50" height="56" rx="3" fill="#d4d4d4" stroke="#aaa" strokeWidth="1.5"/>
    <rect x="28" y="114" width="50" height="48" rx="3" fill="#d4d4d4" stroke="#aaa" strokeWidth="1.5"/>
    {/* Sliding jaw */}
    <rect x="158" y="84" width="55" height="130" rx="3" fill="#b8b8b8" stroke="#888" strokeWidth="1.5"/>
    <rect x="160" y="60" width="50" height="36" rx="3" fill="#b4b4b4" stroke="#888" strokeWidth="1.5"/>
    <rect x="160" y="114" width="50" height="48" rx="3" fill="#b4b4b4" stroke="#888" strokeWidth="1.5"/>
    {/* Vernier scale on slider */}
    {Array.from({length: 11}, (_, i) => (
      <line key={i} x1={167 + i * 10} y1="84" x2={167 + i * 10} y2={i % 5 === 0 ? 76 : 80}
        stroke="#444" strokeWidth="0.8"/>
    ))}
    {/* Depth gauge rod */}
    <rect x="198" y="97" width="232" height="10" rx="3" fill="#aaa" stroke="#888" strokeWidth="1.2"/>
    {/* Lock screw */}
    <ellipse cx="206" cy="102" rx="8" ry="6" fill="#666"/>
    <line x1="206" y1="96" x2="206" y2="108" stroke="#aaa" strokeWidth="1.5"/>
    {/* Gap guide lines */}
    <line x1="78" y1="60"  x2="160" y2="60"  stroke="#aaa" strokeWidth="0.8" strokeDasharray="3,2"/>
    <line x1="78" y1="162" x2="160" y2="162" stroke="#aaa" strokeWidth="0.8" strokeDasharray="3,2"/>
    {/* Caption */}
    <text x="250" y="190" textAnchor="middle" fontSize="13"
      fontFamily="'Malgun Gothic','Arial',sans-serif" fill="#333" fontWeight="bold">버니어 캘리퍼스</text>
  </svg>
);

// ── 스패너 (Open-End Wrench) ───────────────────────────────────────────────────
export const ImageSpanner = () => (
  <svg viewBox="0 0 440 160" xmlns="http://www.w3.org/2000/svg"
    className="w-full max-w-lg mx-auto rounded-lg border border-gray-200 shadow-sm bg-white">
    <rect width="440" height="160" fill="white"/>
    {/* Handle */}
    <rect x="105" y="62" width="268" height="34" rx="17" fill="#c0c0c0" stroke="#999" strokeWidth="1.5"/>
    <rect x="105" y="62" width="268" height="12" rx="6" fill="white" opacity="0.28"/>
    {/* Knurling grip marks */}
    {Array.from({length: 9}, (_, i) => (
      <rect key={i} x={160 + i * 22} y="64" width="8" height="30" rx="3"
        fill="#aaa" opacity="0.25"/>
    ))}
    {/* Open-end head — upper jaw */}
    <path d="M105,62 L50,58 L42,46 L32,50 L32,64 L105,68 Z"
      fill="#b8b8b8" stroke="#999" strokeWidth="1.5"/>
    {/* Open-end head — lower jaw */}
    <path d="M105,96 L50,100 L42,112 L32,108 L32,94 L105,90 Z"
      fill="#b8b8b8" stroke="#999" strokeWidth="1.5"/>
    {/* Back plate */}
    <path d="M32,50 L18,56 L18,102 L32,108 L32,64 Z"
      fill="#a8a8a8" stroke="#888" strokeWidth="1.5"/>
    {/* Box end — right */}
    <circle cx="383" cy="79" r="34" fill="none" stroke="#c0c0c0" strokeWidth="20"/>
    <circle cx="383" cy="79" r="16" fill="white" stroke="#ccc" strokeWidth="1"/>
    <polygon points="383,65 394,72 394,86 383,93 372,86 372,72"
      fill="none" stroke="#999" strokeWidth="2"/>
    {/* Caption */}
    <text x="220" y="146" textAnchor="middle" fontSize="14"
      fontFamily="'Malgun Gothic','Arial',sans-serif" fill="#444" fontWeight="bold">스패너</text>
  </svg>
);

// ── 작업 순서 — 농업 (A: 장갑착용 · B: 손씻기 · C: 작업시작) → 정답 B–A–C ────
export const ImageWorkSeqAgri = () => (
  <svg viewBox="0 0 510 244" xmlns="http://www.w3.org/2000/svg"
    className="w-full max-w-xl mx-auto rounded-lg border border-gray-200 shadow bg-gray-50">
    <rect width="510" height="244" fill="#f8f8f6"/>
    {/* Header bar */}
    <rect x="0" y="0" width="510" height="36" rx="8" fill="#1a3a6b"/>
    <rect x="0" y="28" width="510" height="8" fill="#1a3a6b"/>
    <text x="255" y="24" textAnchor="middle" fontSize="15" fill="white" fontWeight="bold"
      fontFamily="'Malgun Gothic','Arial',sans-serif">작업 순서</text>
    {/* Three panels */}
    <rect x="8"   y="44" width="152" height="156" rx="10" fill="white" stroke="#dde" strokeWidth="1.5"/>
    <rect x="179" y="44" width="152" height="156" rx="10" fill="white" stroke="#dde" strokeWidth="1.5"/>
    <rect x="350" y="44" width="152" height="156" rx="10" fill="white" stroke="#dde" strokeWidth="1.5"/>
    {/* Arrows */}
    <polygon points="164,118 175,111 175,125" fill="#cc3300"/>
    <polygon points="335,118 346,111 346,125" fill="#cc3300"/>

    {/* ── Panel A: 장갑을 착용하기 (Green work glove) ─── */}
    <rect x="38"  y="112" width="72" height="54" rx="8" fill="#39a048"/>
    <rect x="28"  y="130" width="16" height="30" rx="8" fill="#39a048"/>
    <rect x="40"  y="84"  width="14" height="36" rx="7" fill="#39a048"/>
    <rect x="56"  y="78"  width="14" height="38" rx="7" fill="#39a048"/>
    <rect x="72"  y="80"  width="14" height="36" rx="7" fill="#39a048"/>
    <rect x="88"  y="88"  width="12" height="28" rx="6" fill="#39a048"/>
    <rect x="38"  y="160" width="72" height="10" rx="4" fill="#2a7a36"/>
    <text x="84"  y="210" textAnchor="middle" fontSize="23" fill="#1a3a6b" fontWeight="bold" fontFamily="Arial">A</text>
    <text x="84"  y="225" textAnchor="middle" fontSize="9"  fill="#555"
      fontFamily="'Malgun Gothic','Arial',sans-serif">장갑 착용</text>

    {/* ── Panel B: 손을 씻기 (Faucet + hands) ─── */}
    <rect x="246" y="62" width="12" height="32" rx="4" fill="#888"/>
    <path d="M252,90 Q285,90 285,108" fill="none" stroke="#888" strokeWidth="10" strokeLinecap="round"/>
    <rect x="236" y="60" width="32" height="8" rx="4" fill="#aaa"/>
    <ellipse cx="285" cy="120" rx="4" ry="9" fill="#5bc0eb" opacity="0.82"/>
    <ellipse cx="278" cy="126" rx="3" ry="7" fill="#5bc0eb" opacity="0.6"/>
    <ellipse cx="292" cy="125" rx="3" ry="6" fill="#5bc0eb" opacity="0.6"/>
    {/* Left hand */}
    <path d="M238,144 Q230,136 234,127 L255,127 L255,152 L238,152 Z" fill="#f5c9a0"/>
    <rect x="234" y="114" width="9" height="17" rx="4.5" fill="#f5c9a0"/>
    <rect x="245" y="110" width="9" height="19" rx="4.5" fill="#f5c9a0"/>
    {/* Right hand */}
    <path d="M268,144 Q276,136 272,127 L255,127 L255,152 L268,152 Z" fill="#f0be96"/>
    <rect x="268" y="114" width="9" height="17" rx="4.5" fill="#f0be96"/>
    <rect x="279" y="110" width="9" height="19" rx="4.5" fill="#f0be96"/>
    <text x="255" y="210" textAnchor="middle" fontSize="23" fill="#1a3a6b" fontWeight="bold" fontFamily="Arial">B</text>
    <text x="255" y="225" textAnchor="middle" fontSize="9"  fill="#555"
      fontFamily="'Malgun Gothic','Arial',sans-serif">손 씻기</text>

    {/* ── Panel C: 작업을 시작하기 (Worker in field) ─── */}
    <circle cx="426" cy="82" r="18" fill="#f5c9a0"/>
    <path d="M409,82 Q409,60 426,57 Q443,60 443,82Z" fill="#ff9800"/>
    <rect x="406" y="78" width="40" height="8" rx="4" fill="#e08000"/>
    <rect x="412" y="100" width="28" height="46" rx="6" fill="#2a7a38"/>
    <path d="M412,103 L386,116 L386,122 L406,112 L412,112 Z" fill="#2a7a38"/>
    <rect x="440" y="100" width="22" height="9" rx="4" fill="#2a7a38"/>
    <line x1="386" y1="118" x2="374" y2="172" stroke="#7a5030" strokeWidth="4" strokeLinecap="round"/>
    <rect x="364" y="170" width="22" height="6" rx="3" fill="#5a3018"/>
    <ellipse cx="400" cy="176" rx="36" ry="6" fill="#b8903a" opacity="0.45"/>
    <line x1="408" y1="176" x2="408" y2="155" stroke="#2a8a20" strokeWidth="2"/>
    <ellipse cx="403" cy="153" rx="7" ry="4" fill="#3aaa28" transform="rotate(-20,403,153)"/>
    <ellipse cx="413" cy="150" rx="7" ry="4" fill="#3aaa28" transform="rotate(25,413,150)"/>
    <rect x="413" y="144" width="9" height="26" rx="4" fill="#1a5a28"/>
    <rect x="428" y="144" width="9" height="26" rx="4" fill="#1a5a28"/>
    <line x1="350" y1="173" x2="502" y2="173" stroke="#b8903a" strokeWidth="2"/>
    <text x="426" y="210" textAnchor="middle" fontSize="23" fill="#1a3a6b" fontWeight="bold" fontFamily="Arial">C</text>
    <text x="426" y="225" textAnchor="middle" fontSize="9"  fill="#555"
      fontFamily="'Malgun Gothic','Arial',sans-serif">작업 시작</text>
  </svg>
);

// ── 작업 순서 — 산업 (A: 기계점검 · B: 전원켜기 · C: 작업시작) → 정답 A–B–C ──
export const ImageWorkSeqInd = () => (
  <svg viewBox="0 0 510 244" xmlns="http://www.w3.org/2000/svg"
    className="w-full max-w-xl mx-auto rounded-lg border border-gray-200 shadow bg-gray-50">
    <rect width="510" height="244" fill="#f8f8f6"/>
    {/* Header bar */}
    <rect x="0" y="0" width="510" height="36" rx="8" fill="#1a3a6b"/>
    <rect x="0" y="28" width="510" height="8" fill="#1a3a6b"/>
    <text x="255" y="24" textAnchor="middle" fontSize="15" fill="white" fontWeight="bold"
      fontFamily="'Malgun Gothic','Arial',sans-serif">작업 순서</text>
    {/* Three panels */}
    <rect x="8"   y="44" width="152" height="156" rx="10" fill="white" stroke="#dde" strokeWidth="1.5"/>
    <rect x="179" y="44" width="152" height="156" rx="10" fill="white" stroke="#dde" strokeWidth="1.5"/>
    <rect x="350" y="44" width="152" height="156" rx="10" fill="white" stroke="#dde" strokeWidth="1.5"/>
    <polygon points="164,118 175,111 175,125" fill="#cc3300"/>
    <polygon points="335,118 346,111 346,125" fill="#cc3300"/>

    {/* ── Panel A: 기계를 점검하기 (Machine + green checkmark) ─── */}
    <rect x="26"  y="66" width="94" height="86" rx="8" fill="#dce8f4" stroke="#8aacc8" strokeWidth="2"/>
    <rect x="33"  y="73" width="36" height="22" rx="4" fill="#c0d4e8" stroke="#8aacc8" strokeWidth="1"/>
    <rect x="76"  y="73" width="36" height="22" rx="4" fill="#c0d4e8" stroke="#8aacc8" strokeWidth="1"/>
    <circle cx="52"  cy="118" r="13" fill="#b8b8b8" stroke="#999" strokeWidth="1.5"/>
    <circle cx="52"  cy="118" r="6"  fill="#888"/>
    <rect x="70"  y="110" width="42" height="8" rx="3" fill="#9ab870"/>
    <rect x="70"  y="122" width="42" height="8" rx="3" fill="#dab840"/>
    <circle cx="116" cy="72" r="20" fill="#22c55e"/>
    <path d="M105,72 L113,80 L127,62" stroke="white" strokeWidth="4"
      fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <text x="84"  y="210" textAnchor="middle" fontSize="23" fill="#1a3a6b" fontWeight="bold" fontFamily="Arial">A</text>
    <text x="84"  y="225" textAnchor="middle" fontSize="9"  fill="#555"
      fontFamily="'Malgun Gothic','Arial',sans-serif">기계 점검</text>

    {/* ── Panel B: 전원을 켜기 (Glowing power button) ─── */}
    <rect x="203" y="62" width="104" height="118" rx="12" fill="#222"/>
    <rect x="210" y="69" width="90" height="105" rx="10" fill="#1a1a1a"/>
    <circle cx="255" cy="132" r="32" fill="#2c2c2c"/>
    <circle cx="255" cy="132" r="27" fill="#333" stroke="#22ff44" strokeWidth="2.5"/>
    <path d="M255,112 L255,126" stroke="#22ff44" strokeWidth="5" strokeLinecap="round"/>
    <path d="M243,116 Q234,126 234,138 Q234,158 255,158 Q276,158 276,138 Q276,126 267,116"
      fill="none" stroke="#22ff44" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="255" cy="132" r="34" fill="none" stroke="#22ff44" strokeWidth="1.2" opacity="0.35"/>
    <circle cx="255" cy="132" r="40" fill="none" stroke="#22ff44" strokeWidth="0.6" opacity="0.18"/>
    {/* Finger */}
    <circle cx="255" cy="84" r="15" fill="#f5c9a0"/>
    <rect x="251" y="60" width="8" height="28" rx="4" fill="#f5c9a0"/>
    <text x="255" y="210" textAnchor="middle" fontSize="23" fill="#1a3a6b" fontWeight="bold" fontFamily="Arial">B</text>
    <text x="255" y="225" textAnchor="middle" fontSize="9"  fill="#555"
      fontFamily="'Malgun Gothic','Arial',sans-serif">전원 켜기</text>

    {/* ── Panel C: 작업을 시작하기 (Worker at machine) ─── */}
    <rect x="388" y="96" width="102" height="74" rx="6" fill="#d4e4f4" stroke="#6a9cc4" strokeWidth="1.5"/>
    <rect x="394" y="102" width="90" height="56" rx="4" fill="#3a7ab0"/>
    <polyline points="400,148 412,138 424,142 438,128 452,134 466,120 480,124"
      stroke="#88ff88" strokeWidth="2.5" fill="none"/>
    <rect x="388" y="166" width="102" height="6" rx="2" fill="#8aaccc"/>
    {/* Worker figure */}
    <circle cx="376" cy="84" r="16" fill="#f5c9a0"/>
    <path d="M361,84 Q361,63 376,60 Q391,63 391,84Z" fill="#2060c0"/>
    <rect x="359" y="78" width="34" height="9" rx="4" fill="#1a50aa"/>
    <rect x="362" y="100" width="28" height="42" rx="6" fill="#2060c0"/>
    <path d="M390,104 L440,104 L440,113 L390,113 Z" fill="#2060c0"/>
    <rect x="363" y="140" width="9" height="22" rx="4" fill="#1a50aa"/>
    <rect x="379" y="140" width="9" height="22" rx="4" fill="#1a50aa"/>
    <line x1="350" y1="164" x2="502" y2="164" stroke="#aaa" strokeWidth="1.5"/>
    <text x="426" y="210" textAnchor="middle" fontSize="23" fill="#1a3a6b" fontWeight="bold" fontFamily="Arial">C</text>
    <text x="426" y="225" textAnchor="middle" fontSize="9"  fill="#555"
      fontFamily="'Malgun Gothic','Arial',sans-serif">작업 시작</text>
  </svg>
);

// ═══════════════════════════════════════════════════════════════════════════
// IMAGE-OPTION COMPONENTS  (used in imageOptions[] on questions)
// Each exports 4 small SVG panels — one per answer choice ①②③④
// ═══════════════════════════════════════════════════════════════════════════

// ── R89-OPT: Agriculture PPE — 4 items (helmet / goggles / boots / gloves)
export const AgriPPE_helmet = () => (
  <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="w-full rounded border border-gray-200 bg-white">
    <rect width="120" height="100" fill="#f0f9ff"/>
    {/* Hard hat */}
    <ellipse cx="60" cy="52" rx="36" ry="10" fill="#facc15"/>
    <path d="M24 52 Q24 28 60 24 Q96 28 96 52 Z" fill="#fbbf24"/>
    <rect x="20" y="52" width="80" height="6" rx="3" fill="#f59e0b"/>
    {/* brim highlight */}
    <ellipse cx="60" cy="52" rx="36" ry="4" fill="none" stroke="#92400e" strokeWidth="1.5"/>
    <text x="60" y="84" textAnchor="middle" fontSize="11" fontFamily="Arial" fill="#1e3a5f" fontWeight="bold">안전모</text>
    <text x="60" y="96" textAnchor="middle" fontSize="9" fontFamily="Arial" fill="#555">hard hat</text>
  </svg>
);
export const AgriPPE_goggles = () => (
  <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="w-full rounded border border-gray-200 bg-white">
    <rect width="120" height="100" fill="#f0fdf4"/>
    {/* Goggles strap */}
    <rect x="10" y="38" width="100" height="22" rx="11" fill="#d1d5db"/>
    {/* Left lens */}
    <rect x="16" y="40" width="36" height="18" rx="8" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2"/>
    {/* Right lens */}
    <rect x="68" y="40" width="36" height="18" rx="8" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2"/>
    {/* Nose bridge */}
    <rect x="52" y="45" width="16" height="6" rx="3" fill="#9ca3af"/>
    <text x="60" y="78" textAnchor="middle" fontSize="11" fontFamily="Arial" fill="#1e3a5f" fontWeight="bold">보안경</text>
    <text x="60" y="90" textAnchor="middle" fontSize="9" fontFamily="Arial" fill="#555">safety goggles</text>
  </svg>
);
export const AgriPPE_boots = () => (
  <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="w-full rounded border border-gray-200 bg-white">
    <rect width="120" height="100" fill="#fefce8"/>
    {/* Boot outline */}
    <path d="M30 72 L30 32 Q30 22 42 22 L56 22 Q66 22 66 32 L66 58 L82 58 Q90 58 90 66 L90 72 Z" fill="#44403c" stroke="#1c1917" strokeWidth="1.5"/>
    {/* Boot highlight */}
    <path d="M34 34 Q34 26 44 26 L54 26 Q60 26 60 34 L60 40" fill="none" stroke="#78716c" strokeWidth="2"/>
    {/* Sole */}
    <rect x="28" y="70" width="64" height="7" rx="3" fill="#1c1917"/>
    <text x="60" y="88" textAnchor="middle" fontSize="11" fontFamily="Arial" fill="#1e3a5f" fontWeight="bold">안전화</text>
    <text x="60" y="98" textAnchor="middle" fontSize="9" fontFamily="Arial" fill="#555">safety boots</text>
  </svg>
);
export const AgriPPE_gloves = () => (
  <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="w-full rounded border border-gray-200 bg-white">
    <rect width="120" height="100" fill="#fff7ed"/>
    {/* Glove body */}
    <path d="M30 70 L30 46 Q30 40 36 40 L40 40 L40 28 Q40 22 46 22 Q52 22 52 28 L52 40 L56 40 L56 30 Q56 24 62 24 Q68 24 68 30 L68 40 L72 40 L72 34 Q72 28 78 28 Q84 28 84 34 L84 44 L88 44 Q94 44 94 52 L94 70 Z" fill="#d97706"/>
    <text x="60" y="84" textAnchor="middle" fontSize="11" fontFamily="Arial" fill="#1e3a5f" fontWeight="bold">보호 장갑</text>
    <text x="60" y="96" textAnchor="middle" fontSize="9" fontFamily="Arial" fill="#555">protective gloves</text>
  </svg>
);

// ── R90-OPT: Industry tools — drill / wrench / electric drill / angle grinder
export const IndTool_hammer = () => (
  <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="w-full rounded border border-gray-200 bg-white">
    <rect width="120" height="100" fill="#f8fafc"/>
    {/* Handle */}
    <rect x="54" y="48" width="14" height="44" rx="5" fill="#92400e"/>
    {/* Head */}
    <rect x="28" y="26" width="64" height="26" rx="6" fill="#374151"/>
    {/* Head highlight */}
    <rect x="30" y="28" width="60" height="5" rx="2" fill="#6b7280"/>
    <text x="60" y="98" textAnchor="middle" fontSize="10" fontFamily="Arial" fill="#1e3a5f" fontWeight="bold">해머(망치)</text>
  </svg>
);
export const IndTool_wrench = () => (
  <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="w-full rounded border border-gray-200 bg-white">
    <rect width="120" height="100" fill="#f8fafc"/>
    {/* Wrench body */}
    <rect x="28" y="44" width="64" height="14" rx="7" fill="#374151"/>
    {/* Open end */}
    <path d="M28 44 Q20 44 18 51 Q20 58 28 58" fill="none" stroke="#374151" strokeWidth="5"/>
    <path d="M22 46 L14 46 L14 56 L22 56" fill="#374151"/>
    {/* Box end */}
    <rect x="84" y="38" width="18" height="26" rx="5" fill="#374151"/>
    <rect x="88" y="44" width="10" height="14" rx="3" fill="#6b7280"/>
    <text x="60" y="76" textAnchor="middle" fontSize="10" fontFamily="Arial" fill="#1e3a5f" fontWeight="bold">스패너(렌치)</text>
    <text x="60" y="88" textAnchor="middle" fontSize="9" fontFamily="Arial" fill="#555">wrench/spanner</text>
  </svg>
);
export const IndTool_drillBit = () => (
  <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="w-full rounded border border-gray-200 bg-white">
    <rect width="120" height="100" fill="#f8fafc"/>
    {/* Drill body */}
    <rect x="20" y="38" width="56" height="26" rx="8" fill="#1d4ed8"/>
    {/* Drill bit */}
    <rect x="76" y="47" width="26" height="8" rx="2" fill="#9ca3af"/>
    <polygon points="102,47 110,51 102,55" fill="#6b7280"/>
    {/* Trigger */}
    <rect x="36" y="62" width="12" height="16" rx="4" fill="#1e40af"/>
    {/* Chuck */}
    <rect x="72" y="44" width="8" height="14" rx="3" fill="#374151"/>
    <text x="60" y="90" textAnchor="middle" fontSize="10" fontFamily="Arial" fill="#1e3a5f" fontWeight="bold">전동 드릴</text>
    <text x="60" y="100" textAnchor="middle" fontSize="9" fontFamily="Arial" fill="#555">electric drill</text>
  </svg>
);
export const IndTool_angleGrinder = () => (
  <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="w-full rounded border border-gray-200 bg-white">
    <rect width="120" height="100" fill="#f8fafc"/>
    {/* Body */}
    <rect x="18" y="34" width="50" height="28" rx="8" fill="#374151"/>
    {/* Guard */}
    <path d="M68 42 Q86 42 86 58 Q86 72 68 72 L68 60 Q76 60 76 52 Q76 44 68 44 Z" fill="#6b7280"/>
    {/* Wheel */}
    <circle cx="74" cy="57" r="14" fill="#d1d5db" stroke="#9ca3af" strokeWidth="2"/>
    <circle cx="74" cy="57" r="4" fill="#374151"/>
    {/* Sparks */}
    {[[82,68],[90,72],[86,62]].map(([x,y],i)=>(
      <line key={i} x1="82" y1="64" x2={x} y2={y} stroke="#fbbf24" strokeWidth="2"/>
    ))}
    <text x="52" y="78" textAnchor="middle" fontSize="10" fontFamily="Arial" fill="#1e3a5f" fontWeight="bold">그라인더</text>
    <text x="52" y="90" textAnchor="middle" fontSize="9" fontFamily="Arial" fill="#555">angle grinder</text>
  </svg>
);

// ── R91-OPT: Agri actions — seeding / watering / harvesting / spraying pesticide
export const AgriAction_seeding = () => (
  <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="w-full rounded border border-gray-200 bg-white">
    <rect width="120" height="100" fill="#f0fdf4"/>
    {/* Ground */}
    <rect x="0" y="68" width="120" height="32" fill="#92400e"/>
    {/* Furrow lines */}
    {[20,50,80].map(x=><ellipse key={x} cx={x} cy="68" rx="16" ry="4" fill="#78350f"/>)}
    {/* Seeds */}
    {[20,50,80].map(x=><ellipse key={x+'s'} cx={x} cy="64" rx="5" ry="4" fill="#d97706"/>)}
    {/* Hand scattering */}
    <path d="M88 28 Q100 26 104 38 Q100 40 96 36 Q92 42 88 44" fill="#fde68a" stroke="#d97706" strokeWidth="1.5"/>
    {/* Seed dots in air */}
    {[[70,42],[75,36],[80,45],[85,30]].map(([x,y],i)=>(
      <circle key={i} cx={x} cy={y} r="3" fill="#d97706"/>
    ))}
    <text x="60" y="88" textAnchor="middle" fontSize="11" fontFamily="Arial" fill="#14532d" fontWeight="bold">파종</text>
    <text x="60" y="99" textAnchor="middle" fontSize="9" fontFamily="Arial" fill="#555">seeding</text>
  </svg>
);
export const AgriAction_watering = () => (
  <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="w-full rounded border border-gray-200 bg-white">
    <rect width="120" height="100" fill="#eff6ff"/>
    {/* Watering can body */}
    <ellipse cx="46" cy="52" rx="24" ry="18" fill="#3b82f6"/>
    <rect x="22" y="52" width="48" height="14" rx="0" fill="#2563eb"/>
    {/* Spout */}
    <path d="M70 46 Q90 40 94 48" fill="none" stroke="#1d4ed8" strokeWidth="5" strokeLinecap="round"/>
    <path d="M94 48 L88 52 L84 46 Z" fill="#1d4ed8"/>
    {/* Handle */}
    <path d="M34 36 Q24 28 26 46" fill="none" stroke="#1d4ed8" strokeWidth="4" strokeLinecap="round"/>
    {/* Water drops */}
    {[[92,56],[97,62],[90,64],[86,58]].map(([x,y],i)=>(
      <ellipse key={i} cx={x} cy={y} rx="2.5" ry="3.5" fill="#93c5fd"/>
    ))}
    {/* Plant */}
    <rect x="56" y="68" width="6" height="16" fill="#16a34a"/>
    <ellipse cx="59" cy="66" rx="10" ry="8" fill="#22c55e"/>
    <text x="60" y="92" textAnchor="middle" fontSize="11" fontFamily="Arial" fill="#1e3a5f" fontWeight="bold">물주기</text>
    <text x="60" y="100" textAnchor="middle" fontSize="9" fontFamily="Arial" fill="#555">watering</text>
  </svg>
);
export const AgriAction_harvesting = () => (
  <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="w-full rounded border border-gray-200 bg-white">
    <rect width="120" height="100" fill="#fefce8"/>
    {/* Rice stalks */}
    {[22,40,58,76,94].map(x=>(
      <g key={x}>
        <rect x={x-2} y="44" width="4" height="30" fill="#92400e"/>
        <ellipse cx={x} cy="40" rx="8" ry="10" fill="#ca8a04"/>
        {/* grain dots */}
        {[-6,-2,2,6].map(dx=><circle key={dx} cx={x+dx} cy={38+Math.abs(dx)} r="2.5" fill="#fbbf24"/>)}
      </g>
    ))}
    {/* Ground */}
    <rect x="0" y="72" width="120" height="28" fill="#92400e"/>
    {/* Sickle */}
    <path d="M96 56 Q108 48 108 60 Q108 70 96 66" fill="none" stroke="#374151" strokeWidth="3.5" strokeLinecap="round"/>
    <rect x="96" y="62" width="14" height="4" rx="2" fill="#92400e"/>
    <text x="60" y="90" textAnchor="middle" fontSize="11" fontFamily="Arial" fill="#1e3a5f" fontWeight="bold">수확</text>
    <text x="60" y="100" textAnchor="middle" fontSize="9" fontFamily="Arial" fill="#555">harvesting</text>
  </svg>
);
export const AgriAction_pesticide = () => (
  <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="w-full rounded border border-gray-200 bg-white">
    <rect width="120" height="100" fill="#f0fdf4"/>
    {/* Person in PPE */}
    <circle cx="60" cy="22" r="10" fill="#fde68a"/>
    {/* Protective suit */}
    <path d="M46 38 L74 38 L78 72 L62 74 L62 74 L58 74 L42 72 Z" fill="#6ee7b7"/>
    {/* Mask */}
    <rect x="50" y="18" width="20" height="10" rx="5" fill="#4ade80" stroke="#16a34a" strokeWidth="1.5"/>
    {/* Sprayer tank on back */}
    <rect x="76" y="38" width="16" height="26" rx="4" fill="#374151"/>
    {/* Hose */}
    <path d="M76 50 Q70 48 66 60 Q62 68 58 66" fill="none" stroke="#374151" strokeWidth="3"/>
    {/* Nozzle spray */}
    {[[50,68],[46,73],[42,68],[54,74]].map(([x,y],i)=>(
      <circle key={i} cx={x} cy={y} r="2" fill="#86efac" opacity="0.8"/>
    ))}
    <text x="60" y="88" textAnchor="middle" fontSize="11" fontFamily="Arial" fill="#14532d" fontWeight="bold">농약 살포</text>
    <text x="60" y="99" textAnchor="middle" fontSize="9" fontFamily="Arial" fill="#555">pesticide spray</text>
  </svg>
);

// ── R92-OPT: Industry safety signs — 4 signs (red circle ban / yellow triangle / blue circle mandatory / green rectangle)
export const SafetySign_redBan = () => (
  <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="w-full rounded border border-gray-200 bg-white">
    <rect width="120" height="100" fill="#fff"/>
    <circle cx="60" cy="46" r="32" fill="white" stroke="#dc2626" strokeWidth="7"/>
    <line x1="38" y1="24" x2="82" y2="68" stroke="#dc2626" strokeWidth="7" strokeLinecap="round"/>
    {/* No smoking icon inside */}
    <circle cx="55" cy="44" r="8" fill="#374151"/>
    <rect x="62" y="41" width="12" height="4" rx="2" fill="#374151"/>
    <text x="60" y="88" textAnchor="middle" fontSize="10" fontFamily="Arial" fill="#dc2626" fontWeight="bold">금지 표지</text>
    <text x="60" y="99" textAnchor="middle" fontSize="9" fontFamily="Arial" fill="#555">prohibition</text>
  </svg>
);
export const SafetySign_yellowWarning = () => (
  <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="w-full rounded border border-gray-200 bg-white">
    <rect width="120" height="100" fill="#fff"/>
    <polygon points="60,14 102,80 18,80" fill="#fef08a" stroke="#ca8a04" strokeWidth="5"/>
    <text x="60" y="66" textAnchor="middle" fontSize="32" fontWeight="bold" fill="#92400e" fontFamily="Arial">!</text>
    <text x="60" y="88" textAnchor="middle" fontSize="10" fontFamily="Arial" fill="#92400e" fontWeight="bold">경고 표지</text>
    <text x="60" y="99" textAnchor="middle" fontSize="9" fontFamily="Arial" fill="#555">warning</text>
  </svg>
);
export const SafetySign_blueMandatory = () => (
  <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="w-full rounded border border-gray-200 bg-white">
    <rect width="120" height="100" fill="#fff"/>
    <circle cx="60" cy="44" r="32" fill="#1d4ed8"/>
    {/* Hard hat icon */}
    <ellipse cx="60" cy="52" rx="18" ry="5" fill="white"/>
    <path d="M42 52 Q42 34 60 30 Q78 34 78 52 Z" fill="white"/>
    <text x="60" y="88" textAnchor="middle" fontSize="10" fontFamily="Arial" fill="#1d4ed8" fontWeight="bold">지시 표지</text>
    <text x="60" y="99" textAnchor="middle" fontSize="9" fontFamily="Arial" fill="#555">mandatory</text>
  </svg>
);
export const SafetySign_greenInfo = () => (
  <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="w-full rounded border border-gray-200 bg-white">
    <rect width="120" height="100" fill="#fff"/>
    <rect x="14" y="22" width="92" height="52" rx="6" fill="#16a34a"/>
    {/* Exit arrow */}
    <rect x="28" y="36" width="24" height="24" rx="2" fill="white"/>
    <polygon points="52,46 52,52 70,48" fill="white"/>
    <rect x="70" y="42" width="18" height="14" rx="2" fill="white"/>
    <text x="60" y="86" textAnchor="middle" fontSize="10" fontFamily="Arial" fill="#16a34a" fontWeight="bold">안내 표지</text>
    <text x="60" y="97" textAnchor="middle" fontSize="9" fontFamily="Arial" fill="#555">information</text>
  </svg>
);

// ── L-OPT: Listening image options — 4 workplace scenes
// L65/L66 AGRI: greenhouse / outdoor field / livestock barn / fruit orchard
export const AgriScene_greenhouse = () => (
  <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="w-full rounded border border-gray-200 bg-white">
    <rect width="120" height="100" fill="#ecfdf5"/>
    {/* Frame */}
    <path d="M10 80 L10 40 L60 12 L110 40 L110 80 Z" fill="none" stroke="#6ee7b7" strokeWidth="3"/>
    {/* Panels */}
    <path d="M10 40 L60 12 L110 40" fill="#bbf7d0" opacity="0.5"/>
    {/* Vertical supports */}
    {[35,60,85].map(x=><line key={x} x1={x} y1={x<60?12+(x-10)*0.56:12+(110-x)*0.56} x2={x} y2="80" stroke="#6ee7b7" strokeWidth="1.5"/>)}
    {/* Horizontal rails */}
    <line x1="10" y1="58" x2="110" y2="58" stroke="#6ee7b7" strokeWidth="1.5"/>
    {/* Plants inside */}
    {[22,44,66,88].map(x=>(
      <g key={x}>
        <rect x={x-2} y="64" width="4" height="16" fill="#16a34a"/>
        <ellipse cx={x} cy="62" rx="9" ry="7" fill="#22c55e"/>
      </g>
    ))}
    <text x="60" y="94" textAnchor="middle" fontSize="10" fontFamily="Arial" fill="#14532d" fontWeight="bold">비닐하우스</text>
  </svg>
);
export const AgriScene_outdoorField = () => (
  <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="w-full rounded border border-gray-200 bg-white">
    <rect width="120" height="100" fill="#fefce8"/>
    {/* Sky */}
    <rect x="0" y="0" width="120" height="55" fill="#bfdbfe"/>
    {/* Sun */}
    <circle cx="90" cy="18" r="12" fill="#fbbf24"/>
    {/* Ground */}
    <rect x="0" y="55" width="120" height="45" fill="#92400e"/>
    {/* Crop rows */}
    {[0,1,2,3].map(row=>(
      <g key={row}>
        {[10,32,54,76,98].map(x=>(
          <g key={x}>
            <rect x={x-2} y={58+row*8} width="3" height="7" fill="#16a34a"/>
            <ellipse cx={x} cy={56+row*8} rx="6" ry="4" fill="#22c55e"/>
          </g>
        ))}
      </g>
    ))}
    <text x="60" y="96" textAnchor="middle" fontSize="10" fontFamily="Arial" fill="#92400e" fontWeight="bold">야외 밭 작업</text>
  </svg>
);
export const AgriScene_livestock = () => (
  <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="w-full rounded border border-gray-200 bg-white">
    <rect width="120" height="100" fill="#fef9c3"/>
    {/* Barn */}
    <rect x="14" y="40" width="92" height="44" fill="#d97706"/>
    <polygon points="14,40 60,12 106,40" fill="#b45309"/>
    {/* Barn door */}
    <rect x="46" y="60" width="28" height="24" rx="2" fill="#92400e"/>
    {/* Window */}
    <rect x="20" y="50" width="18" height="14" rx="2" fill="#fef08a" stroke="#92400e" strokeWidth="1.5"/>
    <line x1="29" y1="50" x2="29" y2="64" stroke="#92400e" strokeWidth="1"/>
    <line x1="20" y1="57" x2="38" y2="57" stroke="#92400e" strokeWidth="1"/>
    {/* Cow silhouette */}
    <ellipse cx="84" cy="62" rx="14" ry="9" fill="#f5f5f4"/>
    <ellipse cx="86" cy="54" rx="8" ry="6" fill="#f5f5f4"/>
    {/* Legs */}
    {[74,80,88,94].map(x=><rect key={x} x={x} y="70" width="4" height="12" rx="2" fill="#d6d3d1"/>)}
    <text x="60" y="94" textAnchor="middle" fontSize="10" fontFamily="Arial" fill="#92400e" fontWeight="bold">축사(가축 농장)</text>
  </svg>
);
export const AgriScene_orchard = () => (
  <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="w-full rounded border border-gray-200 bg-white">
    <rect width="120" height="100" fill="#f0fdf4"/>
    {/* Sky */}
    <rect x="0" y="0" width="120" height="50" fill="#dbeafe"/>
    {/* Ground */}
    <rect x="0" y="72" width="120" height="28" fill="#92400e"/>
    {/* Trees */}
    {[22,58,94].map(x=>(
      <g key={x}>
        <rect x={x-3} y="52" width="6" height="22" fill="#92400e"/>
        <ellipse cx={x} cy="44" rx="18" ry="16" fill="#16a34a"/>
        {/* Fruits */}
        {[[-10,46],[-4,36],[6,40],[12,50],[-8,56],[4,54]].map(([dx,dy],i)=>(
          <circle key={i} cx={x+dx} cy={dy} r="4" fill="#dc2626"/>
        ))}
      </g>
    ))}
    <text x="60" y="94" textAnchor="middle" fontSize="10" fontFamily="Arial" fill="#14532d" fontWeight="bold">과수원(사과 과수원)</text>
  </svg>
);

// ── L-OPT: Industry scenes — welding / machine assembly / conveyor belt / forklift
export const IndScene_welding = () => (
  <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="w-full rounded border border-gray-200 bg-white">
    <rect width="120" height="100" fill="#1e1b18"/>
    {/* Work bench */}
    <rect x="10" y="62" width="100" height="8" rx="2" fill="#44403c"/>
    {/* Metal piece being welded */}
    <rect x="30" y="54" width="60" height="8" rx="2" fill="#6b7280"/>
    {/* Welder silhouette */}
    <circle cx="62" cy="30" r="10" fill="#57534e"/>
    {/* Welding mask */}
    <rect x="54" y="28" width="16" height="12" rx="3" fill="#1c1917"/>
    <rect x="56" y="30" width="12" height="6" rx="1" fill="#fbbf24" opacity="0.6"/>
    <rect x="42" y="40" width="40" height="22" rx="4" fill="#57534e"/>
    {/* Arms */}
    <rect x="30" y="44" width="14" height="8" rx="4" fill="#57534e"/>
    <rect x="76" y="44" width="14" height="8" rx="4" fill="#57534e"/>
    {/* Torch & sparks */}
    <rect x="40" y="52" width="16" height="4" rx="2" fill="#374151"/>
    {[[56,50],[60,46],[64,52],[52,46],[68,48]].map(([x,y],i)=>(
      <line key={i} x1="56" y1="52" x2={x} y2={y} stroke="#fbbf24" strokeWidth="1.5"/>
    ))}
    {/* Welding flash */}
    <circle cx="56" cy="52" r="4" fill="#fef08a" opacity="0.8"/>
    <text x="60" y="86" textAnchor="middle" fontSize="10" fontFamily="Arial" fill="white" fontWeight="bold">용접 작업</text>
    <text x="60" y="97" textAnchor="middle" fontSize="9" fontFamily="Arial" fill="#9ca3af">welding</text>
  </svg>
);
export const IndScene_assembly = () => (
  <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="w-full rounded border border-gray-200 bg-white">
    <rect width="120" height="100" fill="#f8fafc"/>
    {/* Work table */}
    <rect x="10" y="64" width="100" height="8" rx="2" fill="#d1d5db"/>
    {/* Machine part being assembled */}
    <rect x="28" y="44" width="64" height="20" rx="4" fill="#374151"/>
    {/* Bolts */}
    {[36,52,68,84].map(x=>(
      <g key={x}>
        <circle cx={x} cy="54" r="5" fill="#6b7280"/>
        <circle cx={x} cy="54" r="2" fill="#9ca3af"/>
      </g>
    ))}
    {/* Worker hands */}
    <path d="M20 48 Q14 42 14 54 Q14 60 22 58" fill="#fde68a" stroke="#d97706" strokeWidth="1.5"/>
    <path d="M100 48 Q106 42 106 54 Q106 60 98 58" fill="#fde68a" stroke="#d97706" strokeWidth="1.5"/>
    {/* Screwdriver */}
    <rect x="94" y="38" width="4" height="22" rx="2" fill="#374151"/>
    <rect x="92" y="36" width="8" height="6" rx="1" fill="#d97706"/>
    <text x="60" y="84" textAnchor="middle" fontSize="10" fontFamily="Arial" fill="#1e3a5f" fontWeight="bold">조립 작업</text>
    <text x="60" y="95" textAnchor="middle" fontSize="9" fontFamily="Arial" fill="#555">assembly</text>
  </svg>
);
export const IndScene_conveyor = () => (
  <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="w-full rounded border border-gray-200 bg-white">
    <rect width="120" height="100" fill="#f8fafc"/>
    {/* Belt frame */}
    <rect x="8" y="50" width="104" height="18" rx="4" fill="#374151"/>
    {/* Belt surface */}
    <rect x="8" y="52" width="104" height="14" rx="0" fill="#6b7280"/>
    {/* Belt stripes */}
    {[0,1,2,3,4,5,6].map(i=>(
      <rect key={i} x={8+i*16} y="52" width="8" height="14" fill="#4b5563" opacity="0.5"/>
    ))}
    {/* End rollers */}
    <circle cx="12" cy="59" r="10" fill="#374151" stroke="#111827" strokeWidth="2"/>
    <circle cx="108" cy="59" r="10" fill="#374151" stroke="#111827" strokeWidth="2"/>
    <circle cx="12" cy="59" r="4" fill="#6b7280"/>
    <circle cx="108" cy="59" r="4" fill="#6b7280"/>
    {/* Products on belt */}
    {[30,55,80].map(x=>(
      <rect key={x} x={x} y="46" width="18" height="12" rx="2" fill="#fbbf24" stroke="#d97706" strokeWidth="1"/>
    ))}
    <text x="60" y="84" textAnchor="middle" fontSize="10" fontFamily="Arial" fill="#1e3a5f" fontWeight="bold">컨베이어 벨트</text>
    <text x="60" y="95" textAnchor="middle" fontSize="9" fontFamily="Arial" fill="#555">conveyor belt</text>
  </svg>
);
export const IndScene_forklift = () => (
  <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="w-full rounded border border-gray-200 bg-white">
    <rect width="120" height="100" fill="#f8fafc"/>
    {/* Ground */}
    <rect x="0" y="78" width="120" height="22" fill="#e5e7eb"/>
    {/* Forklift body */}
    <rect x="14" y="50" width="52" height="28" rx="4" fill="#fbbf24"/>
    {/* Cab */}
    <rect x="36" y="36" width="30" height="18" rx="3" fill="#fbbf24"/>
    {/* Window */}
    <rect x="40" y="38" width="22" height="12" rx="2" fill="#bfdbfe"/>
    {/* Driver */}
    <circle cx="52" cy="36" r="7" fill="#fde68a"/>
    {/* Mast */}
    <rect x="8" y="18" width="6" height="62" rx="2" fill="#374151"/>
    {/* Forks */}
    <rect x="2" y="70" width="34" height="5" rx="1" fill="#374151"/>
    <rect x="2" y="76" width="34" height="5" rx="1" fill="#374151"/>
    {/* Load on forks */}
    <rect x="4" y="52" width="30" height="18" rx="2" fill="#d97706"/>
    {/* Wheels */}
    <circle cx="28" cy="78" r="8" fill="#1f2937" stroke="#111827" strokeWidth="1.5"/>
    <circle cx="60" cy="78" r="8" fill="#1f2937" stroke="#111827" strokeWidth="1.5"/>
    <circle cx="28" cy="78" r="3" fill="#6b7280"/>
    <circle cx="60" cy="78" r="3" fill="#6b7280"/>
    <text x="72" y="60" textAnchor="middle" fontSize="10" fontFamily="Arial" fill="#1e3a5f" fontWeight="bold">지게차</text>
    <text x="74" y="72" textAnchor="middle" fontSize="9" fontFamily="Arial" fill="#555">forklift</text>
  </svg>
);

// ── Map: bankId → image component ─────────────────────────────────────────
export const QUESTION_IMAGE_COMPONENTS = {
  // General
  R01: ImageQ1,
  R02: ImageQ2,
  R07: ImageFireSign,
  R08: ImageFireSign,
  R15: ImageLiftingPosture,
  // Agriculture — 2026 format
  R26: KeywordChuksa,        // 축사  단어와 관계있는 것
  R27: KeywordBiryo,         // 비료  단어와 관계있는 것
  R28: BlankChurgunJangso,   // 출근 장소: ___
  R29: ImageScaleJoul,       // 저울  그림과 관계있는 내용
  R30: ImageWorkSeqAgri,     // 작업 순서 A-B-C
  R30b: BlankSafetyGear,     // 안전 장비: ___
  // Industry — 2026 format
  R31: ImageVernierCaliper,  // 버니어 캘리퍼스  그림과 관계있는 내용
  R32: KeywordYongjeop,      // 용접  단어와 관계있는 것
  R33: KeywordJigecha,       // 지게차  단어와 관계있는 것
  R34: BlankBohoJangbi,      // 보호 장비: ___
  R35: ImageWorkSeqInd,      // 작업 순서 A-B-C
  R36: ImageSpanner,         // 스패너  그림과 관계있는 내용
};

// ── Map: imageOption key → small SVG panel component ──────────────────────
export const IMAGE_OPTION_COMPONENTS = {
  AgriPPE_helmet,
  AgriPPE_goggles,
  AgriPPE_boots,
  AgriPPE_gloves,
  IndTool_hammer,
  IndTool_wrench,
  IndTool_drillBit,
  IndTool_angleGrinder,
  AgriAction_seeding,
  AgriAction_watering,
  AgriAction_harvesting,
  AgriAction_pesticide,
  SafetySign_redBan,
  SafetySign_yellowWarning,
  SafetySign_blueMandatory,
  SafetySign_greenInfo,
  AgriScene_greenhouse,
  AgriScene_outdoorField,
  AgriScene_livestock,
  AgriScene_orchard,
  IndScene_welding,
  IndScene_assembly,
  IndScene_conveyor,
  IndScene_forklift,
};
