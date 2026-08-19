'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Crown, Flame, Sparkles, MessageSquare } from 'lucide-react';
import { CITY_DELIVERY_RULES } from '../../data/products';

export const Hero = () => {
  // Staggered motion variants for smooth premium entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 22, 
      filter: 'blur(4px)' 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
  };

  return (
    <section className="relative min-h-[92vh] bg-[#FAF7F2] text-[#0B3D2E] overflow-hidden flex items-center py-12 lg:py-20">
      
      {/* 1. Subtle Warm Ivory Light Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2] via-[#F6F0E6] to-[#FAF7F2] pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-[650px] h-[650px] bg-gradient-radial from-[#D4AF37]/12 via-[#FAF7F2]/0 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[550px] h-[550px] bg-gradient-radial from-[#C5A059]/10 via-[#FAF7F2]/0 to-transparent blur-[130px] pointer-events-none" />

      {/* 2. Fine Indian Line-Art Decorative Edges */}
      <svg className="absolute top-6 left-6 w-36 h-36 text-[#D4AF37]/25 pointer-events-none select-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
        <circle cx="20" cy="20" r="16" strokeDasharray="2 3" />
        <path d="M 20,4 C 28,12 28,28 20,36 C 12,28 12,12 20,4 Z" fill="currentColor" fillOpacity="0.08" />
        <path d="M 4,20 C 12,28 28,28 36,20 C 28,12 12,12 4,20 Z" fill="currentColor" fillOpacity="0.08" />
        <line x1="20" y1="0" x2="20" y2="40" strokeWidth="0.5" />
        <line x1="0" y1="20" x2="40" y2="20" strokeWidth="0.5" />
      </svg>

      <svg className="absolute bottom-8 right-8 w-48 h-48 text-[#D4AF37]/20 pointer-events-none select-none" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d="M 100,10 L 125,50 L 115,50 L 135,90 L 125,90 L 150,140 L 50,140 L 75,90 L 65,90 L 85,50 L 75,50 Z" fill="currentColor" fillOpacity="0.04" />
        <line x1="100" y1="140" x2="100" y2="190" strokeWidth="1.2" strokeDasharray="3 3" />
        <circle cx="100" cy="165" r="16" />
        <path d="M 85,165 C 100,150 100,180 115,165" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Premium Text & Call to Actions */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-8 text-center lg:text-left"
          >
            
            {/* Small Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#0B3D2E] font-bold bg-[#FFFFFF] px-4 py-2 rounded-full border border-[#D4AF37]/40 shadow-[0_4px_16px_rgba(212,175,55,0.12)]">
                <span className="flex items-center space-x-1.5 text-[#D4AF37]">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span className="text-[#0B3D2E] font-semibold">PREPARED FRESH DAILY</span>
                </span>
                <span className="text-[#D4AF37]">•</span>
                <span className="text-[#0B3D2E]/80 font-medium">AUTHENTIC GAYA SWEETS</span>
              </div>
            </motion.div>

            {/* Main Heading: "Today's Fresh" followed by "Hot Confections" */}
            <motion.div variants={itemVariants} className="space-y-1">
              <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.06] tracking-tight text-[#0B3D2E]">
                Today's Fresh <br />
                <span className="gold-text-gradient font-cinzel text-5xl sm:text-7xl lg:text-8xl font-black drop-shadow-sm">
                  Hot Confections
                </span>
              </h1>
            </motion.div>

            {/* Supporting Text */}
            <motion.p 
              variants={itemVariants}
              className="text-[#0B3D2E]/85 text-base sm:text-lg max-w-2xl leading-relaxed font-normal mx-auto lg:mx-0"
            >
              Traditional recipes, carefully prepared with authentic ingredients and the same attention to quality that has defined <span className="font-semibold text-[#0B3D2E]">Vindhyawasini</span> for generations. Handcrafted daily in 100% pure A2 Cow Desi Ghee.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              {/* Primary CTA */}
              <Link 
                href="/shop" 
                className="gold-btn w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold flex items-center justify-center space-x-3 shadow-gold-glow group transition-all duration-300"
              >
                <span className="uppercase tracking-wider">EXPLORE FRESH COLLECTION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Secondary CTA */}
              <Link 
                href="/shop?sort=todaysFresh"
                className="forest-btn w-full sm:w-auto px-7 py-4 rounded-2xl text-sm font-bold flex items-center justify-center space-x-2 transition-all duration-300"
              >
                <Flame className="w-4 h-4 text-[#D4AF37]" />
                <span className="uppercase tracking-wider">VIEW TODAY'S SPECIALS</span>
              </Link>

              {/* WhatsApp Quick Order Button */}
              <a 
                href={`https://wa.me/${CITY_DELIVERY_RULES.whatsAppOrderNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FFFFFF] hover:bg-[#F5EFE6] text-[#0B3D2E] w-full sm:w-auto px-6 py-4 rounded-2xl text-sm font-bold flex items-center justify-center space-x-2 border border-[#D4AF37]/35 shadow-sm hover:border-[#D4AF37] transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4 text-[#0B3D2E]" />
                <span className="uppercase tracking-wider">WhatsApp</span>
              </a>
            </motion.div>

            {/* Key Trust Metrics Bar */}
            <motion.div 
              variants={itemVariants}
              className="pt-8 border-t border-[#D4AF37]/25 grid grid-cols-3 gap-4 text-left max-w-xl mx-auto lg:mx-0"
            >
              <div>
                <div className="font-cinzel text-xl sm:text-2xl font-bold text-[#0B3D2E]">City Limits</div>
                <div className="text-[11px] text-[#0B3D2E]/75 uppercase tracking-wider font-medium">Same-Day Delivery</div>
              </div>
              <div>
                <div className="font-cinzel text-xl sm:text-2xl font-bold text-[#0B3D2E]">7 AM - 10 PM</div>
                <div className="text-[11px] text-[#0B3D2E]/75 uppercase tracking-wider font-medium">Fresh Daily Batch</div>
              </div>
              <div>
                <div className="font-cinzel text-xl sm:text-2xl font-bold text-[#0B3D2E]">100% A2 Ghee</div>
                <div className="text-[11px] text-[#0B3D2E]/75 uppercase tracking-wider font-medium">Pure Ingredients</div>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: Hero Visual Product Composition */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center items-center py-4"
          >
            
            {/* Ambient Backlight Glow */}
            <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-tr from-[#D4AF37]/25 via-[#F3E5AB]/20 to-transparent blur-2xl opacity-80 pointer-events-none" />

            {/* Micro Floating Gold Dust Particles */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-10 left-6 w-2 h-2 rounded-full bg-[#D4AF37] opacity-60 animate-ping" />
              <div className="absolute bottom-16 right-8 w-2.5 h-2.5 rounded-full bg-[#F3E5AB] opacity-70 animate-pulse" />
              <div className="absolute top-1/2 right-2 w-1.5 h-1.5 rounded-full bg-[#D4AF37] opacity-50" />
            </div>

            {/* Main Composition Showcase Card */}
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
              className="relative w-full max-w-md bg-[#FFFFFF] p-5 rounded-[32px] border-2 border-[#D4AF37]/45 shadow-[0_30px_60px_-15px_rgba(11,61,46,0.14)] group hover:border-[#D4AF37] hover:shadow-[0_40px_80px_-20px_rgba(212,175,55,0.35)] transition-all duration-500"
            >
              
              {/* Circular Heritage Badge: "LEGACY SINCE 1995" (Static) */}
              <div className="absolute -top-6 -right-6 z-20 w-20 h-20 rounded-full bg-[#06241B] border-2 border-[#D4AF37] shadow-xl flex items-center justify-center p-1 text-center">
                <div className="w-full h-full rounded-full border border-dashed border-[#D4AF37]/60 flex flex-col items-center justify-center p-1 text-[#F3E5AB]">
                  <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="text-[8px] font-extrabold uppercase tracking-widest leading-tight">LEGACY</span>
                  <span className="text-[9px] font-black text-[#D4AF37]">1995</span>
                </div>
              </div>

              {/* Product Hero Image */}
              <div className="relative h-80 sm:h-[400px] rounded-[24px] overflow-hidden bg-[#FAF7F2] shadow-inner">
                <img 
                  src="/assets/image.png" 
                  alt="Authentic Gaya Gud Tilkut - Vindhyawasini Tilkut Bhandar" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#06241B]/85 via-transparent to-transparent opacity-90" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 bg-[#D4AF37] text-[#06241B] font-bold text-xs uppercase px-3.5 py-1.5 rounded-full shadow-md flex items-center space-x-1.5">
                  <Crown className="w-3.5 h-3.5 text-[#06241B]" />
                  <span className="tracking-wider">Gaya Heritage Special</span>
                </div>

                {/* Floating Secondary Mini Product Cards (Composition Effect) */}
                <motion.div 
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay: 0.5 }}
                  className="absolute top-4 right-4 bg-[#FFFFFF]/95 backdrop-blur-md p-2 rounded-2xl border border-[#D4AF37]/50 shadow-lg flex items-center space-x-2 max-w-[150px]"
                >
                  <img src="/assets/Khaja.png" alt="Silao Khaja" className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <span className="text-[10px] font-bold text-[#0B3D2E] block leading-tight">Silao Khaja</span>
                    <span className="text-[9px] text-[#D4AF37] font-semibold">64 Flaky Layers</span>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5.5, ease: "easeInOut", repeat: Infinity, delay: 1 }}
                  className="absolute bottom-20 left-4 bg-[#FFFFFF]/95 backdrop-blur-md p-2 rounded-2xl border border-[#D4AF37]/50 shadow-lg flex items-center space-x-2 max-w-[160px]"
                >
                  <img src="/assets/Motichur Laddu.png" alt="Motichoor Laddu" className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <span className="text-[10px] font-bold text-[#0B3D2E] block leading-tight">Motichoor Laddu</span>
                    <span className="text-[9px] text-[#D4AF37] font-semibold">Pure A2 Cow Ghee</span>
                  </div>
                </motion.div>

                {/* Card Title & Info Overlay */}
                <div className="absolute bottom-5 left-5 right-5 text-[#FAF7F2] space-y-1">
                  <h3 className="font-serif-luxury text-xl font-bold text-[#F3E5AB]">
                    Authentic Gaya Gud Tilkut
                  </h3>
                  <p className="text-xs text-[#FAF7F2]/80 font-light">
                    Hand-pounded white sesame & organic sugarcane jaggery prepared daily
                  </p>
                </div>
              </div>

              {/* Card Footer Guarantee Bar */}
              <div className="pt-4 flex items-center justify-between text-xs text-[#0B3D2E] font-semibold px-1">
                <span className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>100% Authentic Karigar Recipe</span>
                </span>
                <span className="text-[#D4AF37] font-bold">Est. 1995</span>
              </div>

            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
