import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Package, ClipboardList, Lock, Shield } from 'lucide-react';
import KitchenQueue from '@/components/sections/KitchenQueue';
import InventoryManager from '@/components/sections/InventoryManager';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { ADMIN_KEY } from '@/lib/constants';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'queue', label: 'Kitchen Queue', icon: ClipboardList },
  { id: 'inventory', label: 'Inventory', icon: Package },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('queue');
  const [authenticated, setAuthenticated] = useState(false);
  const [keyInput, setKeyInput] = useState('');
  const [keyError, setKeyError] = useState('');

  useEffect(() => {
    document.title = 'BiteSpeed — Kitchen Staff';
    const stored = sessionStorage.getItem('bs-admin');
    if (stored === 'true') setAuthenticated(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (keyInput === ADMIN_KEY) {
      setAuthenticated(true);
      sessionStorage.setItem('bs-admin', 'true');
      setKeyError('');
    } else {
      setKeyError('Invalid staff key');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-[80dvh] flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-amber/10 border border-amber/20 flex items-center justify-center mx-auto mb-5">
              <Shield className="w-8 h-8 text-amber" />
            </div>
            <h2 className="text-2xl font-bold font-heading">Staff Access</h2>
            <p className="text-sm text-slate-dim mt-2">Enter your kitchen staff key to continue</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <Input type="password" placeholder="Enter staff key" value={keyInput} onChange={(e) => setKeyInput(e.target.value)} error={keyError} icon={Lock} autoComplete="off" />
            <Button type="submit" className="w-full">Access Kitchen Portal</Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="section-spacing px-4 md:px-8 max-w-7xl mx-auto" style={{ paddingTop: '2rem' }}>
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber/20 to-gold/10 flex items-center justify-center">
          <ChefHat className="w-6 h-6 text-amber" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">Kitchen Dashboard</h1>
          <p className="text-xs text-slate-dim mt-0.5">Manage orders and inventory</p>
        </div>
      </div>

      <div className="flex gap-2 mb-8 p-1 glass-card rounded-2xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'relative flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300 min-h-[44px]',
              activeTab === tab.id
                ? 'text-amber'
                : 'text-slate-muted hover:text-alabaster'
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="admin-tab"
                className="absolute inset-0 bg-amber/10 rounded-xl border border-amber/20"
                transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
              />
            )}
            <tab.icon className="w-4 h-4 relative z-10" />
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {activeTab === 'queue' ? <KitchenQueue /> : <InventoryManager />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
