import React from 'react';

const Header = ({ fontSize, setNumber, onFontDecrease, onFontIncrease, onSubmit }) => {
  return (
    <header
      className="w-full shrink-0 select-none shadow-md"
      style={{ background: '#1a3a6b', height: '52px' }}
    >
      <div className="flex items-center justify-between h-full px-3 gap-2">

        {/* Left: Logo + title */}
        <div className="flex flex-col justify-center leading-tight min-w-0">
          <span className="font-bold text-white text-sm tracking-widest">EPS-TOPIK</span>
          <span className="text-white text-[9px] opacity-70 tracking-wide hidden sm:block">
            Test of proficiency in Korean
          </span>
        </div>

        {/* Center: font controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onFontDecrease}
            className="border border-white/40 text-white px-2 py-1 text-xs rounded hover:bg-white/20 active:bg-white/30 transition-colors"
          >
            가▼
          </button>
          <span className="text-white text-[10px] opacity-60 w-9 text-center">{fontSize}px</span>
          <button
            onClick={onFontIncrease}
            className="border border-white/40 text-white px-2 py-1 text-xs rounded hover:bg-white/20 active:bg-white/30 transition-colors"
          >
            가▲
          </button>
        </div>

        {/* Right: set + submit */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-white text-[10px] opacity-70 hidden sm:inline">
            SET <span className="font-bold text-yellow-300">{setNumber}</span>
          </span>
          <button
            onClick={onSubmit}
            className="font-bold px-3 py-1.5 text-xs rounded shadow transition-colors"
            style={{ background: '#f5c518', color: '#1a3a6b' }}
          >
            ສົ່ງຄຳຕອບ
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
