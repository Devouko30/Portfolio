"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface StackCard {
  id: string;
  icon?: React.ReactNode;
  title: string;
  description?: string;
  tag?: string;
  items?: string[];
}

interface CardStackProps {
  cards: StackCard[];
  className?: string;
}

export function CardStack({ cards, className }: CardStackProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={cn("relative w-72 h-52 cursor-pointer", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {cards.map((card, i) => {
        const total = cards.length;
        const offset = total - 1 - i; // 0 = top card

        return (
          <motion.div
            key={card.id}
            className="absolute inset-0 rounded-2xl p-5 flex flex-col justify-between"
            style={{
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.09)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
              zIndex: i + 1,
            }}
            animate={
              hovered
                ? {
                    y: -offset * 56,
                    rotate: (offset - (total - 1) / 2) * 3,
                    scale: 1 - offset * 0.02,
                  }
                : {
                    y: -offset * 6,
                    rotate: offset * 1.5,
                    scale: 1 - offset * 0.04,
                  }
            }
            transition={{ type: "spring", stiffness: 260, damping: 22, delay: offset * 0.04 }}
          >
            {/* Top shine */}
            <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(204,0,95,0.12)", border: "1px solid rgba(204,0,95,0.25)" }}
                >
                  {card.icon}
                </div>
                <div>
                  <p className="text-white font-light text-sm tracking-wide">{card.title}</p>
                  {card.tag && (
                    <span className="text-[10px] tracking-[0.2em] uppercase font-light text-[#cc005f]/70">{card.tag}</span>
                  )}
                </div>
              </div>
            </div>

            {card.description && (
              <p className="text-white/35 text-xs font-light leading-relaxed line-clamp-2">{card.description}</p>
            )}

            {card.items && (
              <div className="flex flex-wrap gap-1.5">
                {card.items.slice(0, 4).map(item => (
                  <span
                    key={item}
                    className="px-2 py-0.5 rounded-full text-[10px] font-light text-white/40"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    {item}
                  </span>
                ))}
                {card.items.length > 4 && (
                  <span className="text-[10px] text-[#cc005f]/50 font-light self-center">+{card.items.length - 4}</span>
                )}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
