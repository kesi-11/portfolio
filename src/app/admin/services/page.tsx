'use client';

import { useEffect, useState } from 'react';

interface Service {
  id: number;
  title: string;
  price: string;
  description: string;
  features: string[];
  is_featured: boolean;
  display_order: number;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    features: '',
    is_featured: false,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    const res = await fetch('/api/services');
    const data = await res.json();
    setServices(Array.isArray(data) ? data : []);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const featuresArray = formData.features.split('\n').filter(f => f.trim());
    
    const body = editingService
      ? { ...formData, features: featuresArray, id: editingService.id }
      : { ...formData, features: featuresArray, display_order: services.length };

    const url = editingService ? '/api/services' : '/api/services';
    const method = editingService ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    setIsModalOpen(false);
    setEditingService(null);
    setFormData({ title: '', price: '', description: '', features: '', is_featured: false });
    fetchServices();
  }

  async function handleDelete(id: number) {
    if (confirm('Delete this service?')) {
      await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
      fetchServices();
    }
  }

  function openEdit(service: Service) {
    setEditingService(service);
    setFormData({
      title: service.title,
      price: service.price,
      description: service.description || '',
      features: service.features?.join('\n') || '',
      is_featured: service.is_featured,
    });
    setIsModalOpen(true);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-['Playfair_Display']">Services</h1>
          <p className="text-gray-400 mt-2">Manage your pricing packages</p>
        </div>
        <button
          onClick={() => { setIsModalOpen(true); setEditingService(null); setFormData({ title: '', price: '', description: '', features: '', is_featured: false }); }}
          className="px-6 py-3 bg-[#C9A84C] text-black font-semibold rounded-2xl hover:bg-[#E5D4A1] transition-colors"
        >
          Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className={`bg-[#0a0a0a] border rounded-3xl p-6 ${service.is_featured ? 'border-[#C9A84C]' : 'border-white/10'}`}>
            {service.is_featured && (
              <div className="bg-[#C9A84C] text-black text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                MOST POPULAR
              </div>
            )}
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <div className="text-3xl font-bold text-[#C9A84C] mb-4">{service.price}</div>
            <p className="text-gray-400 text-sm mb-4">{service.description}</p>
            {service.features && (
              <ul className="space-y-2 text-sm text-gray-400 mb-6">
                {service.features.slice(0, 3).map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-[#C9A84C]">✓</span> {f}
                  </li>
                ))}
              </ul>
            )}
            <div className="flex gap-2">
              <button onClick={() => openEdit(service)} className="flex-1 px-4 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors">
                Edit
              </button>
              <button onClick={() => handleDelete(service.id)} className="flex-1 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">{editingService ? 'Edit Service' : 'Add Service'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Price (KES)</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Features (one per line)</label>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
                  rows={4}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="w-5 h-5"
                />
                <label htmlFor="featured" className="text-sm text-gray-400">Mark as Most Popular</label>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 border border-white/20 rounded-xl hover:bg-white/5">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 bg-[#C9A84C] text-black font-semibold rounded-xl">
                  {editingService ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}