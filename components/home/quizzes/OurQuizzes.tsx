import React from "react";
// Uncomment the line below when you are ready to use actual images
// import Image from "next/image";
import SectionWrapper from "@/components/wrappers/SectionWrapper";
import { quizData } from "@/constants/QuizData";
import QuizCard from "./QuizCard";

import {
  HandDrawnStar,
  HandDrawnSparkle,
  HandDrawnLightbulb,
  HandDrawnQuestionMark,
  WavyUnderlineIcon
} from "@/components/icons/Icons";

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

            {/* Heading */}
            <div className="relative pb-3 w-fit flex flex-col items-center">
              <h2 className="font-roboto-condensed text-4xl sm:text-5xl md:text-6xl font-bold uppercase leading-none tracking-[0.02em] text-[#252525]">
                OUR QUIZZES
              </h2>
              <WavyUnderlineIcon className="absolute w-full h-3 bottom-0 left-0 text-[#252525]" />
            </div>

            {/* Right Decorative Elements (Question Mark & Stars) */}
            <div className="absolute -right-20 md:-right-24 lg:-right-28 -top-8 hidden sm:flex items-center justify-start w-20 md:w-24 lg:w-28 h-20">
              <HandDrawnStar className="absolute right-0 top-0 w-4.5 h-4.5 md:w-5.5 md:h-5.5 text-[#252525]" />
              <HandDrawnQuestionMark className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-[#252525] rotate-15 transform transition-transform duration-300 hover:rotate-[5deg]" />
              <HandDrawnSparkle className="absolute right-6 bottom-2 w-4 h-4 md:w-5 md:h-5 text-[#252525]" />
            </div>

          </div>
        </div>
      </div>

      {/* ── Quiz Card Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
        {quizData.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </SectionWrapper>
  );
}
