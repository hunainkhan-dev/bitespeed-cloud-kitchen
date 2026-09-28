import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronRight, User, MapPin, Phone, Flame, CheckCircle2 } from 'lucide-react';
import useOrderStore from '@/store/orderStore';
import { ORDER_STATUSES } from '@/lib/constants';
import { formatCurrency, cn } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

const statusConfig = {
  Pending: { variant: 'warning', glow: 'shadow-[0_0_20px_rgba(234,179,8,0.08)]' },
  Preparing: { variant: 'info', glow: 'shadow-[0_0_20px_rgba(59,130,246,0.08)]' },
  Completed: { variant: 'success', glow: 'shadow-[0_0_20px_rgba(34,197,94,0.08)]' },
};

export default function KitchenQueue() {
  const { orders, updateStatus } = useOrderStore();
  const addToast = useToast((s) => s.addToast);

  const sorted = useMemo(
    () => [...orders].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)),
    [orders]
  );

  const activeCount = orders.filter((o) => o.status !== 'Completed').length;

  const advance = (id, currentStatus) => {
    const idx = ORDER_STATUSES.indexOf(currentStatus);
    if (idx < ORDER_STATUSES.length - 1) {
      const next = ORDER_STATUSES[idx + 1];
      updateStatus(id, next);
      addToast({ type: 'success', message: `Order moved to ${next}` });
    }
  };

  const timeAgo = (date) => {
    const mins = Math.floor((Date.now() - new Date(date).getTime()) / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    return `${Math.floor(mins / 60)}h ${mins % 60}m ago`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-card">
          <Flame className="w-3.5 h-3.5 text-amber" />
          <span className="text-xs font-semibold text-amber">{activeCount} active</span>
        </div>
        <span className="text-xs text-slate-dim">{orders.length} total orders</span>
      </div>

      {sorted.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center mx-auto mb-5">
            <Clock className="w-7 h-7 text-slate-dim" />
          </div>
          <p className="text-slate-muted font-medium">No orders yet</p>
          <p className="text-xs text-slate-dim mt-1">Orders will appear here in real-time</p>
        </div>
      ) : (
        <AnimatePresence>
          {sorted.map((order, i) => (
            <motion.div
              key={order._id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                'glass-card rounded-2xl p-5 md:p-6 transition-shadow duration-500',
                statusConfig[order.status]?.glow,
                order.status === 'Completed' && 'opacity-60'
              )}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <Badge variant={statusConfig[order.status]?.variant}>{order.status}</Badge>
                  <span className="text-[11px] text-slate-dim flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    {timeAgo(order.createdAt)}
                  </span>
                </div>
                <span className="text-xl font-bold gradient-text font-heading">{formatCurrency(order.total)}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                {[
                  { icon: User, text: order.customerName },
                  { icon: Phone, text: order.customerPhone },
                  { icon: MapPin, text: order.deliveryAddress },
                ].map(({ icon: Icon, text }, j) => (
                  <div key={j} className="flex items-center gap-2 text-sm text-slate-muted">
                    <Icon className="w-3.5 h-3.5 text-slate-dim shrink-0" />
                    <span className="truncate">{text}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-5 p-4 rounded-xl bg-deep/50 border border-white/[0.03]">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-slate-muted">
                      <span className="text-amber font-medium">{item.quantity}×</span> {item.menuItem.name}
                    </span>
                    <span className="text-alabaster font-medium">
                      {formatCurrency(item.menuItem.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {order.status !== 'Completed' ? (
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    onClick={() => advance(order._id, order.status)}
                    className="group"
                  >
                    {order.status === 'Pending' ? 'Start Preparing' : 'Mark Completed'}
                    <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-end gap-2 text-success text-xs font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  Order Complete
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
}
