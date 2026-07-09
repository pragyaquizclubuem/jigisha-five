"use client";

import Image from "next/image";
import { FlowerIcon, DoubleDShape } from "@/components/icons/Icons";
import SectionWrapper from "@/components/wrappers/SectionWrapper";
import { useEffect, useRef, useState } from "react";

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export default function AboutHero() {
  const badge = useReveal();
  const heading = useReveal();
  const paragraph = useReveal(0.2);
  const image = useReveal(0.1);

  return (
    <SectionWrapper
      fullBleed
      className="relative overflow-hidden border-b-2 border-black bg-[#EADDFF] min-h-[50vh]"
      contentClassName="py-20 md:py-32 px-6"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 z-0 mix-blend-overlay opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 flex flex-col items-start gap-6">
          {/* Badge */}
          <div
            ref={badge.ref}
            className={`inline-flex items-center gap-3 px-4 py-2 border-2 border-black rounded-full bg-[#F4D21F] text-black shadow-[4px_4px_0_0_#000] transition-all duration-700 ease-out ${
              badge.visible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-6 scale-95"
            }`}
          >
            <FlowerIcon className="h-5 w-5 animate-[spin_4s_linear_infinite]" />
            <span className="font-roboto-condensed font-bold uppercase tracking-wider text-sm">
              Discover the Legacy
            </span>
          </div>

          {/* Heading */}
          <div
            ref={heading.ref}
            className={`transition-all duration-1000 ease-out delay-200 ${
              heading.visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="font-roboto-condensed text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bold uppercase leading-[0.85] tracking-tight text-[#252525]">
              More Than <br />
              <span className="text-[#513081] drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
                A Quiz.
              </span>
            </h1>
          </div>

          {/* Paragraph */}
          <div
            ref={paragraph.ref}
            className={`transition-all duration-700 ease-out delay-500 ${
              paragraph.visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="mt-4 max-w-xl text-lg sm:text-xl leading-relaxed text-black/80 font-medium">
              Jigisha is the ultimate celebration of intellect, curiosity, and
              the unyielding spirit of quizzing. Hosted by Pragya, UEM Kolkata.
            </p>
          </div>
        </div>

        {/* Image Stack */}
        <div
          ref={image.ref}
          className={`flex-1 relative w-full max-w-lg aspect-square md:aspect-auto md:h-[500px] transition-all duration-1000 ease-out delay-300 ${
            image.visible
              ? "opacity-100 translate-x-0 rotate-0"
              : "opacity-0 translate-x-16 rotate-3"
          }`}
        >
          <div className="absolute inset-0 bg-[#513081] rounded-[40px] rotate-[-6deg] border-2 border-black shadow-[8px_8px_0_0_#000] transition-transform hover:rotate-[-2deg] duration-500" />
          <div className="absolute inset-0 bg-[#FFEDE0] rounded-[40px] rotate-[3deg] border-2 border-black overflow-hidden z-10 transition-transform hover:rotate-[0deg] duration-500">
            <Image
              src="/images/Pragya_Team.avif"
              alt="Pragya Team"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <DoubleDShape className="absolute -bottom-8 -left-8 w-24 h-24 text-[#F4D21F] z-20 drop-shadow-[4px_4px_0_rgba(0,0,0,1)] animate-bounce" />
        </div>
      </div>
    </SectionWrapper>
  );
}
