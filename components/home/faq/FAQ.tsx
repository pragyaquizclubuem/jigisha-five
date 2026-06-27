"use client";

import { useState, useEffect, useRef, useCallback } from "react";

import SectionWrapper from "@/components/wrappers/SectionWrapper";
import FAQAccordionItem from "@/components/home/faq/FAQAccordionItem";
import FAQSkeleton from "@/components/home/faq/FAQSkeleton";
import { FAQWavyUnderlineIcon } from "@/components/icons/Icons";
import { faqData } from "@/constants/FAQData";

/**
 * FAQ section for the homepage.
 *
 * Layout: Peach card container matching the About Us pattern,
 * with a 2-column responsive grid of purple accordion items.
 *
 * Features:
 * - Skeleton loader during initial hydration
 * - Scroll-triggered staggered entrance animations (IntersectionObserver)
 * - Single-open accordion behavior
 * - Full keyboard + screen reader accessibility
 * - Respects prefers-reduced-motion
 */
export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Simulate initial load / hydration delay for skeleton
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  // IntersectionObserver for scroll-triggered entrance
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [isLoaded]);

  const handleToggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <SectionWrapper
      id="faq"
      aria-label="Frequently Asked Questions"
      className="py-6 md:py-10 lg:py-12 cv-auto"
    >
      <div
        ref={sectionRef}
        className="rounded-[34px] border-2 border-black/20 bg-[#FFEDE0] p-5 md:p-7 lg:p-8"
      >
        {!isLoaded ? (
          <FAQSkeleton />
        ) : (
          <>
            {/* Heading */}
            <div className="mb-8 flex flex-col items-center md:mb-10">
              <h2 className="font-roboto-condensed text-3xl font-bold uppercase leading-none tracking-[0.02em] text-[#513081] md:text-4xl lg:text-5xl">
                {faqData.heading}
              </h2>

              {/* Wavy underline — matches About Us style */}
              <FAQWavyUnderlineIcon className="mt-2 h-4 w-64 text-[#513081] md:w-80 lg:w-96" />
            </div>

            {/* 2-column accordion grid */}
            <div
              className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4"
              role="list"
            >
              {faqData.items.map((item, index) => (
                <div key={item.id} role="listitem">
                  <FAQAccordionItem
                    id={item.id}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openId === item.id}
                    onToggle={() => handleToggle(item.id)}
                    index={index}
                    isVisible={isVisible}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </SectionWrapper>
  );
}
