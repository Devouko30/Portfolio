
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-20">
      {/* Background animated elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="w-64 h-64 rounded-full bg-portfolio-light-purple/20 absolute top-1/4 left-1/4"
          animate={{ 
            x: [0, 10, -10, 0],
            y: [0, -15, 5, 0],
            scale: [1, 1.05, 0.95, 1]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="w-40 h-40 rounded-full bg-portfolio-purple/10 absolute bottom-1/4 right-1/3"
          animate={{ 
            x: [0, -20, 20, 0],
            y: [0, 10, -10, 0],
            scale: [1, 0.9, 1.1, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <motion.h2 
              className="text-gray-600 mb-3 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Hello, I'm
            </motion.h2>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-portfolio-purple to-portfolio-deep-purple text-transparent bg-clip-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Your Name
            </motion.h1>
            
            <motion.h3 
              className="text-2xl md:text-3xl font-medium text-gray-700 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Web Developer & Designer
            </motion.h3>
            
            <motion.p 
              className="text-gray-600 mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              I create beautiful, responsive websites with modern technologies.
              Passionate about delivering exceptional user experiences through clean code.
            </motion.p>
            
            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.a 
                href="#projects"
                className="px-6 py-3 bg-portfolio-purple text-white rounded-lg font-medium shadow-lg shadow-portfolio-purple/20"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.a>
              
              <motion.a 
                href="#contact"
                className="px-6 py-3 border-2 border-portfolio-purple text-portfolio-purple rounded-lg font-medium"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(139, 92, 246, 0.05)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>
            </motion.div>
          </div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Replace with your own profile image */}
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-portfolio-purple to-portfolio-deep-purple p-1">
              <div className="w-full h-full rounded-full bg-white overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800&h=800" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
