'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Heart, Crown } from 'lucide-react';
import BlurText from '../ui/BlurText';
import SplitText from '../ui/SplitText';
import TiltedCard from '../ui/TiltedCard';
import GradualBlur from '../ui/GradualBlur';

export const AboutOwnerSection = () => {
  // Staggered entrance variants for markers
  const markerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.2,
      },
    },
  };

  const markerItemVariants = {
    hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const markers = [
    {
      title: "TASTE",
      subtitle: "Authentic recipes, remembered through generations.",
      icon: Sparkles,
    },
    {
      title: "TRUST",
      subtitle: "Quality and care in every preparation.",
      icon: ShieldCheck,
    },
    {
      title: "FAMILY",
      subtitle: "Tradition made meaningful by the people we serve.",
      icon: Heart,
    },
  ];

  return (
    <section id="about-owner" className="relative py-20 sm:py-28 bg-[#FAF7F2] text-[#0B3D2E] overflow-hidden selection:bg-[#D4AF37]/30 z-10">
      
      {/* 1. Subtle Warm Ivory Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2] via-[#F6F0E6]/60 to-[#FAF7F2] pointer-events-none" />

      {/* 2. Delicate Indian Line-Art Decorative Patterns (Mandala & Lotus Watermarks) */}
      <div className="absolute top-10 left-8 opacity-10 pointer-events-none hidden lg:block">
        <svg className="w-64 h-64 text-[#D4AF37]" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.8">
          <circle cx="100" cy="100" r="80" strokeDasharray="3 4" />
          <circle cx="100" cy="100" r="60" />
          <circle cx="100" cy="100" r="40" strokeDasharray="2 2" />
          <path d="M100,20 C120,60 120,140 100,180 C80,140 80,60 100,20 Z" />
          <path d="M20,100 C60,120 140,120 180,100 C140,80 60,80 20,100 Z" />
        </svg>
      </div>

      <div className="absolute bottom-10 right-8 opacity-10 pointer-events-none hidden lg:block">
        <svg className="w-72 h-72 text-[#D4AF37]" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.8">
          <circle cx="100" cy="100" r="90" strokeDasharray="2 3" />
          <polygon points="100,10 125,75 190,100 125,125 100,190 75,125 10,100 75,75" fill="currentColor" fillOpacity="0.03" />
        </svg>
      </div>

      {/* Top Ornamental Section Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center justify-center space-x-4">
          <div className="h-[1px] w-20 sm:w-32 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
          <div className="flex items-center space-x-2 text-[#D4AF37]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <svg className="w-5 h-5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" fillOpacity="0.1" />
            </svg>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          </div>
          <div className="h-[1px] w-20 sm:w-32 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Asymmetrical Framed Portrait of Shri Umesh Malakar          */}
          {/* ========================================================================= */}
          <motion.div 
            initial={{ opacity: 0.9, scale: 0.96, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center order-1"
          >
            <div className="w-full max-w-md">
              <TiltedCard 
                imageSrc="/assets/Owner.png"
                altText="Shri Umesh Malakar, founder of Vindhyawasini Tilkut Bhandar"
                badgeText="EST. 1995 • FOUNDER"
                captionTitle="Shri Umesh Malakar"
                captionSub="30+ years of uncompromised authenticity, purity, and family devotion in Gaya sweets."
                containerHeight="480px"
              />
            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Section Heading, Founder Story & Refined Heritage Markers  */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left order-2">
            
            {/* STEP 3: "ABOUT THE OWNER" Premium Label */}
            <motion.div 
              initial={{ opacity: 0.9, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] font-bold text-[#0B3D2E] bg-[#FFFFFF] px-4 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-xs">
                <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>ABOUT THE OWNER</span>
              </div>
            </motion.div>

            {/* STEP 4: Serif Heading with Antique Gold Highlight using React Bits BlurText */}
            <div className="space-y-1">
              <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3D2E] leading-tight">
                <BlurText 
                  text="Behind Every Sweet," 
                  animateBy="words" 
                  direction="top" 
                  delay={100} 
                  className="text-[#0B3D2E] block"
                />
                <BlurText 
                  text="There Is A Story." 
                  animateBy="words" 
                  direction="bottom" 
                  delay={120} 
                  className="gold-text-gradient font-cinzel block mt-1"
                />
              </h2>
            </div>

            {/* STEP 5: Owner Name & Title Shimmer with React Bits SplitText */}
            <motion.div 
              initial={{ opacity: 0.9, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-0.5 pt-1"
            >
              <SplitText 
                text="SHRI UMESH MALAKAR"
                delay={45}
                className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#0B3D2E] tracking-wide"
              />
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D4AF37]">
                Founder & Master Craftsman
              </p>
            </motion.div>

            {/* STEP 6: Warm Emotional Messages */}
            <motion.div 
              initial={{ opacity: 0.9, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="space-y-4 text-left max-w-2xl mx-auto lg:mx-0"
            >
              {/* Message 1 in Highlighted Card */}
              <div className="p-5 sm:p-6 bg-[#FFFFFF] rounded-2xl sm:rounded-3xl border-l-4 border-[#D4AF37] border-y border-r border-[#D4AF37]/25 shadow-xs relative">
                <p className="font-serif-luxury text-base sm:text-lg font-bold text-[#0B3D2E] italic leading-relaxed">
                  "Some traditions are passed down through recipes. Others are built through trust, dedication, and the love of family."
                </p>
              </div>

              {/* Message 2 Narrative */}
              <p className="text-[#0B3D2E]/85 text-sm sm:text-base leading-relaxed font-normal">
                For us, every sweet is more than a confection. It is a reflection of the values that have shaped our family — authentic taste, honest craftsmanship, and the trust of every customer who becomes a part of our journey.
              </p>
            </motion.div>

            {/* STEP 7: Refined TASTE • TRUST • FAMILY Heritage Markers */}
            <motion.div
              variants={markerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              className="space-y-3 pt-2 max-w-2xl mx-auto lg:mx-0 text-left"
            >
              {markers.map((marker, idx) => {
                const IconComp = marker.icon;
                return (
                  <motion.div 
                    key={idx}
                    variants={markerItemVariants}
                    className="p-3.5 sm:p-4 bg-[#FFFFFF] rounded-2xl border border-[#D4AF37]/35 shadow-xs flex items-center space-x-4 hover:border-[#D4AF37] transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#0B3D2E] group-hover:text-[#D4AF37] transition-colors shrink-0">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <span className="font-cinzel text-xs sm:text-sm font-black text-[#0B3D2E] tracking-widest block group-hover:text-[#D4AF37] transition-colors">
                        {marker.title}
                      </span>
                      <p className="text-xs text-[#0B3D2E]/75 font-normal leading-tight">
                        {marker.subtitle}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

          </div>

        </div>
      </div>

      {/* Bottom Section Edge Transition using GradualBlur */}
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

export default AboutOwnerSection;
