'use client';

import React from 'react';
import { Flame, Sparkles, ShieldCheck, Heart } from 'lucide-react';

export default function TraditionalRecipesPage() {
  return (
    <div className="min-h-screen bg-royal-greenDark text-royal-ivory py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-royal-gold font-bold bg-royal-gold/10 px-4 py-1.5 rounded-full border border-royal-gold/20">
            Heritage Techniques
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-royal-gold">
            Traditional Bihari Recipes & Quality
          </h1>
          <p className="text-royal-goldMuted/90 text-sm leading-relaxed font-light">
            Learn how we preserve ancient culinary methods from Gaya, Silao, and Deoghar.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-royal-green p-8 rounded-3xl border border-royal-gold/30 space-y-3">
            <h3 className="font-serif-luxury text-2xl font-bold text-royal-gold">Gaya Gud Tilkut Preparation</h3>
            <p className="text-xs text-royal-goldMuted/80 leading-relaxed font-light">
              Made by roasting selected white sesame seeds and thoroughly mixing with hot organic jaggery syrup. The dough is then hand-pounded in traditional wooden mortars (Okhli) to achieve its Signature airy crunch and rich aroma.
            </p>
          </div>

          <div className="bg-royal-green p-8 rounded-3xl border border-royal-gold/30 space-y-3">
            <h3 className="font-serif-luxury text-2xl font-bold text-royal-gold">Silao 64-Layer Khaja</h3>
            <p className="text-xs text-royal-goldMuted/80 leading-relaxed font-light">
              Flour dough is repeatedly rolled, layered with ghee and starch, and folded into 64 microscopic sheets before deep frying in pure ghee and dipping in light cardamom sugar syrup.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
