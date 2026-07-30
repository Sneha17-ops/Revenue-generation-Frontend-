'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Crown, 
  Send, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  ShieldCheck, 
  Truck, 
  Clock,
  MessageSquare,
  Lock
} from 'lucide-react';
import { CITY_DELIVERY_RULES } from '../../data/products';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-royal-greenDark text-royal-ivory border-t border-royal-gold/20 pt-16 pb-8 relative overflow-hidden">
      {/* Background Decorative Crest Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-royal-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* City Express Banner Notice */}
        <div className="bg-gradient-to-r from-royal-greenLight via-royal-green to-royal-greenDark p-6 sm:p-10 rounded-2xl border border-royal-gold/30 shadow-luxury mb-16 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <div className="inline-flex items-center space-x-2 text-royal-gold text-xs tracking-widest uppercase font-bold bg-royal-gold/10 px-3 py-1 rounded-full border border-royal-gold/20">
                <MapPin className="w-3.5 h-3.5" />
                <span>City Limits Delivery & Local Store Pickup</span>
              </div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-royal-gold">
                Fresh Sweets Delivered Express Within City Limits
              </h3>
              <p className="text-royal-goldMuted/80 text-sm max-w-2xl">
                We deliver fresh, pure desi ghee Bihari delicacies same-day strictly within city limits. Distance-based delivery charges apply. Store pickup option available at zero charge.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a 
                href={`https://wa.me/${CITY_DELIVERY_RULES.whatsAppOrderNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3 rounded-xl flex items-center justify-center space-x-2 text-sm transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Instant Order</span>
              </a>

              <a 
                href={`tel:${CITY_DELIVERY_RULES.phoneSupport}`}
                className="gold-btn px-5 py-3 rounded-xl flex items-center justify-center space-x-2 text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Call for Bulk / Wedding Orders</span>
              </a>
            </div>
          </div>
        </div>

        {/* Core Footer Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <img src="/logo.svg" alt="Bindhyawasini" className="w-10 h-10" />
              <div>
                <h4 className="font-cinzel text-xl font-bold tracking-wider text-royal-gold">BINDHYAWASINI</h4>
                <p className="text-[10px] tracking-[0.25em] text-royal-goldMuted uppercase">Traditional Bihari Sweets</p>
              </div>
            </div>
            <p className="text-royal-goldMuted/70 text-sm leading-relaxed max-w-sm">
              India's most trusted premium sweets brand preserving the traditional culture and authentic taste of Bihar. Crafted using pure A2 Cow Desi Ghee and decades-old family recipes.
            </p>
            
            <div className="bg-royal-green/60 p-3 rounded-lg border border-royal-gold/20 text-xs text-royal-goldMuted space-y-1">
              <div className="flex items-center space-x-2 text-royal-gold font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>Store Timings: {CITY_DELIVERY_RULES.storeTimings}</span>
              </div>
              <p>📍 Delivery available strictly within city limits. No international shipping.</p>
            </div>
          </div>

          {/* Company Information Pages */}
          <div className="space-y-3">
            <h5 className="font-cinzel text-royal-gold font-semibold tracking-wider text-sm">COMPANY & HERITAGE</h5>
            <ul className="space-y-2 text-sm text-royal-goldMuted/70">
              <li><Link href="/" className="hover:text-royal-gold transition-colors">Home</Link></li>
              <li><Link href="/shop" className="hover:text-royal-gold transition-colors">Menu & Wedding Orders</Link></li>
              <li><Link href="/journey" className="hover:text-royal-gold transition-colors">Our Legacy & Visual Gallery</Link></li>
              <li><Link href="/store-info" className="hover:text-royal-gold transition-colors">Contact & Store Info</Link></li>
              <li><Link href="/admin" className="hover:text-royal-gold transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Products & Specials */}
          <div className="space-y-3">
            <h5 className="font-cinzel text-royal-gold font-semibold tracking-wider text-sm">POPULAR SPECIALS</h5>
            <ul className="space-y-2 text-sm text-royal-goldMuted/70">
              <li><Link href="/shop" className="hover:text-royal-gold transition-colors">Authentic Gud Tilkut (Gaya)</Link></li>
              <li><Link href="/shop" className="hover:text-royal-gold transition-colors">Silao Khaja</Link></li>
              <li><Link href="/shop" className="hover:text-royal-gold transition-colors">Launglatta & Anarsa</Link></li>
              <li><Link href="/shop" className="hover:text-royal-gold transition-colors">Suryamukhi & Khoya Peda</Link></li>
              <li><Link href="/shop" className="hover:text-royal-gold transition-colors">Silver Kaju Katli</Link></li>
              <li><Link href="/shop" className="hover:text-royal-gold transition-colors">Pure Desi Ghee Laddu</Link></li>
            </ul>
          </div>

          {/* Policies & Legal */}
          <div className="space-y-3">
            <h5 className="font-cinzel text-royal-gold font-semibold tracking-wider text-sm">STORE POLICIES</h5>
            <ul className="space-y-2 text-sm text-royal-goldMuted/70">
              <li><Link href="/shipping-policy" className="hover:text-royal-gold transition-colors">City Shipping & Delivery Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-royal-gold transition-colors">Refund & Cancellation</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-royal-gold transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-royal-gold transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/store-info" className="hover:text-royal-gold transition-colors">Contact Us</Link></li>
              <li><Link href="/admin" className="hover:text-royal-gold transition-colors">Admin Dashboard</Link></li>
            </ul>
          </div>
        </div>

        {/* Security & Payment Badges */}
        <div className="border-t border-royal-gold/15 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-royal-goldMuted/60">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-royal-gold" />
              <span>100% Pure A2 Cow Ghee</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Truck className="w-4 h-4 text-royal-gold" />
              <span>City Limits Express Delivery</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Lock className="w-4 h-4 text-royal-gold" />
              <span>Razorpay & Cash on Delivery</span>
            </span>
          </div>

          <p>© {new Date().getFullYear()} Bindhyawasini Traditional Sweets. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
