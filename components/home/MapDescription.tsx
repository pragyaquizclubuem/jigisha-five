import ArrowUpRightIcon from "@/components/icons/ArrowUpRightIcon";
import CompassIcon from "@/components/icons/CompassIcon";
import { mapData } from "@/constants/MapData";

export default function MapDescription() {
  const {
    heading,
    venueLabel,
    venueName,
    locationLabel,
    locationAddress,
    supportingDescription,
    ctaText,
    locationUrl,
  } = mapData;

  return (
    <div className="flex h-full flex-col justify-between rounded-[28px] border-2 border-black bg-[#FFEDE0] p-6 sm:p-8 md:p-10 text-[#513081] shadow-sm">
      {/* Header section with heading and hand-drawn double underline */}
      <div>
        <h2 className="font-roboto-condensed text-2xl font-bold uppercase leading-none tracking-[0.03em] sm:text-3xl lg:text-[2.2rem]">
          {heading}
        </h2>
        <svg
          viewBox="0 0 340 12"
          className="mt-2 h-3 w-64 text-[#513081] sm:w-72 md:w-80"
          aria-hidden="true"
          focusable="false"
          fill="none"
        >
          {/* Top scribble line */}
          <path
            d="M 4,6 C 50,4 100,8 150,5 C 200,3 250,7 300,5 C 315,4.5 330,4 336,5"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Bottom scribble line */}
          <path
            d="M 12,9 C 60,7 110,11 160,8 C 210,6 260,10 310,8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Details section */}
      <div className="mt-8 flex flex-col gap-5 text-left">
        <p className="font-sans text-[0.98rem] leading-normal text-black/90 sm:text-[1.06rem]">
          <span className="font-bold text-[#513081]">{venueLabel} : </span>
          {venueName}
        </p>

        <p className="font-sans text-[0.98rem] leading-normal text-black/90 sm:text-[1.06rem]">
          <span className="font-bold text-[#513081]">{locationLabel} : </span>
          {locationAddress}
        </p>

        <p className="mt-2 font-sans text-sm font-bold leading-relaxed text-[#513081] sm:text-base md:max-w-[95%]">
          {supportingDescription}
        </p>
      </div>

      {/* Buttons row */}
      <div className="mt-8 flex items-center justify-between gap-4 md:mt-12">
        {/* Main CTA button */}
        <a
          href={locationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-2xl border border-black bg-[#AB97C3] px-5 py-3 font-roboto-condensed text-sm font-bold uppercase tracking-wider text-[#1E0D36] transition-all hover:bg-[#9782B1] active:bg-[#8671A1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#513081] focus-visible:ring-offset-2 sm:px-6 sm:py-3.5 sm:text-base shadow-[3px_3px_0_0_#000000] hover:shadow-[1px_1px_0_0_#000000] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
        >
          <span>{ctaText}</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1E0D36] text-[#AB97C3] sm:h-7 sm:w-7">
            <ArrowUpRightIcon className="h-3.5 w-3.5 stroke-3 sm:h-4 sm:w-4" />
          </span>
        </a>

        {/* Circular direction compass button */}
        <a
          href={locationUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open venue location on Google Maps"
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-black bg-[#370077] text-white transition-all hover:bg-[#2B005E] active:bg-[#1E0042] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#513081] focus-visible:ring-offset-2 sm:h-16 sm:w-16 shadow-[4px_4px_0_0_#000000] hover:shadow-[1px_1px_0_0_#000000] hover:translate-x-[3px] hover:translate-y-[3px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:scale-[1.03]"
        >
          <CompassIcon className="h-7 w-7 sm:h-8 sm:w-8" />
        </a>
      </div>
    </div>
  );
}
