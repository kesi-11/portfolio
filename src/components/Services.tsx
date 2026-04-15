'use client';

import { motion } from 'framer-motion';

const services = [
  {
    title: 'Starter',
    price: 'KES 2,500',
    description: 'Perfect for quick design needs',
    features: [
      'Social Media Post Design',
      'Quick Edits & Adjustments',
      '1 Revision Round',
      '24hr Turnaround',
      'JPEG/PNG Delivery',
    ],
    featured: false,
  },
  {
    title: 'Event Package',
    price: 'KES 6,500',
    description: 'Ideal for events & promotions',
    features: [
      'Event Poster Design',
      'Banner Design',
      '3 Revision Rounds',
      '48hr Turnaround',
      'All File Formats',
      'Print-Ready Files',
    ],
    featured: true,
  },
  {
    title: 'Brand Pack',
    price: 'KES 12,000',
    description: 'Complete brand identity solution',
    features: [
      'Logo Design',
      'Brand Guidelines',
      'Business Card Design',
      'Social Media Kit',
      'Unlimited Revisions',
      'Priority Support',
      'Source Files Included',
    ],
    featured: false,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-['Playfair_Display'] mb-4">
            Services & <span className="text-[#C9A84C]">Pricing</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose the package that fits your needs. All packages include professional design and dedicated support.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative p-8 rounded-xl border transition-all duration-300 hover:transform hover:-translate-y-2 ${
                service.featured
                  ? 'bg-[#C9A84C]/10 border-[#C9A84C]'
                  : 'bg-[#0a0a0a] border-[#1a1a1a] hover:border-[#C9A84C]/50'
              }`}
            >
              {service.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C9A84C] text-[#050505] px-4 py-1 text-sm font-semibold uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold font-['Playfair_Display'] mb-2">{service.title}</h3>
                <div className="text-4xl font-bold text-[#C9A84C] mb-2">{service.price}</div>
                <p className="text-gray-500 text-sm">{service.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-gray-400">
                    <svg className="w-5 h-5 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block text-center py-3 font-semibold uppercase tracking-wider transition-colors ${
                  service.featured
                    ? 'bg-[#C9A84C] text-[#050505] hover:bg-[#E5D4A1]'
                    : 'border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/10'
                }`}
              >
                Choose Plan
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}