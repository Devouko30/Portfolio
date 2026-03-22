"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const liquidbuttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        default: "bg-transparent text-white hover:scale-105 transition-transform duration-300",
        pink:    "bg-transparent text-[#cc005f] hover:scale-105 transition-transform duration-300",
        ghost:   "bg-transparent text-white/50 hover:text-white hover:scale-105 transition-transform duration-300",
      },
      size: {
        sm:      "h-8  rounded-full px-5  text-xs",
        default: "h-10 rounded-full px-6",
        lg:      "h-11 rounded-full px-8",
        xl:      "h-12 rounded-full px-10",
        xxl:     "h-14 rounded-full px-12",
        icon:    "size-10 rounded-full",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

function GlassFilter() {
  return (
    <svg className="pointer-events-none absolute" style={{ width: 0, height: 0 }} aria-hidden>
      <defs>
        <filter
          id="liquid-glass-filter"
          x="-20%" y="-20%"
          width="140%" height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65 0.65"
            numOctaves="3"
            seed="2"
            result="noise"
          />
          <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
          <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blended" />
          <feComposite in="blended" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}

export function LiquidButton({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof liquidbuttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";

  return (
    <>
      <GlassFilter />
      <Comp
        className={cn(
          "relative isolate",
          liquidbuttonVariants({ variant, size, className })
        )}
        {...props}
      >
        {/* ── Liquid glass orb layer ── */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-0"
          style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(16px) saturate(180%)",
            WebkitBackdropFilter: "blur(16px) saturate(180%)",
            boxShadow: [
              /* outer depth */
              "0 0 0 0.5px rgba(255,255,255,0.18)",
              "0 2px 8px rgba(0,0,0,0.35)",
              /* top specular highlight */
              "inset 0 1.5px 0 rgba(255,255,255,0.35)",
              /* bottom shadow */
              "inset 0 -1.5px 0 rgba(0,0,0,0.25)",
              /* left/right edge glints */
              "inset 1.5px 0 0 rgba(255,255,255,0.12)",
              "inset -1.5px 0 0 rgba(255,255,255,0.08)",
              /* inner ambient fill */
              "inset 0 0 12px rgba(255,255,255,0.06)",
              /* outer pink glow */
              "0 0 20px rgba(204,0,95,0.12)",
            ].join(", "),
          }}
        />

        {/* ── Noise texture overlay for the "liquid" grain ── */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-0 opacity-[0.07]"
          style={{ filter: 'url("#liquid-glass-filter")', background: "rgba(255,255,255,0.5)" }}
        />

        {/* ── Top shine streak ── */}
        <span
          aria-hidden
          className="pointer-events-none absolute top-0 left-[15%] right-[15%] h-px z-0 rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)" }}
        />

        {/* ── Content ── */}
        <span className="relative z-10 tracking-[0.15em] uppercase text-xs font-light">
          {children}
        </span>
      </Comp>
    </>
  );
}
