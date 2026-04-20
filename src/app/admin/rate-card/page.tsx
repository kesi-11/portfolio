'use client';

import { useEffect, useState } from 'react';

interface RateCard {
  id: number;
  service: string;
  price: number;
  unit: string;
  display_order: number;
}

export default function RateCardPage() {
  const [items, setItems] = useState<RateCard[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<RateCard | null>(null);
  const [formData, setFormData] = useState({ service: '', price: 0, unit: '' });

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const res = await fetch('/api/rate-card');
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = editingItem ? 'PUT' : 'POST';
    const body = editingItem
      ? { ...formData, id: editingItem.id }
      : { ...formData, display_order: items.length };

    await fetch('/api/rate-card', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({ service: '', price: 0, unit: '' });
    fetchItems();
  }

  async function handleDelete(id: number) {
    if (confirm('Delete this rate?')) {
      await fetch(`/api/rate-card?id=${id}`, { method: 'DELETE' });
      fetchItems();
    }
  }

  function openEdit(item: RateCard) {
    setEditingItem(item);
    setFormData({ service: item.service, price: item.price, unit: item.unit });
    setIsModalOpen(true);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-['Playfair_Display']">Rate Card</h1>
          <p className="text-gray-400 mt-2">Manage your pricing</p>
        </div>
        <button
          onClick={() => { setIsModalOpen(true); setEditingItem(null); setFormData({ service: '', price: 0, unit: '' }); }}
          className="px-6 py-3 bg-[#C9A84C] text-black font-semibold rounded-2xl hover:bg-[#E5D4A1] transition-colors"
        >
          Add Rate
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold">{item.service}</h3>
                <p className="text-[#C9A84C] text-sm">{item.unit || 'per project'}</p>
              </div>
            </div>
            <div className="text-3xl font-bold font-['Playfair_Display'] text-white mb-4">
              KES {item.price.toLocaleString()}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => openEdit(item)}
                className="px-4 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">{editingItem ? 'Edit Rate' : 'Add Rate'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Service Name</label>
                <input
                  type="text"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Price (KES)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Unit (optional)</label>
                <input
                  type="text"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  placeholder="e.g., per project, per hour, per page"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 border border-white/20 rounded-xl hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#C9A84C] text-black font-semibold rounded-xl"
                >
                  {editingItem ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
