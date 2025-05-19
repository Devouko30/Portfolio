
import { motion } from 'framer-motion';

const statItems = [
  { value: '10+', label: 'CLIENTS' },
  { value: '3+', label: 'YEARS' },
  { value: '30+', label: 'PROJECTS' },
  { value: '12+', label: 'PUBLICATIONS' },
  { value: '4+', label: 'AWARDS' },
  { value: '8+', label: 'CERTIFICATIONS' },
];

const Stats = () => {
  return (
    <section className="bg-portfolio-purple py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
          {statItems.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.p 
                className="text-4xl md:text-5xl font-bold text-white mb-2"
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring",
                  stiffness: 260, 
                  damping: 20,
                  delay: 0.1 + index * 0.1
                }}
              >
                {item.value}
              </motion.p>
              <p className="text-white/80 text-sm">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
