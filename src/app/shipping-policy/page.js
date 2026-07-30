'use client';

import React from 'react';
import { Truck, MapPin } from 'lucide-react';
import { CITY_DELIVERY_RULES } from '../../data/products';

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-royal-greenDark text-royal-ivory py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-royal-green p-8 sm:p-12 rounded-3xl border border-royal-gold/30 space-y-6 shadow-luxury">
        <h1 className="font-serif-luxury text-3xl font-bold text-royal-gold">City Shipping & Delivery Policy</h1>
        
        <div className="space-y-4 text-xs text-royal-goldMuted/80 leading-relaxed">
          <p className="font-bold text-royal-ivory">
            IMPORTANT: Bindhyawasini delivers strictly within city limits. We do not provide pan-India or international shipping.
          </p>
          <p>
            1. <strong>Delivery Radius:</strong> Express delivery is available within a {CITY_DELIVERY_RULES.maxCityRadiusKm} km radius from our main store kitchen.
          </p>
          <p>
            2. <strong>Distance Charges:</strong> Base fee of ₹{CITY_DELIVERY_RULES.baseDeliveryFee} applies for up to {CITY_DELIVERY_RULES.freeDistanceKm} km. Orders beyond {CITY_DELIVERY_RULES.freeDistanceKm} km incur an additional ₹{CITY_DELIVERY_RULES.perKmFee}/km.
          </p>
          <p>
            3. <strong>Free Delivery:</strong> Orders exceeding ₹{CITY_DELIVERY_RULES.freeDeliveryThreshold} receive 100% free city express delivery.
          </p>
          <p>
            4. <strong>Store Pickup:</strong> Customers can select store pickup at checkout to pick up items at ₹0 delivery charge between {CITY_DELIVERY_RULES.storeTimings}.
          </p>
        </div>
      </div>
    </div>
  );
}
