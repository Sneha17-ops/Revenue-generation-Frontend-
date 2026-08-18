'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle, Crown } from 'lucide-react';

export const TestimonialsMarquee = () => {
  const REVIEWS = [
    {
      name: "Radhika Singhania",
      role: "Industrialist & VIP Buyer",
      location: "Mumbai",
      text: "The Silver Kaju Katli and Gaya Tilkut hampers were absolute showstoppers for our corporate partners. Pure A2 ghee taste is unmatched!",
      rating: 5,
      date: "Verified Buyer"
    },
    {
      name: "Dr. Ananya Roy",
      role: "Health Professional",
      location: "Kolkata",
      text: "The Gud Tilkut and Anarsa are a blessing! Pure natural ingredients with authentic organic jaggery. VINDHYAWASINI TILKUT BHANDAR is pure luxury.",
      rating: 5,
      date: "Verified Buyer"
    },
    {
      name: "Vikramjit Singh",
      role: "Hotelier",
      location: "New Delhi",
      text: "The Authentic Gaya Gud Tilkut brings back childhood memories. Crisp, perfectly sweet, and delivered express within city limits!",
      rating: 5,
      date: "Verified Buyer"
    }
  ];

  return (
    <section className="py-20 bg-[#FAF7F2] text-[#0B3D2E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#0B3D2E] font-bold bg-[#FFFFFF] px-4 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-xs">
            Patron Testimonials
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B3D2E]">
            Loved by Thousands <span className="gold-text-gradient font-cinzel">Across India</span>
          </h2>
          <p className="text-[#0B3D2E]/80 text-sm font-light">
            Read authentic reviews from our esteemed patrons and confectionery connoisseurs.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#FFFFFF] p-8 rounded-[24px] border border-[#D4AF37]/35 shadow-sm hover:shadow-[0_20px_40px_-10px_rgba(212,175,55,0.22)] hover:-translate-y-1 transition-all duration-300 space-y-4 relative flex flex-col justify-between group"
            >
              <Quote className="w-10 h-10 text-[#D4AF37]/20 absolute top-6 right-6 group-hover:text-[#D4AF37]/35 transition-colors" />

              <div className="space-y-3">
                <div className="flex text-[#D4AF37] space-x-1">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-[#0B3D2E]/85 text-sm leading-relaxed italic font-light">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between">
                <div>
                  <h4 className="font-serif-luxury font-bold text-sm text-[#0B3D2E] group-hover:text-[#D4AF37] transition-colors">{rev.name}</h4>
                  <p className="text-[11px] text-[#0B3D2E]/60 font-medium">{rev.role} • {rev.location}</p>
                </div>
                <span className="text-[10px] text-[#0B3D2E] font-bold bg-[#FAF7F2] px-2.5 py-1 rounded-full border border-[#D4AF37]/30 flex items-center space-x-1">
                  <CheckCircle className="w-3 h-3 text-[#D4AF37]" />
                  <span>{rev.date}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsMarquee;
