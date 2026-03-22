import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup, type PanInfo } from "framer-motion";
import { Server, Smartphone, Globe, Database, Users, Clock, FolderOpen, FileText, Award, Medal, Layers, Grid3X3, LayoutList } from "lucide-react";
import { cn } from "@/lib/utils";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

type LayoutMode = "stack" | "grid" | "list";

const SWIPE_THRESHOLD = 50;

const serviceCards = [
  {
    id: "api",
    icon: "server",
    title: "API Design & Development",
    tag: "Backend",
    description: "Scalable, well-documented APIs built for performance and security.",
    services: [
      "API Design", "API Development", "API Integration",
      "API Documentation", "API Versioning", "Security & Authentication",
      "Rate Limiting", "Data Transformation", "Webhooks",
      "API Monitoring", "API Testing", "Scalability",
    ],
  },
  {
    id: "mobile",
    icon: "smartphone",
    title: "Mobile Development",
    tag: "Android",
    description: "Native and hybrid mobile apps with polished UI and smooth deployment.",
    services: [
      "Android App Development", "Custom App Design", "Native App Development",
      "Hybrid App Development", "UI/UX Design", "App Testing",
      "App Maintenance", "App Optimization", "App Deployment",
    ],
  },
  {
    id: "web",
    icon: "globe",
    title: "Web Development",
    tag: "Full-Stack",
    description: "Full-stack web applications  responsive, secure, and production-ready.",
    services: [
      "Back-End Development", "Full-Stack Development", "E-commerce Development",
      "Web Maintenance", "Mobile-Responsive Design", "Search Engine Optimization",
      "Web Security", "API Integration", "Web Hosting",
    ],
  },
  {
    id: "cloud",
    icon: "database",
    title: "Cloud Services",
    tag: "DevOps",
    description: "Cloud-native architecture, DevOps pipelines, and infrastructure as code.",
    services: [
      "Cloud Architecture", "Cloud Migration", "Serverless Computing",
      "Cloud Security", "DevOps", "Infrastructure as Code",
      "Containerization", "Microservices", "Cloud Monitoring",
    ],
  },
];

const stats = [
  { value: "10+", label: "Clients" },
  { value: "3+",  label: "Years" },
  { value: "30+", label: "Projects" },
  { value: "12+", label: "Publications" },
  { value: "4+",  label: "Awards" },
  { value: "8+",  label: "Certifications" },
];

const iconMap: Record<string, React.ReactNode> = {
  server:     <Server     className="w-6 h-6 text-[#cc005f]" />,
  smartphone: <Smartphone className="w-6 h-6 text-[#cc005f]" />,
  globe:      <Globe      className="w-6 h-6 text-[#cc005f]" />,
  database:   <Database   className="w-6 h-6 text-[#cc005f]" />,
};

const statsIcons: React.ReactNode[] = [
  <Users      className="w-6 h-6 text-[#cc005f]" />,
  <Clock      className="w-6 h-6 text-[#cc005f]" />,
  <FolderOpen className="w-6 h-6 text-[#cc005f]" />,
  <FileText   className="w-6 h-6 text-[#cc005f]" />,
  <Award      className="w-6 h-6 text-[#cc005f]" />,
  <Medal      className="w-6 h-6 text-[#cc005f]" />,
];

const layoutIcons = { stack: Layers, grid: Grid3X3, list: LayoutList };

const Services = () => {
  const [layout, setLayout] = useState<LayoutMode>("stack");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    const swipe = Math.abs(offset.x) * velocity.x;
    if (offset.x < -SWIPE_THRESHOLD || swipe < -1000) {
      setActiveIndex((prev) => (prev + 1) % serviceCards.length);
    } else if (offset.x > SWIPE_THRESHOLD || swipe > 1000) {
      setActiveIndex((prev) => (prev - 1 + serviceCards.length) % serviceCards.length);
    }
    setIsDragging(false);
  };

  const getStackOrder = () => {
    const reordered = [];
    for (let i = 0; i < serviceCards.length; i++) {
      const index = (activeIndex + i) % serviceCards.length;
      reordered.push({ ...serviceCards[index], stackPosition: i });
    }
    return reordered.reverse();
  };

  const displayCards = layout === "stack"
    ? getStackOrder()
    : serviceCards.map((c, i) => ({ ...c, stackPosition: i }));

  const containerStyles: Record<LayoutMode, string> = {
    stack: "relative h-[520px] w-full max-w-lg mx-auto",
    grid:  "grid grid-cols-1 md:grid-cols-2 gap-5",
    list:  "flex flex-col gap-4",
  };

  return (
    <section
      id="services"
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0a0a0f 0%, #050508 50%, #0a0a0f 100%)" }}
    >
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #cc005f 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-[0.08]"
          style={{ background: "radial-gradient(circle, #cc005f 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(204,0,95,0.4), transparent)" }} />

      <div className="relative container mx-auto px-4">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[#cc005f] text-xs tracking-[0.3em] uppercase font-light mb-3">What I offer</p>
          <h2 className="text-4xl md:text-5xl font-extralight text-white mb-4">Services</h2>
          <div className="w-16 h-px mx-auto mb-5"
            style={{ background: "linear-gradient(90deg, transparent, #cc005f, transparent)" }} />
          <p className="text-white/40 max-w-xl mx-auto text-sm font-light leading-relaxed">
            End-to-end engineering across APIs, mobile, web, and cloud  built to scale.
          </p>
        </motion.div>

        {/* Layout toggle */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-1 rounded-lg p-1"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            {(Object.keys(layoutIcons) as LayoutMode[]).map((mode) => {
              const Icon = layoutIcons[mode];
              return (
                <button key={mode} onClick={() => setLayout(mode)}
                  className={cn("rounded-md p-2 transition-all duration-200",
                    layout === mode ? "bg-[#cc005f] text-white" : "text-white/30 hover:text-white hover:bg-white/5"
                  )}
                  aria-label={`Switch to ${mode} layout`}>
                  <Icon className="h-4 w-4" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards */}
        <LayoutGroup>
          <motion.div layout className={cn(containerStyles[layout])}>
            <AnimatePresence mode="popLayout">
              {displayCards.map((card) => {
                const sp = card.stackPosition;
                const isTop = layout === "stack" && sp === 0;
                const stackStyle = layout === "stack"
                  ? { top: sp * 10, left: sp * 6, zIndex: serviceCards.length - sp, rotate: (sp - 1) * 1.2 }
                  : { top: 0, left: 0, zIndex: 1, rotate: 0 };

                return (
                  <motion.div
                    key={card.id}
                    layoutId={card.id}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1, x: 0, ...stackStyle }}
                    exit={{ opacity: 0, scale: 0.8, x: -200 }}
                    transition={{ type: "spring", stiffness: 280, damping: 26 }}
                    drag={isTop ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.7}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={handleDragEnd}
                    whileDrag={{ scale: 1.02, cursor: "grabbing" }}
                    className={cn(
                      "rounded-2xl overflow-hidden",
                      layout === "stack" && "absolute w-full",
                      layout === "stack" && isTop && "cursor-grab active:cursor-grabbing",
                      layout !== "stack" && "w-full cursor-default",
                    )}
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      backdropFilter: "blur(20px) saturate(180%)",
                      WebkitBackdropFilter: "blur(20px) saturate(180%)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
                    }}
                  >
                    {/* Top shine */}
                    <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: "rgba(204,0,95,0.12)", border: "1px solid rgba(204,0,95,0.25)" }}>
                          {iconMap[card.icon]}
                        </div>
                        <div>
                          <h3 className="text-white font-light tracking-wide text-base">{card.title}</h3>
                          <span className="text-[10px] tracking-[0.2em] uppercase font-light text-[#cc005f]/70">{card.tag}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-white/40 text-xs font-light leading-relaxed mb-4">{card.description}</p>

                      {/* Full service list */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {card.services.map((service) => (
                          <div key={service} className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#cc005f] flex-shrink-0" />
                            <span className="text-white/60 text-xs font-light">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Swipe hint on top card */}
                    {isTop && (
                      <div className="pb-3 text-center">
                        <span className="text-[10px] text-white/20 tracking-[0.2em] uppercase">swipe to navigate</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* Dot indicators for stack mode */}
        {layout === "stack" && (
          <div className="flex justify-center gap-2 mt-8">
            {serviceCards.map((_, index) => (
              <button key={index} onClick={() => setActiveIndex(index)}
                className={cn("h-1 rounded-full transition-all duration-300",
                  index === activeIndex ? "w-6 bg-[#cc005f]" : "w-1.5 bg-white/20 hover:bg-white/40"
                )}
                aria-label={`Go to card ${index + 1}`} />
            ))}
          </div>
        )}

        {/* Stats  glass panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }}
          className="rounded-2xl p-8 mt-16 mb-12"
          style={{
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(24px) saturate(160%)",
            WebkitBackdropFilter: "blur(24px) saturate(160%)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {stats.map((stat, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.06 }} viewport={{ once: true }}
                className="flex flex-col items-center gap-2"
              >
                {statsIcons[i]}
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-white/35 text-xs tracking-widest uppercase font-light">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTAs */}
        <div className="flex justify-center gap-4">
          <LiquidButton size="lg" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            Hire Me
          </LiquidButton>
          <LiquidButton size="lg" variant="pink" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
            View Work
          </LiquidButton>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(204,0,95,0.3), transparent)" }} />
    </section>
  );
};

export default Services;

