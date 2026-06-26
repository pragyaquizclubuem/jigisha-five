import Link from "next/link";
import { DoubleDShape } from "../icons/DecorativeShapes";
import { DownloadIcon } from "../icons/DownloadIcon";
import SectionWrapper from "../wrappers/SectionWrapper";
import Book3D from "./dflip/Book3D";
import {
  BROCHURE_URL,
  BROCHURE_HEADING,
  BROCHURE_DESCRIPTION,
  BROCHURE_CTA,
  BROCHURE_HIGHLIGHTED_TERMS,
} from "../../constants/BrochureData";

// Helper to highlight terms in description
function highlightText(text: string, terms: string[]) {
  // Create a regex to match any of the terms
  const regex = new RegExp(`(${terms.map(t => t.replace(/[.*+?^$()|[\\]\\\\]/g, '\\\\$&')).join('|')})`, 'gi');

  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (terms.some(t => t.toLowerCase() === part.toLowerCase())) {
      return (
        <strong key={i} className="text-[#513081] font-bold">
          {part}
        </strong>
      );
    }
    return part;
  });
}

export default function BrochureSection() {
  return (
    <SectionWrapper id="brochure" className="py-10 md:py-14 lg:py-16">
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">

          {/* Content Card (Left) */}
          <div className="w-full lg:w-7/12 bg-[#FFEDE0] border-[3px] border-[#252525] rounded-[25.5px] p-8 md:p-10 lg:p-12 shadow-sm relative overflow-hidden flex flex-col justify-between">

            <div className="flex items-start gap-5 mb-8">
              <DoubleDShape className="w-16 h-16 text-[#513081] shrink-0" />
              <div className="relative pt-2">
                <h2 className="text-3xl md:text-4xl lg:text-[40px] leading-none font-bold text-[#513081] uppercase tracking-wider font-mono">
                  {BROCHURE_HEADING}
                </h2>
                {/* Decorative Underline */}
                <svg className="absolute w-full h-3 -bottom-3 left-0 text-[#513081]" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none">
                  <path d="M2 5Q50 7 150 5T298 6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <div className="text-[#252525] text-[17px] md:text-[19px] leading-[1.6] mb-8">
              {BROCHURE_DESCRIPTION.split('\\n').map((paragraph, idx) => (
                <p key={idx} className={idx > 0 ? "mt-4" : ""}>
                  {highlightText(paragraph, BROCHURE_HIGHLIGHTED_TERMS)}
                </p>
              ))}
            </div>

            <p className="text-[#513081] font-bold text-lg md:text-[20px] uppercase mb-10 tracking-wide">
              {BROCHURE_CTA}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-6 mt-auto">
              <Link
                href={BROCHURE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#BE9FCE] hover:bg-[#B08EC3] text-[#252525] font-bold text-lg uppercase tracking-wide py-3.5 px-6 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[#513081] focus:ring-offset-2 focus:ring-offset-[#FFEDE0]"
                aria-label="Download Jigisha 5.0 Brochure"
              >
                DOWNLOAD BROCHURE
                <DownloadIcon className="w-5 h-5" />
              </Link>

              <DoubleDShape className="w-[88px] h-[70px] text-[#513081] hidden sm:block" />
            </div>

          </div>

          {/* Brochure Preview Area (Right) */}
          <div className="w-full lg:w-5/12 min-h-[400px] lg:min-h-full flex items-center justify-center">
            <Book3D coverImage="/dummycover.avif" pdfUrl={BROCHURE_URL} priority={true} width={340} height={480} />
          </div>

        </div>
      </div>
    </SectionWrapper>
  );
}
