
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

const About = () => {
  const skills = [
    'JavaScript', 'TypeScript', 'React', 
    'Node.js', 'HTML5', 'CSS3/SCSS', 
    'Tailwind CSS', 'Git', 'Responsive Design'
  ];
  
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="h-1 w-20 bg-portfolio-purple mx-auto"></div>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div 
            className="md:w-2/5"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="aspect-square relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800&h=800" 
                alt="About Me" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </motion.div>

          <motion.div 
            className="md:w-3/5"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">A passionate web developer</h3>
            <p className="text-gray-700 mb-6">
              I am a skilled Full Stack Developer with several years of experience creating elegant, 
              responsive web applications. My journey started with a curiosity about how websites work, 
              which led me to dive deep into modern web technologies.
            </p>
            <p className="text-gray-700 mb-8">
              I love turning complex problems into simple, beautiful, and intuitive solutions. 
              When I'm not coding, you can find me exploring new technologies, contributing to 
              open-source projects, or sharing my knowledge through technical writing.
            </p>

            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-3">My Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-800 shadow-sm border border-gray-200"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            <motion.a
              href="/files/cv.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-portfolio-purple text-white rounded-lg font-medium shadow-lg shadow-portfolio-purple/20 group relative overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Download CV</span>
              <Download className="h-5 w-5" />
              <motion.span
                className="absolute inset-0 w-full h-full flex justify-center"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <motion.span 
                  className="h-2 w-2 rounded-full bg-white mt-1 opacity-0"
                  animate={{ y: [0, 15], opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              </motion.span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
