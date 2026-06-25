"use client";

import React from "react";
import PlusIcon from "@/components/icons/PlusIcon";

interface FAQAccordionItemProps {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  isVisible: boolean;
}

/**
 * A single FAQ accordion item rendered as a purple pill/card.
 * Expands on click to reveal the answer with a smooth height animation.
 *
 * Accessibility:
 * - `<button>` trigger with `aria-expanded` and `aria-controls`
 * - Answer region has `role="region"` and `aria-labelledby`
 * - Focus-visible outline for keyboard navigation
 * - Respects prefers-reduced-motion via CSS
 */
export default function FAQAccordionItem({
  id,
  question,
  answer,
  isOpen,
  onToggle,
  index,
  isVisible,
}: FAQAccordionItemProps) {
  const headingId = `${id}-heading`;
  const panelId = `${id}-panel`;

  return (
    <div
      className={`faq-item-enter faq-card rounded-2xl border border-[#2F0F56]/30 ${
        isOpen ? "bg-[#3A0E6E]" : "bg-[#513081]"
      }`}
      style={{
        animationDelay: isVisible ? `${index * 60}ms` : "0ms",
        opacity: isVisible ? undefined : 0,
      }}
    >
      {/* Question toggle button */}
      <h3>
        <button
          type="button"
          id={headingId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="
            flex w-full items-center justify-between gap-3
            rounded-2xl px-5 py-4 text-left
            font-roboto-condensed text-sm font-semibold
            tracking-[0.02em] text-white
            transition-colors duration-200
            cursor-pointer
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-white/60 focus-visible:ring-offset-2
            focus-visible:ring-offset-[#513081]
            sm:text-base md:px-6 md:py-5
          "
        >
          <span className="min-w-0 flex-1 leading-snug">{question}</span>

          <PlusIcon
            className={`
              h-5 w-5 shrink-0 text-white/80
              transition-transform duration-300 ease-out
              ${isOpen ? "rotate-45" : "rotate-0"}
            `}
          />
        </button>
      </h3>

      {/* Answer panel with smooth height animation */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        className="faq-answer-grid"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
        }}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-4 pt-0 text-sm leading-relaxed text-white/75 md:px-6 md:pb-5">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
