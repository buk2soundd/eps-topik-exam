import React from 'react';

/**
 * Top header bar with font size controls and submit button.
 */
const Header = ({ fontSize, setNumber, onFontDecrease, onFontIncrease, onSubmit }) => {
  return (
    <header className="w-full bg-white border-b border-gray-300 flex items-center justify-between px-4 py-2 shadow-sm select-none">
      {/* Left: font size buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onFontDecrease}
          className="border border-gray-400 text-gray-700 font-semibold px-3 py-1 text-sm rounded hover:bg-gray-100 active:bg-gray-200 transition-colors"
          title="Decrease text size"
        >
          - T
        </button>
        <button
          onClick={onFontIncrease}
          className="border border-gray-400 text-gray-700 font-semibold px-3 py-1 text-sm rounded hover:bg-gray-100 active:bg-gray-200 transition-colors"
          title="Increase text size"
        >
          + T
        </button>
        <span className="ml-3 text-xs text-gray-400">ຕົວໜັງສື: {fontSize}px</span>
      </div>

      {/* Center: title + set */}
      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center leading-tight">
        <span className="font-bold text-base text-gray-800 tracking-wider">EPS-TOPIK</span>
        <span className="text-xs text-gray-500">
          CBT Mock Exam &nbsp;|&nbsp;
          <span className="font-bold text-[#1a3a6b]">ຊຸດທີ {setNumber}</span>
        </span>
      </div>

      {/* Right: submit button */}
      <button
        onClick={onSubmit}
        className="bg-[#1a3a6b] hover:bg-[#122d56] active:bg-[#0d2245] text-white font-bold px-6 py-2 rounded text-sm tracking-widest uppercase transition-colors shadow"
      >
        ສົ່ງຄຳຕອບ
      </button>
    </header>
  );
};

export default Header;
