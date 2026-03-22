import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

interface IndexProps {
  currentTheme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Index = ({ currentTheme, toggleTheme }: IndexProps) => {
  useEffect(() => {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    const cleanupFunctions: (() => void)[] = [];

    const handleClick = function (this: Element, e: Event) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    anchorLinks.forEach(link => {
      link.addEventListener('click', handleClick);
      cleanupFunctions.push(() => link.removeEventListener('click', handleClick));
    });

    return () => { cleanupFunctions.forEach(fn => fn()); };
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>James Robert Ouko | Senior Full Stack & Mobile Engineer</title>
        <meta name="title" content="James Robert Ouko | Senior Full Stack & Mobile Engineer" />
        <meta name="description" content="Senior Software Engineer with 6+ years building production-grade web apps, mobile apps, and APIs. React, Node.js, Flutter, Spring Boot, AWS. Based in Nairobi, Kenya." />
        <meta name="keywords" content="James Robert Ouko, Senior Software Engineer, Full Stack Developer, Mobile Developer, React Developer, Node.js, Flutter, Spring Boot, Android, API Architect, Nairobi Kenya" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://devouko.netlify.app/" />
        <meta property="og:title" content="James Robert Ouko | Senior Full Stack & Mobile Engineer" />
        <meta property="og:description" content="Senior Software Engineer with 6+ years building production-grade web apps, mobile apps, and APIs. React, Node.js, Flutter, Spring Boot, AWS." />
        <meta property="og:image" content="https://devouko.netlify.app/images/profile.jpg" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://devouko.netlify.app/" />
        <meta property="twitter:title" content="James Robert Ouko | Senior Full Stack & Mobile Engineer" />
        <meta property="twitter:description" content="Senior Software Engineer with 6+ years building production-grade web apps, mobile apps, and APIs. React, Node.js, Flutter, Spring Boot, AWS." />
        <meta property="twitter:image" content="https://devouko.netlify.app/images/profile.jpg" />
        <link rel="canonical" href="https://devouko.netlify.app/" />
      </Helmet>

      <AnimatePresence mode="wait">
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-black text-white">
            <Navbar currentTheme={currentTheme} toggleTheme={toggleTheme} />
            <Hero />
            <About />
            <Projects />
            <Services />
            <Testimonials />
            <Contact />
            <Footer />
          </div>
        </motion.div>
      </AnimatePresence>
    </HelmetProvider>
  );
};

export default Index;
