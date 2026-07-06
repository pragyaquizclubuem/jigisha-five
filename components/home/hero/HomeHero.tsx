'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from "@/components/icons/Icons";
import { Eye } from 'lucide-react';
import Link from 'next/link';

export default function HomeHero() {
  return (
    <>
      {/* Full-screen full-bleed landing page solid block section */}
      <section 
        className="
          w-full relative overflow-hidden bg-[#0C0020] border-b-2 border-black 
          flex flex-col items-center justify-center px-6 py-16
          min-h-[calc(100dvh-84px)] xl:min-h-[calc(100dvh-140px)]
        "
      >
        {/* Background Images for Responsive Art Direction 16:9 */}
        <div className="absolute inset-0 z-0">
          {/* Desktop & Tablet Image */}
          <Image 
            src="/images/Pragya_Team.avif" 
            alt="Jigisha Hero Desktop" 
            fill 
            sizes="(max-width: 639px) 0vw, 100vw"
            className="hidden sm:block object-cover opacity-50"
            priority
          />
          {/* Mobile Image 9:16 (Temporarily using desktop image until jigisha-mobile.avif is available) */}
          <Image 
            src="/dummycover.avif" 
            alt="Jigisha Hero Mobile" 
            fill 
            sizes="(max-width: 639px) 100vw, 0vw"
            className="block sm:hidden object-cover object-[70%_center] opacity-50"
            priority
          />
        </div>

        {/* Existing gradient/pattern overlays */}
        <div 
          className="absolute inset-0 z-0 mix-blend-overlay"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(90, 24, 154, 0.4) 0%, transparent 85%),
              linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 60px 60px, 60px 60px'
          }}
        />

        {/* Neon top border highlight */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-[#c084fc]/30 to-transparent blur-[1px] z-10" />

        {/* Centered CTA Buttons inside the block */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-auto mb-10">
          <Link
            href="/events/jana-ojana"
            className="
              inline-flex items-center justify-center gap-4 rounded-full border border-[#8B5CF6]/50 
              bg-[#0A002A] px-8 py-4 sm:px-10 sm:py-5
              font-mono text-base sm:text-lg font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white transition-all
              shadow-[0_0_15px_rgba(139,92,246,0.25),4px_4px_0_0_#8B5CF6]
              hover:shadow-[0_0_10px_rgba(139,92,246,0.15),2px_2px_0_0_#8B5CF6]
              hover:translate-x-[2px] hover:translate-y-[2px]
              active:translate-x-[4px] active:translate-y-[4px]
              active:shadow-none
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2
              w-full sm:w-auto text-center
            "
          >
            <span>REGISTER NOW</span>
            <ArrowRightIcon className="h-5 w-5 sm:h-6 sm:w-6 stroke-[#c77dff] stroke-[2.5]" />
          </Link>

          <Link
            href="/#brochureSection"
            className="
              inline-flex items-center justify-center gap-4 rounded-full border border-[#8B5CF6]/50 
              bg-[#0A002A] px-8 py-4 sm:px-10 sm:py-5
              font-mono text-base sm:text-lg font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white transition-all
              shadow-[0_0_15px_rgba(139,92,246,0.25),4px_4px_0_0_#8B5CF6]
              hover:shadow-[0_0_10px_rgba(139,92,246,0.15),2px_2px_0_0_#8B5CF6]
              hover:translate-x-[2px] hover:translate-y-[2px]
              active:translate-x-[4px] active:translate-y-[4px]
              active:shadow-none
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2
              w-full sm:w-auto text-center
            "
          >
            <span>VIEW BROCHURE</span>
            <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-[#c77dff] stroke-[2.5]" />
          </a>
        </div>
      </section>
    </>
  );
}
