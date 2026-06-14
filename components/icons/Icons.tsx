"use client";

import Image from "next/image";

interface IconProps {
  className?: string;
}

// ── MenuIcon ──────────────────────────────────────────────────────────────────
// Closed: the exact 2-line ham (top long line + bottom-right short line).
// Open:   the ham lines fade+slide out while a fresh, symmetric ✕ fades+scales in.
// Size:   inherits from className (no fixed width/height on <svg>).
export function MenuIcon({
  className = "",
  isOpen = false,
}: IconProps & { isOpen?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* ── HAM lines (visible when closed) ─────────────────────────────────── */}

      {/* Line 1 — top, long */}
      <rect
        x="5" y="8.7" width="14" height="1.6" rx="0.8"
        fill="currentColor"
        style={{
          opacity: isOpen ? 0 : 1,
          transform: isOpen ? "translateY(-3px)" : "translateY(0)",
          transition: "opacity 0.2s ease, transform 0.25s ease",
        }}
      />
      {/* Line 2 — bottom-right, short */}
      <rect
        x="10" y="13.7" width="9" height="1.6" rx="0.8"
        fill="currentColor"
        style={{
          opacity: isOpen ? 0 : 1,
          transform: isOpen ? "translateY(3px)" : "translateY(0)",
          transition: "opacity 0.2s ease, transform 0.25s ease",
        }}
      />

      {/* ── X lines (visible when open) ──────────────────────────────────────── */}
      {/* Both are equal-width, centered at (12, 12), crossing at ±45°.
          Closed state: invisible + scaled down. Open: visible + full size.      */}

      {/* X arm \ */}
      <rect
        x="5" y="11.2" width="14" height="1.6" rx="0.8"
        fill="currentColor"
        style={{
          transformOrigin: "12px 12px",
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "rotate(45deg) scale(1)" : "rotate(45deg) scale(0.4)",
          transition: [
            "opacity 0.22s ease",
            isOpen ? "0.12s" : "0s",
            ",",
            "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
            isOpen ? "0.12s" : "0s",
          ].join(" "),
        }}
      />
      {/* X arm / */}
      <rect
        x="5" y="11.2" width="14" height="1.6" rx="0.8"
        fill="currentColor"
        style={{
          transformOrigin: "12px 12px",
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "rotate(-45deg) scale(1)" : "rotate(-45deg) scale(0.4)",
          transition: [
            "opacity 0.22s ease",
            isOpen ? "0.12s" : "0s",
            ",",
            "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
            isOpen ? "0.12s" : "0s",
          ].join(" "),
        }}
      />
    </svg>
  );
}

// ── Hamburger — plain alias (no animation state) ──────────────────────────────
export function Hamburger({ className = "" }: IconProps) {
  return <MenuIcon className={className} isOpen={false} />;
}

// ── CloseIcon ─────────────────────────────────────────────────────────────────
// Size inherits from className.
export function CloseIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="6"  y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ── Logo components ────────────────────────────────────────────────────────────
// Next.js <Image> requires intrinsic width/height for optimisation.
// Use className (e.g. "h-14 w-auto") to control the rendered display size.
interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function PragyaLogo({ className = "", width = 96, height = 91, priority = true }: LogoProps) {
  return (
    <Image
      src="/images/pragya.webp"
      width={width}
      height={height}
      alt="Pragya — UEM Kolkata Quiz Club"
      className={`object-contain ${className}`}
      priority={priority}
    />
  );
}

export function UEMLogo({ className = "", width = 106, height = 77, priority = true }: LogoProps) {
  return (
    <Image
      src="/images/uem.webp"
      width={width}
      height={height}
      alt="University of Engineering & Management"
      className={`object-contain ${className}`}
      priority={priority}
      
    />
  );
}

export function IEMLogo({ className = "", width = 109, height = 79, priority = true }: LogoProps) {
  return (
    <Image
      src="/images/iem.webp"
      width={width}
      height={height}
      alt="Institute of Engineering & Management"
      className={`object-contain ${className}`}
      priority={priority}
      
    />
  );
}
