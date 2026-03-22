import { motion } from 'framer-motion';
import { ExternalLink, Github, FileText, Video } from 'lucide-react';
import { Component as MorphingCardStack, type CardData } from '@/components/ui/morphing-card-stack';

const projectCards: CardData[] = [
  {
    id: '4',
    title: 'Thanickole Hotel Website',
    description: 'Full hospitality platform for The Thanickole Hotel — room booking engine, gallery, amenities showcase, and contact system. Optimised for SEO and mobile.',
    image: 'images/thanickoleehotel.png',
    icon: <ExternalLink className="h-4 w-4 text-[#cc005f]" />,
    tags: ['WordPress', 'PHP', 'Hospitality', 'Booking'],
    demoLink: 'https://thanickoleehotel.com',
  },
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'Production e-commerce platform with dynamic product catalog, cart management, Stripe checkout, and order tracking. Built for scale with SSR and PostgreSQL.',
    image: 'images/com.png',
    icon: <ExternalLink className="h-4 w-4 text-[#cc005f]" />,
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
    demoLink: 'https://ellitestore.vercel.app/',
    githubLink: 'https://github.com/Devouko/ellitestore',
  },
  {
    id: '2',
    title: 'Automated Job Application',
    description: 'Intelligent job application automation — integrates with major job boards, parses listings, and submits tailored applications. Saves hours of manual work daily.',
    image: 'images/Job.png',
    icon: <FileText className="h-4 w-4 text-[#cc005f]" />,
    tags: ['TypeScript', 'Vite', 'Firebase', 'Redux'],
    demoLink: 'https://portfolio-git-main-devouko30s-projects.vercel.app/',
    githubLink: 'https://portfolio-git-main-devouko30s-projects.vercel.app/',
  },
  {
    id: '3',
    title: 'AI Document Assistant',
    description: 'RAG-powered document assistant using LangChain and OpenAI. Upload any document and get accurate, context-aware answers — no hallucinations, just grounded responses.',
    image: 'images/doc.png',
    icon: <Video className="h-4 w-4 text-[#cc005f]" />,
    tags: ['Langchain', 'RAG', 'Framer Motion', 'OpenAI'],
    demoLink: 'https://github.com/Devouko/ai_Doc_assistant',
    githubLink: 'https://github.com/Devouko/ai_Doc_assistant',
  },
];

const Projects = () => (
  <section id="projects" className="relative py-32 bg-black overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#cc005f]/30 to-transparent" />

    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <p className="text-[#cc005f] text-xs tracking-[0.4em] uppercase font-light mb-3">02 — Work</p>
        <h2 className="text-4xl md:text-5xl font-extralight text-white tracking-wide">Selected Projects</h2>
        <div className="section-line mt-4" />
        <p className="text-white/30 text-sm font-light mt-4">
          Production systems shipped across web, mobile, and AI — swipe or toggle layout to explore.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
      >
        <MorphingCardStack
          cards={projectCards}
          defaultLayout="stack"
          className="max-w-5xl mx-auto"
        />
      </motion.div>
    </div>
  </section>
);

export default Projects;
