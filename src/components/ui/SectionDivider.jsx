'use client';

import React from 'react';

export const SectionDivider = ({ className = '' }) => {
  return (
    <div className={`relative w-full flex items-center justify-center py-6 pointer-events-none select-none ${className}`}>
      {/* Left Hairline Gradient Line */}
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-[#D4AF37]/60 max-w-xs sm:max-w-md lg:max-w-lg" />
      
      {/* Center Traditional Indian Lotus/Mandala Motif */}
      <div className="mx-4 flex items-center space-x-2 text-[#D4AF37]">
        {/* Left Side Small Sparkle Dot */}
        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/70 shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
        
        {/* Center SVG Lotus Motif */}
        <svg className="w-6 h-6 opacity-80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="50" cy="50" r="12" strokeDasharray="3 2" />
          <path d="M 50,20 C 58,35 58,45 50,50 C 42,45 42,35 50,20 Z" fill="currentColor" fillOpacity="0.15" />
          <path d="M 50,80 C 58,65 58,55 50,50 C 42,55 42,65 50,80 Z" fill="currentColor" fillOpacity="0.15" />
          <path d="M 20,50 C 35,58 45,58 50,50 C 45,42 35,42 20,50 Z" fill="currentColor" fillOpacity="0.15" />
          <path d="M 80,50 C 65,58 55,58 50,50 C 55,42 65,42 80,50 Z" fill="currentColor" fillOpacity="0.15" />
          <circle cx="50" cy="50" r="4" fill="currentColor" />
        </svg>

        {/* Right Side Small Sparkle Dot */}
        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/70 shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
      </div>

      {/* Right Hairline Gradient Line */}
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/35 to-[#D4AF37]/60 max-w-xs sm:max-w-md lg:max-w-lg" />
    </div>
  );
};

export default SectionDivider;
