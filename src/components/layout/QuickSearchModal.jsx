'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, Sparkles, Flame } from 'lucide-react';
import { PRODUCTS } from '../../data/products';

export const QuickSearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  if (!isOpen) return null;

  const results = query.trim() 
    ? PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        (p.ingredients && p.ingredients.some(ing => ing.toLowerCase().includes(query.toLowerCase())))
      )
    : [];

  const handleSelectProduct = (product) => {
    onClose();
    router.push(`/shop?category=${encodeURIComponent(product.category)}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-royal-greenDark border border-royal-gold/40 rounded-2xl shadow-luxury overflow-hidden">
        
        {/* Search Bar Input */}
        <div className="p-4 border-b border-royal-gold/20 flex items-center space-x-3 bg-royal-green">
          <Search className="w-5 h-5 text-royal-gold shrink-0" />
          <input 
            type="text"
            autoFocus
            placeholder="Search Bihari sweets, Gaya Tilkut, Silao Khaja, Launglatta..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-royal-ivory placeholder-royal-goldMuted/40 focus:outline-none text-sm font-medium"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-royal-goldMuted hover:text-royal-gold">
              <X className="w-4 h-4" />
            </button>
          )}
          <button onClick={onClose} className="text-xs font-bold text-royal-gold px-2 py-1 bg-royal-gold/10 rounded-lg border border-royal-gold/20">
            ESC
          </button>
        </div>

        {/* Results / Suggestions Container */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
          {!query.trim() ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-xs font-bold text-royal-gold uppercase tracking-wider">
                <Flame className="w-4 h-4" />
                <span>Popular Bihari Searches</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {['Authentic Gud Tilkut', 'Silao Khaja', 'Deoghar Peda', 'Launglatta', 'Patla Anarsa', 'Suryamukhi Peda'].map((term) => (
                  <button 
                    key={term}
                    onClick={() => setQuery(term)}
                    className="bg-royal-green border border-royal-gold/20 hover:border-royal-gold text-royal-goldMuted hover:text-royal-gold px-3 py-1.5 rounded-full transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-8 text-royal-goldMuted text-xs">
              No matching Bihari sweets found for "{query}". Try searching "Tilkut" or "Khaja".
            </div>
          ) : (
            <div className="space-y-3">
              {results.map((product) => (
                <div 
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className="flex items-center justify-between p-3 rounded-xl bg-royal-green/60 hover:bg-royal-green border border-royal-gold/20 hover:border-royal-gold cursor-pointer transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover border border-royal-gold/20" />
                    <div>
                      <h4 className="font-serif-luxury font-bold text-sm text-royal-ivory">{product.name}</h4>
                      <span className="text-[10px] text-royal-goldMuted uppercase">{product.category}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-royal-gold text-sm">₹{product.price}</span>
                    <span className="text-[10px] text-royal-goldMuted block">{product.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
