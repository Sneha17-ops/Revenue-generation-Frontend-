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
      
      {/* 1. Clean Warm Ivory Canvas Background */}
      <div className="absolute inset-0 bg-[#FAF7F2] pointer-events-none" />

      {/* 2. Extremely Faint Indian Heritage Decorative Line-Art Watermarks */}
      <svg className="absolute top-4 left-4 sm:top-6 sm:left-6 w-28 sm:w-40 h-28 sm:h-40 text-[#D4AF37]/15 pointer-events-none select-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.6">
        <circle cx="20" cy="20" r="16" strokeDasharray="2 3" />
        <path d="M 20,4 C 28,12 28,28 20,36 C 12,28 12,12 20,4 Z" fill="currentColor" fillOpacity="0.04" />
        <path d="M 4,20 C 12,28 28,28 36,20 C 28,12 12,12 4,20 Z" fill="currentColor" fillOpacity="0.04" />
        <line x1="20" y1="0" x2="20" y2="40" strokeWidth="0.4" />
        <line x1="0" y1="20" x2="40" y2="20" strokeWidth="0.4" />
      </svg>

      <svg className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-36 sm:w-52 h-36 sm:h-52 text-[#D4AF37]/12 pointer-events-none select-none" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.6">
        <circle cx="100" cy="100" r="75" strokeDasharray="2 4" />
        <polygon points="100,20 120,70 180,100 120,130 100,180 80,130 20,100 80,70" fill="currentColor" fillOpacity="0.02" />
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

              {/* Decorative Gold Line with Center Lotus/Diamond Ornament */}
              <div className="flex items-center justify-center lg:justify-start space-x-3 pt-3 pb-1">
                <div className="h-[1.5px] w-12 bg-[#D4AF37]" />
                <div className="w-2 h-2 rounded-full bg-[#D4AF37] rotate-45" />
                <div className="h-[1.5px] w-28 bg-[#D4AF37]/40" />
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
          {/* RIGHT COLUMN: Custom Indian Heritage Platter Frame Composition            */}
          {/* ========================================================================= */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center items-center py-4 sm:py-6 z-10"
          >
            
            {/* Main Sweets Frame Outer Container */}
            <div className="relative w-full max-w-[340px] sm:max-w-md">
              
              {/* HERITAGE SEAL: "Since 1995" ONLY (Positioned upper-right corner) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -top-4 -right-3 sm:-top-5 sm:-right-5 z-30"
              >
                <motion.div 
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#06241B] border-2 border-[#D4AF37] shadow-lg flex items-center justify-center p-1 text-center"
                >
                  <div className="w-full h-full rounded-full border border-dashed border-[#D4AF37]/50 flex flex-col items-center justify-center text-[#F3E5AB]">
                    <span className="text-[9px] sm:text-[11px] font-serif-luxury font-bold text-[#F3E5AB] leading-none">
                      Since 1995
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* TRADITIONAL INDIAN HERITAGE FRAME (Arched Platter Contour) */}
              <motion.div 
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative bg-[#FFFFFF] p-3 sm:p-4 rounded-[40px] border-2 border-[#D4AF37]/60 shadow-[0_20px_50px_-15px_rgba(11,61,46,0.12)] group hover:border-[#D4AF37] transition-all duration-500"
              >
                {/* Inner Ornamental Layered Border */}
                <div className="p-1 rounded-[34px] border border-[#D4AF37]/35 bg-[#FAF7F2]">
                  
                  {/* Clean Sweets Photograph Container (Zero Labels/Overlays) */}
                  <div className="relative h-[340px] sm:h-[400px] md:h-[440px] rounded-[30px] overflow-hidden bg-[#FAF7F2]">
                    <img 
                      src="/assets/image.png" 
                      alt="Vindhyawasini Tilkut Bhandar Authentic Sweets" 
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                    />
                  </div>

                </div>

                {/* Subtle Outer Frame Accent Rim */}
                <div className="absolute -inset-1 rounded-[42px] border border-[#D4AF37]/20 pointer-events-none" />

              </motion.div>

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
