'use client';

import React, { useState, useRef } from 'react';


export default function HomeHero() {
  // Audio Visualizer states and refs
  const [isPlaying, setIsPlaying] = useState(true);
  const visualizerRef = useRef<HTMLButtonElement>(null);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Magnetic hover coordinates
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Mouse move handler for the magnetic effect & cursor-proximity ripple
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!visualizerRef.current) return;
    const rect = visualizerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // 1. Calculate magnetic translation offsets
    const x = (e.clientX - rect.left - centerX) * 0.35;
    const y = (e.clientY - rect.top - centerY) * 0.35;
    setTranslate({ x, y });
    
    // 2. Calculate cursor X coordinate relative to visualizer container
    const cursorX = e.clientX - rect.left;
    
    // X center positions of the 5 bars inside the button
    const barPositions = [17, 22.5, 28, 33.5, 39];
    
    barRefs.current.forEach((bar, index) => {
      if (!bar) return;
      const barX = barPositions[index];
      const distX = Math.abs(cursorX - barX);
      // Proximity weight: 1 at center, scaling down to 0 at 22px away
      const proximity = Math.max(0, 1 - distX / 22);
      
      // Set the CSS variable on the bar element directly
      bar.style.setProperty('--hover-scale', `${proximity * 0.55}`);
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTranslate({ x: 0, y: 0 });
    // Reset hover scales on leave
    barRefs.current.forEach((bar) => {
      if (bar) bar.style.setProperty('--hover-scale', '0');
    });
  };

  return (
    <>
      {/* Sound wave keyframes with custom property calculations, matching exact close-up heights */}
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
          width: 2.5px;
          background-color: #ffffff;
          border-radius: 9999px;
          transform-origin: bottom;
          box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);
          --hover-scale: 0;
        }

        .sound-bar-1 { animation: soundWave1 1.0s ease-in-out infinite; animation-delay: 0.1s; }
        .sound-bar-2 { animation: soundWave2 1.3s ease-in-out infinite; animation-delay: 0.35s; }
        .sound-bar-3 { animation: soundWave3 0.9s ease-in-out infinite; animation-delay: 0.0s; }
        .sound-bar-4 { animation: soundWave4 1.2s ease-in-out infinite; animation-delay: 0.5s; }
        .sound-bar-5 { animation: soundWave5 1.1s ease-in-out infinite; animation-delay: 0.25s; }
      `}} />

      {/* Full-screen full-bleed landing page solid block section */}
      <section 
        className="
          w-full relative overflow-hidden bg-[#0C0020] border-b-2 border-black 
          flex flex-col items-center justify-center px-6 py-16
          min-h-[calc(100vh-110px)] md:min-h-[calc(100vh-115px)]
        "
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(90, 24, 154, 0.25) 0%, transparent 85%),
            linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 60px 60px, 60px 60px'
        }}
      >
        {/* Neon top border highlight */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#c084fc]/30 to-transparent blur-[1px]" />

        {/* Centered Register Now Button inside the block */}
        <div className="relative z-10">
          <a
            href="#register"
            className="
              inline-flex items-center gap-6 rounded-full border border-[#8B5CF6]/50 
              bg-[#0A002A] px-12 py-5
              font-mono text-lg sm:text-xl font-bold uppercase tracking-[0.2em] text-white transition-all
              shadow-[0_0_15px_rgba(139,92,246,0.25),_4px_4px_0_0_#8B5CF6]
              hover:shadow-[0_0_10px_rgba(139,92,246,0.15),_2px_2px_0_0_#8B5CF6]
              hover:translate-x-[2px] hover:translate-y-[2px]
              active:translate-x-[4px] active:translate-y-[4px]
              active:shadow-none
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2
            "
          >
            <span>REGISTER NOW</span>
            <svg className="h-6 w-6 stroke-[#c77dff] stroke-[2.5]" viewBox="0 0 24 24" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>

        {/* Bottom Right Corner: Interactive Audio Visualizer Circle (Lighthouse & CSS Optimized) */}
        <button
          ref={visualizerRef}
          onClick={() => setIsPlaying(!isPlaying)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          role="switch"
          aria-checked={isPlaying}
          aria-label="Toggle background audio visualizer feedback"
          className="
            visualizer-btn absolute bottom-8 right-8 z-30
            flex h-14 w-14 items-center justify-center rounded-full border border-white/80 
            bg-[#0C0020]/95 shadow-[0_0_15px_rgba(255,255,255,0.15)] 
            transition-all duration-300 ease-out cursor-pointer outline-none overflow-hidden
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0020]
          "
          style={{
            transform: `translate3d(${translate.x}px, ${translate.y}px, 0) scale(${isHovered ? 1.08 : 1})`,
            background: isHovered 
              ? `radial-gradient(circle at ${(translate.x / 0.35) + 28}px ${(translate.y / 0.35) + 28}px, rgba(255, 255, 255, 0.15) 0%, rgba(12, 0, 32, 0.95) 75%)`
              : '#0C0020',
            borderColor: 'rgba(255, 255, 255, 0.8)',
            boxShadow: isHovered 
              ? '0 0 25px rgba(255, 255, 255, 0.35)' 
              : '0 0 15px rgba(255, 255, 255, 0.15)'
          }}
        >
          {/* Visualizer white wave bars with CSS rendering */}
          <div className="flex items-end gap-[3.5px] h-5 w-7 justify-center">
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

      </section>
    </>
  );
}
