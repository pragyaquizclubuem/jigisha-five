import PageWrapper from "@/components/wrappers/PageWrapper";
import { HandDrawnStar, HandDrawnSparkle } from "@/components/icons/Icons";
import Link from "next/link";

export default function FamilyPage() {
  return (
    <PageWrapper>
      <div className="flex-1 min-h-[80dvh] flex flex-col items-center justify-center relative overflow-hidden px-6 pt-24 pb-12">
        {/* Decorative Elements */}
        <div className="absolute top-[15%] left-[5%] md:top-[20%] md:left-[15%] animate-bounce opacity-70" style={{ animationDelay: '0.2s' }}>
          <HandDrawnStar className="w-10 h-10 md:w-16 md:h-16 text-[#513081] rotate-12" />
        </div>
        <div className="absolute top-[25%] right-[5%] md:top-[30%] md:right-[15%] animate-pulse opacity-60">
          <HandDrawnSparkle className="w-8 h-8 md:w-12 md:h-12 text-[#c77dff]" />
        </div>
        <div className="absolute bottom-[20%] left-[10%] md:left-[25%] animate-pulse opacity-80" style={{ animationDelay: '0.7s' }}>
          <HandDrawnSparkle className="w-6 h-6 md:w-10 md:h-10 text-[#513081] rotate-[25deg]" />
        </div>
        
        {/* Content */}
        <div className="z-10 flex flex-col items-center text-center max-w-3xl relative">
          <div className="inline-block px-5 py-2 mb-6 md:mb-8 border-2 border-[#252525] rounded-full bg-[#D7ABFF] text-[#252525] font-bold uppercase tracking-widest text-xs sm:text-sm shadow-[4px_4px_0_0_#252525] transform -rotate-2 select-none">
            Coming Soon
          </div>
          
          <h1 className="font-roboto-condensed text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-wide text-[#252525] drop-shadow-sm mb-6 leading-[1.1] select-none">
            THE PRAGYA <span className="text-[#513081]">FAMILY</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl font-body mb-10 max-w-[600px] mx-auto text-black/80 leading-relaxed font-medium">
            We are currently curating the legacy of Pragya Club. Soon, you&apos;ll be able to explore the brilliant minds, quiz-masters, club members, executive committee, alumni, and our collective achievements right here.
          </p>
          
          <Link
            href="/"
            className="group relative inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-4 font-bold uppercase tracking-widest text-[#FFEDE0] bg-[#513081] rounded-full border-2 border-[#252525] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[6px_6px_0_0_#252525] active:translate-y-0 active:shadow-none focus:outline-none focus:ring-2 focus:ring-[#513081] focus:ring-offset-4 focus:ring-offset-[#FFEDE0]"
          >
            Return Home
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
