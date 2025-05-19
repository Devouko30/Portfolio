
import { motion } from 'framer-motion';
import { Award, Clock, Users, Code, FileText, GraduationCap } from 'lucide-react';

const statItems = [
  { value: '10+', label: 'CLIENTS', icon: Users },
  { value: '3+', label: 'YEARS', icon: Clock },
  { value: '30+', label: 'PROJECTS', icon: Code },
  { value: '12+', label: 'PUBLICATIONS', icon: FileText },
  { value: '4+', label: 'AWARDS', icon: Award },
  { value: '8+', label: 'CERTIFICATIONS', icon: GraduationCap },
];

const Stats = () => {
  return (
    <section className="bg-gray-700 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0">
          {statItems.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center border-r border-gray-600 last:border-r-0 p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring",
                  stiffness: 260, 
                  damping: 20,
                  delay: 0.1 + index * 0.1
                }}
              >
                <item.icon className="h-10 w-10 mb-3 text-portfolio-purple" />
              </motion.div>
              <motion.p 
                className="text-4xl md:text-5xl font-bold text-white mb-2"
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring",
                  stiffness: 260, 
                  damping: 20,
                  delay: 0.2 + index * 0.1
                }}
              >
                {item.value}
              </motion.p>
              <p className="text-white/80 text-sm uppercase">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
