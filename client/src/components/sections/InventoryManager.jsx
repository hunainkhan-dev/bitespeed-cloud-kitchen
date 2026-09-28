import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit3, Trash2, Eye, EyeOff, Save, X, ImageIcon } from 'lucide-react';
import useMenuStore from '@/store/menuStore';
import { formatCurrency, cn } from '@/lib/utils';
import { CATEGORIES } from '@/lib/constants';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';

const emptyItem = {
  name: '',
  description: '',
  price: '',
  category: 'Appetizers',
  image: '',
  tags: [],
  available: true,
};

export default function InventoryManager() {
  const { items, updateItem, addItem, deleteItem } = useMenuStore();
  const addToast = useToast((s) => s.addToast);
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(emptyItem);
  const [errors, setErrors] = useState({});

  const openAdd = () => {
    setEditingItem(null);
    setForm(emptyItem);
    setErrors({});
    setIsModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item._id);
    setForm({ ...item, price: String(item.price) });
    setErrors({});
    setIsModalOpen(true);
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.description.trim()) errs.description = 'Description is required';
    const price = parseFloat(form.price);
    if (isNaN(price) || price <= 0) errs.price = 'Price must be a positive number';
    if (!form.category) errs.category = 'Category is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const data = { ...form, price: parseFloat(form.price) };

    if (editingItem) {
      updateItem(editingItem, data);
      addToast({ type: 'success', message: `${data.name} updated` });
    } else {
      addItem(data);
      addToast({ type: 'success', message: `${data.name} added to menu` });
    }
    setIsModalOpen(false);
  };

  const handleDelete = (item) => {
    deleteItem(item._id);
    addToast({ type: 'success', message: `${item.name} removed` });
  };

  const toggleAvailability = (item) => {
    updateItem(item._id, { available: !item.available });
    addToast({
      type: item.available ? 'warning' : 'success',
      message: `${item.name} marked ${item.available ? 'out of stock' : 'available'}`,
    });
  };

  const toggleTag = (tag) => {
    setForm((f) => ({
      ...f,
      tags: f.tags.includes(tag) ? f.tags.filter((t) => t !== tag) : [...f.tags, tag],
    }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-muted">{items.length} items in menu</p>
        <Button size="sm" onClick={openAdd}>
          <Plus className="w-4 h-4" />
          Add Item
        </Button>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {items.map((item, i) => (
            <motion.div
              key={item._id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20, height: 0 }}
              transition={{ duration: 0.35, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                'flex items-center gap-4 p-4 glass-card rounded-2xl transition-all duration-300',
                !item.available && 'opacity-50'
              )}
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/[0.04]">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-surface-light flex items-center justify-center">
                    <ImageIcon className="w-5 h-5 text-slate-dim" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm truncate">{item.name}</h4>
                  {!item.available && <Badge variant="error">Out of Stock</Badge>}
                </div>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-amber font-semibold text-sm">{formatCurrency(item.price)}</span>
                  <span className="text-[11px] text-slate-dim px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.04]">{item.category}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => toggleAvailability(item)}
                  className="w-11 h-11 rounded-xl glass-card flex items-center justify-center text-slate-muted hover:text-alabaster hover:border-amber/20 transition-all duration-300 active:scale-95"
                  title={item.available ? 'Mark out of stock' : 'Mark available'}
                >
                  {item.available ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => openEdit(item)}
                  className="w-11 h-11 rounded-xl glass-card flex items-center justify-center text-slate-muted hover:text-amber hover:border-amber/20 transition-all duration-300 active:scale-95"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="w-11 h-11 rounded-xl glass-card flex items-center justify-center text-slate-muted hover:text-error hover:border-error/20 transition-all duration-300 active:scale-95"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
      >
        <div className="space-y-5">
          <Input
            label="Dish Name"
            placeholder="e.g. Truffle Risotto"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            error={errors.name}
          />
          <div className="space-y-2">
            <label className="block text-xs font-semibold tracking-wide uppercase text-slate-muted">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe the dish..."
              rows={3}
              className="w-full glass-card rounded-xl px-4 py-3 text-sm text-alabaster placeholder:text-slate-dim focus:outline-none focus:border-amber/30 focus:shadow-glow transition-all duration-300 resize-none min-h-[48px]"
            />
            {errors.description && <p className="text-xs text-error font-medium">{errors.description}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price ($)"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              error={errors.price}
            />
            <div className="space-y-2">
              <label className="block text-xs font-semibold tracking-wide uppercase text-slate-muted">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full glass-card rounded-xl px-4 py-3 text-sm text-alabaster appearance-none focus:outline-none focus:border-amber/30 focus:shadow-glow transition-all duration-300 min-h-[48px]"
              >
                {CATEGORIES.filter((c) => c !== 'All').map((c) => (
                  <option key={c} value={c} className="bg-charcoal">{c}</option>
                ))}
              </select>
            </div>
          </div>
          <Input
            label="Image URL"
            placeholder="https://..."
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
          <div className="space-y-2">
            <label className="block text-xs font-semibold tracking-wide uppercase text-slate-muted">Dietary Tags</label>
            <div className="flex gap-2">
              {['Vegan', 'Spicy', 'Gluten-Free'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-300 min-h-[44px] active:scale-95',
                    form.tags.includes(tag)
                      ? 'bg-amber/15 text-amber border-amber/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]'
                      : 'glass-card text-slate-muted hover:border-amber/20 hover:text-alabaster'
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-3">
            <Button onClick={handleSave} className="flex-1">
              <Save className="w-4 h-4" />
              {editingItem ? 'Update Item' : 'Add to Menu'}
            </Button>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
