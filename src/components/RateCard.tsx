'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Rate {
  id: number;
  service: string;
  price: number;
  unit: string;
}

export default function RateCard() {
  const [rates, setRates] = useState<Rate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/rate-card')
      .then((res) => res.json())
      .then((data) => {
        setRates(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="pricing" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-screen-2xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="uppercase text-xs tracking-[2px] text-[#C9A84C] font-bold">PRICING</span>
          <h2 className="text-5xl md:text-6xl font-bold font-['Playfair_Display'] mt-4 text-white">
            Transparent Pricing
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Professional design services at competitive rates. Custom packages available for larger projects.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading rates...</div>
        ) : rates.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            Contact us for custom pricing
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rates.map((rate) => (
              <motion.div
                key={rate.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#111] border border-white/10 rounded-3xl p-8 hover:border-[#C9A84C]/30 transition-colors"
              >
                <h3 className="text-xl font-bold mb-2">{rate.service}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold font-['Playfair_Display'] text-[#C9A84C]">
                    KES {rate.price.toLocaleString()}
                  </span>
                  {rate.unit && (
                    <span className="text-gray-500 text-sm">/{rate.unit.toLowerCase()}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-6">
            Need a custom package? Let&apos;s discuss your project.
          </p>
          <a
            href="https://wa.me/254740639494"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] text-black font-semibold rounded-2xl hover:bg-[#E5D4A1] transition-colors"
          >
            <i className="fab fa-whatsapp" />
            Chat on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
