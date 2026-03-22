"use client";
import { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";

interface Testimonial {
  img: string;
  quote: string;
  name: string;
  role: string;
}

export const TestimonialSlider = ({ testimonials }: { testimonials: Testimonial[] }) => {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [autorotate, setAutorotate] = useState(true);

  useEffect(() => {
    if (!autorotate) return;
    const interval = setInterval(() => {
      setActive(prev => (prev + 1 === testimonials.length ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(interval);
  }, [active, autorotate, testimonials.length]);

  const heightFix = () => {
    if (testimonialsRef.current?.parentElement) {
      testimonialsRef.current.parentElement.style.height = `${testimonialsRef.current.clientHeight}px`;
    }
  };

  useEffect(() => { heightFix(); }, []);

  return (
    <div className="mx-auto w-full max-w-3xl text-center">
      {/* Avatar area */}
      <div className="relative h-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2
          before:absolute before:inset-0 before:-z-10 before:rounded-full
          before:bg-gradient-to-b before:from-[#cc005f]/20 before:via-[#cc005f]/5 before:via-25% before:to-transparent before:to-75%">
          <div className="h-32 [mask-image:_linear-gradient(0deg,transparent,white_20%,white)]">
            {testimonials.map((t, i) => (
              <Transition
                as="div"
                key={i}
                show={active === i}
                className="absolute inset-0 -z-10 h-full"
                enter="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 order-first"
                enterFrom="opacity-0 -rotate-[60deg]"
                enterTo="opacity-100 rotate-0"
                leave="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700"
                leaveFrom="opacity-100 rotate-0"
                leaveTo="opacity-0 rotate-[60deg]"
                beforeEnter={heightFix}
              >
                <img
                  className="relative left-1/2 top-11 -translate-x-1/2 rounded-full w-14 h-14 object-cover ring-2 ring-[#cc005f]/30"
                  src={t.img}
                  width={56}
                  height={56}
                  alt={t.name}
                />
              </Transition>
            ))}
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="mb-10 transition-all delay-300 duration-150 ease-in-out">
        <div className="relative flex flex-col" ref={testimonialsRef}>
          {testimonials.map((t, i) => (
            <Transition
              key={i}
              show={active === i}
              enter="transition ease-in-out duration-500 delay-200 order-first"
              enterFrom="opacity-0 -translate-x-4"
              enterTo="opacity-100 translate-x-0"
              leave="transition ease-out duration-300 delay-300 absolute"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-4"
              beforeEnter={heightFix}
            >
              <p className="text-xl md:text-2xl font-extralight text-white/80 leading-relaxed
                before:content-['\201C'] before:text-[#cc005f] before:mr-1
                after:content-['\201D'] after:text-[#cc005f] after:ml-1">
                {t.quote}
              </p>
            </Transition>
          ))}
        </div>
      </div>

      {/* Nav buttons */}
      <div className="-m-1.5 flex flex-wrap justify-center">
        {testimonials.map((t, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); setAutorotate(false); }}
            className={`m-1.5 inline-flex justify-center whitespace-nowrap rounded-full px-4 py-1.5 text-xs
              tracking-[0.15em] uppercase font-light transition-all duration-300
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cc005f]/50
              ${active === i
                ? 'bg-[#cc005f] text-white shadow-lg shadow-[#cc005f]/20'
                : 'glass text-white/40 hover:text-white'
              }`}
          >
            <span>{t.name}</span>
            <span className={`mx-1.5 ${active === i ? 'text-white/40' : 'text-white/20'}`}>·</span>
            <span className={active === i ? 'text-white/70' : 'text-white/30'}>{t.role}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
