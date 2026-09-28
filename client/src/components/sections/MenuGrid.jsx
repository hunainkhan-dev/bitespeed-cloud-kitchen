import { useState, useMemo, useCallback, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Flame, Leaf, Wheat, Check } from 'lucide-react';
import useMenuStore from '@/store/menuStore';
import useCartStore from '@/store/cartStore';
import { useToast } from '@/components/ui/Toast';
import { CATEGORIES, DIETARY_TAGS } from '@/lib/constants';
import { formatCurrency, throttle } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

const dietaryIcons = { Vegan: Leaf, Spicy: Flame, 'Gluten-Free': Wheat };

const MenuCard = forwardRef(function MenuCard({ item, onAdd }, ref) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAdd(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group glass-card shine-effect rounded-2xl overflow-hidden hover:glass-card-hover transition-all duration-500"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          {item.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-black/50 backdrop-blur-md text-amber border border-amber/20">
              {tag}
            </span>
          ))}
        </div>
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
          <button
            onClick={handleAdd}
            className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber to-gold text-jet flex items-center justify-center shadow-glow-strong hover:shadow-glow-intense transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {added ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          </button>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-[15px] text-alabaster group-hover:text-amber transition-colors duration-300">
          {item.name}
        </h3>
        <p className="text-[13px] text-slate-dim mt-1.5 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.04]">
          <span className="text-xl font-bold gradient-text font-heading">
            {formatCurrency(item.price)}
          </span>
          <button
            onClick={handleAdd}
            className="md:hidden flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold bg-amber/10 text-amber hover:bg-amber hover:text-jet transition-all duration-300 min-h-[44px] active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
});

export default function MenuGrid() {
  const { items, category, setCategory, search, setSearch, dietaryFilters, toggleDietary } = useMenuStore();
  const addItem = useCartStore((s) => s.addItem);
  const addToast = useToast((s) => s.addToast);

  const throttledSearch = useCallback(
    throttle((val) => setSearch(val), 200),
    []
  );

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (!item.available) return false;
      if (category !== 'All' && item.category !== category) return false;
      if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (dietaryFilters.length > 0 && !dietaryFilters.every((tag) => item.tags.includes(tag))) return false;
      return true;
    });
  }, [items, category, search, dietaryFilters]);

  const handleAdd = (item) => {
    addItem(item);
    addToast({ type: 'success', message: `${item.name} added to cart` });
  };

  return (
    <section id="menu" className="section-spacing px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-14"
      >
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-amber/70 mb-4 block">
          Curated Selection
        </span>
        <h2 className="text-4xl md:text-6xl font-extrabold font-heading tracking-[-0.04em]">
          Our <span className="gradient-text text-shadow-glow">Menu</span>
        </h2>
        <p className="text-slate-muted mt-4 max-w-md mx-auto text-base leading-relaxed">
          Every dish crafted from scratch with premium, locally-sourced ingredients
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-5 mb-12"
      >
        <div className="relative max-w-lg mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-dim" />
          <input
            type="text"
            placeholder="Search dishes..."
            onChange={(e) => throttledSearch(e.target.value)}
            className="w-full glass-card rounded-2xl pl-11 pr-4 py-3.5 text-sm text-alabaster placeholder:text-slate-dim focus:outline-none focus:border-amber/30 focus:shadow-glow transition-all duration-300 min-h-[48px]"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 min-h-[44px] ${
                category === cat
                  ? 'bg-gradient-to-br from-amber to-gold text-jet shadow-glow-strong font-semibold'
                  : 'glass-card text-slate-muted hover:text-alabaster hover:border-amber/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2">
          {DIETARY_TAGS.map((tag) => {
            const Icon = dietaryIcons[tag];
            const active = dietaryFilters.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleDietary(tag)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 min-h-[36px] ${
                  active
                    ? 'bg-amber/15 text-amber border border-amber/30 shadow-glow'
                    : 'glass-card text-slate-muted hover:text-alabaster hover:border-amber/20'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tag}
              </button>
            );
          })}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <MenuCard key={item._id} item={item} onAdd={handleAdd} />
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-slate-muted text-lg">No dishes match your filters</p>
          <button
            onClick={() => { setCategory('All'); setSearch(''); }}
            className="mt-4 text-amber text-sm font-medium hover:underline underline-offset-4"
          >
            Clear all filters
          </button>
        </motion.div>
      )}
    </section>
  );
}
