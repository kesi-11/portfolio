'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Service {
  id: number;
  title: string;
  price: string;
  description: string;
  features: string[];
  is_featured: boolean;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [whatsappNumber, setWhatsatsappNumber] = useState('254740639494');

  useEffect(() => {
    fetchServices();
    fetchSettings();
  }, []);

  async function fetchServices() {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch services:', error);
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

  function getWhatsAppUrl(service: Service) {
    const message = encodeURIComponent(`Hello! I'm interested in your ${service.title} package (${service.price}). I'd like to request a quote.`);
    return `https://wa.me/${whatsappNumber}?text=${message}`;
  }

  if (loading) {
    return (
      <section id="services" className="py-24 bg-black border-t border-b border-white/10">
        <div className="max-w-screen-2xl mx-auto px-8 text-center text-gray-400">
          Loading...
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return (
      <section id="services" className="py-24 bg-black border-t border-b border-white/10">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="relative mb-12">
            <span className="uppercase text-xs tracking-[2px] text-[#C9A84C] font-bold">RATE CARD</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold font-['Playfair_Display'] mt-4 mb-12">
            Add services in the admin panel
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-24 bg-black border-t border-b border-white/10">
      <div className="max-w-screen-2xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative mb-12"
        >
          <span className="uppercase text-xs tracking-[2px] text-[#C9A84C] font-bold">RATE CARD</span>
          <div className="absolute w-16 h-0.5 bg-gradient-to-r from-[#C9A84C] to-transparent bottom-[-8px]" />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-bold font-['Playfair_Display'] mt-4 mb-12"
        >
          Investment in Design<br />That Pays for Itself.
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative p-8 rounded-3xl border flex flex-col transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(201,168,76,0.25)] ${
                service.is_featured
                  ? 'bg-gradient-to-br from-[#C9A84C] to-[#E5D4A1] text-black'
                  : 'bg-white/5 border-white/10 hover:border-[#C9A84C]/30'
              }`}
            >
              {service.is_featured && (
                <div className="absolute -top-3 right-8 bg-black text-[#C9A84C] text-xs font-bold px-5 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-widest">{service.title}</span>
                <div className={`text-7xl font-bold mt-2 ${service.is_featured ? 'text-black' : 'text-[#C9A84C]'}`}>
                  {service.price}
                </div>
                <p className={`text-sm mt-2 ${service.is_featured ? 'opacity-70' : 'text-gray-400'}`}>
                  {service.title.toLowerCase().includes('brand') ? '/pack' : service.title.toLowerCase().includes('event') ? '/campaign' : '/project'}
                </p>
              </div>

              <p className={`mb-8 ${service.is_featured ? 'text-black/80' : 'text-gray-400'}`}>
                {service.description}
              </p>

              <ul className={`space-y-4 text-sm mt-auto pt-10 ${service.is_featured ? 'text-black/80' : 'text-gray-400'}`}>
                {(service.features || []).map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <svg className={`w-5 h-5 ${service.is_featured ? 'text-black' : 'text-[#C9A84C]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={getWhatsAppUrl(service)}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-12 w-full py-6 font-bold rounded-full text-lg transition-transform hover:scale-105 flex items-center justify-center gap-2 ${
                  service.is_featured
                    ? 'bg-black text-white hover:bg-gray-900'
                    : 'bg-white text-black hover:bg-gray-200'
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
          className="text-center text-sm text-gray-400 mt-12"
        >
          Custom pricing available for retainer agreements and large-scale projects.{' '}
          <a href="#contact" className="text-[#C9A84C] underline">Let&apos;s talk →</a>
        </motion.p>
      </div>
    </section>
  );
}
