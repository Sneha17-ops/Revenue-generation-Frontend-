'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Flame, Sparkles, MessageSquare } from 'lucide-react';
import { CITY_DELIVERY_RULES } from '../../data/products';
import BlurText from '../ui/BlurText';

export const Hero = () => {
  // Staggered motion variants for smooth premium left-column entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 18, 
      filter: 'blur(4px)' 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { 
        duration: 0.75, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
  };

  return (
    <section className="relative min-h-fit lg:min-h-[90vh] bg-[#FAF7F2] text-[#0B3D2E] overflow-hidden flex items-center py-10 sm:py-14 lg:py-20 z-10 selection:bg-[#D4AF37]/30">
      
      {/* 1. Pure Warm Off-White / Ivory Canvas Background */}
      <div className="absolute inset-0 bg-[#FAF7F2] pointer-events-none" />

      {/* ========================================================================= */}
      {/* 2. AUTHENTIC INDIAN TRADITIONAL ARTWATERMARKS (Corners & Edges Only)       */}
      {/* ========================================================================= */}
      
      {/* TOP-LEFT: Traditional Floral / Henna Corner Artwork */}
      <svg className="absolute top-2 left-2 sm:top-4 sm:left-4 w-32 sm:w-48 h-32 sm:h-48 text-[#D4AF37]/15 pointer-events-none select-none" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d="M 10,10 Q 60,10 60,60 Q 10,60 10,10 Z" fill="currentColor" fillOpacity="0.03" />
        <path d="M 20,20 C 50,20 80,50 80,80 C 50,80 20,50 20,20 Z" fill="none" strokeDasharray="3 3" />
        <circle cx="45" cy="45" r="14" />
        <path d="M 45,20 C 52,30 52,40 45,45 C 38,40 38,30 45,20 Z" fill="currentColor" fillOpacity="0.04" />
        <path d="M 70,45 C 60,52 50,52 45,45 C 50,38 60,38 70,45 Z" fill="currentColor" fillOpacity="0.04" />
        <path d="M 45,70 C 38,60 38,50 45,45 C 52,50 52,60 45,70 Z" fill="currentColor" fillOpacity="0.04" />
        <path d="M 20,45 C 30,38 40,38 45,45 C 40,52 30,52 20,45 Z" fill="currentColor" fillOpacity="0.04" />
      </svg>

      {/* TOP-RIGHT: Temple Arch / Paisley Line-Art Motif */}
      <svg className="absolute top-2 right-2 sm:top-4 sm:right-4 w-36 sm:w-52 h-36 sm:h-52 text-[#D4AF37]/12 pointer-events-none select-none" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d="M 190,10 C 140,10 120,40 120,90 C 120,140 160,180 190,190" strokeDasharray="2 3" />
        <path d="M 190,30 C 160,30 140,55 140,90 C 140,125 170,160 190,170" fill="currentColor" fillOpacity="0.02" />
        <circle cx="165" cy="90" r="16" />
        <path d="M 165,65 L 165,115 M 140,90 L 190,90" strokeWidth="0.5" />
      </svg>

      {/* BOTTOM-LEFT: Traditional Lotus & Carved Mandir Motif */}
      <svg className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-36 sm:w-52 h-36 sm:h-52 text-[#D4AF37]/12 pointer-events-none select-none" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d="M 10,190 C 40,190 70,160 70,120 C 70,80 30,60 10,10" strokeDasharray="2 3" />
        <path d="M 40,160 C 20,130 50,110 40,80" fill="none" />
        <circle cx="50" cy="140" r="12" fill="currentColor" fillOpacity="0.03" />
      </svg>

      {/* BOTTOM-RIGHT: Subtle Floral Henna Corner Pattern */}
      <svg className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-32 sm:w-48 h-32 sm:h-48 text-[#D4AF37]/14 pointer-events-none select-none" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.8">
        <circle cx="160" cy="160" r="30" strokeDasharray="3 3" />
        <path d="M 160,120 C 175,140 175,180 160,200 C 145,180 145,140 160,120 Z" fill="currentColor" fillOpacity="0.03" />
        <path d="M 120,160 C 140,175 180,175 200,160 C 180,145 140,145 120,160 Z" fill="currentColor" fillOpacity="0.03" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Editorial Typography, Story Headline & Actions              */}
          {/* ========================================================================= */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 sm:space-y-7 text-center lg:text-left relative z-20"
          >
            
            {/* 1. Prepared Fresh Daily Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#0B3D2E] font-bold bg-[#FFFFFF] px-4 py-1.5 sm:py-2 rounded-full border border-[#D4AF37]/40 shadow-xs max-w-full flex-wrap justify-center">
                <span className="flex items-center space-x-1.5 text-[#D4AF37]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="text-[#0B3D2E] font-bold">PREPARED FRESH DAILY</span>
                </span>
                <span className="text-[#D4AF37]">•</span>
                <span className="text-[#0B3D2E]/80 font-medium">AUTHENTIC GAYA SWEETS</span>
              </div>
            </motion.div>

            {/* 2. Main Editorial Hero Heading with BlurText Animations */}
            <motion.div variants={itemVariants} className="space-y-1.5">
              <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B3D2E] leading-[1.12] tracking-tight">
                <BlurText 
                  text="From the Heart of Gaya" 
                  animateBy="words" 
                  direction="top" 
                  delay={110} 
                  className="text-[#0B3D2E] block italic"
                />
                <BlurText 
                  text="A Taste Passed Through Generations" 
                  animateBy="words" 
                  direction="bottom" 
                  delay={120} 
                  className="gold-text-gradient font-cinzel block mt-1.5 text-2xl sm:text-4xl lg:text-5xl font-extrabold not-italic"
                />
              </h1>

              {/* Traditional Indian Ornamental Divider (Lotus Motif + Thin Gold Lines) */}
              <div className="flex items-center justify-center lg:justify-start space-x-3 pt-3 pb-1">
                <div className="h-[1.5px] w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                <div className="flex items-center space-x-1 text-[#D4AF37]">
                  <svg className="w-4 h-4 text-[#D4AF37]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,2 C13.5,6 16,8 19,8 C19,11 17,13.5 14,14.5 C15.5,17 14,20 12,22 C10,20 8.5,17 10,14.5 C7,13.5 5,11 5,8 C8,8 10.5,6 12,2 Z" fillOpacity="0.85" />
                  </svg>
                </div>
                <div className="h-[1.5px] w-20 sm:w-28 bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
              </div>
            </motion.div>

            {/* 3. Supporting Description Text */}
            <motion.p 
              variants={itemVariants}
              className="text-[#0B3D2E]/85 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed font-normal mx-auto lg:mx-0 px-2 sm:px-0"
            >
              Where every sweet carries the warmth of family, the trust of generations, and the authentic taste of Gaya. Handcrafted daily in 100% pure A2 Cow Desi Ghee using traditional karigar recipes.
            </motion.p>

            {/* 4. CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2"
            >
              {/* Primary CTA */}
              <Link 
                href="/shop" 
                className="gold-btn w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2.5 shadow-gold-glow group transition-all duration-300"
              >
                <span className="uppercase tracking-wider">EXPLORE FRESH COLLECTION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Secondary CTA */}
              <Link 
                href="/shop?sort=todaysFresh"
                className="forest-btn w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all duration-300"
              >
                <Flame className="w-4 h-4 text-[#D4AF37]" />
                <span className="uppercase tracking-wider">VIEW TODAY'S SPECIALS</span>
              </Link>

              {/* WhatsApp Quick Order Button */}
              <a 
                href={`https://wa.me/${CITY_DELIVERY_RULES.whatsAppOrderNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FFFFFF] hover:bg-[#FAF7F2] text-[#0B3D2E] w-full sm:w-auto px-5 py-3.5 sm:py-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 border border-[#D4AF37]/40 shadow-xs hover:border-[#D4AF37] transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4 text-[#0B3D2E]" />
                <span className="uppercase tracking-wider">WhatsApp</span>
              </a>
            </motion.div>

            {/* Key Trust Metrics Bar */}
            <motion.div 
              variants={itemVariants}
              className="pt-6 sm:pt-8 border-t border-[#D4AF37]/25 grid grid-cols-3 gap-2 sm:gap-4 text-center sm:text-left max-w-xl mx-auto lg:mx-0"
            >
              <div>
                <div className="font-cinzel text-base sm:text-xl font-bold text-[#0B3D2E]">City Limits</div>
                <div className="text-[9px] sm:text-[11px] text-[#0B3D2E]/75 uppercase tracking-wider font-medium">Same-Day Delivery</div>
              </div>
              <div>
                <div className="font-cinzel text-base sm:text-xl font-bold text-[#0B3D2E]">7 AM - 10 PM</div>
                <div className="text-[9px] sm:text-[11px] text-[#0B3D2E]/75 uppercase tracking-wider font-medium">Fresh Daily Batch</div>
              </div>
              <div>
                <div className="font-cinzel text-base sm:text-xl font-bold text-[#0B3D2E]">100% A2 Ghee</div>
                <div className="text-[9px] sm:text-[11px] text-[#0B3D2E]/75 uppercase tracking-wider font-medium">Pure Ingredients</div>
              </div>
            </motion.div>

          </motion.div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Authentic Indian Temple / Haveli Arch Custom Frame          */}
          {/* ========================================================================= */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center items-center py-4 sm:py-6 z-10"
          >
            
            {/* Main Sweets Frame Outer Container */}
            <div className="relative w-full max-w-[330px] sm:max-w-md">
              
              {/* HERITAGE SEAL: ONLY "1995" (Positioned upper-right corner) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -top-4 -right-3 sm:-top-5 sm:-right-5 z-30"
              >
                <motion.div 
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#06241B] border-2 border-[#D4AF37] shadow-md flex items-center justify-center p-1 text-center"
                >
                  <div className="w-full h-full rounded-full border border-dashed border-[#D4AF37]/50 flex items-center justify-center text-[#F3E5AB]">
                    <span className="text-xs sm:text-sm font-serif-luxury font-black text-[#F3E5AB] tracking-widest leading-none">
                      1995
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* TRADITIONAL INDIAN TEMPLE / HAVELI DOORWAY ARCH FRAME */}
              <motion.div 
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative bg-[#FFFFFF] p-3 sm:p-4 rounded-t-[100px] sm:rounded-t-[130px] rounded-b-[36px] border-2 border-[#D4AF37]/60 shadow-[0_20px_50px_-15px_rgba(11,61,46,0.12)] group hover:border-[#D4AF37] transition-all duration-500"
              >
                {/* Inner Layered Arch Rim */}
                <div className="p-1.5 rounded-t-[90px] sm:rounded-t-[120px] rounded-b-[30px] border border-[#D4AF37]/35 bg-[#FAF7F2]">
                  
                  {/* Clean Sweets Photograph Container */}
                  <div className="relative h-[340px] sm:h-[400px] md:h-[430px] rounded-t-[84px] sm:rounded-t-[114px] rounded-b-[26px] overflow-hidden bg-[#FAF7F2]">
                    <img 
                      src="/assets/image.png" 
                      alt="Vindhyawasini Tilkut Bhandar Authentic Sweets" 
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                    />
                  </div>

                </div>

                {/* Subtle Outer Frame Accent Silhouette Rim */}
                <div className="absolute -inset-1 rounded-t-[104px] sm:rounded-t-[134px] rounded-b-[40px] border border-[#D4AF37]/20 pointer-events-none" />

              </motion.div>

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
