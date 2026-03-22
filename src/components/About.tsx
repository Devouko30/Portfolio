import { motion } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import { GlowingCard } from '@/components/ui/glowing-card';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  viewport: { once: true },
});

const skills = [
  { name: 'Java', level: 100, category: 'backend' },
  { name: 'PHP', level: 100, category: 'backend' },
  { name: 'Node.js', level: 80, category: 'backend' },
  { name: 'SpringBoot', level: 100, category: 'backend' },
  { name: 'Express', level: 85, category: 'backend' },
  { name: 'Django', level: 75, category: 'backend' },
  { name: 'SQL', level: 90, category: 'backend' },
  { name: 'MongoDB', level: 85, category: 'backend' },
  { name: 'React.js', level: 70, category: 'frontend' },
  { name: 'Next.js', level: 75, category: 'frontend' },
  { name: 'Framer Motion', level: 80, category: 'frontend' },
  { name: 'Tailwind CSS', level: 90, category: 'frontend' },
  { name: 'TypeScript', level: 85, category: 'frontend' },
  { name: 'Android', level: 90, category: 'mobile' },
  { name: 'React Native', level: 80, category: 'mobile' },
  { name: 'Flutter', level: 70, category: 'mobile' },
];

const profileInfo = [
  { label: 'Full Name', value: 'James Robert Ouko' },
  { label: 'Degree', value: 'Computer Science' },
  { label: 'Position', value: 'Software Engineer' },
  { label: 'Email', value: 'jamesouko41@gmail.com' },
];

const SkillBar = ({ name, level, delay }: { name: string; level: number; delay: number }) => (
  <motion.div
    className="glass rounded-lg p-3 flex flex-col gap-2"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    whileHover={{ borderColor: 'rgba(204,0,95,0.4)', y: -2 }}
  >
    <div className="flex justify-between items-center">
      <span className="text-xs tracking-[0.15em] uppercase text-white/70 font-light">{name}</span>
      <span className="text-xs text-[#cc005f] font-light">{level}%</span>
    </div>
    <div className="h-px bg-white/10 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-[#cc005f]"
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        transition={{ duration: 1, delay: delay + 0.2, ease: 'easeOut' }}
        viewport={{ once: true }}
      />
    </div>
  </motion.div>
);

const About = () => (
  <section id="about" className="relative py-32 bg-black overflow-hidden">
    {/* Background grid */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#cc005f]/30 to-transparent" />

    <div className="container mx-auto px-6 relative z-10">
      {/* Section header */}
      <motion.div {...fadeUp()} className="mb-20">
        <p className="text-[#cc005f] text-xs tracking-[0.4em] uppercase font-light mb-3">01 — About</p>
        <h2 className="text-4xl md:text-5xl font-extralight text-white tracking-wide">Who I Am</h2>
        <div className="section-line mt-4" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
        {/* Left — bio + profile info */}
        <div className="space-y-8">
          <motion.div {...fadeUp(0.1)} className="flex items-start gap-6">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 rounded-xl bg-[#cc005f]/20 blur-xl" />
              <img
                src="images/profile.jpg"
                alt="Profile"
                className="relative w-28 h-28 object-cover rounded-xl glass border border-white/10"
              />
            </div>
            <p className="text-white/50 font-light leading-relaxed text-sm">
              Senior Software Engineer with 6+ years building production-grade systems across web, mobile, and cloud.
              I architect scalable APIs, ship polished mobile apps, and lead full-stack projects from concept to deployment.
              Passionate about clean code, performance, and products that actually solve real problems.
            </p>
          </motion.div>

          {/* Profile info grid */}
          <motion.div {...fadeUp(0.2)} className="grid grid-cols-2 gap-3">
            {profileInfo.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                viewport={{ once: true }}
              >
                <GlowingCard className="glass" animationDuration={`${4.5 + i * 0.5}s`}>
                  <div className="p-4">
                    <p className="text-white/30 text-xs tracking-[0.2em] uppercase font-light mb-1">{info.label}</p>
                    <p className="text-white font-light text-sm">{info.value}</p>
                  </div>
                </GlowingCard>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div {...fadeUp(0.4)} className="flex gap-4 flex-wrap">
            <motion.a
              href="/files/JamesRobertOukoResume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 glass rounded-lg text-xs tracking-[0.2em] uppercase font-light text-white hover:border-white/30 transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Download size={14} /> Download CV
            </motion.a>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 glass-pink rounded-lg text-xs tracking-[0.2em] uppercase font-light text-[#cc005f] hover:bg-[#cc005f]/20 transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Hire Me <ArrowRight size={14} />
            </motion.a>
          </motion.div>
        </div>

        {/* Right — skills */}
        <div className="space-y-8">
          {(['backend', 'frontend', 'mobile'] as const).map((cat, ci) => (
            <motion.div key={cat} {...fadeUp(0.1 + ci * 0.1)}>
              <p className="text-white/30 text-xs tracking-[0.3em] uppercase font-light mb-4">{cat}</p>
              <div className="grid grid-cols-2 gap-2">
                {skills.filter(s => s.category === cat).map((skill, i) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={0.1 + ci * 0.1 + i * 0.04} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Tech stack strip */}
      <motion.div
        {...fadeUp(0.3)}
        className="mt-4 pt-12 border-t border-white/5"
      >
        <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase font-light text-center mb-6">Core Stack</p>
        <div className="flex flex-wrap justify-center gap-3">
          {['React', 'Next.js', 'TypeScript', 'Node.js', 'Spring Boot', 'Java', 'PHP', 'Python', 'Flutter', 'Android', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'Redis', 'GraphQL'].map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              viewport={{ once: true }}
              className="px-3 py-1.5 rounded-md text-[10px] tracking-[0.15em] uppercase font-light text-white/40 border border-white/8 hover:border-[#cc005f]/40 hover:text-white/70 transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default About;
