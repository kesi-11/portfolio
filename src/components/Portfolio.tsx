'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Project {
  id: number;
  category: string;
  label: string;
  fallback_color: string;
  image_url: string;
}

const filters = [
  { name: 'ALL WORK', value: 'All Work' },
  { name: 'BUSINESS CARDS', value: 'Business Cards' },
  { name: 'POSTERS', value: 'Posters' },
  { name: 'LOGOS', value: 'Logos' },
  { name: 'FLYERS', value: 'Flyers' },
  { name: 'BANNERS', value: 'Banners' },
  { name: 'SOCIAL ADS', value: 'Social Ads' },
  { name: 'WEDDING', value: 'Wedding' },
  { name: 'EVENTS', value: 'Events' },
  { name: 'BIRTHDAY', value: 'Birthdays' },
  { name: 'MOVIES', value: 'Movies' },
  { name: 'GRAPHIC', value: 'Graphic' },
  { name: 'VIDEO', value: 'Video' },
  { name: 'VIDEOGRAPHY', value: 'Videography' },
  { name: 'PHOTO', value: 'Photography' },
  { name: 'DJ', value: 'DJ Films' },
];

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState('All Work');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const res = await fetch('/api/portfolio');
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredProjects = filter === 'All Work' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-12 md:py-24 bg-[#050505]">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4"
        >
          <div>
            <span className="uppercase text-xs tracking-[2px] text-[#C9A84C] font-bold">PORTFOLIO</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-['Playfair_Display'] mt-2">
              Work That Speaks Volumes.
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 text-xs md:text-sm max-w-full md:max-w-4xl">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full font-semibold transition-all whitespace-nowrap ${
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

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
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
                  className="aspect-[4/3] rounded-xl md:rounded-3xl flex flex-col justify-end p-4 md:p-8 text-white relative cursor-pointer overflow-hidden group"
                  style={{ backgroundColor: project.fallback_color || '#1a1a2e' }}
                  onClick={() => setSelectedProject(project)}
                >
                  {project.image_url && (
                    <Image
                      src={project.image_url}
                      alt={project.label}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-0 left-[-100%] w-[40%] h-full bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.3)] to-transparent animate-[shimmer_4s_infinite_linear]" />

                  <div className="text-[#C9A84C] text-xs font-bold mb-1">PROJECT {project.id}</div>
                  <p className="text-lg md:text-3xl font-bold font-['Playfair_Display']">{project.label}</p>
                  <div className="absolute top-4 md:top-8 right-4 md:right-8 text-4xl md:text-5xl opacity-20">✺</div>
                  <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 text-xs uppercase font-bold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    QUICK VIEW <i className="fas fa-arrow-right" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {filteredProjects.length === 0 && !loading && (
          <div className="text-center py-12 text-gray-400">
            No projects in this category yet — but I can design one for you today!
          </div>
        )}
      </div>

<AnimatePresence>
{selectedProject && (
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
onClick={() => setSelectedProject(null)}
>
<motion.div
initial={{ scale: 0.8, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
exit={{ scale: 0.8, opacity: 0 }}
className="relative w-full max-w-7xl"
onClick={(e) => e.stopPropagation()}
>
{/* Image container - maintains aspect ratio */}
<div className="relative w-full" style={{ minHeight: '200px' }}>
<img 
src={selectedProject.image_url} 
alt={selectedProject.label} 
className="w-full h-auto object-contain rounded-lg" 
/>
</div>

{/* Info overlay at bottom */}
<div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent rounded-b-lg">
<div className="flex items-start justify-between gap-4">
<div>
<p className="text-[#C9A84C] text-xs md:text-sm uppercase tracking-wider mb-2">
{selectedProject.category}
</p>
<h3 className="text-xl md:text-3xl font-bold font-['Playfair_Display'] text-white">
{selectedProject.label}
</h3>
</div>
<button
className="flex-shrink-0 w-12 h-12 bg-[#C9A84C] text-[#050505] rounded-full flex items-center justify-center hover:bg-[#E5D4A1] transition-colors text-xl font-bold"
onClick={() => setSelectedProject(null)}
>
✕
</button>
</div>
</div>
</motion.div>
</motion.div>
)}
</AnimatePresence>
    </section>
  );
}