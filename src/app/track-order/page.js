'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, MapPin, Truck, CheckCircle2, Clock, PackageCheck, AlertCircle } from 'lucide-react';
import { useOrderStore } from '../../store/useOrderStore';
import Link from 'next/link';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const paramOrderId = searchParams.get('id') || '';
  
  const { getOrderById, orders } = useOrderStore();
  const [searchId, setSearchId] = useState(paramOrderId);
  const [activeOrder, setActiveOrder] = useState(paramOrderId ? getOrderById(paramOrderId) : (orders[0] || null));
  const [searched, setSearched] = useState(Boolean(paramOrderId));

  const handleTrack = (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    const found = getOrderById(searchId);
    setActiveOrder(found || null);
    setSearched(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-royal-gold font-bold bg-royal-gold/10 px-3 py-1 rounded-full border border-royal-gold/20">
          <Truck className="w-3.5 h-3.5" />
          <span>City Limits Express Order Telemetry</span>
        </div>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-royal-gold">
          Track Your Fresh Batch Order
        </h1>
        <p className="text-xs text-royal-goldMuted/80 max-w-lg mx-auto">
          Enter your VINDHYAWASINI TILKUT BHANDAR Order ID to view real-time delivery milestones and kitchen preparation status.
        </p>
      </div>

      {/* Search Input Form */}
      <form onSubmit={handleTrack} className="flex gap-2 max-w-md mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-royal-gold" />
          <input 
            type="text" 
            placeholder="e.g. BINDHYA_ORD_123456" 
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full bg-royal-green border border-royal-gold/30 rounded-xl pl-10 pr-4 py-3 text-xs text-royal-ivory focus:outline-none focus:border-royal-gold"
          />
        </div>
        <button type="submit" className="gold-btn px-6 py-3 rounded-xl text-xs font-bold shrink-0">
          Track Order
        </button>
      </form>

      {/* Dynamic Order Telemetry Card */}
      {activeOrder ? (
        <div className="bg-royal-green p-8 rounded-3xl border border-royal-gold/30 shadow-luxury space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-royal-gold/20 pb-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-royal-gold font-bold">Order ID: {activeOrder.id}</span>
              <h3 className="font-serif-luxury text-xl font-bold text-royal-ivory mt-1">
                Status: <span className="text-emerald-400">{activeOrder.status}</span>
              </h3>
            </div>
            <div className="text-right">
              <span className="font-serif-luxury text-xl font-bold text-royal-gold">₹{activeOrder.grandTotal}</span>
              <span className="text-xs text-royal-goldMuted block">{activeOrder.fulfillmentType === 'pickup' ? 'Store Pickup' : 'City Express Delivery'}</span>
            </div>
          </div>

          {/* Milestones Tracker */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
            <div className="bg-royal-greenDark p-4 rounded-2xl border border-emerald-500/40 text-center space-y-1">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
              <h5 className="font-bold text-xs text-royal-ivory">Order Placed</h5>
              <span className="text-[10px] text-royal-goldMuted block">Kitchen Notified</span>
            </div>

            <div className="bg-royal-greenDark p-4 rounded-2xl border border-emerald-500/40 text-center space-y-1">
              <Clock className="w-6 h-6 text-emerald-400 mx-auto" />
              <h5 className="font-bold text-xs text-royal-ivory">A2 Ghee Prep</h5>
              <span className="text-[10px] text-royal-goldMuted block">Fresh Morning Batch</span>
            </div>

            <div className="bg-royal-greenDark p-4 rounded-2xl border border-royal-gold/40 text-center space-y-1">
              <PackageCheck className="w-6 h-6 text-royal-gold mx-auto" />
              <h5 className="font-bold text-xs text-royal-ivory">Quality Packed</h5>
              <span className="text-[10px] text-royal-goldMuted block">Sealed for Freshness</span>
            </div>

            <div className="bg-royal-greenDark p-4 rounded-2xl border border-royal-gold/20 text-center space-y-1 opacity-60">
              <Truck className="w-6 h-6 text-royal-goldMuted mx-auto" />
              <h5 className="font-bold text-xs text-royal-ivory">Dispatched</h5>
              <span className="text-[10px] text-royal-goldMuted block">On the Way</span>
            </div>
          </div>
        </div>
      ) : searched ? (
        <div className="bg-royal-green p-8 rounded-3xl border border-royal-gold/30 text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
          <h4 className="font-serif-luxury text-lg font-bold text-royal-gold">Order Not Found</h4>
          <p className="text-xs text-royal-goldMuted max-w-sm mx-auto">
            We couldn't find an order matching "{searchId}". Please check your order ID or log in to view your recent orders.
          </p>
          <Link href="/dashboard" className="inline-block gold-btn px-6 py-2.5 rounded-xl text-xs font-bold mt-2">
            View Patron Dashboard
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen bg-royal-greenDark text-royal-ivory py-16 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="text-center text-royal-gold text-xs py-10">Loading Order Telemetry...</div>}>
        <TrackOrderContent />
      </Suspense>
    </div>
  );
}
