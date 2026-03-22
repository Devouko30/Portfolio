"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface GlowingCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // e.g. '#cc005f'
  animationDuration?: string; // e.g. '4s'
}

export function GlowingCard({
  children,
  className,
  glowColor = '#cc005f',
  animationDuration = '5s',
}: GlowingCardProps) {
  return (
    <div
      className={cn('relative rounded-2xl overflow-hidden', className)}
      style={
        {
          '--glow-color': glowColor,
          '--anim-duration': animationDuration,
        } as React.CSSProperties
      }
    >
      {/* Travelling dot */}
      <div className="glow-dot" />
      {/* Animated border */}
      <div className="glow-border absolute inset-0 rounded-2xl pointer-events-none" />
      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
