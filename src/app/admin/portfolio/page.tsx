'use client';

import { useEffect, useState } from 'react';
import ImageUpload from '@/components/ImageUpload';

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  label: string;
  color: string;
  image_url: string;
  display_order: number;
}

const colors = [
  'bg-red-900', 'bg-emerald-900', 'bg-blue-900', 'bg-amber-900', 
  'bg-purple-900', 'bg-teal-900', 'bg-pink-900', 'bg-indigo-900'
];

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [formData, setFormData] = useState({ title: '', category: '', label: '', color: 'bg-red-900', image_url: '' });

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const res = await fetch('/api/portfolio');
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const url = editingItem ? '/api/portfolio' : '/api/portfolio';
    const method = editingItem ? 'PUT' : 'POST';
    
    const body = editingItem 
      ? { ...formData, id: editingItem.id }
      : { ...formData, display_order: items.length };

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({ title: '', category: '', label: '', color: 'bg-red-900', image_url: '' });
    fetchItems();
  }

  async function handleDelete(id: number) {
    if (confirm('Delete this project?')) {
      await fetch(`/api/portfolio?id=${id}`, { method: 'DELETE' });
      fetchItems();
    }
  }

  function openEdit(item: PortfolioItem) {
    setEditingItem(item);
    setFormData({ title: item.title, category: item.category, label: item.label, color: item.color, image_url: item.image_url || '' });
    setIsModalOpen(true);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-['Playfair_Display']">Portfolio</h1>
          <p className="text-gray-400 mt-2">Manage your projects and posters</p>
        </div>
        <button
          onClick={() => { setIsModalOpen(true); setEditingItem(null); setFormData({ title: '', category: '', label: '', color: 'bg-red-900', image_url: '' }); }}
          className="px-6 py-3 bg-[#C9A84C] text-black font-semibold rounded-2xl hover:bg-[#E5D4A1] transition-colors"
        >
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden">
            {item.image_url ? (
              <img src={item.image_url} alt={item.label} className="w-full h-40 object-cover" />
            ) : (
              <div className={`h-40 ${item.color} flex items-center justify-center`}>
                <span className="text-white/30 text-6xl font-['Playfair_Display']">{item.id}</span>
              </div>
            )}
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold">{item.label}</h3>
                  <p className="text-[#C9A84C] text-sm uppercase">{item.category}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={() => openEdit(item)} className="px-4 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors">
                  Edit
                </button>
                <button onClick={() => handleDelete(item.id)} className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">{editingItem ? 'Edit Project' : 'Add Project'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Project Image</label>
                <ImageUpload
                  value={formData.image_url}
                  onChange={(url) => setFormData({ ...formData, image_url: url })}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Label</label>
                <input
                  type="text"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
                >
                  <option value="posters">Posters</option>
                  <option value="branding">Branding</option>
                  <option value="social">Social Media</option>
                  <option value="events">Events</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Fallback Color (if no image)</label>
                <div className="flex gap-2 flex-wrap">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData({ ...formData, color })}
                      className={`w-8 h-8 rounded-lg ${color} ${formData.color === color ? 'ring-2 ring-white' : ''}`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 border border-white/20 rounded-xl hover:bg-white/5">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 bg-[#C9A84C] text-black font-semibold rounded-xl">
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