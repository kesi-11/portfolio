'use client';

import { motion } from 'framer-motion';

const skills = [
  'BRAND IDENTITY', 'POSTER DESIGN', 'TYPOGRAPHY', 'SOCIAL MEDIA', 'PACKAGING', 'MOTION GRAPHICS'
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#050505] border-t border-white/10">
      <div className="max-w-screen-2xl mx-auto px-8">
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
              <div className="text-center">
                <div className="text-7xl mb-6 animate-pulse">✺</div>
                <div className="inline-block bg-black/70 text-[#C9A84C] text-sm font-bold px-8 py-4 rounded-2xl">GRAPHIC DESIGNER</div>
              </div>
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
              RichKid Graphix is a Mombasa-based premium design studio built on the belief that every brand deserves world-class visuals — bold, intentional, and unforgettable.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              From street-level poster campaigns to high-end brand identities, I bring a sharp eye, deep craft knowledge, and a relentless pursuit of visual excellence to every project.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              I work with businesses, musicians, creatives, and entrepreneurs who understand that design is not decoration — it&apos;s strategy.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 pt-8"
            >
              {skills.map((skill, index) => (
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