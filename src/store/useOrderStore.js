import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useOrderStore = create(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (orderData) => set((state) => ({
        orders: [orderData, ...state.orders]
      })),

      getOrderById: (orderId) => {
        return get().orders.find(
          o => o.id.toLowerCase() === orderId.trim().toLowerCase()
        );
      },

      clearOrders: () => set({ orders: [] })
    }),
    {
      name: 'bindhyawasini_orders_storage',
    }
  )
);
