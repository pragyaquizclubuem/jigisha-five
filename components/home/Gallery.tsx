"use client";

import React, { useEffect, useState, useRef } from "react";
import SectionWrapper from "@/components/wrappers/SectionWrapper";
import GalleryCard from "./GalleryCard";
import GallerySkeleton from "./GallerySkeleton";
import { galleryData } from "@/constants/GalleryData";
import { CameraIcon, PhotoCloudIcon, StarIcon } from "@/components/icons/GalleryIcons";

export default function Gallery() {
  const [isMounted, setIsMounted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setIsMounted(true);
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "100px", // Pre-trigger start slightly before scroll-in
        threshold: 0.05,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      cancelAnimationFrame(handle);
      observer.disconnect();
    };
  }, []);

  // Duplicate the images array to enable seamless marquee wrapping
  const doubleImages = [...galleryData.images, ...galleryData.images];

  return (
    <div ref={sectionRef} className="cv-auto">
      {!isMounted ? (
        <GallerySkeleton />
      ) : (
        <SectionWrapper
          id="gallery"
          fullBleed={true}
          className="py-10 md:py-14 lg:py-16 overflow-hidden"
          aria-label="Event Gallery"
        >
          {/* Heading Container: Constrained to standard content width */}
          <div className="max-w-(--content-max-width) mx-auto px-(--page-padding) mb-10 md:mb-14">
            <div className="flex flex-col items-center text-center">
              {/* Header with decorative icons & star sparkles */}
              <div className="flex items-center gap-4 relative">
                {/* Star sparkles left */}
                <div className="absolute -left-8 -top-4 text-[#F4D21F] animate-pulse hidden sm:block">
                  <StarIcon className="h-5 w-5" />
                </div>
                <div className="absolute -left-4 top-6 text-[#F4D21F] animate-bounce-subtle hidden md:block">
                  <StarIcon className="h-3 w-3" />
                </div>

                {/* Decorative Camera left */}
                <CameraIcon className="h-8 w-8 text-[#513081] md:h-10 md:w-10 animate-wobble-subtle" />

                {/* Heading */}
                <h2 className="font-roboto-condensed text-4xl font-bold uppercase tracking-[0.03em] text-[#513081] md:text-5xl lg:text-6xl">
                  {galleryData.heading}
                </h2>

                {/* Decorative Cloud right */}
                <PhotoCloudIcon className="h-8 w-8 text-[#513081] md:h-10 md:w-10" />

                {/* Star sparkles right */}
                <div className="absolute -right-8 -bottom-3 text-[#F4D21F] animate-pulse hidden sm:block">
                  <StarIcon className="h-4 w-4" />
                </div>
                <div className="absolute -right-4 -top-5 text-[#F4D21F] animate-bounce-subtle hidden md:block">
                  <StarIcon className="h-3 w-3" />
                </div>
              </div>

              {/* Wavy Underline SVG */}
              <svg
                viewBox="0 0 260 16"
                className="mt-3 h-4 w-44 text-[#513081] md:w-52 lg:w-60"
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
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Marquee Outer Container */}
          <div className="relative w-full overflow-hidden py-4 select-none">
            {/* Marquee Track: duplicated array inside */}
            <div
              className={`gallery-track flex gap-6 md:gap-8 w-max ${
                isInView ? "gallery-track-running" : "gallery-track-paused"
              }`}
            >
              {doubleImages.map((image, idx) => (
                <GalleryCard
                  key={`${image.id}-${idx}`}
                  image={image}
                  priority={idx < 3} // Eager load first 3 images for initial viewport rendering
                />
              ))}
            </div>
          </div>
        </SectionWrapper>
      )}
    </div>
  );
}
