'use client';

import { motion } from 'framer-motion';

const apps = [
  { name: 'Photoshop', badge: 'Ps', color: 'bg-[#31A8FF]/10 text-[#31A8FF] border-[#31A8FF]/30' },
  { name: 'Illustrator', badge: 'Ai', color: 'bg-[#FF9A00]/10 text-[#FF9A00] border-[#FF9A00]/30' },
  { name: 'Premiere Pro', badge: 'Pr', color: 'bg-[#9955FF]/10 text-[#9955FF] border-[#9955FF]/30' },
  { name: 'After Effects', badge: 'Ae', color: 'bg-[#9955FF]/10 text-[#9955FF] border-[#9955FF]/30' },
  { name: 'InDesign', badge: 'Id', color: 'bg-[#FF3366]/10 text-[#FF3366] border-[#FF3366]/30' },
  { name: 'DaVinci Resolve', badge: 'Da', color: 'bg-[#FF3B30]/10 text-[#FF3B30] border-[#FF3B30]/30' },
  { name: 'Lightroom', badge: 'Lr', color: 'bg-[#31A8FF]/10 text-[#31A8FF] border-[#31A8FF]/30' },
  { name: 'Cinema 4D', badge: 'C4D', color: 'bg-[#000000]/10 text-white border-white/30' },
  { name: 'Final Cut', badge: 'FCP', color: 'bg-[#FFCC00]/10 text-[#FFCC00] border-[#FFCC00]/30' },
];

export default function SoftwareStack() {
  // Duplicate array for infinite scroll
  const repeatedApps = [...apps, ...apps, ...apps];

  return (
    <section className="py-20 bg-[#050505] border-y border-white/5 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C9A84C]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8B7355]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 mb-12 text-center md:text-left">
         <motion.div
           initial={{ opacity: 0, y: 10 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
         >
           <span className="uppercase text-[10px] tracking-[4px] text-[#C9A84C] font-black block mb-2">
             TECHNICAL MASTERY
           </span>
           <h2 className="text-3xl md:text-4xl font-bold font-['Playfair_Display'] text-white">
             Powering Premium Visuals
           </h2>
         </motion.div>
      </div>

      <div className="relative flex overflow-hidden py-10">
        {/* Left and Right fade overlays */}
        <div className="absolute top-0 bottom-0 left-0 w-24 md:w-64 bg-gradient-to-r from-[#050505] to-transparent z-10" />
        <div className="absolute top-0 bottom-0 right-0 w-24 md:w-64 bg-gradient-to-l from-[#050505] to-transparent z-10" />

        <motion.div
           animate={{ x: ["0%", "-33.33%"] }}
           transition={{ ease: "linear", duration: 25, repeat: Infinity }}
           className="flex gap-6 md:gap-10 items-center whitespace-nowrap"
        >
          {repeatedApps.map((app, i) => (
            <div
              key={i}
              className="group relative flex items-center gap-4 bg-white/[0.03] backdrop-blur-md border border-white/10 px-6 md:px-10 py-4 md:py-6 rounded-[2rem] transition-all duration-500 hover:bg-white/[0.08] hover:border-[#C9A84C]/40 hover:-translate-y-2 cursor-pointer shadow-2xl"
            >
              <div
                className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center font-bold text-xl md:text-2xl rounded-2xl border-2 ${app.color} shadow-lg group-hover:scale-110 transition-transform duration-500`}
              >
                {app.badge}
              </div>
              <div className="flex flex-col">
                <span className="text-sm md:text-xl font-bold text-white group-hover:text-[#C9A84C] transition-colors">
                  {app.name}
                </span>
                <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Expert Mastery</span>
              </div>
              
              {/* Subtle light effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#C9A84C]/0 via-[#C9A84C]/5 to-[#C9A84C]/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
