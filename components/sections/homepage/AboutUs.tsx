import Image from "next/image";

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

export default function AboutUs() {
  return (
    <SectionWrapper id="about" className="py-6 md:py-10 lg:py-12">
      <div className="rounded-[34px] border-2 border-black/20 bg-[#F5E4D8] p-5 md:p-7 lg:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-stretch">
          <div className="relative min-h-[320px] overflow-hidden rounded-[28px] lg:min-h-[620px]">
            <Image
              src={aboutUsData.image.src}
              alt={aboutUsData.image.alt}
              fill
              priority
              quality={75}
              sizes="(max-width: 768px) 92vw, (max-width: 1024px) 58vw, 720px"
              className="object-cover grayscale transition-[filter] duration-300 hover:grayscale-0"
            />
          </div>

          <div className="flex h-full flex-col justify-center gap-6 lg:pr-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-roboto-condensed text-4xl font-bold uppercase leading-none tracking-[0.02em] text-[#513081] md:text-5xl lg:text-6xl">
                  {aboutUsData.heading}
                </h2>

                <svg
                  viewBox="0 0 260 16"
                  className="mt-2 h-4 w-44 text-[#513081] md:w-52 lg:w-60"
                  aria-hidden="true"
                  focusable="false"
                  fill="none"
                >
                  <path
                    d="M4 11
                       C24 8, 36 13, 54 10
                       S88 12, 108 10
                       S144 12, 164 10
                       S200 12, 220 10
                       S240 8, 256 10"
                    stroke="currentColor"
                    strokeWidth="3.25"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <FlowerIcon className="-translate-y-3 h-16 w-16 shrink-0 text-[#513081] md:h-20 md:w-20 lg:h-24 lg:w-24" />
            </div>

            <p className="max-w-[40rem] text-[0.98rem] leading-[1.6] text-black/90 md:text-[1.06rem]">
              {renderSegments(aboutUsData.description)}
            </p>

            <div className="mt-1 flex items-stretch gap-3 sm:gap-4">
              <div className="min-w-0 flex-1 rounded-[18px] bg-[#5A1FA1] px-4 py-4 text-white shadow-[0_2px_0_0_#2F0F56] sm:px-5 sm:py-5 md:px-6 md:py-6">
                <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-x-6 sm:gap-y-5">
                  {aboutUsData.stats.map((stat) => (
                    <div key={stat.label} className="min-w-0">
                      <p className="font-roboto-condensed text-xl font-bold leading-none tracking-[0.03em] text-[#F4D21F] sm:text-2xl md:text-[2.2rem]">
                        {stat.value}
                      </p>
                      <p className="mt-1 font-roboto-condensed text-xs leading-none tracking-[0.03em] text-white sm:text-sm md:text-base">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <button type="button"
                aria-label="Scroll to next section"
                className=" flex self-stretch w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#3F136F] bg-[#5A1FA1] text-white shadow-[0_2px_0_0_#3F136F] transition-transform duration-200 hover:-translate-y-0.5 sm:w-14 md:w-16
              "
              >
                <ArrowIcon className="h-20 w-5 sm:h-24 sm:w-6 md:h-28 md:w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}