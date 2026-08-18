'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, Crown, Sparkles } from 'lucide-react';

export const HeritageStory = () => {
  return (
    <section className="py-24 bg-[#F5EFE6] text-[#0B3D2E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#0B3D2E] font-bold bg-[#FFFFFF] px-4 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-xs">
              <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Centuries of Culinary Craft</span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#0B3D2E] leading-tight">
              Preserving the <span className="gold-text-gradient font-cinzel">Heritage of Bihar</span> Since 1995
            </h2>

            <p className="text-[#0B3D2E]/80 text-sm sm:text-base leading-relaxed font-light">
              <span className="font-semibold text-[#0B3D2E]">VINDHYAWASINI TILKUT BHANDAR</span> was founded with a singular mission: to serve authentic Bihari sweets prepared exactly as our forefathers made them. From hand-pounding white sesame in wooden mortars for Gaya Tilkut to creating 64 delicate flaky layers for Silao Khaja, every box reflects royal Bihari culture.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#FFFFFF] rounded-2xl border border-[#D4AF37]/30 space-y-1.5 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                <h4 className="font-bold text-xs text-[#0B3D2E]">100% A2 Cow Ghee</h4>
                <p className="text-[11px] text-[#0B3D2E]/70 font-light">Pure clarified butter without artificial additives</p>
              </div>

              <div className="p-4 bg-[#FFFFFF] rounded-2xl border border-[#D4AF37]/30 space-y-1.5 shadow-xs">
                <MapPin className="w-5 h-5 text-[#D4AF37]" />
                <h4 className="font-bold text-xs text-[#0B3D2E]">Gaya & Silao Origin</h4>
                <p className="text-[11px] text-[#0B3D2E]/70 font-light">Authentic regional masters and karigars</p>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/about" className="gold-btn px-7 py-3.5 rounded-2xl text-xs font-bold inline-block shadow-gold-glow uppercase tracking-wider">
                Read Our Full Heritage Story
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-[32px] overflow-hidden border-2 border-[#D4AF37]/45 shadow-[0_25px_50px_-12px_rgba(11,61,46,0.15)] bg-white p-3 group">
              <div className="relative h-[420px] rounded-[24px] overflow-hidden">
                <img 
                  src="/assets/MP6.jpeg" 
                  alt="VINDHYAWASINI TILKUT BHANDAR Karigar Preparation" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06241B]/85 via-transparent to-transparent" />
                
                <div className="absolute bottom-5 left-5 right-5 p-4 bg-[#FFFFFF]/90 backdrop-blur-md rounded-2xl border border-[#D4AF37]/35 shadow-md">
                  <span className="text-xs text-[#D4AF37] font-bold uppercase tracking-wider block">Artisanal Craftsmanship</span>
                  <p className="text-xs text-[#0B3D2E] mt-1 font-medium">Prepared fresh daily by traditional karigars using organic ingredients.</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeritageStory;
