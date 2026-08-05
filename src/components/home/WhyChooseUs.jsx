import React from 'react';
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
    <section className="py-20 bg-royal-ivory relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-royal-goldDark font-bold">
            The VINDHYAWASINI TILKUT BHANDAR Difference
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-royal-green">
            Why Discerning Connoisseurs Choose Us
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Where four decades of Indian sweet-making heritage meet modern cold-chain precision and luxury aesthetics.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="p-8 bg-white rounded-3xl border border-royal-gold/25 hover:border-royal-gold shadow-sm hover:shadow-luxury transition-all duration-300 group space-y-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-royal-gold/10 border border-royal-gold/30 flex items-center justify-center text-royal-goldDark group-hover:bg-royal-gold group-hover:text-royal-green transition-all duration-300">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-serif-luxury text-lg font-bold text-royal-green group-hover:text-royal-goldDark transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
