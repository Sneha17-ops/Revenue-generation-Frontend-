'use client';

import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-royal-greenDark text-royal-ivory py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-royal-green p-8 sm:p-12 rounded-3xl border border-royal-gold/30 space-y-6 shadow-luxury">
        <h1 className="font-serif-luxury text-3xl font-bold text-royal-gold">Privacy Policy</h1>
        
        <div className="space-y-4 text-xs text-royal-goldMuted/80 leading-relaxed">
          <p>
            At VINDHYAWASINI TILKUT BHANDAR, we value your privacy. Personal data collected during checkout (name, delivery phone number, address) is encrypted and strictly used to fulfill your city orders.
          </p>
          <p>
            We do not sell, rent, or trade customer information with any third-party marketing vendors.
          </p>
        </div>
      </div>
    </div>
  );
}
