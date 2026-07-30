import { create } from 'zustand';

export const useWishlistStore = create((set, get) => ({
  wishlist: ["p1", "p12"],
  toggleWishlist: (productId) => set((state) => {
    const exists = state.wishlist.includes(productId);
    return {
      wishlist: exists 
        ? state.wishlist.filter(id => id !== productId)
        : [...state.wishlist, productId]
    };
  }),
  isInWishlist: (productId) => get().wishlist.includes(productId)
}));
