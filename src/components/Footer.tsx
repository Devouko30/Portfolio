import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Facebook, ArrowUp } from 'lucide-react';

const socials = [
  { icon: Github,   href: 'https://github.com/Devouko',  label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com',         label: 'LinkedIn' },
  { icon: Twitter,  href: 'https://twitter.com',          label: 'Twitter' },
  { icon: Facebook, href: 'https://facebook.com',         label: 'Facebook' },
];

const Footer = () => (
  <footer
    className="relative py-10 overflow-hidden"
    style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #000 100%)' }}
  >
    {/* Top edge */}
    <div className="absolute top-0 left-0 right-0 h-px"
      style={{ background: 'linear-gradient(90deg, transparent, rgba(204,0,95,0.3), transparent)' }} />

    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Brand + tagline */}
      <div className="flex flex-col items-center md:items-start gap-1">
        <p className="text-white/40 text-xs tracking-[0.3em] uppercase font-light">
          Dev<span className="text-[#cc005f]">ouko</span> &nbsp;·&nbsp; © {new Date().getFullYear()}
        </p>
        <p className="text-white/20 text-[10px] tracking-[0.2em] font-light">Senior Software Engineer · Nairobi, Kenya</p>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-white/20 text-[10px] tracking-[0.2em] uppercase font-light">Open to opportunities</span>
        </div>
      </div>

      {/* Socials */}
      <div className="flex items-center gap-5">
        {socials.map(({ icon: Icon, href, label }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-white/20 hover:text-[#cc005f] transition-colors duration-300"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon size={15} />
          </motion.a>
        ))}
      </div>

      {/* Back to top */}
      <motion.a
        href="#home"
        className="flex items-center gap-2 text-white/20 hover:text-white text-xs tracking-[0.2em] uppercase font-light transition-colors"
        whileHover={{ y: -2 }}
      >
        <ArrowUp size={13} /> Top
      </motion.a>
    </div>
  </footer>
);

export default Footer;
