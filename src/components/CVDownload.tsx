import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileDown } from 'lucide-react';
import { useState } from 'react';

const CVDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    // Simulate download time
    setTimeout(() => setIsDownloading(false), 2000);
  };

  return (
    <div className="my-6 relative">
      <motion.a
        href="/files/cv.pdf"
        download
        target="_blank"
        className="inline-flex items-center justify-center gap-2 bg-black text-white border border-portfolio-purple px-6 py-3 rounded-md font-medium group relative overflow-hidden"
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 0px 15px rgba(139, 92, 246, 0.5)"
        }}
        whileTap={{ scale: 0.95 }}
        onClick={handleDownload}
      >
        <AnimatePresence>
          {isDownloading ? (
            <motion.div
              key="downloading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0 bg-black/80 flex items-center justify-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <FileDown className="h-5 w-5 text-portfolio-purple" />
              </motion.div>
            </motion.div>
          ) : (
            <>
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
            </>
          )}
        </AnimatePresence>
      </motion.a>
    </div>
  );
};

export default CVDownload;
