'use client';

import { useEffect, useState } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  initials: string;
  color: string;
  text: string;
  rating: number;
  display_order: number;
}

const colors = ['bg-red-600', 'bg-amber-600', 'bg-blue-600', 'bg-emerald-600', 'bg-purple-600', 'bg-pink-600'];

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({ name: '', role: '', initials: '', color: 'bg-amber-600', text: '', rating: 5 });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    const res = await fetch('/api/testimonials');
    const data = await res.json();
    setTestimonials(Array.isArray(data) ? data : []);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    const body = editingTestimonial
      ? { ...formData, id: editingTestimonial.id }
      : { ...formData, display_order: testimonials.length };

    const url = editingTestimonial ? '/api/testimonials' : '/api/testimonials';
    const method = editingTestimonial ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    setIsModalOpen(false);
    setEditingTestimonial(null);
    setFormData({ name: '', role: '', initials: '', color: 'bg-amber-600', text: '', rating: 5 });
    fetchTestimonials();
  }

  async function handleDelete(id: number) {
    if (confirm('Delete this testimonial?')) {
      await fetch(`/api/testimonials?id=${id}`, { method: 'DELETE' });
      fetchTestimonials();
    }
  }

  function openEdit(testimonial: Testimonial) {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      initials: testimonial.initials || '',
      color: testimonial.color || 'bg-amber-600',
      text: testimonial.text,
      rating: testimonial.rating,
    });
    setIsModalOpen(true);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-['Playfair_Display']">Testimonials</h1>
          <p className="text-gray-400 mt-2">Manage client reviews</p>
        </div>
        <button
          onClick={() => { setIsModalOpen(true); setEditingTestimonial(null); setFormData({ name: '', role: '', initials: '', color: 'bg-amber-600', text: '', rating: 5 }); }}
          className="px-6 py-3 bg-[#C9A84C] text-black font-semibold rounded-2xl hover:bg-[#E5D4A1] transition-colors"
        >
          Add Review
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6">
            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} className="text-[#C9A84C]">★</span>
              ))}
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">&ldquo;{testimonial.text.length > 100 ? `${testimonial.text.slice(0, 100)}...` : testimonial.text}&rdquo;</p>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 ${testimonial.color || 'bg-amber-600'} rounded-2xl flex items-center justify-center text-xs font-bold`}>
                {testimonial.initials || testimonial.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-xs text-gray-400">{testimonial.role}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={() => openEdit(testimonial)} className="flex-1 px-4 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors">
                Edit
              </button>
              <button onClick={() => handleDelete(testimonial.id)} className="flex-1 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">{editingTestimonial ? 'Edit Review' : 'Add Review'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value, initials: e.target.value.split(' ').filter(n => n.length > 0).map(n => n[0]).join('').toUpperCase() })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
                  placeholder="CEO, Company Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Review Text</label>
                <textarea
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
                  rows={4}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className={`text-2xl ${formData.rating >= star ? 'text-[#C9A84C]' : 'text-gray-500'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Avatar Color</label>
                <div className="flex gap-2">
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
                  {editingTestimonial ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}