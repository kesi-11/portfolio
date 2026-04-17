'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface Project {
  id: number;
  label: string;
  category: string;
  image_url: string;
  fallback_color: string;
  featured: boolean;
  display_order: number;
  created_at?: string;
}

const CATEGORIES = [
  'Business Cards',
  'Posters',
  'Logos',
  'Flyers',
  'Banners',
  'Social Ads',
  'Wedding',
  'Events',
  'Birthdays',
  'Movies',
  'Graphic',
  'Video',
  'Videography',
  'Photography',
  'DJ Films',
];

const FALLBACK_COLORS = [
  '#1a1a2e', '#16213e', '#0f3460', '#533483',
  '#2d6a4f', '#40916c', '#1b4332', '#6b2737',
];

const emptyForm = {
  label: '',
  category: 'Business Cards',
  fallback_color: '#1a1a2e',
  featured: false,
};

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [imageMode, setImageMode] = useState<'upload' | 'url'>('upload');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    const res = await fetch('/api/portfolio');
    const data = await res.json();
    setProjects(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function handleSubmit() {
    setError('');
    if (!formData.label.trim()) {
      setError('Please enter a project label.');
      return;
    }

    setSubmitting(true);

    try {
      let finalImageUrl = imageUrl;

      if (imageMode === 'upload' && imageFile) {
        const fd = new FormData();
        fd.append('file', imageFile);
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: fd,
        });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error || 'Upload failed');
        finalImageUrl = uploadData.url;
      }

      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          image_url: finalImageUrl,
          display_order: projects.length,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save project');

      setFormData(emptyForm);
      setImageUrl('');
      setImageFile(null);
      setImagePreview(null);
      setShowModal(false);
      await fetchProjects();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    const res = await fetch(`/api/portfolio?id=${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setDeleteId(null);
      await fetchProjects();
    }
  }

  function closeModal() {
    setShowModal(false);
    setFormData(emptyForm);
    setImageUrl('');
    setImageFile(null);
    setImagePreview(null);
    setError('');
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-['Playfair_Display']">Portfolio</h1>
          <p className="text-gray-400 mt-2">Manage your projects and posters</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-[#C9A84C] text-black font-semibold rounded-2xl hover:bg-[#E5D4A1] transition-colors"
        >
          + Add Project
        </button>
      </div>

      {loading ? (
        <div className="text-gray-500 text-center py-20">Loading...</div>
      ) : projects.length === 0 ? (
        <div className="text-gray-500 text-center py-20">
          No projects yet. Add your first one!
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative group rounded-xl overflow-hidden aspect-square"
              style={{ backgroundColor: project.fallback_color || '#1a1a2e' }}
            >
              {project.image_url && (
                <Image
                  src={project.image_url}
                  alt={project.label}
                  fill
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-3">
                <p className="text-white font-semibold text-sm text-center">
                  {project.label}
                </p>
                <span className="text-xs text-[#C9A84C] border border-[#C9A84C]/40 rounded-full px-2 py-0.5">
                  {project.category}
                </span>
                <button
                  onClick={() => setDeleteId(project.id)}
                  className="text-red-400 text-xs hover:text-red-300 mt-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold font-['Playfair_Display']">Add Project</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-500/40 text-red-400 rounded-xl px-4 py-3 mb-4 text-sm">
                {error}
              </div>
            )}

            <div className="mb-5">
              <label className="block text-sm text-gray-400 mb-2">
                Project Image
              </label>
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setImageMode('upload')}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    imageMode === 'upload'
                      ? 'bg-[#C9A84C] text-black'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  Upload File
                </button>
                <button
                  onClick={() => setImageMode('url')}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    imageMode === 'url'
                      ? 'bg-[#C9A84C] text-black'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  Use URL
                </button>
              </div>

              {imageMode === 'upload' ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="border-2 border-dashed border-[#C9A84C]/40 rounded-xl p-6 text-center cursor-pointer hover:border-[#C9A84C]/60 transition-all"
                >
                  {imagePreview ? (
                    <div className="relative w-full h-40 rounded-lg overflow-hidden">
                      <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                    </div>
                  ) : (
                    <>
                      <div className="text-3xl mb-2">📁</div>
                      <p className="text-white text-sm font-medium">
                        Click to upload image
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        or drag and drop
                      </p>
                      <p className="text-gray-600 text-xs mt-1">
                        PNG, JPG, GIF up to 10MB
                      </p>
                      <p className="text-[#C9A84C] text-xs mt-2">
                        Uploads to Cloudinary
                      </p>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              ) : (
                <input
                  type="url"
                  placeholder="https://res.cloudinary.com/..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#C9A84C]/50"
                />
              )}
            </div>

            <div className="mb-5">
              <label className="block text-sm text-gray-400 mb-2">Label</label>
              <input
                type="text"
                placeholder="e.g. Luxury Brand Identity"
                value={formData.label}
                onChange={(e) =>
                  setFormData({ ...formData, label: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#C9A84C]/50"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm text-gray-400 mb-2">
                Category
              </label>
              <div className="relative">
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  style={{ colorScheme: 'dark' }}
                  className="w-full appearance-none bg-[#1c1c1c] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C9A84C]/50 cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option
                      key={cat}
                      value={cat}
                      style={{ backgroundColor: '#1c1c1c', color: 'white' }}
                    >
                      {cat}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  ▾
                </span>
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm text-gray-400 mb-2">
                Fallback Color (if no image)
              </label>
              <div className="flex gap-2 flex-wrap">
                {FALLBACK_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() =>
                      setFormData({ ...formData, fallback_color: color })
                    }
                    className="w-8 h-8 rounded-lg border-2 transition-all"
                    style={{
                      backgroundColor: color,
                      borderColor:
                        formData.fallback_color === color
                          ? '#C9A84C'
                          : 'transparent',
                    }}
                  />
                ))}
                <input
                  type="color"
                  value={formData.fallback_color}
                  onChange={(e) =>
                    setFormData({ ...formData, fallback_color: e.target.value })
                  }
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                  title="Custom color"
                />
              </div>
            </div>

            <div className="mb-6 flex items-center gap-3">
              <button
                onClick={() =>
                  setFormData({ ...formData, featured: !formData.featured })
                }
                className={`relative w-12 h-6 rounded-full transition-all ${
                  formData.featured ? 'bg-[#C9A84C]' : 'bg-white/20'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                    formData.featured ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
              <span className="text-sm text-gray-300">Featured project</span>
            </div>

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full bg-[#C9A84C] hover:bg-[#E5D4A1] disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold py-3 rounded-xl transition-all"
            >
              {submitting ? 'Saving...' : 'Save Project'}
            </button>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 max-w-sm w-full text-center">
            <p className="text-white font-semibold mb-2">Delete this project?</p>
            <p className="text-gray-400 text-sm mb-6">
              This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2.5 rounded-xl"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}