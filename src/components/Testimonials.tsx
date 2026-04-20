'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  initials: string;
  color: string;
  text: string;
  rating: number;
}

const colors = ['bg-red-600', 'bg-amber-600', 'bg-blue-600', 'bg-emerald-600', 'bg-purple-600', 'bg-pink-600'];

export default function Testimonials() {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: '', role: '', text: '', rating: 5 });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleReviewSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmittingReview(true);
    
    // Choose random color and gen initials
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const initials = reviewForm.name.split(' ').filter(n => n.length > 0).map(n => n[0]).join('').toUpperCase();
    
    await fetch('/api/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        ...reviewForm, 
        color: randomColor, 
        initials,
        display_order: 999 
      }),
    });
    
    setSubmittingReview(false);
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setShowReviewForm(false);
      setReviewForm({ name: '', role: '', text: '', rating: 5 });
    }, 5000);
  }

  if (loading) {
    return (
      <section id="reviews" className="py-24 bg-black border-t border-white/10">
        <div className="max-w-screen-2xl mx-auto px-8 text-center text-gray-400">
          Loading...
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return (
      <section id="reviews" className="py-24 bg-black border-t border-white/10">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="relative">
            <span className="uppercase text-xs tracking-[2px] text-[#C9A84C] font-bold">CLIENT REVIEWS</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold font-['Playfair_Display'] mt-4">
            Add testimonials in the admin panel
          </h2>
        </div>
      </section>
    );
  }

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
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(201,168,76,0.25)]"
            >
              <div className="flex text-[#C9A84C] text-2xl mb-6">
                {[...Array(review.rating || 5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-lg text-gray-300 mb-12 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 ${review.color || 'bg-amber-600'} rounded-2xl flex items-center justify-center text-xs font-bold`}>
                  {review.initials || review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-xs text-gray-400">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mt-20 pt-16 border-t border-white/10 text-center max-w-2xl mx-auto"
        >
          {!showReviewForm && !reviewSubmitted && (
            <div>
              <h3 className="text-2xl font-bold font-['Playfair_Display'] mb-4">Worked with me?</h3>
              <button 
                onClick={() => setShowReviewForm(true)}
                className="px-8 py-4 border border-[#C9A84C]/50 text-[#C9A84C] font-bold rounded-2xl hover:bg-[#C9A84C]/10 transition-colors"
              >
                LEAVE A REVIEW
              </button>
            </div>
          )}

          {reviewSubmitted && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-6 rounded-2xl">
              <i className="fas fa-check-circle text-3xl mb-4" />
              <h3 className="text-xl font-bold mb-2">Thank you for your review!</h3>
              <p>Your testimonial has been submitted successfully and is pending approval.</p>
            </div>
          )}

          {showReviewForm && !reviewSubmitted && (
            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl text-left">
              <h3 className="text-2xl font-bold font-['Playfair_Display'] mb-6 text-center">Write a Review</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold tracking-widest text-gray-400 mb-2">NAME</label>
                    <input 
                      required
                      type="text" 
                      value={reviewForm.name}
                      onChange={e => setReviewForm({...reviewForm, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 focus:border-[#C9A84C] rounded-xl px-4 py-3 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-widest text-gray-400 mb-2">COMPANY / ROLE</label>
                    <input 
                      required
                      type="text" 
                      value={reviewForm.role}
                      onChange={e => setReviewForm({...reviewForm, role: e.target.value})}
                      placeholder="e.g. CEO, XYZ Studio"
                      className="w-full bg-white/5 border border-white/10 focus:border-[#C9A84C] rounded-xl px-4 py-3 text-white outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-widest text-gray-400 mb-2">RATING</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        className={`text-3xl ${reviewForm.rating >= star ? 'text-[#C9A84C]' : 'text-gray-600'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-widest text-gray-400 mb-2">YOUR EXPERIENCE</label>
                  <textarea 
                    required
                    rows={4}
                    value={reviewForm.text}
                    onChange={e => setReviewForm({...reviewForm, text: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#C9A84C] rounded-xl px-4 py-3 text-white outline-none resize-none"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setShowReviewForm(false)}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-colors"
                  >
                    CANCEL
                  </button>
                  <button 
                    type="submit" 
                    disabled={submittingReview}
                    className="flex-1 py-3 bg-[#C9A84C] hover:bg-[#E5D4A1] text-black font-bold rounded-xl transition-colors disabled:opacity-50"
                  >
                    {submittingReview ? 'SUBMITTING...' : 'SUBMIT REVIEW'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}