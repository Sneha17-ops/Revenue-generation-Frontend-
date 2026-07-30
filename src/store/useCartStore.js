import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cart: [],
  isCartOpen: false,
  appliedCoupon: null,
  selectedSlot: "Express Same Day (City Limits)",
  pincode: "800001",
  deliveryFee: 40,
  
  toggleCartDrawer: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),

  addToCart: (product, qty = 1) => set((state) => {
    const existingIndex = state.cart.findIndex(item => item.id === product.id);
    if (existingIndex > -1) {
      const updatedCart = [...state.cart];
      updatedCart[existingIndex].quantity += qty;
      return { cart: updatedCart, isCartOpen: true };
    }
    return { 
      cart: [...state.cart, { ...product, quantity: qty }],
      isCartOpen: true 
    };
  }),

  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(item => item.id !== productId)
  })),

  updateQuantity: (productId, qty) => set((state) => {
    if (qty <= 0) {
      return { cart: state.cart.filter(item => item.id !== productId) };
    }
    return {
      cart: state.cart.map(item => item.id === productId ? { ...item, quantity: qty } : item)
    };
  }),

  applyCoupon: (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "BIHAR10") {
      set({ appliedCoupon: { code: "BIHAR10", discountPercent: 10 } });
      return { success: true, message: "10% Bihari Special Discount Applied!" };
    } else if (cleanCode === "FESTIVAL20") {
      set({ appliedCoupon: { code: "FESTIVAL20", discountPercent: 20 } });
      return { success: true, message: "20% Festive Discount Applied!" };
    }
    return { success: false, message: "Invalid Coupon Code. Try BIHAR10 or FESTIVAL20" };
  },

  removeCoupon: () => set({ appliedCoupon: null }),
  setPincode: (code) => set({ pincode: code }),
  setSelectedSlot: (slot) => set({ selectedSlot: slot }),
  clearCart: () => set({ cart: [], appliedCoupon: null }),

  getSubtotal: () => {
    return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  getDiscountAmount: () => {
    const subtotal = get().getSubtotal();
    const coupon = get().appliedCoupon;
    if (!coupon) return 0;
    if (coupon.discountPercent) return Math.round((subtotal * coupon.discountPercent) / 100);
    if (coupon.discountAmount) return Math.min(subtotal, coupon.discountAmount);
    return 0;
  },

  getGrandTotal: () => {
    const subtotal = get().getSubtotal();
    const discount = get().getDiscountAmount();
    const fee = subtotal >= 999 ? 0 : get().deliveryFee;
    return Math.max(0, subtotal - discount + fee);
  }
}));
