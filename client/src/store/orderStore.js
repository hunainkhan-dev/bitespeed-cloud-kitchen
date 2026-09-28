import { create } from 'zustand';
import { SAMPLE_ORDERS } from '@/lib/constants';

const useOrderStore = create((set) => ({
  orders: SAMPLE_ORDERS,

  addOrder: (order) =>
    set((state) => ({
      orders: [{ ...order, _id: String(Date.now()), createdAt: new Date().toISOString() }, ...state.orders],
    })),

  updateStatus: (id, status) =>
    set((state) => ({
      orders: state.orders.map((o) => (o._id === id ? { ...o, status } : o)),
    })),
}));

export default useOrderStore;
