'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Crown, 
  Flame, 
  Clock, 
  ShieldCheck, 
  Truck, 
  ShoppingBag, 
  ChevronDown, 
  ChevronUp, 
  Star,
  MapPin,
  CheckCircle2,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { PRODUCTS, CITY_DELIVERY_RULES } from '../../data/products';
import { useCartStore } from '../../store/useCartStore';

// 1. TODAY'S FRESH BATCH COLLECTION
export const TodaysFreshCollection = () => {
  const { addToCart } = useCartStore();
  const freshItems = PRODUCTS.filter(p => p.todayFresh).slice(0, 4);

  return (
    <section className="py-20 bg-royal-green text-royal-ivory border-t border-royal-gold/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-amber-300 font-bold bg-amber-400/10 px-3.5 py-1 rounded-full border border-amber-400/30 mb-2">
              <Clock className="w-3.5 h-3.5" />
              <span>Prepared Morning 6:00 AM Batch</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-royal-ivory">
              Today's Fresh <span className="gold-text-gradient font-cinzel">Hot Confections</span>
            </h2>
          </div>

          <Link href="/shop" className="gold-btn px-6 py-2.5 rounded-xl text-xs font-bold shrink-0">
            View All Fresh Items
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {freshItems.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-royal-greenDark rounded-3xl border border-royal-gold/30 overflow-hidden flex flex-col justify-between group hover:border-royal-gold transition-all duration-500 shadow-luxury"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <span className="absolute top-3 left-3 bg-emerald-500 text-royal-greenDark font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-full shadow">
                    Fresh Batch Today
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-royal-gold tracking-widest">{product.category}</span>
                  <h3 className="font-serif-luxury text-lg font-bold text-royal-ivory line-clamp-1">{product.name}</h3>
                  <p className="text-xs text-royal-goldMuted/70 line-clamp-2 font-light">{product.description}</p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between border-t border-royal-gold/15 mt-3">
                <div>
                  <span className="font-serif-luxury text-xl font-bold text-royal-gold">₹{product.price}</span>
                  <span className="text-[10px] text-royal-goldMuted/60 block">{product.unit}</span>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="gold-btn px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

// 2. TRADITIONAL BIHAR SPECIALS
export const TraditionalBiharSpecials = () => {
  const { addToCart } = useCartStore();
  const biharSpecials = PRODUCTS.filter(p => p.biharSpecial).slice(0, 4);

  return (
    <section className="py-20 bg-royal-greenDark text-royal-ivory border-t border-royal-gold/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-royal-gold font-bold bg-royal-gold/10 px-4 py-1.5 rounded-full border border-royal-gold/20">
            Heritage Recipes of Gaya & Silao
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-royal-ivory">
            Traditional <span className="gold-text-gradient font-cinzel">Bihar Heritage Specials</span>
          </h2>
          <p className="text-royal-goldMuted/80 text-sm font-light">
            Authentic regional delicacies made strictly according to ancient techniques.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {biharSpecials.map((product) => (
            <div key={product.id} className="bg-royal-green rounded-3xl border border-royal-gold/30 p-5 space-y-4 shadow-luxury flex flex-col justify-between">
              <div className="space-y-3">
                <div className="relative h-48 rounded-2xl overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-royal-gold text-royal-green font-bold text-[9px] uppercase px-2 py-0.5 rounded-full">
                    Authentic Bihar
                  </span>
                </div>
                <div>
                  <h3 className="font-serif-luxury font-bold text-base text-royal-gold">{product.name}</h3>
                  <p className="text-xs text-royal-goldMuted/80 line-clamp-2 mt-1">{product.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-royal-gold/15 pt-3">
                <span className="font-bold text-royal-ivory text-sm">₹{product.price} / {product.unit}</span>
                <button 
                  onClick={() => addToCart(product)} 
                  className="emerald-btn px-3.5 py-1.5 rounded-lg text-xs font-bold"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// 3. SEASONAL SPECIALS (WITH WINTER BADGE NOTICE)
export const SeasonalSpecials = () => {
  const { addToCart } = useCartStore();
  const seasonalItems = PRODUCTS.filter(p => p.season === 'Winter' || p.seasonNotice).slice(0, 4);

  return (
    <section className="py-20 bg-royal-green text-royal-ivory border-t border-royal-gold/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-royal-gold font-bold bg-royal-gold/10 px-3.5 py-1 rounded-full border border-royal-gold/20 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Limited Batch Harvest</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-royal-ivory">
              Seasonal & Winter <span className="gold-text-gradient font-cinzel">Exclusive Collection</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasonalItems.map((product) => (
            <div key={product.id} className="bg-royal-greenDark rounded-3xl border border-royal-gold/30 p-5 space-y-4 shadow-luxury flex flex-col justify-between">
              <div className="space-y-3">
                <div className="relative h-48 rounded-2xl overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-amber-400 text-royal-greenDark font-extrabold text-[9px] uppercase px-2.5 py-1 rounded-full shadow">
                    {product.seasonNotice || 'Available Only During Winter'}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif-luxury font-bold text-base text-royal-gold">{product.name}</h3>
                  <p className="text-xs text-royal-goldMuted/80 line-clamp-2 mt-1">{product.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-royal-gold/15 pt-3">
                <span className="font-bold text-royal-ivory text-sm">₹{product.price} / {product.unit}</span>
                <button 
                  onClick={() => addToCart(product)} 
                  className="gold-btn px-3.5 py-1.5 rounded-lg text-xs font-bold"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// 4. FAQ ACCORDION SECTION
export const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(0);

  const FAQS = [
    {
      q: "Do you deliver pan-India or internationally?",
      a: "No. Bindhyawasini currently operates on a city-limits-only express delivery model to guarantee maximum freshness of our pure A2 ghee sweets. We do not provide international shipping."
    },
    {
      q: "How are city delivery charges calculated?",
      a: "Delivery charges are based on distance from our flagship kitchen: Base fee ₹40 for up to 3 km, and ₹10/km for additional distance. Orders above ₹999 receive FREE express delivery!"
    },
    {
      q: "Can I pick up my order directly from the store?",
      a: "Yes! You can choose 'Store Pickup' at checkout to pick up hot, fresh packages from our store during opening hours (7:00 AM – 10:00 PM) at zero charge."
    },
    {
      q: "How do I place bulk orders for weddings and corporate events?",
      a: "For custom wedding boxes and bulk orders, click the 'WhatsApp Order' or 'Call for Bulk Orders' buttons to connect directly with our catering team."
    }
  ];

  return (
    <section className="py-20 bg-royal-greenDark text-royal-ivory border-t border-royal-gold/15">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-royal-gold font-bold bg-royal-gold/10 px-4 py-1.5 rounded-full border border-royal-gold/20">
            Frequently Asked Questions
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-royal-ivory">
            City Delivery & Store <span className="gold-text-gradient font-cinzel">Information</span>
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="bg-royal-green rounded-2xl border border-royal-gold/30 overflow-hidden">
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-5 text-left flex justify-between items-center font-serif-luxury font-bold text-sm sm:text-base text-royal-gold"
              >
                <span>{faq.q}</span>
                {openIdx === idx ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
              </button>
              
              {openIdx === idx && (
                <div className="px-5 pb-5 text-xs text-royal-goldMuted/80 font-light border-t border-royal-gold/10 pt-3 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
