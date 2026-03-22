"use client";
import { cn } from "@/lib/utils";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  titleClassName = "text-[#cc005f]",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border px-4 py-3 transition-all duration-700",
        "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem]",
        "after:bg-gradient-to-l after:from-black after:to-transparent after:content-['']",
        "hover:border-white/20 [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      <div>
        <span className="relative inline-flex items-center justify-center rounded-full p-1.5"
          style={{ background: "rgba(204,0,95,0.12)", border: "1px solid rgba(204,0,95,0.2)" }}>
          {icon}
        </span>
        <p className={cn("text-base font-light tracking-wide", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-sm text-white/60 font-light">{description}</p>
      <p className="text-white/25 text-xs tracking-[0.15em] uppercase font-light">{date}</p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards: DisplayCardProps[] = [
    { className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-full before:h-full before:rounded-xl before:content-[''] before:bg-black/40 before:left-0 before:top-0 before:transition-opacity before:duration-700 hover:before:opacity-0 grayscale-[60%] hover:grayscale-0" },
    { className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-full before:h-full before:rounded-xl before:content-[''] before:bg-black/40 before:left-0 before:top-0 before:transition-opacity before:duration-700 hover:before:opacity-0 grayscale-[60%] hover:grayscale-0" },
    { className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10" },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
