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
  // Duplicate array to ensure seamless infinite scroll
  const repeatedApps = [...apps, ...apps, ...apps];

  return (
    <section className="py-12 bg-black border-y border-white/5 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 mb-6">
         <span className="uppercase text-xs tracking-[2px] text-gray-500 font-bold block text-center md:text-left">
           Tools & Mastery
         </span>
      </div>

      <div className="relative flex w-[200vw] overflow-hidden">
        {/* Left and Right fade overlays */}
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10" />

        <motion.div
           animate={{ x: ["0%", "-33.33%"] }}
           transition={{ ease: "linear", duration: 15, repeat: Infinity }}
           className="flex gap-4 md:gap-8 hover:[animation-play-state:paused]"
        >
          {repeatedApps.map((app, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-[#0a0a0a] border border-white/10 px-5 md:px-8 py-3 md:py-4 rounded-2xl flex-shrink-0 transition-colors hover:border-white/30 cursor-crosshair group"
            >
              <div
                className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center font-bold text-lg md:text-xl rounded-[10px] border ${app.color} group-hover:scale-110 transition-transform`}
              >
                {app.badge}
              </div>
              <span className="text-sm md:text-lg font-semibold text-gray-300 group-hover:text-white transition-colors">
                {app.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
