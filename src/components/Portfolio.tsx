'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  { id: 1, type: 'posters', color: 'bg-red-900', label: 'STREET VIBES' },
  { id: 2, type: 'branding', color: 'bg-emerald-900', label: 'LOGO SYSTEM' },
  { id: 3, type: 'social', color: 'bg-blue-900', label: 'SOCIAL DROP' },
  { id: 4, type: 'events', color: 'bg-amber-900', label: 'CONCERT FLYER' },
  { id: 5, type: 'posters', color: 'bg-purple-900', label: 'URBAN LUXE' },
  { id: 6, type: 'branding', color: 'bg-teal-900', label: 'BRAND KIT' },
];

const filters = [
  { name: 'ALL WORK', value: 'all' },
  { name: 'POSTERS', value: 'posters' },
  { name: 'BRANDING', value: 'branding' },
  { name: 'SOCIAL MEDIA', value: 'social' },
  { name: 'EVENTS', value: 'events' },
];

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [filter, setFilter] = useState('all');

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.type === filter);

  return (
    <section id="portfolio" className="py-24 bg-[#050505]">
      <div className="max-w-screen-2xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-between items-end mb-12"
        >
          <div>
            <span className="uppercase text-xs tracking-[2px] text-[#C9A84C] font-bold">PORTFOLIO</span>
            <h2 className="text-5xl md:text-6xl font-bold font-['Playfair_Display'] mt-2">
              Work That Speaks Volumes.
            </h2>
          </div>
          
          <div className="hidden md:flex gap-2 text-sm">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-7 py-4 rounded-full font-semibold transition-all ${
                  filter === f.value 
                    ? 'bg-[#C9A84C] text-black' 
                    : 'bg-white/10 hover:bg-[#C9A84C] hover:text-black'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`${project.color} aspect-[4/3] rounded-3xl flex flex-col justify-end p-8 text-white relative cursor-pointer overflow-hidden group`}
                onClick={() => setSelectedProject(project.id)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-0 left-[-100%] w-[40%] h-full bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.3)] to-transparent animate-[shimmer_4s_infinite_linear]" />
                
                <div className="text-[#C9A84C] text-xs font-bold mb-1">PROJECT {project.id}</div>
                <p className="text-3xl font-bold font-['Playfair_Display']">{project.label}</p>
                <div className="absolute top-8 right-8 text-5xl opacity-20">✺</div>
                <div className="absolute bottom-8 left-8 text-xs uppercase font-bold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  QUICK VIEW <i className="fas fa-arrow-right" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No posters in this category yet — but I can design one for you today!
          </div>
        )}
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
              className="relative max-w-4xl w-full aspect-[4/5] bg-[#1a1a1a] rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[#C9A84C]/30 text-[10rem] font-['Playfair_Display']">
                  {selectedProject}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#050505] to-transparent">
                <p className="text-[#C9A84C] text-sm uppercase tracking-wider mb-2">
                  {projects.find((p) => p.id === selectedProject)?.type}
                </p>
                <h3 className="text-3xl font-bold font-['Playfair_Display']">
                  {projects.find((p) => p.id === selectedProject)?.label}
                </h3>
              </div>
              <button
                className="absolute top-4 right-4 w-10 h-10 bg-[#C9A84C] text-[#050505] rounded-full flex items-center justify-center hover:bg-[#E5D4A1] transition-colors"
                onClick={() => setSelectedProject(null)}
              >
                <i className="fas fa-times" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}