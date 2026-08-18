'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Flame, Truck, Package, Heart } from 'lucide-react';

export const WhyChooseUs = () => {
  const FEATURES = [
    {
      icon: ShieldCheck,
      title: "100% Pure A2 Cow Ghee",
      description: "Crafted exclusively using churned A2 Gir cow ghee for authentic aroma, digestibility, and royal taste."
    },
    {
      icon: Flame,
      title: "Authentic Gaya Tilkut",
      description: "Hand-pounded roasted sesame and organic palm jaggery prepared in traditional wooden mortars."
    },
    {
      icon: Award,
      title: "99.9% Certified Silver Vark",
      description: "Decorated only with vegetarian 99.9% pure edible silver leaves verified by food safety labs."
    },
    {
      icon: Truck,
      title: "Cold-Chain Express Logistics",
      description: "Temperature-controlled vacuum packaging delivered within 2-4 hours locally & express worldwide."
    },
    {
      icon: Package,
      title: "Bespoke Royal Packaging",
      description: "Brass-embossed velvet trunks and gold tin boxes designed for unforgettable luxury gifting."
    },
    {
      icon: Heart,
      title: "0% Preservatives & Fresh Daily",
      description: "Made in small artisanal batches daily with zero chemical additives or artificial food coloring."
    }
  ];

  return (
    <section className="py-20 bg-[#FAF7F2] text-[#0B3D2E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#0B3D2E] font-bold bg-[#FFFFFF] px-4 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-xs">
            The VINDHYAWASINI TILKUT BHANDAR Difference
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B3D2E]">
            Why Connoisseurs <span className="gold-text-gradient font-cinzel">Choose Us</span>
          </h2>
          <p className="text-[#0B3D2E]/80 text-sm sm:text-base font-light">
            Where three decades of Indian sweet-making heritage meet modern cold-chain precision and luxury aesthetics.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-8 bg-[#FFFFFF] rounded-[24px] border border-[#D4AF37]/35 hover:border-[#D4AF37] shadow-sm hover:shadow-[0_20px_40px_-10px_rgba(212,175,55,0.22)] hover:-translate-y-1 transition-all duration-300 group space-y-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#FAF7F2] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#0B3D2E] group-hover:text-[#D4AF37] transition-all duration-300 shadow-xs">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-serif-luxury text-lg font-bold text-[#0B3D2E] group-hover:text-[#D4AF37] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-[#0B3D2E]/75 text-xs sm:text-sm leading-relaxed font-light">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
