'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeritageBackground() {
  const { scrollY } = useScroll();

  // Subtle parallax transforms for background decorative elements
  const parallaxTop = useTransform(scrollY, [0, 1000], [0, -60]);
  const parallaxMiddle = useTransform(scrollY, [200, 1500], [0, 80]);
  const parallaxBottom = useTransform(scrollY, [800, 2500], [0, -70]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      
      {/* 1. Warm Ivory Base & Soft Gold Radial Light Spots */}
      <div className="absolute inset-0 bg-[#FAF7F2]" />

      {/* Radial depth light spot 1 (Top Hero area) */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[75vw] h-[50vh] bg-gradient-radial from-[#D4AF37]/10 via-[#F3E5AB]/05 to-transparent blur-[120px] rounded-full" />

      {/* Radial depth light spot 2 (Middle Legacy narrative) */}
      <div className="absolute top-[35%] right-[-10%] w-[50vw] h-[60vh] bg-gradient-radial from-[#D4AF37]/08 via-[#FAF7F2]/00 to-transparent blur-[140px] rounded-full" />

      {/* Radial depth light spot 3 (Bottom Testimonials) */}
      <div className="absolute bottom-[10%] left-[-10%] w-[55vw] h-[55vh] bg-gradient-radial from-[#C5A059]/08 via-[#FAF7F2]/00 to-transparent blur-[130px] rounded-full" />

      {/* 2. Seamless SVG Heritage Line-Art Pattern Overlay (Subtle Mithila / Traditional Bihari Floral & Paisley Motifs) */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-[0.045] text-[#997D20]" 
        xmlns="http://www.w3.org/2000/svg" 
        width="100%" 
        height="100%"
      >
        <defs>
          {/* Tileable Seamless Heritage Pattern */}
          <pattern id="heritage-pattern" width="160" height="160" patternUnits="userSpaceOnUse">
            {/* Center Mandala Motif */}
            <circle cx="80" cy="80" r="18" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="80" cy="80" r="10" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 80,62 C 84,68 84,72 80,78 C 76,72 76,68 80,62 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 80,98 C 84,92 84,88 80,82 C 76,88 76,92 80,98 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 62,80 C 68,84 72,84 78,80 C 72,76 68,76 62,80 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 98,80 C 92,84 88,84 82,80 C 88,76 92,76 98,80 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />

            {/* Corner Lotus Elements */}
            <path d="M 0,0 M 0,16 C 8,16 16,8 16,0" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 160,0 M 160,16 C 152,16 144,8 144,0" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 0,160 M 0,144 C 8,144 16,152 16,160" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 160,160 M 160,144 C 152,144 144,152 144,160" fill="none" stroke="currentColor" strokeWidth="0.8" />

            {/* Mithila Diamond Grid Lines */}
            <path d="M 0,80 L 80,0 L 160,80 L 80,160 Z" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="4 4" />
            
            {/* Subtle Paisley Swirl Accent */}
            <path d="M 40,40 Q 55,25 50,45 T 35,50" fill="none" stroke="currentColor" strokeWidth="0.7" />
            <path d="M 120,120 Q 135,105 130,125 T 115,130" fill="none" stroke="currentColor" strokeWidth="0.7" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#heritage-pattern)" />
      </svg>

      {/* 3. Floating Parallax Heritage Decorative Motifs */}

      {/* Top Left Floating Ornamental Mandala */}
      <motion.div 
        style={{ y: parallaxTop }}
        animate={{ rotate: 360 }}
        transition={{ duration: 160, repeat: Infinity, ease: "linear" }}
        className="absolute top-[12%] left-[2%] w-48 h-48 opacity-[0.06] text-[#D4AF37]"
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1.2" strokeDasharray="6 4" />
          <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1" />
          <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.8" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <path
              key={deg}
              d="M 100,30 C 112,50 112,70 100,90 C 88,70 88,50 100,30 Z"
              stroke="currentColor"
              strokeWidth="1"
              transform={`rotate(${deg} 100 100)`}
            />
          ))}
        </svg>
      </motion.div>

      {/* Middle Right Floating Paisley Element */}
      <motion.div 
        style={{ y: parallaxMiddle }}
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[45%] right-[3%] w-56 h-56 opacity-[0.055] text-[#C5A059]"
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path 
            d="M100,20 C150,20 180,60 170,110 C160,160 110,185 70,170 C30,155 20,110 40,70 C55,40 80,20 100,20 Z" 
            stroke="currentColor" 
            strokeWidth="1.2" 
          />
          <path 
            d="M100,40 C135,40 155,70 148,105 C140,140 105,158 75,148 C48,138 40,105 55,75 C66,52 85,40 100,40 Z" 
            stroke="currentColor" 
            strokeWidth="0.9" 
            strokeDasharray="4 3"
          />
          <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Bottom Left Floating Lotus Emblem */}
      <motion.div 
        style={{ y: parallaxBottom }}
        animate={{ rotate: -360 }}
        transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[15%] left-[4%] w-60 h-60 opacity-[0.05] text-[#D4AF37]"
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="1" />
          <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="0.7" strokeDasharray="3 3" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <path
              key={deg}
              d="M 100,15 C 110,45 110,75 100,100 C 90,75 90,45 100,15 Z"
              stroke="currentColor"
              strokeWidth="0.8"
              transform={`rotate(${deg} 100 100)`}
            />
          ))}
        </svg>
      </motion.div>

    </div>
  );
}
