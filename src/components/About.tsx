'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const skills = [
  'BRAND IDENTITY', 'POSTER DESIGN', 'TYPOGRAPHY', 'SOCIAL MEDIA', 'PACKAGING', 'MOTION GRAPHICS'
];

interface Settings {
  about_text1: string;
  about_text2: string;
  about_text3: string;
  about_badge: string;
  about_image_url?: string;
}

const DEFAULT_SETTINGS = {
  about_text1: 'RichKid Graphix is a Mombasa-based premium design studio built on the belief that every brand deserves world-class visuals — bold, intentional, and unforgettable.',
  about_text2: 'From street-level poster campaigns to high-end brand identities, I bring a sharp eye, deep craft knowledge, and a relentless pursuit of visual excellence to every project.',
  about_text3: 'I work with businesses, musicians, creatives, and entrepreneurs who understand that design is not decoration — it\'s strategy.',
  about_badge: 'GRAPHIC DESIGNER',
};

export default function About() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data) {
          // Only use API values if they have content, otherwise keep defaults
          setSettings({
            about_text1: data.about_text1 || DEFAULT_SETTINGS.about_text1,
            about_text2: data.about_text2 || DEFAULT_SETTINGS.about_text2,
            about_text3: data.about_text3 || DEFAULT_SETTINGS.about_text3,
            about_badge: data.about_badge || DEFAULT_SETTINGS.about_badge,
            about_image_url: data.about_image_url || '',
          });
        }
      })
      .catch(console.error);
  }, []);

  return (
    <section id="about" className="py-24 bg-[#050505] border-t border-white/10">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-5/12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <span className="uppercase text-xs tracking-[2px] text-[#C9A84C] font-bold">WHO I AM</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold font-['Playfair_Display'] leading-none mt-3"
            >
              Design Is Not What It<br />
              Looks Like — It&apos;s How It Works.
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 bg-gradient-to-br from-[#C9A84C]/10 to-transparent border border-[#C9A84C]/20 rounded-3xl h-96 flex items-center justify-center relative overflow-hidden"
            >
              {settings.about_image_url ? (
                <img 
                  src={settings.about_image_url} 
                  alt="About" 
                  className="w-full h-full object-cover rounded-3xl z-10"
                />
              ) : (
                <div className="text-center z-10">
                  <div className="text-7xl mb-6 animate-pulse">✺</div>
                  <div className="inline-block bg-black/70 text-[#C9A84C] text-sm font-bold px-8 py-4 rounded-2xl">{settings.about_badge}</div>
                </div>
              )}
              <div className="absolute inset-0 bg-[radial-gradient(#C9A84C_1px,transparent_1px)] bg-[length:40px_40px] opacity-10 pointer-events-none" />
            </motion.div>
          </div>

          <div className="lg:w-7/12 space-y-8 text-gray-300 leading-relaxed text-lg">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {settings.about_text1}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {settings.about_text2}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {settings.about_text3}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 pt-8"
            >
              {skills.map((skill) => (
                <span 
                  key={skill}
                  className="px-6 py-3 bg-white/5 hover:bg-[#C9A84C]/10 text-white hover:text-[#C9A84C] border border-white/10 rounded-full text-sm font-semibold transition-all cursor-pointer"
                >
                  {skill}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}