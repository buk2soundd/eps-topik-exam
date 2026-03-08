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

// ── Map: bankId → image component ─────────────────────────────────────────
export const QUESTION_IMAGE_COMPONENTS = {
  R01: ImageQ1,
  R02: ImageQ2,
  R07: ImageFireSign,
  R08: ImageFireSign,
  R15: ImageLiftingPosture,
  // Agriculture
  R26: ImageTractor,
  R27: ImagePesticideSign,
  R29: ImageGreenhouse,
  // Industry
  R31: ImageExitSign,
  R32: ImageNoSmoking,
  R33: ImageForkliftSign,
  R34: ImageWeldingSign,
  R36: ImageHardHatSign,
};
