import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' },
];

interface NavbarProps {
  currentTheme?: 'light' | 'dark';
  toggleTheme?: () => void;
}

const Navbar = ({ currentTheme, toggleTheme }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll events for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll function
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <motion.header 
      className={cn(
        'fixed w-full z-50 transition-all duration-300 dark:text-white text-gray-900',
        scrolled 
          ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-md py-4' 
          : 'bg-transparent py-6'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <a href="#home" className="text-2xl font-bold text-portfolio-purple">
            Portfolio
          </a>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <nav>
            <ul className="flex space-x-8">
              {navLinks.map((link, i) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <a 
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={cn(
                      'dark:text-gray-200 text-gray-700 hover:text-portfolio-purple transition-colors relative px-1 py-2',
                      activeSection === link.href.substring(1) ? 'text-portfolio-purple font-medium' : ''
                    )}
                  >
                    {link.name}
                    {activeSection === link.href.substring(1) && (
                      <motion.div 
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-portfolio-purple"
                        layoutId="activeSection"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>
          
          {/* Theme Toggle */}
          {currentTheme && toggleTheme && (
            <ThemeToggle currentTheme={currentTheme} toggleTheme={toggleTheme} />
          )}
        </div>

        {/* Mobile menu and theme toggle */}
        <div className="md:hidden flex items-center space-x-4">
          {currentTheme && toggleTheme && (
            <ThemeToggle currentTheme={currentTheme} toggleTheme={toggleTheme} />
          )}
          <button 
            className="dark:text-gray-200 text-gray-700 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div 
          className="md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-md"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4">
            <ul className="flex flex-col space-y-4">
              {navLinks.map((link, i) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <a 
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={cn(
                      'dark:text-gray-200 text-gray-700 hover:text-portfolio-purple transition-colors block py-2',
                      activeSection === link.href.substring(1) ? 'text-portfolio-purple font-medium' : ''
                    )}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;