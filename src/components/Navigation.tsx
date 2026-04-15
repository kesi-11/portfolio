'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#050505]/95 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
      } ${scrolled ? 'py-4' : 'py-6'}`}
    >
      <div className="max-w-screen-2xl mx-auto px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-[#C9A84C] to-[#8B7355] rounded-2xl flex items-center justify-center shadow-lg">
            👑
          </div>
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

        {/* Desktop Menu */}
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
          
          {/* Mobile Hamburger */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            className="md:hidden text-2xl text-white"
          >
            <i className={`fas ${mobileOpen ? 'fa-times' : 'fa-bars'}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
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
      </AnimatePresence>
    </motion.nav>
  );
}