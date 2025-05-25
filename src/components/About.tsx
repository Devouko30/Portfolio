import { motion } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';

const About = () => {
  const skills = [
    // Backend
    { name: 'JAVA', level: 100, category: 'backend' },
    { name: 'PHP', level: 100, category: 'backend' },
    { name: 'Node.js', level: 80, category: 'backend' },
    { name: 'SpringBoot', level: 100, category: 'backend' },
    { name: 'Express', level: 85, category: 'backend' },
    { name: 'Django', level: 75, category: 'backend' },
    { name: 'SQL', level: 90, category: 'backend' },
    { name: 'MongoDB', level: 85, category: 'backend' },
    
    // Frontend
    { name: 'React.js', level: 70, category: 'frontend' },
    { name: 'Next.js', level: 75, category: 'frontend' },
    { name: 'Framer Motion', level: 80, category: 'frontend' },
    { name: 'Tailwind CSS', level: 90, category: 'frontend' },
    { name: 'TypeScript', level: 85, category: 'frontend' },
    
    // Mobile
    { name: 'Android', level: 90, category: 'mobile' },
    { name: 'React Native', level: 80, category: 'mobile' },
    { name: 'Flutter', level: 70, category: 'mobile' }
  ];

  const profileInfo = [
    { label: 'Full Name', value: 'James Robert Ouko' },
    { label: 'Degree', value: 'Computer science' },
    { label: 'Current Position', value: 'Freelancer' },
    { label: 'Email', value: 'jamesouko41@gmail.com' }
  ];

  return (
    <section id="about" className="py-20 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
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

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <img
                src="images/profile.jpg"
                alt="Profile"
                className="w-40 h-40 object-cover rounded-xl shadow-lg mb-6 md:mb-0"
              />
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 md:mb-0">
                I am a Full Stack Web Developer with a rich and diverse background, driven by a fervor for innovation
                and a genuine desire to make a meaningful impact through technology. I started coding about three years ago,
                beginning with Java and then moving on to web technologies like HTML, CSS, JavaScript, and PHP.
                I've worked for companies and also run my own projects. I eagerly look forward to bringing my unique
                blend of skills, experience, and passion to contribute to your success.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold mb-6">Profile & Skills</h3>
            
            {/* Personal Info Section - Redesigned */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-12">
              <motion.h4 
                className="text-xl font-bold mb-4 text-portfolio-purple"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                Personal Info
              </motion.h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profileInfo.map((info, index) => (
                  <motion.div 
                    key={info.label} 
                    className="flex flex-col bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">{info.label}</span>
                    <span className="text-gray-900 dark:text-white font-bold text-lg">{info.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.hr 
              className="border-t border-gray-300 dark:border-gray-700 my-8"
              initial={{ opacity: 0, width: "0%" }}
              whileInView={{ opacity: 1, width: "100%" }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            />
            
            {/* Skills Section */}
            <div>
              <motion.h4 
                className="text-xl font-bold mb-6 text-portfolio-purple"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                Technical Skills
              </motion.h4>
              
              {/* Skill Categories */}
              <div className="space-y-8">
                {/* Backend Skills */}
                <div>
                  <h5 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">Backend</h5>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {skills.filter(skill => skill.category === 'backend').map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md hover:shadow-portfolio-purple/30 transition-all"
                        whileHover={{ y: -5, scale: 1.03 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex flex-col items-center">
                          <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                          <span className="text-portfolio-purple font-bold">{skill.level}%</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Frontend Skills */}
                <div>
                  <h5 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">Frontend</h5>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {skills.filter(skill => skill.category === 'frontend').map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md hover:shadow-portfolio-purple/30 transition-all"
                        whileHover={{ y: -5, scale: 1.03 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex flex-col items-center">
                          <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                          <span className="text-portfolio-purple font-bold">{skill.level}%</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Mobile Skills */}
                <div>
                  <h5 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">Mobile</h5>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {skills.filter(skill => skill.category === 'mobile').map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md hover:shadow-portfolio-purple/30 transition-all"
                        whileHover={{ y: -5, scale: 1.03 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex flex-col items-center">
                          <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                          <span className="text-portfolio-purple font-bold">{skill.level}%</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center gap-4 mt-12"
          >
            <motion.a
              href="/files/JamesRobertOukoResume.pdf"
              download
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-800 dark:bg-gray-700 text-white rounded-lg font-medium text-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Download CV</span>
              <Download className="h-5 w-5" />
            </motion.a>
           
            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-portfolio-purple border border-portfolio-purple text-white rounded-lg font-medium text-lg hover:bg-portfolio-secondary transition-colors shadow-md"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(204, 0, 95, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Hire Me</span>
              <ArrowRight className="h-5 w-5" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;