'use client';

import { useEffect, useState } from 'react';
import ImageUpload from '@/components/ImageUpload';

export default function LogoPage() {
  const [logo, setLogo] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchLogo();
  }, []);

  async function fetchLogo() {
    const res = await fetch('/api/settings');
    const data = await res.json();
    if (data?.site_logo) {
      setLogo(data.site_logo);
    }
    setLoading(false);
  }

  async function handleSave() {
    if (!logo) return;
    setSaving(true);
    await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ site_logo: logo }),
    });
    setSaving(false);
    alert('Logo saved successfully!');
  }

  async function handleDelete() {
    if (confirm('Remove the logo?')) {
      setSaving(true);
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ site_logo: '' }),
      });
      setLogo('');
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-['Playfair_Display']">Site Logo</h1>
          <p className="text-gray-400 mt-2">Upload your brand logo</p>
        </div>
        <div className="flex gap-3">
          {logo && (
            <button
              onClick={handleDelete}
              disabled={saving}
              className="px-6 py-3 bg-red-500/20 text-red-400 font-semibold rounded-2xl hover:bg-red-500/30 transition-colors disabled:opacity-50"
            >
              Remove Logo
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={saving || !logo}
            className="px-6 py-3 bg-[#C9A84C] text-black font-semibold rounded-2xl hover:bg-[#E5D4A1] transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Logo'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : (
        <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 max-w-2xl">
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">
              Logo Image
            </label>
            <ImageUpload
              value={logo}
              onChange={(url) => setLogo(url)}
            />
          </div>

          {logo && (
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-2">Preview:</p>
              <div className="bg-white rounded-xl p-6 flex items-center gap-4">
                <img
                  src={logo}
                  alt="Logo preview"
                  className="h-16 w-auto object-contain"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
