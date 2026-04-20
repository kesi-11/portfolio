'use client';

import { useEffect, useState } from 'react';
import ImageUpload from '@/components/ImageUpload';

interface HeroSettings {
  id: number;
  headline: string;
  subheadline: string;
  stat1_label: string;
  stat1_value: string;
  stat2_label: string;
  stat2_value: string;
  stat3_label: string;
  stat3_value: string;
  hero_image_url?: string;
}

export default function HeroPage() {
  const [settings, setSettings] = useState<HeroSettings>({
    id: 1,
    headline: '',
    subheadline: '',
    stat1_label: '',
    stat1_value: '',
    stat2_label: '',
    stat2_value: '',
    stat3_label: '',
    stat3_value: '',
    hero_image_url: '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    const res = await fetch('/api/hero');
    const data = await res.json();
    if (data) setSettings(data);
  }

  async function handleSave() {
    setSaving(true);
    await fetch('/api/hero', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-['Playfair_Display']">Hero Section</h1>
          <p className="text-gray-400 mt-2">Edit your homepage hero content</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-[#C9A84C] text-black font-semibold rounded-2xl hover:bg-[#E5D4A1] transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 space-y-6 max-w-2xl">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Main Headline</label>
          <input
            type="text"
            value={settings.headline}
            onChange={(e) => setSettings({ ...settings, headline: e.target.value })}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
            placeholder="Visuals That Command Attention."
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Subheadline</label>
          <textarea
            value={settings.subheadline}
            onChange={(e) => setSettings({ ...settings, subheadline: e.target.value })}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
            rows={3}
            placeholder="RichKid Graphix crafts premium brand identities..."
          />
        </div>

        <div className="border-t border-white/10 pt-6">
          <h3 className="text-lg font-bold mb-4">Statistics</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Stat 1 - Value</label>
              <input
                type="text"
                value={settings.stat1_value}
                onChange={(e) => setSettings({ ...settings, stat1_value: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
                placeholder="150+"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Stat 1 - Label</label>
              <input
                type="text"
                value={settings.stat1_label}
                onChange={(e) => setSettings({ ...settings, stat1_label: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
                placeholder="Projects Delivered"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Stat 1 - Type</label>
              <select
                value={settings.stat3_value === '5' ? 'rating' : 'number'}
                onChange={(e) => e.target.value === 'rating' 
                  ? setSettings({ ...settings, stat3_value: '5', stat3_label: 'Average Rating' })
                  : setSettings({ ...settings, stat3_value: '150+', stat3_label: 'Projects Delivered' })
                }
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
              >
                <option value="number">Number with +</option>
                <option value="rating">Star Rating</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Stat 2 - Value</label>
              <input
                type="text"
                value={settings.stat2_value}
                onChange={(e) => setSettings({ ...settings, stat2_value: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
                placeholder="80+"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Stat 2 - Label</label>
              <input
                type="text"
                value={settings.stat2_label}
                onChange={(e) => setSettings({ ...settings, stat2_label: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
                placeholder="Happy Clients"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <h3 className="text-lg font-bold mb-4">Hero Image (Replaces Gold &quot;R&quot; tile)</h3>
          <ImageUpload
            value={settings.hero_image_url || ''}
            onChange={(url) => setSettings({ ...settings, hero_image_url: url })}
          />
        </div>

        <div className="border-t border-white/10 pt-6">
          <h3 className="text-lg font-bold mb-4">Stat 3 (Rating)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Rating Value</label>
              <input
                type="text"
                value={settings.stat3_value}
                onChange={(e) => setSettings({ ...settings, stat3_value: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
                placeholder="5"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Rating Label</label>
              <input
                type="text"
                value={settings.stat3_label}
                onChange={(e) => setSettings({ ...settings, stat3_label: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
                placeholder="Average Rating"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}