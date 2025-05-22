import { motion } from 'framer-motion';
import { ArrowDown, Twitter, Facebook, Linkedin, Github, Download, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// Move this OUTSIDE the component!
const heroLines = [
  'HELLO , WORLD',
  'I am Dev Ouko.',
  'FULL STACK WEB DEVELOPER | MOBILE DEVELOPER',
];

// Optimized typewriter hook with better cleanup
function useSequentialTypewriter(lines: string[], speed = 60, delay = 500) {
  const [displayed, setDisplayed] = useState<string[]>(Array(lines.length).fill(''));
  const timeoutsRef = useRef<number[]>([]);
  const activeRef = useRef(true);

  useEffect(() => {
    let line = 0;
    let char = 0;
    
    // Reset state on mount
    setDisplayed(Array(lines.length).fill(''));
    activeRef.current = true;
    
    // Clear any existing timeouts
    timeoutsRef.current.forEach(window.clearTimeout);
    timeoutsRef.current = [];

    function typeNext() {
      if (!activeRef.current) return;
      if (line >= lines.length) return;
      
      try {
        setDisplayed(prev => {
          const updated = [...prev];
          if (line < lines.length && char <= lines[line].length) {
            updated[line] = lines[line].slice(0, char + 1);
          }
          return updated;
        });
        
        char++;
        
        if (char <= lines[line].length) {
          const timeout = window.setTimeout(typeNext, speed);
          timeoutsRef.current.push(timeout);
        } else {
          line++;
          char = 0;
          
          if (line < lines.length) {
            const timeout = window.setTimeout(typeNext, delay);
            timeoutsRef.current.push(timeout);
          }
        }
      } catch (err) {
        console.error('Typewriter error:', err);
      }
    }
    
    // Start with a small delay
    const initialTimeout = window.setTimeout(typeNext, 100);
    timeoutsRef.current.push(initialTimeout);
    
    // Cleanup function
    return () => {
      activeRef.current = false;
      timeoutsRef.current.forEach(window.clearTimeout);
      timeoutsRef.current = [];
    };
  }, [lines, speed, delay]); // Depend on the actual lines array for safety
  
  return displayed;
}

const Hero = () => {
  // Slower typing speed and longer delay between lines
  const [h2, h1, h3] = useSequentialTypewriter(heroLines, 70, 400);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20 bg-gradient-to-b from-black to-gray-900">
      {/* Background gradient fallback */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-900 via-portfolio-dark to-portfolio-secondary"></div>
      
      <div className="container mx-auto px-4 flex-1 flex flex-col justify-center relative z-10">
        <div className="max-w-3xl mx-auto text-center flex flex-col justify-center items-center min-h-[60vh]">
          <motion.h2
            className="text-portfolio-purple font-bold uppercase tracking-widest mb-4 text-lg md:text-xl drop-shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ minHeight: '2.5rem' }}
          >
            {h2}
          </motion.h2>
          
          <motion.h1
            className="text-white dark:text-white text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ minHeight: '5rem' }}
          >
            {h1}
          </motion.h1>
          
          <motion.h3
            className="text-white dark:text-white text-lg md:text-2xl font-medium mb-10 uppercase tracking-wide drop-shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ minHeight: '2.5rem' }}
          >
            {h3}
          </motion.h3>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <motion.a
              href="#about"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white text-white rounded-lg font-medium text-lg hover:bg-white hover:text-black transition-colors shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>More About Me</span>
              <ArrowDown className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </div>
      
      {/* Social Icons */}
      <div className="w-full flex justify-center gap-6 absolute bottom-10 left-0 z-20">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-portfolio-purple transition-colors">
          <Twitter size={28} />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-portfolio-purple transition-colors">
          <Facebook size={28} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-portfolio-purple transition-colors">
          <Linkedin size={28} />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-portfolio-purple transition-colors">
          <Github size={28} />
        </a>
      </div>
      
      {/* Static background elements instead of animated ones */}
      <div className="absolute inset-0 -z-10">
        <div className="w-96 h-96 rounded-full bg-portfolio-purple/10 absolute top-1/4 left-1/4 blur-3xl" />
        <div className="w-96 h-96 rounded-full bg-blue-500/10 absolute bottom-1/4 right-1/4 blur-3xl" />
      </div>
    </section>
  );
};

export default Hero;