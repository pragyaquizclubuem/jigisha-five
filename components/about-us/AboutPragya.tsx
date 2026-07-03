"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SectionWrapper from "@/components/wrappers/SectionWrapper";

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

export default function AboutPragya() {
  const logo = useReveal(0.1);
  const text = useReveal(0.2);

  return (
    <SectionWrapper
      fullBleed
      className="bg-[#252525] text-[#FFEDE0] border-y-2 border-black overflow-hidden relative"
      contentClassName="py-24 md:py-32 px-6"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), 
            linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 10px 10px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center">
          {/* Logo / Image */}
          <div
            ref={logo.ref}
            className={`w-full md:w-1/2 flex justify-center md:justify-start transition-all duration-1000 ease-out ${
              logo.visible
                ? "opacity-100 scale-100 rotate-0"
                : "opacity-0 scale-75 rotate-[-6deg]"
            }`}
          >
            <div className="relative w-full max-w-sm aspect-square">
              <div className="absolute inset-0 bg-[#F4D21F] rounded-full translate-x-4 translate-y-4 border-2 border-black" />
              <div className="absolute inset-0 bg-[#EADDFF] rounded-full border-2 border-black flex items-center justify-center p-8 overflow-hidden">
                <Image
                  src="/images/pragya.avif"
                  alt="Pragya Logo"
                  width={400}
                  height={400}
                  className="object-contain hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div
            ref={text.ref}
            className={`w-full md:w-1/2 flex flex-col gap-6 transition-all duration-1000 ease-out delay-200 ${
              text.visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <div className="inline-flex">
              <span className="font-bold text-xs uppercase tracking-[0.2em] bg-[#513081] text-white px-3 py-1 border-2 border-black rounded-md shadow-[3px_3px_0_0_#F4D21F]">
                The Organizers
              </span>
            </div>

            <h2 className="font-roboto-condensed text-5xl md:text-6xl font-bold uppercase leading-none tracking-tight">
              Pragya
            </h2>

            <p className="text-xl md:text-2xl font-medium text-[#F4D21F]">
              The Official Quiz Club of UEM Kolkata.
            </p>

            <div className="text-[1.05rem] md:text-[1.15rem] leading-relaxed text-[#FFEDE0]/80 space-y-4">
              <p>
                Pragya is home to some of Kolkata&apos;s most{" "}
                <strong className="text-white">Elite Quizzers</strong> and{" "}
                <strong className="text-white">Quiz-Masters</strong> who have
                conquered national level quizzes. We are a family of individuals
                bound by our insatiable thirst for trivia.
              </p>
              <p>
                Hosting Jigisha is our way of giving back to the quizzing
                circuit. We meticulously curate every question, every round, and
                every format to ensure that the participants experience the
                sheer joy of cracking a beautifully crafted fundamental.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
