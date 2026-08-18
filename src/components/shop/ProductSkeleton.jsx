'use client';

import React from 'react';

export const ProductSkeleton = () => {
  return (
    <div className="bg-[#F5F0E6] rounded-3xl border border-[#D4AF37]/25 overflow-hidden shadow-sm flex flex-col justify-between h-[420px] animate-pulse">
      {/* Top Image Placeholder */}
      <div className="relative h-56 w-full bg-[#EAE4D7] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-[#E0D7C6]" />
        <div className="absolute top-3 left-3 w-20 h-5 bg-[#E0D7C6] rounded-full" />
        <div className="absolute top-3 right-3 w-8 h-8 bg-[#E0D7C6] rounded-full" />
      </div>

      {/* Content Body Placeholder */}
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="w-24 h-3 bg-[#E0D7C6] rounded-md" />
            <div className="w-10 h-3 bg-[#E0D7C6] rounded-md" />
          </div>

          <div className="w-3/4 h-5 bg-[#E0D7C6] rounded-md" />
          <div className="w-full h-3 bg-[#E0D7C6] rounded-md" />
          <div className="w-4/5 h-3 bg-[#E0D7C6] rounded-md" />
        </div>

        {/* Footer Price & CTA Placeholder */}
        <div className="pt-3 border-t border-[#D4AF37]/20 flex justify-between items-center">
          <div className="space-y-1">
            <div className="w-16 h-5 bg-[#E0D7C6] rounded-md" />
            <div className="w-12 h-2.5 bg-[#E0D7C6] rounded-md" />
          </div>
          <div className="w-24 h-9 bg-[#E0D7C6] rounded-xl" />
        </div>
      </div>
    </div>
  );
};
