'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../../data/products';

export const CategoryShowcase = () => {
  return (
    <section className="py-20 bg-royal-greenDark text-royal-ivory relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-royal-gold font-bold bg-royal-gold/10 px-4 py-1.5 rounded-full border border-royal-gold/20">
            Artisanal Confectionery Range
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-royal-ivory">
            Explore Traditional <span className="gold-text-gradient font-cinzel">Bihar Categories</span>
          </h2>
          <p className="text-royal-goldMuted/80 text-sm font-light">
            From Gaya's famous sesame gud tilkut to Silao's 64-layer khaja and rich mawa sweets handcrafted daily.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link 
                href={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="group relative h-80 rounded-3xl overflow-hidden block border border-royal-gold/30 hover:border-royal-gold transition-all duration-500 shadow-luxury"
              >
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-royal-greenDark via-royal-greenDark/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

                <div className="absolute bottom-6 left-6 right-6 space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-royal-gold bg-royal-gold/20 px-2.5 py-1 rounded-full border border-royal-gold/30">
                    {cat.count} Items
                  </span>
                  <h3 className="font-serif-luxury text-xl font-bold text-royal-ivory group-hover:text-royal-gold transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-royal-goldMuted/80 line-clamp-2 font-light">
                    {cat.description}
                  </p>
                  
                  <div className="pt-2 flex items-center space-x-2 text-xs font-bold text-royal-gold group-hover:translate-x-1 transition-transform">
                    <span>View Category</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
