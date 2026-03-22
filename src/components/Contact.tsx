import { useState } from 'react';
import { motion } from 'framer-motion';
import { MailIcon, PhoneIcon, MapPinIcon, Github, Linkedin, Twitter, Facebook, Send } from 'lucide-react';
import { ContactCard } from '@/components/ui/contact-card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const contactInfo = [
  { icon: MailIcon,  label: 'Email',   value: 'jamesouko41@gmail.com' },
  { icon: PhoneIcon, label: 'Phone',   value: '+254 710 727 775' },
  { icon: MapPinIcon, label: 'Location', value: 'Nairobi, Kenya', className: 'col-span-2 lg:col-span-1' },
];

const socials = [
  { icon: Github,   href: 'https://github.com/Devouko',   label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com',          label: 'LinkedIn' },
  { icon: Twitter,  href: 'https://twitter.com',           label: 'Twitter' },
  { icon: Facebook, href: 'https://facebook.com',          label: 'Facebook' },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="relative py-32 bg-black overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#cc005f]/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="text-[#cc005f] text-xs tracking-[0.4em] uppercase font-light mb-3">04 — Contact</p>
          <h2 className="text-4xl md:text-5xl font-extralight text-white tracking-wide">Get In Touch</h2>
          <div className="section-line mt-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <ContactCard
            title="Let's work together"
            description="Have a project in mind, need a technical co-founder, or want to scale your engineering team? Fill out the form and I'll respond within 1 business day."
            contactInfo={contactInfo}
            formSectionClassName="bg-transparent"
          >
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-white/50 text-xs tracking-[0.15em] uppercase font-light">Name</Label>
                <Input
                  name="name" type="text" value={formData.name} onChange={handleChange} required
                  placeholder="James Ouko"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-[#cc005f]/50 focus-visible:border-[#cc005f]/40 rounded-lg h-10 text-sm font-light"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-white/50 text-xs tracking-[0.15em] uppercase font-light">Email</Label>
                <Input
                  name="email" type="email" value={formData.email} onChange={handleChange} required
                  placeholder="you@example.com"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-[#cc005f]/50 focus-visible:border-[#cc005f]/40 rounded-lg h-10 text-sm font-light"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-white/50 text-xs tracking-[0.15em] uppercase font-light">Phone</Label>
                <Input
                  name="phone" type="tel" value={formData.phone} onChange={handleChange}
                  placeholder="+254 700 000 000"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-[#cc005f]/50 focus-visible:border-[#cc005f]/40 rounded-lg h-10 text-sm font-light"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-white/50 text-xs tracking-[0.15em] uppercase font-light">Message</Label>
                <Textarea
                  name="message" value={formData.message} onChange={handleChange} required
                  placeholder="Hello, I'd like to talk about..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-[#cc005f]/50 focus-visible:border-[#cc005f]/40 rounded-lg text-sm font-light min-h-[100px] resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#cc005f] hover:bg-[#990047] text-white rounded-lg h-10 text-xs tracking-[0.2em] uppercase font-light transition-all duration-300 flex items-center justify-center gap-2"
              >
                {sent ? 'Message Sent ✓' : <><Send size={13} /> Send Message</>}
              </Button>

              {/* Social links */}
              <div className="flex justify-center gap-4 pt-2">
                {socials.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="text-white/20 hover:text-[#cc005f] transition-colors duration-300"
                    whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
                    aria-label={label}
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </form>
          </ContactCard>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
