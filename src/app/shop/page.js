'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, Sparkles, Gift, HeartHandshake, MessageSquare, Phone, RotateCcw, Check } from 'lucide-react';
import { PRODUCTS, CATEGORIES, CITY_DELIVERY_RULES } from '../../data/products';
import { ProductCard } from '../../components/shop/ProductCard';
import { ProductModal } from '../../components/shop/ProductModal';
import { ProductSkeleton } from '../../components/shop/ProductSkeleton';
import { useWishlistStore } from '../../store/useWishlistStore';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCat, setSelectedCat] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState(3500);
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { isInWishlist } = useWishlistStore();

  useEffect(() => {
    const queryCat = searchParams.get('category');
    if (queryCat) {
      setSelectedCat(queryCat);
    }
  }, [searchParams]);

  // Simulate smooth skeleton load on initial render or heavy filter changes
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [selectedCat]);

  // Robust category and criteria matching
  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedCat !== 'all' && selectedCat !== 'Wishlist') {
      const matchCat =
        p.category === selectedCat ||
        p.subCategory === selectedCat ||
        CATEGORIES.some(c => (c.id === selectedCat || c.name === selectedCat) && (c.id === p.category || c.name === p.category));

      if (!matchCat) return false;
    }

    if (selectedCat === 'Wishlist' && !isInWishlist(p.id)) return false;
    if (p.price > maxPrice) return false;
    if (availabilityFilter === 'inStock' && (p.stockState === 'OUT_OF_STOCK' || p.availability === 'Out of Stock')) return false;
    if (availabilityFilter === 'seasonal' && p.stockState !== 'SEASONAL' && !p.seasonNotice) return false;
    if (searchQuery.trim() !== '' && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.category.toLowerCase().includes(searchQuery.toLowerCase())) return false;

    return true;
  });

  const resetFilters = () => {
    setSelectedCat('all');
    setMaxPrice(3500);
    setAvailabilityFilter('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10 px-4 sm:px-6 lg:px-8 text-[#1C2B26]">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Hero Banner Section */}
        <div className="bg-[#0B2519] p-8 sm:p-12 rounded-3xl border-2 border-[#D4AF37]/35 shadow-2xl relative overflow-hidden text-[#FDFBF7]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-3xl space-y-3 relative z-10">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold bg-[#D4AF37]/10 px-3.5 py-1 rounded-full border border-[#D4AF37]/30 inline-block">
              VINDHYAWASINI CONFECTIONERY CATALOG
            </span>
            <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#D4AF37]">
              Our Complete Sweet Menu
            </h1>
            <p className="text-[#D4AF37]/85 text-xs sm:text-sm leading-relaxed font-light">
              Explore authentic Gaya Tilkut, Silao Khaja, Classic Launglatta, pure A2 Gir Cow Ghee Motichoor Laddus, Kaju Katli, and traditional Bihari savories. Handcrafted fresh daily.
            </p>
          </div>
        </div>

        {/* Filter Bar & Products Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Sidebar Filter Panel */}
          <div className="lg:col-span-3 space-y-6 sticky top-24">
            <div className="bg-[#F5F0E6] p-6 rounded-3xl border border-[#D4AF37]/30 shadow-md space-y-6">

              {/* Filter Header */}
              <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-3">
                <h3 className="font-serif-luxury font-bold text-base text-[#1C2B26] flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-[#B8860B]" />
                  <span>Filter Menu</span>
                </h3>
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-[#B8860B] font-bold hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#B8860B] absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search sweets, laddus, tilkut..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#FAF7F2] border border-[#D4AF37]/30 rounded-xl text-xs text-[#1C2B26] placeholder-[#4A5D55]/60 focus:outline-none focus:border-[#B8860B] transition-colors"
                />
              </div>

              {/* Category Filter List */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#1C2B26] uppercase tracking-wider block">
                  Categories
                </label>
                <div className="space-y-1 max-h-64 overflow-y-auto pr-1 scrollbar-thin">
                  {CATEGORIES.map((cat) => {
                    const isSelected = selectedCat === cat.id || selectedCat === cat.name || (selectedCat === 'all' && cat.id === 'all');
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCat(cat.id)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex justify-between items-center transition-all ${
                          isSelected
                            ? 'bg-[#0B2519] text-[#D4AF37] font-bold shadow-sm border border-[#D4AF37]/40'
                            : 'text-[#4A5D55] hover:bg-[#EAE4D7] hover:text-[#1C2B26]'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] opacity-70">({cat.count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-2 pt-2 border-t border-[#D4AF37]/20">
                <div className="flex justify-between items-center text-xs font-bold text-[#1C2B26]">
                  <span>Max Price</span>
                  <span className="text-[#B8860B] font-serif-luxury font-bold text-sm">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="3500"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#B8860B] cursor-pointer"
                />
              </div>

              {/* Stock Availability Filter */}
              <div className="space-y-2 pt-2 border-t border-[#D4AF37]/20">
                <label className="text-[11px] font-bold text-[#1C2B26] uppercase tracking-wider block">
                  Availability
                </label>
                <div className="grid grid-cols-3 gap-1 bg-[#FAF7F2] p-1 rounded-xl border border-[#D4AF37]/30 text-[10px]">
                  <button
                    onClick={() => setAvailabilityFilter('all')}
                    className={`py-1.5 rounded-lg font-bold transition-all ${
                      availabilityFilter === 'all' ? 'bg-[#0B2519] text-[#D4AF37]' : 'text-[#4A5D55]'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setAvailabilityFilter('inStock')}
                    className={`py-1.5 rounded-lg font-bold transition-all ${
                      availabilityFilter === 'inStock' ? 'bg-[#0B2519] text-[#D4AF37]' : 'text-[#4A5D55]'
                    }`}
                  >
                    In Stock
                  </button>
                  <button
                    onClick={() => setAvailabilityFilter('seasonal')}
                    className={`py-1.5 rounded-lg font-bold transition-all ${
                      availabilityFilter === 'seasonal' ? 'bg-[#0B2519] text-[#D4AF37]' : 'text-[#4A5D55]'
                    }`}
                  >
                    Seasonal
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Right Product Grid Area */}
          <div className="lg:col-span-9 space-y-6">

            {/* Results Header Counter */}
            <div className="flex justify-between items-center text-xs text-[#4A5D55] bg-[#F5F0E6] px-5 py-3 rounded-2xl border border-[#D4AF37]/20">
              <span>Showing <strong>{filteredProducts.length}</strong> items in Menu</span>
              <span className="font-bold text-[#B8860B] font-serif-luxury">Authentic Vindhyawasini Collection</span>
            </div>

            {/* Grid Container or Skeleton Loading */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <ProductSkeleton key={idx} />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              /* Polished No Sweets Found State */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#F5F0E6] p-12 rounded-3xl border-2 border-dashed border-[#D4AF37]/40 text-center space-y-4 shadow-sm"
              >
                <div className="w-16 h-16 rounded-3xl bg-[#0B2519]/10 border border-[#D4AF37]/40 mx-auto flex items-center justify-center text-[#B8860B]">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-xl font-bold text-[#1C2B26]">
                  No sweets found matching your search
                </h3>
                <p className="text-xs text-[#4A5D55] max-w-md mx-auto leading-relaxed">
                  We couldn't find any items matching your selected filters or search terms. Try expanding your search or explore our complete catalog.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-[#0B2519] text-[#D4AF37] hover:bg-[#153e2c] px-6 py-3 rounded-2xl text-xs font-bold shadow-md transition-all inline-flex items-center space-x-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset All Filters</span>
                </button>
              </motion.div>
            ) : (
              /* Product Grid with Framer Motion AnimatePresence */
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                <AnimatePresence>
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                      onSelectProduct={(p) => setActiveModalProduct(p)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

          </div>

        </div>

        {/* Custom Wedding & Celebration Banner */}
        <div className="bg-[#0B2519] p-8 sm:p-14 rounded-3xl border-2 border-[#D4AF37]/40 shadow-2xl relative overflow-hidden text-[#FDFBF7] space-y-8">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#D4AF37]/15 rounded-full blur-[150px] pointer-events-none" />

          <div className="text-center max-w-3xl mx-auto space-y-4 relative z-10">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold bg-[#D4AF37]/10 px-4 py-1.5 rounded-full border border-[#D4AF37]/30">
              CUSTOM WEDDING & CELEBRATION ORDERS
            </span>

            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#D4AF37]">
              Traditional Bihar Wedding Sweets
            </h2>

            <p className="text-xs sm:text-sm text-[#D4AF37]/80 leading-relaxed font-light">
              Explore authentic Tokri Laddu packing, ceremonial sweet hampers, royal brass gift baskets, and customized bulk orders for grand Bihar weddings and festive occasions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            <div className="bg-[#153e2c]/80 p-6 rounded-2xl border border-[#D4AF37]/25 space-y-3 text-center">
              <Gift className="w-8 h-8 text-[#D4AF37] mx-auto" />
              <h3 className="font-serif-luxury text-lg font-bold text-[#D4AF37]">Tokri Laddu Packing</h3>
              <p className="text-xs text-[#D4AF37]/70 leading-relaxed">
                Hand-woven bamboo & brass tokris filled with pure Desi Ghee Motichoor & Besan Laddus.
              </p>
            </div>

            <div className="bg-[#153e2c]/80 p-6 rounded-2xl border border-[#D4AF37]/25 space-y-3 text-center">
              <HeartHandshake className="w-8 h-8 text-[#D4AF37] mx-auto" />
              <h3 className="font-serif-luxury text-lg font-bold text-[#D4AF37]">Wedding Sweet Baskets</h3>
              <p className="text-xs text-[#D4AF37]/70 leading-relaxed">
                Customized assortments of Silao Khaja, Gaya Gud Tilkut, Kesaria Peda, and Royal Kaju Katli.
              </p>
            </div>

            <div className="bg-[#153e2c]/80 p-6 rounded-2xl border border-[#D4AF37]/25 space-y-3 text-center">
              <Sparkles className="w-8 h-8 text-[#D4AF37] mx-auto" />
              <h3 className="font-serif-luxury text-lg font-bold text-[#D4AF37]">Bulk Celebration Orders</h3>
              <p className="text-xs text-[#D4AF37]/70 leading-relaxed">
                Personalized branding, velvet gift boxes, and express city delivery for grand wedding receptions.
              </p>
            </div>
          </div>

          {/* Action WhatsApp & Call Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4 relative z-10">
            <a
              href={`https://wa.me/${CITY_DELIVERY_RULES.whatsAppOrderNumber}?text=Hello%20VINDHYAWASINI%20TILKUT%20BHANDAR!%20I%20would%20like%20to%20inquire%20about%20Custom%20Wedding%20Sweets%20and%20Tokri%20Laddu%20Orders.`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 border border-emerald-400/40 shadow-lg transition-transform active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquire via WhatsApp</span>
            </a>

            <a
              href={`tel:${CITY_DELIVERY_RULES.phoneSupport}`}
              className="bg-[#D4AF37] hover:bg-[#b89528] text-[#0B2519] px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-gold-glow transition-transform active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>Call for Wedding Orders</span>
            </a>
          </div>
        </div>

      </div>

      {/* Product Quick-View Modal */}
      {activeModalProduct && (
        <ProductModal
          product={activeModalProduct}
          onClose={() => setActiveModalProduct(null)}
        />
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-[#B8860B] font-serif-luxury text-lg">Loading Vindhyawasini Menu...</div>}>
      <ShopContent />
    </Suspense>
  );
}
