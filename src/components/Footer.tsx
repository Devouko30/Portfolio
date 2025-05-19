
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-portfolio-dark pt-10 pb-6 text-gray-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="text-2xl font-bold text-white">Portfolio</a>
            <p className="mt-2 text-gray-400">Crafting digital experiences.</p>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-12 space-y-6 md:space-y-0">
            <div>
              <h4 className="text-lg font-semibold mb-3 text-white">Navigation</h4>
              <ul className="space-y-2">
                {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                  <li key={item}>
                    <a 
                      href={`#${item.toLowerCase()}`} 
                      className="text-gray-400 hover:text-portfolio-light-purple transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-3 text-white">Connect</h4>
              <ul className="space-y-2">
                {[
                  { name: 'GitHub', href: 'https://github.com' },
                  { name: 'LinkedIn', href: 'https://linkedin.com' },
                  { name: 'Twitter', href: 'https://twitter.com' },
                  { name: 'Email', href: 'mailto:hello@example.com' }
                ].map((item) => (
                  <li key={item.name}>
                    <a 
                      href={item.href} 
                      className="text-gray-400 hover:text-portfolio-light-purple transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Your Name. All rights reserved.
            </p>
            
            <div className="mt-4 md:mt-0">
              <motion.a 
                href="#home"
                className="inline-block p-2 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
