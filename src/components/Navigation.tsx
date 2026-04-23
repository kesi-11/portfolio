'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const navItems = [
{ name: 'About', href: '#about' },
{ name: 'Services', href: '#services' },
{ name: 'Portfolio', href: '#portfolio' },
{ name: 'Reviews', href: '#reviews' },
{ name: 'Contact', href: '#contact' },
];

export default function Navigation() {
const [scrolled, setScrolled] = useState(false);
const [mobileOpen, setMobileOpen] = useState(false);
const [logo, setLogo] = useState('');

useEffect(() => {
const handleScroll = () => setScrolled(window.scrollY > 50);
window.addEventListener('scroll', handleScroll);

// Load logo from localStorage
const loadLogo = () => {
const stored = localStorage.getItem('richkid_settings');
if (stored) {
try {
const parsed = JSON.parse(stored);
if (parsed.site_logo) {
setLogo(parsed.site_logo);
return;
}
} catch (e) {}
}

// Fallback to direct storage
const directLogo = localStorage.getItem('richkid_logo_url');
if (directLogo) {
setLogo(directLogo);
}

// Fetch from API
fetch('/api/settings')
.then(r => r.json())
.then(d => {
if(d?.site_logo) {
setLogo(d.site_logo);
if (!stored) {
localStorage.setItem('richkid_logo_url', d.site_logo);
}
}
})
.catch(console.error);
};

loadLogo();

// Listen for settings updates
const handleSettingsUpdate = (e: Event) => {
const detail = (e as CustomEvent).detail;
if (detail?.site_logo) {
setLogo(detail.site_logo);
}
};
window.addEventListener('settings-updated', handleSettingsUpdate as EventListener);

return () => {
window.removeEventListener('scroll', handleScroll);
window.removeEventListener('settings-updated', handleSettingsUpdate as EventListener);
};
}, []);

return (
<motion.nav
initial={{ y: -100 }}
animate={{ y: 0 }}
className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
scrolled ? 'bg-[#050505]/95 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
} ${scrolled ? 'py-4' : 'py-6'}`}
>
<div className="max-w-screen-2xl mx-auto px-4 md:px-8 flex items-center justify-between">
<div className="flex items-center gap-3">
{logo ? (
<div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-white">
<Image src={logo} alt="Logo" fill className="object-contain p-2" />
</div>
) : (
<div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#C9A84C] to-[#8B7355] rounded-xl flex items-center justify-center shadow-lg border border-[#C9A84C]/30 text-xl">
👑
</div>
)}
<div>
<h1 className="text-3xl font-bold font-['Playfair_Display'] tracking-[-1px] text-white">
RichKid
</h1>
<p className="text-[10px] font-bold tracking-[2px] text-[#C9A84C] -mt-1">GRAPHIX</p>
</div>
<span className="text-xs font-semibold px-3 py-1 bg-white/10 text-[#C9A84C] rounded-full hidden lg:block">
PREMIUM DESIGN STUDIO
</span>
</div>

<div className="hidden md:flex items-center gap-8 text-sm font-medium">
{navItems.map((item) => (
<a
key={item.name}
href={item.href}
className="relative text-white hover:text-[#C9A84C] transition-colors group"
>
{item.name}
<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C9A84C] transition-all group-hover:w-full" />
</a>
))}
</div>

<div className="flex items-center gap-4">
<a
href="#services"
className="px-6 py-2.5 text-sm font-semibold border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#050505] rounded-full flex items-center gap-2 transition-all"
>
<i className="fas fa-arrow-right" />
HIRE ME
</a>

<button
onClick={() => setMobileOpen(!mobileOpen)}
className="md:hidden text-2xl text-white"
>
<i className={`fas ${mobileOpen ? 'fa-times' : 'fa-bars'}`} />
</button>
</div>
</div>

{mobileOpen && (
<motion.div
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
className="md:hidden bg-[#050505] border-t border-white/10 px-8 py-6 text-sm font-medium flex flex-col gap-6"
>
{navItems.map((item) => (
<a
key={item.name}
href={item.href}
onClick={() => setMobileOpen(false)}
className="py-2 text-white hover:text-[#C9A84C] transition-colors"
>
{item.name}
</a>
))}
</motion.div>
)}
</motion.nav>
);
}
