'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Crown, MapPin, Phone, MessageSquare, Sparkles, ShieldCheck } from 'lucide-react';
import { CITY_DELIVERY_RULES } from '../../data/products';

export const Hero = () => {
  // Stagger animation container
  const headingContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  // Line-by-line fade up + blur reveal
  const lineItemVariants = {
    hidden: { opacity: 0, y: 35, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 1.0,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative min-h-[92vh] bg-[#FAF7F2] text-[#0B3D2E] overflow-hidden flex items-center py-12 lg:py-20 selection:bg-[#D4AF37]/30">
      
      {/* 1. Ambient Background Light & Radial Gold Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#D4AF37]/15 via-[#F3E5AB]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#0B3D2E]/8 via-[#D4AF37]/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      {/* 2. Faint Bihari Heritage Line-Art Corner Patterns (Temple Arch & Lotus Watermarks) */}
      <div className="absolute top-8 left-8 opacity-15 pointer-events-none hidden md:block">
        <svg className="w-52 h-52 text-[#D4AF37]" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.8">
          <circle cx="100" cy="100" r="80" strokeDasharray="3 4" />
          <circle cx="100" cy="100" r="60" />
          <path d="M100 20 C120 60 120 140 100 180 C80 140 80 60 100 20 Z" fill="currentColor" fillOpacity="0.04" />
          <path d="M20 100 C60 120 140 120 180 100 C140 80 60 80 20 100 Z" fill="currentColor" fillOpacity="0.04" />
        </svg>
      </div>

      <div className="absolute bottom-10 right-10 opacity-15 pointer-events-none hidden md:block">
        <svg className="w-60 h-60 text-[#D4AF37]" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.8">
          <circle cx="100" cy="100" r="90" strokeDasharray="2 3" />
          <polygon points="100,10 125,75 190,100 125,125 100,190 75,125 10,100 75,75" fill="currentColor" fillOpacity="0.03" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Hero Typography, Staggered Headline & CTAs                  */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* 1. Heritage Crest Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs uppercase tracking-[0.18em] text-[#0B3D2E] font-bold bg-[#FFFFFF] px-4 py-2 rounded-full border border-[#D4AF37]/50 shadow-[0_4px_15px_rgba(212,175,55,0.15)] backdrop-blur-md">
                <Crown className="w-4 h-4 text-[#D4AF37]" />
                <span>Est. 1995 • Gaya Heritage</span>
                <span className="text-[#D4AF37]/50">•</span>
                <span className="text-[#997D20]">100% A2 Desi Ghee</span>
              </div>
            </motion.div>

            {/* 2. Main Headline with Blur Reveal Entrance Animation */}
            <motion.div 
              variants={headingContainerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-1"
            >
              <motion.h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#0B3D2E] leading-[1.12] tracking-tight">
                <motion.span variants={lineItemVariants} className="block">
                  Traditional Culture of Bihar.
                </motion.span>
                <motion.span variants={lineItemVariants} className="block gold-text-gradient font-cinzel mt-1">
                  Pure Luxury Confectionery.
                </motion.span>
              </motion.h1>
            </motion.div>

            {/* 3. Subtitle with Fade In from Bottom */}
            <motion.p 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="text-[#0B3D2E]/80 text-base sm:text-lg max-w-2xl leading-relaxed font-normal mx-auto lg:mx-0"
            >
              India's most trusted premium sweets brand. Handcrafted daily in pure A2 Cow Desi Ghee, Gaya organic sugarcane jaggery, and centuries-old Bihari family recipes.
            </motion.p>

            {/* 4. Action Buttons with Fade Up & Scale Animation */}
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.65, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              {/* Primary Gold CTA */}
              <Link 
                href="/shop" 
                className="gold-btn w-full sm:w-auto px-8 py-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-3 shadow-gold-glow uppercase tracking-wider group"
              >
                <span>Explore Bihar Specials</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Secondary Dark Green CTA */}
              <a 
                href={`https://wa.me/${CITY_DELIVERY_RULES.whatsAppOrderNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="forest-btn w-full sm:w-auto px-6 py-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 border border-[#D4AF37]/40 uppercase tracking-wider shadow-md"
              >
                <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                <span>WhatsApp Order</span>
              </a>

              {/* Phone Bulk Orders */}
              <a 
                href={`tel:${CITY_DELIVERY_RULES.phoneSupport}`}
                className="bg-[#FFFFFF] hover:bg-[#FAF7F2] text-[#0B3D2E] w-full sm:w-auto px-6 py-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all shadow-xs"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>Bulk / Wedding</span>
              </a>
            </motion.div>

            {/* 5. Key Trust Highlights Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="pt-8 border-t border-[#D4AF37]/30 grid grid-cols-3 gap-4 text-left max-w-xl mx-auto lg:mx-0"
            >
              <div>
                <div className="font-cinzel text-xl sm:text-2xl font-bold text-[#D4AF37]">30+ Years</div>
                <div className="text-[11px] text-[#0B3D2E]/70 uppercase tracking-wider font-semibold">Gaya Heritage</div>
              </div>
              <div>
                <div className="font-cinzel text-xl sm:text-2xl font-bold text-[#D4AF37]">7 AM - 10 PM</div>
                <div className="text-[11px] text-[#0B3D2E]/70 uppercase tracking-wider font-semibold">Store Timings</div>
              </div>
              <div>
                <div className="font-cinzel text-xl sm:text-2xl font-bold text-[#D4AF37]">100% Pure</div>
                <div className="text-[11px] text-[#0B3D2E]/70 uppercase tracking-wider font-semibold">A2 Cow Ghee</div>
              </div>
            </motion.div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Hero Visual Product Showcase Card                           */}
          {/* ========================================================================= */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="lg:col-span-5 relative flex justify-center"
          >
            
            {/* Outer Soft Backlight Glow */}
            <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-[#D4AF37]/25 via-[#F3E5AB]/20 to-transparent blur-2xl opacity-70 pointer-events-none" />

            {/* Floating Glassmorphism Hero Image Card */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.03 }}
              className="relative w-full max-w-md bg-[#FFFFFF] p-5 sm:p-6 rounded-[28px] border-2 border-[#D4AF37]/40 shadow-[0_25px_60px_-15px_rgba(11,61,46,0.14)] hover:shadow-[0_35px_70px_-12px_rgba(212,175,55,0.3)] hover:border-[#D4AF37] transition-all duration-500 group cursor-pointer"
            >
              
              {/* Product Showcase Image */}
              <div className="relative h-80 rounded-[20px] overflow-hidden bg-[#FAF7F2] shadow-inner">
                <img 
                  src="/assets/MP6.jpeg" 
                  alt="VINDHYAWASINI TILKUT BHANDAR" 
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                />
                
                {/* Subtle Gradient Shadow Base */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06241B]/85 via-transparent to-transparent opacity-90 pointer-events-none" />

                {/* Floating Heritage Badge */}
                <div className="absolute top-4 left-4 bg-[#FFFFFF]/90 backdrop-blur-md text-[#0B3D2E] font-bold text-xs uppercase px-3.5 py-1.5 rounded-full shadow-md border border-[#D4AF37]/40 flex items-center space-x-1.5">
                  <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Gaya Special Heritage</span>
                </div>

                {/* Caption Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-[#FAF7F2] space-y-1">
                  <h3 className="font-serif-luxury text-lg font-bold text-[#F3E5AB]">
                    VINDHYAWASINI TILKUT BHANDAR
                  </h3>
                  <p className="text-xs text-[#FAF7F2]/80 font-light">
                    Hand-pounded Gaya Tilkut with organic sugarcane jaggery & A2 Desi Ghee
                  </p>
                </div>
              </div>

              {/* Decorative Gold Corner Rim Accent */}
              <div className="absolute -inset-1 rounded-[30px] border border-[#D4AF37]/20 pointer-events-none" />

            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
