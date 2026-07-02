'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { useAudio } from './AudioContext';
import { usePathname } from 'next/navigation';

export default function OverlayBanner() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const { playAudio } = useAudio();

  if (pathname !== '/') return null;

  const [imageFailed, setImageFailed] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    // If this was triggered automatically, audio autoplay will likely be blocked by the browser.
    // Our AudioContext handles the rejection gracefully, and the user can just manually start audio later!
    try {
      playAudio();
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.log("⚠️ [OverlayBanner] Non-fatal error playing audio during close:", errMsg);
    }
  }, [playAudio]);

  // Use a ref to store handleClose so that the useEffect auto-close timer does not clear and restart
  // whenever handleClose changes (which can be triggered by external renders or context adjustments).
  const handleCloseRef = useRef(handleClose);
  useEffect(() => {
    handleCloseRef.current = handleClose;
  }, [handleClose]);

  // Prevent scroll when modal is open and handle auto-close
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      // Auto close after exactly 10 seconds
      console.log("ℹ️ [OverlayBanner] Modal opened. Setting 10s auto-close timer.");
      const timer = setTimeout(() => {
        console.log("ℹ️ [OverlayBanner] 10s timer fired. Closing modal.");
        handleCloseRef.current();
      }, 10000);
      
      return () => {
        document.body.style.overflow = '';
        clearTimeout(timer);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleModalClick = () => {
    setShowHint(true);
    // Hide hint after 3 seconds
    setTimeout(() => setShowHint(false), 3000);
  };

  return (
    <div 
      className="overlay-backdrop fixed inset-0 z-100 flex items-center justify-center bg-black/40 p-4 sm:p-6 backdrop-blur-[2px]"
      onClick={handleBackdropClick}
    >
      <div 
        className="relative w-full max-w-2xl bg-[#1a0b2e] border-2 border-white rounded-xl shadow-[0_0_50px_rgba(139,92,246,0.3)] cursor-pointer"
        onClick={handleModalClick}
      >
        
        {/* Top Left Yellow Warning Strip */}
        <div className="absolute top-0 left-0 w-28 h-28 sm:w-40 sm:h-40 overflow-hidden pointer-events-none z-10 rounded-tl-xl">
          <div className="absolute top-0 left-0 w-44 h-6 sm:w-56 sm:h-8 bg-yellow-400 -rotate-45 -translate-x-10 translate-y-8 sm:-translate-x-12 sm:translate-y-10 flex items-center justify-center border-y border-black shadow-md"
               style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.8) 10px, rgba(0,0,0,0.8) 20px)' }}>
            <span className="bg-yellow-400 text-black font-bold text-[9px] sm:text-xs uppercase tracking-widest px-1 sm:px-2">IMPORTANT</span>
          </div>
        </div>

        {/* Bottom Right Yellow Warning Strip */}
        <div className="absolute bottom-0 right-0 w-28 h-28 sm:w-40 sm:h-40 overflow-hidden pointer-events-none z-10 rounded-br-xl">
          <div className="absolute bottom-0 right-0 w-44 h-6 sm:w-56 sm:h-8 bg-yellow-400 -rotate-45 translate-x-10 -translate-y-8 sm:translate-x-12 sm:-translate-y-10 flex items-center justify-center border-y border-black shadow-md"
               style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.8) 10px, rgba(0,0,0,0.8) 20px)' }}>
            <span className="bg-yellow-400 text-black font-bold text-[9px] sm:text-xs uppercase tracking-widest px-1 sm:px-2">IMPORTANT</span>
          </div>
        </div>

        {/* Close Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          className="close-banner-btn absolute top-4 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 border border-white/20 text-white hover:bg-[#8B5CF6] hover:scale-110 transition-all cursor-pointer shadow-lg"
          aria-label="Close banner and start audio"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Banner Content (Image / Fallback) */}
        <div className="relative aspect-video w-full bg-black/50 rounded-xl overflow-hidden flex flex-col items-center justify-center p-6 text-center">
          {imageFailed ? (
            <div className="animate-in fade-in duration-500 pointer-events-none">
              <h2 className="text-xl sm:text-3xl font-bold text-white mb-4 font-roboto-condensed uppercase tracking-wider">
                Important Announcement
              </h2>
              <p className="text-gray-300 font-mono text-sm sm:text-base max-w-md mx-auto">
                We are completely full! No on-spot registrations will be accepted at the venue.
              </p>
            </div>
          ) : (
            <Image 
              src="/images/Pragya_Team.avif"
              alt="No On-Spot Registration"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover
              pointer-events-none"
              priority
              onError={() => setImageFailed(true)}
            />
          )}

          {/* Click Hint Overlay */}
          {showHint && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 animate-in fade-in duration-200">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full text-white font-mono font-bold animate-bounce shadow-xl">
                Click on X to view the site
              </div>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
