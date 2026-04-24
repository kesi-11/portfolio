'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Rate {
  id: number;
  service: string;
  price: number;
  unit: string;
}

// Fallback packages shown when no rate_card entries exist in the database
const fallbackPackages = [
  {
    id: 1,
    title: 'Essential Brand Identity',
    price: 'KES 15,000',
    unit: 'Project',
    description: 'Perfect for startups and small businesses aiming for a professional look.',
    features: [
      'Primary & Secondary Logo',
      'Color Palette (HEX, RGB, CMYK)',
      'Typography Selection',
      'Basic Brand Guidelines (PDF)',
      '3 Revisions'
    ],
    is_featured: false,
  },
  {
    id: 2,
    title: 'Event / Campaign Pack',
    price: 'KES 25,000',
    unit: 'Campaign',
    description: 'A complete graphic booster pack for promoters, DJs, and event organizers.',
    features: [
      'Main Event Poster Design',
      '3 Social Media Variations (IG, FB, X)',
      'Digital Banner / Header',
      'Print-ready Flyer Format',
      'High Priority Delivery'
    ],
    is_featured: true,
  },
  {
    id: 3,
    title: 'Premium Retainer',
    price: 'KES 45,000',
    unit: 'Month',
    description: 'On-demand design team equivalent for retained clients and corporate brands.',
    features: [
      'Up to 15 Designs per month',
      'Posters, Menus & Social Content',
      'Print-Ready Layouts (Large Format)',
      'Priority 24h Turnaround',
      'Unlimited Revisions'
    ],
    is_featured: false,
  }
];

export default function RateCard() {
  const [rates, setRates] = useState<Rate[]>([]);
  const [loading, setLoading] = useState(true);
  const [whatsappNumber, setWhatsatsappNumber] = useState('254740639494');

  useEffect(() => {
    fetchRates();
    fetchSettings();
  }, []);

  async function fetchRates() {
    try {
      const res = await fetch('/api/rate-card');
      const data = await res.json();
      setRates(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch rates:', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchSettings() {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data?.contact_whatsapp) {
        setWhatsatsappNumber(data.contact_whatsapp.replace(/\D/g, ''));
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    }
  }

  function getWhatsAppUrl(serviceName: string, price: string) {
    const message = encodeURIComponent(`Hello! I'm interested in your ${serviceName} service (${price}). I'd like to request a quote.`);
    return `https://wa.me/${whatsappNumber}?text=${message}`;
  }

  // If there are database rate_card entries, show them as a simple list
  if (rates.length > 0) {
    return (
      <section id="pricing" className="py-16 md:py-24 bg-[#050505]">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-20"
          >
            <span className="uppercase text-xs tracking-[2px] text-[#C9A84C] font-bold">PRICING</span>
            <h2 className="text-4xl md:text-6xl font-bold font-['Playfair_Display'] mt-4 text-white">
              Transparent Pricing
            </h2>
            <p className="text-sm md:text-gray-400 mt-4 max-w-2xl mx-auto">
              Professional design services at competitive rates. Custom packages available for larger projects.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {rates.map((rate) => (
              <motion.div
                key={rate.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#111] border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-8 hover:border-[#C9A84C]/30 transition-colors"
              >
                <h3 className="text-lg md:text-xl font-bold mb-3">{rate.service}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl md:text-4xl font-bold font-['Playfair_Display'] text-[#C9A84C]">
                    KES {rate.price.toLocaleString()}
                  </span>
                  {rate.unit && (
                    <span className="text-gray-500 text-xs md:text-sm">/{rate.unit.toLowerCase()}</span>
                  )}
                </div>
                <a
                  href={getWhatsAppUrl(rate.service, `KES ${rate.price.toLocaleString()}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A84C] text-black font-semibold rounded-xl hover:bg-[#E5D4A1] transition-colors text-sm mt-2"
                >
                  <i className="fab fa-whatsapp" />
                  REQUEST QUOTE
                </a>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8 md:mt-12 px-4"
          >
            <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base">
              Need a custom package? Let&apos;s discuss your project.
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello! I need a custom design package. Can we discuss?')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-[#C9A84C] text-black font-semibold rounded-2xl hover:bg-[#E5D4A1] transition-colors text-sm md:text-base"
            >
              <i className="fab fa-whatsapp" />
              Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  // Fallback: show styled package cards when no rate_card entries exist
  return (
    <section id="pricing" className="py-16 md:py-24 bg-[#050505]">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="uppercase text-xs tracking-[2px] text-[#C9A84C] font-bold">RATE CARD</span>
          <h2 className="text-4xl md:text-6xl font-bold font-['Playfair_Display'] mt-4 text-white">
            Investment in Quality.
          </h2>
          <p className="text-sm md:text-gray-400 mt-4 max-w-2xl mx-auto">
            Professional freelance design services tailored for the Kenyan market. Clear, upfront pricing with no hidden costs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {fallbackPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative p-8 md:p-10 rounded-[2rem] border flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(201,168,76,0.3)] ${
                pkg.is_featured
                  ? 'bg-gradient-to-br from-[#1a1508] to-[#0a0a0a] border-[#C9A84C]/50 text-white'
                  : 'bg-white/5 border-white/10 hover:border-[#C9A84C]/30 text-gray-300'
              }`}
            >
              {pkg.is_featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#C9A84C] to-[#E5D4A1] text-black text-xs font-bold px-6 py-2 rounded-full shadow-lg whitespace-nowrap">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-8 mt-2">
                <span className={`text-xs font-bold uppercase tracking-[2px] ${pkg.is_featured ? 'text-[#E5D4A1]' : 'text-gray-400'}`}>
                  {pkg.title}
                </span>
                <div className="flex items-baseline gap-2 mt-4">
                  <span className={`text-3xl md:text-5xl font-bold font-['Playfair_Display'] ${pkg.is_featured ? 'text-[#C9A84C]' : 'text-white'}`}>
                    {pkg.price}
                  </span>
                  <span className="text-xs uppercase font-bold opacity-60">/{pkg.unit}</span>
                </div>
                <p className="text-sm mt-6 leading-relaxed opacity-80 min-h-[40px]">
                  {pkg.description}
                </p>
              </div>

              <ul className="space-y-4 text-sm mt-auto border-t border-white/10 pt-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className={`w-5 h-5 flex-shrink-0 ${pkg.is_featured ? 'text-[#C9A84C]' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={getWhatsAppUrl(pkg.title, pkg.price)}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-10 w-full py-4 text-center font-bold text-sm tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 ${
                  pkg.is_featured
                    ? 'bg-[#C9A84C] text-black hover:bg-[#E5D4A1] hover:scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <i className="fab fa-whatsapp" />
                REQUEST QUOTE
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-500 mt-16 max-w-lg mx-auto"
        >
          Have a unique requirement? <a href="#contact" className="text-[#C9A84C] underline hover:text-[#E5D4A1] transition-colors">Let&apos;s build a custom package.</a>
        </motion.p>
      </div>
    </section>
  );
}
