'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Crown, ShoppingBag, Heart, Star, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';

export const BestSellers = () => {
  const { addToCart } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const bestSellers = PRODUCTS.slice(0, 4);

  return (
    <section className="py-20 bg-[#FAF7F2] text-[#0B3D2E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#0B3D2E] font-bold bg-[#FFFFFF] px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-xs">
              <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Customer Favorites</span>
            </div>
            
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B3D2E]">
              Most Loved <span className="gold-text-gradient font-cinzel">Bihari Delicacies</span>
            </h2>
          </div>

          <Link href="/shop" className="gold-btn px-6 py-3 rounded-2xl text-xs font-bold shrink-0 uppercase tracking-wider">
            View All Sweets
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product, idx) => {
            const inWishlist = isInWishlist(product.id);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-[#FFFFFF] rounded-[24px] border border-[#D4AF37]/35 overflow-hidden flex flex-col justify-between group hover:border-[#D4AF37] hover:shadow-[0_20px_40px_-12px_rgba(212,175,55,0.25)] hover:-translate-y-1 transition-all duration-300 shadow-sm"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-60 overflow-hidden bg-[#FAF7F2]">
                    <img 
                      src={product.image || "/assets/Gud Tilkut.png"} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />

                    {/* Season / Heritage Badge */}
                    {product.seasonNotice && (
                      <span className="absolute top-3 left-3 bg-[#D4AF37] text-[#06241B] text-[10px] uppercase font-extrabold px-2.5 py-1 rounded-full shadow-xs tracking-wider">
                        {product.seasonNotice}
                      </span>
                    )}

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

                  {/* Product Metadata */}
                  <div className="p-5 space-y-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest block">
                        {product.category}
                      </span>
                      <h3 className="font-serif-luxury text-lg font-bold text-[#0B3D2E] line-clamp-1 group-hover:text-[#D4AF37] transition-colors leading-tight">
                        {product.name}
                      </h3>
                    </div>

                    <p className="text-xs text-[#0B3D2E]/70 line-clamp-2 font-light leading-relaxed">
                      {product.description}
                    </p>

                    <div className="flex items-center space-x-1 text-[#D4AF37] text-xs font-bold pt-1">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-[#0B3D2E] font-semibold">{product.rating || '4.9'}</span>
                      <span className="text-[#0B3D2E]/50 font-normal">({product.reviewsCount || 128} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Price & Add to Bag Footer */}
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
                    <span>Add to Bag</span>
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

export default BestSellers;
