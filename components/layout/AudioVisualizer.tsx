'use client';

import React, { useState, useRef } from 'react';
import { useAudio } from './AudioContext';
import { usePathname } from 'next/navigation';

export default function AudioVisualizer() {
  const pathname = usePathname();
  const { isPlaying, toggleAudio } = useAudio();
  const visualizerRef = useRef<HTMLButtonElement>(null);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);

  if (pathname.startsWith('/admin')) {
    return null;
  }
  
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!visualizerRef.current) return;
    const rect = visualizerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const x = (e.clientX - rect.left - centerX) * 0.35;
    const y = (e.clientY - rect.top - centerY) * 0.35;
    setTranslate({ x, y });
    
    const cursorX = e.clientX - rect.left;
    const barPositions = [17, 22.5, 28, 33.5, 39];
    
    barRefs.current.forEach((bar, index) => {
      if (!bar) return;
      const barX = barPositions[index];
      const distX = Math.abs(cursorX - barX);
      const proximity = Math.max(0, 1 - distX / 22);
      bar.style.setProperty('--hover-scale', `${proximity * 0.55}`);
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTranslate({ x: 0, y: 0 });
    barRefs.current.forEach((bar) => {
      if (bar) bar.style.setProperty('--hover-scale', '0');
    });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes soundWave1 {
          0%, 100% { transform: scaleY(calc(0.5 + var(--hover-scale, 0))); }
          50% { transform: scaleY(calc(0.85 + var(--hover-scale, 0))); }
        }
        @keyframes soundWave2 {
          0%, 100% { transform: scaleY(calc(0.8 + var(--hover-scale, 0))); }
          50% { transform: scaleY(calc(0.45 + var(--hover-scale, 0))); }
        }
        @keyframes soundWave3 {
          0%, 100% { transform: scaleY(calc(1.0 + var(--hover-scale, 0))); }
          50% { transform: scaleY(calc(0.5 + var(--hover-scale, 0))); }
        }
        @keyframes soundWave4 {
          0%, 100% { transform: scaleY(calc(0.8 + var(--hover-scale, 0))); }
          50% { transform: scaleY(calc(0.45 + var(--hover-scale, 0))); }
        }
        @keyframes soundWave5 {
          0%, 100% { transform: scaleY(calc(0.5 + var(--hover-scale, 0))); }
          50% { transform: scaleY(calc(0.85 + var(--hover-scale, 0))); }
        }

        .sound-bar {
          width: 1.5px;
          background-color: #ffffff;
          border-radius: 9999px;
          transform-origin: bottom;
          box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);
          --hover-scale: 0;
        }
        @media (min-width: 640px) {
          .sound-bar { width: 2px; }
        }
        @media (min-width: 1024px) {
          .sound-bar { width: 2.5px; }
        }

        .sound-bar-1 { animation: soundWave1 1.0s ease-in-out infinite; animation-delay: 0.1s; }
        .sound-bar-2 { animation: soundWave2 1.3s ease-in-out infinite; animation-delay: 0.35s; }
        .sound-bar-3 { animation: soundWave3 0.9s ease-in-out infinite; animation-delay: 0.0s; }
        .sound-bar-4 { animation: soundWave4 1.2s ease-in-out infinite; animation-delay: 0.5s; }
        .sound-bar-5 { animation: soundWave5 1.1s ease-in-out infinite; animation-delay: 0.25s; }
      `}} />

      <button
        ref={visualizerRef}
        onClick={toggleAudio}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        role="switch"
        aria-checked={isPlaying}
        aria-label="Toggle background audio visualizer feedback"
        className="
          visualizer-btn fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-50
          flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/80 
          bg-transparent shadow-[0_0_15px_rgba(255,255,255,0.2)] 
          transition-all duration-300 ease-out cursor-pointer outline-none overflow-hidden
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black
          mix-blend-difference
        "
        style={{
          transform: `translate3d(${translate.x}px, ${translate.y}px, 0) scale(${isHovered ? 1.08 : 1})`,
          background: isHovered 
            ? `radial-gradient(circle at ${(translate.x / 0.35) + 28}px ${(translate.y / 0.35) + 28}px, rgba(255, 255, 255, 0.35) 0%, transparent 80%)`
            : "transparent",
          borderColor: isHovered ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.8)',
          boxShadow: isHovered 
            ? '0 0 25px rgba(255, 255, 255, 0.5)' 
            : '0 0 15px rgba(255, 255, 255, 0.2)'
        }}
      >
        <div className="flex items-end gap-[2px] sm:gap-[2.5px] lg:gap-[3.5px] h-3.5 sm:h-4 lg:h-5 w-4 sm:w-5 lg:w-7 justify-center">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              ref={(el) => {
                barRefs.current[i] = el;
              }}
              className={`sound-bar sound-bar-${i + 1}`}
              style={{
                height: '100%',
                animationPlayState: isPlaying ? 'running' : 'paused'
              }}
            />
          ))}
        </div>
      </button>
    </>
  );
}
