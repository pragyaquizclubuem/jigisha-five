'use client';

import React, { useEffect, useRef } from 'react';

const SquareGridBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only apply the mouse listener if the device supports hover (desktop)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { left, top } = containerRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      // Pass coordinates to CSS variables
      containerRef.current.style.setProperty('--mouse-x', `${x}px`);
      containerRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <>
      {/* Injecting the CSS directly into the component. 
        This keeps it perfectly modular and requires zero external CSS files.
      */}
      <style dangerouslySetInnerHTML={{ __html: `
        .jigisha-bg-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #FFEDE0;
          overflow: hidden;
          z-index: -1;
          pointer-events: none; /* Prevents grid from stealing clicks */
        }

        /* Shared grid pattern logic */
        .jigisha-grid-ambient,
        .jigisha-grid-interactive {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          /* Creates a 60x60 square grid */
          background-image: 
            linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        /* Ambient Layer: "Deep Breather" slow animation */
        .jigisha-grid-ambient {
          opacity: 0.45;
          animation: ambientPulse 8s ease-in-out infinite alternate;
          will-change: transform, opacity;
        }

        @keyframes ambientPulse {
          0% { opacity: 0.35; transform: scale(0.95); }
          100% { opacity: 0.65; transform: scale(1.05); }
        }

        /* Mobile specific: faster scale pulse and higher opacity values */
        @media (hover: none), (pointer: coarse) {
          .jigisha-grid-ambient {
            opacity: 1;
            animation: mobileAmbientPulse 4s ease-in-out infinite alternate;
          }
        }

        @keyframes mobileAmbientPulse {
          0% { opacity: 0.45; transform: scale(0.92); }
          100% { opacity: 1; transform: scale(1.08); }
        }



        /* Interactive Layer: Hover spotlight */
        .jigisha-grid-interactive {
          /* Slightly darker lines for the hover state */
          background-image: 
            linear-gradient(to right, rgba(0, 0, 0, 0.25) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.25) 1px, transparent 1px);
          
          /* Hides layer entirely except for a circle at the mouse coordinates */
          mask-image: radial-gradient(
            300px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px),
            black 0%,
            transparent 100%
          );
          -webkit-mask-image: radial-gradient(
            300px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px),
            black 0%,
            transparent 100%
          );
          
          transition: mask-image 0.2s ease;
          -webkit-transition: -webkit-mask-image 0.2s ease;
        }

        /* Disable the interactive layer entirely on mobile/touch devices */
        @media (hover: none), (pointer: coarse) {
          .jigisha-grid-interactive {
            display: none;
          }
        }
      `}} />

      {/* The actual DOM structure */}
      <div className="jigisha-bg-wrapper" ref={containerRef} aria-hidden="true">
        <div className="jigisha-grid-ambient"></div>
        <div className="jigisha-grid-interactive"></div>
      </div>
    </>
  );
};

export default SquareGridBackground;