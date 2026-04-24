'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '', budget: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [services, setServices] = useState<any[]>([]);
  const [siteEmail, setSiteEmail] = useState('hello@richkidgraphix.co.ke');
  const [whatsappNumber, setWhatsappNumber] = useState('254740639494');

  useEffect(() => {
    // Fetch services for dropdown
    fetch('/api/services')
      .then(r => r.json())
      .then(d => setServices(Array.isArray(d) ? d : []))
      .catch(console.error);

    // Fetch site settings for WhatsApp number and email
    fetch('/api/settings')
      .then(r => r.json())
      .then(d => {
        if (d?.contact_email) setSiteEmail(d.contact_email);
        if (d?.contact_whatsapp) setWhatsappNumber(d.contact_whatsapp.replace(/\D/g, ''));
      })
      .catch(console.error);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Save to database
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // Send to WhatsApp with the admin-configured number
      const whatsappMessage = `*New Project Brief*%0A%0A*Name:* ${formData.name}%0A*Contact:* ${formData.email}%0A*Service:* ${formData.service}%0A*Proposed Budget:* KSH ${formData.budget || 'To be discussed'}%0A%0A*Message:* ${formData.message}`;
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
      
      window.open(whatsappUrl, '_blank');

      setSubmitted(true);
      setFormData({ name: '', email: '', service: '', message: '', budget: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Failed to submit:', error);
    } finally {
      setSubmitting(false);
    }
  }

  // Format WhatsApp number for display: +254 740 639 494
  function formatWhatsAppNumber(num: string) {
    if (num.length >= 9) {
      return `+${num.slice(0, 3)} ${num.slice(3, 6)} ${num.slice(6, 9)} ${num.slice(9)}`;
    }
    return `+${num}`;
  }

  return (
    <section id="contact" className="py-12 md:py-24 bg-[#050505] border-t border-white/10">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-20">
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
              className="text-3xl md:text-5xl lg:text-6xl font-bold font-['Playfair_Display'] mt-4"
            >
              Let&apos;s Build Something<br />Extraordinary together.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-sm md:text-gray-400 mt-4 md:mt-8 max-w-md"
            >
              Ready to elevate your brand? Fill in the form and I&apos;ll get back to you within 24 hours with a custom proposal for your project.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8 md:mt-16 space-y-4 md:space-y-8"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-[#C9A84C]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-envelope text-xl md:text-2xl text-[#C9A84C]" />
                </div>
                <div>
                  <p className="font-semibold text-xs md:text-sm">EMAIL</p>
                  <a href={`mailto:${siteEmail}`} className="text-gray-300 hover:text-[#C9A84C] transition-colors text-xs md:text-sm block">
                    {siteEmail}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-[#C9A84C]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fab fa-whatsapp text-xl md:text-2xl text-[#C9A84C]" />
                </div>
                <div>
                  <p className="font-semibold text-xs md:text-sm">WHATSAPP</p>
                  <a href={`https://wa.me/${whatsappNumber}`} className="text-gray-300 hover:text-[#C9A84C] transition-colors text-xs md:text-sm block">
                    {formatWhatsAppNumber(whatsappNumber)}
                  </a>
                </div>
              </div>
              <div className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-gray-500">
                BASED IN MOMBASA, KENYA • AVAILABLE WORLDWIDE
              </div>
            </motion.div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-4 md:space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="text-xs font-bold tracking-widest block mb-2 text-gray-400">YOUR NAME</label>
                <input
                  type="text"
                  placeholder="Full name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 focus:border-[#C9A84C] rounded-2xl md:rounded-3xl px-4 md:px-8 py-4 md:py-7 text-base md:text-lg outline-none text-white placeholder-gray-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold tracking-widest block mb-2 text-gray-400">EMAIL / WHATSAPP</label>
                <input
                  type="text"
                  placeholder="Contact info"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 focus:border-[#C9A84C] rounded-2xl md:rounded-3xl px-4 md:px-8 py-4 md:py-7 text-base md:text-lg outline-none text-white placeholder-gray-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="text-xs font-bold tracking-widest block mb-2 text-gray-400">SERVICE REQUIRED</label>
                <select
                  className="w-full bg-white/10 border border-white/20 focus:border-[#C9A84C] rounded-2xl md:rounded-3xl px-4 md:px-8 py-4 md:py-7 text-base md:text-lg outline-none text-white appearance-none"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  required
                >
                  <option value="" className="bg-[#0a0a0a]">Select a service</option>
                  {services.length > 0 ? (
                    services.map((s: any) => (
                      <option key={s.id} value={s.title} className="bg-[#0a0a0a]">{s.title} ({s.price})</option>
                    ))
                  ) : (
                    <>
                      <option value="Poster Design" className="bg-[#0a0a0a]">Poster Design</option>
                      <option value="Brand Identity Pack" className="bg-[#0a0a0a]">Brand Identity Pack</option>
                      <option value="Event Campaign" className="bg-[#0a0a0a]">Event Campaign</option>
                      <option value="Full Visual System" className="bg-[#0a0a0a]">Full Visual System</option>
                      <option value="Logo Design" className="bg-[#0a0a0a]">Logo Design</option>
                      <option value="Social Media Kit" className="bg-[#0a0a0a]">Social Media Kit</option>
                    </>
                  )}
                  <option value="Custom Project" className="bg-[#0a0a0a]">Other / Custom Project</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold tracking-widest block mb-2 text-gray-400">PROPOSED BUDGET (KSH)</label>
                <input
                  type="text"
                  placeholder="e.g. 15,000"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 focus:border-[#C9A84C] rounded-2xl md:rounded-3xl px-4 md:px-8 py-4 md:py-7 text-base md:text-lg outline-none text-white placeholder-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold tracking-widest block mb-2 text-gray-400">PROJECT BRIEF</label>
              <textarea
                placeholder="Tell me about your project, timeline, and references..."
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white/10 border border-white/20 focus:border-[#C9A84C] rounded-2xl md:rounded-3xl px-4 md:px-8 py-4 md:py-7 text-base md:text-lg outline-none text-white placeholder-gray-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting || submitted}
              className="w-full py-6 md:py-8 bg-gradient-to-r from-[#C9A84C] to-[#E5D4A1] text-black font-bold text-base md:text-2xl rounded-2xl md:rounded-3xl flex items-center justify-center gap-2 md:gap-4 hover:scale-105 transition-transform disabled:opacity-50"
            >
              {submitting ? 'SENDING...' : submitted ? 'SENT!' : 'SEND BRIEF'}
              <i className="fas fa-paper-plane" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
