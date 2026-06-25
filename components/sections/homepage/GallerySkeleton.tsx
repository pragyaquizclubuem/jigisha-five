import React from "react";

export default function GallerySkeleton() {
  return (
    <div
      className="w-full py-10 md:py-14 lg:py-16 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Title skeleton */}
      <div className="flex flex-col items-center justify-center mb-10 md:mb-14">
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 rounded bg-black/10 animate-pulse md:h-10 md:w-10" />
          <div className="h-10 w-44 rounded bg-black/10 animate-pulse md:h-12 md:w-60" />
          <div className="h-8 w-8 rounded bg-black/10 animate-pulse md:h-10 md:w-10" />
        </div>
        <div className="mt-3 h-3 w-32 rounded bg-black/10 animate-pulse md:w-48" />
      </div>

      {/* Marquee cards skeleton */}
      <div className="flex gap-6 px-4 md:gap-8 justify-center overflow-hidden">
        {/* Landscape Card 1 */}
        <div className="h-[280px] w-[350px] shrink-0 rounded-[24px] border-2 border-black/15 bg-black/5 animate-pulse md:h-[350px] md:w-[450px]" />
        {/* Portrait Card 2 */}
        <div className="h-[280px] w-[200px] shrink-0 rounded-[24px] border-2 border-black/15 bg-black/5 animate-pulse md:h-[350px] md:w-[260px]" />
        {/* Landscape Card 3 */}
        <div className="h-[280px] w-[350px] shrink-0 rounded-[24px] border-2 border-black/15 bg-black/5 animate-pulse md:h-[350px] md:w-[450px]" />
        {/* Landscape Card 4 */}
        <div className="hidden h-[280px] w-[350px] shrink-0 rounded-[24px] border-2 border-black/15 bg-black/5 animate-pulse sm:block md:h-[350px] md:w-[450px]" />
      </div>
    </div>
  );
}
