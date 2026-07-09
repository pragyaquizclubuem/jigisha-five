import Link from "next/link";
import { 
  HandDrawnQuestionMark, 
  HandDrawnStar, 
  HandDrawnSparkle, 
  HandDrawnLightbulb 
} from "@/components/icons/Icons";

export default function NotFound() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-[#FFEDE0] text-[#252525] px-6 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-10 md:left-24 animate-bounce opacity-70" style={{ animationDelay: '0.2s' }}>
        <HandDrawnStar className="w-8 h-8 md:w-12 md:h-12 text-[#513081] rotate-12" />
      </div>
      <div className="absolute top-1/3 right-10 md:right-32 animate-pulse opacity-60">
        <HandDrawnSparkle className="w-6 h-6 md:w-10 md:h-10 text-[#513081]" />
      </div>
      <div className="absolute bottom-[20%] left-1/4 animate-bounce opacity-50" style={{ animationDelay: '0.5s' }}>
        <HandDrawnQuestionMark className="w-10 h-10 md:w-16 md:h-16 text-[#513081] rotate-[-15deg]" />
      </div>
      <div className="absolute bottom-[30%] right-[15%] md:right-1/4 animate-pulse opacity-80" style={{ animationDelay: '0.7s' }}>
        <HandDrawnLightbulb className="w-12 h-12 md:w-20 md:h-20 text-[#513081] rotate-25" />
      </div>

      {/* Main Content */}
      <div className="z-10 flex flex-col items-center text-center max-w-2xl mt-[-5%]">
        <div className="relative mb-6 md:mb-8">
          <h1 className="font-roboto-condensed text-[120px] sm:text-[150px] md:text-[200px] lg:text-[250px] font-bold tracking-tighter text-[#513081] drop-shadow-md leading-none select-none">
            404
          </h1>
          <div className="absolute -top-4 -right-6 md:-top-6 md:-right-10 lg:-right-16 rotate-15 transition-transform duration-500 hover:rotate-35 hover:scale-110">
            <HandDrawnQuestionMark className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 text-[#252525]" />
          </div>
        </div>

        <h2 className="font-roboto-condensed text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-[0.03em] mb-5 text-[#252525]">
          Oops! Page Not Found
        </h2>
        
        <p className="text-base sm:text-lg md:text-xl font-body mb-10 max-w-[450px] mx-auto text-black/80 leading-relaxed">
          Looks like you&apos;ve wandered into uncharted territory. The page you are looking for doesn&apos;t exist or has been moved.
        </p>

        <Link
          href="/"
          className="group relative inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-4 font-bold uppercase tracking-widest text-[#FFEDE0] bg-[#513081] rounded-full border-2 border-[#252525] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[6px_6px_0_0_#252525] active:translate-y-0 active:shadow-none focus:outline-none focus:ring-2 focus:ring-[#513081] focus:ring-offset-4 focus:ring-offset-[#FFEDE0]"
        >
          Return Home
        </Link>
      </div>
      
      {/* Footer minimal style for 404 */}
      <div className="absolute bottom-8 w-full text-center">
        <p className="text-xs font-body font-bold text-[#252525]/50 uppercase tracking-widest">
          Jigisha 5.0 &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
