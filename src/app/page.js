'use client';

import React from 'react';
import { Hero } from '../components/home/Hero';
import { CategoryShowcase } from '../components/home/CategoryShowcase';
import { BestSellers } from '../components/home/BestSellers';
import { HeritageStory } from '../components/home/HeritageStory';
import { 
  TodaysFreshCollection, 
  TraditionalBiharSpecials, 
  SeasonalSpecials, 
  FAQSection 
} from '../components/home/HomeSections';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C2B26]">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Today's Fresh Collection */}
      <TodaysFreshCollection />

      {/* 3. Traditional Bihar Specials */}
      <TraditionalBiharSpecials />

      {/* 4. Category Showcase */}
      <CategoryShowcase />

      {/* 5. Best Sellers */}
      <BestSellers />

      {/* 6. Seasonal Specials */}
      <SeasonalSpecials />

      {/* 7. Heritage Story */}
      <HeritageStory />

      {/* 8. FAQ Section */}
      <FAQSection />
    </div>
  );
}
