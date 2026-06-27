import React from "react";
import Image from "next/image";


interface QuizCardProps {
  quiz: {
    id: string | number;
    title: string;
    tags: string[];
    description: string;
    image?: string;
    link?: string;
  };
}

export default function QuizCard({ quiz }: QuizCardProps) {
  return (
    <div className="group flex flex-col justify-between rounded-[32px] border-2 border-[#252525] bg-[#FFEDE0] p-6 h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[8px_8px_0_0_#252525]">
      {/* Top section: Title, Image Placeholder, Tags */}
      <div>
        {/* Quiz Title */}
        <h3 className="font-roboto-condensed text-center text-2xl font-bold uppercase tracking-[0.03em] text-[#513081] mb-5">
          {quiz.title}
        </h3>

        {/* Cover Image Container */}
        {quiz.image ? (
          <div className="relative w-full aspect-4/3 rounded-[24px] border-2 border-[#252525] overflow-hidden mb-5 bg-[#252525]">
            <Image
              src={quiz.image}
              alt={`${quiz.title} Poster`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div
            className="w-full aspect-4/3 rounded-[24px] border-2 border-[#252525] bg-[#252525] mb-5"
            role="img"
            aria-label={`Blank cover placeholder for ${quiz.title}`}
          />
        )}

        {/* Dynamic Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
          {quiz.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#513081] bg-[#D7ABFF] text-[#513081] text-[0.7rem] md:text-xs font-bold uppercase tracking-wider whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom section: Description & CTA */}
      <div className="flex flex-col gap-5 mt-auto">
        <p className="text-center text-[0.82rem] md:text-[0.88rem] leading-relaxed text-black/85 font-body max-w-[285px] mx-auto">
          {quiz.description}
        </p>
        
        {/* Call to Action Button */}
        {quiz.link ? (
          <a
            href={quiz.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block w-full text-center py-3 rounded-full border-2 border-[#252525] bg-[#513081] text-[#FFEDE0] font-bold uppercase tracking-wider text-sm transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#252525] active:translate-y-0 active:shadow-none focus:outline-none focus:ring-2 focus:ring-[#D7ABFF] focus:ring-offset-2"
          >
            View Details
          </a>
        ) : (
          <button 
            disabled
            className="mt-2 w-full py-3 rounded-full border-2 border-[#252525] bg-[#513081] text-[#FFEDE0] font-bold uppercase tracking-wider text-sm transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#252525] active:translate-y-0 active:shadow-none focus:outline-none focus:ring-2 focus:ring-[#D7ABFF] focus:ring-offset-2 opacity-60 cursor-not-allowed"
          >
            Coming Soon
          </button>
        )}
      </div>
    </div>
  );
}
