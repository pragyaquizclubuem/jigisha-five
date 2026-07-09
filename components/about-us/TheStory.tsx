"use client";

import { useEffect, useRef, useState } from "react";
import { FlipText } from "@/components/ui/flip-text";
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

export default function TheStory() {
  const left = useReveal();
  const right = useReveal(0.2);

  return (
    <SectionWrapper className="py-16 md:py-24">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        {/* Left Side: Typography / Date */}
        <div
          ref={left.ref}
          className={`w-full lg:w-1/3 flex flex-col items-start transition-all duration-1000 ease-out ${
            left.visible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-12"
          }`}
        >
          <div
            className="font-roboto-condensed text-[8rem] sm:text-[10rem] lg:text-[12rem] font-bold leading-none text-white"
            style={{ WebkitTextStroke: "2px #252525" }}
          >
            2017
          </div>
          <h2 className="font-roboto-condensed text-4xl sm:text-5xl font-bold uppercase tracking-wide text-[#513081] -mt-6 lg:-mt-10 ml-4 z-10 relative bg-[#FFEDE0] px-4 py-2 border-2 border-black rounded-xl shadow-[6px_6px_0_0_#252525]">
            <FlipText duration={1.5} delay={0.2}>
              THE INCEPTION
            </FlipText>
          </h2>
        </div>

        {/* Right Side: Narrative */}
        <div
          ref={right.ref}
          className={`w-full lg:w-2/3 flex flex-col gap-8 transition-all duration-1000 ease-out delay-200 ${
            right.visible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-12"
          }`}
        >
          <div className="rounded-[34px] border-2 border-[#252525] bg-white p-8 md:p-12 shadow-[8px_8px_0_0_#252525] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F4D21F] rounded-bl-full -mr-16 -mt-16 border-l-2 border-b-2 border-black z-0" />

            <div className="relative z-10 text-[1.1rem] md:text-[1.2rem] leading-relaxed text-black/90 space-y-6">
              <p>
                <span className="font-bold text-[#513081] text-2xl">
                  Jigisha
                </span>{" "}
                is the annual quiz festival of the University of Engineering and
                Management Kolkata. From a humble beginning in 2017, it has
                grown exponentially to become a highly anticipated event on the
                quizzing calendar.
              </p>
              <p>
                We started with a vision to create a platform where curious
                minds could clash, collaborate, and celebrate knowledge. Today,
                Jigisha welcomes thousands of participants from schools and
                colleges across the state, featuring diverse formats ranging
                from general knowledge to highly specialized themes like pop
                culture, sports, and technology.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
