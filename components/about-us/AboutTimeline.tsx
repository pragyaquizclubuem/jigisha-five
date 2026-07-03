"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SectionWrapper from "@/components/wrappers/SectionWrapper";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  content?: React.ReactNode;
  images?: string[];
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "2017",
    title: "The Beginning",
    description:
      "Pragya Quiz Club was formed at UEM Kolkata. The first-ever Jigisha quiz event was held with a handful of participants.",
    content: (
      <div className="mt-6 rounded-2xl border-2 border-black bg-white p-6 shadow-[4px_4px_0_0_#252525]">
        <p className="text-black/80 font-medium">
          What started in a small classroom with just a few enthusiastic quizzers 
          eventually planted the seed for what would become Kolkata's premier quizzing festival.
        </p>
      </div>
    ),
  },
  {
    year: "2018",
    title: "Growing Roots",
    description:
      "Jigisha 2.0 expanded to include multiple quiz formats. The event attracted participation from colleges across West Bengal.",
    content: (
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="rounded-xl border-2 border-black bg-[#EADDFF] p-4 shadow-[4px_4px_0_0_#252525]">
          <h4 className="font-bold text-[#513081] mb-1">MELA Quiz</h4>
          <p className="text-sm text-black/70">Music, Entertainment, Literature & Arts</p>
        </div>
        <div className="rounded-xl border-2 border-black bg-[#FFEDE0] p-4 shadow-[4px_4px_0_0_#252525]">
          <h4 className="font-bold text-[#513081] mb-1">Sci-Tech</h4>
          <p className="text-sm text-black/70">Science, Technology & Innovation</p>
        </div>
      </div>
    ),
    images: ["/images/gallery/neon_sign.png"],
  },
  {
    year: "2019",
    title: "Going Big",
    description:
      "With a massive 3,000+ footfall, Jigisha 3.0 put UEM Kolkata on the national quizzing map. Multiple quiz-masters from the city were invited.",
    content: (
      <div className="mt-6 overflow-hidden rounded-2xl border-2 border-black shadow-[4px_4px_0_0_#252525]">
        <div className="bg-[#252525] p-6 text-[#FFEDE0]">
          <div className="text-4xl font-bold font-roboto-condensed mb-2">3,000+</div>
          <div className="text-sm uppercase tracking-widest opacity-80">Participants in 2019</div>
        </div>
      </div>
    ),
    images: ["/images/gallery/seminar_hall.jpg", "/images/gallery/poster_screen.jpg"],
  },
  {
    year: "2023",
    title: "The Grand Return",
    description:
      "After a pandemic-induced hiatus, Jigisha 4.0 returned stronger than ever with a record prize pool and participation from 50+ institutions.",
    content: (
      <div className="mt-6 rounded-2xl border-2 border-black bg-[#F4D21F] p-6 shadow-[4px_4px_0_0_#252525]">
        <p className="text-[#252525] font-bold text-lg">
          "The comeback is always stronger than the setback."
        </p>
        <p className="text-[#252525]/80 text-sm mt-2 font-medium">
          — We introduced new hybrid formats and welcomed back our community.
        </p>
      </div>
    ),
    images: ["/images/gallery/speaker_1.jpg"],
  },
  {
    year: "2025",
    title: "Jigisha 5.0",
    description:
      "The biggest edition yet. Jigisha 5.0 features 6 distinct quizzes, a prize pool exceeding ₹75,000, and an expected footfall of 5,000+.",
    content: (
      <div className="mt-6 rounded-2xl border-2 border-black bg-[#EADDFF] shadow-[4px_4px_0_0_#252525] overflow-hidden">
        <div className="bg-[#513081] p-4 text-white flex items-center justify-between border-b-2 border-black">
           <h4 className="font-bold text-xl md:text-2xl font-roboto-condensed uppercase tracking-wide">Prize Pool</h4>
           <div className="bg-[#F4D21F] text-black px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wider">Record Breaking</div>
        </div>
        <div className="p-6 md:p-8 flex flex-col items-center justify-center text-center">
          <div className="text-5xl md:text-7xl font-bold font-roboto-condensed text-[#252525] drop-shadow-sm">
            ₹75,000<span className="text-[#513081]">+</span>
          </div>
          <p className="text-base md:text-lg text-black/80 font-bold uppercase tracking-[0.2em] mt-4">
            The stakes have never been higher
          </p>
        </div>
      </div>
    ),
    images: ["/images/gallery/speaker_2.jpg"],
  },
];

export default function AboutTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new ResizeObserver(() => {
      if (ref.current) {
        setHeight(ref.current.getBoundingClientRect().height);
      }
    });
    
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <SectionWrapper className="w-full bg-white font-sans md:px-10">
      <div ref={containerRef}>
        <div className="max-w-7xl mx-auto pt-20 pb-10 px-4 md:px-8 lg:px-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-black font-roboto-condensed font-bold uppercase tracking-tight flex items-center gap-2">
          <span className="px-2">OUR</span> 
          <span className="text-[#513081]">JOURNEY</span>
        </h2>
        <p className="text-black/70 text-sm md:text-base max-w-sm font-medium">
          From a small college quiz to one of Kolkata's premier quizzing destinations. 
          Here's a timeline of our growth over the years.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {timelineEvents.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-24 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-32 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-[#EADDFF] border-2 border-[#513081] p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:text-5xl lg:text-7xl font-bold font-roboto-condensed text-black/10 tracking-tighter md:pl-20"
                  style={{ WebkitTextStroke: "1px #513081" }}>
                {item.year}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-4xl mb-4 text-left font-bold font-roboto-condensed text-[#513081]">
                {item.year}
              </h3>
              <h4 className="text-2xl md:text-4xl font-bold text-[#252525] uppercase font-roboto-condensed mb-4">
                {item.title}
              </h4>
              <p className="text-black/70 text-base md:text-lg font-medium leading-relaxed">
                {item.description}
              </p>
              {item.content}{" "}
              {item.images && item.images.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {item.images.map((img, i) => (
                    <div key={i} className="relative aspect-video rounded-xl overflow-hidden border-2 border-black shadow-[4px_4px_0_0_#252525]">
                      <Image src={img} alt={`${item.title} image`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-black/10 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-[#513081] via-[#c77dff] to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
      </div>
    </SectionWrapper>
  );
}
