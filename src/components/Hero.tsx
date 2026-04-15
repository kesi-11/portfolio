'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const stats = [
  { target: 150, suffix: '+', label: 'Projects Delivered' },
  { target: 80, suffix: '+', label: 'Happy Clients' },
  { target: 5, suffix: '', label: 'Average Rating' },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    const duration = 2000;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = end / steps;
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}{suffix}</span>;
}

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden bg-[#050505] pt-24 pb-20 md:pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#111111_70%)]" />
      
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#C9A84C]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#C9A84C]/3 rounded-full blur-3xl" />

      <div className="max-w-screen-2xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center relative z-10 w-full">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 text-[#C9A84C] text-xs font-bold tracking-widest px-6 py-3 rounded-full"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A84C] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C9A84C]" />
            </span>
            AVAILABLE FOR PROJECTS
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold font-['Playfair_Display'] leading-[1.05]"
          >
            Visuals That<br />
            <span className="text-[#C9A84C]">Command Attention.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-400 max-w-lg"
          >
            RichKid Graphix crafts premium brand identities, poster designs, 
            and visual systems that make your brand impossible to ignore.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#portfolio"
              className="px-10 py-6 bg-white text-black font-semibold text-lg rounded-full flex items-center gap-3 hover:scale-105 transition-transform"
            >
              VIEW PORTFOLIO
              <i className="fas fa-arrow-right" />
            </a>
            <a
              href="#services"
              className="px-10 py-6 border border-[#C9A84C] text-[#C9A84C] font-semibold text-lg rounded-full flex items-center gap-3 hover:bg-[#C9A84C] hover:text-black transition-all"
            >
              SEE RATES
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center gap-12 pt-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-[#C9A84C]">
                  {index === 2 ? (
                    <span className="flex items-center gap-1">
                      5 <i className="fas fa-star text-3xl" />
                    </span>
                  ) : (
                    <Counter target={stat.target} suffix={stat.suffix} />
                  )}
                </div>
                <p className="text-sm uppercase tracking-widest text-gray-400">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right visual */}
        <div className="relative hidden md:block">
          <div className="absolute -top-12 -right-12 w-96 h-96 border border-[#C9A84C]/30 rounded-[4rem] rotate-12 flex items-center justify-center">
            <div className="w-80 h-80 bg-gradient-to-br from-[#C9A84C]/10 to-transparent rounded-3xl flex items-center justify-center backdrop-blur-xl">
              <div className="text-center">
                <div className="text-8xl mb-6">👑</div>
                <p className="text-[#C9A84C] text-2xl font-['Playfair_Display']">RICH KID</p>
                <p className="text-white text-5xl font-bold tracking-[-2px]">GRAPHIX</p>
              </div>
            </div>
          </div>
          <div className="relative z-10 bg-white/5 backdrop-blur-3xl border border-white/10 p-8 rounded-3xl shadow-2xl">
            <div className="w-full aspect-square bg-gradient-to-br from-[#1a1a1a] to-[#050505] rounded-2xl flex items-center justify-center">
              <span className="text-[#C9A84C]/30 text-[10rem] font-['Playfair_Display']">R</span>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-black text-[#C9A84C] text-xs font-bold px-6 py-3 rounded-full flex items-center gap-2 shadow-xl">
              <i className="fas fa-fire" />
              LIVE ANIMATION PREVIEW
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}