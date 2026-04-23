'use client';

import { useState, useEffect } from 'react';

interface SiteSettings {
site_logo?: string;
contact_email?: string;
contact_whatsapp?: string;
about_text1?: string;
about_text2?: string;
about_text3?: string;
about_badge?: string;
about_image_url?: string;
youtube_channel?: string;
youtube_videos?: any[];
}

export function useSiteSettings() {
const [settings, setSettings] = useState<SiteSettings>({});
const [loading, setLoading] = useState(true);

useEffect(() => {
// Priority 1: localStorage (most recent)
const stored = localStorage.getItem('richkid_settings');
if (stored) {
try {
const parsed = JSON.parse(stored);
setSettings(parsed);
} catch (e) {
console.error('Failed to parse stored settings:', e);
}
}

// Priority 2: Fetch from API (database)
fetch('/api/settings')
.then(r => r.json())
.then(data => {
if (data && Object.keys(data).length > 0) {
setSettings(prev => ({ ...prev, ...data }));
// Update localStorage
localStorage.setItem('richkid_settings', JSON.stringify(data));
}
})
.catch(console.error)
.finally(() => setLoading(false));
}, []);

return { settings, loading };
}

export function updateSiteSettings(newSettings: Partial<SiteSettings>) {
// Update localStorage
const stored = localStorage.getItem('richkid_settings');
const current = stored ? JSON.parse(stored) : {};
const updated = { ...current, ...newSettings };
localStorage.setItem('richkid_settings', JSON.stringify(updated));

// Update API
fetch('/api/settings', {
method: 'PUT',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(updated),
}).catch(console.error);

// Dispatch event for other components to update
window.dispatchEvent(new CustomEvent('settings-updated', { detail: updated }));
}
