// src/store/cartStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === newItem.id);
          let newItems;

          if (existing) {
            newItems = state.items.map((i) =>
              i.id === newItem.id
                ? { ...i, quantity: i.quantity + (newItem.quantity ?? 1) }
                : i,
            );
          } else {
            newItems = [
              ...state.items,
              { ...newItem, quantity: newItem.quantity ?? 1 },
            ];
          }

          return {
            items: newItems,
            itemCount: newItems.reduce((sum, i) => sum + i.quantity, 0),
            totalPrice: newItems.reduce(
              (sum, i) => sum + i.price * i.quantity,
              0,
            ),
          };
        }),

      removeItem: (id) =>
        set((state) => {
          const newItems = state.items.filter((i) => i.id !== id);
          return {
            items: newItems,
            itemCount: newItems.reduce((sum, i) => sum + i.quantity, 0),
            totalPrice: newItems.reduce(
              (sum, i) => sum + i.price * i.quantity,
              0,
            ),
          };
        }),

      updateQuantity: (id, delta) =>
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (!item) return state;

          const newQty = item.quantity + delta;
          let newItems;

          if (newQty <= 0) {
            newItems = state.items.filter((i) => i.id !== id);
          } else {
            newItems = state.items.map((i) =>
              i.id === id ? { ...i, quantity: newQty } : i,
            );
          }

          return {
            items: newItems,
            itemCount: newItems.reduce((sum, i) => sum + i.quantity, 0),
            totalPrice: newItems.reduce(
              (sum, i) => sum + i.price * i.quantity,
              0,
            ),
          };
        }),

      setQuantity: (id, quantity) =>
        set((state) => {
          let newItems;

          if (quantity <= 0) {
            newItems = state.items.filter((i) => i.id !== id);
          } else {
            newItems = state.items.map((i) =>
              i.id === id ? { ...i, quantity } : i,
            );
          }

          return {
            items: newItems,
            itemCount: newItems.reduce((sum, i) => sum + i.quantity, 0),
            totalPrice: newItems.reduce(
              (sum, i) => sum + i.price * i.quantity,
              0,
            ),
          };
        }),

      clearCart: () =>
        set({
          items: [],
          itemCount: 0,
          totalPrice: 0,
        }),

      // Now these are just plain numbers (not functions)
      itemCount: 0,
      totalPrice: 0,
    }),
    {
      name: "shopping-cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      version: 1,
    },
  ),
);
