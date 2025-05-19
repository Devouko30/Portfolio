
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  demoLink?: string;
  githubLink?: string;
  index: number;
}

const ProjectCard = ({ title, description, image, demoLink, githubLink, index }: ProjectCardProps) => {
  return (
    <motion.div
      className="bg-black/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-800 hover:border-portfolio-purple transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ y: -10, boxShadow: "0 10px 20px rgba(139, 92, 246, 0.2)" }}
    >
      <div className="h-56 overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-4 text-sm">{description}</p>
        <div className="flex space-x-3">
          {demoLink && (
            <motion.a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-portfolio-purple hover:bg-portfolio-deep-purple text-white px-4 py-2 rounded-md text-sm flex items-center"
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
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
