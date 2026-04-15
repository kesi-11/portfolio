'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  { id: 1, title: 'Event Poster', category: 'Poster Design', color: '#C9A84C' },
  { id: 2, title: 'Brand Identity', category: 'Branding', color: '#8B7355' },
  { id: 3, title: 'Music Festival', category: 'Poster Design', color: '#E5D4A1' },
  { id: 4, title: 'Tech Conference', category: 'Event', color: '#C9A84C' },
  { id: 5, title: 'Restaurant Menu', category: 'Print Design', color: '#8B7355' },
  { id: 6, title: 'Product Launch', category: 'Marketing', color: '#E5D4A1' },
];

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <section id="portfolio" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-['Playfair_Display'] mb-4">
            My <span className="text-[#C9A84C]">Portfolio</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A collection of my recent work spanning brand identity, poster design, and visual communications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative aspect-[4/5] bg-[#1a1a1a] rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setSelectedProject(project.id)}
            >
              <div
                className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                style={{ background: `linear-gradient(135deg, ${project.color}20 0%, #1a1a1a 100%)` }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[#C9A84C]/20 text-8xl font-['Playfair_Display']">{project.id}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-[#C9A84C] text-sm uppercase tracking-wider mb-1">{project.category}</p>
                <h3 className="text-2xl font-bold font-['Playfair_Display']">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#050505]/95 flex items-center justify-center p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl w-full aspect-[4/5] bg-[#1a1a1a] rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[#C9A84C]/30 text-[10rem] font-['Playfair_Display']">
                  {selectedProject}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#050505] to-transparent">
                <p className="text-[#C9A84C] text-sm uppercase tracking-wider mb-2">
                  {projects.find((p) => p.id === selectedProject)?.category}
                </p>
                <h3 className="text-3xl font-bold font-['Playfair_Display']">
                  {projects.find((p) => p.id === selectedProject)?.title}
                </h3>
              </div>
              <button
                className="absolute top-4 right-4 w-10 h-10 bg-[#C9A84C] text-[#050505] rounded-full flex items-center justify-center hover:bg-[#E5D4A1] transition-colors"
                onClick={() => setSelectedProject(null)}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}