'use client';

import { useEffect, useState } from 'react';
import ImageUpload from '@/components/ImageUpload';

interface SiteSettings {
  site_logo: string;
  about_text1: string;
  about_text2: string;
  about_text3: string;
  about_badge: string;
  contact_email: string;
  contact_whatsapp: string;
  about_image_url?: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    site_logo: '',
    about_text1: '',
    about_text2: '',
    about_text3: '',
    about_badge: '',
    contact_email: '',
    contact_whatsapp: '',
    about_image_url: ''
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data && typeof data === 'object') {
        setSettings(prev => ({ ...prev, ...data }));
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save settings');
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error: any) {
      alert('Error: ' + error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-['Playfair_Display']">Site Settings</h1>
          <p className="text-gray-400 mt-2">Manage your About and Contact text</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-[#C9A84C] text-black font-semibold rounded-2xl hover:bg-[#E5D4A1] transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 max-w-3xl space-y-8">
        {/* Logo Section */}
        <div>
          <h2 className="text-xl font-bold mb-4 font-['Playfair_Display'] text-[#C9A84C]">Brand Identity</h2>
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">Site Logo</label>
            <ImageUpload
              value={settings.site_logo}
              onChange={(url) => setSettings({ ...settings, site_logo: url })}
            />
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <h2 className="text-xl font-bold mb-4 font-['Playfair_Display'] text-[#C9A84C]">Contact Information</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email Address</label>
              <input
                type="text"
                value={settings.contact_email}
                onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-[#C9A84C] outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">WhatsApp Number</label>
              <input
                type="text"
                value={settings.contact_whatsapp}
                onChange={(e) => setSettings({ ...settings, contact_whatsapp: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-[#C9A84C] outline-none transition-colors"
                placeholder="+254 700 000 000"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <h2 className="text-xl font-bold mb-4 font-['Playfair_Display'] text-[#C9A84C]">About Section</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Badge Text</label>
              <input
                type="text"
                value={settings.about_badge}
                onChange={(e) => setSettings({ ...settings, about_badge: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-[#C9A84C] outline-none transition-colors"
                placeholder="GRAPHIC DESIGNER"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">About Section Image (Replaces spinning badge UI)</label>
              <ImageUpload
                value={settings.about_image_url || ''}
                onChange={(url) => setSettings({ ...settings, about_image_url: url })}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Paragraph 1</label>
              <textarea
                value={settings.about_text1}
                onChange={(e) => setSettings({ ...settings, about_text1: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-[#C9A84C] outline-none transition-colors"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Paragraph 2</label>
              <textarea
                value={settings.about_text2}
                onChange={(e) => setSettings({ ...settings, about_text2: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-[#C9A84C] outline-none transition-colors"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Paragraph 3</label>
              <textarea
                value={settings.about_text3}
                onChange={(e) => setSettings({ ...settings, about_text3: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-[#C9A84C] outline-none transition-colors"
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
