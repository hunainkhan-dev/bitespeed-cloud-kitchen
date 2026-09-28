import { create } from 'zustand';
import { SAMPLE_MENU } from '@/lib/constants';

const useMenuStore = create((set) => ({
  items: SAMPLE_MENU,
  category: 'All',
  search: '',
  dietaryFilters: [],

  setCategory: (category) => set({ category }),
  setSearch: (search) => set({ search }),

  toggleDietary: (tag) =>
    set((state) => ({
      dietaryFilters: state.dietaryFilters.includes(tag)
        ? state.dietaryFilters.filter((t) => t !== tag)
        : [...state.dietaryFilters, tag],
    })),

  updateItem: (id, updates) =>
    set((state) => ({
      items: state.items.map((item) =>
        item._id === id ? { ...item, ...updates } : item
      ),
    })),

  addItem: (item) =>
    set((state) => ({
      items: [...state.items, { ...item, _id: String(Date.now()) }],
    })),

  deleteItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item._id !== id),
    })),

  getFiltered: () => {
    const { items, category, search, dietaryFilters } = useMenuStore.getState();
    return items.filter((item) => {
      if (!item.available) return false;
      if (category !== 'All' && item.category !== category) return false;
      if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (dietaryFilters.length > 0 && !dietaryFilters.every((tag) => item.tags.includes(tag))) return false;
      return true;
    });
  },
}));

export default useMenuStore;
