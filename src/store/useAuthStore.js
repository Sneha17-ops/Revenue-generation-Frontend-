import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  token: null,
  isAuthModalOpen: false,

  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),

  login: (userData, token) => set({ 
    user: userData, 
    token: token || `jwt_token_${Date.now()}`, 
    isAuthenticated: true,
    isAuthModalOpen: false
  }),

  logout: () => set({ user: null, token: null, isAuthenticated: false }),

  updateProfile: (updatedFields) => set((state) => ({ 
    user: state.user ? { ...state.user, ...updatedFields } : null 
  }))
}));
