import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  currentTheme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeToggle = ({ currentTheme, toggleTheme }: ThemeToggleProps) => {
  return (
    <motion.button
      onClick={toggleTheme}
      className="p-3 rounded-full bg-portfolio-purple text-white shadow-lg hover:shadow-portfolio-purple/50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: currentTheme === 'light' ? 180 : 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        {currentTheme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;