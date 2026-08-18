'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Clock, 
  ShoppingBag, 
  ChevronDown, 
  ChevronUp, 
  Flame, 
  Award,
  CheckCircle2,
  Heart
} from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';

// 1. TODAY'S FRESH BATCH COLLECTION
export const TodaysFreshCollection = () => {
  const { addToCart } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const freshItems = PRODUCTS.filter(p => p.isTodaysFresh || p.todayFresh).slice(0, 4);

  return (
    <section className="py-20 bg-[#FAF7F2] text-[#0B3D2E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#0B3D2E] font-bold bg-white px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-xs">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Morning 6:00 AM Fresh Batch</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B3D2E]">
              Freshly Prepared <span className="gold-text-gradient font-cinzel">Daily Confections</span>
            </h2>
            <p className="text-[#0B3D2E]/80 text-sm font-light">
              Crafted every morning by traditional Bihari karigars using 100% pure A2 Cow Desi Ghee.
            </p>
          </div>

          <Link 
            href="/shop?sort=todaysFresh" 
            className="gold-btn px-6 py-3 rounded-2xl text-xs font-bold shrink-0 shadow-gold-glow uppercase tracking-wider"
          >
            View All Fresh Items
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {freshItems.map((product, idx) => {
            const inWishlist = isInWishlist(product.id);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-[#FFFFFF] rounded-[24px] border border-[#D4AF37]/35 overflow-hidden flex flex-col justify-between group hover:border-[#D4AF37] hover:shadow-[0_20px_40px_-12px_rgba(212,175,55,0.22)] hover:-translate-y-1 transition-all duration-300 shadow-sm"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative h-56 overflow-hidden bg-[#FAF7F2]">
                    <img 
                      src={product.image || "/assets/Gud Tilkut.png"} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out" 
                    />
                    
                    <span className="absolute top-3 left-3 bg-[#0B3D2E] text-[#FAF7F2] font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md border border-[#D4AF37]/30">
                      Fresh Batch Today
                    </span>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                        inWishlist ? 'bg-rose-600 text-white' : 'bg-white/80 text-[#0B3D2E] hover:bg-white'
                      }`}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  {/* Card Metadata */}
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest block">
                      {product.category}
                    </span>
                    <h3 className="font-serif-luxury text-lg font-bold text-[#0B3D2E] line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#0B3D2E]/70 line-clamp-2 font-light leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Footer / Price & Add Button */}
                <div className="p-5 pt-0 flex items-center justify-between border-t border-[#D4AF37]/20 mt-3">
                  <div>
                    <span className="font-serif-luxury text-xl font-bold text-[#0B3D2E]">₹{product.price}</span>
                    <span className="text-[10px] text-[#0B3D2E]/60 block">{product.unit}</span>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="gold-btn px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

// 2. TRADITIONAL BIHAR SPECIALS
export const TraditionalBiharSpecials = () => {
  const { addToCart } = useCartStore();
  const biharSpecials = PRODUCTS.filter(p => p.category === "Traditional Bihar Specials" || p.biharSpecial).slice(0, 4);

  return (
    <section className="py-20 bg-[#F5EFE6] text-[#0B3D2E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#0B3D2E] font-bold bg-[#FFFFFF] px-4 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-xs">
            Heritage Recipes of Gaya & Silao
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#0B3D2E]">
            Authentic Regional <span className="gold-text-gradient font-cinzel">Bihar Delicacies</span>
          </h2>
          <p className="text-[#0B3D2E]/80 text-sm sm:text-base font-light">
            Made strictly according to ancestral hand-crafting techniques.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {biharSpecials.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-[#FFFFFF] rounded-[24px] border border-[#D4AF37]/35 p-5 space-y-4 shadow-sm hover:shadow-[0_20px_40px_-12px_rgba(212,175,55,0.25)] hover:border-[#D4AF37] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="relative h-48 rounded-[18px] overflow-hidden bg-[#FAF7F2]">
                  <img 
                    src={product.image || "/assets/Khaja.png"} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out" 
                  />
                  <span className="absolute top-2.5 left-2.5 bg-[#D4AF37] text-[#06241B] font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                    Authentic Bihar
                  </span>
                </div>

                <div>
                  <h3 className="font-serif-luxury font-bold text-base text-[#0B3D2E] group-hover:text-[#D4AF37] transition-colors leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#0B3D2E]/70 line-clamp-2 mt-1 font-light leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#D4AF37]/20 pt-3">
                <span className="font-bold text-[#0B3D2E] text-sm">₹{product.price} / {product.unit}</span>
                <button 
                  onClick={() => addToCart(product)} 
                  className="forest-btn px-4 py-2 rounded-xl text-xs font-bold"
                >
                  Add
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

// 3. SEASONAL SPECIALS
export const SeasonalSpecials = () => {
  const { addToCart } = useCartStore();
  const seasonalItems = PRODUCTS.filter(p => p.season === 'Winter' || p.seasonNotice).slice(0, 4);

  return (
    <section className="py-20 bg-[#FAF7F2] text-[#0B3D2E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#0B3D2E] font-bold bg-[#FFFFFF] px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Limited Batch Harvest</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#0B3D2E]">
              Seasonal & Winter <span className="gold-text-gradient font-cinzel">Exclusive Collection</span>
            </h2>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasonalItems.map((product, idx) => (
            <motion.div 
              key={product.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-[#FFFFFF] rounded-[24px] border border-[#D4AF37]/35 p-5 space-y-4 shadow-sm hover:shadow-[0_20px_40px_-12px_rgba(212,175,55,0.25)] hover:border-[#D4AF37] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="relative h-48 rounded-[18px] overflow-hidden bg-[#FAF7F2]">
                  <img 
                    src={product.image || "/assets/Gud Tilkut.png"} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out" 
                  />
                  <span className="absolute top-2.5 left-2.5 bg-amber-500 text-white font-extrabold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                    {product.seasonNotice || 'Winter Harvest Special'}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif-luxury font-bold text-base text-[#0B3D2E] group-hover:text-[#D4AF37] transition-colors leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#0B3D2E]/70 line-clamp-2 mt-1 font-light leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#D4AF37]/20 pt-3">
                <span className="font-bold text-[#0B3D2E] text-sm">₹{product.price} / {product.unit}</span>
                <button 
                  onClick={() => addToCart(product)} 
                  className="gold-btn px-4 py-2 rounded-xl text-xs font-bold"
                >
                  Add
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

// 4. FAQ ACCORDION SECTION
export const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(0);

  const FAQS = [
    {
      q: "Do you deliver pan-India or internationally?",
      a: "No. VINDHYAWASINI TILKUT BHANDAR currently operates on a city-limits-only express delivery model to guarantee maximum freshness of our pure A2 ghee sweets. We do not provide international shipping."
    },
    {
      q: "How are city delivery charges calculated?",
      a: "Delivery charges are based on distance from our flagship store: Base fee ₹40 for up to 3 km, and ₹10/km for additional distance. Orders above ₹999 receive FREE express delivery!"
    },
    {
      q: "Can I pick up my order directly from the store?",
      a: "Yes! You can choose 'Store Pickup' at checkout to pick up hot, fresh packages from our store during opening hours (7:00 AM – 10:00 PM) at zero charge."
    },
    {
      q: "How do I place bulk orders for weddings and corporate events?",
      a: "For custom wedding boxes and bulk orders, click the 'WhatsApp' or 'Bulk Orders' buttons to connect directly with our catering team."
    }
  ];

  return (
    <section className="py-20 bg-[#F5EFE6] text-[#0B3D2E] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#0B3D2E] font-bold bg-[#FFFFFF] px-4 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-xs">
            Frequently Asked Questions
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#0B3D2E]">
            City Delivery & Store <span className="gold-text-gradient font-cinzel">Information</span>
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-[#FFFFFF] rounded-2xl border border-[#D4AF37]/35 overflow-hidden shadow-xs"
            >
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-5 text-left flex justify-between items-center font-serif-luxury font-bold text-sm sm:text-base text-[#0B3D2E] hover:text-[#D4AF37] transition-colors"
              >
                <span>{faq.q}</span>
                {openIdx === idx ? <ChevronUp className="w-4 h-4 text-[#D4AF37] shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#0B3D2E]/60 shrink-0" />}
              </button>
              
              {openIdx === idx && (
                <div className="px-5 pb-5 text-xs text-[#0B3D2E]/80 font-light border-t border-[#D4AF37]/15 pt-3 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
