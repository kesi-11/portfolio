'use client';

import { motion } from 'framer-motion';

const reviews = [
  {
    name: 'James Mwangi',
    role: 'EVENTS PROMOTER • NAIROBI',
    initials: 'JM',
    color: 'bg-red-600',
    text: 'RichKid Graphix completely transformed our brand. The poster series for our event was stunning — people were stopping just to take photos of our flyers.',
    rating: 5,
  },
  {
    name: 'Amina Farah',
    role: 'CEO, COASTAL THREADS',
    initials: 'AF',
    color: 'bg-amber-600',
    text: 'The brand pack was worth every shilling. Logo, business cards, socials — everything was cohesive and premium. Our customers noticed the upgrade immediately.',
    rating: 5,
  },
  {
    name: 'Brian Kamau',
    role: 'MUSIC ARTIST • MOMBASA',
    initials: 'BK',
    color: 'bg-blue-600',
    text: 'Fast, professional, and genuinely talented. The concert poster exceeded expectations and the music community loved the design. Will definitely work together again.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="py-24 bg-black border-t border-white/10">
      <div className="max-w-screen-2xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <span className="uppercase text-xs tracking-[2px] text-[#C9A84C] font-bold">CLIENT REVIEWS</span>
          <div className="absolute w-16 h-0.5 bg-gradient-to-r from-[#C9A84C] to-transparent bottom-[-8px]" />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-bold font-['Playfair_Display'] mt-4"
        >
          What Clients Say About the Work.
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mt-16"
        >
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(201,168,76,0.25)]"
            >
              <div className="flex text-[#C9A84C] text-2xl mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-lg text-gray-300 mb-12 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 ${review.color} rounded-2xl flex items-center justify-center text-xs font-bold`}>
                  {review.initials}
                </div>
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-xs text-gray-400">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}