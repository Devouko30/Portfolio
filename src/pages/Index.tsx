import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';

interface IndexProps {
  currentTheme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Index = ({ currentTheme, toggleTheme }: IndexProps) => {
  // Smooth scroll implementation
  useEffect(() => {
    // Get all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    const cleanupFunctions = [];
    
    const handleClick = function(e) {
      e.preventDefault();
      
      // Get the target element
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Smooth scroll to the target
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };
    
    // Add event listeners and store them for cleanup
    anchorLinks.forEach(link => {
      link.addEventListener('click', handleClick);
      cleanupFunctions.push(() => link.removeEventListener('click', handleClick));
    });
    
    // Proper cleanup
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, []);

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>James Robert Ouko | Full Stack Developer & Mobile Developer</title>
        <meta name="title" content="James Robert Ouko | Full Stack Developer & Mobile Developer" />
        <meta name="description" content="Professional portfolio of James Robert Ouko, a Full Stack Web Developer and Mobile Developer with expertise in Java, PHP, React, and Android development." />
        <meta name="keywords" content="James Robert Ouko, Full Stack Developer, Mobile Developer, Web Development, API Design, Java Developer, PHP Developer, React Developer, Android Developer" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://portfolio-devouko30s-projects.vercel.app/" />
        <meta property="og:title" content="James Robert Ouko | Full Stack Developer & Mobile Developer" />
        <meta property="og:description" content="Professional portfolio of James Robert Ouko, a Full Stack Web Developer and Mobile Developer with expertise in Java, PHP, React, and Android development." />
        <meta property="og:image" content="https://portfolio-devouko30s-projects.vercel.app/profile.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://portfolio-devouko30s-projects.vercel.app/" />
        <meta property="twitter:title" content="James Robert Ouko | Full Stack Developer & Mobile Developer" />
        <meta property="twitter:description" content="Professional portfolio of James Robert Ouko, a Full Stack Web Developer and Mobile Developer with expertise in Java, PHP, React, and Android development." />
        <meta property="twitter:image" content="https://portfolio-devouko30s-projects.vercel.app/profile.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://portfolio-devouko30s-projects.vercel.app/" />
      </Helmet>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTheme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`${currentTheme === 'dark' ? 'dark' : ''}`}
        >
        <div className="bg-white dark:bg-gray-950 text-black dark:text-white transition-colors duration-300">
          <Navbar currentTheme={currentTheme} toggleTheme={toggleTheme} />
          <Hero />
          <About />
          <Projects />
          <Services />
          <Contact />
          <Footer />
          
          {/* Floating theme toggle button */}
          <div className="fixed bottom-6 right-6 z-50">
            <ThemeToggle currentTheme={currentTheme} toggleTheme={toggleTheme} />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;