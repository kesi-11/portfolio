'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="py-12 bg-[#050505] border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-2xl font-bold font-['Playfair_Display'] text-[#C9A84C]">
            RichKid Graphix
          </div>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} RichKid Graphix. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#about" className="text-gray-400 hover:text-[#C9A84C] transition-colors text-sm">About</a>
            <a href="#services" className="text-gray-400 hover:text-[#C9A84C] transition-colors text-sm">Services</a>
            <a href="#portfolio" className="text-gray-400 hover:text-[#C9A84C] transition-colors text-sm">Portfolio</a>
            <a href="#contact" className="text-gray-400 hover:text-[#C9A84C] transition-colors text-sm">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}