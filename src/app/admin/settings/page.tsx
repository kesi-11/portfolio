'use client';

import { useEffect, useState } from 'react';
import ImageUpload from '@/components/ImageUpload';

function extractVideoId(url: string): string {
const patterns = [
/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
/youtube\.com\/shorts\/([^&\n?#]+)/
];
for (const pattern of patterns) {
const match = url.match(pattern);
if (match) return match[1];
}
return '';
}

interface SiteSettings {
site_logo?: string;
about_text1: string;
about_text2: string;
about_text3: string;
about_badge: string;
contact_email: string;
contact_whatsapp: string;
about_image_url?: string;
youtube_channel?: string;
youtube_videos?: { id: string; title: string; url: string; thumbnail: string }[];
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
about_image_url: '',
youtube_channel: '',
youtube_videos: []
});
const [saving, setSaving] = useState(false);
const [saved, setSaved] = useState(false);
const [error, setError] = useState('');
const [loading, setLoading] = useState(true);

useEffect(() => {
fetchSettings();
}, []);

async function fetchSettings() {
setLoading(true);
try {
// Check localStorage first
const storedSettings = localStorage.getItem('richkid_settings');
if (storedSettings) {
const parsed = JSON.parse(storedSettings);
setSettings(prev => ({ ...prev, ...parsed }));
}

// Try database
const res = await fetch('/api/settings');
if (!res.ok) {
throw new Error('Failed to load settings');
}
const data = await res.json();
if (data && typeof data === 'object' && Object.keys(data).length > 0) {
setSettings(prev => ({ ...prev, ...data }));
localStorage.setItem('richkid_settings', JSON.stringify(data));
}
setError('');
} catch (err: any) {
console.error('Settings error:', err);
setError('Note: Using local storage. Run SQL migration to enable database storage.');
}
setLoading(false);
}

async function handleSave() {
setSaving(true);
try {
// Save to localStorage
      localStorage.setItem('richkid_settings', JSON.stringify(settings));

      const res = await fetch('/api/settings', {
method: 'PUT',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(settings)
});

      const result = await res.json();

      if (!res.ok) {
        console.warn('Database save failed:', result.error);
      }

      // Notify all components to update
window.dispatchEvent(new CustomEvent('settings-updated', { detail: settings }));

setSaved(true);
setTimeout(() => setSaved(false), 2000);
} catch (error: any) {
alert('Saved locally! Database error: ' + error.message);
} finally {
setSaving(false);
}
}

if (loading) {
return (
<div className="text-gray-400">Loading settings...</div>
);
}

return (
<div>
{error && (
<div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 p-4 rounded-xl mb-6">
{error}
</div>
)}

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
value={settings.site_logo || ''}
onChange={(url) => setSettings({ ...settings, site_logo: url })}
/>
</div>
</div>

{/* Contact Info */}
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

{/* About Section */}
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
<label className="block text-sm text-gray-400 mb-2">About Section Image</label>
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

{/* YouTube Section */}
<div className="border-t border-white/10 pt-8">
<h2 className="text-xl font-bold mb-4 font-['Playfair_Display'] text-[#C9A84C]">YouTube Channel</h2>
<p className="text-gray-400 text-sm mb-6">Add your YouTube channel to showcase your films and video content.</p>

<div className="space-y-6">
<div>
<label className="block text-sm text-gray-400 mb-2">Channel URL</label>
<input
type="url"
value={settings.youtube_channel || ''}
onChange={(e) => setSettings({ ...settings, youtube_channel: e.target.value })}
className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-[#C9A84C] outline-none transition-colors"
placeholder="https://youtube.com/@yourchannel"
/>
</div>

  <div>
    <label className="block text-sm text-gray-400 mb-3">Featured Videos (paste YouTube video URLs)</label>
    <div className="space-y-3">
      {settings.youtube_videos?.map((video, index) => (
        <div key={index} className="flex items-start gap-3">
          <div className="flex-1">
            <input
              type="url"
              value={video.url || ''}
              onChange={(e) => {
                const videos = settings.youtube_videos || [];
                const videoId = extractVideoId(e.target.value);
                videos[index] = {
                  id: videoId || '',
                  title: `Video ${index + 1}`,
                  url: e.target.value,
                  thumbnail: videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : ''
                };
                setSettings({ ...settings, youtube_videos: [...videos] });
              }}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-[#C9A84C] outline-none transition-colors mb-2"
              placeholder={`YouTube Video ${index + 1} URL`}
            />
            {video.url && (
              <img
                src={`https://img.youtube.com/vi/${extractVideoId(video.url)}/mqdefault.jpg`}
                alt={`Video ${index + 1} thumbnail`}
                className="w-full max-w-xs rounded-lg"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            )}
          </div>
          <button
            onClick={() => {
              const videos = settings.youtube_videos || [];
              videos.splice(index, 1);
              setSettings({ ...settings, youtube_videos: [...videos] });
            }}
            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
            title="Remove video"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ))}
      
      <button
        onClick={() => {
          const videos = settings.youtube_videos || [];
          videos.push({ id: '', title: `Video ${videos.length + 1}`, url: '', thumbnail: '' });
          setSettings({ ...settings, youtube_videos: [...videos] });
        }}
        className="w-full py-3 border-2 border-dashed border-white/20 rounded-xl text-gray-400 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Add Video
      </button>
    </div>
  </div>
</div>
</div>
</div>
</div>
);
}