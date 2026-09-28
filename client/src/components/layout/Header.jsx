import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, UtensilsCrossed } from 'lucide-react';
import { cn } from '@/lib/utils';
import useCartStore from '@/store/cartStore';

const navLinks = [
  { to: '/', label: 'Menu' },
  { to: '/reserve', label: 'Reserve' },
  { to: '/admin', label: 'Kitchen' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const toggleCart = useCartStore((s) => s.toggleCart);
  const itemCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
        scrolled
          ? 'glass-surface shadow-elevated'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber to-gold flex items-center justify-center shadow-glow transition-shadow duration-300 group-hover:shadow-glow-strong">
              <UtensilsCrossed className="w-4.5 h-4.5 text-jet" />
            </div>
            <span className="text-xl font-bold font-heading tracking-tight">
              Bite<span className="text-amber">Speed</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 p-1 rounded-2xl glass-card">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'relative px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300',
                  location.pathname === link.to
                    ? 'text-amber'
                    : 'text-slate-muted hover:text-alabaster'
                )}
              >
                {location.pathname === link.to && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-amber/10 rounded-xl border border-amber/20"
                    transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleCart}
              className="relative p-3 rounded-xl text-slate-muted hover:text-alabaster glass-card hover:border-amber/20 transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <ShoppingBag className="w-[18px] h-[18px]" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-amber to-gold text-jet text-[10px] font-bold rounded-full flex items-center justify-center shadow-glow"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-3 rounded-xl text-slate-muted hover:text-alabaster glass-card transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              {mobileOpen ? <X className="w-[18px] h-[18px]" /> : <Menu className="w-[18px] h-[18px]" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t border-white/5"
          >
            <nav className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'block px-5 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 min-h-[44px] flex items-center',
                    location.pathname === link.to
                      ? 'text-amber bg-amber/10 border border-amber/20'
                      : 'text-slate-muted hover:text-alabaster hover:bg-white/[0.03]'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
