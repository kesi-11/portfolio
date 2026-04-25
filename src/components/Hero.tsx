'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const DEFAULT_STATS = [
  { target: 150, suffix: '+', label: 'Projects Delivered', isRating: false },
  { target: 80, suffix: '+', label: 'Happy Clients', isRating: false },
  { target: 5, suffix: '', label: 'Average Rating', isRating: true },
];

const DEFAULT_HEADLINE = 'Visuals Which';
const DEFAULT_HEADLINE_GOLD = 'Command Attention.';
const DEFAULT_SUBHEADLINE = 'RichKid Graphix crafts premium brand identities, poster designs, and visual systems that make your brand impossible to ignore.';

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

interface HeroSettings {
  headline?: string;
  subheadline?: string;
  hero_image_url?: string;
  hero_video_url?: string;
  stat1_label?: string;
  stat1_value?: string;
  stat2_label?: string;
  stat2_value?: string;
  stat3_label?: string;
  stat3_value?: string;
}

export default function Hero() {
  const [settings, setSettings] = useState<HeroSettings>({});

  useEffect(() => {
    fetch('/api/hero')
      .then(r => r.json())
      .then(d => { if (d) setSettings(d); })
      .catch(console.error);
  }, []);

  const headline = settings.headline || DEFAULT_HEADLINE;
  const headlineGold = settings.headline
    ? ''
    : DEFAULT_HEADLINE_GOLD;

  const stats = [
    {
      value: settings.stat1_value || `${DEFAULT_STATS[0].target}+`,
      label: settings.stat1_label || DEFAULT_STATS[0].label,
      isRating: false,
      numericTarget: parseInt((settings.stat1_value || '150').replace(/[^0-9]/g, '')) || 150,
      suffix: (settings.stat1_value || '').includes('+') ? '+' : '',
    },
    {
      value: settings.stat2_value || `${DEFAULT_STATS[1].target}+`,
      label: settings.stat2_label || DEFAULT_STATS[1].label,
      isRating: false,
      numericTarget: parseInt((settings.stat2_value || '80').replace(/[^0-9]/g, '')) || 80,
      suffix: (settings.stat2_value || '').includes('+') ? '+' : '',
    },
    {
      value: settings.stat3_value || `${DEFAULT_STATS[2].target}`,
      label: settings.stat3_label || DEFAULT_STATS[2].label,
      isRating: (settings.stat3_value || '5').length <= 2,
      numericTarget: parseInt((settings.stat3_value || '5').replace(/[^0-9]/g, '')) || 5,
      suffix: '',
    },
  ];

  let headlineLine1 = headline;
  let headlineLine2 = headlineGold;
  if (settings.headline) {
    const lastPeriodIdx = headline.lastIndexOf('.');
    if (lastPeriodIdx > 0 && lastPeriodIdx < headline.length - 1) {
      headlineLine1 = headline.substring(0, lastPeriodIdx + 1).trim();
      headlineLine2 = headline.substring(lastPeriodIdx + 1).trim();
    } else if (lastPeriodIdx === headline.length - 1) {
      const secondLastPeriod = headline.lastIndexOf('.', lastPeriodIdx - 1);
      if (secondLastPeriod > 0) {
        headlineLine1 = headline.substring(0, secondLastPeriod + 1).trim();
        headlineLine2 = headline.substring(secondLastPeriod + 1).trim();
      } else {
        headlineLine1 = headline;
        headlineLine2 = '';
      }
    } else {
      const breakIdx = headline.indexOf('\n');
      if (breakIdx > 0) {
        headlineLine1 = headline.substring(0, breakIdx).trim();
        headlineLine2 = headline.substring(breakIdx + 1).trim();
      } else {
        headlineLine1 = headline;
        headlineLine2 = '';
      }
    }
  }

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden pt-[120px] pb-16 md:pt-32">
      {/* Crystal shards background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('/images/crystal-shards-bg.webp')",
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Subtle animated highlights */}
      <div className="absolute top-[10%] right-[15%] w-[30%] h-[30%] bg-gradient-to-br from-[#C9A84C]/15 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[15%] left-[20%] w-[25%] h-[25%] bg-gradient-to-tl from-[#E5D4A1]/10 to-transparent rounded-full blur-2xl" />

      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10 w-full">
        <div className="space-y-6 md:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-[#C9A84C] text-xs font-bold tracking-widest px-4 md:px-6 py-2 md:py-3 rounded-full border border-white/10"
          >
            <span className="relative flex h-2 w-2 md:h-3 md:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A84C] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-[#C9A84C]" />
            </span>
            <span className="hidden sm:inline">AVAILABLE FOR PROJECTS</span>
            <span className="sm:hidden">AVAILABLE</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-['Playfair_Display'] leading-[1.05] text-white"
          >
            {headlineLine1}{headlineLine1 && <br />}
            {headlineLine2 && <span className="text-[#C9A84C]">{headlineLine2}</span>}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-sm md:text-xl text-gray-300 max-w-lg"
          >
            {settings.subheadline || DEFAULT_SUBHEADLINE}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-3 md:gap-4"
          >
            <a
              href="#portfolio"
              className="px-6 md:px-10 py-3 md:py-6 bg-white text-black font-semibold text-sm md:text-lg rounded-full flex items-center gap-2 md:gap-3 hover:scale-105 transition-transform hover:bg-gray-100"
            >
              VIEW PORTFOLIO
              <i className="fas fa-arrow-right" />
            </a>
            <a
              href="#pricing"
              className="px-6 md:px-10 py-3 md:py-6 border border-[#C9A84C] text-[#C9A84C] font-semibold text-sm md:text-lg rounded-full flex items-center gap-2 md:gap-3 hover:bg-[#C9A84C] hover:text-black transition-all shadow-[0_0_15px_rgba(201,168,76,0.1)]"
            >
              SEE RATES
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center gap-6 md:gap-12 pt-4 md:pt-8 flex-wrap"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-5xl font-bold text-[#C9A84C]">
                  {stat.isRating ? (
                    <span className="flex items-center gap-1">
                      {stat.numericTarget} <i className="fas fa-star text-2xl md:text-3xl" />
                    </span>
                  ) : (
                    <Counter target={stat.numericTarget} suffix={stat.suffix} />
                  )}
                </div>
                <p className="text-[10px] md:text-sm uppercase tracking-widest text-gray-400">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right visual */}
        <div className="relative hidden md:block mt-8 md:mt-0">
          <div className="absolute -top-12 -right-12 w-64 md:w-96 h-64 md:h-96 border border-[#C9A84C]/30 rounded-[4rem] rotate-12 flex items-center justify-center" />
          <div className="relative z-10 bg-white/5 backdrop-blur-3xl border border-white/10 p-4 md:p-8 rounded-3xl shadow-2xl">
            {settings.hero_video_url ? (
              <video
                src={settings.hero_video_url}
                autoPlay
                loop
                muted
                playsInline
                className="w-full aspect-square object-cover rounded-2xl shadow-xl"
              />
            ) : settings.hero_image_url ? (
              <Image
                src={settings.hero_image_url}
                alt="Hero Visual"
                width={500}
                height={500}
                className="w-full aspect-square object-cover rounded-2xl shadow-xl"
              />
            ) : (
              <div className="w-full aspect-square bg-gradient-to-br from-[#1a1a1a] to-[#050505] rounded-2xl flex items-center justify-center relative overflow-hidden">
                <video
                  src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-world-map-with-lines-and-dots-24653-large.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="relative z-10 text-center">
                  <span className="text-[#C9A84C] text-6xl md:text-[10rem] font-['Playfair_Display'] leading-none">R</span>
                  <p className="text-[10px] tracking-[4px] font-bold text-white/40 -mt-4">SHOWREEL</p>
                </div>
              </div>
            )}
            <div className="absolute -bottom-4 -right-4 bg-black text-[#C9A84C] text-xs font-bold px-4 md:px-6 py-2 md:py-3 rounded-full flex items-center gap-1 md:gap-2 shadow-xl whitespace-nowrap border border-[#C9A84C]/30">
              <i className="fas fa-play-circle" />
              {settings.hero_video_url || !settings.hero_image_url ? 'MOTION SHOWREEL 2024' : 'FEATURED DESIGN'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
