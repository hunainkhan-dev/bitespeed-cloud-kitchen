import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TAX_RATE, DELIVERY_FEE } from '@/lib/constants';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (menuItem) => {
        const items = get().items;
        const existing = items.find((i) => i._id === menuItem._id);
        if (existing) {
          set({
            items: items.map((i) =>
              i._id === menuItem._id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ items: [...items, { ...menuItem, quantity: 1 }] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((i) => i._id !== id) });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((i) =>
            i._id === id ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      get subtotal() {
        return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      },

      get tax() {
        return get().subtotal * TAX_RATE;
      },

      get total() {
        const sub = get().subtotal;
        return sub > 0 ? sub + get().tax + DELIVERY_FEE : 0;
      },

      get itemCount() {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },
    }),
    {
      name: 'bitespeed-cart',
    }
  )
);

export default useCartStore;
