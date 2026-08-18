'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Crown, Flame, Sparkles } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-[85vh] bg-[#FAF5EE] text-[#0B3D2E] overflow-hidden flex items-center py-12 lg:py-16">
      
      {/* 1. Ambient Warm Lighting Gradients & Silk Wave Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FAF5EE] via-[#F6EFE5] to-[#FAF5EE] pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] bg-gradient-radial from-[#D4AF37]/15 via-transparent to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-gradient-radial from-[#C59B27]/12 via-transparent to-transparent blur-[130px] pointer-events-none" />

      {/* Background Silk Curve Accent Wave */}
      <svg className="absolute inset-0 w-full h-full text-[#D4AF37]/10 pointer-events-none select-none" viewBox="0 0 1440 600" fill="none" preserveAspectRatio="none">
        <path d="M 0,200 C 300,100 700,350 1440,150 L 1440,600 L 0,600 Z" fill="currentColor" fillOpacity="0.04" />
      </svg>

      {/* 2. Left Edge Traditional Indian Mandala Line-Art Watermark */}
      <svg className="absolute top-1/2 left-[-60px] -translate-y-1/2 w-[340px] h-[340px] text-[#C59B27]/20 pointer-events-none select-none" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.7">
        <circle cx="100" cy="100" r="90" strokeDasharray="3 3" />
        <circle cx="100" cy="100" r="70" />
        <circle cx="100" cy="100" r="50" strokeDasharray="2 2" />
        <circle cx="100" cy="100" r="30" />
        <path d="M 100,10 C 120,50 120,150 100,190 C 80,150 80,50 100,10 Z" fill="currentColor" fillOpacity="0.03" />
        <path d="M 10,100 C 50,120 150,120 190,100 C 150,80 50,80 10,100 Z" fill="currentColor" fillOpacity="0.03" />
      </svg>

      {/* Right Edge Traditional Indian Mandala Line-Art Watermark */}
      <svg className="absolute bottom-[-40px] right-[-40px] w-[300px] h-[300px] text-[#C59B27]/18 pointer-events-none select-none" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.7">
        <circle cx="100" cy="100" r="85" strokeDasharray="3 3" />
        <circle cx="100" cy="100" r="60" />
        <path d="M 100,15 L 120,60 L 165,60 L 130,90 L 145,135 L 100,105 L 55,135 L 70,90 L 35,60 L 80,60 Z" fill="currentColor" fillOpacity="0.03" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Sweets Showcase Text */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            
            {/* Small Pill Badge: PREPARED FRESH DAILY */}
            <div>
              <div className="inline-flex items-center space-x-1.5 text-[11px] uppercase tracking-wider text-[#1B4332] font-bold bg-[#FFFFFF]/90 px-3.5 py-1.5 rounded-full border border-[#8DAA91]/40 shadow-xs">
                <Leaf className="w-3.5 h-3.5 text-[#2D5A43] fill-current" />
                <span>PREPARED FRESH DAILY</span>
              </div>
            </div>

            {/* Main Heading: "Today's Fresh Hot Confections" */}
            <div className="space-y-1">
              <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-[#0D382A]">
                Today's Fresh <br />
                <span className="text-[#C59B27] font-serif-luxury drop-shadow-xs">
                  Hot Confections
                </span>
              </h1>
            </div>

            {/* Lotus Ornament Line Divider */}
            <div className="flex items-center justify-center lg:justify-start space-x-3 my-2">
              <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[#C59B27]/60" />
              <svg className="w-5 h-5 text-[#C59B27]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3c-1.5 3-3 5-6 6 3 1 5 3 6 6 1-3 3-5 6-6-3-1-4.5-3-6-6z" />
              </svg>
              <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-[#C59B27]/60" />
            </div>

            {/* Supporting Text */}
            <p className="text-[#2D5A43] text-sm sm:text-base max-w-lg leading-relaxed font-normal mx-auto lg:mx-0">
              Traditional recipes, carefully prepared with authentic ingredients and the same attention to quality that has defined Vindhyawasini for generations.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link 
                href="/shop" 
                className="w-full sm:w-auto bg-[#0D382A] hover:bg-[#07261B] text-[#FFFFFF] px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all duration-300 group"
              >
                <span>EXPLORE FRESH COLLECTION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link 
                href="/shop?sort=todaysFresh"
                className="w-full sm:w-auto bg-[#FFFDF9] hover:bg-[#F8F2E8] text-[#C59B27] border-2 border-[#C59B27]/70 px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center transition-all duration-300 shadow-xs"
              >
                <span>VIEW TODAY'S SPECIALS</span>
              </Link>
            </div>

            {/* Bottom 3 Feature Indicators */}
            <div className="pt-6 border-t border-[#C59B27]/25 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#0D382A] font-semibold">
              
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-full bg-[#F4EDE0] border border-[#C59B27]/40 flex items-center justify-center text-[#C59B27]">
                  <Crown className="w-4 h-4" />
                </div>
                <div className="leading-tight text-left">
                  <span className="block text-[10px] text-[#0D382A] font-extrabold tracking-wider">TRADITIONAL</span>
                  <span className="block text-[9px] text-[#2D5A43] font-medium uppercase">RECIPES</span>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-full bg-[#F4EDE0] border border-[#C59B27]/40 flex items-center justify-center text-[#C59B27]">
                  <Leaf className="w-4 h-4" />
                </div>
                <div className="leading-tight text-left">
                  <span className="block text-[10px] text-[#0D382A] font-extrabold tracking-wider">PURE</span>
                  <span className="block text-[9px] text-[#2D5A43] font-medium uppercase">INGREDIENTS</span>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-full bg-[#F4EDE0] border border-[#C59B27]/40 flex items-center justify-center text-[#C59B27]">
                  <Flame className="w-4 h-4" />
                </div>
                <div className="leading-tight text-left">
                  <span className="block text-[10px] text-[#0D382A] font-extrabold tracking-wider">FRESHLY</span>
                  <span className="block text-[9px] text-[#2D5A43] font-medium uppercase">PREPARED</span>
                </div>
              </div>

              {/* Pagination Dots */}
              <div className="flex items-center space-x-1.5 ml-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0D382A]" />
                <span className="w-2 h-2 rounded-full bg-[#C59B27]/30" />
                <span className="w-2 h-2 rounded-full bg-[#C59B27]/30" />
                <span className="w-2 h-2 rounded-full bg-[#C59B27]/30" />
              </div>

            </div>

          </motion.div>

          {/* Right Column: Authentic Brass Thali Sweets Composition */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex justify-center items-center py-4"
          >
            {/* Ambient Soft Gold Glow */}
            <div className="absolute -inset-4 rounded-full bg-gradient-radial from-[#C59B27]/25 via-transparent to-transparent blur-2xl opacity-90 pointer-events-none" />

            {/* Circular Heritage Badge: LEGACY SINCE 1995 */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute top-2 right-4 sm:right-8 z-30 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#07261B] border-4 border-[#D4AF37] shadow-2xl flex items-center justify-center p-1 text-center"
            >
              <div className="w-full h-full rounded-full border border-dashed border-[#D4AF37]/70 flex flex-col items-center justify-center p-1 text-[#F3E5AB]">
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest leading-none text-white">LEGACY</span>
                <span className="text-[7px] sm:text-[8px] font-semibold text-[#D4AF37] uppercase tracking-wider my-0.5">SINCE</span>
                <span className="text-xs sm:text-sm font-black text-[#D4AF37] leading-none">1995</span>
                <svg className="w-3.5 h-3.5 text-[#D4AF37] mt-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3c-1.5 3-3 5-6 6 3 1 5 3 6 6 1-3 3-5 6-6-3-1-4.5-3-6-6z" />
                </svg>
              </div>
            </motion.div>

            {/* Main Thali Presentation Box */}
            <div className="relative w-full max-w-lg rounded-[36px] overflow-hidden bg-gradient-to-b from-[#FFFFFF] to-[#FAF5EE] p-4 sm:p-6 border border-[#C59B27]/40 shadow-[0_30px_70px_-15px_rgba(11,61,46,0.18)] group">
              
              {/* Deep Green Silk Fabric Underlay & Brass Thali Container */}
              <div className="relative rounded-[28px] overflow-hidden bg-[#07261B] shadow-inner flex items-center justify-center p-2 sm:p-4">
                
                {/* Main Authentic Product Image */}
                <div className="relative w-full h-[320px] sm:h-[420px] rounded-[24px] overflow-hidden flex items-center justify-center">
                  <img 
                    src="/assets/Gud Tilkut.png" 
                    alt="Vindhyawasini Traditional Bihar Sweets Brass Thali" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Overlay for Vignette Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07261B]/80 via-transparent to-[#07261B]/30 opacity-70" />

                  {/* Floating Mini Sweets Badges (Composition Effect) */}
                  <motion.div 
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#C59B27]/50 shadow-md flex items-center space-x-2"
                  >
                    <img src="/assets/Kaju Katli.png" alt="Silver Kaju Katli" className="w-7 h-7 rounded-full object-cover" />
                    <span className="text-[10px] font-bold text-[#0D382A]">Silver Kaju Katli</span>
                  </motion.div>

                  <motion.div 
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#C59B27]/50 shadow-md flex items-center space-x-2"
                  >
                    <img src="/assets/Motichur Laddu.png" alt="Motichoor Laddu" className="w-7 h-7 rounded-full object-cover" />
                    <span className="text-[10px] font-bold text-[#0D382A]">Ghee Motichoor Laddu</span>
                  </motion.div>

                  <motion.div 
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#C59B27]/50 shadow-md flex items-center space-x-2"
                  >
                    <img src="/assets/Rasgulla.png" alt="Fresh Rasgulla" className="w-7 h-7 rounded-full object-cover" />
                    <span className="text-[10px] font-bold text-[#0D382A]">Pure Chhena Rasgulla</span>
                  </motion.div>

                </div>

              </div>

              {/* Bottom Subtle Guarantee Bar */}
              <div className="pt-3 px-2 flex items-center justify-between text-[11px] text-[#0D382A] font-bold">
                <span className="flex items-center space-x-1.5 text-[#0D382A]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Handcrafted in 100% Pure A2 Cow Ghee</span>
                </span>
                <span className="text-[#C59B27]">EST. 1995</span>
              </div>

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
