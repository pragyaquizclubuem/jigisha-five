import React from "react";
// Uncomment the line below when you are ready to use actual images
// import Image from "next/image";
import SectionWrapper from "@/components/wrappers/SectionWrapper";
import { quizData } from "@/constants/QuizData";

// ── Hand-drawn 5-Point Star SVG ──────────────────────────────────────────────
function HandDrawnStar({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12,1.8 L14.7,8 L21.4,8.5 L16.3,13 L17.9,19.6 L12,16.1 L6.1,19.6 L7.7,13 L2.6,8.5 L9.3,8 Z" />
    </svg>
  );
}

// ── Hand-drawn 4-Point Sparkle SVG ──────────────────────────────────────────
function HandDrawnSparkle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12,3 C12,8.5 8.5,12 3,12 C8.5,12 12,15.5 12,21 C12,15.5 15.5,12 21,12 C15.5,12 12,8.5 12,3 Z" />
    </svg>
  );
}

// ── Hand-drawn Lightbulb SVG ────────────────────────────────────────────────
function HandDrawnLightbulb({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Lightbulb glass outline */}
      <path d="M32,10 C21.5,10 18,17.5 18,26 C18,33 23,38 25,41.5 L25,47 L39,47 L39,41.5 C41,38 46,33 46,26 C46,17.5 42.5,10 32,10 Z" />
      {/* Bulb base */}
      <path d="M26,47 L38,47" />
      <path d="M27,51 L37,51" />
      <path d="M29,55 L35,55" />
      {/* Filament inside */}
      <path d="M28,32 L30,22 L34,22 L36,32" />
      {/* Glow lines / Rays */}
      <path d="M10,26 L14,26" />
      <path d="M50,26 L54,26" />
      <path d="M16,14 L19,17" />
      <path d="M45,17 L48,14" />
      <path d="M32,4 L32,7" />
    </svg>
  );
}

// ── Hand-drawn Question Mark SVG ────────────────────────────────────────────
function HandDrawnQuestionMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Question mark hook */}
      <path d="M24,19 C24,11.8 38,10.2 38,20 C38,27.2 28.5,28.2 28.5,35.5" />
      {/* Dot at the bottom */}
      <circle cx="28.5" cy="45" r="2.5" fill="currentColor" stroke="none" />
      {/* Accent sparkles */}
      <path d="M48,16 L52,18" />
      <path d="M46,26 L50,27" />
      <path d="M14,16 L17,18" />
    </svg>
  );
}

export default function OurQuizzes() {
  return (
    <SectionWrapper id="quizzes" className="py-12 md:py-16 lg:py-20 cv-auto">
      {/* ── Section Header ── */}
      <div className="flex flex-col items-center justify-center text-center mb-12 md:mb-16 select-none">
        <div className="relative inline-flex flex-col items-center">
          {/* Header Title Row */}
          <div className="flex items-center gap-4 relative">
            
            {/* Left Decorative Elements (Lightbulb & Stars) */}
            <div className="absolute -left-20 md:-left-24 lg:-left-28 -top-8 hidden sm:flex items-center justify-end w-20 md:w-24 lg:w-28 h-20">
              <HandDrawnSparkle className="absolute left-0 top-2 w-3.5 h-3.5 md:w-4.5 md:h-4.5 text-[#252525]" />
              <HandDrawnLightbulb className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-[#252525] rotate-[-15deg] transform transition-transform duration-300 hover:rotate-[-5deg]" />
              <HandDrawnStar className="absolute left-6 bottom-0 w-4 h-4 md:w-5 md:h-5 text-[#252525]" />
            </div>

            <h2 className="font-roboto-condensed text-4xl sm:text-5xl md:text-6xl font-bold uppercase leading-none tracking-[0.02em] text-[#252525] px-2">
              OUR QUIZZES
            </h2>

            {/* Right Decorative Elements (Question Mark & Stars) */}
            <div className="absolute -right-20 md:-right-24 lg:-right-28 -top-8 hidden sm:flex items-center justify-start w-20 md:w-24 lg:w-28 h-20">
              <HandDrawnStar className="absolute right-0 top-0 w-4.5 h-4.5 md:w-5.5 md:h-5.5 text-[#252525]" />
              <HandDrawnQuestionMark className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-[#252525] rotate-[15deg] transform transition-transform duration-300 hover:rotate-[5deg]" />
              <HandDrawnSparkle className="absolute right-6 bottom-2 w-4 h-4 md:w-5 md:h-5 text-[#252525]" />
            </div>

          </div>

          {/* Underline Brush SVG */}
          <div className="w-full flex justify-center mt-2.5 sm:mt-3 md:mt-4">
            <svg
              className="w-[220px] sm:w-[280px] md:w-[350px] lg:w-[410px] h-3 text-[#252525]"
              viewBox="0 0 400 12"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M 10,6 C 80,4.2 150,3.5 220,4 C 290,4.5 360,6.5 390,6 C 394,5.8 384,7.8 370,8.2 C 300,10.2 230,9.2 160,8 C 90,6.8 30,7.8 10,6 Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Quiz Card Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
        {quizData.map((quiz) => (
          <div
            key={quiz.id}
            className="group flex flex-col justify-between rounded-[32px] border-2 border-[#252525] bg-[#FFEDE0] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[8px_8px_0_0_#252525]"
          >
            {/* Top section: Title, Image Placeholder, Tags */}
            <div>
              {/* Quiz Title */}
              <h3 className="font-roboto-condensed text-center text-2xl font-bold uppercase tracking-[0.03em] text-[#513081] mb-5">
                {quiz.title}
              </h3>

              {/* Blank Cover Image Container (Dark grey placeholder block) */}
              {/* 
                TO USE ACTUAL IMAGES:
                1. Uncomment the 'import Image from "next/image";' at the top of this file.
                2. Replace the placeholder div below with the commented-out <Image /> block.
              */}
              <div
                className="w-full aspect-[4/3] rounded-[24px] border-2 border-[#252525] bg-[#252525] mb-5"
                role="img"
                aria-label={`Blank cover placeholder for ${quiz.title}`}
              />
              {/* 
              <div className="relative w-full aspect-[4/3] rounded-[24px] border-2 border-[#252525] overflow-hidden mb-5">
                <Image
                  src={quiz.image}
                  alt={`${quiz.title} Poster`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              */}

              {/* Dynamic Tags */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
                {quiz.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#513081] bg-[#E2D4FF] text-[#513081] text-[0.7rem] md:text-xs font-bold uppercase tracking-wider whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom section: Description */}
            <p className="text-center text-[0.82rem] md:text-[0.88rem] leading-relaxed text-black/85 font-body max-w-[285px] mx-auto">
              {quiz.description}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
