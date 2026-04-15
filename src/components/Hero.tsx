'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: '50+', label: 'Projects Completed' },
  { value: '3+', label: 'Years Experience' },
  { value: '30+', label: 'Happy Clients' },
];

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#050505] to-[#050505]" />
      
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#C9A84C]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#C9A84C]/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/30 px-4 py-2 mb-8"
          >
            <span className="w-2 h-2 bg-[#C9A84C] rounded-full animate-pulse" />
            <span className="text-[#C9A84C] text-sm uppercase tracking-wider">Available for Projects</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-['Playfair_Display'] mb-6 leading-tight"
          >
            <span className="text-[#f5f5f5]">Crafting </span>
            <span className="text-[#C9A84C]">Visual</span>
            <br />
            <span className="text-[#f5f5f5]">Stories</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-12"
          >
            Premium graphic design, brand identity & motion graphics. 
            Transforming ideas into visual masterpieces.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#portfolio"
              className="bg-[#C9A84C] text-[#050505] px-8 py-4 text-base font-semibold uppercase tracking-wider hover:bg-[#E5D4A1] transition-colors"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="border border-[#C9A84C] text-[#C9A84C] px-8 py-4 text-base font-semibold uppercase tracking-wider hover:bg-[#C9A84C]/10 transition-colors"
            >
              Get In Touch
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap justify-center gap-12 mt-20"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold font-['Playfair_Display'] text-[#C9A84C]">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-[#C9A84C]/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-[#C9A84C] rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}