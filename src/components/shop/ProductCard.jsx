'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye, Star, Sparkles, Clock, AlertCircle } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';

export const ProductCard = ({ product, onSelectProduct, index = 0 }) => {
  const { addToCart } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();

  const isLiked = isInWishlist(product.id);
  const isOutOfStock = product.stockState === 'OUT_OF_STOCK' || product.availability === 'Out of Stock';
  const isComingSoon = product.stockState === 'COMING_SOON';
  const isLowStock = product.stockState === 'LOW_STOCK';
  const isSeasonal = product.stockState === 'SEASONAL' || product.seasonNotice;

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    if (!isOutOfStock && !isComingSoon) {
      addToCart(product);
    }
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  // Stock status badge configuration
  const renderStockBadge = () => {
    if (isComingSoon) {
      return (
        <span className="bg-[#1C2B26]/90 text-amber-200 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-amber-400/30 backdrop-blur-md shadow-sm">
          Coming Soon
        </span>
      );
    }
    if (isOutOfStock) {
      return (
        <span className="bg-stone-800/90 text-stone-300 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-stone-600/30 backdrop-blur-md shadow-sm">
          Currently Unavailable
        </span>
      );
    }
    if (isLowStock) {
      return (
        <span className="bg-amber-700/90 text-amber-100 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-amber-400/40 backdrop-blur-md shadow-sm flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> Limited Stock
        </span>
      );
    }
    if (isSeasonal) {
      return (
        <span className="bg-[#B8860B]/90 text-[#FDFBF7] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#D4AF37]/50 backdrop-blur-md shadow-sm flex items-center gap-1">
          <Clock className="w-3 h-3" /> Seasonal Special
        </span>
      );
    }
    if (product.badge) {
      return (
        <span className="bg-[#0B2519] text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#D4AF37]/40 shadow-sm">
          {product.badge}
        </span>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.3) }}
      onClick={() => onSelectProduct && onSelectProduct(product)}
      className="bg-[#F5F0E6] rounded-3xl border border-[#D4AF37]/25 overflow-hidden hover:border-[#D4AF37] shadow-sm hover:shadow-[0_12px_32px_rgba(212,175,55,0.2)] transition-all duration-500 group flex flex-col justify-between cursor-pointer relative"
    >
      {/* Top Image Container */}
      <div className="relative h-60 w-full overflow-hidden bg-[#EAE4D7]">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
          />
        ) : (
          /* Clean Luxury Placeholder for future Cloudinary / Admin upload */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#EAE4D7] to-[#DFD7C6] text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#0B2519]/10 border border-[#D4AF37]/40 flex items-center justify-center text-[#B8860B]">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-xs font-serif-luxury font-bold text-[#1C2B26]">
              Vindhyawasini Confectionery
            </span>
            <span className="text-[10px] text-[#4A5D55] bg-[#FAF7F2] px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30">
              Ready for Cloudinary Image
            </span>
          </div>
        )}

        {/* Subtle Warm Lighting Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2519]/50 via-transparent to-amber-100/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 z-10">
          {renderStockBadge()}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label="Add to Wishlist"
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 z-10 ${
            isLiked
              ? 'bg-rose-600 text-white shadow-md scale-110'
              : 'bg-black/35 text-amber-100 hover:bg-black/60 hover:text-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>

        {/* Hover Quick View Indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
          <span className="bg-[#0B2519]/90 text-[#D4AF37] border border-[#D4AF37]/50 text-[11px] font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg backdrop-blur-md">
            <Eye className="w-3.5 h-3.5" /> View Details
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center text-[11px] text-[#4A5D55] mb-1 font-medium">
            <span>{product.category}</span>
            <div className="flex items-center text-[#B8860B] font-bold space-x-1">
              <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
              <span>{product.rating || '4.9'}</span>
              <span className="text-[10px] text-[#4A5D55]/70 font-normal">({product.reviewsCount || 120})</span>
            </div>
          </div>

          <h3 className="font-serif-luxury font-bold text-base text-[#1C2B26] group-hover:text-[#B8860B] transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-[#4A5D55] text-xs line-clamp-2 mt-1.5 font-light leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Card Footer */}
        <div className="pt-3 border-t border-[#D4AF37]/20 flex justify-between items-center mt-2">
          <div>
            <div className="flex items-baseline space-x-1.5">
              <span className="font-serif-luxury font-bold text-lg text-[#1C2B26]">
                ₹{product.price}
              </span>
              {product.discountPrice && product.discountPrice < product.price && (
                <span className="text-xs text-[#4A5D55] line-through">
                  ₹{product.discountPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#4A5D55] font-normal block">
              Per {product.unit}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={isOutOfStock || isComingSoon}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md transition-all duration-300 ${
              isOutOfStock || isComingSoon
                ? 'bg-stone-300 text-stone-500 cursor-not-allowed shadow-none'
                : 'bg-[#0B2519] text-[#D4AF37] hover:bg-[#153e2c] hover:scale-105 active:scale-95 shadow-[#0B2519]/20'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isOutOfStock ? 'Sold Out' : isComingSoon ? 'Soon' : 'Add'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
