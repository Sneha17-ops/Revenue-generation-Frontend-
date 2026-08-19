'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Crown, Sparkles, Heart, ShieldCheck, ArrowRight } from 'lucide-react';
import GradualBlur from '../ui/GradualBlur';
import BlurText from '../ui/BlurText';

export const HeritageStory = () => {
  const pillarItems = [
    {
      word: "TASTE",
      icon: Sparkles,
      desc: "Authentic Gaya Karigar Recipes",
    },
    {
      word: "TRUST",
      icon: ShieldCheck,
      desc: "100% Pure A2 Cow Desi Ghee",
    },
    {
      word: "FAMILY",
      icon: Heart,
      desc: "Generations of Cherished Memories",
    }
  ];

  return (
    <section id="legacy-section" className="relative py-16 sm:py-24 lg:py-28 bg-[#FAF7F2] text-[#0B3D2E] overflow-hidden selection:bg-[#D4AF37]/30 z-10">
      
      {/* Subtle Warm Background Light Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2] via-[#F6F0E6]/70 to-[#FAF7F2] pointer-events-none" />
      
      {/* Indian Ornamental Line-Art Corner Elements */}
      <svg className="absolute top-6 left-6 w-32 h-32 text-[#D4AF37]/20 pointer-events-none select-none hidden sm:block" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
        <circle cx="20" cy="20" r="16" strokeDasharray="2 3" />
        <path d="M 20,4 C 28,12 28,28 20,36 C 12,28 12,12 20,4 Z" fill="currentColor" fillOpacity="0.06" />
        <line x1="20" y1="0" x2="20" y2="40" strokeWidth="0.5" />
        <line x1="0" y1="20" x2="40" y2="20" strokeWidth="0.5" />
      </svg>

      <svg className="absolute bottom-12 right-6 w-36 h-36 text-[#D4AF37]/20 pointer-events-none select-none hidden sm:block" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
        <circle cx="80" cy="80" r="16" strokeDasharray="2 3" />
        <path d="M 80,64 C 88,72 88,88 80,96 C 72,88 72,72 80,64 Z" fill="currentColor" fillOpacity="0.06" />
        <line x1="80" y1="60" x2="80" y2="100" strokeWidth="0.5" />
        <line x1="60" y1="80" x2="100" y2="80" strokeWidth="0.5" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Owner's Original Photograph (Editorial Frame & Depth)       */}
          {/* ========================================================================= */}
          <motion.div 
            initial={{ opacity: 0.9, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center order-1"
          >
            <div className="relative w-full max-w-md mx-auto">
              
              {/* Radial Antique Gold Backlight Glow */}
              <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-[#D4AF37]/25 via-[#F3E5AB]/20 to-transparent blur-2xl opacity-70 pointer-events-none" />

              {/* Main Photo Card Container */}
              <motion.div 
                whileHover={{ scale: 1.02, rotate: -0.4 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative bg-[#FFFFFF] p-3 sm:p-4 rounded-[30px] sm:rounded-[36px] border-2 border-[#D4AF37]/50 shadow-[0_25px_60px_-15px_rgba(11,61,46,0.16)] group transition-all duration-500"
              >
                
                {/* Photo Framing Container - Uncropped portrait */}
                <div className="relative h-[380px] sm:h-[460px] lg:h-[500px] w-full rounded-[24px] sm:rounded-[30px] overflow-hidden bg-[#FAF7F2]">
                  <img 
                    src="/assets/Owner.png" 
                    alt="Founder & Owner - Vindhyawasini Tilkut Bhandar" 
                    className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Subtle Gradient Shadow Base */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06241B]/85 via-transparent to-transparent opacity-85 pointer-events-none" />

                  {/* Top Heritage Badge */}
                  <div className="absolute top-4 left-4 bg-[#FFFFFF]/90 backdrop-blur-md text-[#0B3D2E] text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-xs flex items-center space-x-1.5 z-10">
                    <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Est. 1995 • Gaya Heritage</span>
                  </div>

                  {/* Bottom Owner Caption Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 sm:p-4 bg-[#06241B]/90 backdrop-blur-md rounded-2xl border border-[#D4AF37]/40 text-[#FAF7F2] space-y-1 z-10">
                    <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-[#F3E5AB]">
                      Founder's Vision & Heritage
                    </h3>
                    <p className="text-[11px] text-[#FAF7F2]/80 font-light leading-tight">
                      30+ years of uncompromised authenticity, purity, and family devotion in Gaya sweets.
                    </p>
                  </div>
                </div>

                {/* Outer Decorative Gold Rim Line */}
                <div className="absolute -inset-1 rounded-[38px] border border-[#D4AF37]/25 pointer-events-none" />

              </motion.div>
            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Legacy Narrative, Quote & Three Highlighted Pillars         */}
          {/* ========================================================================= */}
          <motion.div 
            initial={{ opacity: 0.9, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left order-2"
          >
            
            {/* 1. Eyebrow */}
            <div>
              <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-[#0B3D2E] font-bold bg-[#FFFFFF] px-4 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-xs">
                <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>OUR LEGACY</span>
              </div>
            </div>

            {/* 2. Main Heading with BlurText Text Animation */}
            <div className="space-y-1">
              <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B3D2E] leading-[1.12]">
                <BlurText 
                  text="More Than A Sweet." 
                  animateBy="words" 
                  direction="top" 
                  delay={100} 
                  className="text-[#0B3D2E] block"
                />
                <BlurText 
                  text="A Family Tradition." 
                  animateBy="words" 
                  direction="bottom" 
                  delay={120} 
                  className="gold-text-gradient font-cinzel block mt-1"
                />
              </h2>
            </div>

            {/* Decorative Gold Divider */}
            <div className="flex items-center justify-center lg:justify-start space-x-3 py-1">
              <div className="h-[1.5px] w-12 bg-[#D4AF37]" />
              <div className="w-2 h-2 rounded-full bg-[#D4AF37] rotate-45" />
              <div className="h-[1.5px] w-24 bg-[#D4AF37]/40" />
            </div>

            {/* 3. Quote Message */}
            <div className="p-5 sm:p-6 bg-[#FFFFFF] rounded-2xl sm:rounded-3xl border-l-4 border-[#D4AF37] border-y border-r border-[#D4AF37]/25 shadow-xs relative max-w-2xl mx-auto lg:mx-0 text-left">
              <p className="font-serif-luxury text-lg sm:text-xl font-bold text-[#0B3D2E] italic leading-snug">
                "A family's taste becomes a tradition when every generation can trust it."
              </p>
            </div>

            {/* 4. Narrative Paragraph */}
            <p className="text-[#0B3D2E]/85 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto lg:mx-0">
              For us, every sweet carries more than flavour. It carries the warmth of family, the trust of generations, and the taste of memories made together. Handcrafted daily in pure A2 Cow Desi Ghee using time-honored artisanal methods.
            </p>

            {/* 5. Three Highlighted Words: TASTE • TRUST • FAMILY */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-2 max-w-2xl mx-auto lg:mx-0">
              {pillarItems.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div 
                    key={idx}
                    className="p-3 sm:p-4 bg-[#FFFFFF] rounded-2xl border border-[#D4AF37]/35 shadow-xs text-center space-y-1 hover:border-[#D4AF37] transition-colors"
                  >
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37] mx-auto" />
                    <span className="font-cinzel text-xs sm:text-sm font-black text-[#0B3D2E] tracking-widest block">
                      {pillar.word}
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-[#0B3D2E]/70 font-medium block line-clamp-1">
                      {pillar.desc}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link 
                href="/journey" 
                className="gold-btn inline-flex items-center space-x-2 px-7 py-3.5 rounded-2xl text-xs font-bold shadow-gold-glow uppercase tracking-wider"
              >
                <span>EXPLORE OUR FULL JOURNEY</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </motion.div>

        </div>
      </div>

      {/* React Bits GradualBlur Component (Bottom Section Edge Transition) */}
      <GradualBlur
        target="parent"
        position="bottom"
        height="5rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential
        opacity={1}
      />

    </section>
  );
};

export default HeritageStory;
