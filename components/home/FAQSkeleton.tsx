import React from "react";

/**
 * FAQSkeleton — A shimmer placeholder for the FAQ section.
 * Matches the 2-column grid layout with pulsing purple bars.
 * Shown during initial client-side hydration or slow connections.
 */
export default function FAQSkeleton() {
  return (
    <div className="animate-pulse" aria-hidden="true" role="presentation">
      {/* Heading skeleton */}
      <div className="flex flex-col items-center mb-10 md:mb-12">
        <div className="h-8 w-72 max-w-full rounded-lg bg-[#513081]/15 md:h-10 md:w-96" />
        <div className="mt-3 h-3 w-48 rounded-full bg-[#513081]/10 md:w-56" />
      </div>

      {/* 2-column grid skeleton */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`faq-skeleton-${i}`}
            className="h-14 rounded-2xl bg-[#513081]/15 md:h-16"
          />
        ))}
      </div>
    </div>
  );
}
