"use client";
import { useState, type ReactNode } from "react";
import { motion, AnimatePresence, LayoutGroup, type PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";
import { Grid3X3, Layers, LayoutList } from "lucide-react";

export type LayoutMode = "stack" | "grid" | "list";

export interface CardData {
  id: string;
  title: string;
  description: string;
  icon?: ReactNode;
  color?: string;
  // extended for portfolio
  image?: string;
  tags?: string[];
  demoLink?: string;
  githubLink?: string;
}

export interface MorphingCardStackProps {
  cards?: CardData[];
  className?: string;
  defaultLayout?: LayoutMode;
  onCardClick?: (card: CardData) => void;
}

const layoutIcons = { stack: Layers, grid: Grid3X3, list: LayoutList };
const SWIPE_THRESHOLD = 50;

export function Component({
  cards = [],
  className,
  defaultLayout = "stack",
  onCardClick,
}: MorphingCardStackProps) {
  const [layout, setLayout] = useState<LayoutMode>(defaultLayout);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  if (!cards || cards.length === 0) return null;

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    const swipe = Math.abs(offset.x) * velocity.x;
    if (offset.x < -SWIPE_THRESHOLD || swipe < -1000) {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    } else if (offset.x > SWIPE_THRESHOLD || swipe > 1000) {
      setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }
    setIsDragging(false);
  };

  const getStackOrder = () => {
    const reordered = [];
    for (let i = 0; i < cards.length; i++) {
      const index = (activeIndex + i) % cards.length;
      reordered.push({ ...cards[index], stackPosition: i });
    }
    return reordered.reverse();
  };

  const getLayoutStyles = (stackPosition: number) => {
    switch (layout) {
      case "stack":
        return { top: stackPosition * 10, left: stackPosition * 10, zIndex: cards.length - stackPosition, rotate: (stackPosition - 1) * 1.5 };
      default:
        return { top: 0, left: 0, zIndex: 1, rotate: 0 };
    }
  };

  const containerStyles = {
    stack: "relative h-[420px] w-full max-w-sm",
    grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5",
    list: "flex flex-col gap-4",
  };

  const displayCards = layout === "stack"
    ? getStackOrder()
    : cards.map((c, i) => ({ ...c, stackPosition: i }));

  return (
    <div className={cn("space-y-6", className)}>
      {/* Layout toggle */}
      <div className="flex items-center justify-center gap-1 rounded-lg p-1 w-fit mx-auto"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        {(Object.keys(layoutIcons) as LayoutMode[]).map((mode) => {
          const Icon = layoutIcons[mode];
          return (
            <button key={mode} onClick={() => setLayout(mode)}
              className={cn("rounded-md p-2 transition-all duration-200",
                layout === mode
                  ? "bg-[#cc005f] text-white"
                  : "text-white/30 hover:text-white hover:bg-white/5"
              )}
              aria-label={`Switch to ${mode} layout`}>
              <Icon className="h-4 w-4" />
            </button>
          );
        })}
      </div>

      {/* Cards */}
      <LayoutGroup>
        <motion.div layout className={cn(containerStyles[layout], layout === "stack" && "mx-auto")}>
          <AnimatePresence mode="popLayout">
            {displayCards.map((card) => {
              const styles = getLayoutStyles(card.stackPosition);
              const isExpanded = expandedCard === card.id;
              const isTopCard = layout === "stack" && card.stackPosition === 0;

              return (
                <motion.div
                  key={card.id}
                  layoutId={card.id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: isExpanded ? 1.02 : 1, x: 0, ...styles }}
                  exit={{ opacity: 0, scale: 0.8, x: -200 }}
                  transition={{ type: "spring", stiffness: 280, damping: 26 }}
                  drag={isTopCard ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={handleDragEnd}
                  whileDrag={{ scale: 1.03, cursor: "grabbing" }}
                  onClick={() => {
                    if (isDragging) return;
                    setExpandedCard(isExpanded ? null : card.id);
                    onCardClick?.(card);
                  }}
                  className={cn(
                    "cursor-pointer rounded-2xl overflow-hidden",
                    "transition-colors duration-300",
                    layout === "stack" && "absolute w-full h-[400px]",
                    layout === "stack" && isTopCard && "cursor-grab active:cursor-grabbing",
                    layout === "grid" && "w-full",
                    layout === "list" && "w-full",
                    isExpanded && "ring-1 ring-[#cc005f]/60",
                  )}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {/* Image */}
                  {card.image && (
                    <div className={cn(
                      "relative overflow-hidden",
                      layout === "list" ? "h-40" : "h-48"
                    )}>
                      <img src={card.image} alt={card.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>
                  )}

                  <div className="p-5 space-y-3">
                    <div className="flex items-start gap-3">
                      {card.icon && (
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                          style={{ background: "rgba(204,0,95,0.1)", border: "1px solid rgba(204,0,95,0.2)" }}>
                          {card.icon}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <h3 className="font-light tracking-wide text-white text-base">{card.title}</h3>
                        <p className={cn("text-sm text-white/40 font-light mt-1 leading-relaxed",
                          layout === "stack" && "line-clamp-3",
                          layout === "grid" && "line-clamp-2",
                          layout === "list" && "line-clamp-2",
                        )}>{card.description}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    {card.tags && (
                      <div className="flex flex-wrap gap-1.5">
                        {card.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-light text-[#cc005f]"
                            style={{ background: "rgba(204,0,95,0.08)", border: "1px solid rgba(204,0,95,0.2)" }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Links */}
                    {(card.demoLink || card.githubLink) && (
                      <div className="flex gap-2 pt-1" onPointerDown={e => e.stopPropagation()}>
                        {card.demoLink && (
                          <a href={card.demoLink} target="_blank" rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            onPointerDown={e => e.stopPropagation()}
                            className="px-3 py-1.5 rounded text-[10px] tracking-[0.1em] uppercase font-light text-[#cc005f] transition-colors"
                            style={{ background: "rgba(204,0,95,0.08)", border: "1px solid rgba(204,0,95,0.2)" }}>
                            Live ↗
                          </a>
                        )}
                        {card.githubLink && (
                          <a href={card.githubLink} target="_blank" rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            onPointerDown={e => e.stopPropagation()}
                            className="px-3 py-1.5 rounded text-[10px] tracking-[0.1em] uppercase font-light text-white/40 hover:text-white transition-colors"
                            style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                            Code ↗
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {isTopCard && layout === "stack" && (
                    <div className="absolute bottom-3 left-0 right-0 text-center">
                      <span className="text-[10px] text-white/20 tracking-[0.2em] uppercase">swipe to navigate</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {/* Stack dots */}
      {layout === "stack" && cards.length > 1 && (
        <div className="flex justify-center gap-2">
          {cards.map((_, index) => (
            <button key={index} onClick={() => setActiveIndex(index)}
              className={cn("h-1 rounded-full transition-all duration-300",
                index === activeIndex ? "w-6 bg-[#cc005f]" : "w-1.5 bg-white/20 hover:bg-white/40"
              )}
              aria-label={`Go to card ${index + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
}
