'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../../data/products';

// Mapping authentic images for each category
const CATEGORY_IMAGES = {
  "all": "/assets/MP6.jpeg",
  "Traditional Bihar Specials": "/assets/Khaja.png",
  "Tilkut": "/assets/Gud Tilkut.png",
  "Khoya Items": "/assets/Khoya Peda.png",
  "Bengali Sweets": "/assets/Rasgulla.png",
  "Sweets": "/assets/Kaju Katli.png",
  "Laddu": "/assets/Motichur Laddu.png",
  "Namkeen": "/assets/besan papdi.png",
  "Pastry": "/assets/Launglatta.png",
  "Seasonal Specials": "/assets/Patla Anarsa.png",
};

export const CategoryShowcase = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      
      const newIdx = Math.round(scrollLeft / 280);
      setActiveIndex(newIdx);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-[#FAF7F2] text-[#0B3D2E] relative overflow-hidden">
      {/* Subtle Warm Background Light Spots */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[50vh] bg-gradient-radial from-[#D4AF37]/08 via-[#FAF7F2]/0 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#0B3D2E] font-bold bg-[#FFFFFF] px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>HERITAGE RECIPES OF GAYA & SILAO</span>
            </div>
            
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#0B3D2E]">
              Traditional Bihar <span className="gold-text-gradient font-cinzel">Heritage Specials</span>
            </h2>
            
            <p className="text-[#0B3D2E]/80 text-sm sm:text-base font-light leading-relaxed">
              Authentic regional delicacies crafted with traditional techniques and cherished across generations.
            </p>
          </div>

          {/* Carousel Arrow Navigation Buttons */}
          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`p-3 rounded-full border border-[#D4AF37]/40 transition-all duration-300 flex items-center justify-center ${
                canScrollLeft 
                  ? 'bg-white text-[#0B3D2E] hover:bg-[#0B3D2E] hover:text-[#FAF7F2] hover:border-[#0B3D2E] shadow-sm hover:scale-105' 
                  : 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={`p-3 rounded-full border border-[#D4AF37]/40 transition-all duration-300 flex items-center justify-center ${
                canScrollRight 
                  ? 'bg-[#0B3D2E] text-[#FAF7F2] hover:bg-[#06241B] shadow-md hover:scale-105' 
                  : 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Premium Horizontal Carousel Track */}
        <div 
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto scrollbar-none py-4 px-1 scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CATEGORIES.map((cat, idx) => {
            const catImage = CATEGORY_IMAGES[cat.id] || "/assets/Gud Tilkut.png";
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 25, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="shrink-0 w-[270px] sm:w-[290px] snap-start"
              >
                <Link 
                  href={`/shop?category=${encodeURIComponent(cat.name)}`}
                  className="group block bg-[#FFFFFF] rounded-[24px] border border-[#D4AF37]/35 p-4 shadow-[0_10px_25px_-5px_rgba(11,61,46,0.06)] hover:shadow-[0_20px_40px_-10px_rgba(212,175,55,0.25)] hover:border-[#D4AF37] hover:-translate-y-1.5 transition-all duration-300"
                >
                  {/* Category Card Image Container */}
                  <div className="relative h-44 rounded-[18px] overflow-hidden bg-[#FAF7F2] mb-4">
                    <img 
                      src={catImage} 
                      alt={cat.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06241B]/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    
                    {/* Item Count Badge */}
                    <span className="absolute top-3 left-3 bg-[#FFFFFF]/90 backdrop-blur-md text-[#0B3D2E] text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border border-[#D4AF37]/30 shadow-xs">
                      {cat.count} Items
                    </span>
                  </div>

                  {/* Category Details */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-serif-luxury text-lg font-bold text-[#0B3D2E] group-hover:text-[#D4AF37] transition-colors leading-tight">
                        {cat.name}
                      </h3>
                      
                      <div className="w-8 h-8 rounded-full bg-[#FAF7F2] group-hover:bg-[#0B3D2E] group-hover:text-white text-[#0B3D2E] border border-[#D4AF37]/30 flex items-center justify-center transition-all duration-300 shrink-0">
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>

                    <div className="h-[2px] w-8 bg-[#D4AF37]/40 group-hover:w-full transition-all duration-500 rounded-full" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Pagination Indicators Underneath */}
        <div className="flex justify-center items-center space-x-2 pt-2">
          {CATEGORIES.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => {
                if (scrollRef.current) {
                  scrollRef.current.scrollTo({ left: idx * 280, behavior: 'smooth' });
                }
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx || (idx === CATEGORIES.length - 1 && !canScrollRight)
                  ? 'w-7 bg-[#D4AF37]' 
                  : 'w-2 bg-[#D4AF37]/30 hover:bg-[#D4AF37]/60'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default CategoryShowcase;
