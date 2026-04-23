'use client';

import { useEffect, useState } from 'react';
import ImageUpload from '@/components/ImageUpload';

const LOGO_STORAGE_KEY = 'richkid_logo_url';

export default function LogoPage() {
const [logo, setLogo] = useState('');
const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);
const [saveMethod, setSaveMethod] = useState<'local' | 'database'>('local');

useEffect(() => {
fetchLogo();
}, []);

async function fetchLogo() {
setLoading(true);
if (saveMethod === 'local') {
const stored = localStorage.getItem(LOGO_STORAGE_KEY);
setLogo(stored || '');
} else {
try {
const res = await fetch('/api/settings');
const data = await res.json();
if (data?.site_logo) {
setLogo(data.site_logo);
localStorage.setItem(LOGO_STORAGE_KEY, data.site_logo);
}
} catch (error) {
console.error('Failed to fetch logo from database:', error);
}
}
setLoading(false);
}

async function handleSave() {
if (!logo) return;
setSaving(true);
try {
// Save to both localStorage keys
localStorage.setItem(LOGO_STORAGE_KEY, logo);
const settings = JSON.parse(localStorage.getItem('richkid_settings') || '{}');
settings.site_logo = logo;
localStorage.setItem('richkid_settings', JSON.stringify(settings));

// Notify all components
window.dispatchEvent(new CustomEvent('settings-updated', { detail: { site_logo: logo } }));

if (saveMethod === 'database') {
const res = await fetch('/api/settings', {
method: 'PUT',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ site_logo: logo }),
});

if (!res.ok) {
const data = await res.json();
throw new Error(data.error || 'Failed to save logo');
}
alert('Logo saved!');
} else {
alert('Logo saved!');
}
} catch (error: any) {
alert('Error: ' + error.message);
} finally {
setSaving(false);
}
}

async function handleDelete() {
if (confirm('Remove the logo?')) {
if (saveMethod === 'local') {
localStorage.removeItem(LOGO_STORAGE_KEY);
} else {
await fetch('/api/settings', {
method: 'PUT',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ site_logo: '' }),
});
localStorage.removeItem(LOGO_STORAGE_KEY);
}
setLogo('');
window.location.reload();
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
