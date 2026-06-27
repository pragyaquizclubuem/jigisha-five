'use client';

import { useEffect, useRef, useState } from 'react';
import { announcementData } from '@/constants/AnnouncementData';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const measure = () => {
      if (containerRef.current && contentRef.current) {
        const cw = containerRef.current.offsetWidth;
        const tw = contentRef.current.scrollWidth;
        setContainerWidth(cw);
        setContentWidth(tw);
        setShouldScroll(tw > cw && !mediaQuery.matches);
      }
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const parts = parseMessage(announcementData.message);

  // Total travel: content enters from containerWidth px to the right,
  // exits at -contentWidth px to the left.
  // Speed ≈ 80 px/s → duration = (containerWidth + contentWidth) / 80
  const totalTravel = containerWidth + contentWidth;
  const duration = Math.max(8, totalTravel / 80);

  const isScrolling = shouldScroll && !reducedMotion;

  return (
    <aside
      className="w-full bg-purple-700 text-white overflow-hidden py-2"
      role="note"
      aria-label="Announcement"
      // Expose container width as a CSS variable so the keyframe can use it
      style={{ '--ticker-start': `${containerWidth}px` } as React.CSSProperties}
    >
      <div className="flex justify-center items-center px-4">
        <div className="flex items-center gap-3 w-full min-w-0">
          {/* Message container */}
          <div ref={containerRef} className="overflow-hidden flex-1 min-w-0">
            <span
              ref={contentRef}
              className="inline-block whitespace-nowrap"
              style={
                isScrolling
                  ? { animation: `ticker-rtl ${duration}s linear infinite` }
                  : { display: 'block', textAlign: 'center' }
              }
            >
              {parts.map((part, idx) => (
                <span
                  key={idx}
                  className={part.highlight ? 'font-bold text-yellow-300' : ''}
                >
                  {part.text}
                </span>
              ))}
            </span>
          </div>

        </div>
      </div>

      {/*
        The keyframe starts the element at containerWidth (right edge of the
        container) and ends at -100% (element's own width past the left edge).
        At both endpoints the element is fully off-screen, so there is never
        a moment where two copies are visible simultaneously.
      */}
      <style jsx>{`
        @keyframes ticker-rtl {
          0%   { transform: translateX(var(--ticker-start, 100vw)); }
          100% { transform: translateX(-100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-ticker-rtl {
            animation: none !important;
          }
        }
      `}</style>
    </aside>
  );
}
