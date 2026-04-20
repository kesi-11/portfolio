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
          className="flex justify-center gap-8 mt-8"
        >
          <a href="https://www.instagram.com/richkidgraphics254?igsh=MWVkZHM5MGNzNTl0aw==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#C9A84C] transition-colors text-2xl" aria-label="Instagram">
            <i className="fab fa-instagram" />
          </a>
          <a href="https://youtube.com/@richkidfilmproduction?si=aGW4-Inp5uo6OMzO" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#C9A84C] transition-colors text-2xl" aria-label="YouTube">
            <i className="fab fa-youtube" />
          </a>
          <a href="https://www.tiktok.com/@richkid.graphics?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#C9A84C] transition-colors text-2xl" aria-label="TikTok">
            <i className="fab fa-tiktok" />
          </a>
          <a href="https://x.com/YOUNGRichkid254" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#C9A84C] transition-colors text-2xl" aria-label="X (Twitter)">
            <i className="fab fa-x-twitter" />
          </a>
          <a href="https://www.facebook.com/share/18TsAExZSC/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#C9A84C] transition-colors text-2xl" aria-label="Facebook">
            <i className="fab fa-facebook" />
          </a>
        </motion.div>
        
        <p className="text-xs text-gray-600 mt-16">
          © {new Date().getFullYear()} RichKid Graphix. All rights reserved.
        </p>
      </div>
    </footer>
  );
}