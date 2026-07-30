'use client';

import React from 'react';
import { MapPin, Clock, Phone, MessageSquare, Heart } from 'lucide-react';
import { CITY_DELIVERY_RULES } from '../../data/products';

export default function StoreInfoPage() {
  return (
    <div className="min-h-screen bg-royal-greenDark text-royal-ivory py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-royal-gold font-bold bg-royal-gold/10 px-4 py-1.5 rounded-full border border-royal-gold/20">
            Flagship Kitchen & Gallery
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-royal-gold">
            Store Location & Timings
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-royal-green p-8 rounded-3xl border border-royal-gold/30 space-y-6">
            <h3 className="font-serif-luxury text-xl font-bold text-royal-gold">Visit Our Flagship Store</h3>
            
            <div className="space-y-4 text-xs text-royal-goldMuted">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-royal-gold shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-royal-ivory block">Store Address</span>
                  <span>Bindhyawasini Sweets, Main Road, City Center, Bihar</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-royal-gold shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-royal-ivory block">Operating Hours</span>
                  <span>{CITY_DELIVERY_RULES.storeTimings} (Open 7 Days)</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-royal-gold shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-royal-ivory block">Phone Support</span>
                  <span>{CITY_DELIVERY_RULES.phoneSupport}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-royal-gold/20">
              <a 
                href={`https://wa.me/${CITY_DELIVERY_RULES.whatsAppOrderNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 text-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Store Inquiry</span>
              </a>
            </div>
          </div>

          {/* Wedding Basket Gallery Box */}
          <div className="bg-royal-green p-8 rounded-3xl border border-royal-gold/30 space-y-4">
            <h3 className="font-serif-luxury text-xl font-bold text-royal-gold">Custom Wedding Baskets</h3>
            <p className="text-xs text-royal-goldMuted/80 font-light">
              We design custom brass trunks, royal velvet boxes, and wedding gifting baskets tailored with fresh Bihari sweets for wedding invitations and royal celebrations.
            </p>
            <div className="relative h-48 rounded-2xl overflow-hidden border border-royal-gold/30">
              <img 
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop" 
                alt="Wedding Gifting Trunks" 
                className="w-full h-full object-cover"
              />
            </div>
            <a 
              href={`https://wa.me/${CITY_DELIVERY_RULES.whatsAppOrderNumber}?text=Inquiry%20for%20Custom%20Wedding%20Sweets%20Basket`}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-btn w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-2"
            >
              <span>Inquire for Wedding Hampers</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
