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

const ProjectCard = ({
  title,
  description,
  image,
  demoLink,
  githubLink,
  videoLink,
  caseStudyLink,
  index
}: ProjectCardProps) => {
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
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const openImageInNewTab = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(image, '_blank');
  };

  return (
    <motion.div
      className="bg-black/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-800 hover:border-portfolio-purple transition-all duration-300 perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ y: -10, boxShadow: "0 10px 20px rgba(139, 92, 246, 0.2)" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? springRotateX : 0,
        rotateY: isHovered ? springRotateY : 0,
        transformStyle: "preserve-3d"
      }}
    >
      <div className="h-56 overflow-hidden relative group">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.7 }}
        />
        
        {/* Zoom button overlay */}
        <motion.button
          className="absolute top-2 right-2 bg-black/70 hover:bg-portfolio-purple p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
          onClick={openImageInNewTab}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <Maximize className="h-4 w-4 text-white" />
        </motion.button>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-4 text-sm">{description}</p>
        <div className="flex flex-wrap gap-3">
          {demoLink && (
            <motion.a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-portfolio-purple hover:bg-portfolio-secondary text-white px-4 py-2 rounded-md text-sm flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View Demo
            </motion.a>
          )}
          {githubLink && (
            <motion.a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-portfolio-purple text-portfolio-purple px-4 py-2 rounded-md text-sm flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="mr-2 h-4 w-4" />
              Code
            </motion.a>
          )}
          {videoLink && (
            <motion.a
              href={videoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md text-sm flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Video className="mr-2 h-4 w-4" />
              Watch Demo
            </motion.a>
          )}
          {caseStudyLink && (
            <motion.a
              href={caseStudyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-green-500 text-green-500 px-4 py-2 rounded-md text-sm flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="mr-2 h-4 w-4" />
              Case Study
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;