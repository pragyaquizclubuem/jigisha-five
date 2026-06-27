'use client';

interface HeroSkeletonProps {
  className?: string;
}

export default function HeroSkeleton({ className = '' }: HeroSkeletonProps) {
  return (
    <div
      className={`relative w-full h-full flex items-center justify-center animate-pulse ${className}`}
      aria-hidden="true"
    >
      {/* Outer ambient glow */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-[#9d4edd]/20 via-[#3c096c]/5 to-transparent blur-xl" />
      
      {/* Central icon silhouette */}
      <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-linear-to-b from-[#5a189a]/30 to-[#10002b]/40 border-2 border-[#9d4edd]/10 shadow-[0_0_40px_rgba(157,78,221,0.08)] flex items-center justify-center">
        {/* Orbital ring placeholder */}
        <div className="absolute w-[110%] h-[35%] rounded-full border border-[#c77dff]/10 rotate-12" />
        {/* Core glow */}
        <div className="w-16 h-16 rounded-full bg-[#c77dff]/10 filter blur-md" />
      </div>
    </div>
  );
}
