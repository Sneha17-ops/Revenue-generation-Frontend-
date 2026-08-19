'use client';

import React from 'react';
import { Hero } from '../components/home/Hero';
import { CategoryShowcase } from '../components/home/CategoryShowcase';
import { BestSellers } from '../components/home/BestSellers';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { TestimonialsMarquee } from '../components/home/TestimonialsMarquee';
import { 
  TodaysFreshCollection, 
  TraditionalBiharSpecials, 
  SeasonalSpecials, 
  FAQSection 
} from '../components/home/HomeSections';
import HeritageBackground from '../components/ui/HeritageBackground';
import SectionDivider from '../components/ui/SectionDivider';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#0B3D2E] selection:bg-[#D4AF37]/30 selection:text-[#0B3D2E]">
      
      {/* Global Heritage Watermark & Parallax Line Art Background */}
      <HeritageBackground />

      {/* Main Content Sections */}
      <div className="relative z-10 space-y-0">
        
        {/* 1. Hero / Fresh Sweets Section */}
        <Hero />

        <SectionDivider />

        {/* 2. Today's Fresh Collection */}
        <TodaysFreshCollection />

        <SectionDivider />

        {/* 3. Heritage Category Showcase Carousel */}
        <CategoryShowcase />

        <SectionDivider />

        {/* 4. Traditional Bihar Specials */}
        <TraditionalBiharSpecials />

        <SectionDivider />

        {/* 5. Best Sellers */}
        <BestSellers />

        <SectionDivider />

        {/* 6. Why Choose Us */}
        <WhyChooseUs />

        <SectionDivider />

        {/* 7. Seasonal Specials */}
        <SeasonalSpecials />

        <SectionDivider />

        {/* 8. Testimonials */}
        <TestimonialsMarquee />

        <SectionDivider />

        {/* 9. FAQ Section */}
        <FAQSection />

      </div>
    </div>
  );
}
