"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import SectionWrapper from "@/components/wrappers/SectionWrapper";
import FlowerIcon from "@/components/icons/FlowerIcon";
import ArrowIcon from "@/components/icons/ArrowIcon";
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

                <svg className="w-[85%] max-w-[296px] h-auto sm:w-full" viewBox="0 0 296 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M281.486 0.00591135C281.839 -0.0420647 282.337 0.217345 282.753 0.231009C284.496 0.290997 285.142 0.470819 286.72 0.572807C289.059 0.724295 296 0.383346 296 2.18555C296 2.18559 296 2.18564 296 2.18568C296 2.20335 295.999 2.22123 295.998 2.23931C295.974 2.58265 295.383 2.95747 295.296 3.34576C295.208 3.7342 295.274 6.2419 294.435 6.38288C293.219 6.56866 290.303 5.92567 289.654 5.95417C289.211 5.97381 288.665 6.20177 288.098 6.24225C286.271 6.37271 285.314 6.20601 283.668 6.82526C283.009 6.49893 282.35 6.17259 281.692 5.84626C280.832 5.99757 279.53 5.56718 279.008 5.59089C278.579 5.61038 278.328 5.86844 277.882 5.88044C277.381 5.89535 276.612 5.6168 275.701 5.65876C274.208 5.72625 273.943 6.39944 273.047 6.48493C272.118 6.5734 270.673 6.20751 269.488 6.4444C269.339 6.51846 269.19 6.59252 269.042 6.66657C269.148 6.83405 269.255 7.00153 269.361 7.16901C268.764 7.24698 268.508 6.90374 267.959 6.89753C267.313 6.89003 266.984 7.21544 266.55 7.21394C266.194 7.21242 265.711 6.95149 265.25 6.96784C264.577 6.99034 264.724 7.36708 264.363 7.43757C264.218 7.46495 261.548 7.67285 261.397 7.67585C260.252 7.69071 260.152 7.17504 259.238 7.12995C256.705 7.00697 254.104 7.42365 251.76 7.58112C250.714 7.65157 249.622 7.62161 248.578 7.53913C250.222 6.21938 246.584 5.19228 247.945 7.25739C246.784 6.96361 245.96 7.52109 244.86 7.42683C244.148 7.36534 243.655 7.079 242.639 7.08649C240.835 7.10163 238.862 7.91556 238.343 6.4444C236.226 6.70375 234.392 6.1701 233.629 7.46882C233.083 7.54816 231.684 6.77459 231.072 6.6695C230.493 6.57052 226.049 6.22122 225.322 6.20173C224.595 6.18223 223.323 6.16103 222.71 6.27497C221.941 6.41595 221.404 7.76282 220.034 6.18805C218.442 6.31548 217.875 6.27042 216.394 6.08747C216.126 6.05439 216.095 5.82059 215.939 5.82038C215.616 5.82038 215.067 5.99315 214.491 6.01423C213.544 6.04872 213.004 5.55679 213.109 6.30817C212.485 6.43415 211.86 6.56013 211.236 6.6861C211.017 6.54108 210.798 6.39606 210.579 6.25104C210.245 6.40908 209.911 6.56712 209.577 6.72517C209.969 5.63786 207.62 6.2795 208.383 6.90339C207.172 6.67845 205.962 6.45352 204.751 6.22858C204.92 4.99283 202.093 6.08597 202.331 6.75788C202.193 6.7569 202.054 6.75593 201.916 6.75495C200.703 6.4265 199.59 6.69514 198.112 6.47468C196.634 6.25422 196.773 6.13389 196.323 5.56549C195.975 5.59805 195.628 5.6306 195.28 5.66315C193.455 7.22141 193.777 4.5235 190.653 5.71882C189.654 4.73946 187.193 5.25389 185.561 5.55085C185.371 5.58534 185.368 5.77543 185.115 5.83405C184.497 5.97501 182.919 5.73065 182.973 6.34382C182.427 6.16641 181.881 5.989 181.335 5.81159C180.888 5.92308 180.442 6.03457 179.996 6.14606C179.998 6.33747 180 6.52888 180.002 6.72028C179.104 6.06793 177.691 6.31864 176.994 6.16266C176.856 6.13105 176.826 5.86701 176.395 5.79499C175.891 5.7095 174.952 5.78763 174.352 5.70514C174.119 5.99762 173.885 6.29011 173.652 6.58259C172.579 6.74123 172.201 5.96923 171.571 5.90925C171.458 5.89882 169.387 5.95428 169.275 5.97077C168.362 6.10141 168.621 6.7591 165.979 6.61823C165.509 6.59274 165.129 6.36517 164.704 6.35602C163.952 6.33953 161.689 6.85566 161.511 7.33259C160.6 6.73568 158.163 6.97967 157.445 6.8072C157.229 6.75417 157.18 6.37396 156.514 6.29304C155.974 6.22705 154.583 6.53148 153.899 6.48054C153.172 6.42505 152.912 6.10565 152.587 6.08307C152.279 6.06208 151.995 6.31992 151.576 6.31843C150.267 6.30943 149.082 5.89442 148.047 5.88678C146.551 5.87479 145.23 6.63817 143.978 6.97712C143.667 6.92763 143.362 6.76377 143.036 6.76227C139.007 6.73827 134.461 6.59762 130.419 6.43415C128.543 6.35907 123.877 5.32286 125.122 7.05183C124.47 7.35462 119.729 6.65754 118.827 6.64704C117.926 6.63664 117.211 6.94667 116.502 6.95124C114.364 6.96474 112.858 6.74134 110.255 7.0113C109.582 7.08188 108.862 7.44916 108.464 7.44489C107.984 7.43889 107.468 7.08367 106.847 7.0611C105.366 7.01011 102.606 7.12696 101.185 7.0655C100.926 7.0535 100.835 6.7416 100.464 6.64411C99.019 6.2632 97.3995 6.29624 97.6861 7.29206C95.8342 6.7267 94.1212 7.2424 92.405 7.27399C88.7764 7.33849 82.1665 7.10605 79.0054 7.52448C77.0122 7.78845 77.0631 8.23508 74.1286 7.84968C73.4771 7.76421 72.8286 7.64892 72.0385 7.54694C70.1865 7.30699 68.4875 6.48188 67.0759 7.47614C65.019 7.21828 63.3808 7.40115 61.8547 6.55085C61.6747 6.75479 61.4948 6.95873 61.3149 7.16267C61.0627 7.16771 60.8106 7.17276 60.5584 7.1778C60.4797 6.9833 60.4011 6.7888 60.3224 6.59431C58.5159 6.54193 56.2239 7.34135 54.6947 7.33552C52.1308 7.32652 45.5272 7.01595 43.0961 6.75349C41.8054 6.61411 41.7359 7.03068 40.997 6.17438C40.7083 6.23395 40.4196 6.29352 40.1309 6.35309C39.9502 6.54059 39.7696 6.72809 39.5889 6.9156C37.933 6.92309 35.9689 6.63185 34.3914 6.63483C31.5169 6.64083 27.2004 7.15688 24.3137 6.81794C23.5899 6.73247 22.6852 6.3458 21.9764 6.35016C20.9448 6.35616 20.6941 6.99784 19.385 7.00983C17.1288 7.02933 12.9269 6.2839 10.7944 6.34089C10.161 6.3574 9.86546 6.59615 9.42811 6.62165C7.59418 6.73113 6.08851 6.71169 4.32999 7.08063C2.44179 6.46573 2.60491 5.67203 2.01974 4.87116C1.57627 4.2667 0.216435 2.86588 0.0233992 2.33648C-0.112197 1.96455 0.394074 1.48611 0.204064 1.07671C2.46629 0.749773 3.41669 1.10969 5.25363 1.6856C8.64598 1.66265 12.0383 1.6397 15.4307 1.61676C15.7393 1.84023 16.048 2.0637 16.3566 2.28717C16.3566 2.28765 16.3566 2.28814 16.3566 2.28863C17.6594 2.54653 18.2115 1.97102 18.9141 1.84039C25.6406 0.589577 38.8797 1.56855 46.2848 1.70953C47.8805 1.73951 53.0714 1.43839 54.1663 1.80133C54.4497 1.89585 54.5286 2.24043 54.8302 2.25543C57.5247 2.05051 60.2193 1.8456 62.9138 1.64068C68.4548 2.1761 74.1832 1.73391 79.7664 1.65142C94.8721 1.42796 109.827 1.15634 124.685 1.23882C127.557 1.25532 131.201 0.997154 134.012 1.16363C135.185 1.23265 135.674 1.78601 137.215 1.37359C137.232 1.52268 137.248 1.67177 137.264 1.82086C138.609 1.64087 139.469 1.30164 140.977 1.26714C142.247 1.23865 145.606 1.21651 146.729 1.27349C147.311 1.30198 147.094 1.58057 147.636 1.57916C148.565 1.57466 150.55 1.18952 151.832 1.18951C152.994 1.18951 154.951 1.51042 155.844 1.46392C159.06 1.29895 162.562 0.823257 165.988 0.950737C166.935 0.986806 168.152 1.34802 168.449 1.33795C169.028 1.31695 169.2 0.966065 169.589 0.920952C171.565 0.693 174.645 1.10998 176.581 1.12652C182.891 1.18051 189.576 1.02736 195.859 1.09185C199.829 1.13234 206.425 1.07059 210.09 1.33453C210.88 1.39152 210.669 1.77593 211.333 1.77593C212.069 1.77585 212.467 1.51617 212.811 1.49517C215.191 1.34819 220.445 1.08568 222.692 1.35113C223.12 1.40209 223.431 1.7033 223.687 1.7022C223.817 1.7022 224.11 1.49665 224.517 1.47564C228.112 1.28967 230.734 1.40955 234.257 1.48004C241.004 1.6135 248.823 1.2311 255.911 1.43804C257.455 1.48304 258.514 2.07881 258.731 2.07281C259.208 2.06079 259.513 1.66007 260.478 1.56109C263.687 1.23574 268.009 1.66335 271.062 1.46246C272.57 1.36348 274.642 0.854801 276.126 0.742241C277.311 0.652266 280.111 0.851806 280.636 0.628471C280.956 0.493542 281.103 0.0601649 281.486 0.00591135ZM241.556 6.75202C241.767 6.05913 239.548 6.63496 240.38 7.0069C240.568 7.09065 241.501 6.93188 241.556 6.75202ZM137.643 5.54889C137.664 5.74681 137.684 5.94473 137.704 6.14264C137.996 6.06029 138.287 5.97793 138.578 5.89557C138.415 5.7766 138.251 5.65762 138.087 5.53864C137.939 5.54206 137.791 5.54548 137.643 5.54889Z" fill="#513081" />
                </svg>
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
                <ArrowIcon className="h-16 w-5 rotate-180 transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-6 md:h-24 md:w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}