"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import SectionWrapper from "@/components/wrappers/SectionWrapper";
import { FlowerIcon, WavyUnderlineIcon } from "@/components/icons/Icons";
import { ArrowIcon } from "@/components/icons/Icons";
import { aboutUsData, type AboutUsTextSegment } from "@/constants/AboutUsData";

function renderSegments(segments: AboutUsTextSegment[]) {
  return segments.map((segment, index) => {
    if (segment.emphasis) {
      return (
        <span key={`${segment.text}-${index}`} className="font-semibold text-[#513081]">
          {segment.text}
        </span>
      );
    }

    return <span key={`${segment.text}-${index}`}>{segment.text}</span>;
  });
}

function AnimatedStat({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

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
          const duration = 4000;
          const startTime = performance.now();
          const animate = (time: number) => {
            const progress = Math.min((time - startTime) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
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

  return (
    <p
      ref={ref}
      className="font-roboto-condensed text-xl font-bold leading-none tracking-[0.03em] text-[#F4D21F] sm:text-2xl md:text-[2.2rem]"
    >
      {prefix}
      {formatted}
      {suffix}
    </p>
  );
}

export default function AboutUs() {
  return (
    <SectionWrapper id="about" className="py-6 md:py-10 lg:py-12">
      <div className="group scroll-mt-32 rounded-[34px] border-2 border-[#252525] bg-[#FFEDE0] p-5 md:p-7 lg:p-8" id="homeAbout">
        <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-stretch">
          {/* Image Section - order-2 on mobile, order-1 on desktop */}
          <div className="relative min-h-[300px] overflow-hidden rounded-[28px] sm:min-h-[400px] lg:order-1 lg:min-h-[620px] order-2">
            <Image
              src={aboutUsData.image.src}
              alt={aboutUsData.image.alt}
              fill
              priority
              quality={75}
              sizes="(max-width: 768px) 92vw, (max-width: 1024px) 58vw, 720px"
              className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
          </div>

          {/* Text Section - order-1 on mobile, order-2 on desktop */}
          <div className="flex h-full flex-col justify-center gap-6 lg:order-2 lg:pr-2 order-1">
            <div className="flex items-center justify-start gap-6 sm:gap-10">
              <div className="flex flex-col items-start gap-y-4">
                <h2 className="font-roboto-condensed text-4xl font-bold uppercase leading-none tracking-[0.02em] text-[#513081] md:text-5xl lg:text-6xl">
                  {aboutUsData.heading}
                </h2>

                <WavyUnderlineIcon className="w-[85%] max-w-[296px] h-auto sm:w-full text-[#513081]" />
              </div>

              <FlowerIcon className="h-16 w-16 shrink-0 text-[#5C00AD]/90 animate-[spin_3s_linear_infinite] md:h-20 md:w-20 lg:h-24 lg:w-24" />
            </div>

            <p className="max-w-160 text-[0.98rem] leading-[1.6] text-black/90 md:text-[1.06rem]">
              {renderSegments(aboutUsData.description)}
            </p>

            <div className="mt-2 flex items-stretch gap-3 sm:gap-4">
              <div className="min-w-0 flex-1 rounded-[18px] bg-[#5A1FA1] px-4 py-4 text-white shadow-[0_4px_0_0_#2F0F56] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_6px_0_0_#2F0F56] sm:px-5 sm:py-5 md:px-6 md:py-6">
                <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-x-6 sm:gap-y-5">
                  {aboutUsData.stats.map((stat) => (
                    <div key={stat.label} className="min-w-0">
                      <AnimatedStat value={stat.value} />
                      <p className="mt-1.5 font-roboto-condensed text-xs leading-tight tracking-[0.03em] text-white sm:text-sm md:text-base">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <button type="button"
                aria-label="Scroll to next section"
                className="group flex w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#3F136F] bg-[#5A1FA1] text-white shadow-[0_4px_0_0_#3F136F] transition-all duration-300 hover:translate-y-1 hover:bg-[#4d198a] hover:shadow-none sm:w-14 md:w-16"
              >
                <ArrowIcon className="h-16 w-5 transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-6 md:h-24 md:w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}