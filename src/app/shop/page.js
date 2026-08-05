'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, Star, Heart, ShoppingBag, Search, Sparkles, Check, MessageSquare, Phone, Gift, HeartHandshake } from 'lucide-react';
import { PRODUCTS, CATEGORIES, CITY_DELIVERY_RULES } from '../../data/products';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCat, setSelectedCat] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState(3500);
  const [sugarFreeOnly, setSugarFreeOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { addToCart } = useCartStore();
  const { wishlist, toggleWishlist, isInWishlist } = useWishlistStore();

  useEffect(() => {
    const queryCat = searchParams.get('category');
    if (queryCat) {
      setSelectedCat(queryCat);
    }
  }, [searchParams]);

  // Robust category matching
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
    if (sugarFreeOnly && !p.sugarFree) return false;
    if (searchQuery.trim() !== '' && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 px-4 sm:px-6 lg:px-8 text-[#1C2B26]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Page Header */}
        <div className="bg-[#0B2519] p-8 sm:p-12 rounded-3xl border-2 border-[#D4AF37]/30 shadow-2xl relative overflow-hidden text-[#FDFBF7]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">Traditional Bihari Catalog</span>
            <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#D4AF37]">
              Our Complete Sweet Menu
            </h1>
            <p className="text-[#D4AF37]/80 text-sm">
              Handcrafted pure A2 Gir cow ghee sweets, Gaya Tilkut, Silao Khaja, Launglatta, and authentic Bihar savories.
            </p>
          </div>
        </div>

        {/* Filter & Catalog Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Filter Panel */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-[#F5F0E6] p-6 rounded-3xl border border-[#D4AF37]/30 shadow-md space-y-6">
              
              <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-3">
                <h3 className="font-serif-luxury font-bold text-base text-[#1C2B26] flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-[#B8860B]" />
                  <span>Filter Menu</span>
                </h3>
                <button 
                  onClick={() => {
                    setSelectedCat('all');
                    setMaxPrice(3500);
                    setSugarFreeOnly(false);
                    setSearchQuery('');
                  }}
                  className="text-[11px] text-[#B8860B] font-bold hover:underline"
                >
                  Reset All
                </button>
              </div>

              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#B8860B] absolute left-3 top-3" />
                <input 
                  type="text"
                  placeholder="Search in menu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#FAF7F2] border border-[#D4AF37]/30 rounded-xl text-xs text-[#1C2B26] focus:outline-none focus:border-[#B8860B]"
                />
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#1C2B26] uppercase tracking-wider block">Categories</label>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => {
                    const isSelected = selectedCat === cat.id || selectedCat === cat.name || (selectedCat === 'all' && cat.id === 'all');
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCat(cat.id)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex justify-between items-center transition-all ${
                          isSelected
                            ? 'bg-[#0B2519] text-[#D4AF37] font-bold shadow-sm' 
                            : 'text-[#4A5D55] hover:bg-[#EAE4D7]'
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
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-[#1C2B26]">
                  <span>Max Price</span>
                  <span className="text-[#B8860B]">₹{maxPrice}</span>
                </div>
                <input 
                  type="range"
                  min="200"
                  max="3500"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#B8860B] cursor-pointer"
                />
              </div>

            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-9 space-y-6">
            
            <div className="flex justify-between items-center text-xs text-[#4A5D55]">
              <span>Showing <strong>{filteredProducts.length}</strong> items</span>
              <span className="font-bold text-[#B8860B]">Authentic Bihar Menu</span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-[#F5F0E6] p-12 rounded-3xl border border-[#D4AF37]/20 text-center space-y-3">
                <Sparkles className="w-8 h-8 text-[#B8860B]/40 mx-auto" />
                <h3 className="font-serif-luxury text-lg font-bold text-[#1C2B26]">No items match your search</h3>
                <p className="text-xs text-[#4A5D55] max-w-sm mx-auto">
                  Try adjusting your filters or search query to explore our complete selection of traditional Bihar sweets.
                </p>
                <button 
                  onClick={() => {
                    setSelectedCat('all');
                    setMaxPrice(3500);
                    setSugarFreeOnly(false);
                    setSearchQuery('');
                  }}
                  className="bg-[#0B2519] text-[#D4AF37] px-6 py-2.5 rounded-xl text-xs font-bold mt-2 shadow-md"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const isLiked = isInWishlist(product.id);
                  return (
                    <div 
                      key={product.id}
                      className="bg-[#F5F0E6] rounded-3xl border border-[#D4AF37]/25 overflow-hidden hover:border-[#B8860B] shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
                    >
                      
                      <div className="relative h-56 overflow-hidden bg-[#EAE4D7]">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        
                        <span className="absolute top-3 left-3 text-[10px] uppercase font-bold text-[#FDFBF7] bg-[#0B2519] px-2.5 py-0.5 rounded-full shadow border border-[#D4AF37]/30">
                          {product.badge || 'Bihari Heritage'}
                        </span>

                        {product.isPendingAdminImage && (
                          <span className="absolute bottom-3 left-3 text-[9px] uppercase font-bold text-amber-200 bg-amber-950/90 px-2 py-0.5 rounded border border-amber-500/40">
                            Pending Admin Replacement
                          </span>
                        )}

                        <button 
                          onClick={() => toggleWishlist(product)}
                          className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
                            isLiked ? 'bg-rose-600 text-white' : 'bg-black/50 text-[#FDFBF7] hover:text-white'
                          }`}
                        >
                          <Heart className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>

                      <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center text-[11px] text-[#4A5D55] mb-1">
                            <span>{product.category}</span>
                            <span className="flex items-center text-[#B8860B] font-bold">★ {product.rating || '4.9'}</span>
                          </div>

                          <h3 className="font-serif-luxury font-bold text-base text-[#1C2B26] group-hover:text-[#B8860B] transition-colors">
                            {product.name}
                          </h3>

                          <p className="text-[#4A5D55] text-xs line-clamp-2 mt-1 font-light">
                            {product.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#D4AF37]/20 flex justify-between items-center">
                          <div>
                            <span className="font-bold text-base text-[#1C2B26]">₹{product.price} <span className="text-[10px] text-[#4A5D55] font-normal">{product.unit}</span></span>
                          </div>

                          <button 
                            onClick={() => addToCart(product)}
                            className="bg-[#0B2519] text-[#D4AF37] hover:bg-[#153e2c] px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md transition-all"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>

        {/* ---------------------------------------------------- */}
        {/* REPLACEMENT: WEDDING ORDERS SECTION                  */}
        {/* ---------------------------------------------------- */}
        <div className="bg-[#0B2519] p-8 sm:p-14 rounded-3xl border-2 border-[#D4AF37]/40 shadow-2xl relative overflow-hidden text-[#FDFBF7] space-y-8">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-[140px] pointer-events-none" />

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
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 border border-emerald-400/40 shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquire via WhatsApp</span>
            </a>

            <a 
              href={`tel:${CITY_DELIVERY_RULES.phoneSupport}`}
              className="bg-[#D4AF37] hover:bg-[#b89528] text-[#0B2519] px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-gold-glow"
            >
              <Phone className="w-4 h-4" />
              <span>Call for Wedding Orders</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-[#B8860B]">Loading Royal Menu...</div>}>
      <ShopContent />
    </Suspense>
  );
}
