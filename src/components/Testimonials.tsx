'use client';

import { motion } from 'framer-motion';

const reviews = [
  {
    name: 'Sarah Johnson',
    role: 'Event Organizer',
    text: 'Absolutely stunning work! The poster designs captured perfectly what we wanted for our music festival. Professional, creative, and delivered on time.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Business Owner',
    text: 'Rama transformed our brand completely. The logo and brand identity exceeded our expectations. Highly recommend for any design work!',
    rating: 5,
  },
  {
    name: 'Amina Wanjiku',
    role: 'Marketing Director',
    text: 'Exceptional creativity and attention to detail. Our campaign materials have never looked better. Will definitely work together again.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-['Playfair_Display'] mb-4">
            Client <span className="text-[#C9A84C]">Reviews</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            What my clients say about working with me.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#0a0a0a] p-8 rounded-xl border border-[#1a1a1a] hover:border-[#C9A84C]/30 transition-colors"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#C9A84C]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#C9A84C]/20 rounded-full flex items-center justify-center">
                  <span className="text-[#C9A84C] font-bold">{review.name.charAt(0)}</span>
                </div>
                <div>
                  <div className="font-semibold">{review.name}</div>
                  <div className="text-gray-500 text-sm">{review.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}