
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, FileText, Video } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink?: string;
  githubLink?: string;
  caseStudyLink?: string;
  videoLink?: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with product catalog, shopping cart, and checkout process.',
    image: 'https://images.unsplash.com/photo-1661956602944-249bcd04b63f?auto=format&fit=crop&q=80&w=2340&h=1316',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    demoLink: 'https://example.com/demo',
    githubLink: 'https://github.com/yourusername/ecommerce',
    caseStudyLink: 'https://example.com/case-study',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A kanban-style task manager with drag-and-drop functionality and team collaboration features.',
    image: 'https://images.unsplash.com/photo-1611224885990-2ae89598466f?auto=format&fit=crop&q=80&w=2340&h=1316',
    tags: ['TypeScript', 'React', 'Firebase', 'Redux'],
    demoLink: 'https://example.com/demo',
    githubLink: 'https://github.com/yourusername/task-app',
    videoLink: 'https://example.com/video',
  },
  {
    id: 3,
    title: 'Portfolio Website',
    description: 'A responsive portfolio website showcasing skills, projects, and contact information.',
    image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&q=80&w=2340&h=1316',
    tags: ['React', 'Tailwind CSS', 'Framer Motion'],
    demoLink: 'https://example.com/demo',
    githubLink: 'https://github.com/yourusername/portfolio',
  }
];

const ProjectCard = ({ project, index }: { project: Project, index: number }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="h-56 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map(tag => (
            <span 
              key={tag} 
              className="px-3 py-1 bg-portfolio-light-purple/30 text-portfolio-deep-purple rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-3">
          {project.demoLink && (
            <motion.a 
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-portfolio-purple text-white rounded-lg text-sm font-medium inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={16} />
              Live Demo
            </motion.a>
          )}
          
          {project.githubLink && (
            <motion.a 
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium inline-flex items-center gap-2"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.02)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={16} />
              Source Code
            </motion.a>
          )}
          
          {project.caseStudyLink && (
            <motion.a 
              href={project.caseStudyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium inline-flex items-center gap-2"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.02)" }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText size={16} />
              Case Study
            </motion.a>
          )}
          
          {project.videoLink && (
            <motion.a 
              href={project.videoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium inline-flex items-center gap-2"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.02)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Video size={16} />
              Video Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [category, setCategory] = useState('all');
  const categories = ['all', 'web', 'mobile', 'design'];
  
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <div className="h-1 w-20 bg-portfolio-purple mx-auto mb-8"></div>
          <p className="text-gray-600 max-w-xl mx-auto">
            Explore my recent projects showcasing my skills in web development, design, and problem-solving.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
