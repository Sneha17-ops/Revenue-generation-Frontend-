'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Crown, ShoppingBag, Heart, Star, Sparkles, Check } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';

export const BestSellers = () => {
  const { addToCart } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const bestSellers = PRODUCTS.slice(0, 4);

  return (
    <section className="py-20 bg-royal-green text-royal-ivory relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-14">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-royal-gold font-bold bg-royal-gold/10 px-3.5 py-1 rounded-full border border-royal-gold/20">
              👑 Customer Favorites
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-royal-ivory">
              Most Loved <span className="gold-text-gradient font-cinzel">Bihari Delicacies</span>
            </h2>
          </div>

          <Link href="/shop" className="gold-btn px-6 py-2.5 rounded-xl text-xs font-bold shrink-0">
            View All Sweets
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => {
            const inWishlist = isInWishlist(product.id);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-royal-greenDark rounded-3xl border border-royal-gold/30 overflow-hidden flex flex-col justify-between group hover:border-royal-gold transition-all duration-500 shadow-luxury"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-60 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Season or Heritage Badge */}
                    {product.seasonNotice && (
                      <span className="absolute top-3 left-3 bg-amber-400 text-royal-green text-[10px] uppercase font-extrabold px-2.5 py-1 rounded-full shadow-md">
                        {product.seasonNotice}
                      </span>
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                        inWishlist ? 'bg-rose-600 text-white' : 'bg-black/40 text-royal-goldMuted hover:text-white'
                      }`}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  {/* Product Metadata */}
                  <div className="p-5 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-royal-gold tracking-widest">{product.category}</span>
                        <h3 className="font-serif-luxury text-lg font-bold text-royal-ivory line-clamp-1 group-hover:text-royal-gold transition-colors">
                          {product.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs text-royal-goldMuted/70 line-clamp-2 font-light">
                      {product.description}
                    </p>

                    <div className="flex items-center space-x-1 text-amber-400 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{product.rating || '4.9'}</span>
                      <span className="text-royal-goldMuted/50 font-normal">({product.reviewsCount || 128} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Price & Add to Cart Footer */}
                <div className="p-5 pt-0 flex items-center justify-between border-t border-royal-gold/15 mt-3">
                  <div>
                    <span className="font-serif-luxury text-xl font-bold text-royal-gold">₹{product.price}</span>
                    <span className="text-[10px] text-royal-goldMuted/60 block">{product.unit}</span>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="gold-btn px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-gold-glow"
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
