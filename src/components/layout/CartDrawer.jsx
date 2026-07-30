'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Tag, 
  Clock, 
  Truck, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';

export const CartDrawer = () => {
  const { 
    cart, 
    isCartOpen, 
    closeCart, 
    updateQuantity, 
    removeFromCart, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon,
    selectedSlot,
    setSelectedSlot,
    pincode,
    setPincode,
    getSubtotal,
    getDiscountAmount,
    getGrandTotal 
  } = useCartStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState('');
  const router = useRouter();

  if (!isCartOpen) return null;

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const grandTotal = getGrandTotal();
  const freeShippingThreshold = 999;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponMsg(res.message);
  };

  const handleProceedCheckout = () => {
    closeCart();
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop Overlay */}
      <div 
        onClick={closeCart} 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-royal-greenDark text-royal-ivory shadow-2xl flex flex-col border-l border-royal-gold/30">
          
          {/* Header */}
          <div className="p-6 bg-royal-green text-royal-ivory border-b border-royal-gold/20 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-royal-gold/20 border border-royal-gold/40 flex items-center justify-center text-royal-gold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif-luxury font-bold text-lg text-royal-gold">Shopping Bag</h3>
                <p className="text-xs text-royal-goldMuted/70">{cart.length} Bihari Delicacies Selected</p>
              </div>
            </div>
            <button 
              onClick={closeCart}
              className="p-2 text-royal-goldMuted hover:text-royal-gold hover:bg-royal-gold/10 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-royal-green/60 p-3 px-6 border-b border-royal-gold/15 text-xs">
            {subtotal >= freeShippingThreshold ? (
              <div className="flex items-center space-x-2 text-emerald-300 font-semibold">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Unlocked FREE City Express Shipping!</span>
              </div>
            ) : (
              <div>
                <div className="flex justify-between mb-1 text-royal-goldMuted">
                  <span>Add ₹{freeShippingThreshold - subtotal} more for FREE City Delivery</span>
                  <span className="font-bold text-royal-gold">{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full h-1.5 bg-royal-greenDark rounded-full overflow-hidden border border-royal-gold/20">
                  <div 
                    className="h-full bg-gradient-to-r from-royal-gold to-amber-400 transition-all duration-500" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-royal-gold/10 border border-royal-gold/30 mx-auto flex items-center justify-center text-royal-gold">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-serif-luxury text-lg font-bold text-royal-gold">Your Shopping Bag is Empty</h4>
                <p className="text-xs text-royal-goldMuted/80 max-w-xs mx-auto">
                  Explore our handcrafted pure A2 ghee Bihari sweets and specials to add items.
                </p>
                <button 
                  onClick={closeCart} 
                  className="gold-btn px-6 py-2.5 rounded-full text-xs"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.id} 
                  className="flex space-x-4 p-3 bg-royal-green/80 rounded-xl border border-royal-gold/20 shadow-sm hover:border-royal-gold/50 transition-all"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover rounded-lg border border-royal-gold/20"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h5 className="font-serif-luxury font-bold text-sm text-royal-ivory line-clamp-1">{item.name}</h5>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-royal-goldMuted hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-royal-gold font-semibold mt-0.5">₹{item.price} <span className="text-[10px] text-royal-goldMuted/60 font-normal">{item.unit}</span></p>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center space-x-2 bg-royal-greenDark border border-royal-gold/30 rounded-lg px-2 py-0.5 text-royal-ivory">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-royal-gold"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-royal-gold"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-bold text-sm text-royal-gold">₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Coupon & Summary Footer */}
          {cart.length > 0 && (
            <div className="p-6 bg-royal-green border-t border-royal-gold/20 space-y-4 shadow-luxury">
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-950/80 border border-emerald-500/30 p-2.5 rounded-lg text-xs">
                    <div className="flex items-center space-x-2 text-emerald-300">
                      <Tag className="w-4 h-4 text-emerald-400" />
                      <span className="font-bold">Coupon ({appliedCoupon.code}) Applied</span>
                    </div>
                    <button 
                      onClick={removeCoupon} 
                      className="text-emerald-300 font-bold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Coupon Code (e.g. BIHAR10)" 
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 bg-royal-greenDark border border-royal-gold/30 px-3 py-1.5 rounded-lg text-xs uppercase focus:outline-none focus:border-royal-gold text-royal-ivory"
                    />
                    <button type="submit" className="gold-btn px-4 py-1.5 rounded-lg text-xs">
                      Apply
                    </button>
                  </form>
                )}
                {couponMsg && <p className="text-[11px] text-rose-300 mt-1 font-medium">{couponMsg}</p>}
              </div>

              <div className="space-y-1.5 text-xs text-royal-goldMuted">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-royal-ivory">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>City Delivery Fee</span>
                  <span>{subtotal >= freeShippingThreshold ? <span className="text-emerald-400 font-bold">FREE</span> : `Distance Calculated at Checkout`}</span>
                </div>
                <div className="border-t border-royal-gold/20 pt-2 flex justify-between text-sm font-bold text-royal-gold">
                  <span>Grand Total</span>
                  <span className="text-lg">₹{grandTotal}</span>
                </div>
              </div>

              <button 
                onClick={handleProceedCheckout}
                className="w-full gold-btn py-3.5 rounded-xl font-bold flex items-center justify-center space-x-2 text-sm shadow-gold-glow"
              >
                <span>Proceed to City Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
