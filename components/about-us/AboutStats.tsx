"use client";

import { useEffect, useRef, useState } from "react";
import { aboutUsData } from "@/constants/AboutUsData";
import SectionWrapper from "@/components/wrappers/SectionWrapper";

function AnimatedStatCard({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const targetNum = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const prefix = value.replace(/[0-9,].*/, "");
  const suffix = value.replace(/.*[0-9]/, "");
  const hasComma = value.includes(",");

  useEffect(() => {
    if (hasAnimated) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
          const duration = 3000;
          const startTime = performance.now();
          const animate = (time: number) => {
            const progress = Math.min((time - startTime) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeProgress * targetNum));
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(targetNum);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated, targetNum]);

  let formatted = new Intl.NumberFormat("en-IN").format(count);
  if (!hasComma) formatted = formatted.replace(/,/g, "");

  const colors = [
    { bg: "bg-[#F4D21F]", text: "text-[#252525]" },
    { bg: "bg-[#513081]", text: "text-[#FFEDE0]" },
    { bg: "bg-[#FFEDE0]", text: "text-[#513081]" },
    { bg: "bg-[#252525]", text: "text-[#F4D21F]" },
  ];

  const theme = colors[index % colors.length];

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-3xl border-2 border-black p-8 shadow-[6px_6px_0_0_#252525] transition-all duration-500 hover:-translate-y-2 hover:shadow-[10px_10px_0_0_#252525] ${theme.bg}`}
      style={{
        transitionDelay: `${index * 100}ms`,
        opacity: hasAnimated ? 1 : 0,
        transform: hasAnimated ? "translateY(0)" : "translateY(2rem)",
      }}
    >
      <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full border-2 border-black opacity-10 group-hover:scale-150 transition-transform duration-700" />
      <div className="absolute -left-4 -bottom-4 w-16 h-16 rounded-full border-2 border-black opacity-10 group-hover:scale-150 transition-transform duration-700 delay-100" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center gap-2 h-full">
        <p
          className={`font-roboto-condensed text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-5xl 2xl:text-6xl font-bold leading-none tracking-tighter ${theme.text}`}
        >
          {prefix}
          {formatted}
          {suffix}
        </p>
        <p
          className={`font-bold uppercase tracking-wider text-sm sm:text-base mt-2 opacity-90 ${theme.text}`}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

export default function AboutStats() {
  const headingRef = useRef<HTMLDivElement>(null);
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setHeadingVisible(true);
      },
      { threshold: 0.2 }
    );
    if (headingRef.current) obs.observe(headingRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <SectionWrapper className="py-20 md:py-32">
      <div
        ref={headingRef}
        className={`flex flex-col items-center text-center mb-16 transition-all duration-700 ease-out ${
          headingVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="font-roboto-condensed text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-[#252525]">
          Jigisha In <span className="text-[#513081]">Numbers</span>
        </h2>
        <p className="mt-4 text-lg text-black/60 font-medium max-w-2xl">
          The scale of our festival speaks for itself. We take pride in
          delivering an unparalleled quizzing experience.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {aboutUsData.stats.map((stat, idx) => (
          <AnimatedStatCard
            key={stat.label}
            value={stat.value}
            label={stat.label}
            index={idx}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
