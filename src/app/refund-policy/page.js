'use client';

import React from 'react';

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-royal-greenDark text-royal-ivory py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-royal-green p-8 sm:p-12 rounded-3xl border border-royal-gold/30 space-y-6 shadow-luxury">
        <h1 className="font-serif-luxury text-3xl font-bold text-royal-gold">Refund & Cancellation Policy</h1>
        
        <div className="space-y-4 text-xs text-royal-goldMuted/80 leading-relaxed">
          <p>
            Due to the perishable nature of fresh A2 Ghee Bihari sweets and daily morning batches, orders cannot be cancelled once dispatched for city delivery.
          </p>
          <p>
            In the rare event of damage or wrong item delivery, please notify customer support within 2 hours of delivery with photo proof for immediate replacement or full refund to your original payment method.
          </p>
        </div>
      </div>
    </div>
  );
}
