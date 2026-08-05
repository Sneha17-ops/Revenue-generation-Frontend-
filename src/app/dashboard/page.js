'use client';

import React from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useOrderStore } from '../../store/useOrderStore';
import { User, Package, Crown, MapPin, Phone, Heart, ShoppingBag, LogOut, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CustomerDashboardPage() {
  const { user, logout } = useAuthStore();
  const { orders } = useOrderStore();

  return (
    <div className="min-h-screen bg-royal-greenDark text-royal-ivory py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* User Profile Header */}
        <div className="bg-royal-green p-8 rounded-3xl border border-royal-gold/30 shadow-luxury flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-royal-gold/20 border-2 border-royal-gold flex items-center justify-center text-royal-gold text-xl font-bold">
              👑
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-royal-gold font-bold">Royal Patron Profile</span>
              <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-royal-ivory">{user?.name || "Valued Connoisseur"}</h1>
              <p className="text-xs text-royal-goldMuted">{user?.email || user?.phone || "patron@vindhyawasini.com"}</p>
            </div>
          </div>

          <button 
            onClick={logout}
            className="border border-rose-500/40 text-rose-300 hover:bg-rose-950 px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>

        {/* Dynamic Orders History Overview */}
        <div className="bg-royal-green p-8 rounded-3xl border border-royal-gold/30 shadow-luxury space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-serif-luxury text-xl font-bold text-royal-gold">Recent Orders</h3>
            <Link href="/shop" className="text-xs text-royal-goldMuted hover:text-royal-gold font-bold">Explore Catalog →</Link>
          </div>

          {orders.length === 0 ? (
            <div className="p-8 bg-royal-greenDark rounded-2xl border border-royal-gold/20 text-center space-y-3">
              <ShoppingBag className="w-8 h-8 text-royal-gold/40 mx-auto" />
              <h4 className="font-serif-luxury text-lg font-bold text-royal-gold">No Orders Placed Yet</h4>
              <p className="text-xs text-royal-goldMuted/80 max-w-sm mx-auto">
                Place your first fresh A2 Ghee Bihari sweets order for city limits express delivery!
              </p>
              <Link href="/shop" className="inline-block gold-btn px-6 py-2.5 rounded-xl text-xs font-bold mt-2">
                Order Fresh Sweets Now
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord.id} className="p-5 bg-royal-greenDark rounded-2xl border border-royal-gold/20 space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-royal-gold/15 pb-3">
                    <div>
                      <span className="text-xs text-royal-gold font-bold">{ord.id}</span>
                      <span className="text-[10px] text-royal-goldMuted/60 block">{ord.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-500/30">
                        {ord.status}
                      </span>
                      <Link href={`/track-order?id=${ord.id}`} className="text-xs text-royal-gold border border-royal-gold/30 px-3 py-1 rounded-full hover:bg-royal-gold hover:text-royal-green transition-all">
                        Track Status
                      </Link>
                    </div>
                  </div>

                  <div className="space-y-1">
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-xs text-royal-goldMuted">
                        <span>{item.name} ({item.quantity}x)</span>
                        <span className="text-royal-ivory font-semibold">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-royal-gold/10 text-xs">
                    <span className="text-royal-goldMuted/70">{ord.fulfillmentType === 'pickup' ? 'Store Pickup' : 'City Express Delivery'}</span>
                    <span className="font-serif-luxury text-lg font-bold text-royal-gold">Total: ₹{ord.grandTotal}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
