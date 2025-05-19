
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

const CVDownload = () => {
  return (
    <div className="my-6">
      <motion.a
        href="/files/cv.pdf"
        download
        target="_blank"
        className="inline-flex items-center justify-center gap-2 bg-black text-white border border-portfolio-purple px-6 py-3 rounded-md font-medium group"
        whileHover={{ 
          scale: 1.05, 
          boxShadow: "0px 0px 15px rgba(139, 92, 246, 0.5)" 
        }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="uppercase">Download CV</span>
        <motion.div
          className="relative"
          initial={{ y: 0 }}
          animate={{ y: [0, -2, 0, 2, 0] }}
          transition={{ 
            repeat: Infinity, 
            repeatType: "loop", 
            duration: 1.5, 
            ease: "easeInOut",
            repeatDelay: 0.5
          }}
        >
          <Download className="h-5 w-5" />
        </motion.div>
      </motion.a>
    </div>
  );
};

export default CVDownload;
