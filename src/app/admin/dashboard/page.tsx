'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Stats {
  portfolio: number;
  services: number;
  testimonials: number;
  contact: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({ portfolio: 0, services: 0, testimonials: 0, contact: 0 });

  useEffect(() => {
    async function fetchStats() {
      const [portfolioRes, servicesRes, testimonialsRes, contactRes] = await Promise.all([
        fetch('/api/portfolio'),
        fetch('/api/services'),
        fetch('/api/testimonials'),
        fetch('/api/contact'),
      ]);
      
      const [portfolio, services, testimonials, contact] = await Promise.all([
        portfolioRes.json(),
        servicesRes.json(),
        testimonialsRes.json(),
        contactRes.json(),
      ]);

      setStats({
        portfolio: Array.isArray(portfolio) ? portfolio.length : 0,
        services: Array.isArray(services) ? services.length : 0,
        testimonials: Array.isArray(testimonials) ? testimonials.length : 0,
        contact: Array.isArray(contact) ? contact.length : 0,
      });
    }
    fetchStats();
  }, []);

  const cards = [
    { title: 'Portfolio Projects', count: stats.portfolio, href: '/admin/portfolio', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', color: 'from-red-500 to-red-700' },
    { title: 'Services', count: stats.services, href: '/admin/services', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'from-amber-500 to-amber-700' },
    { title: 'Testimonials', count: stats.testimonials, href: '/admin/testimonials', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', color: 'from-blue-500 to-blue-700' },
    { title: 'Contact Messages', count: stats.contact, href: '/admin/contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', color: 'from-emerald-500 to-emerald-700' },
    { title: 'Site Settings', count: 0, href: '/admin/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', color: 'from-violet-500 to-violet-700' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-['Playfair_Display']">Dashboard</h1>
        <p className="text-gray-400 mt-2">Welcome to your admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <Link
            key={index}
            href={card.href}
            className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 hover:border-[#C9A84C]/30 transition-all hover:-translate-y-1"
          >
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}>
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
              </svg>
            </div>
            <div className="text-3xl font-bold mb-1">{card.count}</div>
            <div className="text-gray-400 text-sm">{card.title}</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Link
          href="/admin/hero"
          className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 hover:border-[#C9A84C]/30 transition-all"
        >
          <h3 className="text-xl font-bold mb-2">Hero Section</h3>
          <p className="text-gray-400 text-sm">Edit headline, subheadline, and stats</p>
        </Link>
        
        <Link
          href="/"
          className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 hover:border-[#C9A84C]/30 transition-all"
        >
          <h3 className="text-xl font-bold mb-2">View Live Website</h3>
          <p className="text-gray-400 text-sm">Open your portfolio in a new tab</p>
        </Link>
      </div>
    </div>
  );
}