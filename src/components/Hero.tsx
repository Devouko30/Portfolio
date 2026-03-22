import { Component as HorizonHero } from '@/components/ui/horizon-hero-section';
import { Github, Linkedin, Twitter, Facebook } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="bg-black">
      <HorizonHero
        name="Dev Ouko"
        title="Full Stack Developer · Mobile Developer"
        subtitle="Building the future, one line at a time"
      />

      {/* Social links */}
      <div className="fixed bottom-8 right-8 z-30 flex flex-col gap-4">
        {[
          { icon: Github,   href: 'https://github.com/Devouko' },
          { icon: Linkedin, href: 'https://linkedin.com' },
          { icon: Twitter,  href: 'https://twitter.com' },
          { icon: Facebook, href: 'https://facebook.com' },
        ].map(({ icon: Icon, href }) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer"
            className="text-white/30 hover:text-[#cc005f] transition-colors duration-300">
            <Icon size={18} />
          </a>
        ))}
      </div>
    </section>
  );
};

export default Hero;
