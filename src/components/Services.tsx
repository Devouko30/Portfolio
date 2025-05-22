import { motion } from 'framer-motion';
import { 
  Code, 
  Server, 
  Smartphone, 
  Globe, 
  Database, 
  Lock, 
  Webhook, 
  BarChart, 
  TestTube, 
  Scale,
  Layers,
  Palette,
  Bug,
  RefreshCw,
  Zap,
  Upload,
  Users,
  Clock,
  FolderOpen,
  FileText,
  Award,
  Medal
} from 'lucide-react';

const Services = () => {
  const serviceCategories = [
    {
      title: "API Design & Development",
      icon: <Server className="w-12 h-12 text-portfolio-purple" />,
      services: [
        "API Design", "API Development", "API Integration", 
        "API Documentation", "API Versioning", "Security and Authentication",
        "Rate Limiting", "Data Transformation", "Webhooks",
        "API Monitoring", "API Testing", "Scalability"
      ]
    },
    {
      title: "Android Development",
      icon: <Smartphone className="w-12 h-12 text-portfolio-purple" />,
      services: [
        "Android App Development", "Custom App Design", "Native App Development",
        "Hybrid App Development", "UI/UX Design", "App Testing",
        "App Maintenance", "App Optimization", "App Deployment"
      ]
    },
    {
      title: "Web Development",
      icon: <Globe className="w-12 h-12 text-portfolio-purple" />,
      services: [
        "Back-End Development", "Full-Stack Development", "E-commerce Development",
        "Web Maintenance", "Mobile-Responsive Design", "Search Engine Optimization",
        "Web Security", "API Integration", "Web Hosting"
      ]
    },
    {
      title: "Cloud Services",
      icon: <Database className="w-12 h-12 text-portfolio-purple" />,
      services: [
        "Cloud Architecture", "Cloud Migration", "Serverless Computing",
        "Cloud Security", "DevOps", "Infrastructure as Code",
        "Containerization", "Microservices", "Cloud Monitoring"
      ]
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Services</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            What can I do for you? Here are some of the services that I offer when it comes to web development and business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col items-center mb-6">
                {category.icon}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-4">{category.title}</h3>
              </div>
              <ul className="space-y-2">
                {category.services.map((service, serviceIndex) => (
                  <li key={serviceIndex} className="text-gray-600 dark:text-gray-300 text-sm flex items-center">
                    <span className="w-1.5 h-1.5 bg-portfolio-purple rounded-full mr-2"></span>
                    {service}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { value: "10+", label: "Clients", icon: <Users className="w-8 h-8 text-portfolio-purple" /> },
            { value: "3+", label: "Years", icon: <Clock className="w-8 h-8 text-portfolio-purple" /> },
            { value: "30+", label: "Projects", icon: <FolderOpen className="w-8 h-8 text-portfolio-purple" /> },
            { value: "12+", label: "Publications", icon: <FileText className="w-8 h-8 text-portfolio-purple" /> },
            { value: "4+", label: "Awards", icon: <Award className="w-8 h-8 text-portfolio-purple" /> },
            { value: "8+", label: "Certifications", icon: <Medal className="w-8 h-8 text-portfolio-purple" /> }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center"
            >
              <div className="flex justify-center mb-2">
                {stat.icon}
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;