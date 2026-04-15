'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="py-12 bg-black border-t border-white/10">
      <div className="max-w-screen-2xl mx-auto px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="w-9 h-9 bg-gradient-to-br from-[#C9A84C] to-[#8B7355] rounded-2xl flex items-center justify-center">
            👑
          </div>
          <h1 className="text-3xl font-bold font-['Playfair_Display']">RichKid Graphix</h1>
        </motion.div>
        <p className="text-xs text-gray-500">PREMIUM VISUAL DESIGN STUDIO • MOMBASA, KENYA</p>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-8 mt-8 text-sm"
        >
          <a href="#" className="hover:text-[#C9A84C] transition-colors">INSTAGRAM</a>
          <a href="#" className="hover:text-[#C9A84C] transition-colors">BEHANCE</a>
          <a href="#" className="hover:text-[#C9A84C] transition-colors">LINKEDIN</a>
          <a href="#" className="hover:text-[#C9A84C] transition-colors">WHATSAPP</a>
        </motion.div>
        
        <p className="text-xs text-gray-600 mt-16">
          © {new Date().getFullYear()} RichKid Graphix. All rights reserved.
        </p>
      </div>
    </footer>
  );
}