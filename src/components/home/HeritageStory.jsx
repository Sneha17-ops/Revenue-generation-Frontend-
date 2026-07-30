'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Heart, Sparkles, MapPin } from 'lucide-react';

export const HeritageStory = () => {
  return (
    <section className="py-24 bg-royal-greenDark text-royal-ivory relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-royal-gold font-bold bg-royal-gold/10 px-4 py-1.5 rounded-full border border-royal-gold/20">
              Centuries of Culinary Craft
            </span>

            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-royal-ivory leading-tight">
              Preserving the <span className="gold-text-gradient font-cinzel">Heritage of Bihar</span> Since 1974
            </h2>

            <p className="text-royal-goldMuted/80 text-sm leading-relaxed font-light">
              Bindhyawasini was founded with a singular mission: to serve authentic Bihari sweets prepared exactly as our forefathers made them. From hand-pounding white sesame in wooden mortars for Gaya Tilkut to creating 64 delicate flaky layers for Silao Khaja, every box reflects royal Bihari culture.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-royal-green/60 rounded-2xl border border-royal-gold/20 space-y-1">
                <ShieldCheck className="w-5 h-5 text-royal-gold" />
                <h4 className="font-bold text-xs text-royal-gold">100% A2 Cow Ghee</h4>
                <p className="text-[11px] text-royal-goldMuted/70">Pure clarified butter without artificial additives</p>
              </div>

              <div className="p-4 bg-royal-green/60 rounded-2xl border border-royal-gold/20 space-y-1">
                <MapPin className="w-5 h-5 text-royal-gold" />
                <h4 className="font-bold text-xs text-royal-gold">Gaya & Silao Origin</h4>
                <p className="text-[11px] text-royal-goldMuted/70">Authentic regional masters and karigars</p>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/about" className="gold-btn px-6 py-3 rounded-xl text-xs font-bold inline-block">
                Read Our Full Heritage Story
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border-2 border-royal-gold/30 shadow-luxury">
              <img 
                src="https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?q=80&w=1000&auto=format&fit=crop" 
                alt="Bihari Karigar Preparation" 
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-royal-greenDark/90 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-royal-green/90 backdrop-blur-md rounded-2xl border border-royal-gold/30">
                <span className="text-xs text-royal-gold font-bold uppercase tracking-wider block">Artisanal Craftsmanship</span>
                <p className="text-xs text-royal-ivory mt-1">Prepared fresh daily by traditional karigars using organic ingredients.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
