'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // import or next/navigation
import Link from 'next/link';
import { 
  ShieldCheck, 
  MapPin, 
  Store, 
  CreditCard, 
  Lock, 
  AlertCircle,
  Phone,
  MessageSquare,
  Printer,
  X,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  RefreshCw,
  ShoppingBag
} from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useOrderStore } from '../../store/useOrderStore';
import { CITY_DELIVERY_RULES } from '../../data/products';

export default function CheckoutPage() {
  const { cart, getSubtotal, getDiscountAmount, clearCart } = useCartStore();
  const { isAuthenticated, openAuthModal, user, token } = useAuthStore();
  const { addOrder } = useOrderStore();

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [paymentStatusState, setPaymentStatusState] = useState(null); // 'SUCCESS' | 'FAILED' | null
  const [completedOrder, setCompletedOrder] = useState(null);
  const [currentOrderId, setCurrentOrderId] = useState(null);

  // Form Fields
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    notes: ''
  });

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const grandTotal = Math.max(0, subtotal - discount);

  // Load Razorpay Script dynamically on mount
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const handleInitiatePayment = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    // 1. Mobile Phone Number Validation
    if (!formData.name || !formData.phone) {
      setErrorMessage("Please enter your recipient name and mobile phone number.");
      return;
    }

    if (formData.phone.replace(/\D/g, '').length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number for order & SMS updates.");
      return;
    }

    setIsProcessing(true);

    try {
      const authToken = token || 'jwt_mock_token_patron_12345';

      // 2. Call backend to create Razorpay Order & validate prices/stock on server
      const createRes = await fetch(`${API_URL}/api/payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          items: cart,
          customerName: formData.name,
          customerPhone: formData.phone,
          customerEmail: formData.email,
          notes: formData.notes
        })
      });

      const createData = await createRes.json();

      if (!createData.success) {
        throw new Error(createData.message || "Failed to initialize payment order on server");
      }

      const { orderId, razorpayOrderId, amountInPaise, currency, keyId } = createData;
      setCurrentOrderId(orderId);

      // 3. Razorpay JS SDK Checkout Options
      const options = {
        key: keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_BindhyaRoyal2026',
        amount: amountInPaise,
        currency: currency || "INR",
        name: "VINDHYAWASINI TILKUT BHANDAR",
        description: `Store Pickup Order ${orderId} (${cart.length} Artisanal Sweets)`,
        image: "/assets/MP8.jpeg",
        order_id: razorpayOrderId,
        prefill: {
          name: formData.name,
          email: formData.email || "patron@vindhyawasini.com",
          contact: formData.phone
        },
        theme: {
          color: "#0B3D2E"
        },
        handler: async function (paymentResponse) {
          // 4. Send payment response signature to BACKEND FOR HMAC VERIFICATION
          try {
            const verifyRes = await fetch(`${API_URL}/api/payment/verify-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
              },
              body: JSON.stringify({
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
                orderId: orderId
              })
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              const verifiedOrder = verifyData.order;
              addOrder(verifiedOrder);
              clearCart();
              setIsProcessing(false);
              setCompletedOrder(verifiedOrder);
              setPaymentStatusState('SUCCESS');
            } else {
              throw new Error(verifyData.message || "Payment signature verification failed on backend.");
            }
          } catch (err) {
            console.error("Backend Verification error:", err);
            setIsProcessing(false);
            setPaymentStatusState('FAILED');
            setErrorMessage("⚠️ Security Verification Error: " + err.message);
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            setErrorMessage("Payment session was cancelled. Your items remain saved in your shopping bag.");
          }
        }
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Fallback simulation mode if external Razorpay CDN is blocked
        setTimeout(async () => {
          try {
            const mockPaymentId = `pay_mock_${Date.now()}`;
            const mockSig = `mock_sig_${Date.now()}`;

            const verifyRes = await fetch(`${API_URL}/api/payment/verify-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
              },
              body: JSON.stringify({
                razorpay_order_id: razorpayOrderId,
                razorpay_payment_id: mockPaymentId,
                razorpay_signature: mockSig,
                orderId: orderId
              })
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              addOrder(verifyData.order);
              clearCart();
              setIsProcessing(false);
              setCompletedOrder(verifyData.order);
              setPaymentStatusState('SUCCESS');
            } else {
              throw new Error(verifyData.message);
            }
          } catch (err) {
            setIsProcessing(false);
            setPaymentStatusState('FAILED');
            setErrorMessage("Verification error: " + err.message);
          }
        }, 1200);
      }

    } catch (err) {
      console.error("Payment initiation error:", err);
      setIsProcessing(false);
      setErrorMessage(err.message || "Could not connect to backend server.");
    }
  };

  // SUCCESS CONFIRMATION VIEW
  if (paymentStatusState === 'SUCCESS' && completedOrder) {
    return (
      <div className="min-h-screen bg-[#06241B] text-[#FAF7F2] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-[#0B3D2E] rounded-3xl border border-[#D4AF37]/40 shadow-2xl p-8 sm:p-12 space-y-8">
          
          <div className="text-center space-y-3 border-b border-[#D4AF37]/20 pb-8">
            <div className="w-16 h-16 bg-emerald-950 border-2 border-emerald-500 rounded-full flex items-center justify-center text-emerald-400 mx-auto shadow-gold-glow">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold bg-[#D4AF37]/15 px-4 py-1.5 rounded-full border border-[#D4AF37]/30">
              Payment Verified & Order Confirmed
            </span>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#D4AF37]">
              Thank You for Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-[#FAF7F2]/80 max-w-md mx-auto">
              Your payment has been received successfully. You will receive an SMS confirmation on <strong className="text-[#D4AF37]">{completedOrder.customerPhone}</strong> shortly.
            </p>
          </div>

          <div className="bg-[#06241B] p-6 rounded-2xl border border-[#D4AF37]/30 space-y-4 text-xs">
            <div className="flex flex-wrap justify-between border-b border-[#D4AF37]/15 pb-3 gap-2">
              <div>
                <span className="text-[#D4AF37] font-semibold block">Order Reference ID</span>
                <strong className="text-base text-white font-mono">{completedOrder.orderId}</strong>
              </div>
              <div className="text-right">
                <span className="text-[#D4AF37] font-semibold block">Amount Paid</span>
                <strong className="text-base text-emerald-400 font-mono">₹{completedOrder.totalAmount}</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <span className="text-[#D4AF37] font-semibold block">Customer Name</span>
                <span className="text-white font-bold">{completedOrder.customerName}</span>
              </div>
              <div>
                <span className="text-[#D4AF37] font-semibold block">Payment Method</span>
                <span className="text-emerald-400 font-bold">Razorpay Online (PAID)</span>
              </div>
              <div>
                <span className="text-[#D4AF37] font-semibold block">Fulfillment Method</span>
                <span className="text-white font-bold">🛍 STORE PICKUP ONLY</span>
              </div>
              <div>
                <span className="text-[#D4AF37] font-semibold block">Store Pickup Location</span>
                <span className="text-white">Main Road, City Center, Gaya, Bihar</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-[#D4AF37] font-semibold block">Store Pickup Timings</span>
                <span className="text-white">{CITY_DELIVERY_RULES.storeTimings}</span>
              </div>
            </div>

            {/* Items Summary */}
            <div className="border-t border-[#D4AF37]/20 pt-4 space-y-2">
              <span className="font-bold text-[#D4AF37] block">Purchased Confections:</span>
              {completedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center bg-[#0B3D2E] p-2.5 rounded-xl border border-[#D4AF37]/15">
                  <span>{item.name} ({item.unit}) × {item.quantity}</span>
                  <span className="font-bold text-[#D4AF37]">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={() => window.print()}
              className="flex-1 bg-[#06241B] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-[#D4AF37] font-bold text-xs py-3.5 rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Order Receipt</span>
            </button>
            
            <Link
              href="/shop"
              className="flex-1 gold-btn font-bold text-xs py-3.5 rounded-xl flex items-center justify-center space-x-2 shadow-gold-glow text-center"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // FAILED PAYMENT VIEW
  if (paymentStatusState === 'FAILED') {
    return (
      <div className="min-h-screen bg-[#06241B] text-[#FAF7F2] py-20 px-4 text-center flex items-center justify-center">
        <div className="max-w-md w-full bg-[#0B3D2E] p-8 rounded-3xl border border-rose-500/50 space-y-6 shadow-2xl">
          <div className="w-16 h-16 bg-rose-950 border-2 border-rose-500 rounded-full flex items-center justify-center text-rose-400 mx-auto">
            <XCircle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif-luxury text-2xl font-bold text-rose-200">Payment Unsuccessful</h2>
            <p className="text-xs text-[#FAF7F2]/80">
              Your payment could not be completed or verified by our bank gateway. The order has <strong className="text-rose-400">NOT</strong> been confirmed.
            </p>
          </div>

          {errorMessage && (
            <div className="bg-rose-950/80 border border-rose-500/30 p-3 rounded-xl text-xs text-rose-200 text-left font-mono">
              {errorMessage}
            </div>
          )}

          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={() => {
                setPaymentStatusState(null);
                setErrorMessage(null);
              }}
              className="gold-btn py-3.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 shadow-gold-glow cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Payment Again</span>
            </button>

            <Link
              href="/shop"
              className="bg-[#06241B] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#D4AF37] py-3 rounded-xl font-bold text-xs block"
            >
              Return to Cart / Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // EMPTY BAG GUARD
  if (cart.length === 0 && !completedOrder) {
    return (
      <div className="min-h-screen bg-[#06241B] py-20 px-4 text-center text-[#FAF7F2] space-y-4 flex flex-col justify-center items-center">
        <ShoppingBag className="w-12 h-12 text-[#D4AF37]/50 mb-2" />
        <h2 className="font-serif-luxury text-3xl font-bold text-[#D4AF37]">Your Shopping Bag is Empty</h2>
        <p className="text-xs text-[#FAF7F2]/70 max-w-sm">Please add authentic Gaya sweets to your bag before checking out.</p>
        <Link href="/shop" className="gold-btn px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider">
          Explore Bihari Sweets
        </Link>
      </div>
    );
  }

  // MAIN CHECKOUT FORM (STORE PICKUP ONLY)
  return (
    <div className="min-h-screen bg-[#06241B] text-[#FAF7F2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Title & Trust Header */}
        <div className="border-b border-[#D4AF37]/20 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#D4AF37] font-bold bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/20 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Razorpay Secured SSL • Backend Verified</span>
            </div>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#D4AF37]">
              Store Pickup Checkout
            </h1>
          </div>

          <div className="flex items-center space-x-2 bg-[#0B3D2E] px-4 py-2 rounded-2xl border border-[#D4AF37]/30 text-xs text-[#FAF7F2]/80">
            <Store className="w-4 h-4 text-[#D4AF37]" />
            <span>Store Pickup Only • Zero Waiting Time</span>
          </div>
        </div>

        {errorMessage && (
          <div className="bg-rose-950/90 border border-rose-500/50 p-4 rounded-2xl text-xs text-rose-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button onClick={() => setErrorMessage(null)} className="text-rose-400 hover:text-rose-200">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form Details & Pickup Notice */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Store Pickup Notice Banner */}
            <div className="bg-[#0B3D2E] p-6 rounded-3xl border border-[#D4AF37]/30 space-y-3 shadow-2xl">
              <div className="flex items-center space-x-2 text-[#D4AF37] font-bold text-sm">
                <Store className="w-5 h-5 text-[#D4AF37]" />
                <span>Store Pickup Details</span>
              </div>
              <p className="text-xs text-[#FAF7F2]/80 font-light leading-relaxed">
                Your sweets will be freshly packed and waiting for you at our flagship boutique store in Gaya:
              </p>
              <div className="bg-[#06241B] p-4 rounded-2xl border border-[#D4AF37]/20 text-xs text-[#FAF7F2] space-y-1 font-medium">
                <div className="flex items-center space-x-2 text-[#D4AF37] font-bold">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>VINDHYAWASINI TILKUT BHANDAR, Main Road, City Center, Gaya, Bihar</span>
                </div>
                <div className="flex items-center space-x-2 text-[#FAF7F2]/70 pt-1">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>Operating Hours: {CITY_DELIVERY_RULES.storeTimings}</span>
                </div>
              </div>
            </div>

            {/* Customer Details Form */}
            <div className="bg-[#0B3D2E] p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/30 space-y-5 shadow-2xl">
              <h3 className="font-serif-luxury text-lg font-bold text-[#D4AF37]">Customer & Pickup Information</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[#FAF7F2]/80 mb-1.5 font-semibold">Recipient Full Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Rohan Verma"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[#06241B] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[#FAF7F2]/80 mb-1.5 font-semibold">Mobile Phone (For SMS Updates) *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="10-Digit Mobile Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-[#06241B] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[#FAF7F2]/80 mb-1.5 font-semibold">Email Address (Optional)</label>
                  <input 
                    type="email" 
                    placeholder="patron@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-[#06241B] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[#FAF7F2]/80 mb-1.5 font-semibold">Special Pickup Instructions / Gift Note</label>
                  <textarea 
                    rows={2}
                    placeholder="e.g. Please pack in brass wedding box for 5:00 PM pickup"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full bg-[#06241B] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Security Assurance Box */}
            <div className="bg-[#0B3D2E]/60 p-4 rounded-2xl border border-[#D4AF37]/20 flex items-center space-x-3 text-xs text-[#FAF7F2]/70">
              <Lock className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <div>
                <span className="font-bold text-[#D4AF37] block">🔒 100% Encrypted & HMAC Verified</span>
                <span>Payment credentials are processed directly by Razorpay's PCI-DSS Bank Gateway. No card numbers or CVVs are ever stored.</span>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary & Pay CTA */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0B3D2E] p-6 rounded-3xl border border-[#D4AF37]/30 shadow-2xl space-y-6 sticky top-28">
              <h3 className="font-serif-luxury text-xl font-bold text-[#D4AF37]">Order Summary</h3>

              {/* Items List */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-xs border-b border-[#D4AF37]/15 pb-2.5">
                    <div>
                      <h5 className="font-bold text-white">{item.name}</h5>
                      <span className="text-[10px] text-[#D4AF37]">{item.quantity} × ₹{item.price} ({item.unit})</span>
                    </div>
                    <span className="font-bold text-[#D4AF37]">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Fee Breakdown */}
              <div className="space-y-2 text-xs text-[#FAF7F2]/80 border-t border-[#D4AF37]/20 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">₹{subtotal}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Festival Coupon Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Store Pickup Fee</span>
                  <span className="font-bold text-emerald-400">₹0 FREE</span>
                </div>

                <div className="border-t border-[#D4AF37]/20 pt-3 flex justify-between items-baseline font-bold text-[#D4AF37]">
                  <span className="text-sm">Grand Total</span>
                  <span className="text-2xl font-serif-luxury">₹{grandTotal}</span>
                </div>
              </div>

              {/* Primary Secure Payment CTA Button */}
              <button
                disabled={isProcessing}
                onClick={handleInitiatePayment}
                className="w-full gold-btn py-4 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#0B3D2E] border-t-transparent rounded-full animate-spin" />
                    <span>Connecting to Razorpay...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Proceed to Secure Payment (₹{grandTotal})</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
