'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Crown, MapPin, Phone, MessageSquare, Sparkles } from 'lucide-react';
import { CITY_DELIVERY_RULES } from '../../data/products';

export const Hero = () => {
  // Line animation variants for staggered heading blur reveal
  const headingContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const lineVariants = {
    hidden: { 
      opacity: 0, 
      y: 25, 
      filter: 'blur(8px)' 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { 
        duration: 1, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
  };

  const buttonGroupVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        delay: 0.7, 
        ease: "easeOut" 
      } 
    },
  };

  return (
    <section className="relative min-h-[90vh] bg-[#FAF7F2] text-[#0B3D2E] overflow-hidden flex items-center py-12 lg:py-20">
      
      {/* Subtle Warm Luxury Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2] via-[#F5EFE6] to-[#FAF7F2] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-radial from-[#D4AF37]/10 via-[#FAF7F2]/0 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-radial from-[#D4AF37]/8 via-[#FAF7F2]/0 to-transparent blur-[120px] pointer-events-none" />

      {/* Heritage Bihari Line Art Decorations (Temple Outlines & Madhubani Corner Motifs) */}
      <svg className="absolute top-6 left-6 w-32 h-32 text-[#D4AF37]/20 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
        {/* Madhubani Lotus Corner Motif */}
        <circle cx="20" cy="20" r="16" strokeDasharray="2 3" />
        <path d="M 20,4 C 28,12 28,28 20,36 C 12,28 12,12 20,4 Z" fill="currentColor" fillOpacity="0.1" />
        <path d="M 4,20 C 12,28 28,28 36,20 C 28,12 12,12 4,20 Z" fill="currentColor" fillOpacity="0.1" />
        <path d="M 20,0 L 20,40 M 0,20 L 40,20" strokeWidth="0.5" />
      </svg>

      <svg className="absolute bottom-8 right-8 w-44 h-44 text-[#D4AF37]/15 pointer-events-none" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1">
        {/* Temple Spire Outline Accent */}
        <path d="M 100,10 L 125,50 L 115,50 L 135,90 L 125,90 L 150,140 L 50,140 L 75,90 L 65,90 L 85,50 L 75,50 Z" />
        <line x1="100" y1="140" x2="100" y2="190" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="100" cy="165" r="15" />
        <path d="M 85,165 C 100,150 100,180 115,165" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Hero Typography & Call to Actions */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Express Delivery & Origin Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs uppercase tracking-[0.18em] text-[#0B3D2E] font-bold bg-[#FFFFFF] px-4 py-2 rounded-full border border-[#D4AF37]/40 shadow-sm"
            >
              <span className="flex items-center space-x-1.5 text-[#D4AF37]">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-[#0B3D2E]">VINDHYAWASINI TILKUT BHANDAR</span>
              </span>
              <span className="text-[#D4AF37]">•</span>
              <span className="flex items-center space-x-1 text-[#0B3D2E]/80 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Express City Delivery</span>
              </span>
            </motion.div>

            {/* Main Headline: Staggered Blur Reveal */}
            <motion.div
              variants={headingContainerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <motion.h1 
                variants={lineVariants}
                className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-[#0B3D2E]"
              >
                Traditional Culture of Bihar.
              </motion.h1>

              <motion.div 
                variants={lineVariants}
                className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight"
              >
                <span className="gold-shimmer-text font-cinzel drop-shadow-sm">
                  Pure Luxury Confectionery.
                </span>
              </motion.div>
            </motion.div>

            {/* Paragraph Subtitle: Fade In from Bottom with 0.5s Delay */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="text-[#0B3D2E]/85 text-base sm:text-lg max-w-2xl leading-relaxed font-normal mx-auto lg:mx-0"
            >
              India's most trusted premium sweets brand. Handcrafted with 100% A2 Cow Desi Ghee, Gaya organic jaggery, and centuries-old Bihari karigar recipes. Express same-day delivery strictly within city limits.
            </motion.p>

            {/* Call To Action Buttons: Scale reveal, hover lift & smooth golden glow */}
            <motion.div 
              variants={buttonGroupVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              {/* Primary CTA: Gold background with Dark Green text */}
              <Link 
                href="/shop" 
                className="gold-btn w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold flex items-center justify-center space-x-3 shadow-gold-glow group hover:-translate-y-1 transition-all duration-300"
              >
                <span className="uppercase tracking-wider">Explore Bihar Specials</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Secondary CTA: Dark Green background with White text */}
              <a 
                href={`https://wa.me/${CITY_DELIVERY_RULES.whatsAppOrderNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="forest-btn w-full sm:w-auto px-6 py-4 rounded-2xl text-sm font-bold flex items-center justify-center space-x-2 transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                <span className="uppercase tracking-wider">WhatsApp Order</span>
              </a>

              {/* Call for Bulk Orders */}
              <a 
                href={`tel:${CITY_DELIVERY_RULES.phoneSupport}`}
                className="bg-[#FFFFFF] hover:bg-[#F5EFE6] text-[#0B3D2E] w-full sm:w-auto px-6 py-4 rounded-2xl text-sm font-bold flex items-center justify-center space-x-2 border border-[#D4AF37]/30 shadow-sm hover:border-[#D4AF37] hover:-translate-y-0.5 transition-all duration-300"
              >
                <Phone className="w-4 h-4 text-[#0B3D2E]" />
                <span className="uppercase tracking-wider">Bulk Orders</span>
              </a>
            </motion.div>

            {/* Key Trust Highlights Bar */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="pt-8 border-t border-[#D4AF37]/25 grid grid-cols-3 gap-4 text-left max-w-xl mx-auto lg:mx-0"
            >
              <div>
                <div className="font-cinzel text-xl sm:text-2xl font-bold text-[#0B3D2E]">City Limits</div>
                <div className="text-[11px] text-[#0B3D2E]/70 uppercase tracking-wider font-medium">Same-Day Express</div>
              </div>
              <div>
                <div className="font-cinzel text-xl sm:text-2xl font-bold text-[#0B3D2E]">7 AM - 10 PM</div>
                <div className="text-[11px] text-[#0B3D2E]/70 uppercase tracking-wider font-medium">Store Timings</div>
              </div>
              <div>
                <div className="font-cinzel text-xl sm:text-2xl font-bold text-[#0B3D2E]">100% A2 Ghee</div>
                <div className="text-[11px] text-[#0B3D2E]/70 uppercase tracking-wider font-medium">Zero Adulteration</div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Hero Visual Sweets Showcase Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center"
          >
            
            {/* Outer Decorative Floating Ring */}
            <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-tr from-[#D4AF37]/30 via-transparent to-[#0B3D2E]/10 blur-xl opacity-70 pointer-events-none" />

            {/* Sweets Image Card with Soft Glassmorphism Border & Golden Outline */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
              className="relative w-full max-w-md bg-[#FFFFFF] p-5 rounded-[28px] border-2 border-[#D4AF37]/50 shadow-[0_25px_50px_-12px_rgba(11,61,46,0.15)] group hover:border-[#D4AF37] hover:scale-[1.03] hover:shadow-[0_35px_70px_-15px_rgba(212,175,55,0.35)] transition-all duration-500"
            >
              
              {/* Product Showcase Image */}
              <div className="relative h-80 sm:h-96 rounded-[20px] overflow-hidden shadow-inner">
                <img 
                  src="/assets/MP6.jpeg" 
                  alt="VINDHYAWASINI TILKUT BHANDAR Heritage Sweets" 
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#06241B]/90 via-transparent to-transparent" />

                {/* Top Crown Royal Heritage Badge */}
                <div className="absolute top-4 left-4 bg-[#D4AF37] text-[#06241B] font-bold text-xs uppercase px-3.5 py-1.5 rounded-full shadow-lg flex items-center space-x-1.5">
                  <Crown className="w-4 h-4 text-[#06241B]" />
                  <span className="tracking-wider">Gaya Special Heritage</span>
                </div>

                {/* Bottom Overlay Info on Card */}
                <div className="absolute bottom-5 left-5 right-5 text-[#FAF7F2] space-y-1">
                  <h3 className="font-serif-luxury text-xl font-bold text-[#F3E5AB]">
                    VINDHYAWASINI TILKUT BHANDAR
                  </h3>
                  <p className="text-xs text-[#FAF7F2]/80 font-light">
                    Hand-pounded Gaya Tilkut & Silao Khaja prepared daily in pure A2 Desi Ghee
                  </p>
                </div>
              </div>

              {/* Bottom Subtle Badge Bar */}
              <div className="pt-4 flex items-center justify-between text-xs text-[#0B3D2E] font-semibold px-1">
                <span className="flex items-center space-x-1.5 text-[#0B3D2E]">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Authentic Bihari Taste</span>
                </span>
                <span className="text-[#D4AF37] font-bold">Royal Quality Guarantee</span>
              </div>

            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
