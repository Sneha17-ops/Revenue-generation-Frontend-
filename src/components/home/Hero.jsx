'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Crown, MapPin, Clock, Phone, MessageSquare } from 'lucide-react';
import { CITY_DELIVERY_RULES } from '../../data/products';

export const Hero = () => {
  return (
    <div className="relative min-h-[92vh] bg-royal-green text-royal-ivory overflow-hidden flex items-center">
      {/* Background Micro Texture & Glowing Crest Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-royal-gold/15 via-royal-green to-royal-greenDark" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-royal-gold/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-royal-gold/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Typography & Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-8 text-center lg:text-left"
          >
            
            {/* City Express Badge */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs uppercase tracking-[0.15em] text-royal-gold font-bold bg-royal-gold/10 px-4 py-2 rounded-full border border-royal-gold/30 backdrop-blur-md shadow-gold-glow">
              <MapPin className="w-4 h-4 text-royal-gold animate-bounce" />
              <span>City Limits Delivery</span>
              <span className="text-royal-gold/40">•</span>
              <span className="text-emerald-300">Same-Day Express</span>
              <span className="text-royal-gold/40">•</span>
              <span>Store Pickup</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              Traditional Culture of Bihar. <br />
              <span className="gold-text-gradient font-cinzel">Pure Luxury Confectionery.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-royal-goldMuted/90 text-base sm:text-lg max-w-2xl leading-relaxed font-light mx-auto lg:mx-0">
              India's most trusted premium sweets brand. Handcrafted with 100% A2 Cow Desi Ghee, Gaya organic jaggery, and centuries-old Bihari recipes. Delivering express within city limits.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link 
                href="/shop" 
                className="gold-btn w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold flex items-center justify-center space-x-3 shadow-gold-glow group"
              >
                <span>Explore Bihar Specials</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a 
                href={`https://wa.me/${CITY_DELIVERY_RULES.whatsAppOrderNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-700 hover:bg-emerald-600 text-white w-full sm:w-auto px-6 py-4 rounded-2xl text-sm font-bold flex items-center justify-center space-x-2 border border-emerald-400/40 shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Order</span>
              </a>

              <a 
                href={`tel:${CITY_DELIVERY_RULES.phoneSupport}`}
                className="bg-royal-greenLight/60 hover:bg-royal-gold hover:text-royal-green text-royal-gold w-full sm:w-auto px-6 py-4 rounded-2xl text-sm font-bold flex items-center justify-center space-x-2 border border-royal-gold/30 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call for Bulk Orders</span>
              </a>
            </div>

            {/* Key Trust Highlights Bar */}
            <div className="pt-8 border-t border-royal-gold/15 grid grid-cols-3 gap-4 text-left max-w-xl mx-auto lg:mx-0">
              <div>
                <div className="font-cinzel text-xl sm:text-2xl font-bold text-royal-gold">City Limits</div>
                <div className="text-[11px] text-royal-goldMuted/70 uppercase tracking-wider">Distance Based Fee</div>
              </div>
              <div>
                <div className="font-cinzel text-xl sm:text-2xl font-bold text-royal-gold">7 AM - 10 PM</div>
                <div className="text-[11px] text-royal-goldMuted/70 uppercase tracking-wider">Store Timings</div>
              </div>
              <div>
                <div className="font-cinzel text-xl sm:text-2xl font-bold text-royal-gold">100% A2 Ghee</div>
                <div className="text-[11px] text-royal-goldMuted/70 uppercase tracking-wider">Zero Adulteration</div>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Hero Visual Product Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 relative flex justify-center"
          >
            
            <div className="relative w-full max-w-md bg-gradient-to-tr from-royal-greenLight via-royal-green to-royal-greenDark p-6 rounded-3xl border-2 border-royal-gold/40 shadow-luxury space-y-6 group hover:border-royal-gold transition-all duration-500">
              
              {/* Product Showcase Image */}
              <div className="relative h-72 rounded-2xl overflow-hidden shadow-luxury">
                <img 
                  src="https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1000&auto=format&fit=crop" 
                  alt="Authentic Gud Tilkut" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-royal-greenDark/90 via-transparent to-transparent" />

                {/* Floating Badge */}
                <div className="absolute top-4 left-4 bg-royal-gold text-royal-green font-bold text-xs uppercase px-3 py-1 rounded-full shadow-md flex items-center space-x-1">
                  <Crown className="w-3.5 h-3.5" />
                  <span>Gaya Special Heritage</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-royal-ivory">
                  <h3 className="font-serif-luxury text-xl font-bold text-royal-gold">Authentic Gud Tilkut</h3>
                  <p className="text-xs text-royal-goldMuted/80">Hand-pounded in wooden mortars with organic jaggery</p>
                </div>
              </div>

              {/* Floating Interactive Info Card */}
              <div className="bg-royal-greenDark/90 p-4 rounded-2xl border border-royal-gold/30 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-royal-gold/20 flex items-center justify-center text-royal-gold">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-royal-ivory">Express Same-Day Delivery</h4>
                    <p className="text-[10px] text-royal-goldMuted">Fresh morning batch ready for city limits</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-royal-gold bg-royal-gold/15 px-2.5 py-1 rounded-lg">
                  ₹350 / 500g
                </span>
              </div>

            </div>

          </motion.div>

        </div>
      </div>
    </div>
  );
};
