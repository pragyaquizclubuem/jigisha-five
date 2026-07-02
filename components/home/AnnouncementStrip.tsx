'use client';

import { useEffect, useState } from 'react';
import { announcementData } from '@/constants/AnnouncementData';
import { FlowerIcon } from '@/components/icons/Icons';

function parseMessage(message: string) {
  const regex = /\[highlight\](.*?)\[\/highlight\]/g;
  const parts: Array<{ text: string; highlight: boolean }> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(message)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: message.slice(lastIndex, match.index), highlight: false });
    }
    parts.push({ text: match[1], highlight: true });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < message.length) {
    parts.push({ text: message.slice(lastIndex), highlight: false });
  }
  return parts;
}

export default function AnnouncementStrip() {
  const [reducedMotion, setReducedMotion] = useState<boolean>(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const parts = parseMessage(announcementData.message);

  // We render the content multiple times to ensure a seamless continuous scroll.
  const renderMessageContent = () => (
    <span className="inline-block whitespace-pre font-mono text-base sm:text-lg lg:text-xl tracking-[0.15em] uppercase mx-8">
      {parts.map((part, idx) => (
        <span
          key={idx}
          className={
            part.highlight 
              ? 'font-bold text-[#FFD700]' 
              : 'font-medium text-gray-100'
          }
          style={part.highlight ? { textShadow: '0 0 10px rgba(255,215,0,0.5)' } : {}}
        >
          {part.text}
        </span>
      ))}
    </span>
  );

  return (
    <aside
      className="relative w-full overflow-hidden border-y border-purple-500/20 bg-[#160429] py-5 my-12 text-white shadow-2xl"
      role="note"
      aria-label="Announcement"
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 pointer-events-none bg-linear-to-r from-purple-900/40 via-transparent to-purple-900/40 z-0" />

      <div className="relative z-10 flex items-center w-full min-w-0">
        {/* Message container with fade edges */}
        <div 
          className="overflow-hidden flex-1 min-w-0"
          style={{ 
            maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', 
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' 
          }}
        >
          {/* 
            The scrolling track: width is max-content to hold all duplicated items.
            We animate from 0 to -50%. Because the content is duplicated 4 times,
            translating by -50% means we exactly shift by 2 copies, creating a seamless loop.
          */}
          <div 
            className={`flex w-max items-center ${reducedMotion ? '' : 'animate-marquee'}`}
            style={reducedMotion ? { justifyContent: 'center', width: '100%' } : {}}
          >
            {renderMessageContent()}
            {!reducedMotion && (
              <>
                <FlowerIcon className="h-5 w-5 text-purple-400/80 shrink-0 mx-2 animate-spin-slow" />
                {renderMessageContent()}
                <FlowerIcon className="h-5 w-5 text-purple-400/80 shrink-0 mx-2 animate-spin-slow" />
                {renderMessageContent()}
                <FlowerIcon className="h-5 w-5 text-purple-400/80 shrink-0 mx-2 animate-spin-slow" />
                {renderMessageContent()}
                <FlowerIcon className="h-5 w-5 text-purple-400/80 shrink-0 mx-2 animate-spin-slow" />
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-marquee {
          /* Adjust duration as needed for speed */
          animation: marquee 40s linear infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none !important;
          }
          .animate-spin-slow {
            animation: none !important;
          }
        }
      `}</style>
    </aside>
  );
}
