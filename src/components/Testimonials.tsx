import { motion } from 'framer-motion';
import { TestimonialSlider } from '@/components/ui/testimonial-slider';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

const testimonials = [
  {
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
    quote: "James delivered our e-commerce platform ahead of schedule. The code quality and attention to detail were exceptional — exactly what we needed.",
    name: 'David K.',
    role: 'CEO, RetailCo',
  },
  {
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
    quote: "Working with James on our Android app was a great experience. He understood our requirements perfectly and built something our users love.",
    name: 'Sarah M.',
    role: 'Product Manager, TechStart',
  },
  {
    img: 'https://randomuser.me/api/portraits/men/67.jpg',
    quote: "The API architecture James designed for us is clean, well-documented, and scales beautifully. Highly recommend for any backend work.",
    name: 'Alex R.',
    role: 'CTO, DataFlow Inc.',
  },
  {
    img: 'https://randomuser.me/api/portraits/women/28.jpg',
    quote: "James rebuilt our legacy system into a modern full-stack application. The performance improvements were immediately noticeable.",
    name: 'Amina W.',
    role: 'Founder, NovaSoft',
  },
];

const Testimonials = () => (
  <section id="testimonials" className="relative py-32 bg-black overflow-hidden">
    {/* Ambient blobs */}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#cc005f]/4 blur-[140px] pointer-events-none" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#cc005f]/30 to-transparent" />

    <div className="container mx-auto px-6 relative z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="mb-20 text-center"
      >
        <p className="text-[#cc005f] text-xs tracking-[0.4em] uppercase font-light mb-3">05 — Testimonials</p>
        <h2 className="text-4xl md:text-5xl font-extralight text-white tracking-wide">What Clients Say</h2>
        <div className="section-line mt-4 mx-auto" />
      </motion.div>

      {/* Liquid glass testimonial card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="relative w-full"
      >
        {/* Outer glow ring */}
        <div className="absolute -inset-px rounded-2xl pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(204,0,95,0.15), rgba(255,255,255,0.03), rgba(204,0,95,0.08))', borderRadius: '1rem' }} />

        {/* Glass panel */}
        <div
          className="relative rounded-2xl px-8 py-20 md:px-24 overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(24px) saturate(200%)',
            WebkitBackdropFilter: 'blur(24px) saturate(200%)',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 16px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.3)',
          }}
        >
          {/* Top shine streak */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

          {/* Corner accents */}
          <span className="absolute top-0 left-0 w-16 h-px bg-gradient-to-r from-[#cc005f]/50 to-transparent" />
          <span className="absolute top-0 left-0 w-px h-16 bg-gradient-to-b from-[#cc005f]/50 to-transparent" />
          <span className="absolute bottom-0 right-0 w-16 h-px bg-gradient-to-l from-[#cc005f]/50 to-transparent" />
          <span className="absolute bottom-0 right-0 w-px h-16 bg-gradient-to-t from-[#cc005f]/50 to-transparent" />

          {/* Subtle inner refraction blobs */}
          <div className="absolute top-4 right-8 w-32 h-32 rounded-full bg-white/[0.02] blur-2xl pointer-events-none" />
          <div className="absolute bottom-4 left-8 w-24 h-24 rounded-full bg-[#cc005f]/[0.04] blur-2xl pointer-events-none" />

          <TestimonialSlider testimonials={testimonials} />
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="flex justify-center mt-14"
      >
        <LiquidButton
          variant="pink"
          size="lg"
          onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Work With Me
        </LiquidButton>
      </motion.div>
    </div>
  </section>
);

export default Testimonials;
