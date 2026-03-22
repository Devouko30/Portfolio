import { motion, useInView } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import { GlowingCard } from '@/components/ui/glowing-card';
import React, { useEffect, useRef, useState } from 'react';

const CODE_LINES = [
  { text: 'const engineer = {',              color: '#c084fc' },
  { text: '  name: "James Robert Ouko",',    color: '#86efac' },
  { text: '  role: "Senior Software Eng.",', color: '#86efac' },
  { text: '  location: "Nairobi, Kenya",',   color: '#86efac' },
  { text: '  stack: [',                      color: '#93c5fd' },
  { text: '    "React", "Next.js",',         color: '#fde68a' },
  { text: '    "Node.js", "Spring Boot",',   color: '#fde68a' },
  { text: '    "Flutter", "AWS",',           color: '#fde68a' },
  { text: '  ],',                            color: '#93c5fd' },
  { text: '  experience: "6+ years",',       color: '#86efac' },
  { text: '  projects: 40,',                 color: '#fb923c' },
  { text: '  available: true,',              color: '#cc005f' },
  { text: '  hire: () => contact(),',        color: '#c084fc' },
  { text: '};',                              color: '#c084fc' },
];

const useCodeTyper = (active: boolean, speed = 22) => {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [committed, setCommitted] = useState<string[]>([]);

  useEffect(() => {
    if (!active || lineIndex >= CODE_LINES.length) return;
    const current = CODE_LINES[lineIndex].text;
    if (charIndex < current.length) {
      const t = setTimeout(() => setCharIndex(c => c + 1), speed);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setCommitted(l => [...l, current]);
      setLineIndex(i => i + 1);
      setCharIndex(0);
    }, 55);
    return () => clearTimeout(t);
  }, [active, lineIndex, charIndex, speed]);

  const partial = lineIndex < CODE_LINES.length ? CODE_LINES[lineIndex].text.slice(0, charIndex) : '';
  return { committed, partial, lineIndex };
};

const AboutCodeBlock = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { committed, partial, lineIndex } = useCodeTyper(inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="rounded-xl overflow-hidden"
      style={{
        background: 'rgba(8,8,12,0.9)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(204,0,95,0.06)',
      }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5"
        style={{ background: 'rgba(255,255,255,0.03)' }}>
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-3 text-white/25 text-[11px] tracking-widest font-mono">engineer.ts</span>
        <span className="ml-auto text-white/15 text-[10px] font-mono">TypeScript</span>
      </div>
      {/* Code */}
      <div className="px-5 py-5 font-mono text-[12px] leading-7 overflow-x-auto">
        {/* Line numbers + code */}
        {committed.map((line, i) => (
          <div key={i} className="flex gap-4">
            <span className="select-none text-white/15 w-4 text-right flex-shrink-0">{i + 1}</span>
            <span style={{ color: CODE_LINES[i]?.color ?? '#e2e8f0' }}>{line}</span>
          </div>
        ))}
        {lineIndex < CODE_LINES.length && (
          <div className="flex gap-4">
            <span className="select-none text-white/15 w-4 text-right flex-shrink-0">{committed.length + 1}</span>
            <span style={{ color: CODE_LINES[lineIndex]?.color ?? '#e2e8f0' }}>
              {partial}<span className="animate-pulse" style={{ color: '#cc005f' }}>▋</span>
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
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

        {/* Middle — code snippet */}
        <motion.div {...fadeUp(0.2)} className="flex flex-col justify-center">
          <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase font-light mb-4">// in code</p>
          <AboutCodeBlock />
        </motion.div>

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
