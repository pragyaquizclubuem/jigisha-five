'use client';

import { useState, useEffect } from 'react';

interface ThankYouProps {
  studentName: string;
  schoolName: string;
  onBack: () => void;
}

export default function ThankYou({ studentName, schoolName, onBack }: ThankYouProps) {
  const [showContent, setShowContent] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowContent(true), 300);
    const timer2 = setTimeout(() => setShowButtons(true), 800);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const socialLinks = {
    instagram: 'https://www.instagram.com/pragyauemk?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    facebook: 'https://www.facebook.com/pragyauemk',
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-[#252525] bg-green-200 transform transition-all duration-1000 shadow-[4px_4px_0_0_#252525] ${showContent ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}>
            <svg className="w-10 h-10 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className={`transform transition-all duration-700 delay-300 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <h1 className="text-3xl font-bold font-roboto-condensed text-[#513081] uppercase tracking-tight mb-2">
            Registration Confirmed
          </h1>
          <div className="h-1.5 w-16 bg-[#513081] mx-auto rounded-full mb-6"></div>
        </div>

        {/* Details Card */}
        <div className={`bg-white border-2 border-[#252525] rounded-2xl p-6 mb-6 text-left shadow-[8px_8px_0_0_#252525] transform transition-all duration-700 delay-400 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <p className="text-gray-600 mb-4 leading-relaxed text-sm font-semibold uppercase text-center">
            You will be contacted further from our end
          </p>
          
          <div className="bg-[#FFEDE0]/50 border border-[#252525]/10 rounded-xl p-4 space-y-2">
            <h3 className="font-bold text-[#513081] text-xs uppercase tracking-wider mb-2">Registration Details:</h3>
            <div className="space-y-1.5 text-sm text-[#252525] font-medium">
              <p><span className="text-[#513081] font-bold">Name:</span> {studentName}</p>
              <p><span className="text-[#513081] font-bold">School:</span> {schoolName}</p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className={`space-y-4 transform transition-all duration-700 delay-700 ${showButtons ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="grid grid-cols-2 gap-4">
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#252525] font-bold py-3.5 px-4 rounded-full border-2 border-[#252525] transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#252525] active:translate-y-0 active:shadow-none"
            >
              <svg className="w-4 h-4 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Instagram
            </a>
            
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#252525] font-bold py-3.5 px-4 rounded-full border-2 border-[#252525] transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#252525] active:translate-y-0 active:shadow-none"
            >
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </a>
          </div>

          {/* Register Another Button */}
          <button
            onClick={onBack}
            className="w-full text-center py-4 px-6 rounded-full border-2 border-[#252525] bg-[#513081] text-[#FFEDE0] font-bold uppercase tracking-wider text-xs transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#252525] active:translate-y-0 active:shadow-none focus:outline-none"
          >
            Register Another Participant
          </button>
        </div>
      </div>
    </div>
  );
}
