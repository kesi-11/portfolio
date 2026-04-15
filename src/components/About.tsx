'use client';

import { motion } from 'framer-motion';

const skills = [
  'Brand Identity', 'Poster Design', 'Motion Graphics', 'UI/UX Design',
  'Typography', 'Illustration', 'Photo Editing', 'Print Design'
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          <div className="relative">
            <div className="aspect-[4/5] bg-[#1a1a1a] rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-[#C9A84C]/20 to-[#050505] flex items-center justify-center">
                <span className="text-[#C9A84C]/30 text-9xl font-['Playfair_Display']">R</span>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-[#C9A84C] rounded-lg" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#C9A84C]/10 rounded-lg" />
          </div>

          <div>
            <motion.h2
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold font-['Playfair_Display'] mb-6"
            >
              About <span className="text-[#C9A84C]">Me</span>
            </motion.h2>

            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              I'm a passionate graphic designer with a knack for creating bold, memorable visual experiences. 
              From brand identities that stand out to eye-catching posters and motion graphics, 
              I bring creativity and precision to every project.
            </p>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Based in Kenya, I work with clients globally to transform their ideas into stunning visuals 
              that leave lasting impressions. My approach combines artistic vision with strategic thinking 
              to deliver designs that not only look great but also achieve results.
            </p>

            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="px-4 py-2 bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C] text-sm"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}