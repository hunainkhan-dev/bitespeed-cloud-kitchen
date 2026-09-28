import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import useCartStore from '@/store/cartStore';
import { formatCurrency } from '@/lib/utils';
import { TAX_RATE, DELIVERY_FEE } from '@/lib/constants';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import useOrderStore from '@/store/orderStore';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, clearCart } = useCartStore();
  const addOrder = useOrderStore((s) => s.addOrder);
  const addToast = useToast((s) => s.addToast);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal > 0 ? subtotal + tax + DELIVERY_FEE : 0;

  const handleCheckout = () => {
    if (items.length === 0) return;
    addOrder({
      items: items.map((i) => ({
        menuItem: { name: i.name, price: i.price },
        quantity: i.quantity,
      })),
      status: 'Pending',
      total,
      customerName: 'Walk-in Customer',
      customerPhone: '—',
      deliveryAddress: 'Delivery',
    });
    clearCart();
    closeCart();
    addToast({ type: 'success', message: 'Order placed! Your food is being prepared.' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={closeCart}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 flex flex-col"
            style={{
              background: 'linear-gradient(180deg, #0e0e0e 0%, #0a0a0a 100%)',
              borderLeft: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber/20 to-gold/10 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-amber" />
                </div>
                <div>
                  <h2 className="text-lg font-bold font-heading">Your Order</h2>
                  <p className="text-xs text-slate-dim">{items.length} item{items.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <button onClick={closeCart} className="p-3 rounded-xl text-slate-muted hover:text-alabaster hover:bg-white/[0.04] transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {items.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center mx-auto mb-5">
                    <ShoppingBag className="w-7 h-7 text-slate-dim" />
                  </div>
                  <p className="text-slate-muted font-medium">Your cart is empty</p>
                  <p className="text-sm text-slate-dim mt-1.5">Add some delicious items from the menu</p>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item._id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      className="flex gap-4 p-3.5 rounded-xl glass-card"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-[72px] h-[72px] rounded-lg object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate text-alabaster">{item.name}</h4>
                        <p className="text-amber font-bold text-sm mt-1 font-heading">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                        <div className="flex items-center gap-2 mt-2.5">
                          <div className="flex items-center rounded-lg border border-white/[0.06] overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-slate-muted hover:text-alabaster hover:bg-white/[0.04] transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-semibold w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-slate-muted hover:text-alabaster hover:bg-white/[0.04] transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item._id)}
                            className="ml-auto p-2 text-slate-dim hover:text-error transition-colors rounded-lg hover:bg-error/10"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-white/[0.06] space-y-4">
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between text-slate-muted">
                    <span>Subtotal</span>
                    <span className="text-alabaster">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-slate-muted">
                    <span>Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
                    <span className="text-alabaster">{formatCurrency(tax)}</span>
                  </div>
                  <div className="flex justify-between text-slate-muted">
                    <span>Delivery Fee</span>
                    <span className="text-alabaster">{formatCurrency(DELIVERY_FEE)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-3 border-t border-white/[0.06]">
                    <span className="font-heading">Total</span>
                    <span className="gradient-text font-heading">{formatCurrency(total)}</span>
                  </div>
                </div>
                <Button className="w-full group" size="lg" onClick={handleCheckout}>
                  Place Order
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
