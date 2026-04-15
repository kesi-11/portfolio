'use client';

import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-[#050505] border-t border-white/10">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <span className="uppercase text-xs tracking-[2px] text-[#C9A84C] font-bold">CONTACT</span>
              <div className="absolute w-16 h-0.5 bg-gradient-to-r from-[#C9A84C] to-transparent bottom-[-8px]" />
            </div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-bold font-['Playfair_Display'] mt-4"
            >
              Let&apos;s Build Something<br />Extraordinary Together.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 mt-8 max-w-md"
            >
              Ready to elevate your brand? Fill in the form and I&apos;ll get back to you within 24 hours with a custom proposal for your project.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-16 space-y-8"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#C9A84C]/10 rounded-full flex items-center justify-center">
                  <i className="fas fa-envelope text-2xl text-[#C9A84C]" />
                </div>
                <div>
                  <p className="font-semibold text-sm">EMAIL</p>
                  <a href="mailto:hello@richkidgraphix.co.ke" className="text-gray-300 hover:text-[#C9A84C] transition-colors">
                    hello@richkidgraphix.co.ke
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#C9A84C]/10 rounded-full flex items-center justify-center">
                  <i className="fab fa-whatsapp text-2xl text-[#C9A84C]" />
                </div>
                <div>
                  <p className="font-semibold text-sm">WHATSAPP</p>
                  <a href="https://wa.me/254700000000" className="text-gray-300 hover:text-[#C9A84C] transition-colors">
                    +254 700 000 000
                  </a>
                </div>
              </div>
              <div className="text-xs uppercase font-bold tracking-widest text-gray-500">
                BASED IN MOMBASA, KENYA • AVAILABLE WORLDWIDE
              </div>
            </motion.div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold tracking-widest block mb-2 text-gray-400">YOUR NAME</label>
                <input 
                  type="text" 
                  placeholder="Full name" 
                  required
                  className="w-full bg-white/10 border border-white/20 focus:border-[#C9A84C] rounded-3xl px-8 py-7 text-lg outline-none text-white placeholder-gray-500" 
                />
              </div>
              <div>
                <label className="text-xs font-bold tracking-widest block mb-2 text-gray-400">EMAIL / WHATSAPP</label>
                <input 
                  type="text" 
                  placeholder="Contact info" 
                  required
                  className="w-full bg-white/10 border border-white/20 focus:border-[#C9A84C] rounded-3xl px-8 py-7 text-lg outline-none text-white placeholder-gray-500" 
                />
              </div>
            </div>
            
            <div>
              <label className="text-xs font-bold tracking-widest block mb-2 text-gray-400">SERVICE REQUIRED</label>
              <select className="w-full bg-white/10 border border-white/20 focus:border-[#C9A84C] rounded-3xl px-8 py-7 text-lg outline-none text-white">
                <option>Poster Design</option>
                <option>Brand Identity Pack</option>
                <option>Event Campaign</option>
                <option>Full Visual System</option>
              </select>
            </div>
            
            <div>
              <label className="text-xs font-bold tracking-widest block mb-2 text-gray-400">PROJECT BRIEF</label>
              <textarea 
                placeholder="Tell me about your project, timeline, and any references..." 
                rows={6}
                className="w-full bg-white/10 border border-white/20 focus:border-[#C9A84C] rounded-3xl px-8 py-7 text-lg outline-none text-white placeholder-gray-500 resize-none"
              />
            </div>
            
            <button 
              type="submit"
              className="w-full py-8 bg-gradient-to-r from-[#C9A84C] to-[#E5D4A1] text-black font-bold text-2xl rounded-3xl flex items-center justify-center gap-4 hover:scale-105 transition-transform"
            >
              SEND BRIEF 
              <i className="fas fa-paper-plane" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}