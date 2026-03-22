import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Github, ExternalLink, Video, FileText, Maximize } from 'lucide-react';
import { useState } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  demoLink?: string;
  githubLink?: string;
  videoLink?: string;
  caseStudyLink?: string;
  index: number;
}

const ProjectCard = ({ title, description, image, demoLink, githubLink, videoLink, caseStudyLink, index }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);
  const springConfig = { damping: 15, stiffness: 150 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); setIsHovered(false); };

  return (
    <motion.div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.08)',
        rotateX: isHovered ? springRotateX : 0,
        rotateY: isHovered ? springRotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ y: -8, boxShadow: '0 10px 40px rgba(204,0,95,0.15)' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="h-56 overflow-hidden relative group">
        <motion.img src={image} alt={title} className="w-full h-full object-cover" whileHover={{ scale: 1.1 }} transition={{ duration: 0.7 }} />
        <motion.button
          className="absolute top-2 right-2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
          style={{ background: 'rgba(204,0,95,0.8)' }}
          onClick={(e) => { e.stopPropagation(); window.open(image, '_blank'); }}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        >
          <Maximize className="h-4 w-4 text-white" />
        </motion.button>
      </div>
      <div className="p-6">
        <h3 className="text-base font-light tracking-wide text-white mb-2">{title}</h3>
        <p className="text-white/40 mb-4 text-sm font-light">{description}</p>
        <div className="flex flex-wrap gap-2">
          {demoLink && (
            <motion.a href={demoLink} target="_blank" rel="noopener noreferrer"
              className="px-4 py-1.5 rounded text-xs tracking-[0.1em] uppercase font-light text-white flex items-center gap-2"
              style={{ background: 'rgba(204,0,95,0.15)', border: '1px solid rgba(204,0,95,0.3)' }}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <ExternalLink className="h-3 w-3" /> Live
            </motion.a>
          )}
          {githubLink && (
            <motion.a href={githubLink} target="_blank" rel="noopener noreferrer"
              className="px-4 py-1.5 rounded text-xs tracking-[0.1em] uppercase font-light text-white/50 hover:text-white flex items-center gap-2 transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Github className="h-3 w-3" /> Code
            </motion.a>
          )}
          {videoLink && (
            <motion.a href={videoLink} target="_blank" rel="noopener noreferrer"
              className="px-4 py-1.5 rounded text-xs tracking-[0.1em] uppercase font-light text-[#cc005f] flex items-center gap-2"
              style={{ border: '1px solid rgba(204,0,95,0.3)' }}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Video className="h-3 w-3" /> Video
            </motion.a>
          )}
          {caseStudyLink && (
            <motion.a href={caseStudyLink} target="_blank" rel="noopener noreferrer"
              className="px-4 py-1.5 rounded text-xs tracking-[0.1em] uppercase font-light text-[#cc005f] flex items-center gap-2"
              style={{ border: '1px solid rgba(204,0,95,0.3)' }}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <FileText className="h-3 w-3" /> Case Study
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
