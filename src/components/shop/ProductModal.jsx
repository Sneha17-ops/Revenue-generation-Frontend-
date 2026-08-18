'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Clock, Award, Sparkles, Check, ChevronRight } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';

export const ProductModal = ({ product, onClose }) => {
  const { addToCart } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();

  const [selectedUnit, setSelectedUnit] = useState(product?.unit || '500 Gram');
  const [selectedImage, setSelectedImage] = useState(product?.image || null);
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) return null;

  const isLiked = isInWishlist(product.id);
  const isOutOfStock = product.stockState === 'OUT_OF_STOCK' || product.availability === 'Out of Stock';
  const isComingSoon = product.stockState === 'COMING_SOON';
  const isLowStock = product.stockState === 'LOW_STOCK';
  const isSeasonal = product.stockState === 'SEASONAL' || product.seasonNotice;

  const galleryImages = [
    ...(product.image ? [product.image] : []),
    ...(product.imageGallery || [])
  ].filter((v, i, a) => a.indexOf(v) === i);

  const handleAddToCart = () => {
    if (isOutOfStock || isComingSoon) return;
    for (let i = 0; i < quantity; i++) {
      addToCart({ ...product, unit: selectedUnit });
    }
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-[#FAF7F2] border-2 border-[#D4AF37]/40 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden relative my-8 text-[#1C2B26]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-[#0B2519]/80 text-[#D4AF37] hover:bg-[#0B2519] hover:text-white transition-all z-20 shadow-md"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            {/* Left Column - Image Gallery */}
            <div className="md:col-span-6 bg-[#EAE4D7] p-6 flex flex-col justify-between relative min-h-[350px]">
              <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-inner flex items-center justify-center bg-[#F5F0E6]">
                {(selectedImage || product.image) ? (
                  <img
                    src={selectedImage || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-8 space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-3xl bg-[#0B2519]/10 border border-[#D4AF37]/50 flex items-center justify-center text-[#B8860B]">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <p className="font-serif-luxury font-bold text-[#1C2B26]">
                      Vindhyawasini Confectionery
                    </p>
                    <p className="text-xs text-[#4A5D55]">
                      Authentic client product photo ready for dynamic Cloudinary upload.
                    </p>
                  </div>
                )}
              </div>

              {/* Gallery Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        (selectedImage || product.image) === img
                          ? 'border-[#B8860B] scale-105 shadow-md'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Product Information */}
            <div className="md:col-span-6 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Category & Rating */}
                <div className="flex justify-between items-center text-xs text-[#4A5D55]">
                  <span className="uppercase font-bold tracking-widest text-[#B8860B] bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/30">
                    {product.category}
                  </span>
                  <div className="flex items-center space-x-1 text-amber-600 font-bold">
                    <Star className="w-4 h-4 fill-current text-amber-500" />
                    <span>{product.rating || '5.0'}</span>
                    <span className="text-[#4A5D55] font-normal">({product.reviewsCount || 150} reviews)</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="font-serif-luxury font-bold text-2xl sm:text-3xl text-[#1C2B26] leading-tight">
                  {product.name}
                </h2>

                {/* Stock Badge */}
                <div>
                  {isComingSoon && (
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                      ⌛ Coming Soon - Launching Shortly
                    </span>
                  )}
                  {isOutOfStock && (
                    <span className="text-xs font-bold text-rose-700 bg-rose-100 px-3 py-1 rounded-full border border-rose-300">
                      🚫 Currently Unavailable
                    </span>
                  )}
                  {isLowStock && (
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                      ⚡ Limited Stock Remaining
                    </span>
                  )}
                  {isSeasonal && (
                    <span className="text-xs font-bold text-[#B8860B] bg-[#D4AF37]/15 px-3 py-1 rounded-full border border-[#D4AF37]/40">
                      ❄️ Seasonal Special Delicacy
                    </span>
                  )}
                  {!isComingSoon && !isOutOfStock && !isLowStock && !isSeasonal && (
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                      ✓ Fresh Daily Batch Available
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#4A5D55] leading-relaxed font-light">
                  {product.description}
                </p>

                {/* Preparation & Shelf Life Badges */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-[#F5F0E6] p-3 rounded-xl border border-[#D4AF37]/20 flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-[#B8860B] shrink-0" />
                    <div>
                      <span className="text-[10px] text-[#4A5D55] block font-medium">Preparation</span>
                      <span className="text-xs font-bold text-[#1C2B26]">{product.preparationTime || 'Fresh Daily'}</span>
                    </div>
                  </div>
                  <div className="bg-[#F5F0E6] p-3 rounded-xl border border-[#D4AF37]/20 flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-[#B8860B] shrink-0" />
                    <div>
                      <span className="text-[10px] text-[#4A5D55] block font-medium">Shelf Life</span>
                      <span className="text-xs font-bold text-[#1C2B26]">{product.shelfLife || '15 Days'}</span>
                    </div>
                  </div>
                </div>

                {/* Weight Options */}
                {product.availableUnits && product.availableUnits.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-bold text-[#1C2B26] uppercase tracking-wider block">
                      Select Pack Weight:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.availableUnits.map((u) => (
                        <button
                          key={u}
                          onClick={() => setSelectedUnit(u)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            selectedUnit === u
                              ? 'bg-[#0B2519] text-[#D4AF37] shadow-md border border-[#D4AF37]'
                              : 'bg-[#F5F0E6] text-[#4A5D55] border border-[#D4AF37]/20 hover:border-[#B8860B]'
                          }`}
                        >
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ingredients */}
                {product.ingredients && product.ingredients.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold text-[#1C2B26] uppercase tracking-wider block">
                      Pure Ingredients:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.ingredients.map((ing, i) => (
                        <span key={i} className="text-[10px] bg-[#EAE4D7] text-[#1C2B26] px-2.5 py-1 rounded-md">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-[#D4AF37]/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#4A5D55] font-medium block">Total Price</span>
                    <span className="font-serif-luxury font-bold text-2xl text-[#0B2519]">
                      ₹{product.price * quantity}
                    </span>
                  </div>

                  {/* Quantity Counter */}
                  <div className="flex items-center border border-[#D4AF37]/40 rounded-xl overflow-hidden bg-[#F5F0E6]">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-1.5 text-[#0B2519] font-bold hover:bg-[#EAE4D7]"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-xs font-bold text-[#1C2B26]">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 py-1.5 text-[#0B2519] font-bold hover:bg-[#EAE4D7]"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock || isComingSoon}
                    className={`flex-1 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg transition-all ${
                      isOutOfStock || isComingSoon
                        ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                        : 'bg-[#0B2519] text-[#D4AF37] hover:bg-[#153e2c] active:scale-[0.98]'
                    }`}
                  >
                    {addedNotice ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>{isOutOfStock ? 'Currently Unavailable' : isComingSoon ? 'Coming Soon' : 'Add to Shopping Bag'}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isLiked
                        ? 'bg-rose-600 border-rose-600 text-white shadow-md'
                        : 'bg-[#F5F0E6] border-[#D4AF37]/40 text-[#0B2519] hover:bg-[#EAE4D7]'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
